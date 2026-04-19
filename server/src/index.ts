import express from "express";
import cors from "cors";
import { ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { createClient } from "@supabase/supabase-js";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence, RunnablePassthrough } from "@langchain/core/runnables";
import { PromptTemplate } from "@langchain/core/prompts";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import multer from "multer";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const uploadDir = path.join(process.cwd(), "public/uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + '-' + file.originalname)
  }
})
const upload = multer({ storage: storage });

const model = new ChatGoogleGenerativeAI({
    apiKey: process.env.GEMINI_API_KEY?.trim(),
    model: "gemini-2.5-flash",
    temperature: 0,
    maxRetries: 2,
});

const embeddings = new GoogleGenerativeAIEmbeddings({
    apiKey: process.env.GEMINI_API_KEY?.trim(),
    model: "gemini-embedding-001",
});

const supabaseUrl = process.env.SUPABASE_URL?.trim() || "";
const supabasePrivateKey = process.env.SUPABASE_PRIVATE_KEY?.trim() || "";
const client = createClient(supabaseUrl, supabasePrivateKey);

// Common Vector Store reference
const vectorStore = new SupabaseVectorStore(embeddings, {
    client,
    tableName: "documents",
    queryName: "match_documents",
});

// Create reusable chain
const prompt = PromptTemplate.fromTemplate(
    `You are a helpful customer support chatbot for an online pizza store ("SliceAI"). 
    Answer the user's question based ONLY on the following context.
    If you don't know the answer, just say that you don't know, don't try to make up an answer.

    IMPORTANT FORMATTING RULES:
    1. Respond in EXACTLY the same language and script/style that the user used to ask the question (e.g. if they write in Roman Urdu/WhatsApp format, you MUST reply in Roman Urdu/WhatsApp format. Do not use actual Urdu script).
    2. DO NOT use markdown bolding (like **). Your text MUST be plain text.
    3. Proper List Formatting: If returning a list of deals or items, you MUST format them line by line with standard numbers (e.g., "1. Deal name - price"). Do NOT use bullet points or asterisks, and ALWAYS place each number on a new line.
    
    Context: {context}
    
    Question: {question}
    
    Helpful Answer:`
);

const retriever = vectorStore.asRetriever({ k: 3 });

const combineDocsChain = RunnableSequence.from([
    {
        context: retriever.pipe((docs: any[]) => docs.map((doc) => doc.pageContent).join("\n\n")),
        question: new RunnablePassthrough(),
    },
    prompt,
    model,
    new StringOutputParser(),
]);

// ----------------------------------------------------
// ROUTES
// ----------------------------------------------------

app.post("/api/chat", async (req: express.Request, res: express.Response) => {
    try {
        const { question } = req.body;
        if (!question) {
            return res.status(400).json({ error: "Missing question" });
        }
        
        console.log(`\nUser Question: "${question}"`);
        const response = await combineDocsChain.invoke(question);
        console.log(`Chatbot Answer: ${response}\n`);
        
        res.json({ answer: response });
    } catch (error: any) {
        console.error("Chat Error:", error);
        res.status(500).json({ error: error.message || "Failed to fetch response" });
    }
});

app.post("/api/seed", async (req: express.Request, res: express.Response) => {
    try {
        console.log("1. Loading PDF...");
        const pdfPath = path.resolve("src/data/online-pizza.pdf");
        const loader = new PDFLoader(pdfPath);
        const docs = await loader.load();

        console.log("2. Chunking data...");
        const textSplitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 200,
        });
        const chunks = await textSplitter.splitDocuments(docs);

        console.log("3. Storing embeddings in Supabase...");
        await SupabaseVectorStore.fromDocuments(chunks, embeddings, {
            client,
            tableName: "documents",
            queryName: "match_documents",
        });

        res.json({ success: true, message: `Seeded ${chunks.length} chunks.` });
    } catch (error: any) {
        console.error("Seed Error:", error);
        res.status(500).json({ error: error.message || "Failed to seed database" });
    }
});

app.post("/api/onboard", upload.single("file"), async (req: express.Request, res: express.Response): Promise<any> => {
    try {
        const description = req.body.description;
        const file = req.file;

        if (!description) {
            return res.status(400).json({ error: "Missing description" });
        }

        console.log("1. Formulating Text Chunks...");
        const textSplitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 200,
        });

        // Embed description
        const descChunks = await textSplitter.createDocuments(
            [description],
            [{ source: "user-description" }]
        );

        let allChunks = [...descChunks];

        if (file) {
            console.log(`2. Formulating PDF Chunks from ${file.path}...`);
            const loader = new PDFLoader(file.path);
            const docs = await loader.load();
            const pdfChunks = await textSplitter.splitDocuments(docs);
            allChunks = allChunks.concat(pdfChunks);
        }

        console.log(`3. Storing ${allChunks.length} combined chunks in Supabase...`);
        await SupabaseVectorStore.fromDocuments(allChunks, embeddings, {
            client,
            tableName: "documents",
            queryName: "match_documents",
        });

        res.json({ success: true, message: "Matrix initialized inside Supabase." });
    } catch (error: any) {
        console.error("Onboard Error:", error);
        res.status(500).json({ error: error.message || "Failed to onboard knowledge" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`- POST /api/chat to interact with the LLM`);
    console.log(`- POST /api/seed to re-embed the PDF document`);
});

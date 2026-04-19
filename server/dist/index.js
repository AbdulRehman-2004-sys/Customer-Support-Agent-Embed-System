var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b;
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
dotenv.config();
const model = new ChatGoogleGenerativeAI({
    apiKey: (_a = process.env.GEMINI_API_KEY) === null || _a === void 0 ? void 0 : _a.trim(),
    model: "gemini-2.5-flash",
    temperature: 0,
    maxRetries: 2,
});
const embeddings = new GoogleGenerativeAIEmbeddings({
    apiKey: (_b = process.env.GEMINI_API_KEY) === null || _b === void 0 ? void 0 : _b.trim(),
    model: "gemini-embedding-001",
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        try {
            console.log("1. Loading PDF...");
            const pdfPath = path.resolve("src/data/online-pizza.pdf");
            const loader = new PDFLoader(pdfPath);
            const docs = yield loader.load();
            console.log(`Loaded ${docs.length} pages from PDF.`);
            console.log("2. Chunking data...");
            const textSplitter = new RecursiveCharacterTextSplitter({
                chunkSize: 1000,
                chunkOverlap: 200,
            });
            const chunks = yield textSplitter.splitDocuments(docs);
            console.log(`Split into ${chunks.length} chunks.`);
            console.log("3. Connecting to Supabase...");
            const supabaseUrl = ((_a = process.env.SUPABASE_URL) === null || _a === void 0 ? void 0 : _a.trim()) || "";
            const supabasePrivateKey = ((_b = process.env.SUPABASE_PRIVATE_KEY) === null || _b === void 0 ? void 0 : _b.trim()) || "";
            const client = createClient(supabaseUrl, supabasePrivateKey);
            console.log("4. Storing embeddings in Supabase...");
            const vectorStore = yield SupabaseVectorStore.fromDocuments(chunks, embeddings, {
                client,
                tableName: "documents",
                queryName: "match_documents",
            });
            console.log("Data stored in Supabase successfully!");
            console.log("5. Creating RAG pipeline...");
            const prompt = PromptTemplate.fromTemplate(`You are a helpful customer support chatbot for an online pizza store. 
            Answer the user's question based ONLY on the following context.
            If you don't know the answer, just say that you don't know, don't try to make up an answer.
            
            Context: {context}
            
            Question: {question}
            
            Helpful Answer:`);
            const retriever = vectorStore.asRetriever({ k: 3 });
            const combineDocsChain = RunnableSequence.from([
                {
                    context: retriever.pipe((docs) => docs.map((doc) => doc.pageContent).join("\n\n")),
                    question: new RunnablePassthrough(),
                },
                prompt,
                model,
                new StringOutputParser(),
            ]);
            console.log("6. Testing the Agent...");
            const question = "Can you tell me about the pizza sizes you offer?";
            console.log(`\nUser Question: "${question}"`);
            const response = yield combineDocsChain.invoke(question);
            console.log(`\nChatbot Answer: ${response}\n`);
        }
        catch (error) {
            console.error("Error:", error);
        }
    });
}
main();

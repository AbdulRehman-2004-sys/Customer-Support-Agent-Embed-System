"use client";

import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "agent", content: "Hi! How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = input;
    // Add user message to UI immediately
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setIsTyping(true);
    
    try {
      // POST the question to our local Node.js Express Backend
      const response = await fetch("https://customer-support-agent-embed-system.onrender.com/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userMessage }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response");
      }

      const data = await response.json();
      
      // Append the AI returned answer
      setMessages(prev => [...prev, { role: "agent", content: data.answer }]);

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: "agent", content: "Oops! I'm having trouble connecting to the server. Is it running?" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <Card className="w-80 h-[400px] mb-4 flex flex-col shadow-2xl border-border bg-background overflow-hidden animate-in slide-in-from-bottom-5">
          <CardHeader className="bg-primary text-primary-foreground py-3 flex flex-row items-center justify-between space-y-0 rounded-t-xl">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <MessageCircle size={16} />
              Customer Support
            </CardTitle>
            <Button variant="ghost" size="icon" className="h-6 w-6 text-primary-foreground hover:bg-primary-foreground/20 hover:text-white" onClick={() => setIsOpen(false)}>
              <X size={16} />
            </Button>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm whitespace-pre-wrap ${msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl px-3 py-2 text-sm bg-muted text-foreground animate-pulse">
                  Agent is typing...
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="p-3 border-t">
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex w-full gap-2">
              <Input 
                value={input} 
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..." 
                className="flex-1 h-9 rounded-full"
                disabled={isTyping}
              />
              <Button type="submit" size="icon" className="h-9 w-9 rounded-full" disabled={isTyping || !input.trim()}>
                <Send size={14} />
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}

      {!isOpen && (
        <Button 
          size="icon"
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full shadow-lg transition-transform hover:scale-105"
        >
          <MessageCircle size={24} />
        </Button>
      )}
    </div>
  );
}

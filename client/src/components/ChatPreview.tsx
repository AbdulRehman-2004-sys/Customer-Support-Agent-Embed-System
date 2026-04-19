// components/ChatPreview.tsx
'use client';

import React, { useState } from 'react';
import { MoreVertical, Paperclip, Send } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
}

export default function ChatPreview() {
  const [messages] = useState<Message[]>([
    { id: 1, text: 'Hi! How can I help you integrate FluidArch into your dashboard today?', isUser: false },
    { id: 2, text: "I'm looking for the API documentation for the custom CSS injection.", isUser: true },
    { id: 3, text: 'Certainly! Our "Fluid Design" docs cover exact implementation steps for your theme.', isUser: false },
  ]);

  return (
    <div className="relative z-20 w-full max-w-md bg-surface/85 backdrop-blur-2xl rounded-2xl shadow-[0_32px_80px_rgba(11,28,48,0.12)] border border-white/50 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold">
            FA
          </div>
          <div>
            <h4 className="font-bold text-on-surface text-sm">FluidArch Assistant</h4>
            <p className="text-xs text-on-surface-variant">Online | Always active</p>
          </div>
        </div>
        <MoreVertical className="w-5 h-5 text-on-surface-variant" />
      </div>

      <div className="space-y-4 mb-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`p-4 rounded-xl ${
              message.isUser
                ? 'bg-primary text-on-primary rounded-tr-none ml-8'
                : 'bg-surface-container-low text-on-surface rounded-tl-none mr-8'
            }`}
          >
            <p className="text-sm">{message.text}</p>
          </div>
        ))}
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-4 flex items-center">
          <Paperclip className="w-4 h-4 text-outline" />
        </div>
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full pl-12 pr-12 py-3 bg-surface-container-high border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 placeholder:text-outline outline-none"
        />
        <div className="absolute inset-y-0 right-4 flex items-center">
          <Send className="w-5 h-5 text-primary" />
        </div>
      </div>
    </div>
  );
}
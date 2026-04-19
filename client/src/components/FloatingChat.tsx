// components/FloatingChat.tsx
'use client';

import React, { useState } from 'react';
import { Forum, Close } from '@mui/icons-material';

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-[100] group">
      <div className="absolute -inset-2 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-16 h-16 bg-primary-container text-on-primary-container rounded-2xl flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all"
      >
        {isOpen ? <Close className="text-2xl" /> : <Forum className="text-2xl" />}
      </button>
      
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 glass-panel rounded-2xl border border-outline-variant/20 overflow-hidden shadow-2xl">
          <div className="bg-primary-container/20 p-4 border-b border-outline-variant/20">
            <h3 className="font-bold">FluidArch Support</h3>
            <p className="text-xs text-on-surface-variant">Ask us anything!</p>
          </div>
          <div className="h-80 p-4 overflow-y-auto">
            <div className="flex gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center text-xs text-primary">AI</div>
              <div className="flex-1 p-3 rounded-xl bg-surface-container-low text-sm">
                Hi! How can I help you today?
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-outline-variant/20">
            <input
              type="text"
              placeholder="Type your message..."
              className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-primary/50"
            />
          </div>
        </div>
      )}
    </div>
  );
}
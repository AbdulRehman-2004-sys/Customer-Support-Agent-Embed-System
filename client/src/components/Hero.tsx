// components/Hero.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowForward, AutoAwesome, Send } from '@mui/icons-material';

export default function Hero() {
  return (
    <section className="relative min-h-[921px] flex items-center px-8 overflow-hidden">
      {/* Animated Background Mesh Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="flex flex-col gap-8">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-high border border-outline-variant/20 text-xs font-bold tracking-widest text-primary uppercase mb-6">
              <AutoAwesome className="w-3.5 h-3.5" />
              AI-Powered Support
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tight text-on-surface">
              Embed{' '}
              <span className="bg-gradient-to-r from-primary to-primary-container bg-clip-text text-transparent">
                Smart
              </span>{' '}
              Customer Support in Minutes
            </h1>
          </div>
          <p className="text-lg text-on-surface-variant max-w-lg leading-relaxed">
            Transform your product's user experience with FluidArch's luminescent support widgets.
            Intelligent, fast, and beautifully integrated into your tech stack.
          </p>
          <div className="flex flex-wrap gap-4 mt-4">
            <Link
              href="/get-started"
              className="px-8 py-4 bg-primary-container text-on-primary-container rounded-xl font-bold hover:shadow-[0_0_30px_rgba(129,140,248,0.4)] transition-all flex items-center gap-2 group"
            >
              Start Free Trial
              <ArrowForward className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="px-8 py-4 glass-panel border border-outline-variant/30 text-on-surface rounded-xl font-bold hover:bg-surface-variant transition-colors">
              Book a Demo
            </button>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary-container/30 to-blue-500/30 blur-2xl opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
          <div className="relative glass-panel rounded-3xl border border-outline-variant/20 overflow-hidden shadow-2xl">
            <div className="h-10 bg-surface-container-high px-4 flex items-center gap-2 border-b border-outline-variant/10">
              <div className="w-2.5 h-2.5 rounded-full bg-error/40" />
              <div className="w-2.5 h-2.5 rounded-full bg-tertiary/40" />
              <div className="w-2.5 h-2.5 rounded-full bg-primary/40" />
            </div>
            <div className="p-6 h-[400px] flex flex-col gap-4">
              <div className="flex gap-3 items-start">
                <div className="w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center text-xs text-primary">
                  AI
                </div>
                <div className="p-4 rounded-2xl rounded-tl-sm bg-surface-container-low border border-outline-variant/10 text-sm max-w-[80%] text-on-surface-variant">
                  Hello! How can I help you optimize your FluidArch integration today?
                </div>
              </div>
              <div className="flex gap-3 items-start self-end flex-row-reverse">
                <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-xs text-on-primary-container">
                  U
                </div>
                <div className="p-4 rounded-2xl rounded-tr-sm bg-primary-container/20 border border-primary/20 text-sm max-w-[80%] text-on-surface">
                  I need help setting up the webhook triggers for the chat widget.
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center text-xs text-primary">
                  AI
                </div>
                <div className="p-4 rounded-2xl rounded-tl-sm bg-surface-container-low border border-outline-variant/10 text-sm max-w-[80%] text-on-surface-variant">
                  <div className="flex gap-1 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-pulse" />
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-pulse delay-75" />
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-pulse delay-150" />
                  </div>
                  Analyzing documentation...
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 inset-x-0 p-4 bg-surface-container-low/80 backdrop-blur-md flex gap-2">
              <div className="flex-1 bg-surface-container-lowest border border-outline-variant/20 rounded-xl px-4 py-2 text-xs text-on-surface-variant">
                Type a message...
              </div>
              <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center">
                <Send className="w-3.5 h-3.5 text-on-primary-container" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
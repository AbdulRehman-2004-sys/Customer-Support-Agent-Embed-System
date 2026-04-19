// components/CTA.tsx
'use client';

import React from 'react';
import Link from 'next/link';

export default function CTA() {
  return (
    <section className="py-32 px-8">
      <div className="max-w-5xl mx-auto relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[2.5rem] blur opacity-40 group-hover:opacity-60 transition duration-1000" />
        <div className="relative bg-zinc-950 border border-indigo-500/20 rounded-[2.5rem] p-12 md:p-20 text-center overflow-hidden">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/10 blur-[100px] rounded-full" />
          
          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">Ready to Flow?</h2>
          <p className="text-lg text-on-surface-variant max-w-xl mx-auto mb-12">
            Join 12,000+ companies engineering the next generation of customer experiences with FluidArch.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link
              href="/get-started"
              className="px-10 py-5 bg-primary-container text-on-primary-container rounded-2xl font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_40px_rgba(129,140,248,0.4)]"
            >
              Launch Your Widget
            </Link>
            <button className="px-10 py-5 glass-panel border border-outline-variant/30 rounded-2xl font-bold text-lg hover:bg-surface-variant transition-colors">
              Talk to Sales
            </button>
          </div>
          
          <div className="mt-12 flex items-center justify-center gap-8 grayscale opacity-40">
            <span className="font-black text-xl italic">STRIPE</span>
            <span className="font-black text-xl italic">VERCEL</span>
            <span className="font-black text-xl italic">RAILS</span>
            <span className="font-black text-xl italic">DISCORD</span>
          </div>
        </div>
      </div>
    </section>
  );
}
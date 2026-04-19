// components/CTA.tsx
'use client';

import React from 'react';

export default function CTA() {
  return (
    <section className="py-24 px-8">
      <div className="max-w-7xl mx-auto rounded-3xl bg-[#0b1c30] p-12 lg:p-20 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,#4648d415,transparent)]" />
        
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 relative z-10 tracking-tight">
          Ready to evolve your support experience?
        </h2>
        
        <p className="text-slate-400 text-xl mb-12 max-w-2xl mx-auto relative z-10">
          Join 500+ products that have already integrated the Fluid Architect intelligence layer.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
          <button className="px-10 py-4 bg-primary text-white rounded-xl font-bold text-lg active:scale-95 transition-all hover:bg-primary/90">
            Start Free Trial
          </button>
          <button className="px-10 py-4 bg-white/10 text-white rounded-xl font-bold text-lg hover:bg-white/20 active:scale-95 transition-all">
            Talk to Sales
          </button>
        </div>
      </div>
    </section>
  );
}
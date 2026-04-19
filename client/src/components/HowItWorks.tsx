// components/HowItWorks.tsx
'use client';

import React from 'react';
import { MenuBook, Psychology, Palette, CloudUpload } from '@mui/icons-material';

const steps = [
  {
    icon: MenuBook,
    title: 'Sync Docs',
    description: 'Connect your Notion, GitHub, or Markdown docs in one click.',
    highlighted: true,
  },
  {
    icon: Psychology,
    title: 'Refine Brain',
    description: 'Customize the persona, guardrails, and knowledge retrieval logic.',
    highlighted: false,
  },
  {
    icon: Palette,
    title: 'Style & Glow',
    description: 'Apply your theme colors, gradients, and custom CSS classes.',
    highlighted: false,
  },
  {
    icon: CloudUpload,
    title: 'Deploy Edge',
    description: 'Copy a single <script> tag and launch to your users globally.',
    highlighted: true,
  },
];

export default function HowItWorks() {
  return (
    <section className="py-32 px-8 max-w-7xl mx-auto">
      <div className="mb-20 text-center">
        <span className="text-xs text-primary font-bold uppercase tracking-widest">Protocol</span>
        <h2 className="text-3xl md:text-5xl font-bold mt-2">Implementation Flow</h2>
      </div>

      <div className="relative grid grid-cols-1 md:grid-cols-4 gap-12">
        {steps.map((step, index) => (
          <div key={step.title} className="relative group">
            <div className="mb-8 relative z-10">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-xl ${
                  step.highlighted
                    ? 'bg-primary-container text-on-primary-container shadow-[0_0_20px_rgba(129,140,248,0.5)]'
                    : 'bg-surface-container-high border border-outline-variant/30 text-primary'
                }`}
              >
                {index + 1}
              </div>
            </div>
            <step.icon className="text-primary text-3xl mb-4" />
            <h4 className="text-xl font-bold mb-3">{step.title}</h4>
            <p className="text-on-surface-variant text-sm leading-relaxed">{step.description}</p>
            {index < steps.length - 1 && (
              <div className="hidden md:block absolute top-6 left-12 w-full h-[2px] bg-gradient-to-r from-primary-container via-outline-variant/30 to-transparent -z-0" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
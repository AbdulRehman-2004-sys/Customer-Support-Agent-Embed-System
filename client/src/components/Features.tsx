// components/Features.tsx
'use client';

import React from 'react';
import { Code2, Bot, Database } from 'lucide-react';

const features = [
  {
    icon: Code2,
    title: 'Easy Integration',
    description: 'Embed our intelligent layer with just two lines of code. Compatible with React, Vue, and vanilla JS frameworks.',
  },
  {
    icon: Bot,
    title: 'AI-Powered Responses',
    description: 'Automate up to 80% of routine inquiries with context-aware AI that learns from your existing support history.',
  },
  {
    icon: Database,
    title: 'Custom Knowledge Base',
    description: 'Sync your existing documentation directly. Our system builds a semantic map of your entire product ecosystem.',
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-surface-container-low" id="features">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-on-surface mb-4">
            Architecture of Support
          </h2>
          <p className="text-on-surface-variant text-lg max-w-2xl mx-auto">
            We don't just add a widget; we integrate a sophisticated intelligence layer that
            understands your product architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-surface-container-lowest p-10 rounded-2xl shadow-sm hover:shadow-xl transition-all group flex flex-col items-start"
            >
              <div className="w-14 h-14 bg-surface-container-low rounded-xl flex items-center justify-center mb-8 group-hover:bg-primary-container transition-colors">
                <feature.icon className="w-7 h-7 text-primary group-hover:text-on-primary transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-on-surface mb-4">{feature.title}</h3>
              <p className="text-on-surface-variant leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
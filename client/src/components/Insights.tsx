// components/Insights.tsx
'use client';

import React from 'react';
import { CheckCircle, Gauge } from 'lucide-react';

const benefits = [
  'Real-time sentiment analysis for every interaction.',
  'Seamless handoff from AI to human agents.',
  'Native white-labeling to match your UI tokens.',
];

export default function Insights() {
  return (
    <section className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <div className="lg:w-1/2 relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-secondary/5 rounded-full blur-2xl" />
            
            {/* Dashboard placeholder */}
            <div className="relative z-10 bg-gradient-to-br from-surface-container-low to-surface-container rounded-2xl shadow-2xl overflow-hidden border border-white/20">
              <div className="p-6 bg-surface-container-lowest/50">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-on-surface">Support Analytics</h3>
                  <span className="text-xs text-on-surface-variant">Last 30 days</span>
                </div>
                <div className="space-y-4">
                  <div className="h-32 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent rounded-xl" />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-surface-container-low rounded-xl">
                      <p className="text-xs text-on-surface-variant">Resolution Time</p>
                      <p className="text-2xl font-bold text-on-surface">-45.2%</p>
                    </div>
                    <div className="p-4 bg-surface-container-low rounded-xl">
                      <p className="text-xs text-on-surface-variant">Customer Satisfaction</p>
                      <p className="text-2xl font-bold text-on-surface">96%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 bg-surface p-6 rounded-xl shadow-xl z-20 border border-outline-variant/20">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-tertiary/10 rounded-lg">
                  <Gauge className="w-5 h-5 text-tertiary" />
                </div>
                <div>
                  <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                    Resolution Time
                  </p>
                  <p className="text-xl font-bold text-on-surface">-45.2%</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2">
            <h2 className="text-4xl font-bold text-on-surface mb-6 leading-tight">
              Data-Driven Insights Without the Overhead
            </h2>
            <p className="text-lg text-on-surface-variant mb-8 leading-relaxed">
              Fluid Architect doesn't just manage tickets; it provides a comprehensive view of your
              customer's pain points before they even reach out.
            </p>
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-4">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                  <p className="text-on-surface font-medium">{benefit}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
// components/Features.tsx
'use client';

import React from 'react';
import { Psychology, Speed, Palette, Webhook } from '@mui/icons-material';

const features = [
  {
    icon: Psychology,
    title: 'Context-Aware Neural Engine',
    description: 'Our AI understands the exact context of your user\'s journey, providing answers from your docs, codebase, and history instantly.',
    gradient: 'from-primary to-indigo-600',
    large: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDW0nXG6MRmZ2XDEppzeQorujFSnZWGTAziij4qvzu5pvG_m04lKOoGgbNvM0Ev8DOyfQ_A2SCXphFusVEvUTB0djZZu9HlJM4mNLiQhcQnSBJrsdbfHa1-cE-3zbOVyus6tClmS5882ZSIE7IlMqYbagpvvcfkSrxvTjoYXuTsuS9QpdzXCmHjS6oyU7nsP_c5Ddpq_rYIkGkTP-WKzY-abIchnxa2GJ7d-CL7_o9W2xlDTE9MvTQfy4RmfL6TyQ_6WJtepzeXyNg'
  },
  {
    icon: Speed,
    title: 'Zero Latency',
    description: 'Sub-50ms response times globally. Distributed on the edge for a native-feeling experience.',
    gradient: 'from-tertiary to-orange-500',
    large: false,
    image: ''
  },
  {
    icon: Palette,
    title: 'Luminescent UI',
    description: 'Fully customizable appearance that syncs with your brand\'s lighting, depth, and typography.',
    gradient: 'from-primary-container to-blue-500',
    large: false,
    image: ''
  },
  {
    icon: Webhook,
    title: 'Enterprise Integration',
    description: 'Connect to Salesforce, Zendesk, Slack, and Discord with a single line of code.',
    gradient: 'from-indigo-500 to-primary',
    large: true,
    image: ''
  }
];

export default function Features() {
  return (
    <section className="py-24 px-8 max-w-7xl mx-auto" id="features">
      <div className="flex flex-col items-center text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Engineered for Flow</h2>
        <p className="text-on-surface-variant max-w-2xl">
          FluidArch isn't just a widget; it's a nervous system for your customer engagement.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Large Card - Context-Aware */}
        <div className="md:col-span-2 relative group h-full">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-indigo-600 rounded-3xl blur opacity-0 group-hover:opacity-10 transition duration-500" />
          <div className="relative h-full glass-panel border border-outline-variant/10 rounded-3xl p-8 transition-transform duration-500 hover:-translate-y-2 flex flex-col justify-between overflow-hidden">
            <div className="z-10">
              <Psychology className="text-primary text-4xl mb-6" />
              <h3 className="text-2xl font-bold mb-4">Context-Aware Neural Engine</h3>
              <p className="text-on-surface-variant leading-relaxed max-w-md">
                Our AI understands the exact context of your user's journey, providing answers from your docs, codebase, and history instantly.
              </p>
            </div>
            <div className="mt-8 flex justify-end opacity-50 group-hover:opacity-100 transition-opacity">
              <img
                className="w-64 h-40 object-cover rounded-2xl"
                alt="abstract neural network visualization"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDW0nXG6MRmZ2XDEppzeQorujFSnZWGTAziij4qvzu5pvG_m04lKOoGgbNvM0Ev8DOyfQ_A2SCXphFusVEvUTB0djZZu9HlJM4mNLiQhcQnSBJrsdbfHa1-cE-3zbOVyus6tClmS5882ZSIE7IlMqYbagpvvcfkSrxvTjoYXuTsuS9QpdzXCmHjS6oyU7nsP_c5Ddpq_rYIkGkTP-WKzY-abIchnxa2GJ7d-CL7_o9W2xlDTE9MvTQfy4RmfL6TyQ_6WJtepzeXyNg"
              />
            </div>
          </div>
        </div>

        {/* Small Card - Zero Latency */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-tertiary to-orange-500 rounded-3xl blur opacity-0 group-hover:opacity-10 transition duration-500" />
          <div className="relative h-full glass-panel border border-outline-variant/10 rounded-3xl p-8 transition-transform duration-500 hover:-translate-y-2 flex flex-col items-start text-left">
            <Speed className="text-tertiary text-4xl mb-6" />
            <h3 className="text-2xl font-bold mb-4">Zero Latency</h3>
            <p className="text-on-surface-variant leading-relaxed">Sub-50ms response times globally. Distributed on the edge for a native-feeling experience.</p>
          </div>
        </div>

        {/* Small Card - Luminescent UI */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-container to-blue-500 rounded-3xl blur opacity-0 group-hover:opacity-10 transition duration-500" />
          <div className="relative h-full glass-panel border border-outline-variant/10 rounded-3xl p-8 transition-transform duration-500 hover:-translate-y-2 flex flex-col items-start text-left">
            <Palette className="text-primary-container text-4xl mb-6" />
            <h3 className="text-2xl font-bold mb-4">Luminescent UI</h3>
            <p className="text-on-surface-variant leading-relaxed">Fully customizable appearance that syncs with your brand's lighting, depth, and typography.</p>
          </div>
        </div>

        {/* Large Card - Enterprise Integration */}
        <div className="md:col-span-2 relative group h-full">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-primary rounded-3xl blur opacity-0 group-hover:opacity-10 transition duration-500" />
          <div className="relative h-full glass-panel border border-outline-variant/10 rounded-3xl p-8 transition-transform duration-500 hover:-translate-y-2 flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <Webhook className="text-primary text-4xl mb-6" />
              <h3 className="text-2xl font-bold mb-4">Enterprise Integration</h3>
              <p className="text-on-surface-variant leading-relaxed">Connect to Salesforce, Zendesk, Slack, and Discord with a single line of code. Native bi-directional syncing.</p>
            </div>
            <div className="flex-1 flex flex-col gap-3">
              <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/20 flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-blue-500/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-blue-400 text-sm">cloud</span>
                </div>
                <span className="text-sm font-medium">Salesforce Connector</span>
                <span className="ml-auto text-[10px] text-green-400 uppercase font-bold tracking-widest">Active</span>
              </div>
              <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/20 flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-primary-container/20 flex items-center justify-center">
                  <Webhook className="text-primary text-sm" />
                </div>
                <span className="text-sm font-medium">Custom Webhooks</span>
                <span className="ml-auto text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Setup</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
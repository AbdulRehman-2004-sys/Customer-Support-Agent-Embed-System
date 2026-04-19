// components/Footer.tsx
'use client';

import React from 'react';
import Link from 'next/link';

const footerLinks = [
  { name: 'Privacy', href: '/privacy' },
  { name: 'Terms', href: '/terms' },
  { name: 'API Docs', href: '/docs' },
  { name: 'Status', href: '/status' },
  { name: 'Twitter', href: 'https://twitter.com' },
];

export default function Footer() {
  return (
    <footer className="bg-zinc-950 w-full py-12 px-8 border-t border-indigo-500/10 shadow-[0_-4px_20px_rgba(129,140,248,0.05)]">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 max-w-7xl mx-auto">
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="text-lg font-bold text-zinc-100">FluidArch</div>
          <p className="text-xs uppercase tracking-widest text-zinc-500">
            © 2024 FluidArch. Engineered for flow.
          </p>
        </div>
        <div className="flex gap-8">
          {footerLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-xs uppercase tracking-widest text-zinc-500 hover:text-indigo-300 transition-colors opacity-80 hover:opacity-100"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
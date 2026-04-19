// components/Footer.tsx
'use client';

import React from 'react';

const footerLinks = [
  { name: 'Privacy', href: '#' },
  { name: 'Terms', href: '#' },
  { name: 'API Docs', href: '#' },
  { name: 'Status', href: '#' },
  { name: 'Twitter', href: '#' },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-outline-variant/10 bg-surface-container-low">
      <div className="flex flex-col md:flex-row justify-between items-center py-12 px-8 max-w-7xl mx-auto gap-6">
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="text-lg font-bold text-on-surface">Fluid Architect</div>
          <p className="text-on-surface-variant text-sm">
            © 2024 Fluid Architect. Designing the future of embedded support.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-8">
          {footerLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-on-surface-variant font-medium hover:text-primary underline-offset-4 hover:underline transition-opacity"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
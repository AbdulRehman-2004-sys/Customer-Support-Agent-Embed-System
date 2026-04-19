// components/Navbar.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const navLinks = [
  { name: 'Features', href: '#features' },
  { name: 'Solutions', href: '#solutions' },
  { name: 'Docs', href: '#docs' },
  { name: 'Pricing', href: '#pricing' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-zinc-900/40 backdrop-blur-xl border-b border-zinc-800/20'
          : 'bg-transparent'
      }`}
    >
      <div className="flex justify-between items-center px-8 h-16 max-w-7xl mx-auto">
        <Link href="/" className="text-xl font-bold bg-gradient-to-br from-indigo-400 to-indigo-200 bg-clip-text text-transparent">
          FluidArch
        </Link>

        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-zinc-400 font-semibold text-sm tracking-tight hover:text-white transition-colors duration-300"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button className="text-zinc-400 text-sm hover:text-white transition-colors">
            Sign In
          </button>
          <Link
            href="/get-started"
            className="bg-primary-container text-on-primary-container px-5 py-2 rounded-xl text-sm font-bold scale-95 active:scale-90 transition-transform shadow-[0_0_20px_rgba(129,140,248,0.3)]"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
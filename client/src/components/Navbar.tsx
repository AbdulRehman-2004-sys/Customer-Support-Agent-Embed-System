// components/Navbar.tsx
'use client';

import React, { useState, useEffect } from 'react';

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
          ? 'bg-background/85 backdrop-blur-xl shadow-[0_12px_40px_rgba(11,28,48,0.06)]'
          : 'bg-background'
      }`}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto px-8 h-20">
        <div className="text-2xl font-bold tracking-tighter text-on-surface font-headline">
          FluidArch
        </div>

        

        <div className="flex items-center space-x-4">
          <button className="text-on-surface-variant font-medium px-4 py-2 hover:text-primary active:scale-95 transition-all">
            Sign In
          </button>
          <button className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-6 py-2.5 rounded-lg font-semibold shadow-lg shadow-primary/20 active:scale-95 transition-all">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}
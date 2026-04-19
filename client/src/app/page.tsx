// app/page.tsx (updated - remove Navbar and Footer since they're in layout)
'use client';

import React, { useState, useEffect } from 'react';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Insights from '@/components/Insights';
import CTA from '@/components/CTA';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <main className="pt-20 overflow-x-hidden">
      <Hero />
      <Features />
      <Insights />
      <CTA />
    </main>
  );
}
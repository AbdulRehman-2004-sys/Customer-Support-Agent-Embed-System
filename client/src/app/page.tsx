// app/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Stats from '@/components/Stats';
import HowItWorks from '@/components/HowItWorks';
import Testimonials from '@/components/Testimonials';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import FloatingChat from '@/components/FloatingChat';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <main className="relative min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Stats />
      <HowItWorks />
      <Testimonials />
      <CTA />
      <Footer />
      <FloatingChat />
    </main>
  );
}
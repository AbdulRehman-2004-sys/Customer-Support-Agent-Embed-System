// components/Hero.tsx
'use client';

import React from 'react';
import { Play } from 'lucide-react';
import ChatPreview from './ChatPreview';
import Link from 'next/link';

export default function Hero() {
    return (
        <section className="relative overflow-hidden pt-24 pb-32 lg:pt-32 lg:pb-48">
            <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-16 items-center">
                <div className="z-10 text-left">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-surface-container-high text-primary text-sm font-semibold mb-6">
                        <span className="mr-2">✨</span> Next-gen support embedding is here
                    </div>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-on-surface mb-8 leading-[1.1]">
                        Embed{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-container">
                            Smart
                        </span>{' '}
                        Customer Support in Minutes
                    </h1>

                    <p className="text-xl text-on-surface-variant leading-relaxed mb-10 max-w-xl">
                        AI-powered support system that integrates seamlessly into your product, providing
                        instant answers and maintaining your brand's unique identity.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link href="/get-started">
                            <button className="px-8 py-4 bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-xl font-bold text-lg shadow-xl shadow-primary/25 active:scale-95 transition-transform">
                                Get Started
                            </button>
                        </Link>
                        <button className="px-8 py-4 bg-surface-container-lowest border border-outline-variant/30 text-on-surface rounded-xl font-bold text-lg hover:bg-surface-container-low active:scale-95 transition-all flex items-center justify-center gap-2">
                            <Play className="w-5 h-5" />
                            View Demo
                        </button>
                    </div>
                </div>

                <div className="relative lg:h-[600px] flex items-center justify-center">
                    <ChatPreview />

                    {/* Decorative Blobs */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
                    <div className="absolute top-1/4 right-0 w-64 h-64 bg-tertiary/5 rounded-full blur-3xl" />
                </div>
            </div>
        </section>
    );
}
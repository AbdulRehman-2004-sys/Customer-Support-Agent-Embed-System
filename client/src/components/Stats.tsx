// components/Stats.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';

const stats = [
  { value: '250M+', label: 'Interactions', suffix: '+' },
  { value: '99.9', label: 'Uptime SLA', suffix: '%' },
  { value: '45', label: 'Avg Latency', suffix: 'ms' },
  { value: '12k+', label: 'Teams Scale', suffix: '+' },
];

export default function Stats() {
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const sectionRef = useRef<HTMLElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          // Animate counts
          stats.forEach((stat, index) => {
            const targetValue = parseInt(stat.value.replace(/[^0-9]/g, ''));
            const duration = 2000;
            const step = targetValue / (duration / 16);
            let current = 0;
            const timer = setInterval(() => {
              current += step;
              if (current >= targetValue) {
                setCounts(prev => {
                  const newCounts = [...prev];
                  newCounts[index] = targetValue;
                  return newCounts;
                });
                clearInterval(timer);
              } else {
                setCounts(prev => {
                  const newCounts = [...prev];
                  newCounts[index] = Math.floor(current);
                  return newCounts;
                });
              }
            }, 16);
          });
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const getDisplayValue = (index: number) => {
    const stat = stats[index];
    if (stat.label === 'Uptime SLA') {
      return `${counts[index]}${stat.suffix}`;
    }
    if (stat.label === 'Avg Latency') {
      return `${counts[index]}${stat.suffix}`;
    }
    return `${counts[index]}${stat.suffix}`;
  };

  return (
    <section ref={sectionRef} className="py-20 bg-surface-container-lowest">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <div key={stat.label} className="flex flex-col items-center">
            <div className="text-4xl md:text-6xl font-black text-on-surface mb-2">
              {hasAnimated ? getDisplayValue(index) : '0'}
            </div>
            <div className="text-xs uppercase tracking-[0.2em] text-primary font-bold">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
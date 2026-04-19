// components/Testimonials.tsx
'use client';

import React from 'react';
import { FormatQuote, ArrowBack, ArrowForward } from '@mui/icons-material';

const testimonials = [
  {
    quote: '"FluidArch halved our ticket volume in three weeks. The implementation was smoother than any other tool we\'ve tried."',
    name: 'Marcus Chen',
    role: 'CTO, Nexus Labs',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC62lNIcRbchLmLq_gGOnR4IISfEdmjG7eEAUl5lsEgJGPrucdzVa0gmlfZq35I4qVmApzGne-qW5S46VhJIaS-GHHNoTPHntXc1E8VHpERjkjUIbEJmd9EC-hGJDBb2OkPoe0sedRVAZWaz2eTY0NoxdrS6xO2NwiM_G525O0g4KmBszxkVwpQlJtZuZePdyynwHEwdRe_T1-LW8hEnGnF0Ox8M7GC5UDgFRoImgFAZaXi-rEKnxVL7NQXPyNT36vTaQ6RIcnQL7I'
  },
  {
    quote: '"The luminescent design system actually matches our brand. It doesn\'t look like a bolt-on; it looks like we built it."',
    name: 'Sarah Jenkins',
    role: 'Design Lead, Flowify',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0-QD8Uu-zrVDF2CxmRRyRNgiwwF_Iu2QjQQ5n-Ncvy8ob5HJ5Y-SR4QLjglK9txOgkEJnaYnvzgdNKEz0in7LqdwpePJf4Vt5Gkm4FkNirKp-xdVG2JkfeMYrPPTqyYHRMqcHR-i27RG8_jFfEa2-Fz2ZZ9RBISrKZYaG9O5TQoPusae3L_vvSusRBSbXu19GJyb7akw4UdhHkwvOCTy8M0hVJAAoY2YB1GBlG6IC66MWpCYuwdDeGm4TTqt6G5CqGjCdOc0Rubs'
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 px-8 overflow-hidden bg-surface-container-low">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
        <div className="md:w-1/3">
          <h2 className="text-4xl font-bold mb-6 leading-tight">Trusted by High-Growth Teams</h2>
          <p className="text-on-surface-variant">
            See how world-class engineering teams are utilizing FluidArch to scale their support operations.
          </p>
          <div className="mt-8 flex gap-4">
            <button className="p-3 glass-panel rounded-full border border-outline-variant/20 hover:bg-surface-variant transition-colors">
              <ArrowBack className="w-5 h-5" />
            </button>
            <button className="p-3 glass-panel rounded-full border border-outline-variant/20 bg-primary/20 hover:bg-primary/30 transition-colors">
              <ArrowForward className="w-5 h-5 text-primary" />
            </button>
          </div>
        </div>

        <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className={`glass-panel border border-outline-variant/20 p-8 rounded-3xl relative ${
                index === 1 ? 'mt-8' : ''
              }`}
            >
              <FormatQuote className="text-primary/30 text-6xl absolute top-4 right-8" />
              <p className="text-on-surface leading-relaxed mb-8 relative z-10">{testimonial.quote}</p>
              <div className="flex items-center gap-4">
                <img
                  className="w-12 h-12 rounded-full object-cover border border-primary/20"
                  alt={testimonial.name}
                  src={testimonial.image}
                />
                <div>
                  <div className="font-bold">{testimonial.name}</div>
                  <div className="text-xs text-on-surface-variant uppercase tracking-widest">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
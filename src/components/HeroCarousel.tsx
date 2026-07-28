'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { MOCK_BANNERS } from '@/data/mockData';

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % MOCK_BANNERS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const currentSlide = MOCK_BANNERS[currentIndex];

  return (
    <div className="relative w-full rounded-3xl overflow-hidden shadow-lg border border-[#1E3A5F]/10 bg-[#1E3A5F]">
      <div className="relative h-[340px] md:h-[420px] lg:h-[460px] w-full">
        {/* Background Image */}
        <Image
          src={currentSlide.imageUrl}
          alt={currentSlide.title}
          fill
          className="object-cover opacity-35 transition-opacity duration-700"
          priority
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A5F] via-[#1E3A5F]/85 to-transparent flex items-center p-6 md:p-12">
          <div className="max-w-xl text-white space-y-4">
            
            {/* Health Highlights Tags */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#D99036] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Fresh Healthy Bakes
              </span>
              <span className="bg-[#EEF4FB]/20 backdrop-blur-md text-[#FAF5EE] text-xs font-semibold px-3 py-1 rounded-full border border-white/20">
                {currentSlide.tagline}
              </span>
            </div>

            {/* Banner Title */}
            <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl font-bold leading-tight text-[#FAF5EE] drop-shadow-sm">
              {currentSlide.title}
            </h2>

            {/* Subtitle */}
            <p className="text-sm md:text-lg text-amber-200/90 font-light">
              {currentSlide.subtitle}
            </p>

            {/* Call to Action Button */}
            <div className="pt-2">
              <a
                href={currentSlide.buttonLink}
                className="btn-pill-navy bg-[#D99036] hover:bg-[#B87524] text-white text-sm md:text-base font-bold shadow-md hover:scale-105 transition-all inline-flex items-center gap-2"
              >
                <span>{currentSlide.buttonText}</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Controls */}
        <button
          onClick={() => setCurrentIndex((prev) => (prev - 1 + MOCK_BANNERS.length) % MOCK_BANNERS.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 text-white flex items-center justify-center transition-colors"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => setCurrentIndex((prev) => (prev + 1) % MOCK_BANNERS.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 text-white flex items-center justify-center transition-colors"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {MOCK_BANNERS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === currentIndex ? 'w-8 bg-[#D99036]' : 'w-2 bg-white/50'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

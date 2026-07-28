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
    <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-900">
      <div className="relative h-[380px] md:h-[460px] lg:h-[500px] w-full">
        {/* Full Image Display Without Dark Color Overlays */}
        <Image
          src={currentSlide.imageUrl}
          alt={currentSlide.title}
          fill
          className="object-cover opacity-100 transition-opacity duration-700"
          priority
        />

        {/* Clean Vignette & Frosted Content Pill Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6 md:p-12">
          <div className="max-w-2xl bg-black/40 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-white/20 text-white space-y-3.5 shadow-2xl">
            
            {/* Health Highlights Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#D99036] text-white text-xs font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider shadow-md flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                Fresh Healthy Bakes
              </span>
              <span className="bg-white/20 text-slate-100 text-xs font-semibold px-3 py-1 rounded-full border border-white/20">
                {currentSlide.tagline}
              </span>
            </div>

            {/* Banner Title */}
            <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl font-bold leading-tight text-white drop-shadow-md">
              {currentSlide.title}
            </h2>

            {/* Subtitle */}
            <p className="text-xs md:text-base text-amber-200 font-medium leading-relaxed">
              {currentSlide.subtitle}
            </p>

            {/* Call to Action Pill Button */}
            <div className="pt-1">
              <a
                href={currentSlide.buttonLink}
                className="btn-pill-navy bg-[#D99036] hover:bg-[#B87524] text-white text-xs md:text-sm font-extrabold px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-all inline-flex items-center gap-2"
              >
                <span>{currentSlide.buttonText}</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Carousel Navigation Buttons */}
        <button
          onClick={() => setCurrentIndex((prev) => (prev - 1 + MOCK_BANNERS.length) % MOCK_BANNERS.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/40 backdrop-blur-md hover:bg-black/60 text-white flex items-center justify-center transition-all border border-white/20 shadow-lg"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => setCurrentIndex((prev) => (prev + 1) % MOCK_BANNERS.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/40 backdrop-blur-md hover:bg-black/60 text-white flex items-center justify-center transition-all border border-white/20 shadow-lg"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-5 right-6 flex items-center gap-2">
          {MOCK_BANNERS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2.5 rounded-full transition-all ${
                idx === currentIndex ? 'w-8 bg-[#D99036]' : 'w-2.5 bg-white/60'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

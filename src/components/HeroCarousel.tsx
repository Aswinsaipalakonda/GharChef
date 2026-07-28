'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';

export interface BannerSlide {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  imageUrl: string;
  buttonText: string;
  buttonLink: string;
  badge: string;
}

export const HERO_SLIDES: BannerSlide[] = [
  {
    id: "slide-1",
    title: "100% Organic Jaggery & Whole Wheat Cakes",
    subtitle: "Deliciously rich & moist healthy cakes baked fresh every morning without refined white sugars or artificial additives.",
    tagline: "🎂 Pure Organic Ingredients • 100% Maida Free",
    imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1600&auto=format&fit=crop&q=80",
    buttonText: "Order Fresh Cakes Now",
    buttonLink: "#popular-bakes",
    badge: "100% Whole Wheat Bakes",
  },
  {
    id: "slide-2",
    title: "Crunchy Artisanal Millet & Oats Cookies",
    subtitle: "Nutrient-dense teatime snacks made with Ragi, Foxtail Millet, Almonds, Pistachios, and Pure Desi Cow Ghee.",
    tagline: "🍪 Fiber Rich • Zero Trans Fat • Pure Desi Ghee",
    imageUrl: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=1600&auto=format&fit=crop&q=80",
    buttonText: "Explore Millet Cookies",
    buttonLink: "#cookies-section",
    badge: "Guilt-Free Teatime Treats",
  },
  {
    id: "slide-3",
    title: "Handcrafted Healthy Bakes for Special Moments",
    subtitle: "Celebrate health and flavor together with farm-fresh organic ingredients delivered straight from our oven to your door.",
    tagline: "🌾 No Sugar • No Maida • No Preservatives • No Dalda",
    imageUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1600&auto=format&fit=crop&q=80",
    buttonText: "Browse Full Menu",
    buttonLink: "#categories-section",
    badge: "Master Artisan Oven",
  },
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentIndex];

  return (
    <section className="relative w-full rounded-[36px] overflow-hidden shadow-2xl border-2 border-[#1E3A5F]/20 bg-slate-950">
      
      {/* Full Canvas Background Hero Slider Display */}
      <div className="relative min-h-[500px] md:min-h-[560px] lg:min-h-[600px] w-full flex items-center">
        
        {/* Crisp Image Container (Full Visible Background Canvas) */}
        <Image
          key={slide.id}
          src={slide.imageUrl}
          alt={slide.title}
          fill
          className="object-cover object-center transition-all duration-1000 ease-in-out scale-100 hover:scale-105"
          priority
        />

        {/* Gradient Overlay Mask: Left Dark Vignette for Text Contrast + Soft Edge Bottom Tint */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-transparent lg:w-[65%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

        {/* Floating Content Box */}
        <div className="relative z-10 max-w-3xl p-8 md:p-14 lg:p-16 space-y-6 text-white">
          
          {/* Badge Tag */}
          <div className="flex items-center gap-2">
            <span className="bg-[#D99036] text-white text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-200" />
              {slide.badge}
            </span>
          </div>

          {/* Banner Title */}
          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-extrabold leading-[1.12] tracking-tight text-white drop-shadow-lg">
            {slide.title}
          </h1>

          {/* Subtitle Description */}
          <p className="text-sm md:text-lg text-slate-200 font-medium leading-relaxed max-w-xl drop-shadow-sm">
            {slide.subtitle}
          </p>

          {/* Health Guarantee Tagline */}
          <div className="text-xs font-bold text-amber-300 bg-black/40 backdrop-blur-md border border-amber-400/30 px-4 py-2 rounded-2xl inline-block shadow-md">
            {slide.tagline}
          </div>

          {/* CTA Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-3">
            <a
              href={slide.buttonLink}
              className="btn-pill-navy bg-[#D99036] hover:bg-[#B87524] text-white text-sm font-extrabold px-9 py-4 rounded-full shadow-xl hover:scale-105 transition-all flex items-center gap-2"
            >
              <span>{slide.buttonText}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#categories-section"
              className="btn-pill-outline bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border-2 border-white/40 text-sm font-extrabold px-8 py-3.5 rounded-full shadow-md hover:scale-105 transition-all"
            >
              Explore Categories
            </a>
          </div>
        </div>

        {/* High-Contrast Interactive Controls */}
        <div className="absolute bottom-8 right-8 z-20 flex items-center gap-4 bg-slate-900/80 backdrop-blur-md text-white px-6 py-3 rounded-full border-2 border-white/30 shadow-2xl">
          <button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
            className="w-9 h-9 rounded-full bg-white/20 hover:bg-[#D99036] text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 font-mono font-extrabold text-xs">
            <span className="text-amber-400 text-sm">0{currentIndex + 1}</span>
            <span className="text-slate-500">/</span>
            <span className="text-slate-300">0{HERO_SLIDES.length}</span>
          </div>

          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length)}
            className="w-9 h-9 rounded-full bg-white/20 hover:bg-[#D99036] text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Slide Indicators Bar */}
        <div className="absolute top-6 right-8 z-20 flex items-center gap-2">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                idx === currentIndex ? 'w-8 bg-[#D99036]' : 'w-2.5 bg-white/40'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

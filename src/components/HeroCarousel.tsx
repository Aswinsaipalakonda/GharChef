'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

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
    title: "Handcrafted Organic Bakes for Every Special Moment",
    subtitle: "Artisanal cakes & cookies handcrafted with 100% organic jaggery, whole wheat flour, and pure cow desi ghee.",
    tagline: "🌾 No Sugar • No Maida • No Preservatives • No Dalda",
    imageUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1600&auto=format&fit=crop&q=80",
    buttonText: "Order Fresh Now",
    buttonLink: "#popular-bakes",
    badge: "Master Artisan Chef",
  },
  {
    id: "slide-2",
    title: "100% Organic Jaggery & Whole Wheat Cakes",
    subtitle: "Deliciously rich & moist healthy cakes baked fresh every morning without refined white sugars.",
    tagline: "🎂 Pure Organic Ingredients • 100% Maida Free",
    imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1600&auto=format&fit=crop&q=80",
    buttonText: "Explore Healthy Cakes",
    buttonLink: "#cakes-section",
    badge: "100% Whole Wheat",
  },
  {
    id: "slide-3",
    title: "Crunchy Artisanal Millet & Oats Cookies",
    subtitle: "Nutrient-dense teatime snacks made with Ragi, Foxtail Millet, Almonds, and Pistachios.",
    tagline: "🍪 Fiber Rich • Zero Trans Fat • Pure Desi Ghee",
    imageUrl: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=1600&auto=format&fit=crop&q=80",
    buttonText: "Explore Cookies",
    buttonLink: "#cookies-section",
    badge: "Guilt-Free Teatime",
  },
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentIndex];

  return (
    <section className="relative w-full rounded-[36px] overflow-hidden bg-[#FAF5EE] border-2 border-[#1E3A5F]/15 shadow-xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px] md:min-h-[500px] items-center">
        
        {/* Left Text Content Card */}
        <div className="lg:col-span-6 p-8 md:p-12 lg:p-14 space-y-6 z-10 flex flex-col justify-center">
          
          {/* Badge */}
          <div className="flex items-center gap-2">
            <span className="bg-[#D99036]/15 text-[#D99036] border border-[#D99036]/30 text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#D99036]" />
              {slide.badge}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#14233C] leading-[1.15] tracking-tight">
            {slide.title}
          </h1>

          {/* Subtitle Description */}
          <p className="text-sm md:text-base text-[#5A6D82] font-medium leading-relaxed max-w-lg">
            {slide.subtitle}
          </p>

          {/* Health Guarantee Tagline */}
          <div className="text-xs font-bold text-[#D99036] bg-[#FAF2E8] border border-[#F3D1A5] px-4 py-2 rounded-2xl inline-block max-w-max">
            {slide.tagline}
          </div>

          {/* CTA Buttons Row */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href={slide.buttonLink}
              className="btn-pill-navy bg-[#D99036] hover:bg-[#B87524] text-white text-sm font-extrabold px-8 py-3.5 rounded-full shadow-md hover:scale-105 transition-all flex items-center gap-2"
            >
              <span>{slide.buttonText}</span>
            </a>
            <a
              href="#categories-section"
              className="btn-pill-outline bg-white hover:bg-amber-50 text-[#1E3A5F] border-2 border-[#1E3A5F] text-sm font-extrabold px-7 py-3 rounded-full shadow-xs hover:scale-105 transition-all"
            >
              View Menu
            </a>
          </div>
        </div>

        {/* Right Crisp Image Showcase */}
        <div className="lg:col-span-6 relative h-[320px] sm:h-[400px] lg:h-full w-full min-h-[440px] overflow-hidden lg:rounded-l-[40px] bg-amber-50">
          <Image
            key={slide.id}
            src={slide.imageUrl}
            alt={slide.title}
            fill
            className="object-cover object-center transition-all duration-1000 ease-in-out hover:scale-105"
            priority
          />

          {/* Floating Slide Navigation Controls with High Visibility */}
          <div className="absolute bottom-6 right-6 flex items-center gap-3 z-20 bg-[#1E3A5F] text-white px-5 py-2.5 rounded-full border-2 border-white/30 shadow-2xl">
            <button
              onClick={() => setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-extrabold text-amber-300 font-mono tracking-wider">
              0{currentIndex + 1} / 0{HERO_SLIDES.length}
            </span>
            <button
              onClick={() => setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length)}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, Tag, Gift, Percent } from 'lucide-react';

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  imageUrl: string;
  buttonText: string;
  buttonLink: string;
  badge: string;
  offerBadge: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "hero-1",
    title: "100% Organic Jaggery & Whole Wheat Cakes",
    subtitle: "Deliciously rich & moist healthy cakes baked fresh every morning without refined white sugars or artificial preservatives.",
    tagline: "🎂 Pure Organic Jaggery • 100% Maida Free",
    imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1600&auto=format&fit=crop&q=80",
    buttonText: "Order Fresh Cakes Now",
    buttonLink: "#popular-bakes",
    badge: "100% Whole Wheat Bakes",
    offerBadge: "FLAT 20% OFF ON FIRST ORDER",
  },
  {
    id: "hero-2",
    title: "Crunchy Artisanal Millet & Oats Cookies",
    subtitle: "Nutrient-dense teatime snacks made with Ragi, Foxtail Millet, Almonds, Pistachios, and Pure Cow Desi Ghee.",
    tagline: "🍪 Fiber Rich • Zero Trans Fat • Pure Desi Ghee",
    imageUrl: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=1600&auto=format&fit=crop&q=80",
    buttonText: "Explore Millet Cookies",
    buttonLink: "#cookies-section",
    badge: "Guilt-Free Teatime Treats",
    offerBadge: "BUY 2 GET 1 FREE ON COOKIES",
  },
  {
    id: "hero-3",
    title: "Handcrafted Healthy Bakes for Special Moments",
    subtitle: "Celebrate health and flavor together with farm-fresh organic ingredients delivered straight from our oven to your door.",
    tagline: "🌾 No Sugar • No Maida • No Preservatives • No Dalda",
    imageUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1600&auto=format&fit=crop&q=80",
    buttonText: "Browse Full Menu",
    buttonLink: "#categories-section",
    badge: "Master Artisan Oven",
    offerBadge: "FREE EXPRESS DELIVERY ON ORDERS OVER ₹499",
  },
];

export const BANK_OFFERS = [
  {
    id: "off-1",
    title: "FLAT ₹150 OFF",
    bank: "UPI Payments",
    code: "HEALTHY150",
    desc: "Valid on orders above ₹599",
    iconBg: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    badgeColor: "bg-emerald-100 text-emerald-800",
  },
  {
    id: "off-2",
    title: "15% INSTANT OFF",
    bank: "Vizag & Hyd Special",
    code: "FRESHBAKE",
    desc: "100% Maida Free Jaggery Cakes",
    iconBg: "bg-[#D99036]/10 text-[#D99036] border-[#D99036]/20",
    badgeColor: "bg-amber-100 text-amber-800",
  },
  {
    id: "off-3",
    title: "FREE JUTE TOTE BAG",
    bank: "Cookie Combos",
    code: "GIFTCOOKIE",
    desc: "On buying any 3 millet cookie packs",
    iconBg: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    badgeColor: "bg-blue-100 text-blue-800",
  },
  {
    id: "off-4",
    title: "FLAT 20% CASHBACK",
    bank: "WhatsApp Pay & UPI",
    code: "BHAGYA20",
    desc: "Instant credit on order confirmation",
    iconBg: "bg-purple-500/10 text-purple-600 border-purple-500/20",
    badgeColor: "bg-purple-100 text-purple-800",
  },
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Exact 2-Second Autoplay Transition as requested
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const currentSlide = HERO_SLIDES[currentIndex];

  return (
    <section className="space-y-4 w-full">
      {/* 1. Beauty Centre Style Hero Banner Slider (Ultra-Smooth 2-Sec Autoplay & Rounded Card Container) */}
      <div className="relative w-full rounded-[36px] overflow-hidden shadow-2xl border-2 border-[#1E3A5F]/20 bg-slate-950">
        <div className="relative min-h-[460px] md:min-h-[520px] lg:min-h-[560px] w-full flex items-center">
          
          {/* Crisp Slide Image Display */}
          <Image
            key={currentSlide.id}
            src={currentSlide.imageUrl}
            alt={currentSlide.title}
            fill
            className="object-cover object-center transition-all duration-700 ease-in-out scale-100 hover:scale-105"
            priority
          />

          {/* Vignette Overlay for Text Contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/65 to-transparent lg:w-[65%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

          {/* Floating Content Box with Offer Badge */}
          <div className="relative z-10 max-w-3xl p-8 md:p-14 lg:p-16 space-y-5 text-white">
            
            {/* Top Badges Row */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="bg-[#D99036] text-white text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                {currentSlide.badge}
              </span>
              <span className="bg-red-600/90 text-white text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-wide border border-red-400/40 shadow-md flex items-center gap-1">
                <Tag className="w-3.5 h-3.5" />
                {currentSlide.offerBadge}
              </span>
            </div>

            {/* Banner Title */}
            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-extrabold leading-[1.12] tracking-tight text-white drop-shadow-lg">
              {currentSlide.title}
            </h1>

            {/* Subtitle Description */}
            <p className="text-sm md:text-lg text-slate-200 font-medium leading-relaxed max-w-xl drop-shadow-sm">
              {currentSlide.subtitle}
            </p>

            {/* Health Guarantee Tagline */}
            <div className="text-xs font-bold text-amber-300 bg-black/40 backdrop-blur-md border border-amber-400/30 px-4 py-2 rounded-2xl inline-block shadow-md">
              {currentSlide.tagline}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={currentSlide.buttonLink}
                className="btn-pill-navy bg-[#D99036] hover:bg-[#B87524] text-white text-sm font-extrabold px-9 py-4 rounded-full shadow-xl hover:scale-105 transition-all flex items-center gap-2"
              >
                <span>{currentSlide.buttonText}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#categories-section"
                className="btn-pill-outline bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border-2 border-white/40 text-sm font-extrabold px-8 py-3.5 rounded-full shadow-md hover:scale-105 transition-all"
              >
                View Menu
              </a>
            </div>
          </div>

          {/* Interactive Navigation Dots (Beauty Centre Style Pill Dots) */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentIndex ? 'w-8 bg-[#D99036]' : 'w-2 bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Next / Prev Controls */}
          <button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md hover:bg-[#D99036] text-white flex items-center justify-center transition-all border border-white/20 z-20 shadow-lg cursor-pointer"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md hover:bg-[#D99036] text-white flex items-center justify-center transition-all border border-white/20 z-20 shadow-lg cursor-pointer"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

        </div>
      </div>

      {/* 2. Beauty Centre Style Offers Ticker Strip (Bank Offers Marquee Directly Below Hero Banner) */}
      <div className="bg-white rounded-[28px] p-4 border-2 border-[#1E3A5F]/15 shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 mb-2 px-2">
          <div className="w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center text-[#D99036]">
            <Gift className="w-4 h-4" />
          </div>
          <h4 className="font-serif font-extrabold text-sm text-[#1E3A5F] uppercase tracking-wider">
            Special Deals &amp; Bank Offers
          </h4>
          <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300">
            Limited Time
          </span>
        </div>

        {/* Continuous Horizontal Offers Ticker Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {BANK_OFFERS.map((off) => (
            <div
              key={off.id}
              className="bg-[#FAF5EE] rounded-2xl p-3.5 border border-[#1E3A5F]/10 hover:border-[#D99036]/50 transition-all flex items-center justify-between gap-3 shadow-xs hover:shadow-sm"
            >
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold text-[#5A6D82] uppercase tracking-wider block">
                  {off.bank}
                </span>
                <h5 className="font-extrabold text-xs text-[#1E3A5F]">{off.title}</h5>
                <p className="text-[10px] text-[#5A6D82]">{off.desc}</p>
              </div>

              <div className="text-right shrink-0">
                <span className="text-[9px] font-bold text-[#5A6D82] block">Use Code</span>
                <span className="text-xs font-mono font-extrabold text-[#D99036] bg-amber-50 px-2 py-0.5 rounded-md border border-amber-300/60 block mt-0.5">
                  {off.code}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

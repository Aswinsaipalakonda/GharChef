'use client';

import React from 'react';
import Image from 'next/image';
import { ShieldCheck, Sparkles, Award } from 'lucide-react';

export default function HealthHighlightsBar() {
  const highlights = [
    {
      label: "No Sugar",
      badgeText: "100% Organic Jaggery",
      image: "https://images.unsplash.com/photo-1614735241165-6756e1df61ab?w=120&auto=format&fit=crop&q=80",
      accentBg: "bg-amber-500/20 text-amber-300 border-amber-400/30",
    },
    {
      label: "No Maida",
      badgeText: "Whole Wheat & Millets",
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=120&auto=format&fit=crop&q=80",
      accentBg: "bg-amber-400/20 text-amber-200 border-amber-300/30",
    },
    {
      label: "No Preservatives",
      badgeText: "Freshly Baked Daily",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=120&auto=format&fit=crop&q=80",
      accentBg: "bg-emerald-500/20 text-emerald-300 border-emerald-400/30",
    },
    {
      label: "No Dalda",
      badgeText: "Pure Cow Desi Ghee",
      image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=120&auto=format&fit=crop&q=80",
      accentBg: "bg-yellow-500/20 text-yellow-200 border-yellow-400/30",
    },
  ];

  return (
    <div className="bg-gradient-to-r from-[#0B132B] via-[#1C2541] to-[#0B132B] text-white py-2.5 px-4 border-b border-amber-500/20 shadow-md">
      <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
        
        {/* Left Tag: Brand Quality Stamp */}
        <div className="hidden lg:flex items-center gap-2 text-amber-400 font-extrabold tracking-wider uppercase text-[11px] shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>Our 4 Guilt-Free Promises</span>
        </div>

        {/* Center: Interactive 4 Health Cards with High-Res Micro Images */}
        <div className="flex flex-wrap items-center justify-center lg:justify-end gap-3 md:gap-6 flex-1">
          {highlights.map((item, idx) => (
            <div
              key={idx}
              className="group flex items-center gap-2.5 bg-white/5 hover:bg-white/10 px-3 py-1 rounded-full border border-white/10 hover:border-amber-400/50 transition-all duration-300 cursor-pointer shadow-xs"
            >
              {/* Micro Image Avatar Container */}
              <div className="relative w-6 h-6 rounded-full overflow-hidden border border-amber-400/60 shadow-sm shrink-0 group-hover:scale-110 transition-transform">
                <Image
                  src={item.image}
                  alt={item.label}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Text Label */}
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold tracking-tight text-white text-xs group-hover:text-amber-300 transition-colors">
                  {item.label}
                </span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border hidden sm:inline-block ${item.accentBg}`}>
                  {item.badgeText}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Right Badge: Delivery Guarantee */}
        <div className="hidden xl:flex items-center gap-1.5 text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Vizag &amp; Hyderabad Express Delivery</span>
        </div>

      </div>
    </div>
  );
}

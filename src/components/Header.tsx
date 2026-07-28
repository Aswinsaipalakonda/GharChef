'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, ShoppingBag, PhoneCall, Sparkles, Navigation, Layers, ShieldCheck } from 'lucide-react';
import HealthHighlightsBar from './HealthHighlightsBar';

interface HeaderProps {
  cartCount?: number;
  onOpenCart?: () => void;
}

export default function Header({ cartCount = 0, onOpenCart }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState<'vizag' | 'hyderabad'>('vizag');

  return (
    <header className="sticky top-0 z-50 w-full shadow-lg">
      {/* 1. Top Health Guarantee Bar with Micro Image Avatars */}
      <HealthHighlightsBar />

      {/* 2. Main Premium E-Commerce Navbar */}
      <nav className="glass-header bg-[#FAF5EE]/95 backdrop-blur-xl border-b-2 border-[#1E3A5F]/15 px-4 lg:px-10 py-3.5 transition-all">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4 md:gap-8">
          
          {/* Brand Logo & Interactive Name */}
          <Link href="/" className="flex items-center gap-3.5 group shrink-0">
            <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border-2 border-[#D99036] shadow-md group-hover:scale-105 group-hover:rotate-3 transition-all duration-300">
              <Image 
                src="/images/logo.png" 
                alt="Bhagya's Healthy Bakes Logo" 
                fill 
                className="object-cover" 
                priority
              />
            </div>
            <div>
              <h1 className="font-serif text-lg md:text-xl font-extrabold text-[#1E3A5F] tracking-tight leading-tight group-hover:text-[#D99036] transition-colors">
                Bhagya&apos;s Healthy Bakes
              </h1>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[10px] text-[#D99036] font-extrabold tracking-widest uppercase">
                  100% Maida-Free Bakes
                </span>
                <span className="text-[9px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-0.5 border border-emerald-300">
                  <ShieldCheck className="w-2.5 h-2.5 text-emerald-700" />
                  Authentic
                </span>
              </div>
            </div>
          </Link>

          {/* Quick Branch Selector Pill */}
          <div className="hidden xl:flex items-center gap-2 bg-[#1E3A5F]/5 p-1 rounded-full border border-[#1E3A5F]/15">
            <span className="text-[11px] font-bold text-[#1E3A5F] px-3 flex items-center gap-1">
              <Navigation className="w-3 h-3 text-[#D99036]" />
              Branch:
            </span>
            <button
              onClick={() => setSelectedBranch('vizag')}
              className={`text-xs font-extrabold px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                selectedBranch === 'vizag'
                  ? 'bg-[#1E3A5F] text-amber-300 shadow-sm'
                  : 'text-[#5A6D82] hover:text-[#1E3A5F]'
              }`}
            >
              Vizag (Main)
            </button>
            <button
              onClick={() => setSelectedBranch('hyderabad')}
              className={`text-xs font-extrabold px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                selectedBranch === 'hyderabad'
                  ? 'bg-[#1E3A5F] text-amber-300 shadow-sm'
                  : 'text-[#5A6D82] hover:text-[#1E3A5F]'
              }`}
            >
              Attapur (Hyd)
            </button>
          </div>

          {/* Expanded Search Bar with Category Filter */}
          <div className="hidden md:flex flex-1 max-w-md mx-2 relative">
            <div className="relative w-full flex items-center">
              <input
                type="text"
                placeholder="Search jaggery cakes, millet cookies, dry bakes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white text-[#14233C] text-xs font-medium rounded-full pl-10 pr-24 py-3 border-2 border-[#1E3A5F]/20 focus:border-[#D99036] focus:outline-none focus:ring-4 focus:ring-[#D99036]/15 transition-all placeholder:text-[#5A6D82]/60 shadow-inner"
              />
              <Search className="absolute left-3.5 w-4 h-4 text-[#1E3A5F]" />
              <button 
                className="absolute right-1.5 bg-[#1E3A5F] hover:bg-[#142842] text-amber-300 text-[11px] font-extrabold px-4 py-1.5 rounded-full transition-colors flex items-center gap-1 shadow-xs"
              >
                <span>Search</span>
              </button>
            </div>
          </div>

          {/* Action Controls & Navigation */}
          <div className="flex items-center gap-3">
            {/* Quick Navigation Links */}
            <div className="hidden lg:flex items-center gap-5 text-xs font-extrabold uppercase tracking-wider text-[#1E3A5F] mr-2">
              <a href="#categories-section" className="hover:text-[#D99036] transition-colors flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-[#D99036]" />
                <span>Categories</span>
              </a>
              <a href="#popular-bakes" className="hover:text-[#D99036] transition-colors">
                Best Sellers
              </a>
            </div>

            {/* Helpline Phone Button */}
            <a 
              href="tel:+919876543210" 
              className="hidden sm:inline-flex items-center gap-2 text-xs font-bold text-[#1E3A5F] bg-[#EEF4FB] hover:bg-[#E2EDF8] px-4 py-2.5 rounded-full border border-[#1E3A5F]/20 transition-all hover:scale-105 shadow-xs"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#D99036]" />
              <span className="hidden xl:inline">Order Helpline:</span>
              <span className="text-[#D99036] font-extrabold">+91 98765 43210</span>
            </a>

            {/* Interactive Cart Button with Pulse Badge */}
            <button
              onClick={onOpenCart}
              className="btn-pill-navy relative group flex items-center gap-2.5 bg-[#1E3A5F] hover:bg-[#142842] text-white px-5 py-2.5 rounded-full font-extrabold text-xs shadow-md transition-all hover:scale-105 cursor-pointer border border-[#D99036]/30"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
              <span className="hidden sm:inline">Cart</span>
              <span className="bg-[#D99036] text-white text-[11px] font-extrabold rounded-full min-w-[20px] h-[20px] px-1.5 flex items-center justify-center shadow-sm animate-pulse">
                {cartCount}
              </span>
            </button>
          </div>

        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden mt-3 pt-2.5 border-t border-[#1E3A5F]/10">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search organic jaggery bakes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white text-[#14233C] text-xs rounded-full pl-9 pr-4 py-2.5 border border-[#1E3A5F]/20 focus:outline-none shadow-xs"
            />
            <Search className="absolute left-3 top-3 w-3.5 h-3.5 text-[#1E3A5F]" />
          </div>
        </div>
      </nav>
    </header>
  );
}

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, ShoppingBag, PhoneCall, Sparkles, Navigation, Layers, ShieldCheck, MapPin, Grid, Heart, User, ChevronDown } from 'lucide-react';
import HealthHighlightsBar from './HealthHighlightsBar';

interface HeaderProps {
  cartCount?: number;
  onOpenCart?: () => void;
}

export default function Header({ cartCount = 0, onOpenCart }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState<'vizag' | 'hyderabad'>('vizag');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full shadow-md bg-[#FAF5EE]">
      {/* 1. Top Bar - Deals & Language/Branch Notice */}
      <div className="bg-[#1E3A5F] text-[#FAF5EE] py-1.5 px-4 text-xs font-semibold border-b border-white/10">
        <div className="max-w-[1440px] mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="bg-[#D99036] text-white text-[10px] font-black px-2 py-0.5 rounded uppercase">SUPER VALUE DEALS</span>
            <span>Save more with 100% Maida-Free &amp; Organic Jaggery Coupon Codes!</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-[11px] text-amber-200/80">
            <span>🌾 100% Organic Jaggery</span>
            <span>🌾 Pure Cow Desi Ghee</span>
            <span>🌾 Fresh Daily Baked</span>
          </div>
        </div>
      </div>

      {/* 2. Middle Header - Brand Logo, Search Bar, Location & User Action Icons (FreshCart Style) */}
      <div className="border-b border-[#1E3A5F]/15 py-3.5 px-4 lg:px-10">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4 lg:gap-8">
          
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3.5 group shrink-0">
            <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border-2 border-[#D99036] shadow-sm group-hover:scale-105 transition-all duration-300">
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
              <p className="text-[10px] text-[#D99036] font-extrabold tracking-widest uppercase">
                HOMEMADE CAKES &amp; COOKIES
              </p>
            </div>
          </Link>

          {/* Center Search Input (FreshCart Pill Search Bar) */}
          <div className="hidden md:flex flex-1 max-w-xl mx-2 relative">
            <div className="relative w-full flex items-center">
              <input
                type="text"
                placeholder="Search for organic jaggery cakes, ragi cookies, millet dry bakes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white text-[#14233C] text-xs font-medium rounded-full pl-10 pr-24 py-2.5 border-2 border-[#1E3A5F]/20 focus:border-[#D99036] focus:outline-none focus:ring-4 focus:ring-[#D99036]/15 transition-all shadow-inner"
              />
              <Search className="absolute left-3.5 w-4 h-4 text-[#1E3A5F]" />
              <button 
                className="absolute right-1 bg-[#1E3A5F] hover:bg-[#142842] text-amber-300 text-xs font-bold px-4 py-1.5 rounded-full transition-colors"
              >
                Search
              </button>
            </div>
          </div>

          {/* Location / Branch Selector Modal Trigger (FreshCart Location Button) */}
          <div className="hidden xl:flex items-center gap-2 border border-[#1E3A5F]/20 rounded-full px-3.5 py-1.5 bg-white text-xs font-bold text-[#1E3A5F]">
            <MapPin className="w-3.5 h-3.5 text-[#D99036]" />
            <span>Branch:</span>
            <button
              onClick={() => setSelectedBranch('vizag')}
              className={`px-2 py-0.5 rounded-full text-[11px] font-extrabold transition-colors cursor-pointer ${
                selectedBranch === 'vizag' ? 'bg-[#1E3A5F] text-amber-300' : 'text-slate-600 hover:text-[#1E3A5F]'
              }`}
            >
              Vizag
            </button>
            <button
              onClick={() => setSelectedBranch('hyderabad')}
              className={`px-2 py-0.5 rounded-full text-[11px] font-extrabold transition-colors cursor-pointer ${
                selectedBranch === 'hyderabad' ? 'bg-[#1E3A5F] text-amber-300' : 'text-slate-600 hover:text-[#1E3A5F]'
              }`}
            >
              Hyderabad
            </button>
          </div>

          {/* Right Action Icons (Wishlist, User, Shopping Cart) */}
          <div className="flex items-center gap-4">
            {/* Direct Admin Link */}
            <a 
              href="/admin" 
              className="hidden lg:inline-flex items-center gap-1.5 text-xs font-extrabold text-[#1E3A5F] bg-amber-100/70 hover:bg-amber-100 px-3.5 py-2 rounded-full border border-amber-300 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D99036]" />
              <span>Admin Panel</span>
            </a>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              className="btn-pill-navy relative flex items-center gap-2 bg-[#1E3A5F] hover:bg-[#142842] text-white px-4 py-2.5 rounded-full font-extrabold text-xs shadow-md transition-all cursor-pointer border border-[#D99036]/30"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Cart</span>
              <span className="bg-[#D99036] text-white text-[10px] font-extrabold rounded-full min-w-[18px] h-[18px] px-1 flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            </button>
          </div>

        </div>
      </div>

      {/* 3. Bottom Navigation Bar with FreshCart "All Departments" Dropdown & Menu Links */}
      <div className="bg-white border-b border-[#1E3A5F]/15 px-4 lg:px-10 py-2">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          
          {/* All Departments Button */}
          <div className="relative">
            <button
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className="bg-[#D99036] hover:bg-[#B87524] text-white px-5 py-2 rounded-full text-xs font-extrabold flex items-center gap-2 transition-all shadow-xs cursor-pointer"
            >
              <Grid className="w-4 h-4" />
              <span>All Categories</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isCategoryOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-[#1E3A5F]/15 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                <a href="#cakes-section" onClick={() => setIsCategoryOpen(false)} className="block px-4 py-2 text-xs font-bold text-[#1E3A5F] hover:bg-amber-50 hover:text-[#D99036] transition-colors">
                  🎂 Whole Wheat Cakes
                </a>
                <a href="#cookies-section" onClick={() => setIsCategoryOpen(false)} className="block px-4 py-2 text-xs font-bold text-[#1E3A5F] hover:bg-amber-50 hover:text-[#D99036] transition-colors">
                  🍪 Guilt-Free Cookies
                </a>
                <a href="#categories-section" onClick={() => setIsCategoryOpen(false)} className="block px-4 py-2 text-xs font-bold text-[#1E3A5F] hover:bg-amber-50 hover:text-[#D99036] transition-colors">
                  🌾 Millet &amp; Oats Bakes
                </a>
                <a href="#drybakes-section" onClick={() => setIsCategoryOpen(false)} className="block px-4 py-2 text-xs font-bold text-[#1E3A5F] hover:bg-amber-50 hover:text-[#D99036] transition-colors">
                  🍞 Teatime Dry Bakes
                </a>
              </div>
            )}
          </div>

          {/* Menu Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-extrabold uppercase tracking-wider text-[#1E3A5F]">
            <a href="/" className="hover:text-[#D99036] transition-colors">Home</a>
            <a href="#popular-bakes" className="hover:text-[#D99036] transition-colors">Best Sellers</a>
            <a href="#categories-section" className="hover:text-[#D99036] transition-colors">Categories</a>
            <a href="#deals-section" className="hover:text-[#D99036] transition-colors">Daily Deals</a>
            <a href="#reviews-section" className="hover:text-[#D99036] transition-colors">Reviews</a>
          </nav>

          {/* Delivery Phone Helpline */}
          <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-[#1E3A5F]">
            <PhoneCall className="w-3.5 h-3.5 text-[#D99036]" />
            <span className="text-[#D99036] font-extrabold">+91 98765 43210</span>
          </div>

        </div>
      </div>
    </header>
  );
}

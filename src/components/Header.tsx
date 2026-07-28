'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, ShoppingBag, PhoneCall } from 'lucide-react';
import HealthHighlightsBar from './HealthHighlightsBar';

interface HeaderProps {
  cartCount?: number;
  onOpenCart?: () => void;
}

export default function Header({ cartCount = 0, onOpenCart }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="sticky top-0 z-40 w-full shadow-md">
      {/* Top Health Guarantee Bar with Image Badges */}
      <HealthHighlightsBar />

      {/* Main E-Commerce Navbar */}
      <nav className="glass-header bg-[#FAF5EE]/95 border-b border-[#1E3A5F]/15 px-6 lg:px-12 py-3.5 transition-all">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-6">
          
          {/* Brand Logo & Name */}
          <Link href="/" className="flex items-center gap-3.5 group shrink-0">
            <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border-2 border-[#1E3A5F] shadow-md group-hover:scale-105 transition-transform">
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
              <p className="text-[10px] text-[#D99036] font-bold tracking-widest uppercase">
                Homemade Cakes &amp; Cookies
              </p>
            </div>
          </Link>

          {/* Navigation Links (Awwwards Style) */}
          <div className="hidden lg:flex items-center gap-8 text-xs font-bold uppercase tracking-wider text-[#1E3A5F]">
            <a href="/" className="hover:text-[#D99036] transition-colors">Home</a>
            <a href="#categories-section" className="hover:text-[#D99036] transition-colors">Categories</a>
            <a href="#popular-bakes" className="hover:text-[#D99036] transition-colors">Best Sellers</a>
            <a href="#reviews-section" className="hover:text-[#D99036] transition-colors">Reviews</a>
            <a href="/admin" className="text-amber-700 hover:text-[#1E3A5F] font-extrabold flex items-center gap-1 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              ⚡ Admin Portal
            </a>
          </div>

          {/* Search Bar - Amazon / Flipkart Style */}
          <div className="hidden md:flex flex-1 max-w-sm mx-2 relative">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search jaggery cakes, cookies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white text-[#14233C] text-xs rounded-full pl-9 pr-4 py-2.5 border border-[#1E3A5F]/20 focus:border-[#1E3A5F] focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/10 transition-all placeholder:text-[#5A6D82]/60 shadow-xs"
              />
              <Search className="absolute left-3 top-3 w-3.5 h-3.5 text-[#1E3A5F]" />
            </div>
          </div>

          {/* Action Controls */}
          <div className="flex items-center gap-3">
            {/* Direct Contact Button */}
            <a 
              href="tel:+919876543210" 
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[#1E3A5F] bg-[#EEF4FB] hover:bg-[#E2EDF8] px-4 py-2.5 rounded-full border border-[#1E3A5F]/20 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#D99036]" />
              <span>Need Help?</span>
            </a>

            {/* Cart Rounded Button */}
            <button
              onClick={onOpenCart}
              className="btn-pill-navy relative group flex items-center gap-2 bg-[#1E3A5F] text-white px-5 py-2.5 rounded-full font-bold text-xs shadow-md hover:bg-[#142842] transition-all cursor-pointer"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="bg-[#D99036] text-white text-[11px] font-extrabold rounded-full w-5 h-5 flex items-center justify-center shadow-sm animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

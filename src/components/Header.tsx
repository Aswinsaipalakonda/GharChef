'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, ShoppingBag, PhoneCall, Sparkles } from 'lucide-react';
import HealthHighlightsBar from './HealthHighlightsBar';

interface HeaderProps {
  cartCount?: number;
  onOpenCart?: () => void;
}

export default function Header({ cartCount = 0, onOpenCart }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="sticky top-0 z-40 w-full shadow-sm">
      {/* Top Health Guarantee Bar */}
      <HealthHighlightsBar />

      {/* Main E-Commerce Navbar */}
      <nav className="glass-header border-b border-[#1E3A5F]/10 px-4 lg:px-8 py-3 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Brand Logo & Name */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border-2 border-[#1E3A5F] shadow-sm group-hover:scale-105 transition-transform">
              <Image 
                src="/images/logo.png" 
                alt="Bhagya's Healthy Bakes Logo" 
                fill 
                className="object-cover" 
                priority
              />
            </div>
            <div>
              <h1 className="font-serif text-lg md:text-xl font-bold text-[#1E3A5F] tracking-tight leading-tight group-hover:text-[#D99036] transition-colors">
                Bhagya&apos;s Healthy Bakes
              </h1>
              <p className="text-[11px] text-[#D99036] font-medium tracking-wide uppercase">
                Homemade Cakes &amp; Cookies
              </p>
            </div>
          </Link>

          {/* Search Bar - Amazon / Flipkart Style */}
          <div className="hidden md:flex flex-1 max-w-md mx-4 relative">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search healthy cakes, jaggery cookies, millet bakes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white text-[#14233C] text-sm rounded-full pl-10 pr-4 py-2.5 border-2 border-[#1E3A5F]/20 focus:border-[#1E3A5F] focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/10 transition-all placeholder:text-[#5A6D82]/60 shadow-inner"
              />
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#1E3A5F]" />
            </div>
          </div>

          {/* Action Controls */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Direct Contact Button */}
            <a 
              href="tel:+919876543210" 
              className="hidden lg:inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E3A5F] bg-[#EEF4FB] hover:bg-[#E2EDF8] px-3.5 py-2 rounded-full border border-[#1E3A5F]/20 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#D99036]" />
              <span>Need Help?</span>
            </a>

            {/* Cart Rounded Button */}
            <button
              onClick={onOpenCart}
              className="btn-pill-navy relative group flex items-center gap-2"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
              <span className="hidden sm:inline font-semibold">Cart</span>
              {cartCount > 0 && (
                <span className="bg-[#D99036] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-sm animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden mt-2.5 pt-2 border-t border-[#1E3A5F]/10">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search jaggery cakes, cookies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white text-[#14233C] text-xs rounded-full pl-9 pr-4 py-2 border border-[#1E3A5F]/20 focus:outline-none"
            />
            <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-[#1E3A5F]" />
          </div>
        </div>
      </nav>
    </header>
  );
}

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import HeroCarousel from '@/components/HeroCarousel';
import HorizontalProductRow from '@/components/HorizontalProductRow';
import CartDrawer from '@/components/CartDrawer';
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from '@/data/mockData';
import { useCart } from '@/context/CartContext';
import { Sparkles, ShieldCheck } from 'lucide-react';

export default function StorefrontHomePage() {
  const { cart, isCartOpen, setIsCartOpen } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const topProducts = MOCK_PRODUCTS.filter((p) => p.isTopProduct);
  const cookieProducts = MOCK_PRODUCTS.filter((p) => p.category.toLowerCase().includes('cookie') || p.category.toLowerCase().includes('millet'));
  const cakeProducts = MOCK_PRODUCTS.filter((p) => p.category.toLowerCase().includes('cake'));

  return (
    <div className="min-h-screen bg-[#FAF5EE] text-[#14233C] flex flex-col">
      {/* Navbar with Sticky Health Highlights Bar */}
      <Header
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-6 space-y-10">
        
        {/* Dynamic Hero Banner Carousel */}
        <HeroCarousel />

        {/* Categories Selection Bar */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl md:text-2xl font-bold text-[#1E3A5F]">
              Explore Healthy Categories
            </h2>
            <span className="text-xs text-[#5A6D82]">100% Maida-Free Bakes</span>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`btn-pill-outline text-xs px-5 py-2.5 shrink-0 transition-all ${
                selectedCategory === 'all'
                  ? 'bg-[#1E3A5F] text-white border-[#1E3A5F] shadow-md'
                  : 'bg-white text-[#1E3A5F]'
              }`}
            >
              🌟 All Bakes
            </button>
            {MOCK_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`btn-pill-outline text-xs px-5 py-2.5 shrink-0 transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#1E3A5F] text-white border-[#1E3A5F] shadow-md'
                    : 'bg-white text-[#1E3A5F]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </section>

        {/* Health Promise Highlight Section */}
        <section className="bg-[#1E3A5F] text-[#FAF5EE] rounded-3xl p-6 md:p-8 shadow-md border border-[#1E3A5F]/20 relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="flex items-center gap-2 text-[#D99036] font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Why Bhagya&apos;s Healthy Bakes?</span>
            </div>
            <h3 className="font-serif text-2xl md:text-3xl font-bold">
              Baking Happiness Without the Guilt.
            </h3>
            <p className="text-xs md:text-sm text-amber-100/80 leading-relaxed">
              We replace refined white sugar with farm-fresh organic jaggery, swap maida for fiber-rich whole wheat &amp; millets, and bake strictly using pure cow desi ghee.
            </p>
          </div>
        </section>

        {/* Section 1: Top Products (Horizontal Scroll) */}
        <HorizontalProductRow
          id="top-products"
          title="⭐ Top Products & Best Sellers"
          subtitle="Our most loved customer favorites baked fresh daily"
          products={topProducts}
        />

        {/* Section 2: Guilt-Free Cookies & Biscuits (Horizontal Scroll) */}
        <HorizontalProductRow
          id="cookies-section"
          title="🍪 Guilt-Free Cookies & Biscuits"
          subtitle="Crispy, crunchy teatime bites made with Ragi, Oats & Almonds"
          products={cookieProducts}
        />

        {/* Section 3: Whole Wheat Healthy Cakes */}
        <HorizontalProductRow
          title="🎂 Whole Wheat & Jaggery Cakes"
          subtitle="Soft, spongy, naturally sweet cakes for every occasion"
          products={cakeProducts}
        />

      </main>

      {/* Footer */}
      <footer className="bg-[#1E3A5F] text-[#FAF5EE] mt-16 border-t border-white/10 py-10 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div className="space-y-2">
            <h4 className="font-serif text-lg font-bold text-amber-400">Bhagya&apos;s Healthy Bakes</h4>
            <p className="text-xs text-amber-100/70">Homemade Cakes and Cookies • No Sugar • No Maida • No Preservatives • No Dalda</p>
          </div>
          <p className="text-xs text-amber-200/50">
            © {new Date().getFullYear()} Bhagya&apos;s Healthy Bakes. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Cart Drawer */}
      <CartDrawer />
    </div>
  );
}

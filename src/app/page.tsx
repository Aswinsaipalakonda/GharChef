'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import HeroCarousel from '@/components/HeroCarousel';
import HorizontalProductRow from '@/components/HorizontalProductRow';
import TestimonialsSection from '@/components/TestimonialsSection';
import CartDrawer from '@/components/CartDrawer';
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from '@/data/mockData';
import { useCart } from '@/context/CartContext';
import { Sparkles, ShieldCheck, ArrowRight, HeartHandshake } from 'lucide-react';

export default function StorefrontHomePage() {
  const { cart, setIsCartOpen } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const topProducts = MOCK_PRODUCTS.filter((p) => p.isTopProduct);
  const cookieProducts = MOCK_PRODUCTS.filter((p) => p.category.toLowerCase().includes('cookie') || p.category.toLowerCase().includes('millet'));
  const cakeProducts = MOCK_PRODUCTS.filter((p) => p.category.toLowerCase().includes('cake'));

  return (
    <div className="min-h-screen bg-[#FAF5EE] text-[#14233C] flex flex-col font-sans">
      {/* Sticky Health Highlights Bar & E-Commerce Navbar */}
      <Header
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-6 space-y-12">
        
        {/* 1. Savoria Style Hero Carousel */}
        <HeroCarousel />

        {/* 2. Savoria Style "Browse By Category" Image Circular Grid */}
        <section id="categories-section" className="space-y-6 text-center py-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#D99036] bg-amber-50 px-3.5 py-1 rounded-full border border-amber-200 inline-block mb-1">
              Fresh From Our Oven
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-[#14233C]">
              Browse By Category
            </h2>
            <p className="text-xs md:text-sm text-[#5A6D82] mt-1">100% Maida-Free • Organic Jaggery Bakes</p>
          </div>

          {/* Savoria Style Image Circular Category Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-2">
            {MOCK_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`group bg-white rounded-3xl p-5 border transition-all duration-300 flex flex-col items-center text-center space-y-3 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'border-[#D99036] shadow-lg ring-2 ring-[#D99036]/30 bg-amber-50/50 scale-102'
                    : 'border-[#1E3A5F]/10 hover:border-[#D99036]/50 shadow-xs hover:shadow-md hover:-translate-y-1'
                }`}
              >
                {/* Circular Product Image Container (Savoria Style) */}
                <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-[#FAF5EE] shadow-md group-hover:scale-105 transition-transform duration-500 bg-amber-50">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-sm md:text-base text-[#14233C] group-hover:text-[#D99036] transition-colors">
                    {cat.name}
                  </h3>
                  <span className="text-[11px] font-semibold text-[#5A6D82] block mt-0.5">
                    {cat.itemCount} Varieties
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* 3. Savoria Banner: "Taste the Best, Order Now" */}
        <section className="bg-gradient-to-r from-[#1E3A5F] via-[#1A3353] to-[#142842] text-[#FAF5EE] rounded-[36px] p-8 md:p-12 shadow-xl border border-[#1E3A5F]/20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="flex items-center gap-2 text-[#D99036] font-extrabold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Guilt-Free Healthy Guarantee</span>
            </div>
            <h3 className="font-serif text-3xl md:text-4xl font-extrabold text-white leading-tight">
              Baking Happiness Without the Guilt.
            </h3>
            <p className="text-xs md:text-sm text-amber-100/90 leading-relaxed">
              We replace refined white sugar with farm-fresh organic jaggery, swap maida for fiber-rich whole wheat &amp; millets, and bake strictly using pure cow desi ghee.
            </p>
          </div>

          <a
            href="#popular-bakes"
            className="btn-pill-navy bg-[#D99036] hover:bg-[#B87524] text-white text-sm font-extrabold px-8 py-3.5 rounded-full shadow-lg hover:scale-105 transition-all shrink-0 flex items-center gap-2"
          >
            <span>Taste the Best, Order Online</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </section>

        {/* 4. Section 1: Popular Bakes (Horizontal Scroll Row) */}
        <HorizontalProductRow
          id="popular-bakes"
          title="⭐ Popular Bakes & Best Sellers"
          subtitle="Our most loved customer favorites baked fresh daily"
          products={topProducts}
        />

        {/* 5. Section 2: Guilt-Free Cookies & Biscuits */}
        <HorizontalProductRow
          id="cookies-section"
          title="🍪 Guilt-Free Artisanal Cookies"
          subtitle="Crispy, crunchy teatime bites made with Ragi, Oats & Almonds"
          products={cookieProducts}
        />

        {/* 6. Section 3: Whole Wheat Healthy Cakes */}
        <HorizontalProductRow
          id="cakes-section"
          title="🎂 Whole Wheat & Jaggery Cakes"
          subtitle="Soft, spongy, naturally sweet cakes for every occasion"
          products={cakeProducts}
        />

        {/* 7. Savoria Real Reviews & Testimonials Section */}
        <TestimonialsSection />

      </main>

      {/* Savoria Warm Footer */}
      <footer className="bg-[#1E3A5F] text-[#FAF5EE] mt-16 border-t border-white/10 py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div className="space-y-2">
            <h4 className="font-serif text-xl font-bold text-amber-400">Bhagya&apos;s Healthy Bakes</h4>
            <p className="text-xs text-amber-100/70">Homemade Cakes and Cookies • No Sugar • No Maida • No Preservatives • No Dalda</p>
          </div>
          <p className="text-xs text-amber-200/50">
            © {new Date().getFullYear()} Bhagya&apos;s Healthy Bakes. Handcrafted with ❤️ for Vizag &amp; Hyderabad.
          </p>
        </div>
      </footer>

      {/* Cart Drawer */}
      <CartDrawer />
    </div>
  );
}

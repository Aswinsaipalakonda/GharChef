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
import { Sparkles, ArrowRight } from 'lucide-react';

export default function StorefrontHomePage() {
  const { cart, setIsCartOpen } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const topProducts = MOCK_PRODUCTS.filter((p) => p.isTopProduct);
  const cookieProducts = MOCK_PRODUCTS.filter((p) => p.category.toLowerCase().includes('cookie') || p.category.toLowerCase().includes('millet'));
  const cakeProducts = MOCK_PRODUCTS.filter((p) => p.category.toLowerCase().includes('cake'));
  const dryBakeProducts = MOCK_PRODUCTS.filter((p) => p.category.toLowerCase().includes('dry') || p.category.toLowerCase().includes('teatime'));

  return (
    <div className="min-h-screen bg-[#FAF5EE] text-[#14233C] flex flex-col font-sans">
      {/* Sticky Health Highlights Bar & E-Commerce Navbar */}
      <Header
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Expanded Max-W Container for Full Width Awwwards Layout */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 md:px-10 lg:px-12 py-8 space-y-16">
        
        {/* 1. Full-Width Awwwards-Style Hero Carousel */}
        <HeroCarousel />

        {/* 2. Savoria Circular Image Category Cards Section */}
        <section id="categories-section" className="bg-white rounded-[36px] p-8 md:p-12 border-2 border-[#1E3A5F]/15 shadow-sm space-y-8 text-center">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#D99036] bg-amber-50 px-4 py-1.5 rounded-full border border-amber-200 inline-block mb-2">
              Fresh From Our Oven
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-[#14233C]">
              Browse By Category
            </h2>
            <p className="text-xs md:text-sm text-[#5A6D82] mt-1">100% Maida-Free • Organic Jaggery Bakes</p>
          </div>

          {/* Category Cards Grid with Crisp High-Res Images */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {MOCK_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`group bg-[#FAF5EE] rounded-3xl p-6 border-2 transition-all duration-300 flex flex-col items-center text-center space-y-4 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'border-[#D99036] shadow-xl ring-2 ring-[#D99036]/30 bg-amber-50/80 scale-102'
                    : 'border-[#1E3A5F]/10 hover:border-[#D99036]/50 shadow-xs hover:shadow-md hover:-translate-y-1'
                }`}
              >
                {/* High-Res Circular Image Avatar */}
                <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-white shadow-md group-hover:scale-105 transition-transform duration-500 bg-amber-100">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-sm md:text-lg text-[#14233C] group-hover:text-[#D99036] transition-colors">
                    {cat.name}
                  </h3>
                  <span className="text-xs font-semibold text-[#5A6D82] block mt-1">
                    {cat.itemCount} Varieties
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* 3. Value Proposition Guarantees Section with Real Images */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-[32px] p-6 border-2 border-[#1E3A5F]/15 shadow-sm flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-amber-200">
              <img src="https://images.unsplash.com/photo-1614735241165-6756e1df61ab?w=200&auto=format&fit=crop&q=80" alt="Jaggery" className="w-full h-full object-cover" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-base text-[#1E3A5F]">Organic Jaggery</h4>
              <p className="text-xs text-[#5A6D82] mt-0.5">100% refined sugar free, sweetened naturally.</p>
            </div>
          </div>

          <div className="bg-white rounded-[32px] p-6 border-2 border-[#1E3A5F]/15 shadow-sm flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-amber-200">
              <img src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=200&auto=format&fit=crop&q=80" alt="Whole Wheat" className="w-full h-full object-cover" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-base text-[#1E3A5F]">Whole Wheat &amp; Millets</h4>
              <p className="text-xs text-[#5A6D82] mt-0.5">Zero maida, high-fiber nutrient dense flour.</p>
            </div>
          </div>

          <div className="bg-white rounded-[32px] p-6 border-2 border-[#1E3A5F]/15 shadow-sm flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-amber-200">
              <img src="https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=200&auto=format&fit=crop&q=80" alt="Desi Ghee" className="w-full h-full object-cover" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-base text-[#1E3A5F]">Pure Cow Desi Ghee</h4>
              <p className="text-xs text-[#5A6D82] mt-0.5">Zero dalda or refined palm oils used.</p>
            </div>
          </div>
        </section>

        {/* 4. Savoria Banner: "Taste the Best, Order Now" */}
        <section className="bg-gradient-to-r from-[#1E3A5F] via-[#1A3353] to-[#142842] text-[#FAF5EE] rounded-[36px] p-8 md:p-14 shadow-2xl border-2 border-[#1E3A5F]/30 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
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
            className="btn-pill-navy bg-[#D99036] hover:bg-[#B87524] text-white text-sm font-extrabold px-8 py-4 rounded-full shadow-lg hover:scale-105 transition-all shrink-0 flex items-center gap-2"
          >
            <span>Taste the Best, Order Online</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </section>

        {/* 5. Section 1: Popular Bakes */}
        <div className="bg-white rounded-[36px] p-6 md:p-10 border-2 border-[#1E3A5F]/15 shadow-sm">
          <HorizontalProductRow
            id="popular-bakes"
            title="⭐ Popular Bakes & Best Sellers"
            subtitle="Our most loved customer favorites baked fresh daily"
            products={topProducts}
          />
        </div>

        {/* 6. Section 2: Guilt-Free Cookies & Biscuits */}
        <div className="bg-white rounded-[36px] p-6 md:p-10 border-2 border-[#1E3A5F]/15 shadow-sm">
          <HorizontalProductRow
            id="cookies-section"
            title="🍪 Guilt-Free Artisanal Cookies"
            subtitle="Crispy, crunchy teatime bites made with Ragi, Oats & Almonds"
            products={cookieProducts}
          />
        </div>

        {/* 7. Section 3: Whole Wheat Healthy Cakes */}
        <div className="bg-white rounded-[36px] p-6 md:p-10 border-2 border-[#1E3A5F]/15 shadow-sm">
          <HorizontalProductRow
            id="cakes-section"
            title="🎂 Whole Wheat & Jaggery Cakes"
            subtitle="Soft, spongy, naturally sweet cakes for every occasion"
            products={cakeProducts}
          />
        </div>

        {/* 8. Section 4: Teatime Dry Bakes & Rusks */}
        <div className="bg-white rounded-[36px] p-6 md:p-10 border-2 border-[#1E3A5F]/15 shadow-sm">
          <HorizontalProductRow
            id="drybakes-section"
            title="🍞 Teatime Dry Bakes & Rusks"
            subtitle="Classic nut breads, dry cakes, and crunchy wheat rusks"
            products={dryBakeProducts}
          />
        </div>

        {/* 9. Customer Reviews & Testimonials Section */}
        <div id="reviews-section">
          <TestimonialsSection />
        </div>

      </main>

      {/* Savoria Warm Footer */}
      <footer className="bg-[#1E3A5F] text-[#FAF5EE] mt-20 border-t border-white/10 py-12 px-4 md:px-12">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
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

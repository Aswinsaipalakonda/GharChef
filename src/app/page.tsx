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
import { Sparkles, ArrowRight, ShieldCheck, Clock, Gift, Package, RefreshCw } from 'lucide-react';

export default function StorefrontHomePage() {
  const { cart, setIsCartOpen } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const topProducts = MOCK_PRODUCTS.filter((p) => p.isTopProduct);
  const cookieProducts = MOCK_PRODUCTS.filter((p) => p.category.toLowerCase().includes('cookie') || p.category.toLowerCase().includes('millet'));
  const cakeProducts = MOCK_PRODUCTS.filter((p) => p.category.toLowerCase().includes('cake'));
  const dryBakeProducts = MOCK_PRODUCTS.filter((p) => p.category.toLowerCase().includes('dry') || p.category.toLowerCase().includes('teatime'));

  return (
    <div className="min-h-screen bg-[#FAF5EE] text-[#14233C] flex flex-col font-sans">
      {/* 1. FreshCart Header with Top Deals Strip & All Categories Dropdown */}
      <Header
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 md:px-10 lg:px-12 py-8 space-y-16">
        
        {/* 2. FreshCart Hero Carousel Slider with Bank Offers Strip */}
        <HeroCarousel />

        {/* 3. FreshCart Featured Categories Grid (Circular Image Cards with Hover Shadows) */}
        <section id="categories-section" className="bg-white rounded-[36px] p-8 md:p-12 border-2 border-[#1E3A5F]/15 shadow-sm space-y-8 text-center">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#D99036] bg-amber-50 px-4 py-1.5 rounded-full border border-amber-200 inline-block mb-2">
              Fresh From Our Oven
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-[#14233C]">
              Featured Categories
            </h2>
            <p className="text-xs md:text-sm text-[#5A6D82] mt-1">100% Maida-Free • Organic Jaggery Bakes</p>
          </div>

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

        {/* 4. FreshCart Dual Promo Banners Grid (2-Column Banner Layout) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Banner 1: Whole Wheat Cakes Promo */}
          <div className="relative rounded-[32px] overflow-hidden p-8 md:p-10 text-white min-h-[240px] flex items-center shadow-lg border-2 border-[#1E3A5F]/20 bg-gradient-to-r from-slate-950/90 via-slate-900/80 to-transparent">
            <Image
              src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1000&auto=format&fit=crop&q=80"
              alt="Organic Jaggery Cakes"
              fill
              className="object-cover -z-10"
            />
            <div className="space-y-3 max-w-sm">
              <span className="bg-[#D99036] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                GET UP TO 25% OFF
              </span>
              <h3 className="font-serif text-2xl md:text-3xl font-extrabold text-white">
                100% Whole Wheat Jaggery Cakes
              </h3>
              <a
                href="#cakes-section"
                className="btn-pill-navy bg-[#D99036] hover:bg-[#B87524] text-white text-xs font-bold px-6 py-2.5 rounded-full inline-flex items-center gap-1.5 shadow-md transition-all hover:scale-105"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Banner 2: Artisanal Millet Cookies Promo */}
          <div className="relative rounded-[32px] overflow-hidden p-8 md:p-10 text-white min-h-[240px] flex items-center shadow-lg border-2 border-[#1E3A5F]/20 bg-gradient-to-r from-slate-950/90 via-slate-900/80 to-transparent">
            <Image
              src="https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=1000&auto=format&fit=crop&q=80"
              alt="Millet & Oats Cookies"
              fill
              className="object-cover -z-10"
            />
            <div className="space-y-3 max-w-sm">
              <span className="bg-emerald-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                BUY 2 GET 1 FREE
              </span>
              <h3 className="font-serif text-2xl md:text-3xl font-extrabold text-white">
                Guilt-Free Millet &amp; Oats Biscuits
              </h3>
              <a
                href="#cookies-section"
                className="btn-pill-navy bg-[#D99036] hover:bg-[#B87524] text-white text-xs font-bold px-6 py-2.5 rounded-full inline-flex items-center gap-1.5 shadow-md transition-all hover:scale-105"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </section>

        {/* 5. FreshCart Section 1: Popular Products (Horizontal Scroll) */}
        <div id="popular-bakes" className="bg-white rounded-[36px] p-6 md:p-10 border-2 border-[#1E3A5F]/15 shadow-sm">
          <HorizontalProductRow
            id="popular-bakes"
            title="⭐ Popular Products & Best Sellers"
            subtitle="Our most loved customer favorites baked fresh daily"
            products={topProducts}
          />
        </div>

        {/* 6. FreshCart Section 2: Guilt-Free Cookies */}
        <div className="bg-white rounded-[36px] p-6 md:p-10 border-2 border-[#1E3A5F]/15 shadow-sm">
          <HorizontalProductRow
            id="cookies-section"
            title="🍪 Guilt-Free Artisanal Cookies"
            subtitle="Crispy, crunchy teatime bites made with Ragi, Oats & Almonds"
            products={cookieProducts}
          />
        </div>

        {/* 7. FreshCart Section 3: Whole Wheat Healthy Cakes */}
        <div className="bg-white rounded-[36px] p-6 md:p-10 border-2 border-[#1E3A5F]/15 shadow-sm">
          <HorizontalProductRow
            id="cakes-section"
            title="🎂 Whole Wheat & Jaggery Cakes"
            subtitle="Soft, spongy, naturally sweet cakes for every occasion"
            products={cakeProducts}
          />
        </div>

        {/* 8. FreshCart Section 4: Teatime Dry Bakes */}
        <div className="bg-white rounded-[36px] p-6 md:p-10 border-2 border-[#1E3A5F]/15 shadow-sm">
          <HorizontalProductRow
            id="drybakes-section"
            title="🍞 Teatime Dry Bakes & Rusks"
            subtitle="Classic nut breads, dry cakes, and crunchy wheat rusks"
            products={dryBakeProducts}
          />
        </div>

        {/* 9. FreshCart 4-Feature Icons Strip (Customer Guarantees) */}
        <section className="bg-white rounded-[36px] p-8 md:p-12 border-2 border-[#1E3A5F]/15 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-[#D99036] flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif font-extrabold text-base text-[#1E3A5F]">Freshly Baked Daily</h4>
                <p className="text-xs text-[#5A6D82] mt-1">Baked every morning in Vizag &amp; Hyderabad using pure cow ghee.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <Gift className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif font-extrabold text-base text-[#1E3A5F]">Best Deals &amp; Offers</h4>
                <p className="text-xs text-[#5A6D82] mt-1">Exclusive discounts on 100% Maida-free bake combos.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <Package className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif font-extrabold text-base text-[#1E3A5F]">Safe WhatsApp Order</h4>
                <p className="text-xs text-[#5A6D82] mt-1">Instant QR UPI payment with instant WhatsApp redirection.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                <RefreshCw className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif font-extrabold text-base text-[#1E3A5F]">100% Quality Assurance</h4>
                <p className="text-xs text-[#5A6D82] mt-1">No refined white sugar, no maida, no preservatives.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 10. Customer Reviews & Testimonials Section */}
        <div id="reviews-section">
          <TestimonialsSection />
        </div>

      </main>

      {/* FreshCart Style Footer */}
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

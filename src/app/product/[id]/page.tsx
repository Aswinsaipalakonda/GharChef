'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ShieldCheck, Heart, ShoppingBag, Truck, RotateCcw, Award, CheckCircle2 } from 'lucide-react';
import Header from '@/components/Header';
import CartDrawer from '@/components/CartDrawer';
import HorizontalProductRow from '@/components/HorizontalProductRow';
import { MOCK_PRODUCTS } from '@/data/mockData';
import { useCart } from '@/context/CartContext';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const { addToCart, cart, isCartOpen, setIsCartOpen } = useCart();
  
  // Find product by ID or fallback to first product
  const product = MOCK_PRODUCTS.find((p) => p.id === params.id) || MOCK_PRODUCTS[0];

  const [selectedWeight, setSelectedWeight] = useState(product.weight);
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [activeTab, setActiveTab] = useState<'ingredients' | 'reviews' | 'storage'>('ingredients');

  const relatedProducts = MOCK_PRODUCTS.filter((p) => p.id !== product.id);

  return (
    <div className="min-h-screen bg-[#FAF5EE] text-[#14233C] flex flex-col">
      <Header 
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} 
        onOpenCart={() => setIsCartOpen(true)} 
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-8 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav className="text-xs text-[#5A6D82] flex items-center gap-2">
          <Link href="/" className="hover:text-[#1E3A5F]">Home</Link>
          <span>/</span>
          <span className="text-[#D99036] font-semibold">{product.category}</span>
          <span>/</span>
          <span className="text-[#14233C] font-bold truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Amazon/Flipkart Dual Column Detail View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white rounded-3xl p-6 md:p-10 border border-[#1E3A5F]/10 shadow-sm">
          
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-6 space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-amber-50 border border-[#1E3A5F]/10 shadow-sm">
              <Image
                src={selectedImage}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              <span className="absolute top-4 left-4 bg-[#1E3A5F] text-[#FAF5EE] text-xs font-bold px-3 py-1 rounded-full shadow-md">
                100% Organic Jaggery
              </span>
            </div>

            {/* Thumbnail Carousel */}
            {product.images && product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === img ? 'border-[#D99036] scale-95 shadow-md' : 'border-[#1E3A5F]/10 opacity-70'
                    }`}
                  >
                    <Image src={img} alt={`Thumbnail ${idx}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Health Guarantee Badges */}
            <div className="bg-[#FAF2E8] rounded-2xl p-4 border border-[#F3D1A5] grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#9C5D17]">
                <CheckCircle2 className="w-4 h-4 text-[#D99036]" />
                <span>No Sugar Added</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#9C5D17]">
                <CheckCircle2 className="w-4 h-4 text-[#D99036]" />
                <span>Zero Refined Maida</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#9C5D17]">
                <CheckCircle2 className="w-4 h-4 text-[#D99036]" />
                <span>No Preservatives</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#9C5D17]">
                <CheckCircle2 className="w-4 h-4 text-[#D99036]" />
                <span>Pure Desi Ghee</span>
              </div>
            </div>
          </div>

          {/* Right Column: Product Overview & Buy Box */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#D99036] bg-amber-50 px-3 py-1 rounded-full">
                {product.category}
              </span>
              <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-[#14233C] mt-2">
                {product.name}
              </h1>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-1 bg-[#1E3A5F] text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  <span>{product.rating}</span>
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                </div>
                <span className="text-xs text-[#5A6D82]">{product.reviewsCount} Customer Reviews</span>
                <span className="text-[#5A6D82]">•</span>
                <span className="text-xs font-semibold text-emerald-600">Freshly Baked On Order</span>
              </div>
            </div>

            {/* Price Box */}
            <div className="bg-[#EEF4FB] rounded-2xl p-4 border border-[#1E3A5F]/10 flex items-center justify-between">
              <div>
                <span className="text-xs text-[#5A6D82] block">Special Price</span>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif font-bold text-3xl text-[#1E3A5F]">₹{product.price}</span>
                  <span className="text-sm text-[#5A6D82] line-through">₹{product.mrp}</span>
                  <span className="text-xs font-bold text-emerald-600">
                    Save ₹{product.mrp - product.price} ({Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF)
                  </span>
                </div>
              </div>
            </div>

            {/* Weight / Pack Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#1E3A5F] uppercase tracking-wider block">
                Select Pack Size / Weight:
              </label>
              <div className="flex items-center gap-3">
                {product.weightOptions.map((w) => (
                  <button
                    key={w}
                    onClick={() => setSelectedWeight(w)}
                    className={`btn-pill-outline text-xs px-5 py-2.5 transition-all ${
                      selectedWeight === w
                        ? 'bg-[#1E3A5F] text-white border-[#1E3A5F] shadow-md'
                        : 'bg-[#EEF4FB] text-[#1E3A5F]'
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 pt-4 border-t border-[#1E3A5F]/10">
              <button
                onClick={() => {
                  addToCart({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    weight: selectedWeight,
                    image: product.image,
                    healthBadges: product.healthBadges,
                  });
                }}
                className="btn-pill-navy flex-1 py-3.5 text-sm font-bold shadow-md hover:scale-102 transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 text-amber-400" />
                <span>Add to Cart</span>
              </button>
            </div>

            {/* Delivery Assurance */}
            <div className="grid grid-cols-3 gap-2 pt-4 text-center text-xs text-[#5A6D82]">
              <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-200/50">
                <Truck className="w-5 h-5 mx-auto text-[#D99036] mb-1" />
                <span className="font-semibold block text-[#14233C]">Same Day Bake</span>
                <span>Dispatched Fresh</span>
              </div>
              <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-200/50">
                <ShieldCheck className="w-5 h-5 mx-auto text-[#D99036] mb-1" />
                <span className="font-semibold block text-[#14233C]">Safe Packaging</span>
                <span>Hygienic Seal</span>
              </div>
              <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-200/50">
                <Award className="w-5 h-5 mx-auto text-[#D99036] mb-1" />
                <span className="font-semibold block text-[#14233C]">Shelf Life</span>
                <span>{product.shelfLife}</span>
              </div>
            </div>

          </div>
        </div>

        {/* Tabbed Info Section (Ingredients, Reviews, Storage) */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#1E3A5F]/10 shadow-sm space-y-6">
          <div className="flex border-b border-[#1E3A5F]/10 gap-6">
            {(['ingredients', 'reviews', 'storage'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm font-bold capitalize transition-colors border-b-2 ${
                  activeTab === tab
                    ? 'border-[#D99036] text-[#D99036]'
                    : 'border-transparent text-[#5A6D82] hover:text-[#1E3A5F]'
                }`}
              >
                {tab === 'ingredients' ? '100% Wholesome Ingredients' : tab}
              </button>
            ))}
          </div>

          {activeTab === 'ingredients' && (
            <div className="space-y-4">
              <p className="text-sm text-[#5A6D82] leading-relaxed">
                We take pride in absolute transparency. Every item from Bhagya&apos;s Healthy Bakes is hand-crafted with pure organic ingredients without synthetic preservatives or palm oils.
              </p>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ing, idx) => (
                  <span key={idx} className="health-badge text-xs py-1 px-3">
                    🌱 {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="font-serif text-2xl font-bold text-[#1E3A5F]">{product.rating} out of 5</span>
                <div className="flex text-amber-400">★★★★★</div>
              </div>
              <p className="text-xs text-[#5A6D82]">Based on verified purchases from Vizag &amp; Hyderabad customers.</p>
            </div>
          )}

          {activeTab === 'storage' && (
            <div className="text-xs text-[#5A6D82] space-y-2">
              <p>• Store in a cool, dry place away from direct sunlight.</p>
              <p>• Store in an airtight container once opened to preserve crispness.</p>
              <p>• Best consumed within {product.shelfLife}.</p>
            </div>
          )}
        </div>

        {/* Related Products Horizontal Scroll Row */}
        <HorizontalProductRow
          title="Customers Also Loved"
          subtitle="Explore more guilt-free cakes & artisanal bakes"
          products={relatedProducts}
        />
      </main>

      <CartDrawer />
    </div>
  );
}

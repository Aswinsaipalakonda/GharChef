'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Plus, ShoppingBag } from 'lucide-react';
import { BakeProduct } from '@/data/mockData';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: BakeProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-[#1E3A5F]/10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* Product Image & Badges */}
      <Link href={`/product/${product.id}`} className="relative aspect-4/3 w-full overflow-hidden bg-amber-50 block">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Health Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1 max-w-[80%]">
          <span className="bg-[#1E3A5F] text-[#FAF5EE] text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
            No Sugar
          </span>
          <span className="bg-[#D99036] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
            100% Wheat
          </span>
        </div>

        {/* Weight Badge */}
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs text-[#1E3A5F] text-xs font-bold px-2.5 py-1 rounded-full border border-[#1E3A5F]/10 shadow-sm">
          {product.weight}
        </div>
      </Link>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 justify-between space-y-3">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-[#5A6D82] mb-1">
            <span className="font-semibold text-[#D99036]">{product.category}</span>
            <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-full text-[#9C5D17] font-bold">
              <Star className="w-3 h-3 fill-[#D99036] text-[#D99036]" />
              <span>{product.rating}</span>
              <span className="text-[10px] text-[#5A6D82]/70">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Title */}
          <Link href={`/product/${product.id}`}>
            <h3 className="font-serif font-bold text-base md:text-lg text-[#14233C] group-hover:text-[#1E3A5F] transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Description */}
          <p className="text-xs text-[#5A6D82] line-clamp-2 mt-1 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Add Button */}
        <div className="pt-3 border-t border-[#1E3A5F]/10 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif font-bold text-lg text-[#1E3A5F]">₹{product.price}</span>
              {product.mrp && <span className="text-xs text-[#5A6D82] line-through font-normal">₹{product.mrp}</span>}
            </div>
            {product.mrp && (
              <span className="text-[10px] font-bold text-emerald-600">
                Save {Math.round(((product.mrp - product.price) / product.mrp) * 100)}%
              </span>
            )}
          </div>

          {/* Rounded Add to Cart Button */}
          <button
            onClick={() =>
              addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                weight: product.weight,
                image: product.image,
                healthBadges: product.healthBadges,
              })
            }
            className="btn-pill-navy text-xs px-4 py-2 hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
            aria-label={`Add ${product.name} to Cart`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}

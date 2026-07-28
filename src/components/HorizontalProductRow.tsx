'use client';

import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { BakeProduct } from '@/data/mockData';

interface HorizontalProductRowProps {
  title: string;
  subtitle?: string;
  products: BakeProduct[];
  id?: string;
}

export default function HorizontalProductRow({
  title,
  subtitle,
  products,
  id,
}: HorizontalProductRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id={id} className="py-8">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1E3A5F]">{title}</h2>
          {subtitle && <p className="text-xs md:text-sm text-[#5A6D82] mt-1">{subtitle}</p>}
        </div>

        {/* Scroll Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            className="w-10 h-10 rounded-full border border-[#1E3A5F]/20 bg-white text-[#1E3A5F] hover:bg-[#EEF4FB] flex items-center justify-center transition-colors shadow-sm"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-10 h-10 rounded-full border border-[#1E3A5F]/20 bg-white text-[#1E3A5F] hover:bg-[#EEF4FB] flex items-center justify-center transition-colors shadow-sm"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Touch & Swipe Horizontal Scroll Container */}
      <div
        ref={scrollRef}
        className="flex items-stretch gap-5 overflow-x-auto no-scrollbar pb-4 pt-1 snap-x snap-mandatory"
      >
        {products.map((product) => (
          <div key={product.id} className="w-[280px] sm:w-[320px] shrink-0 snap-start">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}

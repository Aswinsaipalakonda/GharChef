'use client';

import React from 'react';
import Image from 'next/image';
import { Star, ShieldCheck } from 'lucide-react';

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  comment: string;
  rating: number;
  avatar: string;
  favoriteBake: string;
}

export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: "rev-1",
    name: "Kavitha Sharma",
    role: "Verified Health Enthusiast",
    location: "Vizag Main Branch",
    comment: "Finally found a bakery in Vizag that bakes 100% whole wheat cakes with organic jaggery! My kids loved the Jaggery Choco Chip Wheat Cake. Absolute guilt-free delight!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80",
    favoriteBake: "Organic Jaggery Choco Chip Cake",
  },
  {
    id: "rev-2",
    name: "Dr. Rajesh Varma",
    role: "Diabetic Conscious Customer",
    location: "Attapur, Hyderabad",
    comment: "As a health-conscious physician, I recommend Bhagya's Healthy Bakes. Their Almond Millet cookies are crisp, diabetic-friendly, and free from Maida & Dalda.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
    favoriteBake: "Almond & Pistachio Millet Cookies",
  },
  {
    id: "rev-3",
    name: "Sneha Reddy",
    role: "Fitness & Wellness Coach",
    location: "Vizag",
    comment: "The Desi Ghee Date & Walnut Cake is out of this world! Pure cow ghee aroma with natural date sweetness. The WhatsApp order process was smooth and super fast.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
    favoriteBake: "Date & Walnut Dry Cake",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-12 bg-white rounded-[36px] p-8 md:p-12 border border-[#1E3A5F]/10 shadow-sm space-y-8">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-extrabold uppercase tracking-widest text-[#D99036] bg-amber-50 px-4 py-1.5 rounded-full border border-amber-200 inline-block">
          ❤️ Customer Love &amp; Reviews
        </span>
        <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-[#14233C]">
          Loved by 5,000+ Health Conscious Families
        </h2>
        <p className="text-xs md:text-sm text-[#5A6D82]">
          Read real experiences from customers ordering our fresh jaggery cakes &amp; millet cookies in Vizag &amp; Hyderabad.
        </p>
      </div>

      {/* Testimonials Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MOCK_TESTIMONIALS.map((rev) => (
          <div
            key={rev.id}
            className="bg-[#FAF5EE] rounded-3xl p-6 border border-[#D99036]/20 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-all hover:-translate-y-1"
          >
            <div className="space-y-3">
              {/* Rating Stars */}
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Comment Text */}
              <p className="text-xs md:text-sm text-[#14233C] italic leading-relaxed">
                &ldquo;{rev.comment}&rdquo;
              </p>
            </div>

            {/* User Profile Footer */}
            <div className="pt-4 border-t border-[#1E3A5F]/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-[#D99036] shrink-0">
                  <Image
                    src={rev.avatar}
                    alt={rev.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-xs md:text-sm text-[#1E3A5F]">{rev.name}</h4>
                  <span className="text-[10px] text-[#5A6D82] font-medium block">{rev.location}</span>
                </div>
              </div>
              
              <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                Verified
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

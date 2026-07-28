"use client";

import React, { useState } from "react";
import { ChefHat, Globe, ArrowRight } from "lucide-react";
import Link from "next/link";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="bg-white border-t border-custom-border/80 pt-16 pb-8">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 space-y-12">
        
        {/* Upper Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Column 1: Brand */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center text-white shadow-soft">
                <ChefHat className="w-6 h-6 stroke-[1.5]" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-primary">
                Ghar<span className="text-primary-text">Chef</span>
              </span>
            </Link>
            <p className="text-sm text-secondary-text leading-relaxed max-w-sm">
              India's premium homemade food marketplace connecting verified women entrepreneurs and home chefs with people who cherish healthy, fresh, and regional food.
            </p>
            <div className="flex gap-4">
              <a href="#" aria-label="Instagram" className="p-2.5 border border-custom-border rounded-xl text-secondary-text hover:text-primary hover:border-primary/50 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a href="#" aria-label="Facebook" className="p-2.5 border border-custom-border rounded-xl text-secondary-text hover:text-primary hover:border-primary/50 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="#" aria-label="Twitter" className="p-2.5 border border-custom-border rounded-xl text-secondary-text hover:text-primary hover:border-primary/50 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm text-primary-text uppercase tracking-wider">Company</h4>
            <ul className="space-y-2.5 text-sm text-secondary-text">
              <li><Link href="#about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="#careers" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="#team" className="hover:text-primary transition-colors">Our Team</Link></li>
              <li><Link href="#blog" className="hover:text-primary transition-colors">Food Blog</Link></li>
              <li><Link href="#press" className="hover:text-primary transition-colors">Press & Media</Link></li>
            </ul>
          </div>

          {/* Column 3: Legal & Support */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm text-primary-text uppercase tracking-wider">Help & Legal</h4>
            <ul className="space-y-2.5 text-sm text-secondary-text">
              <li><Link href="#help" className="hover:text-primary transition-colors">Help & Support</Link></li>
              <li><Link href="#chef-rules" className="hover:text-primary transition-colors">Partner with Us</Link></li>
              <li><Link href="#terms" className="hover:text-primary transition-colors">Terms & Conditions</Link></li>
              <li><Link href="#refund" className="hover:text-primary transition-colors">Refund & Cancellation</Link></li>
              <li><Link href="#privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm text-primary-text uppercase tracking-wider">Subscribe</h4>
            <p className="text-xs text-secondary-text leading-relaxed">
              Stay updated with delicious weekly menus and discount offers from home chefs in your locality.
            </p>
            {subscribed ? (
              <p className="text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 p-2.5 rounded-xl">
                Thank you! You are subscribed.
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="relative flex items-center">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-3 pr-10 py-2 text-xs bg-custom-bg border border-custom-border focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary rounded-xl"
                  required
                />
                <button type="submit" className="absolute right-1 p-1.5 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors cursor-pointer">
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Middle Footer: Cities Info */}
        <div className="border-y border-custom-border/50 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-secondary-text">
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            <span className="font-bold text-primary-text">We Deliver To:</span>
            <span>Hyderabad</span>
            <span>Bangalore (Coming Soon)</span>
            <span>Chennai (Coming Soon)</span>
            <span>Mumbai (Coming Soon)</span>
            <span>Delhi NCR (Coming Soon)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5" />
            <span>Select Country: India</span>
          </div>
        </div>

        {/* Bottom Footer: Copyright & App store links */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xs text-secondary-text">
            © {new Date().getFullYear()} GharChef Technologies Pvt Ltd. All rights reserved.
          </div>
          {/* App download links (mock styling) */}
          <div className="flex gap-3">
            <a href="#" className="flex items-center gap-2 px-3.5 py-1.5 bg-primary-text text-white rounded-xl hover:bg-black transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 512 512" fill="currentColor">
                <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 0 24 10 24 23v466c0 13 10 23 23 23 4.5 0 8.6-1.3 12.3-3.5l234-234.3L47 0zm251.7 256L68 493.5c3.7 2.2 7.8 3.5 12.3 3.5 7.7 0 15-4 19.3-6.5l280.8-161.2L298.7 256zm71.7-52.6l68.8-39.5c15.8-9.1 24.8-25.3 24.8-43.9 0-18.6-9-34.8-24.8-43.9l-68.8-39.5-60.1 60.1 60.1 106.7z" />
              </svg>
              <div className="text-left">
                <span className="block text-[8px] text-muted leading-none">GET IT ON</span>
                <span className="font-semibold text-[10px] leading-tight">Google Play</span>
              </div>
            </a>
            <a href="#" className="flex items-center gap-2 px-3.5 py-1.5 bg-primary-text text-white rounded-xl hover:bg-black transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 512 512" fill="currentColor">
                <path d="M164.2 120.2C164.2 53.6 218 0 284.6 0c41.3 0 79 21.3 100.9 55.4-44.4 26.6-74 74.4-74 128.8 0 83.1 67.4 150.5 150.5 150.5 8.1 0 16.1-.7 24-1.9-25.1 72.8-94.4 123.8-174.5 123.8-100.7 0-182.3-81.6-182.3-182.3.1-51.5 21.1-98.2 55.4-131.7zm120.4-53.6c-48.4 0-87.7 39.3-87.7 87.7 0 48.4 39.3 87.7 87.7 87.7 48.4 0 87.7-39.3 87.7-87.7 0-48.4-39.3-87.7-87.7-87.7z" />
              </svg>
              <div className="text-left">
                <span className="block text-[8px] text-muted leading-none">Download on the</span>
                <span className="font-semibold text-[10px] leading-tight">App Store</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

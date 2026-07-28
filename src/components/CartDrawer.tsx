'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import CheckoutModal from '@/components/CheckoutModal';

interface CartDrawerProps {
  onProceedToCheckout?: () => void;
}

export default function CartDrawer({ onProceedToCheckout }: CartDrawerProps) {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, totalAmount } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity" 
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF5EE] shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-5 bg-[#1E3A5F] text-[#FAF5EE] flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2">
              <span className="text-xl">🍰</span>
              <h2 className="font-serif text-lg font-bold">Your Fresh Bakes Cart</h2>
            </div>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="p-1 rounded-full hover:bg-white/10 text-white transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Health Guarantee Banner */}
          <div className="bg-[#FAF2E8] border-b border-[#F3D1A5] px-4 py-2 flex items-center justify-center gap-2 text-xs font-semibold text-[#9C5D17]">
            <ShieldCheck className="w-4 h-4 text-[#D99036]" />
            <span>Guaranteed Fresh • 100% Organic Jaggery &amp; Whole Wheat</span>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="text-5xl mb-3">🍪</div>
                <h3 className="font-serif text-lg font-bold text-[#1E3A5F] mb-1">Your cart is empty</h3>
                <p className="text-xs text-[#5A6D82] mb-6">Explore our healthy guilt-free cakes &amp; cookies!</p>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="btn-pill-navy text-xs"
                >
                  Browse Healthy Bakes
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div 
                  key={item.id}
                  className="bg-white rounded-2xl p-3.5 border border-[#1E3A5F]/10 shadow-sm flex items-center gap-3"
                >
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-amber-50 shrink-0">
                    <Image 
                      src={item.image} 
                      alt={item.name} 
                      fill 
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-xs md:text-sm text-[#14233C] truncate">{item.name}</h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[11px] font-medium text-[#D99036] bg-amber-50 px-2 py-0.5 rounded-full">
                        {item.weight}
                      </span>
                      <span className="font-bold text-xs text-[#1E3A5F]">₹{item.price}</span>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-[#1E3A5F]/20 rounded-full bg-[#EEF4FB]">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-6 h-6 flex items-center justify-center text-[#1E3A5F] hover:bg-white rounded-full transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-[#14233C]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-6 h-6 flex items-center justify-center text-[#1E3A5F] hover:bg-white rounded-full transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 p-1 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Checkout */}
          {cart.length > 0 && (
            <div className="p-5 bg-white border-t border-[#1E3A5F]/10 shadow-lg space-y-3">
              <div className="flex justify-between items-center text-xs text-[#5A6D82]">
                <span>Subtotal</span>
                <span className="font-semibold text-[#14233C]">₹{totalAmount}</span>
              </div>
              <div className="flex justify-between items-center text-xs text-[#5A6D82]">
                <span>Delivery Charges</span>
                <span className="font-semibold text-emerald-600">Calculated at Checkout</span>
              </div>
              <div className="border-t border-dashed border-[#1E3A5F]/15 pt-2 flex justify-between items-center">
                <span className="font-serif font-bold text-sm text-[#1E3A5F]">Total Payable</span>
                <span className="font-bold text-base text-[#1E3A5F]">₹{totalAmount}</span>
              </div>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                  if (onProceedToCheckout) onProceedToCheckout();
                }}
                className="btn-pill-navy w-full py-3 text-sm font-bold flex items-center justify-center gap-2 group mt-2"
              >
                <span>Proceed to Pay &amp; Order</span>
                <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}

        </div>
      </div>

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </div>
  );
}

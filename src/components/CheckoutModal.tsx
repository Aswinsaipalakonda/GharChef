'use client';

import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X, CheckCircle2, ShieldCheck, ArrowRight, QrCode } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { SELLER_CONFIG, generateWhatsAppOrderUrl } from '@/utils/whatsapp';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { cart, totalAmount, clearCart } = useCart();

  const [step, setStep] = useState<'details' | 'payment'>('details');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Vizag');
  const [pincode, setPincode] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const orderId = `BHB-${Math.floor(100000 + Math.random() * 900000)}`;

  // Dynamic UPI URL encoding exact total amount
  const upiPayUrl = `upi://pay?pa=${SELLER_CONFIG.upiId}&pn=${encodeURIComponent(
    SELLER_CONFIG.sellerName
  )}&am=${totalAmount}&cu=INR&tn=Order_${orderId}`;

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone || !address || !pincode) {
      alert('Please fill in all required delivery details.');
      return;
    }
    setStep('payment');
  };

  const handleConfirmAndDispatch = () => {
    const whatsappUrl = generateWhatsAppOrderUrl({
      customerName,
      phone,
      address,
      city,
      pincode,
      notes,
      items: cart.map((i) => ({
        name: i.name,
        weight: i.weight || '500g',
        quantity: i.quantity,
        price: i.price,
      })),
      totalAmount,
      paymentStatus: 'PAID',
      orderId,
    });

    clearCart();
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-[#FAF5EE] rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-[#1E3A5F]/20 z-10 space-y-6">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#1E3A5F]/10 pb-4">
          <div>
            <h2 className="font-serif text-xl font-bold text-[#1E3A5F]">
              {step === 'details' ? 'Delivery Details' : 'UPI QR Payment'}
            </h2>
            <p className="text-xs text-[#5A6D82]">Order #{orderId}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#1E3A5F] hover:bg-[#EEF4FB] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step 1: Customer Details Form */}
        {step === 'details' && (
          <form onSubmit={handleProceedToPayment} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-[#1E3A5F] block mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                className="w-full bg-white text-xs rounded-full px-4 py-2.5 border border-[#1E3A5F]/20 focus:border-[#1E3A5F] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-[#1E3A5F] block mb-1">Mobile Number *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="10-digit number"
                  className="w-full bg-white text-xs rounded-full px-4 py-2.5 border border-[#1E3A5F]/20 focus:border-[#1E3A5F] focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-[#1E3A5F] block mb-1">City</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-white text-xs rounded-full px-4 py-2.5 border border-[#1E3A5F]/20 focus:border-[#1E3A5F] focus:outline-none font-medium"
                >
                  <option value="Vizag">Vizag</option>
                  <option value="Hyderabad">Hyderabad (Attapur)</option>
                  <option value="Other">Other City</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-[#1E3A5F] block mb-1">Delivery Address *</label>
              <textarea
                required
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Flat / House No., Street, Colony"
                className="w-full bg-white text-xs rounded-2xl p-3 border border-[#1E3A5F]/20 focus:border-[#1E3A5F] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-[#1E3A5F] block mb-1">Pincode *</label>
                <input
                  type="text"
                  required
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="e.g. 530003"
                  className="w-full bg-white text-xs rounded-full px-4 py-2.5 border border-[#1E3A5F]/20 focus:border-[#1E3A5F] focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-[#1E3A5F] block mb-1">Special Notes</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Less sweet"
                  className="w-full bg-white text-xs rounded-full px-4 py-2.5 border border-[#1E3A5F]/20 focus:border-[#1E3A5F] focus:outline-none"
                />
              </div>
            </div>

            {/* Order Total Summary */}
            <div className="bg-[#EEF4FB] rounded-2xl p-3 flex justify-between items-center text-xs font-bold text-[#1E3A5F]">
              <span>Payable Amount</span>
              <span className="text-base">₹{totalAmount}</span>
            </div>

            <button
              type="submit"
              className="btn-pill-navy w-full py-3 text-xs font-bold flex items-center justify-center gap-2"
            >
              <span>Proceed to Scan &amp; Pay</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </form>
        )}

        {/* Step 2: Dynamic UPI QR Code & WhatsApp Dispatch */}
        {step === 'payment' && (
          <div className="space-y-6 text-center">
            
            {/* Dynamic QR Display */}
            <div className="bg-white rounded-2xl p-6 border border-[#1E3A5F]/10 shadow-sm inline-block mx-auto space-y-3">
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#1E3A5F] mb-1">
                <QrCode className="w-4 h-4 text-[#D99036]" />
                <span>Scan with Any UPI App</span>
              </div>
              
              <div className="p-3 bg-[#FAF5EE] rounded-xl border border-[#1E3A5F]/10 inline-block">
                <QRCodeSVG value={upiPayUrl} size={180} level="H" />
              </div>

              <div className="text-xs text-[#5A6D82] space-y-0.5">
                <p className="font-bold text-sm text-[#1E3A5F]">Exact Amount: ₹{totalAmount}</p>
                <p className="text-[11px]">Payee: {SELLER_CONFIG.sellerName}</p>
                <p className="text-[10px] text-[#D99036] font-mono">{SELLER_CONFIG.upiId}</p>
              </div>
            </div>

            {/* Supported Apps Badges */}
            <div className="flex justify-center items-center gap-3 text-[11px] font-semibold text-[#5A6D82]">
              <span className="bg-white px-2.5 py-1 rounded-full border border-gray-200">Google Pay</span>
              <span className="bg-white px-2.5 py-1 rounded-full border border-gray-200">PhonePe</span>
              <span className="bg-white px-2.5 py-1 rounded-full border border-gray-200">Paytm</span>
              <span className="bg-white px-2.5 py-1 rounded-full border border-gray-200">BHIM</span>
            </div>

            <div className="bg-[#FAF2E8] rounded-2xl p-3 text-xs font-semibold text-[#9C5D17] border border-[#F3D1A5] flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#D99036]" />
              <span>After paying, click below to route order to WhatsApp!</span>
            </div>

            {/* Final Dispatch Button */}
            <div className="space-y-2">
              <button
                onClick={handleConfirmAndDispatch}
                className="btn-pill-navy w-full py-3.5 text-sm font-bold bg-[#D99036] hover:bg-[#B87524] text-white flex items-center justify-center gap-2 shadow-md hover:scale-102 transition-all"
              >
                <CheckCircle2 className="w-5 h-5 text-white" />
                <span>I Have Paid ₹{totalAmount} → Send Order to WhatsApp</span>
              </button>
              <button
                onClick={() => setStep('details')}
                className="text-xs font-semibold text-[#5A6D82] hover:text-[#1E3A5F] underline"
              >
                Back to Delivery Details
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

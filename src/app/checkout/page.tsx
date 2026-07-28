"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  MapPin,
  CreditCard,
  ShoppingBag,
  Percent,
  Plus,
  Minus,
  Trash2,
  CheckCircle2,
  Info,
  DollarSign,
  AlertTriangle
} from "lucide-react";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Address {
  id: string;
  tag: "Home" | "Work" | "Other";
  addressLine: string;
  city: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const {
    cartItems,
    cartCount,
    cartSubtotal,
    cartDiscount,
    deliveryCharge,
    gstAmount,
    cartTotal,
    updateQuantity,
    removeFromCart,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    clearCart
  } = useCart();

  const { currentAddress, setCurrentAddress } = useAuth();

  const [selectedAddressId, setSelectedAddressId] = useState("addr-1");
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "cod">("upi");
  
  // Card input states
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  
  // Coupon states
  const [couponText, setCouponText] = useState("");
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");
  const [simulateFailure, setSimulateFailure] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const mockAddresses: Address[] = [
    {
      id: "addr-1",
      tag: "Home",
      addressLine: "Flat 402, Sunshine Heights, Gachibowli",
      city: "Hyderabad"
    },
    {
      id: "addr-2",
      tag: "Work",
      addressLine: "Cabin 12, Level 5, Cyber Towers, Madhapur",
      city: "Hyderabad"
    }
  ];

  const handleCouponApply = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    setCouponSuccess("");
    const res = applyCoupon(couponText);
    if (res.success) {
      setCouponSuccess(res.message);
      setCouponText("");
    } else {
      setCouponError(res.message);
    }
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);

    // Simulate payment transaction
    setTimeout(() => {
      setIsProcessing(false);
      if (simulateFailure) {
        // Redirect to Order Failure Page
        router.push("/checkout/failure");
      } else {
        // Save order total in local storage for the success page to display
        localStorage.setItem("last_order_total", cartTotal.toString());
        // Clear cart items
        clearCart();
        // Redirect to Order Success Page
        router.push("/checkout/success");
      }
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-custom-bg">
      <Navbar />

      <main className="flex-grow max-w-[1400px] mx-auto w-full px-4 md:px-8 py-8 text-left">
        
        {/* Navigation & Header */}
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-secondary-text hover:text-primary transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </Link>
          <h1 className="text-2xl font-bold text-primary-text mt-3">Secure Checkout</h1>
        </div>

        {cartItems.length === 0 ? (
          /* EMPTY CART SCREEN */
          <div className="text-center py-20 bg-white border border-custom-border rounded-card max-w-xl mx-auto shadow-soft p-8 space-y-6">
            <div className="w-20 h-20 rounded-full bg-light-orange flex items-center justify-center text-primary mx-auto">
              <ShoppingBag className="w-10 h-10 stroke-[1.2]" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-bold text-lg text-primary-text">Your Cart is Empty</h3>
              <p className="text-sm text-secondary-text max-w-xs mx-auto">
                You haven't added any delicious homemade meals to your cart yet. Let's explore verified home kitchens.
              </p>
            </div>
            <Link href="/" className="inline-block pt-2">
              <Button variant="primary" size="md" className="font-bold shadow-soft">
                Browse Homemade Dishes
              </Button>
            </Link>
          </div>
        ) : (
          /* COMPLETE CHECKOUT EXPERIENCE */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Panels Column (Cart, Address, Payments) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* 1. Cart Summary details */}
              <Card className="rounded-card border border-custom-border bg-white shadow-soft">
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-bold text-base text-primary-text flex items-center gap-2 border-b border-custom-border/50 pb-3">
                    <ShoppingBag className="w-5 h-5 text-primary" />
                    <span>Review Cart Items ({cartCount})</span>
                  </h3>

                  <div className="divide-y divide-custom-border/50">
                    {cartItems.map((item) => (
                      <div key={item.product.id} className="py-4 flex gap-4 items-center">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-14 h-14 rounded-xl object-cover border border-custom-border"
                        />
                        <div className="flex-grow text-left">
                          <div className="flex items-center gap-1.5">
                            <span className={`w-2 h-2 rounded-full ${item.product.foodType === "veg" ? "bg-emerald-500" : "bg-rose-500"}`} />
                            <h4 className="font-bold text-sm text-primary-text line-clamp-1">{item.product.name}</h4>
                          </div>
                          <p className="text-[11px] text-secondary-text mt-0.5">By {item.product.chefName}</p>
                        </div>

                        {/* Qty adjustments */}
                        <div className="flex items-center gap-2.5 border border-custom-border rounded-xl px-2 py-1 bg-custom-bg">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="text-primary hover:bg-light-orange p-0.5 rounded transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-bold w-4 text-center text-primary-text">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="text-primary hover:bg-light-orange p-0.5 rounded transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <span className="font-bold text-sm text-primary-text w-16 text-right">₹{item.product.price * item.quantity}</span>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-muted hover:text-danger p-1 rounded transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 2. Address Selection Panel */}
              <Card className="rounded-card border border-custom-border bg-white shadow-soft">
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-bold text-base text-primary-text flex items-center gap-2 border-b border-custom-border/50 pb-3">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span>Select Delivery Address</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {mockAddresses.map((addr) => {
                      const isSelected = selectedAddressId === addr.id;
                      return (
                        <div
                          key={addr.id}
                          onClick={() => {
                            setSelectedAddressId(addr.id);
                            setCurrentAddress(addr.addressLine + ", " + addr.city);
                          }}
                          className={`p-4 border rounded-2xl cursor-pointer transition-all ${
                            isSelected
                              ? "border-primary bg-light-orange/30 shadow-sm"
                              : "border-custom-border bg-white hover:border-primary/20"
                          }`}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-bold text-primary-text">{addr.tag}</span>
                            {isSelected && <CheckCircle2 className="w-4 h-4 text-primary fill-primary/10" />}
                          </div>
                          <p className="text-xs text-secondary-text leading-relaxed">{addr.addressLine}</p>
                          <p className="text-[10px] text-muted font-medium mt-1">{addr.city}</p>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* 3. Payment Methods Panel */}
              <Card className="rounded-card border border-custom-border bg-white shadow-soft">
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-bold text-base text-primary-text flex items-center gap-2 border-b border-custom-border/50 pb-3">
                    <CreditCard className="w-5 h-5 text-primary" />
                    <span>Payment Method</span>
                  </h3>

                  <div className="space-y-3">
                    {/* UPI Option */}
                    <div
                      onClick={() => setPaymentMethod("upi")}
                      className={`p-4 border rounded-2xl cursor-pointer transition-all flex items-start gap-3.5 ${
                        paymentMethod === "upi" ? "border-primary bg-light-orange/30" : "border-custom-border bg-white"
                      }`}
                    >
                      <input
                        type="radio"
                        checked={paymentMethod === "upi"}
                        onChange={() => setPaymentMethod("upi")}
                        className="accent-primary mt-0.5"
                      />
                      <div className="text-left space-y-0.5">
                        <span className="text-sm font-bold text-primary-text">Pay via UPI (GPay / PhonePe / Paytm)</span>
                        <p className="text-[11px] text-secondary-text">Fast checkout using any UPI client. Auto-approves mock transaction.</p>
                      </div>
                    </div>

                    {/* Credit Card Option */}
                    <div
                      onClick={() => setPaymentMethod("card")}
                      className={`p-4 border rounded-2xl cursor-pointer transition-all flex flex-col gap-3.5 ${
                        paymentMethod === "card" ? "border-primary bg-light-orange/30" : "border-custom-border bg-white"
                      }`}
                    >
                      <div className="flex items-start gap-3.5">
                        <input
                          type="radio"
                          checked={paymentMethod === "card"}
                          onChange={() => setPaymentMethod("card")}
                          className="accent-primary mt-0.5"
                        />
                        <div className="text-left space-y-0.5">
                          <span className="text-sm font-bold text-primary-text">Credit or Debit Card</span>
                          <p className="text-[11px] text-secondary-text">Secure transaction using Visa, MasterCard, or RuPay.</p>
                        </div>
                      </div>

                      {paymentMethod === "card" && (
                        <div className="grid grid-cols-3 gap-3 pt-2 pl-7 text-xs">
                          <div className="col-span-3">
                            <label className="block text-[10px] font-semibold text-secondary-text mb-1">Card Number</label>
                            <Input
                              type="text"
                              placeholder="16-digit card number"
                              maxLength={16}
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ""))}
                            />
                          </div>
                          <div className="col-span-2">
                            <label className="block text-[10px] font-semibold text-secondary-text mb-1">Expiry Date</label>
                            <Input
                              type="text"
                              placeholder="MM/YY"
                              maxLength={5}
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-semibold text-secondary-text mb-1">CVV</label>
                            <Input
                              type="password"
                              placeholder="***"
                              maxLength={3}
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ""))}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Cash on Delivery Option */}
                    <div
                      onClick={() => setPaymentMethod("cod")}
                      className={`p-4 border rounded-2xl cursor-pointer transition-all flex items-start gap-3.5 ${
                        paymentMethod === "cod" ? "border-primary bg-light-orange/30" : "border-custom-border bg-white"
                      }`}
                    >
                      <input
                        type="radio"
                        checked={paymentMethod === "cod"}
                        onChange={() => setPaymentMethod("cod")}
                        className="accent-primary mt-0.5"
                      />
                      <div className="text-left space-y-0.5">
                        <span className="text-sm font-bold text-primary-text">Cash on Delivery (COD)</span>
                        <p className="text-[11px] text-secondary-text">Pay in cash or UPI scan when the delivery partner reaches your doorstep.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

            </div>

            {/* Right Column: Floating Order Summary */}
            <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
              
              {/* Order Calculations Card */}
              <Card className="rounded-card border border-custom-border bg-white shadow-soft">
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-bold text-base text-primary-text border-b border-custom-border/50 pb-3">Order Summary</h3>

                  {/* Coupon Codes */}
                  <div className="space-y-2">
                    <form onSubmit={handleCouponApply} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter coupon code"
                        value={couponText}
                        onChange={(e) => setCouponText(e.target.value)}
                        className="flex-grow px-3 py-2 border border-custom-border rounded-xl text-xs uppercase focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                      />
                      <button type="submit" className="px-3.5 py-2 bg-primary hover:bg-primary-hover text-white rounded-xl text-xs font-bold transition-colors cursor-pointer">
                        Apply
                      </button>
                    </form>
                    {couponError && <p className="text-[10px] text-danger font-semibold">{couponError}</p>}
                    {couponSuccess && <p className="text-[10px] text-emerald-600 font-semibold">{couponSuccess}</p>}
                    
                    {appliedCoupon && (
                      <div className="flex justify-between items-center px-3 py-2 bg-emerald-50 border border-emerald-100 rounded-xl">
                        <div className="text-[10px]">
                          <span className="font-bold text-emerald-800">{appliedCoupon.code}</span> Applied!
                          <p className="text-[9px] text-emerald-600">{appliedCoupon.description}</p>
                        </div>
                        <button onClick={removeCoupon} className="text-[10px] font-bold text-emerald-800 hover:text-rose-600">Remove</button>
                      </div>
                    )}
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="space-y-2.5 text-xs text-secondary-text">
                    <div className="flex justify-between">
                      <span>Subtotal ({cartCount} items)</span>
                      <span className="font-medium text-primary-text">₹{cartSubtotal}</span>
                    </div>
                    {cartDiscount > 0 && (
                      <div className="flex justify-between text-emerald-600">
                        <span>Coupon Discount</span>
                        <span>- ₹{cartDiscount}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Delivery Fee</span>
                      <span className="font-medium text-primary-text">
                        {deliveryCharge === 0 ? <span className="text-emerald-600 font-semibold">FREE</span> : `₹${deliveryCharge}`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxes & GST (5%)</span>
                      <span className="font-medium text-primary-text">₹{gstAmount}</span>
                    </div>
                    <div className="flex justify-between pt-3 border-t border-custom-border text-sm font-bold text-primary-text">
                      <span>Grand Total</span>
                      <span className="text-primary text-base">₹{cartTotal}</span>
                    </div>
                  </div>

                  {/* Payment Simulator Toggle */}
                  <div className="pt-3 border-t border-custom-border/50 flex items-center justify-between text-[11px] text-muted">
                    <span className="flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-secondary-orange" />
                      <span>Simulate Payment Failure?</span>
                    </span>
                    <input
                      type="checkbox"
                      checked={simulateFailure}
                      onChange={(e) => setSimulateFailure(e.target.checked)}
                      className="accent-primary cursor-pointer"
                    />
                  </div>

                  {/* Checkout CTA */}
                  <Button
                    onClick={handlePlaceOrder}
                    variant="primary"
                    className="w-full py-3.5 font-bold shadow-soft"
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Processing Payment..." : `Pay & Place Order (₹${cartTotal})`}
                  </Button>
                </CardContent>
              </Card>

              {/* Security info banner */}
              <div className="p-4 bg-white border border-custom-border rounded-card flex gap-3 text-[11px] text-secondary-text leading-relaxed">
                <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Safe & Secure Payouts:</strong> We use Cashfree transaction protocols with SSL encryption. Your financial data is never stored on our servers.
                </span>
              </div>

            </div>

          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}

// Simple ShieldCheck placeholder (custom SVG/Lucide check)
function ShieldCheck({ className, ...props }: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={className}
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
    </svg>
  );
}

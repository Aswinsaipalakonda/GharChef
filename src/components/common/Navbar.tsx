"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Search,
  Percent,
  User,
  ShoppingBag,
  ChevronDown,
  LogOut,
  X,
  Plus,
  Minus,
  ChefHat,
  Info
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";

export const Navbar: React.FC = () => {
  const { user, loginAsCustomer, logout, currentAddress, setCurrentAddress } = useAuth();
  const { cartItems, cartCount, cartTotal, cartSubtotal, cartDiscount, deliveryCharge, gstAmount, updateQuantity, removeFromCart, appliedCoupon, applyCoupon, removeCoupon } = useCart();

  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [phoneInput, setPhoneInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");

  const locations = [
    "Gachibowli, Hyderabad",
    "Madhapur, Hyderabad",
    "Secunderabad, Hyderabad",
    "Kukatpally, Hyderabad",
    "Jubilee Hills, Hyderabad",
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneInput) return;
    loginAsCustomer(phoneInput, nameInput || "Priya Sharma");
    setIsAuthOpen(false);
    setPhoneInput("");
    setNameInput("");
  };

  const handleCouponApply = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    setCouponSuccess("");
    const res = applyCoupon(couponInput);
    if (res.success) {
      setCouponSuccess(res.message);
      setCouponInput("");
    } else {
      setCouponError(res.message);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full transition-all duration-200 border-b border-custom-border/60 glass-header">
        {/* Top Mini Header */}
        <div className="hidden md:flex justify-between items-center px-8 py-2 bg-light-orange text-xs text-secondary-orange font-medium max-w-[1400px] mx-auto w-full">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span>Delivering happiness with every homemade meal</span>
          </div>
          <div className="flex items-center gap-6 text-secondary-text">
            <Link href="#seller" className="hover:text-primary transition-colors">Become a Seller</Link>
            <Link href="#track" className="hover:text-primary transition-colors">Track Order</Link>
            <Link href="#help" className="hover:text-primary transition-colors">Help & Support</Link>
            <button className="hover:text-primary transition-colors flex items-center gap-1">
              <span>English</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Main Header */}
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-4">
          {/* Logo & Location */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center text-white shadow-soft"
              >
                <ChefHat className="w-6 h-6 stroke-[1.5]" />
              </motion.div>
              <span className="text-2xl font-bold tracking-tight text-primary">
                Ghar<span className="text-primary-text">Chef</span>
              </span>
            </Link>

            {/* Location Selector */}
            <div className="relative hidden lg:block">
              <button
                onClick={() => setIsLocationOpen(!isLocationOpen)}
                className="flex items-center gap-2 px-4 py-2 border border-custom-border hover:border-primary/40 rounded-2xl bg-white text-sm font-medium shadow-sm transition-colors text-primary-text cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-primary" />
                <span>{currentAddress.split(",")[0]}</span>
                <ChevronDown className="w-4 h-4 text-secondary-text" />
              </button>

              <AnimatePresence>
                {isLocationOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsLocationOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute left-0 mt-2 w-64 bg-white border border-custom-border rounded-card shadow-soft-lg p-2 z-20"
                    >
                      <p className="text-xs text-secondary-text px-3 py-2 font-medium uppercase tracking-wider">Select Delivery Location</p>
                      {locations.map((loc) => (
                        <button
                          key={loc}
                          onClick={() => {
                            setCurrentAddress(loc);
                            setIsLocationOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2.5 text-sm rounded-xl hover:bg-light-orange hover:text-primary transition-colors cursor-pointer flex items-center gap-2 ${
                            currentAddress === loc ? "text-primary font-semibold bg-light-orange/50" : "text-primary-text"
                          }`}
                        >
                          <MapPin className="w-4 h-4" />
                          <span>{loc}</span>
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl relative hidden md:block">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search for biryani, pickles, sweets..."
                className="w-full pl-5 pr-14 py-3 bg-white border border-custom-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary rounded-2xl shadow-sm text-sm"
              />
              <button className="absolute right-1.5 p-2 bg-primary hover:bg-primary-hover text-white rounded-xl transition-colors cursor-pointer shadow-sm">
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Action Navigation */}
          <div className="flex items-center gap-4">
            <Link href="#offers" className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-secondary-text hover:text-primary transition-colors px-3 py-2">
              <Percent className="w-4 h-4 text-primary" />
              <span>Offers</span>
            </Link>

            {/* Auth Button */}
            {user ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1.5 border border-custom-border rounded-2xl bg-white text-sm font-medium">
                  <div className="w-7 h-7 rounded-full bg-light-orange text-primary flex items-center justify-center font-bold text-xs uppercase">
                    {user.name.charAt(0)}
                  </div>
                  <span className="max-w-[100px] truncate text-primary-text">{user.name.split(" ")[0]}</span>
                </div>
                <button
                  onClick={logout}
                  title="Logout"
                  className="p-2 border border-custom-border hover:border-danger hover:text-danger rounded-2xl bg-white transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Button
                variant="ghost"
                onClick={() => setIsAuthOpen(true)}
                className="flex items-center gap-1.5 text-sm font-semibold border border-custom-border hover:border-primary/30"
              >
                <User className="w-4 h-4 text-primary" />
                <span>Sign In</span>
              </Button>
            )}

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-3 bg-white border border-custom-border hover:border-primary/30 rounded-2xl shadow-sm transition-colors text-primary-text flex items-center justify-center cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5 text-primary-text stroke-[1.8]" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0.6 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black z-50"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed right-0 top-0 bottom-0 w-full sm:w-[450px] bg-custom-bg shadow-soft-lg z-50 flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-custom-border bg-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-lg">My Cart ({cartCount})</h3>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 rounded-xl border border-custom-border hover:bg-light-orange transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <motion.div
                      layout
                      key={item.product.id}
                      className="p-4 bg-white border border-custom-border rounded-card flex gap-4 items-center shadow-soft"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 rounded-2xl object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className={`w-2.5 h-2.5 rounded-full ${item.product.foodType === "veg" ? "bg-emerald-500" : "bg-rose-500"}`} />
                          <h4 className="font-semibold text-sm truncate text-primary-text">{item.product.name}</h4>
                        </div>
                        <p className="text-xs text-secondary-text mb-2">By {item.product.chefName}</p>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm text-primary-text">₹{item.product.price * item.quantity}</span>
                          
                          {/* Qty Counter */}
                          <div className="flex items-center gap-3 border border-custom-border rounded-xl px-2 py-1 bg-light-orange/40">
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
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-muted hover:text-danger p-1 rounded transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center py-20">
                    <div className="w-20 h-20 rounded-full bg-light-orange flex items-center justify-center text-primary mb-4">
                      <ShoppingBag className="w-10 h-10 stroke-[1.2]" />
                    </div>
                    <h4 className="font-bold text-base mb-1">Your cart is empty</h4>
                    <p className="text-sm text-secondary-text max-w-xs mb-6">Add delicious meals homemade with love by verified chefs near you.</p>
                    <Button onClick={() => setIsCartOpen(false)} variant="primary" size="sm">Explore Food</Button>
                  </div>
                )}
              </div>

              {/* Footer Calculations */}
              {cartItems.length > 0 && (
                <div className="bg-white border-t border-custom-border p-6 space-y-4 shadow-[0_-4px_20px_0_rgba(0,0,0,0.02)]">
                  {/* Coupon Area */}
                  <form onSubmit={handleCouponApply} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter Promo Code"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 px-4 py-2 border border-custom-border focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary rounded-xl text-sm uppercase"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-xl text-sm font-semibold transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                  {couponError && <p className="text-xs text-danger font-medium">{couponError}</p>}
                  {couponSuccess && <p className="text-xs text-emerald-600 font-medium">{couponSuccess}</p>}

                  {appliedCoupon && (
                    <div className="flex justify-between items-center px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-xl">
                      <div className="text-xs">
                        <span className="font-bold text-emerald-700">{appliedCoupon.code}</span> Applied!
                        <p className="text-[10px] text-emerald-600">{appliedCoupon.description}</p>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-xs font-bold text-emerald-800 hover:text-rose-600 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  )}

                  {/* Calculations */}
                  <div className="space-y-2 text-sm text-secondary-text">
                    <div className="flex justify-between">
                      <span>Item Subtotal</span>
                      <span className="font-medium text-primary-text">₹{cartSubtotal}</span>
                    </div>
                    {cartDiscount > 0 && (
                      <div className="flex justify-between text-emerald-600">
                        <span>Discount</span>
                        <span>- ₹{cartDiscount}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Delivery Partner Fee</span>
                      <span className="font-medium text-primary-text">
                        {deliveryCharge === 0 ? <span className="text-emerald-600">FREE</span> : `₹${deliveryCharge}`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Govt Taxes & Chef GST (5%)</span>
                      <span className="font-medium text-primary-text">₹{gstAmount}</span>
                    </div>
                    <div className="flex justify-between pt-3 border-t border-custom-border text-base font-bold text-primary-text">
                      <span>Grand Total</span>
                      <span className="text-primary text-lg">₹{cartTotal}</span>
                    </div>
                  </div>

                  <Link href="#checkout" onClick={() => setIsCartOpen(false)} className="block w-full">
                    <Button variant="primary" className="w-full py-3.5 font-bold shadow-soft">
                      Proceed to Checkout (₹{cartTotal})
                    </Button>
                  </Link>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Auth Modal */}
      <AnimatePresence>
        {isAuthOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAuthOpen(false)}
              className="fixed inset-0 bg-black z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-x-4 top-[15%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[420px] bg-white rounded-card shadow-soft-lg z-50 overflow-hidden"
            >
              <div className="p-6 border-b border-custom-border flex items-center justify-between">
                <h3 className="font-semibold text-lg text-primary-text">Welcome to GharChef</h3>
                <button
                  onClick={() => setIsAuthOpen(false)}
                  className="p-1.5 rounded-xl border border-custom-border hover:bg-light-orange transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex justify-center mb-2">
                  <div className="w-14 h-14 rounded-full bg-light-orange text-primary flex items-center justify-center">
                    <ChefHat className="w-8 h-8" />
                  </div>
                </div>
                <h4 className="text-center font-bold text-base text-primary-text">Homemade food is waiting for you</h4>
                <p className="text-xs text-secondary-text text-center px-4">
                  Log in instantly to save your addresses, apply discount coupons, and track orders from the finest home kitchens.
                </p>

                <form onSubmit={handleLogin} className="space-y-3.5 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-secondary-text mb-1.5">Mobile Number</label>
                    <Input
                      type="tel"
                      placeholder="Enter 10-digit number"
                      maxLength={10}
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value.replace(/\D/g, ""))}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-secondary-text mb-1.5">Your Name (Optional)</label>
                    <Input
                      type="text"
                      placeholder="e.g. Priya Sharma"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                    />
                  </div>
                  <Button type="submit" variant="primary" className="w-full mt-4 font-bold shadow-soft">
                    Verify & Sign In (Mock OTP)
                  </Button>
                </form>

                <div className="bg-light-orange/50 border border-light-orange rounded-2xl p-3 flex gap-2 text-[11px] text-secondary-orange items-start leading-relaxed">
                  <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Developer Demo Note:</strong> We use Firebase OTP mock login. Any 10-digit mobile number will immediately authenticate a sample customer profile!
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

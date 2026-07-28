"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, ArrowLeft, ShieldCheck, HelpCircle, Key, ChefHat, Check } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent } from "@/components/ui/Card";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CustomerLogin() {
  const { loginAsCustomer, user } = useAuth();
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [step, setStep] = useState<1 | 2>(1);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [error, setError] = useState("");

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }
    setError("");
    // Generate a random 4-digit OTP code
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(code);
    setStep(2);
    setShowNotification(true);
    
    // Auto-hide notification after 8 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 8000);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    if (enteredOtp !== generatedOtp) {
      setError("Invalid OTP entered. Please try again.");
      return;
    }
    
    setError("");
    loginAsCustomer(phone, name || "Priya Sharma");
    router.push("/");
  };

  return (
    <div className="min-h-screen w-full flex bg-custom-bg relative overflow-hidden">
      
      {/* Demo Notification Pop-up */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-primary-text text-white px-6 py-3.5 rounded-2xl shadow-soft-lg flex items-center gap-3 border border-white/10"
          >
            <Key className="w-5 h-5 text-primary animate-pulse" />
            <div className="text-left text-xs">
              <span className="font-bold text-primary uppercase tracking-wider block">GharChef Secure SMS (Demo)</span>
              <span>Your verification OTP is <strong className="text-sm font-bold text-white underline tracking-widest">{generatedOtp}</strong></span>
            </div>
            <button
              onClick={() => setShowNotification(false)}
              className="ml-4 text-xs font-bold text-muted hover:text-white"
            >
              Dismiss
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Split Left Column: Auth form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-6 md:p-12 z-10">
        
        {/* Header Branding */}
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-2xl bg-primary flex items-center justify-center text-white shadow-soft">
              <ChefHat className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-primary">
              Ghar<span className="text-primary-text">Chef</span>
            </span>
          </Link>
          <Link href="/" className="flex items-center gap-1 text-xs text-secondary-text hover:text-primary font-medium transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Form Container */}
        <div className="max-w-md w-full mx-auto py-10">
          <Card className="rounded-card border border-custom-border bg-white shadow-soft p-6 md:p-8">
            <CardContent className="space-y-6 p-0 text-left">
              
              <div className="space-y-1.5">
                <h2 className="text-2xl font-bold text-primary-text">
                  {step === 1 ? "Customer Login" : "Enter Verification Code"}
                </h2>
                <p className="text-xs text-secondary-text">
                  {step === 1
                    ? "Welcome back! Enter your details to get fresh homemade meals delivered."
                    : `We've sent a 4-digit code to +91 ${phone.substring(0, 3)}***${phone.substring(7)}`}
                </p>
              </div>

              {error && (
                <div className="p-3 bg-rose-50 border border-rose-100 text-xs text-danger font-medium rounded-xl leading-relaxed">
                  {error}
                </div>
              )}

              {step === 1 ? (
                // Step 1: Phone & Name Input
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-secondary-text">Mobile Number</label>
                    <Input
                      type="tel"
                      placeholder="Enter 10-digit number"
                      maxLength={10}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                      icon={<Phone className="w-4 h-4 text-muted" />}
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-secondary-text">Your Name (Optional)</label>
                    <Input
                      type="text"
                      placeholder="e.g. Priya Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <Button type="submit" variant="primary" className="w-full font-bold py-3.5 shadow-soft">
                    Send OTP Verification
                  </Button>
                </form>
              ) : (
                // Step 2: 4-digit OTP Boxes
                <form onSubmit={handleVerifyOtp} className="space-y-5">
                  <div className="flex justify-between gap-3 px-2 py-1">
                    {otp.map((digit, idx) => (
                      <input
                        key={idx}
                        id={`otp-${idx}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                        className="w-12 h-14 text-center text-xl font-bold border border-custom-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary rounded-2xl bg-custom-bg shadow-sm"
                        required
                      />
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-secondary-text">Didn't receive code?</span>
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="font-semibold text-primary hover:text-primary-hover transition-colors"
                    >
                      Resend SMS
                    </button>
                  </div>

                  <Button type="submit" variant="primary" className="w-full font-bold py-3.5 shadow-soft">
                    Verify & Continue
                  </Button>

                  <button
                    type="button"
                    onClick={() => { setStep(1); setError(""); }}
                    className="w-full text-center text-xs font-medium text-secondary-text hover:text-primary-text transition-colors mt-2"
                  >
                    Change phone number
                  </button>
                </form>
              )}

              {/* Toggle to Seller Login */}
              <div className="pt-4 border-t border-custom-border/50 text-center text-xs text-secondary-text leading-relaxed">
                <span>Are you a kitchen operator? </span>
                <Link href="/seller/login" className="font-semibold text-primary hover:text-primary-hover transition-colors">
                  Seller Portal Sign In
                </Link>
              </div>

            </CardContent>
          </Card>
        </div>

        {/* Footer info */}
        <div className="text-center text-[10px] text-muted space-y-1">
          <p>© {new Date().getFullYear()} GharChef Technologies Pvt Ltd. All rights reserved.</p>
          <p>By signing in, you agree to our Terms of Service & Privacy Policy.</p>
        </div>

      </div>

      {/* Split Right Column: Visual illustration panel (hidden on mobile) */}
      <div className="hidden lg:block lg:w-1/2 relative bg-zinc-900 overflow-hidden">
        {/* Dark warm overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent z-10" />
        
        {/* Background Image of Spices and Fresh Ingredients */}
        <img
          src="https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1200&auto=format&fit=crop"
          alt="Fresh Indian vegetables, curry powders, and organic spices"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />

        {/* Bottom Text Panel */}
        <div className="absolute bottom-16 left-16 right-16 text-left z-20 space-y-3.5 text-white">
          <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
            <ShieldCheck className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-2xl font-bold tracking-tight">Pure Homemade Hygiene</h3>
          <p className="text-xs text-zinc-300 leading-relaxed max-w-sm">
            We inspect every home kitchen partner for safety, freshness, and standard hygiene. Relish regional specialties with complete trust.
          </p>
        </div>
      </div>

    </div>
  );
}

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ChefHat,
  ChevronRight,
  ShieldCheck,
  User,
  Mail,
  Phone,
  Key,
  Home,
  Utensils,
  MapPin,
  CreditCard,
  CheckCircle,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent } from "@/components/ui/Card";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SellerRegister() {
  const router = useRouter();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  
  const [kitchenName, setKitchenName] = useState("");
  const [specialty, setSpecialty] = useState("North Indian");
  const [address, setAddress] = useState("");
  const [radius, setRadius] = useState("5");

  const [upiId, setUpiId] = useState("");
  const [pancard, setPancard] = useState("");

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (step === 1) {
      if (!name || !email || !phone || !password) {
        setError("Please fill out all contact fields.");
        return;
      }
      if (!email.includes("@")) {
        setError("Enter a valid email address.");
        return;
      }
      if (phone.length < 10) {
        setError("Enter a valid 10-digit mobile number.");
        return;
      }
      if (password.length < 6) {
        setError("Password should be at least 6 characters.");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!kitchenName || !address) {
        setError("Please enter your kitchen details and address.");
        return;
      }
      setStep(3);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!upiId || !pancard) {
      setError("Please fill out identity and bank information.");
      return;
    }

    setIsLoading(true);
    
    // Simulate API registration delay
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to verification success page
      router.push("/verification-success");
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex bg-custom-bg relative overflow-hidden">
      
      {/* Left Column: Register Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-6 md:p-12 z-10 overflow-y-auto">
        
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-2xl bg-primary flex items-center justify-center text-white shadow-soft">
              <ChefHat className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-primary">
              Ghar<span className="text-primary-text">Chef</span>
            </span>
          </Link>
          <Link href="/seller/login" className="flex items-center gap-1 text-xs text-secondary-text hover:text-primary font-medium transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Already a partner? Sign In</span>
          </Link>
        </div>

        {/* Multi-step Form wrapper */}
        <div className="max-w-md w-full mx-auto py-10">
          <Card className="rounded-card border border-custom-border bg-white shadow-soft p-6 md:p-8">
            <CardContent className="space-y-6 p-0 text-left">
              
              {/* Progress Indicator dots */}
              <div className="flex justify-between items-center pb-2">
                <div className="flex gap-2">
                  {[1, 2, 3].map((s) => (
                    <div
                      key={s}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        s === step ? "w-6 bg-primary" : s < step ? "w-2 bg-emerald-500" : "w-2 bg-custom-border"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[10px] uppercase font-bold text-secondary-text">Step {step} of 3</span>
              </div>

              {/* Headings */}
              <div className="space-y-1.5">
                <h2 className="text-2xl font-bold text-primary-text">
                  {step === 1 && "Create Chef Account"}
                  {step === 2 && "Kitchen Profile"}
                  {step === 3 && "Payout & Verification"}
                </h2>
                <p className="text-xs text-secondary-text">
                  {step === 1 && "Enter your basic contact details to get started on the portal."}
                  {step === 2 && "Help customers discover your food specialties and delivery area."}
                  {step === 3 && "Submit identity and payout options for admin approval verification."}
                </p>
              </div>

              {error && (
                <div className="p-3 bg-rose-50 border border-rose-100 text-xs text-danger font-medium rounded-xl leading-relaxed">
                  {error}
                </div>
              )}

              {/* Form contents based on active step */}
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.form
                    key="step1"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    onSubmit={handleNextStep}
                    className="space-y-4"
                  >
                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-secondary-text">Full Name</label>
                      <Input
                        type="text"
                        placeholder="e.g. Ritu Verma"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        icon={<User className="w-4 h-4 text-muted" />}
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-secondary-text">Email Address</label>
                      <Input
                        type="email"
                        placeholder="e.g. ritu@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        icon={<Mail className="w-4 h-4 text-muted" />}
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-secondary-text">Phone Number</label>
                      <Input
                        type="tel"
                        placeholder="10-digit mobile number"
                        maxLength={10}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                        icon={<Phone className="w-4 h-4 text-muted" />}
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-secondary-text">Password</label>
                      <Input
                        type="password"
                        placeholder="Choose secure password (min 6 chars)"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        icon={<Key className="w-4 h-4 text-muted" />}
                        required
                      />
                    </div>

                    <Button type="submit" variant="primary" className="w-full font-bold py-3.5 shadow-soft flex items-center justify-center gap-1">
                      <span>Next: Kitchen details</span>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </motion.form>
                )}

                {step === 2 && (
                  <motion.form
                    key="step2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    onSubmit={handleNextStep}
                    className="space-y-4"
                  >
                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-secondary-text">Kitchen Name</label>
                      <Input
                        type="text"
                        placeholder="e.g. Mom's Delicacies"
                        value={kitchenName}
                        onChange={(e) => setKitchenName(e.target.value)}
                        icon={<Home className="w-4 h-4 text-muted" />}
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-secondary-text">Primary Specialty</label>
                      <select
                        value={specialty}
                        onChange={(e) => setSpecialty(e.target.value)}
                        className="w-full bg-white border border-custom-border text-primary-text px-4 py-3 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-sm"
                      >
                        <option value="North Indian">North Indian (Curries, Roti, Sweets)</option>
                        <option value="South Indian">South Indian Breakfast & Meals</option>
                        <option value="Hyderabadi">Hyderabadi Dum Biryani & Kebabs</option>
                        <option value="Pickles & Spices">Home-ground Spices & Pickles</option>
                        <option value="Bakery & Desserts">Healthy Cakes & Sweets</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-secondary-text">Kitchen Address</label>
                      <Input
                        type="text"
                        placeholder="Flat / House no, Street name, Locality"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        icon={<MapPin className="w-4 h-4 text-muted" />}
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-secondary-text">Delivery Radius (km)</label>
                      <input
                        type="range"
                        min="2"
                        max="15"
                        step="1"
                        value={radius}
                        onChange={(e) => setRadius(e.target.value)}
                        className="w-full accent-primary h-2 bg-custom-bg rounded-lg cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-secondary-text font-medium mt-1">
                        <span>2 km</span>
                        <span className="text-primary font-bold">{radius} km radius</span>
                        <span>15 km</span>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <Button type="button" onClick={() => setStep(1)} variant="secondary" className="w-1/3 py-3.5">
                        Back
                      </Button>
                      <Button type="submit" variant="primary" className="w-2/3 font-bold py-3.5 shadow-soft flex items-center justify-center gap-1">
                        <span>Continue</span>
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.form>
                )}

                {step === 3 && (
                  <motion.form
                    key="step3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    onSubmit={handleRegister}
                    className="space-y-4"
                  >
                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-secondary-text">UPI ID for Payouts</label>
                      <Input
                        type="text"
                        placeholder="e.g. chefname@oksbi"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        icon={<CreditCard className="w-4 h-4 text-muted" />}
                        required
                      />
                      <p className="text-[10px] text-muted ml-1.5 leading-relaxed">Weekly earnings will be directly settled to this address every Monday.</p>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-secondary-text">PAN Card Number</label>
                      <Input
                        type="text"
                        placeholder="10-digit PAN ID (e.g. ABCDE1234F)"
                        maxLength={10}
                        value={pancard}
                        onChange={(e) => setPancard(e.target.value.toUpperCase())}
                        icon={<ShieldCheck className="w-4 h-4 text-muted" />}
                        required
                      />
                    </div>

                    <div className="bg-light-orange/40 border border-light-orange p-3 rounded-2xl flex gap-2.5 items-start text-[11px] text-secondary-orange leading-relaxed">
                      <Sparkles className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>Demo Upload Sandbox:</strong> As a mock frontend client, file uploads for government identity documents are auto-approved.
                      </span>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <Button type="button" onClick={() => setStep(2)} variant="secondary" className="w-1/3 py-3.5">
                        Back
                      </Button>
                      <Button
                        type="submit"
                        variant="primary"
                        className="w-2/3 font-bold py-3.5 shadow-soft"
                        disabled={isLoading}
                      >
                        {isLoading ? "Submitting..." : "Complete Registration"}
                      </Button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>

            </CardContent>
          </Card>
        </div>

        {/* Small footer */}
        <div className="text-center text-[10px] text-muted">
          <p>© {new Date().getFullYear()} GharChef Technologies Pvt Ltd. All rights reserved.</p>
        </div>

      </div>

      {/* Right Column: Visual Portrait (Indian home chef portrait representation) */}
      <div className="hidden lg:block lg:w-1/2 relative bg-zinc-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent z-10" />
        <img
          src="https://images.unsplash.com/photo-1594744803329-e58b31de215f?q=80&w=1200&auto=format&fit=crop"
          alt="Smiling Indian female chef inside home kitchen"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />

        {/* Bottom Text Panel */}
        <div className="absolute bottom-16 left-16 right-16 text-left z-20 space-y-3.5 text-white">
          <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
            <CheckCircle className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-2xl font-bold tracking-tight">Verified & Approved</h3>
          <p className="text-xs text-zinc-300 leading-relaxed max-w-sm">
            To build trust in our community, our operations team conducts a physical kitchen inspection and FSSAI sanitation check within 48 hours of onboarding submission.
          </p>
        </div>
      </div>

    </div>
  );
}

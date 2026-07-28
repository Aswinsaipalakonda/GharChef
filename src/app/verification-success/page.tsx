"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, ChevronRight, Home, ChefHat, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import Link from "next/link";

function SuccessContent() {
  const searchParams = useSearchParams();
  const [isPasswordReset, setIsPasswordReset] = useState(false);

  useEffect(() => {
    const type = searchParams.get("type");
    if (type === "password-reset") {
      setIsPasswordReset(true);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen w-full flex bg-custom-bg relative overflow-hidden">
      
      {/* Left Column: Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-6 md:p-12 z-10">
        
        {/* Header branding */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-2xl bg-primary flex items-center justify-center text-white shadow-soft">
              <ChefHat className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-primary">
              Ghar<span className="text-primary-text">Chef</span>
            </span>
          </Link>
        </div>

        {/* Success Card panel */}
        <div className="max-w-md w-full mx-auto py-12">
          <Card className="rounded-card border border-custom-border bg-white shadow-soft p-6 md:p-8">
            <CardContent className="space-y-6 p-0 text-center">
              
              {/* Animated checkmark icon */}
              <div className="flex justify-center">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center border border-emerald-100 shadow-sm"
                >
                  <CheckCircle2 className="w-9 h-9 stroke-[1.8]" />
                </motion.div>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-primary-text">
                  {isPasswordReset ? "Password Reset Successful" : "Registration Received"}
                </h2>
                <p className="text-xs text-secondary-text px-2 leading-relaxed">
                  {isPasswordReset
                    ? "Your account credentials have been successfully updated. You can now login to your seller portal with your new password."
                    : "Thank you for joining GharChef! Your kitchen profile is submitted. Our regional operations team will contact you in 48 hours for verification."}
                </p>
              </div>

              {/* Info banner */}
              {!isPasswordReset && (
                <div className="p-4 bg-light-orange/40 border border-light-orange rounded-2xl text-left flex gap-2.5 text-xs text-secondary-orange leading-relaxed">
                  <Sparkles className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>What's next?</strong> We'll conduct a brief FSSAI inspection and help take premium food photography pictures of your kitchen specialties.
                  </span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <Link href="/seller/login">
                  <Button variant="primary" className="w-full font-bold py-3.5 shadow-soft flex items-center justify-center gap-1">
                    <span>Go to Seller Login</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/">
                  <Button variant="secondary" className="w-full py-3.5 flex items-center justify-center gap-1.5">
                    <Home className="w-4 h-4" />
                    <span>Go to Homepage</span>
                  </Button>
                </Link>
              </div>

            </CardContent>
          </Card>
        </div>

        {/* Footer info */}
        <div className="text-center text-[10px] text-muted">
          <p>© {new Date().getFullYear()} GharChef Technologies Pvt Ltd. All rights reserved.</p>
        </div>

      </div>

      {/* Right Column: Visual image */}
      <div className="hidden lg:block lg:w-1/2 relative bg-zinc-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent z-10" />
        <img
          src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1200&auto=format&fit=crop"
          alt="Clean modern kitchen setting representing cooking success"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />

        {/* Floating text */}
        <div className="absolute bottom-16 left-16 right-16 text-left z-20 space-y-3.5 text-white">
          <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
            <CheckCircle2 className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-2xl font-bold tracking-tight">Onboarding Culinary Talent</h3>
          <p className="text-xs text-zinc-300 leading-relaxed max-w-sm">
            Our goal is to build India's largest micro-entrepreneur network. Welcome to a community where your skills are celebrated and supported.
          </p>
        </div>
      </div>

    </div>
  );
}

export default function VerificationSuccess() {
  return (
    <Suspense fallback={
      <div className="min-h-screen w-full flex items-center justify-center bg-custom-bg">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          <span className="text-xs text-secondary-text font-medium">Verifying details...</span>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}

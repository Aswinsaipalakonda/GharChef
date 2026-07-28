"use client";

import React, { useState } from "react";
import { ArrowLeft, ChefHat, Key, Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent } from "@/components/ui/Card";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ForgotPassword() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);

    // Simulate sending email
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMsg(
        "Password reset instructions have been sent to your email. Please check your inbox and spam folder."
      );
    }, 1200);
  };

  return (
    <div className="min-h-screen w-full flex bg-custom-bg relative overflow-hidden">
      
      {/* Left Column: Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-6 md:p-12 z-10">
        
        {/* Header branding */}
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
            <span>Back to Login</span>
          </Link>
        </div>

        {/* Form panel */}
        <div className="max-w-md w-full mx-auto py-12">
          <Card className="rounded-card border border-custom-border bg-white shadow-soft p-6 md:p-8">
            <CardContent className="space-y-6 p-0 text-left">
              
              <div className="space-y-1.5">
                <h2 className="text-2xl font-bold text-primary-text">Forgot Password?</h2>
                <p className="text-xs text-secondary-text">
                  Enter your registered partner email address below. We'll send you instructions to reset your password.
                </p>
              </div>

              {error && (
                <div className="p-3 bg-rose-50 border border-rose-100 text-xs text-danger font-medium rounded-xl leading-relaxed">
                  {error}
                </div>
              )}

              {successMsg ? (
                <div className="space-y-4">
                  <div className="p-4 bg-emerald-50 border border-emerald-100 text-xs text-emerald-700 font-medium rounded-xl leading-relaxed">
                    {successMsg}
                  </div>
                  
                  <Link href="/reset-password">
                    <Button variant="primary" className="w-full font-bold py-3.5 mt-2">
                      Go to Reset Password (Demo Mock)
                    </Button>
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-secondary-text">Email Address</label>
                    <Input
                      type="email"
                      placeholder="e.g. chef@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      icon={<Mail className="w-4 h-4 text-muted" />}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full font-bold py-3.5 shadow-soft"
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending Instructions..." : "Send Reset Instructions"}
                  </Button>
                </form>
              )}

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
          src="https://images.unsplash.com/photo-1605197586541-89499879b54b?q=80&w=1200&auto=format&fit=crop"
          alt="Fresh Gulab Jamun sweet dumplings in sugar syrup"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />

        {/* Floating text */}
        <div className="absolute bottom-16 left-16 right-16 text-left z-20 space-y-3.5 text-white">
          <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
            <Key className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-2xl font-bold tracking-tight">Security & Privacy First</h3>
          <p className="text-xs text-zinc-300 leading-relaxed max-w-sm">
            We employ encrypted JWT credentials and session token protocols to keep your kitchen dashboard information safe.
          </p>
        </div>
      </div>

    </div>
  );
}

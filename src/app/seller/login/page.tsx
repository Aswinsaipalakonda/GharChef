"use client";

import React, { useState } from "react";
import { ArrowLeft, ChefHat, Eye, EyeOff, Key, Mail, ShieldCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent } from "@/components/ui/Card";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SellerLogin() {
  const { loginAsChef } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setIsLoading(true);
    // Simulate brief network delay
    setTimeout(() => {
      setIsLoading(false);
      loginAsChef(email);
      // Redirect to home page in chef mode (or dashboard page)
      router.push("/");
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
          <Link href="/" className="flex items-center gap-1 text-xs text-secondary-text hover:text-primary font-medium transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Form panel */}
        <div className="max-w-md w-full mx-auto py-12">
          <Card className="rounded-card border border-custom-border bg-white shadow-soft p-6 md:p-8">
            <CardContent className="space-y-6 p-0 text-left">
              
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-light-orange text-primary text-[10px] font-bold uppercase tracking-wider">
                  Chef Portal
                </div>
                <h2 className="text-2xl font-bold text-primary-text">Partner Sign In</h2>
                <p className="text-xs text-secondary-text">
                  Sign in to manage your online kitchen, upload daily dishes, and view weekly earnings.
                </p>
              </div>

              {error && (
                <div className="p-3 bg-rose-50 border border-rose-100 text-xs text-danger font-medium rounded-xl leading-relaxed">
                  {error}
                </div>
              )}

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

                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="block text-xs font-semibold text-secondary-text">Password</label>
                    <Link
                      href="/forgot-password"
                      className="text-xs text-primary hover:text-primary-hover font-semibold transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative flex items-center">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter account password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      icon={<Key className="w-4 h-4 text-muted" />}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 text-muted hover:text-primary-text transition-colors cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full font-bold py-3.5 shadow-soft"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing In..." : "Sign In to Kitchen"}
                </Button>
              </form>

              {/* Link to Register */}
              <div className="pt-4 border-t border-custom-border/50 text-center text-xs text-secondary-text leading-relaxed">
                <span>Want to start selling homemade food? </span>
                <Link href="/seller/register" className="font-semibold text-primary hover:text-primary-hover transition-colors">
                  Join as Home Chef
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

      {/* Right Column: Visual image (Indian kitchen / Home Cooking Scene) */}
      <div className="hidden lg:block lg:w-1/2 relative bg-zinc-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent z-10" />
        <img
          src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1200&auto=format&fit=crop"
          alt="Home chef baking and prepping ingredients"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />

        {/* Floating text */}
        <div className="absolute bottom-16 left-16 right-16 text-left z-20 space-y-3.5 text-white">
          <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
            <ChefHat className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-2xl font-bold tracking-tight">Empowering Women Entrepreneurs</h3>
          <p className="text-xs text-zinc-300 leading-relaxed max-w-sm">
            Over 80% of our home chef partners are women starting their micro-food businesses with zero setup friction. We guide you from registration to packaging design.
          </p>
        </div>
      </div>

    </div>
  );
}

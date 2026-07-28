"use client";

import React, { useState } from "react";
import { ArrowLeft, ChefHat, Key, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent } from "@/components/ui/Card";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ResetPassword() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please enter matching passwords.");
      return;
    }

    setIsLoading(true);

    // Simulate reset latency
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to verification success
      router.push("/verification-success?type=password-reset");
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
                <h2 className="text-2xl font-bold text-primary-text">Reset Password</h2>
                <p className="text-xs text-secondary-text">
                  Choose a new strong password for your GharChef seller account to finish verification.
                </p>
              </div>

              {error && (
                <div className="p-3 bg-rose-50 border border-rose-100 text-xs text-danger font-medium rounded-xl leading-relaxed">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-secondary-text">New Password</label>
                  <div className="relative flex items-center">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Minimum 6 characters"
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

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-secondary-text">Confirm Password</label>
                  <Input
                    type="password"
                    placeholder="Re-enter new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    icon={<Key className="w-4 h-4 text-muted" />}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full font-bold py-3.5 shadow-soft"
                  disabled={isLoading}
                >
                  {isLoading ? "Saving Changes..." : "Reset Password & Login"}
                </Button>
              </form>

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
          src="https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1200&auto=format&fit=crop"
          alt="Spices and raw ingredients"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />

        {/* Floating text */}
        <div className="absolute bottom-16 left-16 right-16 text-left z-20 space-y-3.5 text-white">
          <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
            <ShieldCheck className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-2xl font-bold tracking-tight">Security Check Complete</h3>
          <p className="text-xs text-zinc-300 leading-relaxed max-w-sm">
            We use top tier end-to-end security measures. Rest assured your payout accounts and order details are fully protected.
          </p>
        </div>
      </div>

    </div>
  );
}

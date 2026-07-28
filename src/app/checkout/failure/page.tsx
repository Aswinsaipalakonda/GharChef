"use client";

import React from "react";
import { AlertCircle, ArrowLeft, RefreshCw, Home, HelpCircle } from "lucide-react";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import Link from "next/link";

export default function OrderFailurePage() {
  return (
    <div className="flex flex-col min-h-screen bg-custom-bg">
      <Navbar />

      <main className="flex-grow max-w-[650px] mx-auto w-full px-4 md:px-8 py-14 text-left">
        
        <Card className="rounded-card border border-custom-border bg-white shadow-soft overflow-hidden">
          <CardContent className="p-6 md:p-10 text-center space-y-6">
            
            {/* Warning Checkmark */}
            <div className="flex justify-center">
              <motion.div
                initial={{ scale: 0.8, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 150 }}
                className="w-20 h-20 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center border border-rose-100 shadow-sm"
              >
                <AlertCircle className="w-10 h-10 stroke-[1.8]" />
              </motion.div>
            </div>

            {/* Error Content */}
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-primary-text">Payment Transaction Failed</h2>
              <p className="text-xs text-secondary-text max-w-sm mx-auto leading-relaxed">
                Unfortunately, we couldn't authorize your credit card or UPI account. No charges were made to your account.
              </p>
            </div>

            {/* Error Details */}
            <div className="p-4 border border-custom-border rounded-2xl bg-custom-bg text-left text-xs space-y-2.5 max-w-md mx-auto leading-relaxed">
              <div className="flex justify-between">
                <span className="text-secondary-text">Error Code:</span>
                <span className="font-bold text-primary-text">GC-PAY-REFUSED-502</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary-text">Reason:</span>
                <span className="font-semibold text-primary-text">Insufficient limits or Bank Timeout</span>
              </div>
              <p className="text-[10px] text-muted border-t border-custom-border/50 pt-2 leading-relaxed">
                <strong>Refund Policy Note:</strong> If any amount was deducted by your bank, it will be automatically reverted back to your account source within 24-48 business hours.
              </p>
            </div>

            {/* Support helpline */}
            <div className="p-4 bg-light-orange/30 border border-light-orange/40 rounded-2xl text-left flex gap-2.5 text-xs text-secondary-orange max-w-md mx-auto leading-relaxed">
              <HelpCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span>
                Need immediate help? Call our 24/7 priority support helpline at <strong>+91 1800-GHARCHEF</strong>.
              </span>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <Link href="/checkout" className="w-full sm:w-1/2">
                <Button variant="primary" className="w-full font-bold py-3.5 shadow-soft flex items-center justify-center gap-1.5">
                  <RefreshCw className="w-4 h-4" />
                  <span>Retry Payment</span>
                </Button>
              </Link>
              <Link href="/" className="w-full sm:w-1/2">
                <Button variant="secondary" className="w-full py-3.5 flex items-center justify-center gap-1.5">
                  <Home className="w-4 h-4" />
                  <span>Go to Homepage</span>
                </Button>
              </Link>
            </div>

          </CardContent>
        </Card>

      </main>

      <Footer />
    </div>
  );
}

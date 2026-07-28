"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle2, ChevronRight, Home, Clock, Phone, MapPin, Sparkles, ChefHat } from "lucide-react";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import Link from "next/link";

export default function OrderSuccessPage() {
  const { currentAddress } = useAuth();
  const [orderTotal, setOrderTotal] = useState("0");
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    // Retrieve total from localStorage
    const savedTotal = localStorage.getItem("last_order_total") || "189";
    setOrderTotal(savedTotal);

    // Generate random order ID
    const randomId = "GC-" + Math.floor(100000 + Math.random() * 900000);
    setOrderId(randomId);
  }, []);

  // Workflows tracking steps
  const steps = [
    { title: "Order Placed", desc: "Chef received your order", active: true, done: true },
    { title: "Preparing", desc: "Cooked fresh in home kitchen", active: true, done: false },
    { title: "Out for Delivery", desc: "Partner picking up hot container", active: false, done: false },
    { title: "Delivered", desc: "OTP verification complete", active: false, done: false }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-custom-bg">
      <Navbar />

      <main className="flex-grow max-w-[900px] mx-auto w-full px-4 md:px-8 py-10 text-left">
        
        {/* Success header card */}
        <Card className="rounded-card border border-custom-border bg-white shadow-soft overflow-hidden">
          <CardContent className="p-6 md:p-10 text-center space-y-6">
            
            {/* Confetti & Checkmark */}
            <div className="relative flex justify-center py-2">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 12 }}
                className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center border border-emerald-100 shadow-sm relative z-10"
              >
                <CheckCircle2 className="w-10 h-10 stroke-[1.8]" />
              </motion.div>
              
              {/* Confetti sparkle backgrounds (custom floating particles) */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [-10, -50 - Math.random() * 30],
                    x: [0, (i % 2 === 0 ? 1 : -1) * (40 + Math.random() * 40)],
                    scale: [0.8, 0],
                    opacity: [1, 0]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                  className="absolute w-2.5 h-2.5 rounded-full bg-primary"
                  style={{ top: "45%" }}
                />
              ))}
            </div>

            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-light-orange text-xs text-primary font-bold rounded-full border border-primary/10 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Happy Eating</span>
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-primary-text">Order Placed Successfully!</h2>
              <p className="text-xs text-secondary-text max-w-sm mx-auto">
                Thank you! Your homemade meal order is confirmed. Your delivery partner is assigned.
              </p>
            </div>

            {/* Receipt Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 border border-custom-border/80 rounded-2xl bg-custom-bg/50 text-left text-xs max-w-2xl mx-auto">
              <div>
                <span className="text-muted block uppercase text-[10px] font-bold tracking-wider mb-0.5">Order ID</span>
                <span className="font-bold text-primary-text">{orderId}</span>
              </div>
              <div>
                <span className="text-muted block uppercase text-[10px] font-bold tracking-wider mb-0.5">Amount Paid</span>
                <span className="font-bold text-primary">₹{orderTotal}</span>
              </div>
              <div>
                <span className="text-muted block uppercase text-[10px] font-bold tracking-wider mb-0.5">Est. Delivery</span>
                <span className="font-bold text-primary-text flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-secondary-orange" />
                  <span>35-45 mins</span>
                </span>
              </div>
              <div>
                <span className="text-muted block uppercase text-[10px] font-bold tracking-wider mb-0.5">Deliver To</span>
                <span className="font-bold text-primary-text truncate block">{currentAddress.split(",")[0]}</span>
              </div>
            </div>

            {/* Tracking Workflow progress steps */}
            <div className="max-w-2xl mx-auto pt-6 border-t border-custom-border/50 text-left space-y-4">
              <h4 className="font-bold text-sm text-primary-text">Order Tracking Status</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4 relative pt-2">
                {steps.map((st, idx) => (
                  <div key={st.title} className="flex md:flex-col items-start md:items-center text-left md:text-center gap-3 md:gap-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center border text-[10px] font-bold z-10 ${
                      st.done
                        ? "bg-emerald-500 border-emerald-500 text-white"
                        : st.active
                          ? "bg-primary border-primary text-white animate-pulse"
                          : "bg-white border-custom-border text-muted"
                    }`}>
                      {idx + 1}
                    </div>
                    <div>
                      <h5 className={`font-bold text-xs ${st.active ? "text-primary-text" : "text-muted"}`}>{st.title}</h5>
                      <p className="text-[10px] text-muted mt-0.5 leading-relaxed max-w-[130px] md:mx-auto">{st.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chef callout details */}
            <div className="p-4 bg-white border border-custom-border rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 max-w-2xl mx-auto text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-light-orange flex items-center justify-center text-primary">
                  <ChefHat className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-xs text-primary-text">Home Chef Support</h5>
                  <p className="text-[10px] text-secondary-text">Call chef for preparation queries or food directions.</p>
                </div>
              </div>
              <button className="px-4 py-2 border border-custom-border hover:border-primary/20 hover:bg-light-orange text-xs font-semibold rounded-xl text-primary-text transition-all flex items-center gap-1.5 cursor-pointer">
                <Phone className="w-3.5 h-3.5 text-primary" />
                <span>Call Kitchen</span>
              </button>
            </div>

            {/* Actions */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <Link href="/" className="w-full sm:w-1/2">
                <Button variant="primary" className="w-full font-bold py-3.5 shadow-soft">
                  Order Something Else
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

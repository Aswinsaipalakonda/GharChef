"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Truck,
  MapPin,
  Clock,
  Phone,
  DollarSign,
  User,
  History,
  CheckCircle2,
  Navigation,
  Key,
  ToggleLeft,
  ToggleRight,
  Shield,
  HelpCircle,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Award,
  ChevronRight,
  Info
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";

type MobileTabType = "deliveries" | "earnings" | "profile";

interface ActiveDelivery {
  id: string;
  chefName: string;
  chefAddress: string;
  customerName: string;
  customerAddress: string;
  distance: string;
  payout: number;
  items: string;
  status: "assigned" | "accepted" | "picked-up" | "arrived";
}

interface HistoricalDelivery {
  id: string;
  chefName: string;
  amount: number;
  time: string;
  status: "delivered" | "returned";
}

export default function DeliveryDashboard() {
  const { user } = useAuth();
  
  const [activeTab, setActiveTab] = useState<MobileTabType>("deliveries");
  const [isOnline, setIsOnline] = useState(true);

  // Active delivery state workflow
  const [activeJob, setActiveJob] = useState<ActiveDelivery | null>({
    id: "GC-482910",
    chefName: "Mom's Kitchen",
    chefAddress: "Flat 402, Sunshine Heights, Gachibowli",
    customerName: "Priya Sharma",
    customerAddress: "Flat 204, Gachibowli Flyover Road, Hyderabad",
    distance: "2.4 km",
    payout: 45,
    items: "Chicken Dum Biryani x 1, Gulab Jamun x 1",
    status: "assigned"
  });

  // OTP Verification state
  const [enteredOtp, setEnteredOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [otpSuccess, setOtpSuccess] = useState(false);

  // History list
  const [deliveryHistory, setDeliveryHistory] = useState<HistoricalDelivery[]>([
    { id: "GC-298174", chefName: "Swathi Kitchen", amount: 35, time: "Yesterday, 04:30 PM", status: "delivered" },
    { id: "GC-187263", chefName: "Ritu Kitchen", amount: 50, time: "Yesterday, 01:15 PM", status: "delivered" },
    { id: "GC-092817", chefName: "Mom's Kitchen", amount: 40, time: "09 July 2026", status: "delivered" }
  ]);

  // Earnings details
  const todayEarnings = deliveryHistory.reduce((acc, curr) => acc + curr.amount, 0) + (otpSuccess ? 45 : 0);
  const totalTrips = deliveryHistory.length + (otpSuccess ? 1 : 0);

  // Workflows actions
  const handleAcceptJob = () => {
    if (activeJob) {
      setActiveJob({ ...activeJob, status: "accepted" });
    }
  };

  const handleDeclineJob = () => {
    setActiveJob(null);
  };

  const handleConfirmPickup = () => {
    if (activeJob) {
      setActiveJob({ ...activeJob, status: "picked-up" });
    }
  };

  const handleConfirmArrived = () => {
    if (activeJob) {
      setActiveJob({ ...activeJob, status: "arrived" });
    }
  };

  const handleOtpVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError("");
    if (enteredOtp === "1234") {
      setOtpSuccess(true);
      // Append completed job to history list
      if (activeJob) {
        const histItem: HistoricalDelivery = {
          id: activeJob.id,
          chefName: activeJob.chefName,
          amount: activeJob.payout,
          time: "Today, Just Now",
          status: "delivered"
        };
        setDeliveryHistory([histItem, ...deliveryHistory]);
      }
      // Clear active job
      setTimeout(() => {
        setActiveJob(null);
        setOtpSuccess(false);
        setEnteredOtp("");
      }, 3000);
    } else {
      setOtpError("Incorrect delivery code. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] flex flex-col justify-between max-w-[480px] mx-auto border-x border-zinc-200 shadow-2xl relative overflow-hidden font-sans">
      
      {/* 1. TOP HEADER (Online/Offline switch, name, vehicle stats) */}
      <header className="sticky top-0 z-20 bg-zinc-950 text-white p-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xs uppercase shadow-sm">
            R
          </div>
          <div className="text-left">
            <h4 className="font-bold text-xs">Rider Amit Singh</h4>
            <span className="text-[9px] text-zinc-400 font-mono">Honda Activa (TS-08-1928)</span>
          </div>
        </div>

        {/* Online toggler */}
        <button
          onClick={() => setIsOnline(!isOnline)}
          className="flex items-center gap-1.5 transition-all focus:outline-none cursor-pointer"
        >
          {isOnline ? (
            <div className="flex items-center gap-1 px-2.5 py-1 bg-emerald-500/20 text-emerald-400 rounded-full border border-emerald-500/20 text-[10px] font-bold">
              <span>ONLINE</span>
              <ToggleRight className="w-5 h-5 text-emerald-400 stroke-[1.8]" />
            </div>
          ) : (
            <div className="flex items-center gap-1 px-2.5 py-1 bg-zinc-800 text-zinc-400 rounded-full border border-zinc-700 text-[10px] font-bold">
              <span>OFFLINE</span>
              <ToggleLeft className="w-5 h-5 text-zinc-500 stroke-[1.8]" />
            </div>
          )}
        </button>
      </header>

      {/* 2. CORE SCROLLABLE CONTENT BODY */}
      <main className="flex-grow p-4 space-y-4 overflow-y-auto pb-24 text-left">
        
        {/* TABS RESOLUTIONS */}

        {/* TAB: DELIVERIES */}
        {activeTab === "deliveries" && (
          <div className="space-y-4">
            
            {/* Offline warning overlay banner */}
            {!isOnline && (
              <div className="p-4 bg-zinc-800 text-zinc-300 border border-zinc-700 rounded-2xl flex gap-3 text-xs leading-relaxed">
                <AlertTriangle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  <strong>You are offline!</strong> You won't receive any customer delivery assignments until you toggle back online.
                </span>
              </div>
            )}

            {/* Active Delivery Workflow */}
            {isOnline && activeJob ? (
              <div className="space-y-4">
                
                {/* A. ASSIGNED STATE */}
                {activeJob.status === "assigned" && (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="p-5 bg-white border border-zinc-200 rounded-card shadow-lg space-y-4 text-xs"
                  >
                    <div className="flex justify-between items-center border-b border-zinc-100 pb-3">
                      <span className="text-[9px] font-bold text-primary bg-light-orange px-2.5 py-0.5 rounded-full border border-primary/10 uppercase tracking-wider">
                        New Job Assigned
                      </span>
                      <span className="font-bold text-zinc-400 font-mono">{activeJob.id}</span>
                    </div>

                    <div className="space-y-3.5">
                      <div className="flex gap-2">
                        <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <div className="text-left">
                          <span className="text-[10px] text-zinc-400 block uppercase font-bold tracking-wider">Pickup Kitchen</span>
                          <strong className="text-zinc-800 font-bold">{activeJob.chefName}</strong>
                          <p className="text-[10px] text-zinc-500 mt-0.5">{activeJob.chefAddress}</p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <div className="text-left">
                          <span className="text-[10px] text-zinc-400 block uppercase font-bold tracking-wider">Deliver To</span>
                          <strong className="text-zinc-800 font-bold">{activeJob.customerName}</strong>
                          <p className="text-[10px] text-zinc-500 mt-0.5">{activeJob.customerAddress}</p>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-zinc-150 pt-3 flex justify-between items-center text-zinc-500 font-bold">
                      <div className="flex items-center gap-1">
                        <Navigation className="w-3.5 h-3.5 text-primary" />
                        <span>Distance: {activeJob.distance}</span>
                      </div>
                      <span className="text-primary text-sm font-bold">Payout: ₹{activeJob.payout}</span>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={handleDeclineJob}
                        className="flex-1 py-2.5 border border-zinc-200 hover:bg-zinc-50 font-bold rounded-xl text-zinc-700 text-center cursor-pointer transition-colors"
                      >
                        Decline
                      </button>
                      <button
                        onClick={handleAcceptJob}
                        className="flex-1 py-2.5 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl text-center cursor-pointer shadow-md transition-colors"
                      >
                        Accept Delivery
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* B. ACCEPTED STATE (Go to kitchen map directions) */}
                {activeJob.status === "accepted" && (
                  <div className="p-5 bg-white border border-zinc-200 rounded-card shadow-md space-y-4 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-primary">Task: Navigate to Kitchen</span>
                      <span className="font-bold text-zinc-400 font-mono">{activeJob.id}</span>
                    </div>

                    <div className="p-4 bg-zinc-50 border border-zinc-100 rounded-xl space-y-2 text-zinc-600">
                      <h5 className="font-bold text-zinc-950 flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-primary">
                        <Navigation className="w-4 h-4 stroke-[2]" />
                        <span>GPS Directions</span>
                      </h5>
                      <p className="italic">"Take Gachibowli flyover lane, take first left at Sunshine Heights signpost."</p>
                    </div>

                    <div className="p-3 border border-zinc-150 rounded-xl space-y-1.5">
                      <span className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider">Pickup Details</span>
                      <h4 className="font-bold text-zinc-800">{activeJob.chefName}</h4>
                      <p className="text-[10px] text-zinc-500">{activeJob.chefAddress}</p>
                      <p className="text-[10px] font-bold text-primary pt-1">Items to Pick: {activeJob.items}</p>
                    </div>

                    <button
                      onClick={handleConfirmPickup}
                      className="w-full py-3 bg-zinc-950 hover:bg-zinc-900 text-white font-bold rounded-xl text-center cursor-pointer transition-colors shadow-sm"
                    >
                      Confirm Items Picked Up
                    </button>
                  </div>
                )}

                {/* C. PICKED UP STATE (Navigate to customer directions) */}
                {activeJob.status === "picked-up" && (
                  <div className="p-5 bg-white border border-zinc-200 rounded-card shadow-md space-y-4 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-emerald-600">Task: Deliver to Customer</span>
                      <span className="font-bold text-zinc-400 font-mono">{activeJob.id}</span>
                    </div>

                    <div className="p-4 bg-zinc-50 border border-zinc-100 rounded-xl space-y-2 text-zinc-600">
                      <h5 className="font-bold text-zinc-950 flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-emerald-600">
                        <Navigation className="w-4 h-4 stroke-[2]" />
                        <span>GPS Directions</span>
                      </h5>
                      <p className="italic">"Continue 1.5 km straight, destination is next to Flyover road Pillar 45."</p>
                    </div>

                    <div className="p-3 border border-zinc-150 rounded-xl space-y-1.5">
                      <span className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider">Customer Location</span>
                      <h4 className="font-bold text-zinc-800">{activeJob.customerName}</h4>
                      <p className="text-[10px] text-zinc-500">{activeJob.customerAddress}</p>
                    </div>

                    <div className="flex gap-3">
                      <button className="flex-1 py-2.5 border border-zinc-200 rounded-xl font-bold flex items-center justify-center gap-1.5 cursor-pointer">
                        <Phone className="w-3.5 h-3.5 text-primary" />
                        <span>Call Customer</span>
                      </button>
                      <button
                        onClick={handleConfirmArrived}
                        className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-center cursor-pointer transition-colors shadow-sm"
                      >
                        I Have Arrived
                      </button>
                    </div>
                  </div>
                )}

                {/* D. ARRIVED STATE (OTP Verification doorstep code entry) */}
                {activeJob.status === "arrived" && (
                  <div className="p-5 bg-white border border-zinc-200 rounded-card shadow-md space-y-4 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-primary-text">Verify Doorstep Delivery</span>
                      <span className="font-bold text-zinc-400 font-mono">{activeJob.id}</span>
                    </div>

                    {otpSuccess ? (
                      <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-2xl text-center space-y-2">
                        <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                        <h4 className="font-bold text-sm text-emerald-800">Delivery Verified!</h4>
                        <p className="text-[10px] text-emerald-600">Earnings ₹{activeJob.payout} credited to wallet.</p>
                      </div>
                    ) : (
                      <form onSubmit={handleOtpVerify} className="space-y-4">
                        <div className="p-3.5 bg-light-orange/40 border border-light-orange rounded-xl text-[10px] text-secondary-orange leading-relaxed">
                          <Info className="w-4 h-4 flex-shrink-0 text-primary mt-0.5 inline mr-1" />
                          <span>Ask customer for their delivery verification code. Use code <strong>1234</strong> to simulate.</span>
                        </div>

                        <div className="space-y-1">
                          <label className="font-semibold text-zinc-500">4-Digit Delivery Code</label>
                          <Input
                            type="password"
                            placeholder="Enter OTP code"
                            maxLength={4}
                            value={enteredOtp}
                            onChange={(e) => setEnteredOtp(e.target.value.replace(/\D/g, ""))}
                            required
                          />
                        </div>

                        {otpError && <p className="text-[10px] text-danger font-semibold">{otpError}</p>}

                        <Button type="submit" variant="primary" className="w-full font-bold py-2.5 shadow-soft">
                          Confirm Delivery Complete
                        </Button>
                      </form>
                    )}
                  </div>
                )}

              </div>
            ) : (
              /* NO ACTIVE JOBS STATE */
              <div className="text-center py-12 bg-white border border-zinc-200 rounded-card p-6 shadow-sm space-y-4">
                <Truck className="w-12 h-12 text-zinc-400 mx-auto stroke-[1.2]" />
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-zinc-950">Waiting for Delivery Jobs...</h4>
                  <p className="text-[11px] text-zinc-400">Keep account toggled Online. Platform will ping you when orders are ready.</p>
                </div>
              </div>
            )}

            {/* Quick stats banner today */}
            <div className="grid grid-cols-3 gap-3 bg-white border border-zinc-200 rounded-2xl p-4 shadow-sm text-center text-xs">
              <div>
                <strong className="block text-zinc-950 font-mono text-sm">{totalTrips}</strong>
                <span className="text-[9px] text-zinc-400 uppercase font-bold">Trips Done</span>
              </div>
              <div>
                <strong className="block text-primary font-mono text-sm">₹{todayEarnings}</strong>
                <span className="text-[9px] text-zinc-400 uppercase font-bold">Earnings</span>
              </div>
              <div>
                <strong className="block text-zinc-950 font-mono text-sm">₹0</strong>
                <span className="text-[9px] text-zinc-400 uppercase font-bold">Cash to Pay</span>
              </div>
            </div>

          </div>
        )}

        {/* TAB: EARNINGS */}
        {activeTab === "earnings" && (
          <div className="space-y-4">
            <h3 className="font-bold text-sm text-zinc-950">Earnings & Incentives</h3>

            {/* Weekly curve summary card */}
            <Card className="rounded-xl border border-zinc-200 bg-zinc-950 text-white p-5 shadow-md space-y-4">
              <div className="flex justify-between items-center text-[10px] text-zinc-400 font-bold uppercase">
                <span>Wallet Balance</span>
                <span className="text-primary font-mono">ritu@oksbi</span>
              </div>
              <div className="space-y-0.5">
                <h2 className="text-3xl font-bold text-primary font-mono">₹{todayEarnings + 240}</h2>
                <p className="text-[10px] text-zinc-400">Includes fuel allowance and base fees.</p>
              </div>
            </Card>

            {/* History table list */}
            <div className="bg-white border border-zinc-200 rounded-card p-4 shadow-sm space-y-3">
              <h4 className="font-bold text-xs text-zinc-950 border-b pb-2">Trip Logs</h4>
              
              <div className="divide-y divide-zinc-100 text-xs">
                {deliveryHistory.map((hist) => (
                  <div key={hist.id} className="py-2.5 flex justify-between items-center">
                    <div className="text-left space-y-0.5">
                      <span className="font-bold text-zinc-950">{hist.id}</span>
                      <p className="text-[10px] text-zinc-400">From {hist.chefName} | {hist.time}</p>
                    </div>
                    <span className="font-bold text-zinc-950 font-mono text-xs">₹{hist.amount}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB: PROFILE */}
        {activeTab === "profile" && (
          <div className="space-y-4 text-xs">
            <h3 className="font-bold text-sm text-zinc-950">Rider Profile</h3>

            {/* Profile Avatar Card */}
            <Card className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm text-center space-y-3">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto uppercase">
                R
              </div>
              <div>
                <h4 className="font-bold text-sm text-zinc-950">Amit Singh</h4>
                <p className="text-[10px] text-zinc-400">Hyderabad Hub Partner</p>
              </div>
              <div className="flex gap-1 justify-center text-amber-500 font-bold">
                <span>4.9 ★ Delivery Rating</span>
              </div>
            </Card>

            {/* Vehicle & KYC Specifications */}
            <Card className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm space-y-3">
              <h4 className="font-bold text-xs text-zinc-950 border-b pb-2">Vehicle Details</h4>
              
              <div className="space-y-2 text-zinc-600">
                <div className="flex justify-between">
                  <span>Active Vehicle</span>
                  <span className="font-bold text-zinc-950">Honda Activa 6G</span>
                </div>
                <div className="flex justify-between">
                  <span>License Plate</span>
                  <span className="font-bold text-zinc-950">TS-08-EK-1928</span>
                </div>
                <div className="flex justify-between">
                  <span>DL Verification Code</span>
                  <span className="font-bold text-zinc-950">DL-2981920-HYD</span>
                </div>
              </div>
            </Card>
          </div>
        )}

      </main>

      {/* 3. PINNED BOTTOM APP TAB BAR */}
      <nav className="absolute bottom-0 left-0 right-0 bg-white border-t border-zinc-200 py-3 px-4 flex justify-around shadow-[0_-8px_30px_rgba(0,0,0,0.06)] z-20">
        <button
          onClick={() => setActiveTab("deliveries")}
          className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${
            activeTab === "deliveries" ? "text-primary font-bold" : "text-zinc-400 hover:text-zinc-600"
          }`}
        >
          <Truck className="w-5 h-5" />
          <span className="text-[9px] uppercase tracking-wide">Deliveries</span>
        </button>

        <button
          onClick={() => setActiveTab("earnings")}
          className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${
            activeTab === "earnings" ? "text-primary font-bold" : "text-zinc-400 hover:text-zinc-600"
          }`}
        >
          <DollarSign className="w-5 h-5" />
          <span className="text-[9px] uppercase tracking-wide">Earnings</span>
        </button>

        <button
          onClick={() => setActiveTab("profile")}
          className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${
            activeTab === "profile" ? "text-primary font-bold" : "text-zinc-400 hover:text-zinc-600"
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[9px] uppercase tracking-wide">Profile</span>
        </button>
      </nav>

    </div>
  );
}

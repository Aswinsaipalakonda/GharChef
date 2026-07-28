"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Boxes,
  BarChart3,
  Tag,
  Star,
  DollarSign,
  Settings as SettingsIcon,
  Plus,
  Minus,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  Clock,
  AlertCircle,
  Eye,
  PlusCircle,
  ToggleLeft,
  ToggleRight,
  User,
  ArrowUpRight,
  Download,
  Menu,
  X,
  Sparkles,
  Info,
  ChefHat
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { products, Product } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";

type SellerTabType =
  | "overview"
  | "orders"
  | "products"
  | "inventory"
  | "analytics"
  | "coupons"
  | "reviews"
  | "withdrawals"
  | "settings";

interface SellerOrder {
  id: string;
  customer: string;
  items: string;
  amount: number;
  date: string;
  status: "completed" | "processing" | "refunded";
  email: string;
}

interface WithdrawalItem {
  id: string;
  amount: number;
  date: string;
  status: "settled" | "pending";
  account: string;
}

interface CouponItem {
  code: string;
  value: number;
  type: "percentage" | "flat";
  minOrder: number;
  active: boolean;
}

interface ReviewItem {
  id: string;
  dishName: string;
  customerName: string;
  rating: number;
  comment: string;
  reply?: string;
  date: string;
}

export default function SellerDashboard() {
  const { user, logout } = useAuth();
  
  const [activeTab, setActiveTab] = useState<SellerTabType>("overview");
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);

  // Form states
  const [prodName, setProdName] = useState("");
  const [prodPrice, setProdPrice] = useState("");
  const [prodCategory, setProdCategory] = useState("Biryani");
  const [prodType, setProdType] = useState<"veg" | "non-veg">("veg");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawAlert, setWithdrawAlert] = useState("");

  // Product List (initially synced with mock data)
  const [sellerProducts, setSellerProducts] = useState<Product[]>([]);
  useEffect(() => {
    // Show only products from "Mom's Kitchen" (this seller's mock workspace) or default
    const filtered = products.filter(p => p.chefName === "Mom's Kitchen" || p.chefId === "chef-mom");
    setSellerProducts(filtered.length > 0 ? filtered : products.slice(0, 5));
  }, []);

  // Mock Payout history
  const [payouts, setPayouts] = useState<WithdrawalItem[]>([
    { id: "PAY-9812", amount: 4890, date: "10 July 2026", status: "settled", account: "HDFC ****9812" },
    { id: "PAY-8219", amount: 3200, date: "03 July 2026", status: "settled", account: "UPI: ritu@oksbi" },
    { id: "PAY-2917", amount: 1540, date: "26 June 2026", status: "settled", account: "HDFC ****9812" }
  ]);

  // Mock Orders log (Stripe style)
  const [sellerOrders, setSellerOrders] = useState<SellerOrder[]>([
    { id: "in_1sJ829", customer: "Priya Sharma", items: "Chicken Dum Biryani x 1", amount: 189, date: "Today, 11:32 AM", status: "processing", email: "priya@example.com" },
    { id: "in_1sI924", customer: "Rahul Kumar", items: "Avakaya Mango Pickle x 2", amount: 398, date: "Yesterday, 04:15 PM", status: "completed", email: "rahul@example.com" },
    { id: "in_1sH810", customer: "Anjali Reddy", items: "Masala Puri x 1, Gulab Jamun x 1", amount: 208, date: "11 July 2026", status: "completed", email: "anjali@example.com" },
    { id: "in_1sG723", customer: "Sujata Rao", items: "Premium Punjabi Veg Thali x 2", amount: 438, date: "09 July 2026", status: "completed", email: "sujata@example.com" },
    { id: "in_1sF610", customer: "Vikram Sen", items: "Paneer Butter Masala x 1", amount: 159, date: "06 July 2026", status: "refunded", email: "vikram@example.com" }
  ]);

  const stats = {
    grossRevenue: "₹10,393",
    ordersCount: "52",
    avgOrderVal: "₹199",
    activeCustomers: "38"
  };

  // Coupons State
  const [coupons, setCoupons] = useState<CouponItem[]>([
    { code: "GHARCHEF10", value: 10, type: "percentage", minOrder: 199, active: true },
    { code: "FREECHEF", value: 50, type: "flat", minOrder: 349, active: true },
    { code: "FREEDEL", value: 30, type: "flat", minOrder: 249, active: true }
  ]);

  const [newCouponCode, setNewCouponCode] = useState("");
  const [newCouponVal, setNewCouponVal] = useState("");
  const [newCouponMin, setNewCouponMin] = useState("");
  const [newCouponType, setNewCouponType] = useState<"percentage" | "flat">("flat");

  // Reviews State
  const [reviews, setReviews] = useState<ReviewItem[]>([
    {
      id: "rev-1",
      dishName: "Hyderabadi Chicken Dum Biryani",
      customerName: "Sujata K.",
      rating: 5,
      comment: "Super fresh and perfectly spicy! Tastes like traditional home food.",
      reply: "Thank you, Sujata! I prepared the spices fresh that morning.",
      date: "12 July 2026"
    },
    {
      id: "rev-2",
      dishName: "Paneer Butter Masala",
      customerName: "Vikram P.",
      rating: 4,
      comment: "Very creamy gravy and soft paneer. Delivery was slightly delayed.",
      date: "10 July 2026"
    }
  ]);

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode || !newCouponVal) return;
    const item: CouponItem = {
      code: newCouponCode.toUpperCase(),
      value: Number(newCouponVal),
      type: newCouponType,
      minOrder: Number(newCouponMin) || 199,
      active: true
    };
    setCoupons([...coupons, item]);
    setNewCouponCode("");
    setNewCouponVal("");
    setNewCouponMin("");
  };

  const handleReviewReply = (id: string, text: string) => {
    setReviews(
      reviews.map((r) => (r.id === id ? { ...r, reply: text } : r))
    );
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName || !prodPrice) return;
    const newProd: Product = {
      id: "prod-" + Date.now(),
      chefId: "chef-mom",
      chefName: "Mom's Kitchen",
      name: prodName,
      description: "A freshly cooked home-made specialty prepared on order.",
      ingredients: ["Fresh ingredients", "Home-ground spices"],
      prepTime: "30-40 mins",
      availableQty: 10,
      price: Number(prodPrice),
      rating: 5.0,
      reviewsCount: 0,
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=400&auto=format&fit=crop",
      foodType: prodType,
      spiceLevel: "medium",
      category: prodCategory as any,
      isAvailable: true
    };
    setSellerProducts([newProd, ...sellerProducts]);
    setProdName("");
    setProdPrice("");
    setIsAddProductOpen(false);
  };

  const handleWithdrawalRequest = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = Number(withdrawAmount);
    if (!amt || amt <= 0) return;
    const newWithdrawal: WithdrawalItem = {
      id: "PAY-" + Math.floor(1000 + Math.random() * 9000),
      amount: amt,
      date: "Today",
      status: "pending",
      account: "UPI: ritu@oksbi"
    };
    setPayouts([newWithdrawal, ...payouts]);
    setWithdrawAmount("");
    setIsWithdrawOpen(false);
    setWithdrawAlert("Withdrawal request submitted successfully!");
    setTimeout(() => setWithdrawAlert(""), 4000);
  };

  const toggleProductAvailability = (id: string) => {
    setSellerProducts(
      sellerProducts.map(p => p.id === id ? { ...p, isAvailable: !p.isAvailable } : p)
    );
  };

  const updateInventoryQty = (id: string, qty: number) => {
    if (qty < 0) return;
    setSellerProducts(
      sellerProducts.map(p => p.id === id ? { ...p, availableQty: qty } : p)
    );
  };

  const sidebarLinks = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "orders", label: "Orders", icon: ShoppingBag, badge: sellerOrders.filter(o => o.status === "processing").length },
    { id: "products", label: "Products", icon: Package },
    { id: "inventory", label: "Inventory", icon: Boxes },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "withdrawals", label: "Withdrawals", icon: DollarSign },
    { id: "coupons", label: "Coupons", icon: Tag },
    { id: "reviews", label: "Reviews", icon: Star },
    { id: "settings", label: "Settings", icon: SettingsIcon }
  ];

  return (
    <div className="min-h-screen w-full flex bg-[#F9F9FB] text-zinc-800 antialiased font-sans">
      
      {/* LEFT SIDEBAR PANEL (Stripe & Linear styled high-contrast dark menu) */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-zinc-950 text-zinc-400 border-r border-zinc-800/80 p-5 justify-between">
        <div className="space-y-6 text-left">
          
          {/* Logo brand */}
          <Link href="/" className="flex items-center gap-2.5 px-1">
            <div className="w-8.5 h-8.5 rounded-xl bg-primary flex items-center justify-center text-white shadow-md">
              <ChefHat className="w-5 h-5 stroke-[1.8]" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              Ghar<span className="text-primary">Chef</span>
            </span>
          </Link>

          {/* Quick Info */}
          <div className="bg-zinc-900 border border-zinc-800/60 rounded-xl p-3 flex gap-2 items-center">
            <div className="w-7.5 h-7.5 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs uppercase">
              M
            </div>
            <div className="min-w-0">
              <span className="block text-xs font-bold text-zinc-100 truncate">Mom's Kitchen</span>
              <span className="block text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Chef Account</span>
            </div>
          </div>

          {/* Nav links */}
          <nav className="space-y-1">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id as any)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold tracking-wide transition-all cursor-pointer ${
                    isActive
                      ? "bg-zinc-900 text-white border border-zinc-850"
                      : "bg-transparent text-zinc-400 hover:bg-zinc-900/60 hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </span>
                  {link.badge && link.badge > 0 ? (
                    <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-primary text-white">
                      {link.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom links */}
        <div className="pt-6 border-t border-zinc-850 space-y-3.5 text-left">
          <Link href="/" className="block text-[11px] font-semibold text-zinc-500 hover:text-zinc-300">
            View Marketplace
          </Link>
          <button onClick={logout} className="block text-[11px] font-bold text-rose-500/80 hover:text-rose-400 cursor-pointer">
            Logout Session
          </button>
        </div>
      </aside>

      {/* MOBILE HEADER & DRAWER NAV */}
      <div className="flex flex-col flex-1 w-full min-w-0 overflow-y-auto">
        <header className="lg:hidden w-full bg-zinc-950 border-b border-zinc-900 px-4 py-4 flex items-center justify-between z-30">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center text-white">
              <ChefHat className="w-4 h-4" />
            </div>
            <span className="text-base font-bold text-white">GharChef Seller</span>
          </Link>
          <button
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            className="p-1.5 border border-zinc-800 rounded-lg text-white"
          >
            {isMobileNavOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </header>

        <AnimatePresence>
          {isMobileNavOpen && (
            <>
              <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setIsMobileNavOpen(false)} />
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "tween", duration: 0.25 }}
                className="fixed left-0 top-0 bottom-0 w-64 bg-zinc-950 shadow-lg z-40 p-5 flex flex-col justify-between text-left lg:hidden"
              >
                <div className="space-y-6">
                  <div className="flex justify-between items-center pb-2 border-b border-zinc-850">
                    <span className="font-bold text-sm text-white">Seller Navigation</span>
                    <button onClick={() => setIsMobileNavOpen(false)} className="p-1 border border-zinc-800 rounded-lg text-white">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <nav className="space-y-1">
                    {sidebarLinks.map((link) => {
                      const Icon = link.icon;
                      const isActive = activeTab === link.id;
                      return (
                        <button
                          key={link.id}
                          onClick={() => {
                            setActiveTab(link.id as any);
                            setIsMobileNavOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold tracking-wide transition-all cursor-pointer ${
                            isActive ? "bg-zinc-900 text-white" : "bg-transparent text-zinc-400 hover:text-white"
                          }`}
                        >
                          <span className="flex items-center gap-2.5">
                            <Icon className="w-4 h-4" />
                            <span>{link.label}</span>
                          </span>
                        </button>
                      );
                    })}
                  </nav>
                </div>
                <button onClick={logout} className="text-rose-500 font-bold text-xs pt-4 border-t border-zinc-850 w-full text-left">
                  Logout Session
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* MAIN PANEL CONTENT */}
        <div className="flex-1 px-4 md:px-10 py-8 text-left space-y-8">
          
          {withdrawAlert && (
            <div className="p-3 bg-emerald-50 border border-emerald-100 text-xs text-emerald-700 font-semibold rounded-xl flex items-center gap-1.5 max-w-xl shadow-sm">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>{withdrawAlert}</span>
            </div>
          )}

          {/* PAGE: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              
              {/* Top title */}
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Mom's Kitchen Dashboard</span>
                  <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Overview</h1>
                </div>
                
                {/* Export button */}
                <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-white border border-zinc-200 hover:bg-zinc-50 rounded-xl text-xs font-bold text-zinc-700 shadow-sm cursor-pointer">
                  <Download className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Export Report</span>
                </button>
              </div>

              {/* Stripe Stats Card Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <Card className="rounded-card border border-zinc-200/80 bg-white p-5 shadow-soft hover:shadow-soft-md transition-shadow">
                  <CardContent className="p-0 space-y-1.5 text-left">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Gross Revenue</span>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-600 text-[10px] font-bold flex items-center gap-0.5">
                        <TrendingUp className="w-3 h-3" />
                        <span>+14.3%</span>
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-zinc-900 tracking-tight font-mono">{stats.grossRevenue}</h3>
                    <p className="text-[10px] text-zinc-400">Total earnings processed this week</p>
                  </CardContent>
                </Card>

                <Card className="rounded-card border border-zinc-200/80 bg-white p-5 shadow-soft hover:shadow-soft-md transition-shadow">
                  <CardContent className="p-0 space-y-1.5 text-left">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Net Orders</span>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-600 text-[10px] font-bold flex items-center gap-0.5">
                        <TrendingUp className="w-3 h-3" />
                        <span>+8.5%</span>
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-zinc-900 tracking-tight font-mono">{stats.ordersCount}</h3>
                    <p className="text-[10px] text-zinc-400">Meals prepared successfully</p>
                  </CardContent>
                </Card>

                <Card className="rounded-card border border-zinc-200/80 bg-white p-5 shadow-soft hover:shadow-soft-md transition-shadow">
                  <CardContent className="p-0 space-y-1.5 text-left">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Average Order</span>
                      <span className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-600 text-[10px] font-bold flex items-center gap-0.5">
                        <TrendingDown className="w-3 h-3" />
                        <span>-1.2%</span>
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-zinc-900 tracking-tight font-mono">{stats.avgOrderVal}</h3>
                    <p className="text-[10px] text-zinc-400">Standard ticket size per checkout</p>
                  </CardContent>
                </Card>

                <Card className="rounded-card border border-zinc-200/80 bg-white p-5 shadow-soft hover:shadow-soft-md transition-shadow">
                  <CardContent className="p-0 space-y-1.5 text-left">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Active Customers</span>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-600 text-[10px] font-bold flex items-center gap-0.5">
                        <TrendingUp className="w-3 h-3" />
                        <span>+22.1%</span>
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-zinc-900 tracking-tight font-mono">{stats.activeCustomers}</h3>
                    <p className="text-[10px] text-zinc-400">Unique foodies ordering this month</p>
                  </CardContent>
                </Card>
              </div>

              {/* Stripe Style Custom SVG Chart and Recent log side-by-side */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Revenue Curve block */}
                <div className="lg:col-span-8 bg-white border border-zinc-200/80 rounded-card p-5 shadow-soft">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-sm text-zinc-950">Earnings Curve</h3>
                    <span className="text-[10px] font-bold text-zinc-400">LAST 7 DAYS</span>
                  </div>

                  {/* SVG Line Chart (100% responsive, zero package dependency) */}
                  <div className="w-full h-48 bg-zinc-50/50 rounded-xl border border-zinc-100 flex items-end relative overflow-hidden px-4">
                    <svg className="w-full h-[85%] overflow-visible" viewBox="0 0 600 100" preserveAspectRatio="none">
                      {/* Gradient Fill */}
                      <defs>
                        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#FC8019" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#FC8019" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0,80 Q100,20 200,60 T400,10 T600,40 L600,100 L0,100 Z"
                        fill="url(#chartGrad)"
                      />
                      {/* Chart Stroke */}
                      <path
                        d="M0,80 Q100,20 200,60 T400,10 T600,40"
                        fill="none"
                        stroke="#FC8019"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      {/* Data dots */}
                      <circle cx="200" cy="60" r="4.5" fill="#FC8019" stroke="#ffffff" strokeWidth="1.5" />
                      <circle cx="400" cy="10" r="4.5" fill="#FC8019" stroke="#ffffff" strokeWidth="1.5" />
                    </svg>
                    
                    {/* Day labels overlay */}
                    <div className="absolute bottom-2 left-0 right-0 flex justify-between px-6 text-[9px] font-bold text-zinc-400">
                      <span>Mon</span>
                      <span>Tue</span>
                      <span>Wed</span>
                      <span>Thu</span>
                      <span>Fri</span>
                      <span>Sat</span>
                      <span>Sun</span>
                    </div>
                  </div>
                </div>

                {/* Status Box block */}
                <div className="lg:col-span-4 bg-white border border-zinc-200/80 rounded-card p-5 shadow-soft text-left flex flex-col justify-between">
                  <div className="space-y-4">
                    <h3 className="font-bold text-sm text-zinc-950">Payout Account</h3>
                    
                    <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl space-y-2 text-xs">
                      <div className="flex justify-between items-center text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
                        <span>Settlement ID</span>
                        <span className="text-primary font-mono select-all">ritu@oksbi</span>
                      </div>
                      <h4 className="font-bold text-zinc-800 text-sm">HDFC Bank Account</h4>
                      <p className="text-[10px] text-zinc-400">Settlements are processed weekly every Monday morning.</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsWithdrawOpen(true)}
                    className="w-full mt-4 py-2.5 bg-zinc-950 hover:bg-zinc-900 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer text-center flex items-center justify-center gap-1 shadow-sm"
                  >
                    <span>Request Payout</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

              {/* Large Orders Table */}
              <div className="bg-white border border-zinc-200/80 rounded-card p-5 shadow-soft text-left">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-sm text-zinc-950">Recent Orders</h3>
                  <button onClick={() => setActiveTab("orders")} className="text-xs font-bold text-primary hover:underline flex items-center gap-0.5">
                    <span>View all</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="border-b border-zinc-100 text-zinc-400 uppercase text-[9px] font-bold tracking-wider">
                        <th className="pb-3 pr-4">Order ID</th>
                        <th className="pb-3 pr-4">Customer</th>
                        <th className="pb-3 pr-4">Items</th>
                        <th className="pb-3 pr-4 font-mono">Amount</th>
                        <th className="pb-3 pr-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50 text-zinc-600 font-medium">
                      {sellerOrders.slice(0, 3).map((ord) => (
                        <tr key={ord.id} className="hover:bg-zinc-50/50 transition-colors">
                          <td className="py-3.5 font-bold text-zinc-900 pr-4">{ord.id}</td>
                          <td className="py-3.5 text-zinc-900 pr-4">{ord.customer}</td>
                          <td className="py-3.5 text-zinc-500 pr-4 line-clamp-1 max-w-[200px] truncate">{ord.items}</td>
                          <td className="py-3.5 font-mono text-zinc-900 pr-4">₹{ord.amount}</td>
                          <td className="py-3.5">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold ${
                              ord.status === "completed"
                                ? "bg-emerald-50 text-emerald-600"
                                : ord.status === "processing"
                                  ? "bg-amber-50 text-amber-600"
                                  : "bg-zinc-100 text-zinc-500"
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${
                                ord.status === "completed" ? "bg-emerald-500" : ord.status === "processing" ? "bg-amber-500" : "bg-zinc-400"
                              }`} />
                              <span className="capitalize">{ord.status}</span>
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* PAGE: ORDERS */}
          {activeTab === "orders" && (
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Kitchen Deliveries</span>
                <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Orders Log</h1>
              </div>

              {/* Large table list */}
              <div className="bg-white border border-zinc-200/80 rounded-card p-5 shadow-soft text-left">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="border-b border-zinc-100 text-zinc-400 uppercase text-[9px] font-bold tracking-wider">
                        <th className="pb-3 pr-4">Order ID</th>
                        <th className="pb-3 pr-4">Date</th>
                        <th className="pb-3 pr-4">Customer</th>
                        <th className="pb-3 pr-4">Items Summary</th>
                        <th className="pb-3 pr-4 font-mono">Total</th>
                        <th className="pb-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50 text-zinc-600 font-medium">
                      {sellerOrders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-zinc-50/50 transition-colors">
                          <td className="py-4 font-bold text-zinc-900 pr-4">{ord.id}</td>
                          <td className="py-4 text-zinc-400 pr-4">{ord.date}</td>
                          <td className="py-4 pr-4">
                            <span className="block font-bold text-zinc-900">{ord.customer}</span>
                            <span className="block text-[10px] text-zinc-400">{ord.email}</span>
                          </td>
                          <td className="py-4 text-zinc-500 pr-4 max-w-[200px] truncate">{ord.items}</td>
                          <td className="py-4 font-mono text-zinc-900 pr-4">₹{ord.amount}</td>
                          <td className="py-4">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold ${
                              ord.status === "completed"
                                ? "bg-emerald-50 text-emerald-600"
                                : ord.status === "processing"
                                  ? "bg-amber-50 text-amber-600"
                                  : "bg-zinc-100 text-zinc-500"
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${
                                ord.status === "completed" ? "bg-emerald-500" : ord.status === "processing" ? "bg-amber-500" : "bg-zinc-400"
                              }`} />
                              <span className="capitalize">{ord.status}</span>
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* PAGE: PRODUCTS */}
          {activeTab === "products" && (
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Dish Listings</span>
                  <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">My Products</h1>
                </div>
                <button
                  onClick={() => setIsAddProductOpen(true)}
                  className="flex items-center gap-1 px-3.5 py-2 bg-primary hover:bg-primary-hover text-white rounded-xl text-xs font-bold shadow-sm transition-colors cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Add Product</span>
                </button>
              </div>

              {/* Large Products Table */}
              <div className="bg-white border border-zinc-200/80 rounded-card p-5 shadow-soft text-left">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="border-b border-zinc-100 text-zinc-400 uppercase text-[9px] font-bold tracking-wider">
                        <th className="pb-3 pr-4">Dish</th>
                        <th className="pb-3 pr-4">Category</th>
                        <th className="pb-3 pr-4">Rating</th>
                        <th className="pb-3 pr-4 font-mono">Price</th>
                        <th className="pb-3 pr-4">Type</th>
                        <th className="pb-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50 text-zinc-600 font-medium">
                      {sellerProducts.map((p) => (
                        <tr key={p.id} className="hover:bg-zinc-50/50 transition-colors">
                          <td className="py-4 pr-4">
                            <div className="flex items-center gap-3">
                              <img src={p.image} alt={p.name} className="w-10 h-10 rounded-xl object-cover border border-zinc-200" />
                              <span className="font-bold text-zinc-950 block">{p.name}</span>
                            </div>
                          </td>
                          <td className="py-4 text-zinc-500 pr-4">{p.category}</td>
                          <td className="py-4 pr-4">
                            <div className="flex items-center gap-0.5 text-amber-500">
                              <Star className="w-3.5 h-3.5 fill-amber-500 stroke-amber-500" />
                              <span className="text-zinc-800 font-bold">{p.rating}</span>
                              <span className="text-zinc-400 text-[10px]">({p.reviewsCount})</span>
                            </div>
                          </td>
                          <td className="py-4 font-mono text-zinc-900 pr-4">₹{p.price}</td>
                          <td className="py-4 pr-4">
                            <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-bold ${
                              p.foodType === "veg" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                            }`}>
                              {p.foodType?.toUpperCase()}
                            </span>
                          </td>
                          <td className="py-4">
                            <button
                              onClick={() => toggleProductAvailability(p.id)}
                              className="text-zinc-400 hover:text-primary transition-colors cursor-pointer"
                              title="Toggle Availability"
                            >
                              {p.isAvailable ? (
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                                  <ToggleRight className="w-6 h-6 text-emerald-600" />
                                  <span>Active</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-zinc-400">
                                  <ToggleLeft className="w-6 h-6 text-zinc-400" />
                                  <span>Disabled</span>
                                </span>
                              )}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* PAGE: INVENTORY */}
          {activeTab === "inventory" && (
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Kitchen Stock levels</span>
                <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Inventory Manager</h1>
              </div>

              {/* Large Inventory editing table */}
              <div className="bg-white border border-zinc-200/80 rounded-card p-5 shadow-soft text-left">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="border-b border-zinc-100 text-zinc-400 uppercase text-[9px] font-bold tracking-wider">
                        <th className="pb-3 pr-4">Dish</th>
                        <th className="pb-3 pr-4">Current Stock</th>
                        <th className="pb-3 pr-4">Stock Status</th>
                        <th className="pb-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50 text-zinc-600 font-medium">
                      {sellerProducts.map((p) => {
                        const lowStock = p.availableQty <= 5;
                        return (
                          <tr key={p.id} className="hover:bg-zinc-50/50 transition-colors">
                            <td className="py-4 pr-4">
                              <span className="font-bold text-zinc-950 block">{p.name}</span>
                              <span className="block text-[10px] text-zinc-400">By {p.chefName}</span>
                            </td>
                            <td className="py-4 font-mono text-zinc-900 pr-4 font-bold">{p.availableQty} items</td>
                            <td className="py-4 pr-4">
                              <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-bold ${
                                lowStock ? "bg-rose-50 text-rose-600" : "bg-emerald-50 text-emerald-600"
                              }`}>
                                <AlertCircle className="w-3.5 h-3.5" />
                                <span>{lowStock ? "Low Stock" : "In Stock"}</span>
                              </span>
                            </td>
                            <td className="py-4">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => updateInventoryQty(p.id, p.availableQty - 1)}
                                  className="p-1 border border-zinc-200 rounded-lg hover:bg-zinc-50"
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => updateInventoryQty(p.id, p.availableQty + 1)}
                                  className="p-1 border border-zinc-200 rounded-lg hover:bg-zinc-50"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* PAGE: ANALYTICS */}
          {activeTab === "analytics" && (
            <div className="space-y-8">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Business Analytics</span>
                <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Performance Reports</h1>
              </div>

              {/* Grid of secondary statistics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Conversion Rate Card */}
                <Card className="rounded-card border border-zinc-200/80 bg-white p-5 shadow-soft text-left space-y-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-zinc-400">Visitor Conversion</span>
                    <Badge variant="veg" className="text-[9px]">Excel</Badge>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-3xl font-bold text-zinc-950 font-mono">18.4%</h3>
                    <p className="text-[11px] text-zinc-400">Weekly conversion from views to checkout orders.</p>
                  </div>
                  
                  {/* Small conversion graph */}
                  <div className="h-10 bg-zinc-50 border border-zinc-100 rounded-lg flex items-end gap-1 p-1">
                    {[10, 20, 15, 30, 45, 25, 40, 50, 45, 60].map((h, i) => (
                      <div key={i} className="flex-1 bg-primary/20 hover:bg-primary rounded-sm transition-colors" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </Card>

                {/* Best Selling Card */}
                <Card className="rounded-card border border-zinc-200/80 bg-white p-5 shadow-soft text-left space-y-4 col-span-1 md:col-span-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-zinc-400">Best Selling Dishes</span>
                    <span className="text-[10px] text-muted">July 2026</span>
                  </div>
                  
                  <div className="space-y-3 text-xs">
                    <div className="space-y-1">
                      <div className="flex justify-between text-zinc-800 font-bold">
                        <span>Chicken Dum Biryani</span>
                        <span>42 Orders (₹7,938)</span>
                      </div>
                      <div className="w-full bg-zinc-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-primary h-full rounded-full" style={{ width: "80%" }} />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-zinc-800 font-bold">
                        <span>Andhra Chicken Pickle</span>
                        <span>15 Orders (₹3,735)</span>
                      </div>
                      <div className="w-full bg-zinc-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-primary h-full rounded-full" style={{ width: "40%" }} />
                      </div>
                    </div>
                  </div>
                </Card>

              </div>
            </div>
          )}

          {/* PAGE: WITHDRAWALS */}
          {activeTab === "withdrawals" && (
            <div className="space-y-8">
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Settlements & Payouts</span>
                  <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Withdrawals</h1>
                </div>
                <button
                  onClick={() => setIsWithdrawOpen(true)}
                  className="flex items-center gap-1 px-3.5 py-2 bg-zinc-950 hover:bg-zinc-900 text-white rounded-xl text-xs font-bold shadow-sm transition-colors cursor-pointer"
                >
                  <DollarSign className="w-4 h-4 text-primary" />
                  <span>Request Withdrawal</span>
                </button>
              </div>

              {/* Payout Table */}
              <div className="bg-white border border-zinc-200/80 rounded-card p-5 shadow-soft text-left">
                <h3 className="font-bold text-sm text-zinc-950 mb-6">Payout Transaction Log</h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="border-b border-zinc-100 text-zinc-400 uppercase text-[9px] font-bold tracking-wider">
                        <th className="pb-3 pr-4">Reference ID</th>
                        <th className="pb-3 pr-4">Payout Date</th>
                        <th className="pb-3 pr-4">Destination Account</th>
                        <th className="pb-3 pr-4 font-mono">Amount</th>
                        <th className="pb-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50 text-zinc-600 font-medium">
                      {payouts.map((pay) => (
                        <tr key={pay.id} className="hover:bg-zinc-50/50 transition-colors">
                          <td className="py-4 font-bold text-zinc-900 pr-4">{pay.id}</td>
                          <td className="py-4 text-zinc-400 pr-4">{pay.date}</td>
                          <td className="py-4 pr-4">{pay.account}</td>
                          <td className="py-4 font-mono text-zinc-900 pr-4">₹{pay.amount}</td>
                          <td className="py-4">
                            <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-bold ${
                              pay.status === "settled" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600 animate-pulse"
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${
                                pay.status === "settled" ? "bg-emerald-500" : "bg-amber-500"
                              }`} />
                              <span className="capitalize">{pay.status}</span>
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* PAGE: COUPONS */}
          {activeTab === "coupons" && (
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Promotional Offers</span>
                <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Active Coupons</h1>
              </div>

              {/* Form & List */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-xs text-left">
                
                {/* List Column */}
                <div className="lg:col-span-8 bg-white border border-zinc-200/80 rounded-card p-5 shadow-soft space-y-4">
                  <h3 className="font-bold text-sm text-zinc-950">Active Promo Codes</h3>
                  
                  <div className="divide-y divide-zinc-100 text-xs">
                    {coupons.map((c) => (
                      <div key={c.code} className="py-3.5 flex justify-between items-center">
                        <div className="space-y-1 text-left">
                          <span className="text-[10px] font-bold text-primary uppercase bg-light-orange/40 px-2.5 py-0.5 rounded shadow-sm border border-primary/10">
                            {c.code}
                          </span>
                          <p className="font-bold text-zinc-950 text-sm mt-1">
                            {c.type === "percentage" ? `${c.value}% OFF` : `₹${c.value} OFF`}
                          </p>
                          <p className="text-[10px] text-zinc-400">Minimum Order: ₹{c.minOrder}</p>
                        </div>
                        <Badge variant="veg" className="text-[9px]">Active</Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Create Column */}
                <div className="lg:col-span-4 bg-white border border-zinc-200/80 rounded-card p-5 shadow-soft">
                  <form onSubmit={handleCreateCoupon} className="space-y-4 text-xs">
                    <h3 className="font-bold text-sm text-zinc-950">Create Promo Code</h3>
                    
                    <div className="space-y-1 text-left">
                      <label className="font-semibold text-zinc-500">Coupon Code</label>
                      <Input
                        type="text"
                        placeholder="e.g. MONSOON30"
                        value={newCouponCode}
                        onChange={(e) => setNewCouponCode(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-1 text-left">
                      <label className="font-semibold text-zinc-500">Discount Type</label>
                      <select
                        value={newCouponType}
                        onChange={(e) => setNewCouponType(e.target.value as any)}
                        className="w-full bg-white border border-zinc-200 text-zinc-800 px-3 py-2.5 rounded-2xl text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary shadow-sm"
                      >
                        <option value="flat">Flat Discount (₹)</option>
                        <option value="percentage">Percentage Discount (%)</option>
                      </select>
                    </div>

                    <div className="space-y-1 text-left">
                      <label className="font-semibold text-zinc-500">Discount Value</label>
                      <Input
                        type="number"
                        placeholder="e.g. 50"
                        value={newCouponVal}
                        onChange={(e) => setNewCouponVal(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-1 text-left">
                      <label className="font-semibold text-zinc-500">Min Order Requirement</label>
                      <Input
                        type="number"
                        placeholder="e.g. 249"
                        value={newCouponMin}
                        onChange={(e) => setNewCouponMin(e.target.value)}
                        required
                      />
                    </div>

                    <Button type="submit" variant="primary" className="w-full font-bold py-2.5 shadow-soft flex items-center justify-center gap-1">
                      <Plus className="w-4 h-4" />
                      <span>Create Coupon</span>
                    </Button>
                  </form>
                </div>

              </div>
            </div>
          )}

          {/* PAGE: REVIEWS */}
          {activeTab === "reviews" && (
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Customer Feedback</span>
                <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Reviews</h1>
              </div>

              {/* Reviews grid list */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                {reviews.map((rev) => (
                  <Card key={rev.id} className="p-5 border border-zinc-200 bg-white rounded-card shadow-soft space-y-3.5">
                    <div className="flex justify-between items-center">
                      <div className="space-y-0.5">
                        <h4 className="font-bold text-sm text-zinc-950">{rev.dishName}</h4>
                        <p className="text-[10px] text-zinc-400">Reviewed by {rev.customerName} on {rev.date}</p>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-lg bg-amber-50 text-amber-600 border border-amber-100 text-[10px] font-bold flex items-center gap-0.5">
                        <Star className="w-3.5 h-3.5 fill-amber-500 stroke-amber-500" />
                        <span>{rev.rating}.0</span>
                      </span>
                    </div>
                    <p className="text-xs text-zinc-600 italic">"{rev.comment}"</p>

                    {rev.reply ? (
                      <div className="p-3 bg-light-orange/30 border border-light-orange/40 rounded-xl text-[11px] text-secondary-orange">
                        <strong>Reply Response:</strong> {rev.reply}
                      </div>
                    ) : (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          const val = (e.target as any).elements.replyInput.value;
                          if (val) {
                            handleReviewReply(rev.id, val);
                            (e.target as any).reset();
                          }
                        }}
                        className="flex gap-2 text-xs"
                      >
                        <input
                          name="replyInput"
                          placeholder="Reply to customer review..."
                          className="flex-grow px-3 py-1.5 border border-zinc-200 rounded-xl text-xs focus:outline-none"
                          required
                        />
                        <button
                          type="submit"
                          className="px-3.5 py-1.5 bg-zinc-900 text-white rounded-xl text-xs font-semibold cursor-pointer"
                        >
                          Reply
                        </button>
                      </form>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* PAGE: SETTINGS */}
          {activeTab === "settings" && (
            <div className="space-y-6 max-w-xl text-left">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Portal configuration</span>
                <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Shop Settings</h1>
              </div>

              {/* Form card */}
              <Card className="rounded-card border border-zinc-200 bg-white p-6 shadow-soft space-y-6 text-xs text-secondary-text">
                <div className="space-y-3.5">
                  <h3 className="font-bold text-sm text-zinc-950">Store Specifications</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-semibold">Kitchen Name</label>
                      <Input type="text" defaultValue="Mom's Kitchen" />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold">FSSAI Registration ID</label>
                      <Input type="text" defaultValue="FSSAI-482910-HYD" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold">Cooking Address</label>
                    <Input type="text" defaultValue="Flat 402, Sunshine Heights, Gachibowli, Hyderabad" />
                  </div>
                </div>

                <div className="space-y-3.5 border-t border-zinc-100 pt-5">
                  <h3 className="font-bold text-sm text-zinc-950">Active Hours</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-semibold">Opening Time</label>
                      <Input type="time" defaultValue="11:00" />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold">Closing Time</label>
                      <Input type="time" defaultValue="22:00" />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-100 flex justify-end gap-3">
                  <Button variant="secondary" className="py-2.5 font-bold shadow-sm">Reset</Button>
                  <Button variant="primary" className="py-2.5 font-bold shadow-soft px-6">Save Settings</Button>
                </div>
              </Card>
            </div>
          )}

        </div>
      </div>

      {/* ADD PRODUCT MODAL */}
      <AnimatePresence>
        {isAddProductOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddProductOpen(false)}
              className="fixed inset-0 bg-black z-50 animate-none"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="fixed inset-x-4 top-[10%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[480px] bg-white rounded-card shadow-soft-lg z-5 z-50 overflow-hidden text-left"
            >
              <div className="p-5 border-b border-zinc-100 flex items-center justify-between">
                <h3 className="font-bold text-sm text-zinc-950 flex items-center gap-1.5">
                  <Package className="w-5 h-5 text-primary" />
                  <span>Add New Product</span>
                </h3>
                <button onClick={() => setIsAddProductOpen(false)} className="p-1.5 border border-zinc-200 rounded-lg hover:bg-zinc-50 cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddProduct} className="p-6 space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-500">Dish Name</label>
                  <Input
                    type="text"
                    placeholder="e.g. Gongura Chicken Curry"
                    value={prodName}
                    onChange={(e) => setProdName(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-semibold text-zinc-500">Category</label>
                    <select
                      value={prodCategory}
                      onChange={(e) => setProdCategory(e.target.value)}
                      className="w-full bg-white border border-zinc-200 text-zinc-800 px-3 py-2.5 rounded-2xl text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary shadow-sm"
                    >
                      <option value="Biryani">Biryani</option>
                      <option value="Thalis">Thalis</option>
                      <option value="Curries">Curries</option>
                      <option value="Pickles">Pickles</option>
                      <option value="Sweets">Sweets</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-zinc-500">Food Diet Type</label>
                    <select
                      value={prodType}
                      onChange={(e) => setProdType(e.target.value as any)}
                      className="w-full bg-white border border-zinc-200 text-zinc-800 px-3 py-2.5 rounded-2xl text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary shadow-sm"
                    >
                      <option value="veg">Veg</option>
                      <option value="non-veg">Non-Veg</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-zinc-500">Product Price (₹)</label>
                  <Input
                    type="number"
                    placeholder="e.g. 199"
                    value={prodPrice}
                    onChange={(e) => setProdPrice(e.target.value)}
                    required
                  />
                </div>

                <div className="bg-zinc-50 border border-zinc-100 p-3 rounded-2xl flex gap-2 text-[10px] text-zinc-500 leading-relaxed">
                  <Info className="w-4 h-4 flex-shrink-0 mt-0.5 text-primary" />
                  <span>
                    Newly created products will immediately launch under the "Mom's Kitchen" storefront listings in active menus.
                  </span>
                </div>

                <Button type="submit" variant="primary" className="w-full font-bold py-2.5 shadow-soft">
                  Publish Product Listing
                </Button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* WITHDRAW MODAL */}
      <AnimatePresence>
        {isWithdrawOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsWithdrawOpen(false)}
              className="fixed inset-0 bg-black z-50 animate-none"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="fixed inset-x-4 top-[15%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[420px] bg-white rounded-card shadow-soft-lg z-5 z-50 overflow-hidden text-left"
            >
              <div className="p-5 border-b border-zinc-100 flex items-center justify-between">
                <h3 className="font-bold text-sm text-zinc-950 flex items-center gap-1.5">
                  <DollarSign className="w-5 h-5 text-primary" />
                  <span>Request Withdrawal</span>
                </h3>
                <button onClick={() => setIsWithdrawOpen(false)} className="p-1.5 border border-zinc-200 rounded-lg hover:bg-zinc-50 cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleWithdrawalRequest} className="p-6 space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-500">Available Balance: <strong className="text-zinc-900 font-mono">₹8,450</strong></label>
                  <Input
                    type="number"
                    placeholder="Enter amount to withdraw (₹)"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    max={8450}
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-zinc-500">Destination Account</label>
                  <Input
                    type="text"
                    value="UPI Settlement ID: ritu@oksbi"
                    disabled
                  />
                </div>

                <div className="bg-zinc-50 border border-zinc-100 p-3 rounded-2xl flex gap-2 text-[10px] text-zinc-500 leading-relaxed">
                  <Info className="w-4 h-4 flex-shrink-0 mt-0.5 text-primary" />
                  <span>
                    Payout requests are cleared within 24 hours. No additional processing fee is levied on kitchen withdrawals.
                  </span>
                </div>

                <Button type="submit" variant="primary" className="w-full font-bold py-2.5 shadow-soft">
                  Confirm Payout Request
                </Button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}

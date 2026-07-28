"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users as UsersIcon,
  ChefHat,
  Truck,
  Package,
  FolderTree,
  ShoppingBag,
  TrendingUp,
  FileBarChart2,
  FileText,
  Settings as SettingsIcon,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  Plus,
  Trash2,
  Info,
  DollarSign,
  ShieldAlert,
  Edit,
  Save,
  Menu,
  X,
  Phone,
  Check,
  Ban
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { products, chefs, Product } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";

type AdminTabType =
  | "overview"
  | "users"
  | "chefs"
  | "riders"
  | "products"
  | "categories"
  | "orders"
  | "revenue"
  | "reports"
  | "cms"
  | "settings";

interface TimelineEvent {
  id: string;
  time: string;
  title: string;
  desc: string;
  type: "success" | "warning" | "info";
}

interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: "active" | "suspended";
  joinDate: string;
}

interface DeliveryPartner {
  id: string;
  name: string;
  phone: string;
  vehicle: string;
  status: "idle" | "delivering" | "offline";
  rating: number;
}

interface GlobalOrder {
  id: string;
  chef: string;
  customer: string;
  rider: string;
  total: number;
  status: "placed" | "preparing" | "out-for-delivery" | "delivered" | "cancelled";
  date: string;
}

export default function AdminDashboard() {
  const { logout } = useAuth();
  
  const [activeTab, setActiveTab] = useState<AdminTabType>("overview");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Settings form states
  const [commissionRate, setCommissionRate] = useState("10");
  const [baseDeliveryCharge, setBaseDeliveryCharge] = useState("30");
  const [taxRate, setTaxRate] = useState("5");
  const [settingsAlert, setSettingsAlert] = useState("");

  // CMS state
  const [announcementText, setAnnouncementText] = useState("Flat ₹50 OFF on first 3 orders! Use Code: GHARCHEF50");
  const [cmsAlert, setCmsAlert] = useState("");

  // Category State
  const [adminCategories, setAdminCategories] = useState([
    { id: "cat-1", name: "Biryani", count: 8 },
    { id: "cat-2", name: "Pickles", count: 4 },
    { id: "cat-3", name: "Curries", count: 12 },
    { id: "cat-4", name: "Sweets", count: 6 }
  ]);
  const [newCatName, setNewCatName] = useState("");

  // Timeline events logs
  const [timeline, setTimeline] = useState<TimelineEvent[]>([
    { id: "evt-1", time: "10 mins ago", title: "New Chef Onboarded", desc: "Swathi Kitchen registered for FSSAI verification inspection.", type: "info" },
    { id: "evt-2", time: "25 mins ago", title: "Refund Request Initiated", desc: "Order GC-187263 refund initiated by support team.", type: "warning" },
    { id: "evt-3", time: "1 hour ago", title: "Rider Verification Approved", desc: "Delivery partner Amit KYC details approved by operations.", type: "success" },
    { id: "evt-4", time: "3 hours ago", title: "Commission Payout Settled", desc: "Platform commission balance settled for Mom's Kitchen kitchen.", type: "success" }
  ]);

  // System Users
  const [usersList, setUsersList] = useState<AdminUser[]>([
    { id: "usr-1", name: "Priya Sharma", email: "priya@gmail.com", phone: "+91 98765 43210", role: "customer", status: "active", joinDate: "05 May 2026" },
    { id: "usr-2", name: "Rahul Kumar", email: "rahul@gmail.com", phone: "+91 87654 32109", role: "customer", status: "active", joinDate: "12 May 2026" },
    { id: "usr-3", name: "Swathi Reddy", email: "swathi@gharchef.com", phone: "+91 76543 21098", role: "chef", status: "active", joinDate: "20 June 2026" },
    { id: "usr-4", name: "Amit Singh", email: "amit@gmail.com", phone: "+91 65432 10987", role: "rider", status: "active", joinDate: "01 July 2026" },
    { id: "usr-5", name: "Vikram Sen", email: "vikram@gmail.com", phone: "+91 54321 09876", role: "customer", status: "suspended", joinDate: "04 July 2026" }
  ]);

  // Verified Chefs
  const [chefsList, setChefsList] = useState([
    { id: "chef-1", name: "Mom's Kitchen", owner: "Ritu Verma", fssai: "FSSAI-482910-HYD", verified: true, rating: 4.8 },
    { id: "chef-2", name: "Swathi Kitchen", owner: "Swathi Reddy", fssai: "FSSAI-187263-HYD", verified: false, rating: 4.5 },
    { id: "chef-3", name: "Auntie's Curry", owner: "Kavitha R.", fssai: "FSSAI-298174-HYD", verified: true, rating: 4.7 }
  ]);

  // Riders
  const [ridersList, setRidersList] = useState<DeliveryPartner[]>([
    { id: "rid-1", name: "Amit Singh", phone: "+91 65432 10987", vehicle: "Honda Activa (TS-08-EK-1928)", status: "idle", rating: 4.9 },
    { id: "rid-2", name: "Ramesh Naik", phone: "+91 99123 44556", vehicle: "Hero Splendor (TS-09-FB-4819)", status: "delivering", rating: 4.7 },
    { id: "rid-3", name: "Suresh G.", phone: "+91 88124 55667", vehicle: "Suzuki Access (TS-07-HJ-2918)", status: "offline", rating: 4.5 }
  ]);

  // Global Orders list
  const [ordersList, setOrdersList] = useState<GlobalOrder[]>([
    { id: "GC-482910", chef: "Mom's Kitchen", customer: "Priya Sharma", rider: "Ramesh Naik", total: 318, status: "preparing", date: "13 July 2026" },
    { id: "GC-298174", chef: "Swathi Kitchen", customer: "Rahul Kumar", rider: "Amit Singh", total: 198, status: "out-for-delivery", date: "12 July 2026" },
    { id: "GC-187263", chef: "Auntie's Curry", customer: "Anjali Reddy", rider: "Ramesh Naik", total: 219, status: "delivered", date: "10 July 2026" },
    { id: "GC-092817", chef: "Mom's Kitchen", customer: "Vikram Sen", rider: "None", total: 159, status: "cancelled", date: "09 July 2026" }
  ]);

  // Payout / commission calculations
  const totalSales = ordersList.filter(o => o.status !== "cancelled").reduce((acc, curr) => acc + curr.total, 0);
  const platformRevenue = Math.round(totalSales * (Number(commissionRate) / 100));

  // Handlers
  const handleSettingsSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsAlert("System parameters updated successfully!");
    setTimeout(() => setSettingsAlert(""), 4000);
  };

  const handleCmsSave = (e: React.FormEvent) => {
    e.preventDefault();
    setCmsAlert("Homepage announcement marquee updated successfully!");
    setTimeout(() => setCmsAlert(""), 4000);
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName) return;
    const newCat = {
      id: "cat-" + Date.now(),
      name: newCatName,
      count: 0
    };
    setAdminCategories([...adminCategories, newCat]);
    setNewCatName("");
  };

  const handleDeleteCategory = (id: string) => {
    setAdminCategories(adminCategories.filter(c => c.id !== id));
  };

  const handleChefVerification = (id: string) => {
    setChefsList(
      chefsList.map(c => c.id === id ? { ...c, verified: !c.verified } : c)
    );
  };

  const handleUserStatusToggle = (id: string) => {
    setUsersList(
      usersList.map(u => u.id === id ? { ...u, status: u.status === "active" ? "suspended" : "active" } : u)
    );
  };

  const sidebarLinks = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "users", label: "Users Accounts", icon: UsersIcon },
    { id: "chefs", label: "Home Chefs", icon: ChefHat, badge: chefsList.filter(c => !c.verified).length },
    { id: "riders", label: "Riders Team", icon: Truck },
    { id: "products", label: "Food Catalog", icon: Package },
    { id: "categories", label: "Menu Categories", icon: FolderTree },
    { id: "orders", label: "Global Orders", icon: ShoppingBag },
    { id: "revenue", label: "Revenue Settlements", icon: DollarSign },
    { id: "reports", label: "System Reports", icon: FileBarChart2 },
    { id: "cms", label: "CMS Controls", icon: FileText },
    { id: "settings", label: "Global Settings", icon: SettingsIcon }
  ];

  return (
    <div className="min-h-screen w-full flex bg-[#F6F7FA] text-zinc-800 antialiased font-sans">
      
      {/* LEFT SIDEBAR PANEL (Premium Corporate dark layout with Orange Highlights) */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-zinc-900 text-zinc-400 border-r border-zinc-850 p-5 justify-between">
        <div className="space-y-6 text-left">
          
          {/* Logo brand */}
          <Link href="/" className="flex items-center gap-2.5 px-1">
            <div className="w-8.5 h-8.5 rounded-xl bg-primary flex items-center justify-center text-white shadow-md">
              <ChefHat className="w-5 h-5 stroke-[1.8]" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              Ghar<span className="text-primary font-bold">Chef</span>
            </span>
          </Link>

          {/* Quick Info */}
          <div className="bg-zinc-850 border border-zinc-800 rounded-xl p-3 flex gap-2 items-center">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center font-bold text-white text-xs">
              A
            </div>
            <div className="min-w-0">
              <span className="block text-xs font-bold text-zinc-100 truncate">Platform Administrator</span>
              <span className="block text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Gachibowli Hub</span>
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
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                    isActive
                      ? "bg-primary text-white shadow-sm"
                      : "bg-transparent text-zinc-400 hover:bg-zinc-850/60 hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </span>
                  {link.badge && link.badge > 0 ? (
                    <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold ${
                      isActive ? "bg-white text-primary" : "bg-primary text-white"
                    }`}>
                      {link.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom links */}
        <div className="pt-6 border-t border-zinc-800 space-y-3.5 text-left">
          <Link href="/" className="block text-[11px] font-semibold text-zinc-500 hover:text-zinc-300">
            Platform Home
          </Link>
          <button onClick={logout} className="block text-[11px] font-bold text-rose-500/80 hover:text-rose-400 cursor-pointer">
            Logout Admin
          </button>
        </div>
      </aside>

      {/* MOBILE HEADER & DRAWER NAV */}
      <div className="flex flex-col flex-1 w-full min-w-0 overflow-y-auto">
        <header className="lg:hidden w-full bg-zinc-900 border-b border-zinc-800 px-4 py-4 flex items-center justify-between z-30">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center text-white">
              <ChefHat className="w-4 h-4" />
            </div>
            <span className="text-base font-bold text-white">GharChef Admin</span>
          </Link>
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="p-1.5 border border-zinc-800 rounded-lg text-white"
          >
            {isMobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </header>

        <AnimatePresence>
          {isMobileOpen && (
            <>
              <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setIsMobileOpen(false)} />
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "tween", duration: 0.25 }}
                className="fixed left-0 top-0 bottom-0 w-64 bg-zinc-900 shadow-lg z-40 p-5 flex flex-col justify-between text-left lg:hidden"
              >
                <div className="space-y-6">
                  <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
                    <span className="font-bold text-sm text-white">Admin Controls</span>
                    <button onClick={() => setIsMobileOpen(false)} className="p-1 border border-zinc-800 rounded-lg text-white">
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
                            setIsMobileOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                            isActive ? "bg-primary text-white" : "bg-transparent text-zinc-400 hover:text-white"
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
                <button onClick={logout} className="text-rose-500 font-bold text-xs pt-4 border-t border-zinc-800 w-full text-left">
                  Logout Admin
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* MAIN PANEL CONTENT */}
        <div className="flex-1 px-4 md:px-10 py-8 text-left space-y-8">
          
          {/* Settings / General success banner */}
          {settingsAlert && (
            <div className="p-3 bg-emerald-50 border border-emerald-100 text-xs text-emerald-700 font-semibold rounded-xl flex items-center gap-1.5 max-w-xl shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{settingsAlert}</span>
            </div>
          )}

          {/* PAGE: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Platform Administration</span>
                <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">System Overview</h1>
              </div>

              {/* Statistics Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                <Card className="rounded-card border border-zinc-200 bg-white p-5 shadow-soft">
                  <CardContent className="p-0 space-y-1 text-left">
                    <span className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Platform GMV</span>
                    <h3 className="text-2xl font-bold text-zinc-900 tracking-tight">₹{totalSales}</h3>
                    <p className="text-[10px] text-zinc-400">Gross sales volume processed</p>
                  </CardContent>
                </Card>

                <Card className="rounded-card border border-zinc-200 bg-white p-5 shadow-soft">
                  <CardContent className="p-0 space-y-1 text-left">
                    <span className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Commission Income</span>
                    <h3 className="text-2xl font-bold text-zinc-900 tracking-tight">₹{platformRevenue}</h3>
                    <p className="text-[10px] text-zinc-400">At {commissionRate}% commission rate</p>
                  </CardContent>
                </Card>

                <Card className="rounded-card border border-zinc-200 bg-white p-5 shadow-soft">
                  <CardContent className="p-0 space-y-1 text-left">
                    <span className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Verified Kitchens</span>
                    <h3 className="text-2xl font-bold text-zinc-900 tracking-tight">
                      {chefsList.filter(c => c.verified).length} / {chefsList.length}
                    </h3>
                    <p className="text-[10px] text-zinc-400">Inspected Home Chef counters</p>
                  </CardContent>
                </Card>

                <Card className="rounded-card border border-zinc-200 bg-white p-5 shadow-soft">
                  <CardContent className="p-0 space-y-1 text-left">
                    <span className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Active Riders</span>
                    <h3 className="text-2xl font-bold text-zinc-900 tracking-tight">
                      {ridersList.filter(r => r.status !== "offline").length}
                    </h3>
                    <p className="text-[10px] text-zinc-400">Delivery partners ready to pick</p>
                  </CardContent>
                </Card>
              </div>

              {/* Chart & Timeline Row */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* SVG double bar chart showing sales vs commissions */}
                <div className="lg:col-span-8 bg-white border border-zinc-200 rounded-card p-5 shadow-soft space-y-6">
                  <div className="flex justify-between items-center border-b border-zinc-100 pb-3">
                    <h3 className="font-bold text-sm text-zinc-900">Platform Commission vs GMV</h3>
                    <span className="text-[10px] text-zinc-400 font-bold uppercase">Weekly metrics</span>
                  </div>

                  {/* SVG Bar Chart */}
                  <div className="w-full h-48 bg-zinc-50/50 rounded-xl border border-zinc-100 flex items-end relative overflow-hidden px-6 pt-4">
                    <svg className="w-full h-[85%] overflow-visible" viewBox="0 0 600 100" preserveAspectRatio="none">
                      {/* GMV bars */}
                      {[15, 30, 25, 45, 60, 50, 75].map((h, idx) => (
                        <g key={idx}>
                          {/* Sales bar */}
                          <rect x={20 + idx * 80} y={100 - h} width="16" height={h} fill="#FC8019" opacity="0.8" rx="2" />
                          {/* Comm bar */}
                          <rect x={38 + idx * 80} y={100 - (h * 0.15)} width="16" height={h * 0.15} fill="#18181B" opacity="0.6" rx="2" />
                        </g>
                      ))}
                    </svg>

                    <div className="absolute bottom-2 left-0 right-0 flex justify-between px-10 text-[9px] font-bold text-zinc-400">
                      <span>Mon</span>
                      <span>Tue</span>
                      <span>Wed</span>
                      <span>Thu</span>
                      <span>Fri</span>
                      <span>Sat</span>
                      <span>Sun</span>
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="flex gap-4 text-[10px] text-secondary-text font-semibold justify-center">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 bg-primary rounded" />
                      <span>Gross Sales (GMV)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 bg-zinc-900 rounded" />
                      <span>Platform Income</span>
                    </div>
                  </div>
                </div>

                {/* Activity Timeline Log */}
                <div className="lg:col-span-4 bg-white border border-zinc-200 rounded-card p-5 shadow-soft text-left space-y-4">
                  <h3 className="font-bold text-sm text-zinc-900 border-b border-zinc-100 pb-3">Activity Timeline</h3>
                  
                  <div className="space-y-4">
                    {timeline.map((evt) => (
                      <div key={evt.id} className="flex gap-3 text-xs">
                        <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                          evt.type === "success" ? "bg-emerald-500" : evt.type === "warning" ? "bg-amber-500" : "bg-blue-500"
                        }`} />
                        <div className="space-y-0.5 min-w-0">
                          <div className="flex justify-between items-center gap-2">
                            <h5 className="font-bold text-zinc-900 truncate">{evt.title}</h5>
                            <span className="text-[9px] text-muted flex-shrink-0">{evt.time}</span>
                          </div>
                          <p className="text-[10px] text-secondary-text leading-relaxed">{evt.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* PAGE: USERS */}
          {activeTab === "users" && (
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Authentication Logs</span>
                <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Users Accounts</h1>
              </div>

              {/* Large Users Table */}
              <div className="bg-white border border-zinc-200 rounded-card p-5 shadow-soft text-left">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="border-b border-zinc-100 text-zinc-400 uppercase text-[9px] font-bold tracking-wider">
                        <th className="pb-3 pr-4">User</th>
                        <th className="pb-3 pr-4">Phone</th>
                        <th className="pb-3 pr-4">Role</th>
                        <th className="pb-3 pr-4">Signup Date</th>
                        <th className="pb-3 pr-4">Status</th>
                        <th className="pb-3">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50 text-zinc-600 font-medium">
                      {usersList.map((usr) => (
                        <tr key={usr.id} className="hover:bg-zinc-50/50 transition-colors">
                          <td className="py-4 pr-4">
                            <span className="font-bold text-zinc-900 block">{usr.name}</span>
                            <span className="text-[10px] text-zinc-400 block">{usr.email}</span>
                          </td>
                          <td className="py-4 pr-4">{usr.phone}</td>
                          <td className="py-4 pr-4 capitalize">{usr.role}</td>
                          <td className="py-4 pr-4 text-zinc-400">{usr.joinDate}</td>
                          <td className="py-4 pr-4">
                            <Badge variant={usr.status === "active" ? "veg" : "outline"} className="text-[9px] py-0 font-bold">
                              {usr.status}
                            </Badge>
                          </td>
                          <td className="py-4">
                            <button
                              onClick={() => handleUserStatusToggle(usr.id)}
                              className={`px-2 py-1 rounded-lg text-[10px] font-bold border transition-colors cursor-pointer ${
                                usr.status === "active"
                                  ? "border-rose-200 text-rose-600 hover:bg-rose-50"
                                  : "border-emerald-200 text-emerald-600 hover:bg-emerald-50"
                              }`}
                            >
                              {usr.status === "active" ? "Suspend" : "Activate"}
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

          {/* PAGE: HOME CHEFS */}
          {activeTab === "chefs" && (
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Home Kitchen Onboarding</span>
                <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Home Chefs</h1>
              </div>

              {/* Large Chefs Table */}
              <div className="bg-white border border-zinc-200 rounded-card p-5 shadow-soft text-left">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="border-b border-zinc-100 text-zinc-400 uppercase text-[9px] font-bold tracking-wider">
                        <th className="pb-3 pr-4">Kitchen</th>
                        <th className="pb-3 pr-4">Owner</th>
                        <th className="pb-3 pr-4">FSSAI ID</th>
                        <th className="pb-3 pr-4">Rating</th>
                        <th className="pb-3 pr-4">Verification</th>
                        <th className="pb-3">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50 text-zinc-600 font-medium">
                      {chefsList.map((cf) => (
                        <tr key={cf.id} className="hover:bg-zinc-50/50 transition-colors">
                          <td className="py-4 font-bold text-zinc-900 pr-4">{cf.name}</td>
                          <td className="py-4 text-zinc-500 pr-4">{cf.owner}</td>
                          <td className="py-4 text-zinc-500 pr-4 font-mono">{cf.fssai}</td>
                          <td className="py-4 text-zinc-900 pr-4 font-bold">{cf.rating} / 5.0</td>
                          <td className="py-4 pr-4">
                            <Badge variant={cf.verified ? "veg" : "primary"} className="text-[9px] py-0 font-bold">
                              {cf.verified ? "Approved" : "Pending Audit"}
                            </Badge>
                          </td>
                          <td className="py-4">
                            <button
                              onClick={() => handleChefVerification(cf.id)}
                              className="px-2.5 py-1 border border-zinc-200 hover:border-primary/20 hover:text-primary rounded-lg text-[10px] font-semibold transition-colors cursor-pointer"
                            >
                              {cf.verified ? "Revoke Verification" : "Verify Kitchen"}
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

          {/* PAGE: DELIVERY PARTNERS */}
          {activeTab === "riders" && (
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Platform Logistics</span>
                <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Delivery Riders</h1>
              </div>

              {/* Riders table */}
              <div className="bg-white border border-zinc-200 rounded-card p-5 shadow-soft text-left">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="border-b border-zinc-100 text-zinc-400 uppercase text-[9px] font-bold tracking-wider">
                        <th className="pb-3 pr-4">Rider</th>
                        <th className="pb-3 pr-4">Phone</th>
                        <th className="pb-3 pr-4">Vehicle Details</th>
                        <th className="pb-3 pr-4">Status</th>
                        <th className="pb-3 text-right">Rating</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50 text-zinc-600 font-medium">
                      {ridersList.map((rd) => (
                        <tr key={rd.id} className="hover:bg-zinc-50/50 transition-colors">
                          <td className="py-4 font-bold text-zinc-900 pr-4">{rd.name}</td>
                          <td className="py-4 text-zinc-500 pr-4">{rd.phone}</td>
                          <td className="py-4 text-zinc-500 pr-4">{rd.vehicle}</td>
                          <td className="py-4 pr-4">
                            <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-bold ${
                              rd.status === "delivering"
                                ? "bg-amber-50 text-amber-600"
                                : rd.status === "idle"
                                  ? "bg-emerald-50 text-emerald-600"
                                  : "bg-zinc-100 text-zinc-400"
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${
                                rd.status === "delivering" ? "bg-amber-500" : rd.status === "idle" ? "bg-emerald-500" : "bg-zinc-400"
                              }`} />
                              <span className="capitalize">{rd.status}</span>
                            </span>
                          </td>
                          <td className="py-4 text-right font-bold text-zinc-900 pr-2">{rd.rating} ★</td>
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
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Global Meal Index</span>
                <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Platform Catalog</h1>
              </div>

              {/* Products Table */}
              <div className="bg-white border border-zinc-200 rounded-card p-5 shadow-soft text-left">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="border-b border-zinc-100 text-zinc-400 uppercase text-[9px] font-bold tracking-wider">
                        <th className="pb-3 pr-4">Dish</th>
                        <th className="pb-3 pr-4">Home Chef</th>
                        <th className="pb-3 pr-4 font-mono">Price</th>
                        <th className="pb-3 pr-4">Spice</th>
                        <th className="pb-3 pr-4">Diet Type</th>
                        <th className="pb-3">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50 text-zinc-600 font-medium">
                      {products.slice(0, 6).map((p) => (
                        <tr key={p.id} className="hover:bg-zinc-50/50 transition-colors">
                          <td className="py-4 pr-4">
                            <div className="flex items-center gap-3">
                              <img src={p.image} alt={p.name} className="w-10 h-10 rounded-xl object-cover" />
                              <span className="font-bold text-zinc-950 block">{p.name}</span>
                            </div>
                          </td>
                          <td className="py-4 text-zinc-500 pr-4">{p.chefName}</td>
                          <td className="py-4 font-mono text-zinc-900 pr-4">₹{p.price}</td>
                          <td className="py-4 pr-4 capitalize">{p.spiceLevel}</td>
                          <td className="py-4 pr-4 capitalize">{p.foodType}</td>
                          <td className="py-4">
                            <button className="px-2 py-1 border border-rose-200 hover:bg-rose-50 text-[10px] font-bold text-rose-600 rounded-lg cursor-pointer">
                              Flag Dish
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

          {/* PAGE: CATEGORIES */}
          {activeTab === "categories" && (
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Catalog structure</span>
                <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Menu Categories</h1>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-xs text-left">
                
                {/* List Categories */}
                <div className="lg:col-span-8 bg-white border border-zinc-200 rounded-card p-5 shadow-soft space-y-4">
                  <h3 className="font-bold text-sm text-zinc-900">Active Menu Sections</h3>
                  <div className="divide-y divide-zinc-100">
                    {adminCategories.map((c) => (
                      <div key={c.id} className="py-3.5 flex justify-between items-center">
                        <span className="font-bold text-zinc-950 text-sm">{c.name}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-[10px] text-zinc-400 font-bold uppercase">{c.count} Items</span>
                          <button
                            onClick={() => handleDeleteCategory(c.id)}
                            className="text-muted hover:text-danger cursor-pointer transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Create Category */}
                <div className="lg:col-span-4 bg-white border border-zinc-200 rounded-card p-5 shadow-soft">
                  <form onSubmit={handleAddCategory} className="space-y-4">
                    <h3 className="font-bold text-sm text-zinc-900">Add Category</h3>
                    <div className="space-y-1">
                      <label className="font-semibold text-zinc-500">Category Name</label>
                      <Input
                        type="text"
                        placeholder="e.g. Healthy Meals"
                        value={newCatName}
                        onChange={(e) => setNewCatName(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" variant="primary" className="w-full font-bold py-2.5 shadow-soft flex items-center justify-center gap-1">
                      <Plus className="w-4 h-4" />
                      <span>Save Section</span>
                    </Button>
                  </form>
                </div>

              </div>
            </div>
          )}

          {/* PAGE: ORDERS */}
          {activeTab === "orders" && (
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Global Transactions</span>
                <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Global Orders</h1>
              </div>

              {/* Global Table */}
              <div className="bg-white border border-zinc-200 rounded-card p-5 shadow-soft text-left">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="border-b border-zinc-100 text-zinc-400 uppercase text-[9px] font-bold tracking-wider">
                        <th className="pb-3 pr-4">Order ID</th>
                        <th className="pb-3 pr-4">Chef Partner</th>
                        <th className="pb-3 pr-4">Customer</th>
                        <th className="pb-3 pr-4">Delivery Rider</th>
                        <th className="pb-3 pr-4 font-mono">Total</th>
                        <th className="pb-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50 text-zinc-600 font-medium">
                      {ordersList.map((o) => (
                        <tr key={o.id} className="hover:bg-zinc-50/50 transition-colors">
                          <td className="py-4 font-bold text-zinc-950 pr-4">{o.id}</td>
                          <td className="py-4 text-zinc-500 pr-4">{o.chef}</td>
                          <td className="py-4 text-zinc-500 pr-4">{o.customer}</td>
                          <td className="py-4 text-zinc-500 pr-4">{o.rider}</td>
                          <td className="py-4 font-mono text-zinc-950 pr-4 font-bold">₹{o.total}</td>
                          <td className="py-4">
                            <Badge variant={
                              o.status === "delivered" ? "veg" : o.status === "cancelled" ? "outline" : "primary"
                            } className="text-[9px] py-0 uppercase">
                              {o.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* PAGE: REVENUE */}
          {activeTab === "revenue" && (
            <div className="space-y-6 text-left">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Financial Settlements</span>
                <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Settlement Revenue</h1>
              </div>

              {/* Commission setup */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="rounded-card border border-zinc-200 bg-white p-5 shadow-soft space-y-4">
                  <h3 className="font-bold text-sm text-zinc-900 border-b border-zinc-100 pb-3">Financial Calculations</h3>
                  
                  <div className="space-y-2.5 text-xs text-secondary-text">
                    <div className="flex justify-between">
                      <span>Total Platform Sales Volume</span>
                      <span className="font-bold text-zinc-900">₹{totalSales}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Platform Commission Rate</span>
                      <span className="font-bold text-zinc-900">{commissionRate}%</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-zinc-100 font-bold text-zinc-900">
                      <span>Gross Platform Income</span>
                      <span className="text-primary">₹{platformRevenue}</span>
                    </div>
                  </div>
                </Card>

                <Card className="rounded-card border border-zinc-200 bg-white p-5 shadow-soft flex flex-col justify-between text-xs">
                  <div className="space-y-3">
                    <h3 className="font-bold text-sm text-zinc-900">Settlements Notice</h3>
                    <p className="leading-relaxed text-secondary-text">
                      Payout checks are processed for chef bank accounts every Monday. Platforms revenues are credited to GharChef Tech Pvt Ltd account automatically.
                    </p>
                  </div>
                  
                  <div className="p-3 bg-light-orange/40 border border-light-orange/50 rounded-2xl flex gap-2 text-[10px] text-secondary-orange mt-2">
                    <Info className="w-4 h-4 flex-shrink-0 text-primary mt-0.5" />
                    <span>Calculations adjust when refunds are processed. Commission settings can be changed in settings tab.</span>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* PAGE: REPORTS */}
          {activeTab === "reports" && (
            <div className="space-y-6 text-left max-w-xl">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Data Exports</span>
                <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">System Reports</h1>
              </div>

              {/* Reports links */}
              <Card className="rounded-card border border-zinc-200 bg-white p-6 shadow-soft space-y-4 text-xs">
                <h3 className="font-bold text-sm text-zinc-900">Generate Report Log</h3>
                
                <div className="space-y-3 text-secondary-text">
                  <div className="p-3.5 border border-zinc-200 hover:border-primary/20 rounded-xl flex justify-between items-center cursor-pointer transition-colors bg-zinc-50/20">
                    <div>
                      <h4 className="font-bold text-zinc-950">Platform Monthly Sales Report</h4>
                      <p className="text-[10px] text-zinc-400 mt-0.5">Details Gross GMV, Platform Commissions, and Chef Settlements.</p>
                    </div>
                    <button className="px-3 py-1.5 bg-zinc-950 text-white rounded-lg text-[10px] font-bold">Download</button>
                  </div>

                  <div className="p-3.5 border border-zinc-200 hover:border-primary/20 rounded-xl flex justify-between items-center cursor-pointer transition-colors bg-zinc-50/20">
                    <div>
                      <h4 className="font-bold text-zinc-950">Home Chef Health & Audit Report</h4>
                      <p className="text-[10px] text-zinc-400 mt-0.5">Summary of FSSAI inspections, warnings, and low-rated kitchens.</p>
                    </div>
                    <button className="px-3 py-1.5 bg-zinc-950 text-white rounded-lg text-[10px] font-bold">Download</button>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* PAGE: CMS CONTROLS */}
          {activeTab === "cms" && (
            <div className="space-y-6 text-left max-w-xl">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Homepage Banner Controls</span>
                <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">CMS Content</h1>
              </div>

              {cmsAlert && (
                <div className="p-3 bg-emerald-50 border border-emerald-100 text-xs text-emerald-700 font-semibold rounded-xl flex items-center gap-1.5 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{cmsAlert}</span>
                </div>
              )}

              <Card className="rounded-card border border-zinc-200 bg-white p-6 shadow-soft">
                <form onSubmit={handleCmsSave} className="space-y-4 text-xs">
                  <h3 className="font-bold text-sm text-zinc-900">Active Banner Marquee</h3>
                  
                  <div className="space-y-1">
                    <label className="font-semibold text-secondary-text">Promo Announcement Message</label>
                    <textarea
                      value={announcementText}
                      onChange={(e) => setAnnouncementText(e.target.value)}
                      className="w-full h-20 px-3 py-2 border border-zinc-200 rounded-xl text-xs focus:outline-none"
                      required
                    />
                  </div>

                  <Button type="submit" variant="primary" className="py-2.5 px-6 font-bold shadow-soft">
                    Update Homepage Marquee Banner
                  </Button>
                </form>
              </Card>
            </div>
          )}

          {/* PAGE: SETTINGS */}
          {activeTab === "settings" && (
            <div className="space-y-6 text-left max-w-xl">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Platform rules</span>
                <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Global Settings</h1>
              </div>

              {/* Form */}
              <Card className="rounded-card border border-zinc-200 bg-white p-6 shadow-soft">
                <form onSubmit={handleSettingsSave} className="space-y-4 text-xs text-secondary-text">
                  <h3 className="font-bold text-sm text-zinc-950">System Commission & Fees</h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-semibold">Platform Commission Rate (%)</label>
                      <Input
                        type="number"
                        value={commissionRate}
                        onChange={(e) => setCommissionRate(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold">Base Delivery Fee per order (₹)</label>
                      <Input
                        type="number"
                        value={baseDeliveryCharge}
                        onChange={(e) => setBaseDeliveryCharge(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold">Flat GST Tax Percentage (%)</label>
                      <Input
                        type="number"
                        value={taxRate}
                        onChange={(e) => setTaxRate(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-zinc-100 flex justify-end gap-3">
                    <Button type="submit" variant="primary" className="py-2.5 px-6 font-bold shadow-soft">
                      Save System Parameters
                    </Button>
                  </div>
                </form>
              </Card>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}

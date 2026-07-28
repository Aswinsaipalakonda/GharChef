'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Image as ImageIcon, 
  FolderTree, 
  Cookie, 
  Building2, 
  TrendingUp, 
  Plus, 
  Search,
  Calendar,
  UserCheck,
  ChevronDown,
  Layers,
  FileText,
  DollarSign,
  Package,
  Users,
  Settings,
  Bell,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { MOCK_PRODUCTS, MOCK_CATEGORIES, MOCK_BANNERS } from '@/data/mockData';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'banners' | 'categories' | 'products' | 'branches' | 'analytics'>('dashboard');
  const [selectedBranchFilter, setSelectedBranchFilter] = useState<'all' | 'vizag' | 'attapur'>('all');
  const [dateRange, setDateRange] = useState('01 July 2026 - 31 July 2026');

  // Mock Orders State
  const [orders, setOrders] = useState([
    {
      id: 'BHB-1092',
      customer: 'Ananya Rao',
      phone: '+91 98765 43210',
      branch: 'Vizag (Main)',
      amount: 1048,
      items: 'Organic Jaggery Choco Chip Wheat Cake (500g) x 1, Almond Millet Cookies (250g) x 2',
      status: 'CONFIRMED',
      date: '28 Jul 2026, 11:30 AM',
    },
    {
      id: 'BHB-1091',
      customer: 'Suresh Kumar',
      phone: '+91 98765 43211',
      branch: 'Attapur (Hyderabad)',
      amount: 499,
      items: 'Desi Ghee Date & Walnut Dry Cake (500g) x 1',
      status: 'PREPARING',
      date: '28 Jul 2026, 10:15 AM',
    },
    {
      id: 'BHB-1090',
      customer: 'Priya Sharma',
      phone: '+91 98765 43212',
      branch: 'Vizag (Main)',
      amount: 249,
      items: 'Roasted Oats & Raisin Biscuits (250g) x 1',
      status: 'DELIVERED',
      date: '27 Jul 2026, 04:45 PM',
    },
  ]);

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  return (
    <div className="flex h-screen bg-[#F4F7F6] text-[#0F172A] overflow-hidden font-sans">
      
      {/* ----------------- LEFT DARK SIDEBAR (KVR / Enterprise Style) ----------------- */}
      <aside className="w-64 bg-[#0B132B] text-slate-300 flex flex-col justify-between shrink-0 shadow-2xl z-20">
        <div>
          {/* Sidebar Top Brand Header */}
          <div className="p-5 border-b border-slate-800/80 flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-emerald-500 shrink-0">
              <Image 
                src="/images/logo.png" 
                alt="Bhagya's Healthy Bakes Logo" 
                fill 
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="font-serif font-bold text-sm text-white tracking-wide leading-tight">
                BHAGYA&apos;S BAKES
              </h1>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                ADMIN PORTAL
              </span>
            </div>
          </div>

          {/* Modules Navigation List */}
          <div className="p-3 space-y-6 overflow-y-auto max-h-[calc(100vh-140px)] no-scrollbar">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 px-3 block mb-2">
                MODULES
              </span>
              <nav className="space-y-1">
                {/* 1. Dashboard */}
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold text-xs transition-all ${
                    activeTab === 'dashboard'
                      ? 'bg-[#10B981] text-white shadow-lg shadow-emerald-900/30'
                      : 'hover:bg-slate-800/60 text-slate-300 hover:text-white'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </button>

                {/* 2. Orders */}
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold text-xs transition-all ${
                    activeTab === 'orders'
                      ? 'bg-[#10B981] text-white shadow-lg shadow-emerald-900/30'
                      : 'hover:bg-slate-800/60 text-slate-300 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <ShoppingBag className="w-4 h-4" />
                    <span>Orders &amp; Sales</span>
                  </div>
                  <span className="bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {orders.length}
                  </span>
                </button>

                {/* 3. Hero Banners */}
                <button
                  onClick={() => setActiveTab('banners')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold text-xs transition-all ${
                    activeTab === 'banners'
                      ? 'bg-[#10B981] text-white shadow-lg shadow-emerald-900/30'
                      : 'hover:bg-slate-800/60 text-slate-300 hover:text-white'
                  }`}
                >
                  <ImageIcon className="w-4 h-4" />
                  <span>Hero Banners</span>
                </button>

                {/* 4. Categories */}
                <button
                  onClick={() => setActiveTab('categories')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold text-xs transition-all ${
                    activeTab === 'categories'
                      ? 'bg-[#10B981] text-white shadow-lg shadow-emerald-900/30'
                      : 'hover:bg-slate-800/60 text-slate-300 hover:text-white'
                  }`}
                >
                  <FolderTree className="w-4 h-4" />
                  <span>Categories</span>
                </button>

                {/* 5. Products Catalog */}
                <button
                  onClick={() => setActiveTab('products')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold text-xs transition-all ${
                    activeTab === 'products'
                      ? 'bg-[#10B981] text-white shadow-lg shadow-emerald-900/30'
                      : 'hover:bg-slate-800/60 text-slate-300 hover:text-white'
                  }`}
                >
                  <Cookie className="w-4 h-4" />
                  <span>Products Catalog</span>
                </button>

                {/* 6. Branches & Showrooms */}
                <button
                  onClick={() => setActiveTab('branches')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold text-xs transition-all ${
                    activeTab === 'branches'
                      ? 'bg-[#10B981] text-white shadow-lg shadow-emerald-900/30'
                      : 'hover:bg-slate-800/60 text-slate-300 hover:text-white'
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  <span>Branches (2)</span>
                </button>
              </nav>
            </div>

            {/* Sub System Links */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 px-3 block mb-2">
                REPORTS &amp; SYSTEM
              </span>
              <nav className="space-y-1">
                <button 
                  onClick={() => setActiveTab('analytics')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold text-xs transition-all ${
                    activeTab === 'analytics'
                      ? 'bg-[#10B981] text-white shadow-lg shadow-emerald-900/30'
                      : 'hover:bg-slate-800/60 text-slate-300 hover:text-white'
                  }`}
                >
                  <TrendingUp className="w-4 h-4" />
                  <span>Analytics &amp; Revenue</span>
                </button>

                <Link
                  href="/"
                  target="_blank"
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold text-xs hover:bg-slate-800/60 text-slate-300 hover:text-white transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>View Live Website</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>
              </nav>
            </div>
          </div>
        </div>

        {/* Sidebar Footer User Profile */}
        <div className="p-4 border-t border-slate-800/80 flex items-center justify-between bg-[#080D1D]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center border border-emerald-500/30">
              BH
            </div>
            <div>
              <p className="text-xs font-bold text-white leading-tight">Bhagya Admin</p>
              <p className="text-[10px] text-slate-400">Master Store Manager</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ----------------- RIGHT MAIN CONTENT AREA ----------------- */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Header Navbar Bar */}
        <header className="bg-white border-b border-slate-200/80 px-6 py-3.5 flex items-center justify-between gap-4 shrink-0 shadow-xs">
          
          {/* Title & Page Header */}
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-slate-800 tracking-tight capitalize">
              {activeTab === 'dashboard' ? 'Dashboard Overview' : activeTab}
            </h2>

            {/* Global Modules Search Input */}
            <div className="hidden md:flex relative w-72">
              <input
                type="text"
                placeholder="Search modules, orders, products..."
                className="w-full bg-slate-100 text-slate-800 text-xs rounded-full pl-9 pr-4 py-2 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
              <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
            </div>
          </div>

          {/* Controls: Date Picker & Branch Selector */}
          <div className="flex items-center gap-3">
            {/* Date Range Selector Pill */}
            <div className="hidden lg:flex items-center gap-2 bg-slate-100 px-3.5 py-1.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-700">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>{dateRange}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </div>

            {/* Branch Selector Dropdown Pill */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-full border border-slate-200 text-xs">
              <Building2 className="w-3.5 h-3.5 text-emerald-600 ml-2" />
              <select
                value={selectedBranchFilter}
                onChange={(e) => setSelectedBranchFilter(e.target.value as any)}
                className="bg-transparent font-bold text-slate-700 focus:outline-none text-xs cursor-pointer pr-2"
              >
                <option value="all">All Branches</option>
                <option value="vizag">Vizag (Main Branch)</option>
                <option value="attapur">Attapur (Hyderabad)</option>
              </select>
            </div>

            {/* User Avatar Circle */}
            <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center border border-emerald-200">
              BA
            </div>
          </div>
        </header>

        {/* Scrollable Dashboard Body */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">

          {/* Quick Action Pills Row (KVR Style Top Action Buttons) */}
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1">
            <button 
              onClick={() => setActiveTab('products')}
              className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold px-4 py-2.5 rounded-2xl flex items-center gap-2 shadow-xs transition-colors shrink-0"
            >
              <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Plus className="w-3.5 h-3.5" />
              </div>
              <span>Add New Bake Product</span>
            </button>

            <button 
              onClick={() => setActiveTab('banners')}
              className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold px-4 py-2.5 rounded-2xl flex items-center gap-2 shadow-xs transition-colors shrink-0"
            >
              <div className="w-6 h-6 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                <ImageIcon className="w-3.5 h-3.5" />
              </div>
              <span>Manage Hero Banners</span>
            </button>

            <button 
              onClick={() => setActiveTab('categories')}
              className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold px-4 py-2.5 rounded-2xl flex items-center gap-2 shadow-xs transition-colors shrink-0"
            >
              <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                <FolderTree className="w-3.5 h-3.5" />
              </div>
              <span>Manage Categories</span>
            </button>

            <button 
              onClick={() => setActiveTab('orders')}
              className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold px-4 py-2.5 rounded-2xl flex items-center gap-2 shadow-xs transition-colors shrink-0"
            >
              <div className="w-6 h-6 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
                <FileText className="w-3.5 h-3.5" />
              </div>
              <span>Generate Sales Report</span>
            </button>
          </div>

          {/* ---------------- TAB 1: MAIN DASHBOARD OVERVIEW ---------------- */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              
              {/* Top 5 Metrics Cards Grid (KVR Style Cards) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                
                {/* Metric 1 */}
                <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      TOTAL REVENUE
                    </span>
                    <h3 className="text-2xl font-extrabold text-slate-900">₹1,796</h3>
                    <span className="inline-flex items-center text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full mt-2">
                      ↑ 14.8%
                    </span>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                    <DollarSign className="w-5 h-5" />
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      TOTAL ORDERS
                    </span>
                    <h3 className="text-2xl font-extrabold text-slate-900">{orders.length} Orders</h3>
                    <span className="inline-flex items-center text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full mt-2">
                      ↑ 8.2%
                    </span>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      BAKES IN STOCK
                    </span>
                    <h3 className="text-2xl font-extrabold text-slate-900">{MOCK_PRODUCTS.length} Items</h3>
                    <span className="inline-flex items-center text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full mt-2">
                      100% Maida Free
                    </span>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                    <Cookie className="w-5 h-5" />
                  </div>
                </div>

                {/* Metric 4 */}
                <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      ACTIVE BRANCHES
                    </span>
                    <h3 className="text-2xl font-extrabold text-slate-900">2 Cities</h3>
                    <span className="text-[10px] text-slate-500 block mt-2">Vizag &amp; Hyderabad</span>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                    <Building2 className="w-5 h-5" />
                  </div>
                </div>

                {/* Metric 5 */}
                <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      HEALTH GUARANTEES
                    </span>
                    <h3 className="text-2xl font-extrabold text-slate-900">4 Badges</h3>
                    <span className="text-[10px] text-amber-600 font-bold block mt-2">No Sugar • No Maida</span>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold">
                    <Sparkles className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Chart & Stock Status Dual Grid (KVR Style Analytics Visualization) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Sales Performance Chart (Visual Simulation) */}
                <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-base text-slate-900">Sales Performance (Order Volume)</h3>
                      <p className="text-xs text-slate-500">Real-time daily bake order analysis</p>
                    </div>
                    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-600">
                      <span className="bg-white px-2.5 py-1 rounded-lg text-slate-900 shadow-xs">Week</span>
                      <span className="px-2.5 py-1">Month</span>
                      <span className="px-2.5 py-1">Year</span>
                    </div>
                  </div>

                  {/* Simulated Wave SVG Chart */}
                  <div className="h-56 relative w-full flex items-end pt-6">
                    <svg className="w-full h-full" viewBox="0 0 500 150" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="gradientGreen" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#10B981" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <path 
                        d="M0,130 Q125,125 200,40 T380,120 T500,130" 
                        fill="url(#gradientGreen)" 
                      />
                      <path 
                        d="M0,130 Q125,125 200,40 T380,120 T500,130" 
                        fill="none" 
                        stroke="#10B981" 
                        strokeWidth="4" 
                      />
                    </svg>
                  </div>
                  <div className="flex justify-between text-[11px] font-semibold text-slate-400 pt-2 border-t border-slate-100">
                    <span>22 Jul</span>
                    <span>23 Jul</span>
                    <span>24 Jul</span>
                    <span>25 Jul</span>
                    <span className="text-emerald-600 font-bold">26 Jul (Peak)</span>
                    <span>27 Jul</span>
                    <span>28 Jul (Today)</span>
                  </div>
                </div>

                {/* Donut Stock Status Widget */}
                <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-bold text-base text-slate-900">Bake Stock Breakdown</h3>
                    <p className="text-xs text-slate-500">Live availability from oven catalog</p>
                  </div>

                  {/* Simulated Donut Center Circle */}
                  <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
                    <div className="w-full h-full rounded-full border-8 border-emerald-500 border-t-amber-500 border-r-blue-500 animate-spin-slow" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-2xl font-extrabold text-slate-900">{MOCK_PRODUCTS.length}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">TOTAL BAKES</span>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs font-medium text-slate-600 pt-2 border-t border-slate-100">
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Available (100%)</span>
                      <span className="font-bold text-slate-900">{MOCK_PRODUCTS.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Best Sellers</span>
                      <span className="font-bold text-slate-900">3</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ---------------- TAB 2: ORDERS MANAGEMENT ---------------- */}
          {activeTab === 'orders' && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg text-slate-900">WhatsApp &amp; Dynamic UPI Orders</h3>
                  <p className="text-xs text-slate-500">Manage real-time customer payments and delivery statuses</p>
                </div>
                <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full">
                  Live Dispatch Stream
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 font-bold bg-slate-50">
                      <th className="p-3.5 rounded-l-2xl">Order ID</th>
                      <th className="p-3.5">Customer Contact</th>
                      <th className="p-3.5">Fulfilling Branch</th>
                      <th className="p-3.5">Bake Items</th>
                      <th className="p-3.5">Total Paid</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 rounded-r-2xl">Update Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {orders.map((o) => (
                      <tr key={o.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3.5 font-bold font-mono text-emerald-700">{o.id}</td>
                        <td className="p-3.5">
                          <span className="font-bold block text-slate-900">{o.customer}</span>
                          <span className="text-[11px] text-slate-500">{o.phone}</span>
                        </td>
                        <td className="p-3.5">
                          <span className="bg-slate-100 text-slate-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-slate-200">
                            {o.branch}
                          </span>
                        </td>
                        <td className="p-3.5 text-slate-600 max-w-xs truncate">{o.items}</td>
                        <td className="p-3.5 font-extrabold text-slate-900">₹{o.amount}</td>
                        <td className="p-3.5">
                          <span
                            className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full ${
                              o.status === 'DELIVERED'
                                ? 'bg-emerald-100 text-emerald-800'
                                : o.status === 'PREPARING'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {o.status}
                          </span>
                        </td>
                        <td className="p-3.5">
                          <select
                            value={o.status}
                            onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                            className="bg-white border border-slate-300 rounded-full px-2.5 py-1 text-[11px] font-bold text-slate-700 focus:outline-none cursor-pointer"
                          >
                            <option value="CONFIRMED">CONFIRMED</option>
                            <option value="PREPARING">PREPARING</option>
                            <option value="DISPATCHED">DISPATCHED</option>
                            <option value="DELIVERED">DELIVERED</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ---------------- TAB 3: HERO BANNERS MANAGEMENT ---------------- */}
          {activeTab === 'banners' && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg text-slate-900">Homepage Hero Banner Carousel</h3>
                  <p className="text-xs text-slate-500">Control active slides, titles, and promotional CTA buttons</p>
                </div>
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-full flex items-center gap-2 shadow-md transition-all">
                  <Plus className="w-4 h-4" />
                  <span>Add Banner Slide</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {MOCK_BANNERS.map((b) => (
                  <div key={b.id} className="border border-slate-200 rounded-2xl p-5 bg-slate-50 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm text-slate-900">{b.title}</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2.5 py-0.5 rounded-full">ACTIVE</span>
                    </div>
                    <p className="text-xs text-slate-600">{b.subtitle}</p>
                    <div className="text-[11px] text-amber-700 font-bold">{b.tagline}</div>
                    <div className="flex justify-end gap-3 pt-3 border-t border-slate-200 text-xs font-bold">
                      <button className="text-emerald-700 hover:underline">Edit Banner</button>
                      <button className="text-rose-600 hover:underline">Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ---------------- TAB 4: CATEGORIES ---------------- */}
          {activeTab === 'categories' && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg text-slate-900">Categories Directory</h3>
                  <p className="text-xs text-slate-500">Organize organic bake categories for storefront horizontal rows</p>
                </div>
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-full flex items-center gap-2 shadow-md transition-all">
                  <Plus className="w-4 h-4" />
                  <span>Add Category</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {MOCK_CATEGORIES.map((cat) => (
                  <div key={cat.id} className="border border-slate-200 rounded-2xl p-4 bg-amber-50/30 space-y-2">
                    <h4 className="font-bold text-sm text-slate-900">{cat.name}</h4>
                    <p className="text-xs text-slate-600">{cat.description}</p>
                    <span className="text-[10px] font-extrabold text-emerald-700 block">{cat.itemCount} Items Active</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ---------------- TAB 5: PRODUCTS CATALOG ---------------- */}
          {activeTab === 'products' && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg text-slate-900">Product Catalog &amp; Health Badges</h3>
                  <p className="text-xs text-slate-500">Manage prices, health parameters, and top product flags</p>
                </div>
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-full flex items-center gap-2 shadow-md transition-all">
                  <Plus className="w-4 h-4" />
                  <span>Add Bake Product</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {MOCK_PRODUCTS.map((p) => (
                  <div key={p.id} className="border border-slate-200 rounded-2xl p-4 bg-white flex flex-col justify-between space-y-3 shadow-xs">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-sm text-slate-900">{p.name}</h4>
                        <span className="text-xs font-extrabold text-emerald-700">₹{p.price}</span>
                      </div>
                      <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-bold inline-block mt-1">
                        {p.category}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {p.healthBadges?.map((b, idx) => (
                        <span key={idx} className="text-[9px] bg-amber-50 text-amber-800 border border-amber-200 px-1.5 py-0.5 rounded-full font-bold">
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ---------------- TAB 6: BRANCHES & SHOWROOMS ---------------- */}
          {activeTab === 'branches' && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-6">
              <div>
                <h3 className="font-bold text-lg text-slate-900">Branch &amp; Fulfillment Centers</h3>
                <p className="text-xs text-slate-500">Internal management for Vizag and Hyderabad locations</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50 space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-base text-slate-900">Vizag (Main Branch)</h4>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">MAIN HUB</span>
                  </div>
                  <p className="text-xs text-slate-600">Beach Road, Visakhapatnam, Andhra Pradesh</p>
                  <p className="text-xs font-mono text-emerald-700 font-bold">WhatsApp: +91 98765 43210</p>
                </div>

                <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50 space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-base text-slate-900">Attapur (Hyderabad Branch)</h4>
                    <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">REGIONAL HUB</span>
                  </div>
                  <p className="text-xs text-slate-600">Attapur, Pillar #140, Hyderabad, Telangana</p>
                  <p className="text-xs font-mono text-emerald-700 font-bold">WhatsApp: +91 98765 43211</p>
                </div>
              </div>
            </div>
          )}

          {/* ---------------- TAB 7: ANALYTICS ---------------- */}
          {activeTab === 'analytics' && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
              <h3 className="font-bold text-lg text-slate-900">Revenue &amp; Order Analytics</h3>
              <p className="text-xs text-slate-500">Detailed break-down of organic jaggery bakes vs millet biscuit sales</p>
              <div className="p-8 bg-slate-50 rounded-2xl text-center text-xs font-semibold text-slate-500 border border-dashed border-slate-300">
                📊 Detailed analytics reports generated daily at 12:00 AM.
              </div>
            </div>
          )}

        </main>
      </div>

    </div>
  );
}

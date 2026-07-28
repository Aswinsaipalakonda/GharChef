'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Image as ImageIcon, 
  FolderTree, 
  Cookie, 
  Building2, 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  Eye,
  Plus,
  ArrowUpRight
} from 'lucide-react';
import { MOCK_PRODUCTS, MOCK_CATEGORIES, MOCK_BANNERS } from '@/data/mockData';

export default function AdminDashboardPage() {
  const [selectedBranchFilter, setSelectedBranchFilter] = useState<'all' | 'vizag' | 'attapur'>('all');
  const [activeTab, setActiveTab] = useState<'orders' | 'banners' | 'categories' | 'products'>('orders');

  // Mock Orders Data
  const [orders, setOrders] = useState([
    {
      id: 'BHB-1092',
      customer: 'Ananya Rao',
      phone: '+91 98765 43210',
      branch: 'Vizag (Main)',
      amount: 1048,
      items: 'Organic Jaggery Choco Chip Wheat Cake (500g) x 1, Almond Millet Cookies (250g) x 2',
      status: 'CONFIRMED',
      date: 'Today, 11:30 AM',
    },
    {
      id: 'BHB-1091',
      customer: 'Suresh Kumar',
      phone: '+91 98765 43211',
      branch: 'Attapur (Hyderabad)',
      amount: 499,
      items: 'Desi Ghee Date & Walnut Dry Cake (500g) x 1',
      status: 'PREPARING',
      date: 'Today, 10:15 AM',
    },
    {
      id: 'BHB-1090',
      customer: 'Priya Sharma',
      phone: '+91 98765 43212',
      branch: 'Vizag (Main)',
      amount: 249,
      items: 'Roasted Oats & Raisin Biscuits (250g) x 1',
      status: 'DELIVERED',
      date: 'Yesterday, 04:45 PM',
    },
  ]);

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  return (
    <div className="min-h-screen bg-[#FAF5EE] text-[#14233C] flex flex-col font-sans">
      
      {/* Top Admin Header */}
      <header className="bg-[#1E3A5F] text-[#FAF5EE] px-6 py-4 border-b border-white/10 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#D99036] flex items-center justify-center font-bold text-white shadow-sm">
            ⚙️
          </div>
          <div>
            <h1 className="font-serif text-lg font-bold text-white">Bhagya&apos;s Healthy Bakes - Admin Control</h1>
            <p className="text-xs text-amber-200/80">Manage Banners, Categories, Products &amp; WhatsApp Orders</p>
          </div>
        </div>

        {/* Branch Quick Filter */}
        <div className="flex items-center gap-2 bg-[#142842] p-1.5 rounded-full border border-white/10 text-xs">
          <Building2 className="w-3.5 h-3.5 text-[#D99036] ml-2" />
          <button
            onClick={() => setSelectedBranchFilter('all')}
            className={`px-3 py-1 rounded-full transition-all ${
              selectedBranchFilter === 'all' ? 'bg-[#D99036] font-bold text-white' : 'text-amber-100/70 hover:text-white'
            }`}
          >
            All Branches
          </button>
          <button
            onClick={() => setSelectedBranchFilter('vizag')}
            className={`px-3 py-1 rounded-full transition-all ${
              selectedBranchFilter === 'vizag' ? 'bg-[#D99036] font-bold text-white' : 'text-amber-100/70 hover:text-white'
            }`}
          >
            Vizag (Main)
          </button>
          <button
            onClick={() => setSelectedBranchFilter('attapur')}
            className={`px-3 py-1 rounded-full transition-all ${
              selectedBranchFilter === 'attapur' ? 'bg-[#D99036] font-bold text-white' : 'text-amber-100/70 hover:text-white'
            }`}
          >
            Attapur (Hyd)
          </button>
        </div>
      </header>

      <div className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-8 space-y-8">
        
        {/* Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white rounded-3xl p-5 border border-[#1E3A5F]/10 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs text-[#5A6D82] font-semibold block">Total Revenue</span>
              <span className="font-serif font-bold text-2xl text-[#1E3A5F]">₹1,796</span>
              <span className="text-[10px] text-emerald-600 font-bold block mt-1">+14% vs yesterday</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#D99036] flex items-center justify-center font-bold">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-[#1E3A5F]/10 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs text-[#5A6D82] font-semibold block">Active Orders</span>
              <span className="font-serif font-bold text-2xl text-[#1E3A5F]">{orders.length}</span>
              <span className="text-[10px] text-amber-600 font-bold block mt-1">2 Need Baking Dispatch</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1E3A5F] flex items-center justify-center font-bold">
              <ShoppingBag className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-[#1E3A5F]/10 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs text-[#5A6D82] font-semibold block">Active Categories</span>
              <span className="font-serif font-bold text-2xl text-[#1E3A5F]">{MOCK_CATEGORIES.length}</span>
              <span className="text-[10px] text-emerald-600 font-bold block mt-1">100% Maida-Free</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <FolderTree className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-[#1E3A5F]/10 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs text-[#5A6D82] font-semibold block">Active Bakes</span>
              <span className="font-serif font-bold text-2xl text-[#1E3A5F]">{MOCK_PRODUCTS.length}</span>
              <span className="text-[10px] text-[#D99036] font-bold block mt-1">Organic Jaggery Bakes</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#D99036] flex items-center justify-center font-bold">
              <Cookie className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-3 border-b border-[#1E3A5F]/10 pb-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('orders')}
            className={`btn-pill-outline text-xs px-5 py-2.5 flex items-center gap-2 transition-all ${
              activeTab === 'orders' ? 'bg-[#1E3A5F] text-white border-[#1E3A5F]' : 'bg-white text-[#1E3A5F]'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Orders Management</span>
          </button>
          <button
            onClick={() => setActiveTab('banners')}
            className={`btn-pill-outline text-xs px-5 py-2.5 flex items-center gap-2 transition-all ${
              activeTab === 'banners' ? 'bg-[#1E3A5F] text-white border-[#1E3A5F]' : 'bg-white text-[#1E3A5F]'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Hero Banners ({MOCK_BANNERS.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`btn-pill-outline text-xs px-5 py-2.5 flex items-center gap-2 transition-all ${
              activeTab === 'categories' ? 'bg-[#1E3A5F] text-white border-[#1E3A5F]' : 'bg-white text-[#1E3A5F]'
            }`}
          >
            <FolderTree className="w-4 h-4" />
            <span>Categories ({MOCK_CATEGORIES.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`btn-pill-outline text-xs px-5 py-2.5 flex items-center gap-2 transition-all ${
              activeTab === 'products' ? 'bg-[#1E3A5F] text-white border-[#1E3A5F]' : 'bg-white text-[#1E3A5F]'
            }`}
          >
            <Cookie className="w-4 h-4" />
            <span>Products Catalog ({MOCK_PRODUCTS.length})</span>
          </button>
        </div>

        {/* Tab 1: Orders Table */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-3xl p-6 border border-[#1E3A5F]/10 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-lg font-bold text-[#1E3A5F]">Recent WhatsApp UPI Orders</h2>
              <span className="text-xs text-[#5A6D82]">Auto-synced from Storefront</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-[#1E3A5F]/10 text-[#5A6D82] font-semibold bg-[#EEF4FB]/50">
                    <th className="p-3.5 rounded-l-2xl">Order ID</th>
                    <th className="p-3.5">Customer &amp; Phone</th>
                    <th className="p-3.5">Branch</th>
                    <th className="p-3.5">Items Ordered</th>
                    <th className="p-3.5">Amount</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 rounded-r-2xl">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1E3A5F]/5">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-amber-50/40 transition-colors">
                      <td className="p-3.5 font-bold font-mono text-[#1E3A5F]">{o.id}</td>
                      <td className="p-3.5">
                        <span className="font-semibold block text-[#14233C]">{o.customer}</span>
                        <span className="text-[11px] text-[#5A6D82]">{o.phone}</span>
                      </td>
                      <td className="p-3.5">
                        <span className="bg-blue-50 text-[#1E3A5F] text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-blue-200">
                          {o.branch}
                        </span>
                      </td>
                      <td className="p-3.5 text-[#5A6D82] max-w-xs truncate">{o.items}</td>
                      <td className="p-3.5 font-bold text-[#1E3A5F]">₹{o.amount}</td>
                      <td className="p-3.5">
                        <span
                          className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                            o.status === 'DELIVERED'
                              ? 'bg-emerald-100 text-emerald-700'
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
                          className="bg-white border border-[#1E3A5F]/20 rounded-full px-2 py-1 text-[11px] font-semibold focus:outline-none"
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

        {/* Tab 2: Banners Management */}
        {activeTab === 'banners' && (
          <div className="bg-white rounded-3xl p-6 border border-[#1E3A5F]/10 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-lg font-bold text-[#1E3A5F]">Hero Banner Carousel Controls</h2>
                <p className="text-xs text-[#5A6D82]">Admin can change home page hero slides dynamically.</p>
              </div>
              <button className="btn-pill-navy text-xs px-4 py-2 flex items-center gap-1.5">
                <Plus className="w-4 h-4" />
                <span>Add New Banner Slide</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MOCK_BANNERS.map((b) => (
                <div key={b.id} className="border border-[#1E3A5F]/10 rounded-2xl p-4 bg-[#FAF5EE] space-y-3">
                  <div className="font-bold text-sm text-[#1E3A5F] flex justify-between items-center">
                    <span>{b.title}</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">ACTIVE</span>
                  </div>
                  <p className="text-xs text-[#5A6D82]">{b.subtitle}</p>
                  <div className="text-[11px] text-[#D99036] font-semibold">{b.tagline}</div>
                  <div className="flex justify-end gap-2 pt-2 border-t border-[#1E3A5F]/10">
                    <button className="text-xs font-semibold text-[#1E3A5F] hover:underline">Edit Banner</button>
                    <button className="text-xs font-semibold text-red-600 hover:underline">Remove</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Categories Management */}
        {activeTab === 'categories' && (
          <div className="bg-white rounded-3xl p-6 border border-[#1E3A5F]/10 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-lg font-bold text-[#1E3A5F]">Category Directory Controls</h2>
                <p className="text-xs text-[#5A6D82]">Update home page categories dynamically.</p>
              </div>
              <button className="btn-pill-navy text-xs px-4 py-2 flex items-center gap-1.5">
                <Plus className="w-4 h-4" />
                <span>Add Category</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {MOCK_CATEGORIES.map((cat) => (
                <div key={cat.id} className="border border-[#1E3A5F]/10 rounded-2xl p-4 bg-amber-50/50 space-y-2">
                  <h3 className="font-bold text-sm text-[#1E3A5F]">{cat.name}</h3>
                  <p className="text-xs text-[#5A6D82]">{cat.description}</p>
                  <span className="text-[10px] font-bold text-[#D99036] block">{cat.itemCount} Items Available</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Products Catalog */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-3xl p-6 border border-[#1E3A5F]/10 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-lg font-bold text-[#1E3A5F]">Healthy Bakes Catalog</h2>
                <p className="text-xs text-[#5A6D82]">Add, edit, or set top products for horizontal scroll rows.</p>
              </div>
              <button className="btn-pill-navy text-xs px-4 py-2 flex items-center gap-1.5">
                <Plus className="w-4 h-4" />
                <span>Add New Bake Product</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {MOCK_PRODUCTS.map((p) => (
                <div key={p.id} className="border border-[#1E3A5F]/10 rounded-2xl p-4 bg-white flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-sm text-[#1E3A5F]">{p.name}</h4>
                      <span className="text-xs font-bold text-[#D99036]">₹{p.price}</span>
                    </div>
                    <span className="text-[10px] bg-[#EEF4FB] text-[#1E3A5F] px-2 py-0.5 rounded-full font-semibold inline-block mt-1">
                      {p.category}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {p.healthBadges.map((b, idx) => (
                      <span key={idx} className="text-[9px] bg-amber-50 text-[#9C5D17] border border-amber-200 px-1.5 py-0.5 rounded-full font-bold">
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

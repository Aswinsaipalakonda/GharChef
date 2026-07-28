"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  ShoppingBag,
  Heart,
  MapPin,
  Bell,
  Settings,
  User,
  Star,
  Tag,
  Plus,
  Trash2,
  CheckCircle2,
  TrendingUp,
  AlertCircle,
  Clock,
  ArrowRight,
  ShieldCheck,
  Edit,
  Save,
  Menu,
  X
} from "lucide-react";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { products, chefs, Product } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";

type TabType =
  | "overview"
  | "orders"
  | "wishlist"
  | "addresses"
  | "notifications"
  | "settings"
  | "profile"
  | "reviews"
  | "coupons";

interface OrderItem {
  id: string;
  items: string;
  date: string;
  total: number;
  status: "Preparing" | "Delivered" | "Cancelled";
  chefName: string;
}

interface Address {
  id: string;
  tag: string;
  addressLine: string;
  city: string;
}

interface NotificationItem {
  id: string;
  title: string;
  desc: string;
  date: string;
  unread: boolean;
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

interface CouponItem {
  code: string;
  value: number;
  type: "percentage" | "flat";
  minOrder: number;
  active: boolean;
}

export default function UserDashboard() {
  const { user, role, logout, currentAddress, setCurrentAddress, updateProfile } = useAuth();
  const { addToCart } = useCart();

  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Profile Form States
  const [profileName, setProfileName] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  const [profilePhone, setProfilePhone] = useState("");
  const [profileCity, setProfileCity] = useState("");
  const [profileAlert, setProfileAlert] = useState("");

  // Populate profile fields from auth context
  useEffect(() => {
    if (user) {
      setProfileName(user.name);
      setProfileEmail(user.email);
      setProfilePhone(user.phone);
      setProfileCity(user.city);
    }
  }, [user]);

  // Mock State Data
  const [orders, setOrders] = useState<OrderItem[]>([
    {
      id: "GC-482910",
      items: "Chicken Dum Biryani x 1, Gulab Jamun x 1",
      date: "13 July 2026",
      total: 318,
      status: "Preparing",
      chefName: "Mom's Kitchen"
    },
    {
      id: "GC-298174",
      items: "Ghee Karam Masala Dosa x 2",
      date: "10 July 2026",
      total: 198,
      status: "Delivered",
      chefName: "Swathi Kitchen"
    },
    {
      id: "GC-187263",
      items: "Premium Punjabi Veg Thali x 1",
      date: "05 July 2026",
      total: 219,
      status: "Delivered",
      chefName: "Ritu Verma"
    }
  ]);

  const [wishlist, setWishlist] = useState<Product[]>([]);

  // Load wishlist items
  useEffect(() => {
    const favsStr = localStorage.getItem("gharchef_favs");
    if (favsStr) {
      try {
        const favIds: string[] = JSON.parse(favsStr);
        const resolved = favIds
          .map((id) => products.find((p) => p.id === id))
          .filter((p): p is Product => !!p);
        setWishlist(resolved);
      } catch (e) {}
    }
  }, [activeTab]);

  const [addresses, setAddresses] = useState<Address[]>([
    { id: "addr-1", tag: "Home", addressLine: "Flat 402, Sunshine Heights, Gachibowli", city: "Hyderabad" },
    { id: "addr-2", tag: "Work", addressLine: "Cabin 12, Level 5, Cyber Towers, Madhapur", city: "Hyderabad" }
  ]);

  const [newAddressLine, setNewAddressLine] = useState("");
  const [newAddressTag, setNewAddressTag] = useState("Home");

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: "not-1",
      title: "Order Placed Successfully",
      desc: "Your order GC-482910 is confirmed and is being prepared by Mom's Kitchen.",
      date: "Today, 11:32 AM",
      unread: true
    },
    {
      id: "not-2",
      title: "Weekly Promo Coupon",
      desc: "Use code FREECHEF to get flat ₹50 off on orders above ₹349 this week.",
      date: "Yesterday",
      unread: true
    },
    {
      id: "not-3",
      title: "Welcome to GharChef!",
      desc: "Start exploring fresh homemade food cooked by certified local kitchens.",
      date: "08 July 2026",
      unread: false
    }
  ]);

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

  const [coupons, setCoupons] = useState<CouponItem[]>([
    { code: "GHARCHEF10", value: 10, type: "percentage", minOrder: 199, active: true },
    { code: "FREECHEF", value: 50, type: "flat", minOrder: 349, active: true },
    { code: "FREEDEL", value: 30, type: "flat", minOrder: 249, active: true }
  ]);

  const [newCouponCode, setNewCouponCode] = useState("");
  const [newCouponVal, setNewCouponVal] = useState("");
  const [newCouponMin, setNewCouponMin] = useState("");
  const [newCouponType, setNewCouponType] = useState<"percentage" | "flat">("flat");

  // Handlers
  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: profileName,
      email: profileEmail,
      phone: profilePhone,
      city: profileCity
    });
    setProfileAlert("Profile details updated successfully!");
    setTimeout(() => setProfileAlert(""), 4000);
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddressLine) return;
    const newAddr: Address = {
      id: "addr-" + Date.now(),
      tag: newAddressTag,
      addressLine: newAddressLine,
      city: "Hyderabad"
    };
    setAddresses([...addresses, newAddr]);
    setNewAddressLine("");
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses(addresses.filter((a) => a.id !== id));
  };

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

  const handleMarkAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, unread: false })));
  };

  // Sidebar navigation options
  const sidebarItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "profile", label: "My Profile", icon: User },
    { id: "orders", label: "Order History", icon: ShoppingBag },
    { id: "wishlist", label: "Saved Wishlist", icon: Heart },
    { id: "addresses", label: "Saved Addresses", icon: MapPin },
    { id: "reviews", label: "Reviews Given", icon: Star },
    { id: "coupons", label: "My Coupons", icon: Tag },
    { id: "notifications", label: "Notifications", icon: Bell, badge: notifications.filter(n => n.unread).length },
    { id: "settings", label: "Account Settings", icon: Settings }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-custom-bg">
      <Navbar />

      <main className="flex-grow max-w-[1400px] mx-auto w-full px-4 md:px-8 py-8 text-left">
        <div className="flex flex-col lg:flex-row gap-8 items-start relative">
          
          {/* Mobile Sidebar Hamburger Toggle */}
          <div className="lg:hidden w-full flex justify-between items-center bg-white border border-custom-border p-4 rounded-2xl mb-2">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              <span className="font-bold text-sm text-primary-text">Dashboard Navigation</span>
            </div>
            <button
              onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
              className="p-1.5 border border-custom-border rounded-xl text-primary-text"
            >
              {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Desktop Left Column: Sidebar panel */}
          <aside className="hidden lg:block lg:w-1/4 bg-white border border-custom-border rounded-card p-4 shadow-soft space-y-2.5">
            <div className="p-3 border-b border-custom-border/60 text-left mb-2">
              <h3 className="font-bold text-sm text-primary-text">{user?.name || "Priya Sharma"}</h3>
              <span className="text-[10px] text-primary uppercase font-bold tracking-wider capitalize">{role || "Customer"}</span>
            </div>
            
            <nav className="space-y-1">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as any)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                      isActive
                        ? "bg-primary text-white shadow-sm"
                        : "bg-transparent text-secondary-text hover:bg-light-orange/40 hover:text-primary"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </span>
                    {item.badge && item.badge > 0 ? (
                      <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold ${
                        isActive ? "bg-white text-primary" : "bg-primary text-white"
                      }`}>
                        {item.badge}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Mobile Sidebar overlay drawer */}
          <AnimatePresence>
            {isMobileSidebarOpen && (
              <>
                <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setIsMobileSidebarOpen(false)} />
                <motion.aside
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "tween", duration: 0.25 }}
                  className="fixed left-0 top-0 bottom-0 w-64 bg-white shadow-soft z-40 p-4 space-y-4 lg:hidden text-left flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b border-custom-border">
                      <span className="font-bold text-sm text-primary-text">GharChef Dashboard</span>
                      <button onClick={() => setIsMobileSidebarOpen(false)} className="p-1 border rounded-lg">
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <nav className="space-y-1">
                      {sidebarItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;
                        return (
                          <button
                            key={item.id}
                            onClick={() => {
                              setActiveTab(item.id as any);
                              setIsMobileSidebarOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                              isActive
                                ? "bg-primary text-white shadow-sm"
                                : "bg-transparent text-secondary-text hover:bg-light-orange/40 hover:text-primary"
                            }`}
                          >
                            <span className="flex items-center gap-2.5">
                              <Icon className="w-4 h-4" />
                              <span>{item.label}</span>
                            </span>
                            {item.badge && item.badge > 0 ? (
                              <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-primary text-white">
                                {item.badge}
                              </span>
                            ) : null}
                          </button>
                        );
                      })}
                    </nav>
                  </div>
                </motion.aside>
              </>
            )}
          </AnimatePresence>

          {/* Right Column: Dynamic Content Sheet */}
          <div className="w-full lg:w-3/4 bg-white border border-custom-border rounded-card shadow-soft p-6 min-h-[450px]">
            
            {/* TABS RESOLUTIONS */}

            {/* TAB: OVERVIEW */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <h2 className="text-xl font-bold text-primary-text">Account Overview</h2>
                  <p className="text-xs text-secondary-text">Quick statistics and activity updates from your kitchen dashboard.</p>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card className="rounded-xl border border-custom-border bg-custom-bg p-4 shadow-sm text-left">
                    <span className="text-[10px] uppercase font-bold text-secondary-text">Active Orders</span>
                    <h3 className="text-xl font-bold text-primary-text mt-1">
                      {orders.filter(o => o.status === "Preparing").length}
                    </h3>
                  </Card>
                  
                  <Card className="rounded-xl border border-custom-border bg-custom-bg p-4 shadow-sm text-left">
                    <span className="text-[10px] uppercase font-bold text-secondary-text">Total Placed</span>
                    <h3 className="text-xl font-bold text-primary-text mt-1">{orders.length}</h3>
                  </Card>

                  <Card className="rounded-xl border border-custom-border bg-custom-bg p-4 shadow-sm text-left">
                    <span className="text-[10px] uppercase font-bold text-secondary-text">Coupons Saved</span>
                    <h3 className="text-xl font-bold text-primary-text mt-1">{coupons.length}</h3>
                  </Card>

                  <Card className="rounded-xl border border-custom-border bg-custom-bg p-4 shadow-sm text-left">
                    <span className="text-[10px] uppercase font-bold text-secondary-text">Wishlist Items</span>
                    <h3 className="text-xl font-bold text-primary-text mt-1">{wishlist.length}</h3>
                  </Card>
                </div>

                {/* Recent Orders log */}
                <div className="space-y-3.5">
                  <h3 className="font-bold text-sm text-primary-text">Recent Orders Status</h3>
                  
                  <div className="divide-y divide-custom-border/50 border border-custom-border rounded-2xl overflow-hidden">
                    {orders.slice(0, 2).map((ord) => (
                      <div key={ord.id} className="p-4 bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs">
                        <div className="text-left space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-primary-text">{ord.id}</span>
                            <Badge variant={ord.status === "Preparing" ? "primary" : "veg"} className="text-[9px] py-0">
                              {ord.status}
                            </Badge>
                          </div>
                          <p className="text-secondary-text font-medium">{ord.items}</p>
                          <p className="text-[10px] text-muted">Cooked by {ord.chefName} | {ord.date}</p>
                        </div>
                        <span className="font-bold text-sm text-primary-text">₹{ord.total}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* TAB: PROFILE */}
            {activeTab === "profile" && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <h2 className="text-xl font-bold text-primary-text">My Profile details</h2>
                  <p className="text-xs text-secondary-text">Edit your contact details and active shipping locations.</p>
                </div>

                {profileAlert && (
                  <div className="p-3 bg-emerald-50 border border-emerald-100 text-xs text-emerald-700 font-semibold rounded-xl flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{profileAlert}</span>
                  </div>
                )}

                <form onSubmit={handleProfileSave} className="space-y-4 max-w-lg text-xs">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-semibold text-secondary-text">Full Name</label>
                      <Input type="text" value={profileName} onChange={(e) => setProfileName(e.target.value)} required />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-secondary-text">City</label>
                      <Input type="text" value={profileCity} onChange={(e) => setProfileCity(e.target.value)} required />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-secondary-text">Email Address</label>
                    <Input type="email" value={profileEmail} onChange={(e) => setProfileEmail(e.target.value)} required />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-secondary-text">Phone Number</label>
                    <Input type="tel" value={profilePhone} onChange={(e) => setProfilePhone(e.target.value)} required />
                  </div>

                  <Button type="submit" variant="primary" className="font-bold py-3 px-6 shadow-soft">
                    Save Profile Changes
                  </Button>
                </form>
              </div>
            )}

            {/* TAB: ORDERS */}
            {activeTab === "orders" && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <h2 className="text-xl font-bold text-primary-text">Order History</h2>
                  <p className="text-xs text-secondary-text">List of orders placed on GharChef marketplace.</p>
                </div>

                <div className="divide-y divide-custom-border border border-custom-border rounded-2xl overflow-hidden text-xs">
                  {orders.map((ord) => (
                    <div key={ord.id} className="p-4 bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-custom-bg/40 transition-colors">
                      <div className="text-left space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-primary-text">{ord.id}</span>
                          <Badge variant={ord.status === "Preparing" ? "primary" : ord.status === "Delivered" ? "veg" : "outline"} className="text-[9px] py-0">
                            {ord.status}
                          </Badge>
                        </div>
                        <p className="text-secondary-text font-medium">{ord.items}</p>
                        <p className="text-[10px] text-muted">Cooked by {ord.chefName} | {ord.date}</p>
                      </div>
                      <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start w-full sm:w-auto gap-4">
                        <span className="font-bold text-sm text-primary-text">₹{ord.total}</span>
                        <button
                          onClick={() => {
                            const match = products.find(p => ord.items.includes(p.name));
                            if (match) addToCart(match);
                          }}
                          className="px-2.5 py-1 border border-custom-border hover:border-primary/20 hover:text-primary rounded-lg font-semibold transition-colors cursor-pointer"
                        >
                          Reorder
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: WISHLIST */}
            {activeTab === "wishlist" && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <h2 className="text-xl font-bold text-primary-text">Saved Wishlist</h2>
                  <p className="text-xs text-secondary-text">Homemade food dishes you've saved to order later.</p>
                </div>

                {wishlist.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {wishlist.map((p) => (
                      <Card key={p.id} className="flex gap-4 p-4 border border-custom-border rounded-xl shadow-sm text-left">
                        <img src={p.image} alt={p.name} className="w-16 h-16 rounded-xl object-cover" />
                        <div className="flex-grow min-w-0 flex flex-col justify-between">
                          <div>
                            <h4 className="font-bold text-xs text-primary-text truncate">{p.name}</h4>
                            <p className="text-[10px] text-secondary-text truncate">By {p.chefName}</p>
                          </div>
                          <div className="flex justify-between items-center pt-2">
                            <span className="font-bold text-xs text-primary">₹{p.price}</span>
                            <button
                              onClick={() => addToCart(p)}
                              className="px-2.5 py-1 bg-primary text-white rounded-lg text-[10px] font-bold"
                            >
                              Add
                            </button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-xs text-secondary-text">Your saved wishlist is currently empty.</p>
                  </div>
                )}
              </div>
            )}

            {/* TAB: ADDRESSES */}
            {activeTab === "addresses" && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <h2 className="text-xl font-bold text-primary-text">Saved Addresses</h2>
                  <p className="text-xs text-secondary-text">Configure active locations for fast delivery checkout.</p>
                </div>

                {/* List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {addresses.map((addr) => (
                    <Card key={addr.id} className="p-4 border border-custom-border rounded-xl shadow-sm relative text-left flex flex-col justify-between">
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold text-primary uppercase bg-light-orange px-2 py-0.5 rounded shadow-sm">
                            {addr.tag}
                          </span>
                          <button
                            onClick={() => handleDeleteAddress(addr.id)}
                            className="text-muted hover:text-danger cursor-pointer transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-xs text-primary-text font-medium leading-relaxed pt-1">{addr.addressLine}</p>
                      </div>
                      <p className="text-[10px] text-muted mt-2">{addr.city}</p>
                    </Card>
                  ))}
                </div>

                {/* Add Form */}
                <form onSubmit={handleAddAddress} className="border-t border-custom-border/50 pt-6 space-y-4 max-w-lg text-xs">
                  <h3 className="font-bold text-sm text-primary-text">Add New Delivery Location</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2 space-y-1">
                      <label className="font-semibold text-secondary-text">Address Details</label>
                      <Input
                        type="text"
                        placeholder="House no, Building, Street Locality"
                        value={newAddressLine}
                        onChange={(e) => setNewAddressLine(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-secondary-text">Tag Type</label>
                      <select
                        value={newAddressTag}
                        onChange={(e) => setNewAddressTag(e.target.value)}
                        className="w-full bg-white border border-custom-border text-primary-text px-3 py-2.5 rounded-2xl text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary shadow-sm"
                      >
                        <option value="Home">Home</option>
                        <option value="Work">Work</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  <Button type="submit" variant="primary" className="font-bold py-2.5 px-6 shadow-soft flex items-center gap-1">
                    <Plus className="w-4 h-4" />
                    <span>Save Address</span>
                  </Button>
                </form>
              </div>
            )}

            {/* TAB: REVIEWS */}
            {activeTab === "reviews" && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <h2 className="text-xl font-bold text-primary-text">Manage Customer Reviews</h2>
                  <p className="text-xs text-secondary-text">Review ratings left by foodies on your home-cooked dishes.</p>
                </div>

                <div className="space-y-4">
                  {reviews.map((rev) => (
                    <Card key={rev.id} className="p-5 border border-custom-border rounded-xl shadow-sm text-left space-y-3">
                      <div className="flex justify-between items-center text-xs">
                        <div className="space-y-0.5">
                          <h4 className="font-bold text-primary-text">{rev.dishName}</h4>
                          <span className="text-[10px] text-muted">Reviewed by {rev.customerName} on {rev.date}</span>
                        </div>
                        <div className="flex items-center gap-1 bg-amber-50 text-amber-600 px-2 py-0.5 rounded-lg border border-amber-200 text-[10px] font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-500 stroke-amber-500" />
                          <span>{rev.rating}.0</span>
                        </div>
                      </div>
                      <p className="text-xs text-secondary-text italic">"{rev.comment}"</p>

                      {/* Reply Box */}
                      {rev.reply ? (
                        <div className="p-3 bg-light-orange/40 border border-light-orange/50 rounded-xl text-[11px] text-secondary-orange ml-4">
                          <strong>Reply:</strong> {rev.reply}
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
                          className="flex gap-2 ml-4 text-xs"
                        >
                          <input
                            name="replyInput"
                            placeholder="Write reply response to customer review"
                            className="flex-grow px-3 py-1.5 border border-custom-border rounded-xl text-xs focus:outline-none"
                            required
                          />
                          <button
                            type="submit"
                            className="px-3.5 py-1.5 bg-primary text-white rounded-xl text-xs font-semibold cursor-pointer"
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

            {/* TAB: COUPONS */}
            {activeTab === "coupons" && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <h2 className="text-xl font-bold text-primary-text">Create & Manage Coupons</h2>
                  <p className="text-xs text-secondary-text">Configure active promo code offers for your kitchen products.</p>
                </div>

                {/* List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {coupons.map((c) => (
                    <Card key={c.code} className="p-4 border border-custom-border bg-gradient-to-br from-light-orange/30 to-white rounded-xl shadow-sm text-left flex justify-between items-center relative overflow-hidden">
                      <div className="space-y-1 z-10">
                        <span className="text-[9px] font-bold text-primary uppercase tracking-wider bg-white px-2 py-0.5 rounded shadow-sm border border-primary/10">
                          {c.code}
                        </span>
                        <h4 className="font-bold text-sm text-primary-text mt-1">
                          {c.type === "percentage" ? `${c.value}% OFF` : `₹${c.value} OFF`}
                        </h4>
                        <p className="text-[10px] text-secondary-text">Min spend: ₹{c.minOrder}</p>
                      </div>
                      <Badge variant={c.active ? "veg" : "outline"} className="z-10 text-[9px]">
                        {c.active ? "Active" : "Disabled"}
                      </Badge>
                    </Card>
                  ))}
                </div>

                {/* Create Form */}
                <form onSubmit={handleCreateCoupon} className="border-t border-custom-border/50 pt-6 space-y-4 max-w-lg text-xs">
                  <h3 className="font-bold text-sm text-primary-text">Create New Promotional Code</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-semibold text-secondary-text">Coupon Code</label>
                      <Input
                        type="text"
                        placeholder="e.g. MONSOON30"
                        value={newCouponCode}
                        onChange={(e) => setNewCouponCode(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-secondary-text">Discount Type</label>
                      <select
                        value={newCouponType}
                        onChange={(e) => setNewCouponType(e.target.value as any)}
                        className="w-full bg-white border border-custom-border text-primary-text px-3 py-2.5 rounded-2xl text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary shadow-sm animate-none"
                      >
                        <option value="flat">Flat Cash Discount (₹)</option>
                        <option value="percentage">Percentage Off (%)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-secondary-text">Discount Value</label>
                      <Input
                        type="number"
                        placeholder="e.g. 50"
                        value={newCouponVal}
                        onChange={(e) => setNewCouponVal(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-secondary-text">Minimum Order (₹)</label>
                      <Input
                        type="number"
                        placeholder="e.g. 249"
                        value={newCouponMin}
                        onChange={(e) => setNewCouponMin(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" variant="primary" className="font-bold py-2.5 px-6 shadow-soft flex items-center gap-1">
                    <Plus className="w-4 h-4" />
                    <span>Create Coupon</span>
                  </Button>
                </form>
              </div>
            )}

            {/* TAB: NOTIFICATIONS */}
            {activeTab === "notifications" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1 text-left">
                    <h2 className="text-xl font-bold text-primary-text">Notifications</h2>
                    <p className="text-xs text-secondary-text">Alerts about orders, payouts, and newly available platform coupons.</p>
                  </div>
                  <button
                    onClick={handleMarkAllRead}
                    className="text-xs font-bold text-primary hover:text-primary-hover border border-custom-border px-3 py-1.5 rounded-xl bg-white shadow-sm transition-colors"
                  >
                    Mark all read
                  </button>
                </div>

                <div className="divide-y divide-custom-border border border-custom-border rounded-2xl overflow-hidden text-xs">
                  {notifications.map((n) => (
                    <div key={n.id} className={`p-4 bg-white text-left flex gap-3.5 items-start ${n.unread ? "bg-light-orange/10" : ""}`}>
                      <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${n.unread ? "bg-primary animate-pulse" : "bg-zinc-300"}`} />
                      <div className="space-y-0.5 flex-grow">
                        <h4 className={`font-bold text-primary-text ${n.unread ? "" : "font-semibold"}`}>{n.title}</h4>
                        <p className="text-secondary-text font-medium leading-relaxed">{n.desc}</p>
                        <span className="text-[10px] text-muted block pt-1">{n.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: SETTINGS */}
            {activeTab === "settings" && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <h2 className="text-xl font-bold text-primary-text">Account Settings</h2>
                  <p className="text-xs text-secondary-text">Manage passwords, payment settlement channels, and configuration rules.</p>
                </div>

                <div className="space-y-6 text-xs text-secondary-text text-left max-w-lg">
                  {/* Password Config */}
                  <div className="space-y-3.5 border-b border-custom-border/50 pb-6">
                    <h4 className="font-bold text-sm text-primary-text">Update Password</h4>
                    <div className="space-y-1">
                      <label className="font-semibold">Current Password</label>
                      <Input type="password" placeholder="••••••••" />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold">New Password</label>
                      <Input type="password" placeholder="Minimum 6 characters" />
                    </div>
                    <Button variant="secondary" className="py-2.5 font-bold shadow-sm">Update Password</Button>
                  </div>

                  {/* Notification config */}
                  <div className="space-y-3.5 border-b border-custom-border/50 pb-6">
                    <h4 className="font-bold text-sm text-primary-text">Alert Configuration</h4>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer font-medium">
                        <input type="checkbox" defaultChecked className="accent-primary" />
                        <span>Send order confirmations via WhatsApp SMS</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer font-medium">
                        <input type="checkbox" defaultChecked className="accent-primary" />
                        <span>Notify me when chefs accept preparing steps</span>
                      </label>
                    </div>
                  </div>

                  {/* Danger Zone */}
                  <div className="space-y-3.5 pt-2">
                    <h4 className="font-bold text-sm text-danger">Danger Zone</h4>
                    <p className="text-[11px] leading-relaxed text-muted">
                      Deleting your account will purge all saved address blocks, order history metrics, and wishlist items. This action cannot be undone.
                    </p>
                    <Button variant="secondary" onClick={logout} className="border-danger text-danger hover:bg-rose-50 font-bold">
                      Delete Account Credentials
                    </Button>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

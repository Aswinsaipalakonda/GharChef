"use client";

import React, { use, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  Heart,
  Plus,
  Minus,
  Star,
  ShieldCheck,
  Sparkles,
  Info,
  ChevronRight,
  TrendingUp,
  X
} from "lucide-react";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { products, Product } from "@/data/mockData";
import { useCart } from "@/context/CartContext";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetails({ params }: ProductPageProps) {
  const resolvedParams = use(params);
  const { addToCart, updateQuantity, cartItems } = useCart();
  const productId = resolvedParams.id;

  // Find target product
  const product = products.find((p) => p.id === productId) || products[0];

  const [activeTab, setActiveTab] = useState<"details" | "ingredients" | "reviews">("details");
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [qty, setQty] = useState(1);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showSticky, setShowSticky] = useState(false);

  // Mock alternate images for the gallery
  const galleryImages = [
    product.image,
    "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=400&auto=format&fit=crop", // Kitchen cooking
    "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=400&auto=format&fit=crop", // Raw ingredients
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=400&auto=format&fit=crop", // Clean packaging layout
  ];

  // Load and update Recently Viewed and Wishlist from localStorage
  useEffect(() => {
    // 1. Recently Viewed Logic
    const viewedStr = localStorage.getItem("gharchef_viewed");
    let viewedArr: string[] = [];
    if (viewedStr) {
      try {
        viewedArr = JSON.parse(viewedStr);
      } catch (e) {
        console.error("Error parsing viewed items", e);
      }
    }
    // Filter out current, put current at the front, limit to 4 items
    const updatedViewed = [product.id, ...viewedArr.filter((id) => id !== product.id)].slice(0, 5);
    localStorage.setItem("gharchef_viewed", JSON.stringify(updatedViewed));
    
    // Get actual Product objects for recently viewed (excluding current product)
    const viewedProducts = updatedViewed
      .filter((id) => id !== product.id)
      .map((id) => products.find((p) => p.id === id))
      .filter((p): p is Product => !!p);
    
    setRecentlyViewed(viewedProducts);

    // 2. Wishlist Favorites Logic
    const favsStr = localStorage.getItem("gharchef_favs");
    if (favsStr) {
      try {
        setFavorites(JSON.parse(favsStr));
      } catch (e) {}
    }
  }, [product.id]);

  // Handle scroll trigger for bottom sticky add to cart
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setShowSticky(true);
      } else {
        setShowSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleFavorite = () => {
    let updated: string[] = [];
    if (favorites.includes(product.id)) {
      updated = favorites.filter((id) => id !== product.id);
    } else {
      updated = [...favorites, product.id];
    }
    setFavorites(updated);
    localStorage.setItem("gharchef_favs", JSON.stringify(updated));
  };

  const handleAddToCart = () => {
    // Add item with set quantity
    for (let i = 0; i < qty; i++) {
      addToCart(product);
    }
    // Reset quantity counter
    setQty(1);
  };

  // Find related products (same category)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // Default product to compare with (the first related product or another food)
  const compareTarget = relatedProducts[0] || products.find((p) => p.id !== product.id) || product;

  return (
    <div className="flex flex-col min-h-screen bg-custom-bg relative">
      <Navbar />

      <main className="flex-grow max-w-[1400px] mx-auto w-full px-4 md:px-8 py-8 text-left relative">
        
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-secondary-text hover:text-primary transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to marketplace</span>
          </Link>
        </div>

        {/* Dynamic Details grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
          
          {/* Left panel: Image Gallery */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative aspect-[4/3] rounded-card overflow-hidden border border-custom-border shadow-soft bg-zinc-50">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              
              {/* Veg / Non veg float */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-xl shadow-sm flex items-center gap-1">
                <span className={`block w-2 h-2 rounded-full ${
                  product.foodType === "veg" ? "bg-emerald-500" : "bg-rose-500"
                }`} />
                <span className="text-[10px] font-bold text-secondary-text capitalize">{product.foodType}</span>
              </div>
            </div>

            {/* Thumbnails row */}
            <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-16 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-colors shadow-sm bg-white ${
                    selectedImage === img ? "border-primary" : "border-custom-border hover:border-primary/40"
                  }`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right panel: Product Meta info */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Title Block */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-primary uppercase tracking-wider">{product.category}</span>
                <button
                  onClick={toggleFavorite}
                  className="p-2 border border-custom-border hover:bg-light-orange hover:text-danger rounded-2xl bg-white shadow-sm transition-colors cursor-pointer"
                >
                  <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? "fill-danger text-danger border-danger" : "text-muted"}`} />
                </button>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-primary-text">{product.name}</h1>
              <div className="flex flex-wrap items-center gap-4 text-xs text-secondary-text">
                <div className="flex items-center gap-1 font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200 shadow-sm">
                  <Star className="w-3.5 h-3.5 fill-amber-500 stroke-amber-500" />
                  <span>{product.rating}</span>
                </div>
                <span>({product.reviewsCount} reviews)</span>
                <span className="text-custom-border">|</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-secondary-orange" />
                  <span>Ready in {product.prepTime}</span>
                </div>
              </div>
            </div>

            {/* Chef info block */}
            <Link href={`/chef/${product.chefId}`} className="block">
              <div className="p-4 bg-white border border-custom-border rounded-2xl flex items-center justify-between hover:shadow-soft transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-light-orange">
                    <img
                      src="https://images.unsplash.com/photo-1594744803329-e58b31de215f?q=80&w=150&auto=format&fit=crop"
                      alt={product.chefName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-xs text-primary-text">Cooked by {product.chefName}</h4>
                    <p className="text-[10px] text-secondary-text">FSSAI Certified Home Chef</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted" />
              </div>
            </Link>

            {/* Pricing details */}
            <div className="flex items-end gap-3.5">
              <span className="text-3xl font-bold text-primary-text">₹{product.price}</span>
              {product.originalPrice && (
                <div className="flex flex-col text-left mb-0.5">
                  <span className="text-xs text-muted line-through">MRP ₹{product.originalPrice}</span>
                  {product.discount && (
                    <span className="text-[10px] font-bold text-emerald-600">Save {product.discount}%</span>
                  )}
                </div>
              )}
            </div>

            {/* Description & Tab Panels */}
            <div className="border-b border-custom-border flex gap-4">
              {["details", "ingredients", "reviews"].map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t as any)}
                  className={`pb-2.5 text-xs font-semibold uppercase tracking-wider border-b-2 transition-colors cursor-pointer ${
                    activeTab === t ? "border-primary text-primary font-bold" : "border-transparent text-secondary-text hover:text-primary-text"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Tab content panels */}
            <div className="text-xs text-secondary-text leading-relaxed min-h-[100px]">
              {activeTab === "details" && (
                <div className="space-y-3">
                  <p>{product.description}</p>
                  <div className="grid grid-cols-2 gap-3.5 pt-2 text-[11px] text-primary-text">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Zero Added Preservatives</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      <span>Cooked with Cold-Pressed Oil</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "ingredients" && (
                <div className="space-y-2">
                  <p className="mb-2">This home-cooked dish contains premium, farm-fresh ingredients:</p>
                  <div className="flex flex-wrap gap-2">
                    {product.ingredients.map((ing) => (
                      <span key={ing} className="px-3 py-1.5 bg-white border border-custom-border rounded-xl text-primary-text font-medium">
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-4 text-left">
                  {/* Mock reviews logs */}
                  <div className="p-4 bg-white border border-custom-border rounded-2xl space-y-2 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-primary-text">Sunita R.</span>
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-400 stroke-amber-400" />
                          ))}
                        </div>
                      </div>
                      <span className="text-[10px] text-muted">2 days ago</span>
                    </div>
                    <p className="text-[11px] italic">"Super fresh and perfectly spicy! Packaging was extremely neat and hygienic."</p>
                    
                    {/* Chef Reply */}
                    <div className="p-2.5 bg-light-orange/30 border border-light-orange/40 rounded-xl mt-2 ml-4 text-[10px] text-secondary-orange">
                      <strong>Chef Reply:</strong> Thank you, Sunita! I prepared the spices fresh that morning. Looking forward to cooking for you again!
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Compare & Add buttons */}
            <div className="flex items-center gap-4 pt-4 border-t border-custom-border/50">
              {/* Qty Counter */}
              <div className="flex items-center gap-3.5 border border-custom-border rounded-2xl px-3.5 py-2 bg-white">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="text-primary hover:bg-light-orange p-1 rounded-lg transition-colors cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-sm font-bold w-4 text-center text-primary-text">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="text-primary hover:bg-light-orange p-1 rounded-lg transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart */}
              <Button onClick={handleAddToCart} variant="primary" className="flex-1 py-4 font-bold shadow-soft">
                Add to Cart (₹{product.price * qty})
              </Button>

              {/* Food Comparison Toggle */}
              <button
                onClick={() => setIsCompareOpen(true)}
                className="px-4 py-3.5 border border-custom-border hover:border-primary/30 rounded-2xl bg-white text-xs font-semibold text-secondary-text shadow-sm transition-colors cursor-pointer flex items-center gap-1"
              >
                <TrendingUp className="w-4 h-4 text-primary" />
                <span>Compare</span>
              </button>
            </div>

          </div>

        </div>

        {/* FOOD COMPARISON OVERLAY MODAL */}
        <AnimatePresence>
          {isCompareOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsCompareOpen(false)}
                className="fixed inset-0 bg-black z-50"
              />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 30 }}
                className="fixed inset-x-4 top-[10%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[600px] bg-white rounded-card shadow-soft-lg z-50 overflow-hidden text-left"
              >
                {/* Header */}
                <div className="p-5 border-b border-custom-border flex items-center justify-between">
                  <h3 className="font-bold text-base text-primary-text flex items-center gap-1.5">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <span>Food Comparison</span>
                  </h3>
                  <button
                    onClick={() => setIsCompareOpen(false)}
                    className="p-1.5 rounded-xl border border-custom-border hover:bg-light-orange transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Compare Grid */}
                <div className="p-6 overflow-y-auto max-h-[400px]">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="border-b border-custom-border">
                        <th className="py-2.5 font-bold text-secondary-text uppercase text-[10px]">Parameter</th>
                        <th className="py-2.5 font-bold text-primary-text truncate pr-4">{product.name}</th>
                        <th className="py-2.5 font-bold text-secondary-orange truncate">{compareTarget.name}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-custom-border/50 text-secondary-text">
                      <tr>
                        <td className="py-3 font-semibold text-primary-text">Home Chef</td>
                        <td className="py-3 pr-4">{product.chefName}</td>
                        <td className="py-3 text-secondary-orange">{compareTarget.chefName}</td>
                      </tr>
                      <tr>
                        <td className="py-3 font-semibold text-primary-text">Category</td>
                        <td className="py-3 pr-4">{product.category}</td>
                        <td className="py-3">{compareTarget.category}</td>
                      </tr>
                      <tr>
                        <td className="py-3 font-semibold text-primary-text">Price</td>
                        <td className="py-3 font-bold text-primary-text pr-4">₹{product.price}</td>
                        <td className="py-3 font-bold text-secondary-orange">₹{compareTarget.price}</td>
                      </tr>
                      <tr>
                        <td className="py-3 font-semibold text-primary-text">Rating Score</td>
                        <td className="py-3 pr-4 flex items-center gap-1 font-bold text-primary-text">
                          <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                          <span>{product.rating}</span>
                        </td>
                        <td className="py-3 text-secondary-orange font-bold">
                          <span className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                            <span>{compareTarget.rating}</span>
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 font-semibold text-primary-text">Food Diet Type</td>
                        <td className="py-3 pr-4 capitalize">{product.foodType}</td>
                        <td className="py-3 capitalize">{compareTarget.foodType}</td>
                      </tr>
                      <tr>
                        <td className="py-3 font-semibold text-primary-text">Spice Level</td>
                        <td className="py-3 pr-4 capitalize">{product.spiceLevel}</td>
                        <td className="py-3 capitalize">{compareTarget.spiceLevel}</td>
                      </tr>
                      <tr>
                        <td className="py-3 font-semibold text-primary-text">Prep Time</td>
                        <td className="py-3 pr-4">{product.prepTime}</td>
                        <td className="py-3">{compareTarget.prepTime}</td>
                      </tr>
                      <tr>
                        <td className="py-3 font-semibold text-primary-text">Ingredients</td>
                        <td className="py-3 pr-4 max-w-[180px] truncate">{product.ingredients.join(", ")}</td>
                        <td className="py-3 max-w-[180px] truncate">{compareTarget.ingredients.join(", ")}</td>
                      </tr>
                    </tbody>
                  </table>
                  
                  <div className="bg-light-orange/40 border border-light-orange/50 p-3 rounded-2xl flex gap-2 text-[10px] text-secondary-orange mt-4 leading-relaxed">
                    <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Nutrition Note:</strong> Home food values represent chef estimations. Both kitchens are audited for pure, preservative-free preparation.
                    </span>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 border-t border-custom-border/60 pt-10">
            <h2 className="text-xl font-bold text-primary-text mb-6">Related Homemade Dishes</h2>
            <div className="flex overflow-x-auto gap-6 pb-4 no-scrollbar">
              {relatedProducts.map((p) => (
                <Card
                  key={p.id}
                  className="group flex flex-col h-full bg-white rounded-card overflow-hidden shadow-soft border border-custom-border w-[240px] flex-shrink-0"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-50">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  </div>
                  <CardContent className="p-4 space-y-2 text-left">
                    <span className="text-[9px] font-bold text-muted uppercase">{p.category}</span>
                    <Link href={`/product/${p.id}`} className="block">
                      <h4 className="font-bold text-xs text-primary-text truncate group-hover:text-primary transition-colors">{p.name}</h4>
                    </Link>
                    <div className="flex justify-between items-center pt-1.5 border-t border-custom-border/50">
                      <span className="font-bold text-xs text-primary-text">₹{p.price}</span>
                      <button
                        onClick={() => addToCart(p)}
                        className="p-1.5 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* RECENTLY VIEWED SHELF */}
        {recentlyViewed.length > 0 && (
          <section className="mt-12 border-t border-custom-border/60 pt-10">
            <h2 className="text-xl font-bold text-primary-text mb-6">Recently Viewed Foods</h2>
            <div className="flex overflow-x-auto gap-6 pb-4 no-scrollbar">
              {recentlyViewed.map((p) => (
                <Card
                  key={p.id}
                  className="group flex flex-col h-full bg-white rounded-card overflow-hidden shadow-soft border border-custom-border w-[200px] flex-shrink-0"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-50">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  </div>
                  <CardContent className="p-3.5 space-y-2 text-left">
                    <span className="text-[8px] font-bold text-muted uppercase">{p.category}</span>
                    <Link href={`/product/${p.id}`} className="block">
                      <h4 className="font-bold text-xs text-primary-text truncate group-hover:text-primary transition-colors">{p.name}</h4>
                    </Link>
                    <span className="font-bold text-xs text-primary">₹{p.price}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

      </main>

      {/* STICKY BOTTOM ADD TO CART (Fades in on scroll down, matching mobile layout rules) */}
      <AnimatePresence>
        {showSticky && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "tween", duration: 0.2 }}
            className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-custom-border shadow-[0_-8px_30px_rgba(0,0,0,0.06)] py-4 px-6 flex items-center justify-between max-w-[1400px] mx-auto w-full"
          >
            <div className="flex items-center gap-3">
              <img src={product.image} alt="Sticky food" className="w-12 h-12 rounded-xl object-cover hidden sm:block border border-custom-border" />
              <div className="text-left">
                <h4 className="font-bold text-sm text-primary-text line-clamp-1">{product.name}</h4>
                <p className="text-xs text-primary font-bold">₹{product.price * qty}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Qty */}
              <div className="flex items-center gap-2.5 border border-custom-border rounded-xl px-2 py-1 bg-custom-bg">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="text-primary p-0.5 rounded transition-colors"><Minus className="w-3.5 h-3.5" /></button>
                <span className="text-xs font-bold w-4 text-center text-primary-text">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="text-primary p-0.5 rounded transition-colors"><Plus className="w-3.5 h-3.5" /></button>
              </div>
              <Button onClick={handleAddToCart} variant="primary" size="sm" className="font-bold shadow-soft">
                Add (₹{product.price * qty})
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}

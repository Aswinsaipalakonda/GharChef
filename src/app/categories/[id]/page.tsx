"use client";

import React, { use, useState } from "react";
import { ArrowLeft, Clock, Filter, Plus, Star, Utensils } from "lucide-react";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { products, categories } from "@/data/mockData";
import { useCart } from "@/context/CartContext";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";

interface CategoryPageProps {
  params: Promise<{ id: string }>;
}

export default function CategoryListing({ params }: CategoryPageProps) {
  const resolvedParams = use(params);
  const { addToCart } = useCart();

  // Decode category from URL param (e.g., cat-biryani or biryani)
  const categoryId = resolvedParams.id;
  const categoryName = categoryId.replace("cat-", "");
  
  // Find clean category matching string (e.g. "Biryani", "Pickles")
  const categoryObj = categories.find(
    (c) => c.name.toLowerCase() === categoryName.toLowerCase() || c.id === categoryId
  );
  
  const targetCategoryName = categoryObj ? categoryObj.name : "Biryani";

  // Filter states
  const [foodType, setFoodType] = useState<"all" | "veg" | "non-veg">("all");
  const [spiceLevel, setSpiceLevel] = useState<"all" | "mild" | "medium" | "hot">("all");
  const [sortBy, setSortBy] = useState<"rating" | "low-to-high" | "high-to-low">("rating");

  // Get matching products
  const categoryProducts = products.filter(
    (p) => p.category.toLowerCase() === targetCategoryName.toLowerCase()
  );

  // Apply filters
  const filteredProducts = categoryProducts
    .filter((p) => {
      const typeMatch = foodType === "all" || p.foodType === foodType;
      const spiceMatch = spiceLevel === "all" || p.spiceLevel === spiceLevel;
      return typeMatch && spiceMatch;
    })
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "low-to-high") return a.price - b.price;
      if (sortBy === "high-to-low") return b.price - a.price;
      return 0;
    });

  return (
    <div className="flex flex-col min-h-screen bg-custom-bg">
      <Navbar />

      <main className="flex-grow max-w-[1400px] mx-auto w-full px-4 md:px-8 py-8 text-left">
        
        {/* Breadcrumbs & Title */}
        <div className="space-y-4 mb-8">
          <Link href="/" className="inline-flex items-center gap-1 text-xs text-secondary-text hover:text-primary transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-primary uppercase tracking-wider">Homemade Specialties</span>
              <h1 className="text-2xl md:text-3xl font-bold text-primary-text mt-1">{targetCategoryName} Listings</h1>
              <p className="text-xs md:text-sm text-secondary-text mt-1">
                Authentic, home-cooked {targetCategoryName.toLowerCase()} prepared fresh in local home kitchens.
              </p>
            </div>
            <div className="text-xs text-secondary-text font-medium bg-white border border-custom-border rounded-xl px-3 py-1.5 shadow-sm">
              Showing {filteredProducts.length} of {categoryProducts.length} dishes
            </div>
          </div>
        </div>

        {/* Filter Controls Row */}
        <div className="bg-white border border-custom-border rounded-card p-5 shadow-soft mb-8 flex flex-wrap gap-6 items-center justify-between">
          <div className="flex flex-wrap gap-4 items-center">
            
            {/* Filter icon header */}
            <div className="flex items-center gap-1.5 text-xs font-bold text-primary-text pr-2 border-r border-custom-border">
              <Filter className="w-4 h-4 text-primary" />
              <span>Filters</span>
            </div>

            {/* Food Type filter */}
            <div className="flex gap-1.5 text-xs">
              <button
                onClick={() => setFoodType("all")}
                className={`px-3 py-1.5 rounded-xl border transition-colors cursor-pointer ${
                  foodType === "all" ? "bg-primary border-primary text-white font-semibold" : "bg-custom-bg border-custom-border text-secondary-text hover:border-primary/20"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFoodType("veg")}
                className={`px-3 py-1.5 rounded-xl border transition-colors cursor-pointer flex items-center gap-1 ${
                  foodType === "veg" ? "bg-emerald-600 border-emerald-600 text-white font-semibold" : "bg-custom-bg border-custom-border text-secondary-text hover:border-emerald-600/30"
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Veg</span>
              </button>
              <button
                onClick={() => setFoodType("non-veg")}
                className={`px-3 py-1.5 rounded-xl border transition-colors cursor-pointer flex items-center gap-1 ${
                  foodType === "non-veg" ? "bg-rose-600 border-rose-600 text-white font-semibold" : "bg-custom-bg border-custom-border text-secondary-text hover:border-rose-600/30"
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                <span>Non-Veg</span>
              </button>
            </div>

            {/* Spice Level filter */}
            <div className="h-6 w-px bg-custom-border hidden md:block" />

            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-secondary-text">Spice:</span>
              <select
                value={spiceLevel}
                onChange={(e) => setSpiceLevel(e.target.value as any)}
                className="bg-custom-bg border border-custom-border rounded-xl px-2.5 py-1.5 font-medium text-secondary-text focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary cursor-pointer"
              >
                <option value="all">All Spice Levels</option>
                <option value="mild">Mild (Low Heat)</option>
                <option value="medium">Medium Spice</option>
                <option value="hot">Spicy (Hot Chili)</option>
              </select>
            </div>

          </div>

          {/* Sort selection */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-secondary-text">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-custom-bg border border-custom-border rounded-xl px-2.5 py-1.5 font-medium text-secondary-text focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary cursor-pointer"
            >
              <option value="rating">Top Rated</option>
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-low">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="group flex flex-col h-full bg-white rounded-card overflow-hidden shadow-soft border border-custom-border"
              >
                {/* Image panel */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Rating */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2 py-0.5 rounded-lg text-[11px] font-bold shadow-sm flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                    <span>{product.rating}</span>
                  </div>
                  {/* Veg Indicator */}
                  <div className="absolute top-3 right-3 bg-white/95 p-1 rounded-md shadow-sm">
                    <span className={`block w-3 h-3 border-2 rounded ${
                      product.foodType === "veg" ? "border-emerald-500 bg-emerald-500/10" : "border-rose-500 bg-rose-500/10"
                    }`} />
                  </div>
                </div>

                {/* Details Content */}
                <CardContent className="p-5 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-secondary-text tracking-wide uppercase">{product.category}</span>
                    <Link href={`/product/${product.id}`} className="block">
                      <h3 className="font-bold text-base text-primary-text truncate group-hover:text-primary transition-colors">{product.name}</h3>
                    </Link>
                    <Link href={`/chef/${product.chefId}`} className="text-xs text-secondary-text hover:text-primary transition-colors block">
                      By {product.chefName}
                    </Link>
                  </div>

                  <div className="flex items-center justify-between text-xs text-secondary-text">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-secondary-orange" />
                      <span>{product.prepTime}</span>
                    </div>
                    <span className="capitalize px-2 py-0.5 bg-custom-bg rounded-lg border border-custom-border text-[10px] font-semibold">
                      Spice: {product.spiceLevel}
                    </span>
                  </div>

                  {/* Pricing footer */}
                  <div className="pt-2.5 border-t border-custom-border/50 flex items-center justify-between">
                    <div className="flex flex-col text-left">
                      <span className="text-lg font-bold text-primary-text">₹{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-[10px] text-muted line-through">₹{product.originalPrice}</span>
                      )}
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-2xl transition-colors cursor-pointer shadow-soft flex items-center gap-0.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-custom-border rounded-card max-w-xl mx-auto shadow-soft p-8">
            <Utensils className="w-12 h-12 text-muted mx-auto mb-4 stroke-[1.2]" />
            <h4 className="font-bold text-lg text-primary-text mb-1">No dishes available</h4>
            <p className="text-sm text-secondary-text mb-6">No homemade dishes match the selected filter criteria for this category.</p>
            <button
              onClick={() => { setFoodType("all"); setSpiceLevel("all"); }}
              className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}

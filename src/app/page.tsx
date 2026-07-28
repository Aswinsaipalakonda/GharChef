"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Clock,
  Plus,
  ShieldCheck,
  Award,
  Sparkles,
  Truck,
  IndianRupee,
  Search,
  Heart,
  Phone,
  Percent,
  CheckCircle,
  HelpCircle,
  ChevronDown
} from "lucide-react";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { categories, products, chefs, testimonials, Product } from "@/data/mockData";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";

export default function Home() {
  const { addToCart } = useCart();
  const { currentAddress } = useAuth();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Toggle favorites
  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Group products by sections
  const todaySpecials = products.filter(p => p.isTodaySpecial);
  const popularNearYou = products.filter(p => p.isBestSeller || p.isTrending);
  const pickles = products.filter(p => p.category === "Pickles");
  const breakfast = products.filter(p => p.category === "Breakfast");
  const lunch = products.filter(p => p.category === "Lunch" || p.id === "prod-biryani-chicken");
  const dinner = products.filter(p => p.category === "Dinner" || p.id === "prod-curry-paneer");
  const healthyFoods = products.filter(p => p.category === "Healthy Food");
  const festivalSpecials = products.filter(p => p.category === "Festival Specials" || p.category === "Sweets");

  // Search Results filtering
  const searchResults = searchQuery
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.chefName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Food Card Subcomponent to maintain reusability
  const FoodCard = ({ product }: { product: Product }) => {
    const isFav = favorites.includes(product.id);
    return (
      <Card
        key={product.id}
        className="group flex flex-col h-full bg-white rounded-card overflow-hidden shadow-soft border border-custom-border w-[280px] flex-shrink-0"
      >
        {/* Product Image */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Wishlist Button */}
          <button
            onClick={() => toggleFavorite(product.id)}
            className="absolute top-3 right-3 p-1.5 bg-white/90 backdrop-blur-sm rounded-xl border border-custom-border shadow-sm text-muted hover:text-danger transition-colors cursor-pointer z-10"
          >
            <Heart className={`w-4 h-4 ${isFav ? "fill-danger text-danger" : ""}`} />
          </button>
          {/* Rating */}
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-[11px] font-bold shadow-sm flex items-center gap-1">
            <Star className="w-3 h-3 fill-amber-400 stroke-amber-400" />
            <span>{product.rating}</span>
          </div>
          {/* Veg/Nonveg Badge */}
          <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-2 py-0.5 rounded-md shadow-sm flex items-center gap-1">
            <span className={`block w-2 h-2 rounded-full ${
              product.foodType === "veg" ? "bg-emerald-500" : "bg-rose-500"
            }`} />
            <span className="text-[10px] font-semibold text-secondary-text capitalize">{product.foodType}</span>
          </div>
        </div>

        {/* Details Content */}
        <CardContent className="p-4 flex-grow flex flex-col justify-between space-y-3 text-left">
          <div className="space-y-0.5">
            <span className="text-[9px] font-bold text-secondary-text tracking-wide uppercase">{product.category}</span>
            <h4 className="font-bold text-sm text-primary-text truncate group-hover:text-primary transition-colors">{product.name}</h4>
            <p className="text-[11px] text-secondary-text truncate">By {product.chefName}</p>
          </div>

          <div className="flex items-center justify-between text-[11px] text-secondary-text">
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-secondary-orange" />
              <span>{product.prepTime}</span>
            </div>
            {product.discount && (
              <Badge variant="secondary" className="text-[9px] px-1.5 py-0">
                {product.discount}% OFF
              </Badge>
            )}
          </div>

          {/* Pricing & Add */}
          <div className="pt-2 border-t border-custom-border/50 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-base font-bold text-primary-text">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-[10px] text-muted line-through">₹{product.originalPrice}</span>
              )}
            </div>
            <button
              onClick={() => addToCart(product)}
              className="px-3.5 py-1.5 bg-primary hover:bg-primary-hover text-white text-[11px] font-bold rounded-xl transition-colors cursor-pointer shadow-soft flex items-center gap-0.5"
            >
              <Plus className="w-3 h-3" />
              <span>Add</span>
            </button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-custom-bg">
      <Navbar />

      <main className="flex-grow pb-16">
        
        {/* HERO SECTION */}
        <section className="relative px-4 md:px-8 pt-10 pb-6 max-w-[1400px] mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-light-orange text-xs text-primary font-semibold rounded-full border border-primary/10 shadow-sm uppercase tracking-wider">
                <Sparkles className="w-3 h-3" />
                <span>100% Homemade Food Marketplace</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-[46px] font-bold text-primary-text leading-tight tracking-tight">
                Authentic Homemade <br />
                Feasts Delivered <br />
                From Home <span className="text-primary">Kitchens</span>
              </h1>
              
              <p className="text-sm text-secondary-text leading-relaxed max-w-md">
                Indulge in pure, preservative-free traditional Indian curries, hand-made pickles, daily breakfast, and customized meals, cooked with fresh ingredients by verified home chefs near you.
              </p>

              {/* Statistics */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-custom-border max-w-sm">
                <div>
                  <h4 className="text-lg md:text-xl font-bold text-primary-text">1,000+</h4>
                  <p className="text-[10px] md:text-xs text-secondary-text">Verified Chefs</p>
                </div>
                <div>
                  <h4 className="text-lg md:text-xl font-bold text-primary-text">50,000+</h4>
                  <p className="text-[10px] md:text-xs text-secondary-text">Happy Orders</p>
                </div>
                <div>
                  <h4 className="text-lg md:text-xl font-bold text-primary-text flex items-center gap-1">
                    <span>4.9</span>
                    <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                  </h4>
                  <p className="text-[10px] md:text-xs text-secondary-text">FSSAI Audited</p>
                </div>
              </div>
            </div>

            {/* Hero Right Media */}
            <div className="lg:col-span-7 relative h-[300px] md:h-[400px] w-full rounded-card overflow-hidden shadow-soft border border-custom-border">
              <img
                src="https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=1200&auto=format&fit=crop"
                alt="Chicken Dum Biryani in a copper handi pot"
                className="w-full h-full object-cover"
              />
              
              {/* Float Badge */}
              <div className="absolute bottom-5 right-5 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-soft-lg max-w-[260px] border border-white/50 flex gap-3 items-center">
                <img
                  src="https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=100&auto=format&fit=crop"
                  alt="Dum Biryani"
                  className="w-10 h-10 rounded-xl object-cover"
                />
                <div className="text-left min-w-0">
                  <span className="text-[9px] uppercase font-bold text-primary">Special Menu Offer</span>
                  <h4 className="text-xs font-bold text-primary-text truncate">Hyderabadi Chicken Biryani</h4>
                  <p className="text-xs font-bold text-primary">₹189 <span className="text-[10px] text-muted line-through font-normal">₹229</span></p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* SEARCH SECTION */}
        <section className="px-4 md:px-8 py-6 max-w-[1400px] mx-auto w-full">
          <div className="bg-white border border-custom-border rounded-card shadow-soft p-5 md:p-6 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="text-left space-y-1">
              <h3 className="font-bold text-base md:text-lg text-primary-text">Craving something specific?</h3>
              <p className="text-xs text-secondary-text">Search and filter across 1,000+ local home-cooked dishes in real-time.</p>
            </div>
            
            {/* Search inputs */}
            <div className="w-full md:max-w-xl relative">
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Search chicken biryani, mango pickle, laddu, poori..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-5 pr-14 py-3 bg-custom-bg border border-custom-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary rounded-2xl text-sm shadow-sm"
                />
                <div className="absolute right-2 p-2 bg-primary text-white rounded-xl">
                  <Search className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SEARCH RESULTS (Conditional render) */}
        {searchQuery && (
          <section className="px-4 md:px-8 py-6 max-w-[1400px] mx-auto w-full bg-white border border-primary/10 rounded-card shadow-soft my-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-lg text-primary-text">Search Results for "{searchQuery}" ({searchResults.length})</h3>
              <button onClick={() => setSearchQuery("")} className="text-xs font-bold text-primary hover:underline">Clear Search</button>
            </div>
            
            {searchResults.length > 0 ? (
              <div className="flex overflow-x-auto gap-6 pb-4 no-scrollbar">
                {searchResults.map((product) => (
                  <FoodCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-sm text-secondary-text">No meals match your query. Try searching for "biryani", "pickle", "dosa", or "laddu".</p>
              </div>
            )}
          </section>
        )}

        {/* CATEGORIES */}
        <section className="px-4 md:px-8 py-6 max-w-[1400px] mx-auto w-full">
          <div className="text-left mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-primary-text">Explore by Category</h2>
            <p className="text-xs text-secondary-text mt-0.5">Grandma's recipe books brought to life in local home kitchens</p>
          </div>

          <div className="flex gap-4 md:gap-6 overflow-x-auto pb-2 no-scrollbar scroll-smooth">
            {categories.map((cat) => (
              <div key={cat.id} className="flex-shrink-0">
                <a href={`#section-${cat.name.toLowerCase().replace(/\s+/g, "-")}`} className="flex flex-col items-center gap-2.5 group focus:outline-none cursor-pointer">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-custom-border group-hover:border-primary transition-all duration-300 shadow-sm bg-white">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <span className="text-xs md:text-sm font-semibold text-primary-text group-hover:text-primary transition-colors">
                    {cat.name}
                  </span>
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* TODAY'S SPECIALS */}
        <section className="px-4 md:px-8 py-8 max-w-[1400px] mx-auto w-full">
          <div className="flex items-center justify-between mb-6">
            <div className="text-left">
              <h2 className="text-xl md:text-2xl font-bold text-primary-text flex items-center gap-1.5">
                <Sparkles className="w-5 h-5 text-secondary-orange fill-secondary-orange/20" />
                <span>Today's Specials</span>
              </h2>
              <p className="text-xs text-secondary-text mt-0.5">Most ordered dishes in Gachibowli today, cooked in limited batches</p>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-lg border border-emerald-100">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              <span>Ordering Open</span>
            </div>
          </div>

          <div className="flex overflow-x-auto gap-6 pb-4 no-scrollbar scroll-smooth snap-x">
            {todaySpecials.map((product) => (
              <div key={product.id} className="snap-start">
                <FoodCard product={product} />
              </div>
            ))}
          </div>
        </section>

        {/* POPULAR NEAR YOU */}
        <section className="px-4 md:px-8 py-8 max-w-[1400px] mx-auto w-full">
          <div className="text-left mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-primary-text">Popular Near You</h2>
            <p className="text-xs text-secondary-text mt-0.5">Top-rated local favorites with exceptional taste and packaging scores</p>
          </div>

          <div className="flex overflow-x-auto gap-6 pb-4 no-scrollbar scroll-smooth">
            {popularNearYou.map((product) => (
              <FoodCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* OFFERS */}
        <section className="px-4 md:px-8 py-6 max-w-[1400px] mx-auto w-full">
          <div className="text-left mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-primary-text">Discount Coupon Hub</h2>
            <p className="text-xs text-secondary-text mt-0.5">Enter code at slide-out cart checkout to activate flat or percentage reductions</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-light-orange to-white border border-primary/20 rounded-card p-6 shadow-soft text-left flex justify-between items-center relative overflow-hidden group">
              <div className="space-y-2 z-10">
                <span className="text-[10px] font-bold text-primary uppercase tracking-wider bg-white px-2 py-0.5 rounded shadow-sm border border-primary/10">Code: GHARCHEF10</span>
                <h4 className="font-bold text-base text-primary-text">Get 10% OFF</h4>
                <p className="text-xs text-secondary-text">Valid on orders above ₹199. Capped at ₹100 discount.</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-white border border-primary/10 flex items-center justify-center text-primary font-bold shadow-sm z-10">
                <Percent className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-light-orange to-white border border-primary/20 rounded-card p-6 shadow-soft text-left flex justify-between items-center relative overflow-hidden group">
              <div className="space-y-2 z-10">
                <span className="text-[10px] font-bold text-primary uppercase tracking-wider bg-white px-2 py-0.5 rounded shadow-sm border border-primary/10">Code: FREECHEF</span>
                <h4 className="font-bold text-base text-primary-text">Flat ₹50 OFF</h4>
                <p className="text-xs text-secondary-text">Applicable on any menu items above ₹349 minimum spend.</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-white border border-primary/10 flex items-center justify-center text-primary font-bold shadow-sm z-10">
                <Percent className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-light-orange to-white border border-primary/20 rounded-card p-6 shadow-soft text-left flex justify-between items-center relative overflow-hidden group">
              <div className="space-y-2 z-10">
                <span className="text-[10px] font-bold text-primary uppercase tracking-wider bg-white px-2 py-0.5 rounded shadow-sm border border-primary/10">Code: FREEDEL</span>
                <h4 className="font-bold text-base text-primary-text">Free Delivery</h4>
                <p className="text-xs text-secondary-text">Waives delivery charges on your cart basket above ₹249.</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-white border border-primary/10 flex items-center justify-center text-primary font-bold shadow-sm z-10">
                <Percent className="w-5 h-5" />
              </div>
            </div>
          </div>
        </section>

        {/* TOP HOME CHEFS */}
        <section className="px-4 md:px-8 py-8 max-w-[1400px] mx-auto w-full">
          <div className="text-left mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-primary-text">Top Home Chefs</h2>
            <p className="text-xs text-secondary-text mt-0.5">Verified culinary partners with decades of cooking expertise</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {chefs.map((chef) => {
              const isFav = favorites.includes(chef.id);
              return (
                <Card key={chef.id} className="group relative overflow-hidden bg-white border border-custom-border rounded-card flex flex-col items-center text-center p-5 hover:shadow-soft-md">
                  <button
                    onClick={() => toggleFavorite(chef.id)}
                    className="absolute top-4 right-4 p-1.5 bg-white/95 rounded-xl border border-custom-border shadow-sm text-muted hover:text-danger cursor-pointer z-10"
                  >
                    <Heart className={`w-3.5 h-3.5 ${isFav ? "fill-danger text-danger" : ""}`} />
                  </button>

                  <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-light-orange shadow-sm mb-3">
                    <img
                      src={chef.chefImage}
                      alt={chef.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="space-y-0.5">
                    <h4 className="font-bold text-sm text-primary-text truncate">{chef.name}</h4>
                    <p className="text-[11px] text-primary font-semibold">{chef.specialty}</p>
                    <p className="text-[10px] text-secondary-text">{chef.location.split(",")[0]}</p>
                  </div>

                  <div className="mt-3 flex items-center gap-1 bg-amber-50 text-amber-600 px-2.5 py-0.5 rounded-lg text-[10px] font-bold border border-amber-200">
                    <Star className="w-3 h-3 fill-amber-500 stroke-amber-500" />
                    <span>{chef.rating} ({chef.reviewsCount})</span>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-custom-border/60 w-full text-left space-y-0.5 text-[11px]">
                    <span className="text-[9px] text-muted uppercase font-bold tracking-wide">Signature dish</span>
                    <p className="font-semibold text-primary-text truncate">{chef.signatureDish}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* POPULAR PICKLES */}
        <section id="section-pickles" className="px-4 md:px-8 py-8 max-w-[1400px] mx-auto w-full">
          <div className="text-left mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-primary-text">Popular Pickles</h2>
            <p className="text-xs text-secondary-text mt-0.5">Sun-dried, traditional non-veg and vegetarian pickles made with cold-pressed oils</p>
          </div>

          <div className="flex overflow-x-auto gap-6 pb-4 no-scrollbar scroll-smooth">
            {pickles.map((product) => (
              <FoodCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* BREAKFAST SECTION */}
        <section id="section-breakfast" className="px-4 md:px-8 py-8 max-w-[1400px] mx-auto w-full">
          <div className="text-left mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-primary-text">South Indian Breakfast</h2>
            <p className="text-xs text-secondary-text mt-0.5">Crispy ghee karam dosa, fluffy steamed idli, and golden pooris cooked fresh on order</p>
          </div>

          <div className="flex overflow-x-auto gap-6 pb-4 no-scrollbar scroll-smooth">
            {breakfast.map((product) => (
              <FoodCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* LUNCH SECTION */}
        <section id="section-lunch" className="px-4 md:px-8 py-8 max-w-[1400px] mx-auto w-full">
          <div className="text-left mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-primary-text">Lunch Specials</h2>
            <p className="text-xs text-secondary-text mt-0.5">Complete vegetable thalis and premium Hyderabadi chicken biryani bowls for a filling lunch</p>
          </div>

          <div className="flex overflow-x-auto gap-6 pb-4 no-scrollbar scroll-smooth">
            {lunch.map((product) => (
              <FoodCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* DINNER SECTION */}
        <section id="section-dinner" className="px-4 md:px-8 py-8 max-w-[1400px] mx-auto w-full">
          <div className="text-left mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-primary-text">Dinner Favorites</h2>
            <p className="text-xs text-secondary-text mt-0.5">Comfort dal tadka, jeera rice, and rich paneer curries for an easy evening dinner</p>
          </div>

          <div className="flex overflow-x-auto gap-6 pb-4 no-scrollbar scroll-smooth">
            {dinner.map((product) => (
              <FoodCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* HEALTHY FOODS */}
        <section id="section-healthy-food" className="px-4 md:px-8 py-8 max-w-[1400px] mx-auto w-full">
          <div className="text-left mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-primary-text">Healthy Meals</h2>
            <p className="text-xs text-secondary-text mt-0.5">Nutritious grain bowls, high-fiber oats khichdi, and low-calorie home diets</p>
          </div>

          <div className="flex overflow-x-auto gap-6 pb-4 no-scrollbar scroll-smooth">
            {healthyFoods.map((product) => (
              <FoodCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* FESTIVAL SPECIALS */}
        <section id="section-festival-specials" className="px-4 md:px-8 py-8 max-w-[1400px] mx-auto w-full">
          <div className="text-left mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-primary-text">Festival Specials & Sweets</h2>
            <p className="text-xs text-secondary-text mt-0.5">Motichoor laddus, khoya gulab jamuns, and sweet boxes for holy celebrations</p>
          </div>

          <div className="flex overflow-x-auto gap-6 pb-4 no-scrollbar scroll-smooth">
            {festivalSpecials.map((product) => (
              <FoodCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* CUSTOMER REVIEWS */}
        <section className="px-4 md:px-8 py-10 max-w-[1400px] mx-auto w-full">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-primary-text">What Our Customers Say</h2>
            <p className="text-xs text-secondary-text mt-0.5">Real reviews left by foodies in Hyderabad</p>
          </div>

          <div className="relative max-w-3xl mx-auto">
            <div className="overflow-hidden bg-white border border-custom-border rounded-card shadow-soft p-6 md:p-10 relative min-h-[200px] text-left">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="flex gap-0.5">
                    {Array.from({ length: testimonials[activeTestimonial].rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                    ))}
                  </div>

                  <p className="text-sm md:text-base text-primary-text italic font-medium leading-relaxed">
                    "{testimonials[activeTestimonial].comment}"
                  </p>

                  <div className="flex items-center gap-3 pt-2">
                    <img
                      src={testimonials[activeTestimonial].image}
                      alt={testimonials[activeTestimonial].name}
                      className="w-10 h-10 rounded-full object-cover border border-custom-border"
                    />
                    <div>
                      <h4 className="font-bold text-xs text-primary-text">{testimonials[activeTestimonial].name}</h4>
                      <p className="text-[10px] text-secondary-text">Regularly orders from <span className="text-primary font-semibold">{testimonials[activeTestimonial].chefSpecial}</span></p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Slider Arrows */}
              <div className="absolute bottom-6 right-6 flex gap-2">
                <button
                  onClick={prevTestimonial}
                  className="p-1.5 border border-custom-border hover:bg-light-orange hover:text-primary rounded-xl cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="p-1.5 border border-custom-border hover:bg-light-orange hover:text-primary rounded-xl cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* BECOME SELLER CTA */}
        <section id="seller" className="px-4 md:px-8 py-6 max-w-[1400px] mx-auto w-full">
          <div className="rounded-card overflow-hidden bg-gradient-to-br from-white to-light-orange border border-primary/20 shadow-soft p-6 md:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-left">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
                Partner With Us
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-primary-text">Are you a passionate Home Chef?</h3>
              <p className="text-xs md:text-sm text-secondary-text leading-relaxed">
                Turn your passion for cooking into a thriving business! GharChef empowers home cooks (especially women entrepreneurs) with listing, marketing, packing assistance, FSSAI registration guidance, and a dedicated delivery network.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-secondary-text">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Work from your own kitchen</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Set your own price and timings</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Hassle-free delivery pickup</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Weekly earnings settlement</span>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <Link href="#chef-register" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full font-bold shadow-soft">
                  Register as Home Chef
                </Button>
              </Link>
              <Link href="#contact" className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" className="w-full">
                  Talk to Our Team
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* LOGISTICS VALUE BADGES */}
        <section className="bg-light-orange/20 border-t border-custom-border/50 py-8 mt-12">
          <div className="max-w-[1400px] mx-auto px-4 md:px-8 w-full">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-xs text-secondary-text">
              <div className="flex items-center justify-center gap-2">
                <Truck className="w-4 h-4 text-primary" />
                <span>Free Delivery above ₹249</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>FSSAI Hygiene Inspected</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Award className="w-4 h-4 text-primary" />
                <span>No Added Preservatives</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <span>24/7 Priority Helpline</span>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}

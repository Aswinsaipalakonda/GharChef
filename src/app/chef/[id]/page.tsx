"use client";

import React, { use, useState, useEffect } from "react";
import { ArrowLeft, Clock, Heart, Plus, Star, ShieldCheck, MapPin, Award, CheckCircle, ThumbsUp } from "lucide-react";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { chefs, products, Product } from "@/data/mockData";
import { useCart } from "@/context/CartContext";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

interface ChefPageProps {
  params: Promise<{ id: string }>;
}

export default function ChefProfile({ params }: ChefPageProps) {
  const resolvedParams = use(params);
  const { addToCart } = useCart();
  const chefId = resolvedParams.id;

  // Find target chef
  const chef = chefs.find((c) => c.id === chefId) || chefs[0];

  const [activeTab, setActiveTab] = useState<"menu" | "story" | "reviews">("menu");
  const [foodFilter, setFoodFilter] = useState<"all" | "veg" | "non-veg">("all");
  const [favorites, setFavorites] = useState<string[]>([]);

  // Load wishlist
  useEffect(() => {
    const favsStr = localStorage.getItem("gharchef_favs");
    if (favsStr) {
      try {
        setFavorites(JSON.parse(favsStr));
      } catch (e) {}
    }
  }, []);

  const toggleFavorite = (prodId: string) => {
    let updated = [...favorites];
    if (favorites.includes(prodId)) {
      updated = favorites.filter((id) => id !== prodId);
    } else {
      updated.push(prodId);
    }
    setFavorites(updated);
    localStorage.setItem("gharchef_favs", JSON.stringify(updated));
  };

  // Find products cooked by this chef
  const chefProducts = products.filter((p) => p.chefId === chef.id);
  const filteredProducts = chefProducts.filter(
    (p) => foodFilter === "all" || p.foodType === foodFilter
  );

  return (
    <div className="flex flex-col min-h-screen bg-custom-bg">
      <Navbar />

      {/* Large Kitchen Banner */}
      <div className="w-full h-48 md:h-64 relative bg-zinc-950">
        <img src={chef.image} alt={chef.name} className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-custom-bg via-transparent to-transparent" />
        
        {/* Back navigation overlay */}
        <div className="absolute top-6 left-6 md:left-12 z-10">
          <Link href="/" className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-xl border border-custom-border text-xs font-semibold text-primary-text hover:text-primary transition-colors shadow-sm">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Marketplace</span>
          </Link>
        </div>
      </div>

      <main className="flex-grow max-w-[1400px] mx-auto w-full px-4 md:px-8 pb-12 relative -mt-20 z-10 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left panel: Chef Summary details */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="rounded-card border border-custom-border bg-white shadow-soft p-6 text-center space-y-4">
              
              {/* Profile Avatar */}
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-light-orange shadow-sm mx-auto">
                <img src={chef.chefImage} alt={chef.name} className="w-full h-full object-cover" />
              </div>

              {/* Title & specialty */}
              <div className="space-y-1">
                <div className="flex items-center justify-center gap-1.5">
                  <h2 className="text-xl font-bold text-primary-text">{chef.name}</h2>
                  {chef.isVerified && (
                    <Badge variant="primary" className="p-0.5 rounded-full bg-primary/10 text-primary">
                      <CheckCircle className="w-3.5 h-3.5 fill-primary text-white" />
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-primary font-bold">{chef.specialty}</p>
                <p className="text-[11px] text-secondary-text flex items-center justify-center gap-1">
                  <MapPin className="w-3 h-3 text-muted" />
                  <span>{chef.location}</span>
                </p>
              </div>

              {/* Verified badge FSSAI */}
              <div className="bg-light-orange/40 border border-light-orange/50 rounded-2xl p-3 flex gap-2.5 items-start text-[11px] text-secondary-orange text-left leading-relaxed">
                <ShieldCheck className="w-4 h-4 flex-shrink-0 text-emerald-600 mt-0.5" />
                <span>
                  <strong>FSSAI Certified:</strong> Kitchen inspected and cleared for safety, hygiene, and fresh preparation standards.
                </span>
              </div>

              {/* Quick stats grid */}
              <div className="grid grid-cols-3 gap-2 border-t border-custom-border pt-4 text-center">
                <div>
                  <h4 className="text-sm font-bold text-primary-text flex items-center justify-center gap-0.5">
                    <span>{chef.rating}</span>
                    <Star className="w-3 h-3 fill-amber-400 stroke-amber-400" />
                  </h4>
                  <p className="text-[10px] text-secondary-text mt-0.5">Rating</p>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-primary-text">{chef.experience.split(" ")[0]}</h4>
                  <p className="text-[10px] text-secondary-text mt-0.5">Exp</p>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-primary-text">{chef.deliveryTime}</h4>
                  <p className="text-[10px] text-secondary-text mt-0.5">Delivery</p>
                </div>
              </div>

            </Card>
          </div>

          {/* Right panel: Tabbed menus */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Navigation Tabs */}
            <div className="bg-white border border-custom-border rounded-card p-2 shadow-soft flex gap-2">
              <button
                onClick={() => setActiveTab("menu")}
                className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
                  activeTab === "menu" ? "bg-primary text-white shadow-sm" : "bg-transparent text-secondary-text hover:text-primary-text"
                }`}
              >
                Dishes Menu
              </button>
              <button
                onClick={() => setActiveTab("story")}
                className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
                  activeTab === "story" ? "bg-primary text-white shadow-sm" : "bg-transparent text-secondary-text hover:text-primary-text"
                }`}
              >
                Biography
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
                  activeTab === "reviews" ? "bg-primary text-white shadow-sm" : "bg-transparent text-secondary-text hover:text-primary-text"
                }`}
              >
                Reviews
              </button>
            </div>

            {/* Tab content areas */}
            <div>
              {activeTab === "menu" && (
                <div className="space-y-6">
                  {/* Category filters */}
                  <div className="flex gap-2 text-xs">
                    <button
                      onClick={() => setFoodFilter("all")}
                      className={`px-3.5 py-2 border rounded-xl transition-colors cursor-pointer ${
                        foodFilter === "all" ? "bg-primary border-primary text-white font-semibold" : "bg-white border-custom-border text-secondary-text hover:border-primary/20"
                      }`}
                    >
                      All Foods ({chefProducts.length})
                    </button>
                    <button
                      onClick={() => setFoodFilter("veg")}
                      className={`px-3.5 py-2 border rounded-xl transition-colors cursor-pointer flex items-center gap-1 ${
                        foodFilter === "veg" ? "bg-emerald-600 border-emerald-600 text-white font-semibold" : "bg-white border-custom-border text-secondary-text hover:border-emerald-600/30"
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>Veg Only</span>
                    </button>
                    <button
                      onClick={() => setFoodFilter("non-veg")}
                      className={`px-3.5 py-2 border rounded-xl transition-colors cursor-pointer flex items-center gap-1 ${
                        foodFilter === "non-veg" ? "bg-rose-600 border-rose-600 text-white font-semibold" : "bg-white border-custom-border text-secondary-text hover:border-rose-600/30"
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                      <span>Non-Veg Only</span>
                    </button>
                  </div>

                  {/* Food items grid list */}
                  {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {filteredProducts.map((p) => {
                        const isFav = favorites.includes(p.id);
                        return (
                          <Card
                            key={p.id}
                            className="group flex flex-col h-full bg-white rounded-card overflow-hidden shadow-soft border border-custom-border"
                          >
                            <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-50">
                              <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                              <button
                                onClick={() => toggleFavorite(p.id)}
                                className="absolute top-3 right-3 p-1.5 bg-white/95 rounded-xl border border-custom-border shadow-sm text-muted hover:text-danger cursor-pointer z-10"
                              >
                                <Heart className={`w-3.5 h-3.5 ${isFav ? "fill-danger text-danger border-danger" : ""}`} />
                              </button>
                            </div>
                            <CardContent className="p-4 flex-grow flex flex-col justify-between space-y-3">
                              <div className="space-y-0.5">
                                <span className="text-[9px] font-bold text-muted uppercase">{p.category}</span>
                                <Link href={`/product/${p.id}`} className="block">
                                  <h4 className="font-bold text-sm text-primary-text truncate group-hover:text-primary transition-colors">{p.name}</h4>
                                </Link>
                              </div>
                              <div className="flex items-center justify-between text-[11px] text-secondary-text pt-1.5 border-t border-custom-border/50">
                                <span className="font-bold text-sm text-primary-text">₹{p.price}</span>
                                <button
                                  onClick={() => addToCart(p)}
                                  className="px-3 py-1.5 bg-primary hover:bg-primary-hover text-white text-[11px] font-bold rounded-xl transition-colors cursor-pointer shadow-soft flex items-center gap-0.5"
                                >
                                  <Plus className="w-3 h-3" />
                                  <span>Add</span>
                                </button>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-10 bg-white border border-custom-border rounded-card p-6 shadow-soft">
                      <p className="text-xs text-secondary-text">No dishes matched this filter. Try viewing all menu items.</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "story" && (
                <Card className="rounded-card border border-custom-border bg-white shadow-soft p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-bold text-base text-primary-text flex items-center gap-1.5">
                      <Award className="w-5 h-5 text-primary" />
                      <span>Meet the Home Chef</span>
                    </h3>
                    <p className="text-xs text-secondary-text leading-relaxed">
                      {chef.bio}
                    </p>
                  </div>

                  <div className="border-t border-custom-border/60 pt-4 space-y-2">
                    <h4 className="font-bold text-xs text-primary-text">Kitchen Highlights</h4>
                    <ul className="space-y-2 text-[11px] text-secondary-text">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                        <span>FSSAI Hygiene Grade: <strong>Exceptional</strong></span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                        <span>Signature dish: <strong>{chef.signatureDish}</strong></span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                        <span>Cooking experience: <strong>{chef.experience}</strong></span>
                      </li>
                    </ul>
                  </div>
                </Card>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-4">
                  <Card className="rounded-card border border-custom-border bg-white shadow-soft p-5 space-y-3">
                    <div className="flex items-center justify-between border-b border-custom-border/50 pb-3">
                      <div className="flex items-center gap-1 text-base font-bold text-primary-text">
                        <Star className="w-5 h-5 fill-amber-400 stroke-amber-400" />
                        <span>{chef.rating} / 5.0</span>
                      </div>
                      <span className="text-[11px] text-secondary-text">{chef.reviewsCount} customer reviews</span>
                    </div>

                    {/* Review list */}
                    <div className="space-y-4 pt-2">
                      <div className="space-y-1.5 text-xs text-secondary-text border-b border-custom-border/40 pb-3">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-primary-text">Sujata K.</span>
                          <span className="text-[10px] text-muted">1 week ago</span>
                        </div>
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-400 stroke-amber-400" />
                          ))}
                        </div>
                        <p className="italic leading-relaxed">"The food was incredibly fresh and tasted like pure home cooking. Very light on stomach!"</p>
                      </div>

                      <div className="space-y-1.5 text-xs text-secondary-text border-b border-custom-border/40 pb-3">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-primary-text">Vikram P.</span>
                          <span className="text-[10px] text-muted">2 weeks ago</span>
                        </div>
                        <div className="flex gap-0.5">
                          {Array.from({ length: 4 }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-400 stroke-amber-400" />
                          ))}
                        </div>
                        <p className="italic leading-relaxed">"Gongura pappu was amazing. Delivery took slightly longer but the food was hot."</p>
                      </div>
                    </div>
                  </Card>
                </div>
              )}
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, Heart, Plus, Star, Trash2, ShoppingBag } from "lucide-react";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { products, Product } from "@/data/mockData";
import { useCart } from "@/context/CartContext";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function Wishlist() {
  const { addToCart } = useCart();
  const [favoriteItems, setFavoriteItems] = useState<Product[]>([]);

  // Load favorites on mount
  useEffect(() => {
    const favsStr = localStorage.getItem("gharchef_favs");
    if (favsStr) {
      try {
        const favIds: string[] = JSON.parse(favsStr);
        const resolved = favIds
          .map((id) => products.find((p) => p.id === id))
          .filter((p): p is Product => !!p);
        setFavoriteItems(resolved);
      } catch (e) {
        console.error("Error loading wishlist", e);
      }
    }
  }, []);

  const handleRemoveFavorite = (id: string) => {
    const updated = favoriteItems.filter((p) => p.id !== id);
    setFavoriteItems(updated);
    
    const updatedIds = updated.map((p) => p.id);
    localStorage.setItem("gharchef_favs", JSON.stringify(updatedIds));
  };

  return (
    <div className="flex flex-col min-h-screen bg-custom-bg">
      <Navbar />

      <main className="flex-grow max-w-[1400px] mx-auto w-full px-4 md:px-8 py-8 text-left">
        
        {/* Breadcrumb & Header Title */}
        <div className="space-y-4 mb-8">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-secondary-text hover:text-primary transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to marketplace</span>
          </Link>
          <div>
            <span className="text-xs font-bold text-primary uppercase tracking-wider">My Saved Foods</span>
            <h1 className="text-2xl md:text-3xl font-bold text-primary-text mt-1">My Wishlist ({favoriteItems.length})</h1>
            <p className="text-xs md:text-sm text-secondary-text mt-1">
              Tasty dishes you've saved to order later. Cooked with love by verified home chefs.
            </p>
          </div>
        </div>

        {/* Saved List Grid */}
        {favoriteItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {favoriteItems.map((product) => (
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
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2 py-0.5 rounded-lg text-[10px] font-bold shadow-sm flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400 stroke-amber-400" />
                    <span>{product.rating}</span>
                  </div>
                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemoveFavorite(product.id)}
                    className="absolute top-3 right-3 p-1.5 bg-white/95 rounded-xl border border-custom-border shadow-sm text-muted hover:text-danger cursor-pointer z-10"
                    title="Remove from Saved"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Details Content */}
                <CardContent className="p-4 flex-grow flex flex-col justify-between space-y-3">
                  <div className="space-y-0.5 text-left">
                    <span className="text-[9px] font-bold text-muted uppercase tracking-wide">{product.category}</span>
                    <Link href={`/product/${product.id}`} className="block">
                      <h4 className="font-bold text-sm text-primary-text truncate group-hover:text-primary transition-colors">{product.name}</h4>
                    </Link>
                    <p className="text-[11px] text-secondary-text truncate">By {product.chefName}</p>
                  </div>

                  {/* Add to Cart Actions */}
                  <div className="pt-2 border-t border-custom-border/50 flex items-center justify-between">
                    <span className="font-bold text-base text-primary-text">₹{product.price}</span>
                    <button
                      onClick={() => addToCart(product)}
                      className="px-3 py-1.5 bg-primary hover:bg-primary-hover text-white text-[11px] font-bold rounded-xl transition-colors cursor-pointer shadow-soft flex items-center gap-0.5"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-custom-border rounded-card max-w-xl mx-auto shadow-soft p-8">
            <ShoppingBag className="w-12 h-12 text-muted mx-auto mb-4 stroke-[1.2]" />
            <h4 className="font-bold text-lg text-primary-text mb-1">Your Wishlist is Empty</h4>
            <p className="text-sm text-secondary-text mb-6">Discover healthy meals and homemade delicacies, and click the heart icon to save them here.</p>
            <Link href="/">
              <Button variant="primary" size="sm" className="font-bold shadow-soft">
                Explore Homemade Dishes
              </Button>
            </Link>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}

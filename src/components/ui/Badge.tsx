"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  variant?: "primary" | "secondary" | "veg" | "nonveg" | "rating" | "discount" | "outline";
  className?: string;
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = "primary",
  className,
  children,
}) => {
  const baseStyles =
    "inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full select-none gap-1";

  const variants = {
    primary: "bg-primary/10 text-primary",
    secondary: "bg-light-orange text-secondary-orange",
    veg: "bg-emerald-50 text-emerald-600 border border-emerald-200",
    nonveg: "bg-rose-50 text-rose-600 border border-rose-200",
    rating: "bg-amber-50 text-amber-600 border border-amber-200",
    discount: "bg-primary text-white shadow-sm font-semibold",
    outline: "bg-transparent border border-custom-border text-secondary-text",
  };

  return (
    <span className={cn(baseStyles, variants[variant], className)}>
      {children}
    </span>
  );
};

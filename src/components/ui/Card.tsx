"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps {
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
  animate?: boolean;
}

export const Card: React.FC<CardProps> = ({
  className,
  onClick,
  children,
  animate = true,
}) => {
  const baseStyles =
    "bg-white border border-custom-border rounded-card overflow-hidden shadow-soft transition-all duration-300";
  const hoverStyles = onClick || animate ? "hover:shadow-soft-md cursor-pointer" : "";

  const Component = animate ? motion.div : "div";
  const animProps = animate
    ? {
        whileHover: { y: -6, transition: { duration: 0.2 } },
        onClick,
      }
    : { onClick };

  return (
    <Component
      className={cn(baseStyles, hoverStyles, className)}
      {...animProps}
    >
      {children}
    </Component>
  );
};

export const CardContent: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className,
  children,
}) => {
  return <div className={cn("p-6", className)}>{children}</div>;
};

export const CardFooter: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className,
  children,
}) => {
  return (
    <div className={cn("px-6 pb-6 pt-0 border-t border-custom-border/50", className)}>
      {children}
    </div>
  );
};

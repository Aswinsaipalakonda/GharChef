"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", error, icon, ...props }, ref) => {
    return (
      <div className="w-full">
        <div className="relative flex items-center">
          {icon && (
            <div className="absolute left-4 text-secondary-text pointer-events-none">
              {icon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              "w-full bg-white text-primary-text border border-custom-border placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all rounded-2xl text-base shadow-sm",
              icon ? "pl-11 pr-4 py-3" : "px-4 py-3",
              error ? "border-danger focus:ring-danger/20 focus:border-danger" : "",
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
        {error && <p className="mt-1.5 ml-1.5 text-sm text-danger">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

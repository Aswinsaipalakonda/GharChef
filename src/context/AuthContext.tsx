"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface UserProfile {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
}

type UserRole = "customer" | "seller" | "delivery" | "admin";

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole | null;
  loginAsCustomer: (phone: string, name?: string) => void;
  loginAsChef: (email: string) => void;
  loginAsAdmin: (email: string) => void;
  loginAsDelivery: (phone: string) => void;
  logout: () => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  currentAddress: string;
  setCurrentAddress: (address: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [currentAddress, setCurrentAddress] = useState<string>("Gachibowli, Hyderabad");

  // Load auth from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("gharchef_user");
    const savedRole = localStorage.getItem("gharchef_role");
    const savedAddress = localStorage.getItem("gharchef_address");

    if (savedUser && savedRole) {
      try {
        setUser(JSON.parse(savedUser));
        setRole(savedRole as UserRole);
      } catch (e) {
        console.error("Error loading user", e);
      }
    }
    if (savedAddress) {
      setCurrentAddress(savedAddress);
    }
  }, []);

  const saveAuth = (newUser: UserProfile | null, newRole: UserRole | null) => {
    setUser(newUser);
    setRole(newRole);
    if (newUser && newRole) {
      localStorage.setItem("gharchef_user", JSON.stringify(newUser));
      localStorage.setItem("gharchef_role", newRole);
    } else {
      localStorage.removeItem("gharchef_user");
      localStorage.removeItem("gharchef_role");
    }
  };

  const loginAsCustomer = (phone: string, name = "Priya Sharma") => {
    const mockProfile: UserProfile = {
      name,
      phone,
      email: "priya.sharma@example.com",
      address: "Flat 402, Sunshine Heights, Gachibowli",
      city: "Hyderabad",
    };
    saveAuth(mockProfile, "customer");
    setCurrentAddress("Gachibowli, Hyderabad");
    localStorage.setItem("gharchef_address", "Gachibowli, Hyderabad");
  };

  const loginAsChef = (email: string) => {
    const mockProfile: UserProfile = {
      name: "Ritu Verma (Home Chef)",
      phone: "+91 9876543210",
      email,
      address: "12/A, Chef Street, Madhapur",
      city: "Hyderabad",
    };
    saveAuth(mockProfile, "seller");
  };

  const loginAsAdmin = (email: string) => {
    const mockProfile: UserProfile = {
      name: "System Admin",
      phone: "+91 9999999999",
      email,
      address: "GharChef HQ, Hitech City",
      city: "Hyderabad",
    };
    saveAuth(mockProfile, "admin");
  };

  const loginAsDelivery = (phone: string) => {
    const mockProfile: UserProfile = {
      name: "Ramesh Kumar (Delivery)",
      phone,
      email: "ramesh.delivery@example.com",
      address: "Delivery Hub 1, Kondapur",
      city: "Hyderabad",
    };
    saveAuth(mockProfile, "delivery");
  };

  const logout = () => {
    saveAuth(null, null);
  };

  const updateProfile = (updatedFields: Partial<UserProfile>) => {
    if (user) {
      const updatedUser = { ...user, ...updatedFields };
      setUser(updatedUser);
      localStorage.setItem("gharchef_user", JSON.stringify(updatedUser));
    }
  };

  const updateAddress = (address: string) => {
    setCurrentAddress(address);
    localStorage.setItem("gharchef_address", address);
    if (user) {
      updateProfile({ address });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        loginAsCustomer,
        loginAsChef,
        loginAsAdmin,
        loginAsDelivery,
        logout,
        updateProfile,
        currentAddress,
        setCurrentAddress: updateAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

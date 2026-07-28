import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "Bhagya's Healthy Bakes - No Sugar, No Maida Homemade Bakes",
  description: "Guilt-free cakes & artisanal cookies made with 100% whole wheat, organic jaggery, and pure desi ghee. No Sugar, No Maida, No Preservatives, No Dalda.",
  icons: {
    icon: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#FAF5EE] text-[#14233C]">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}

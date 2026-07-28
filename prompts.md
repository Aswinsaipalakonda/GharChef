# Bhagya's Healthy Bakes - Phase-by-Phase Antigravity Master Prompts

This document contains step-by-step prompts to build **Bhagya's Healthy Bakes** platform incrementally. 

---

## 📌 General Instructions & Rules
* **Brand Theme**: Navy (`#1E3A5F`), Warm Amber/Biscuit (`#D99036`), Cream Background (`#FAF5EE`), Light Blue Pill Accent (`#EEF4FB`).
* **Buttons**: Full rounded pill style (`rounded-full` / `border-radius: 9999px`).
* **Health Highlights**: Always feature **No Sugar • No Maida • No Preservatives • No Dalda**.
* **Authentication**: No login required for customers.
* **Admin Access**: Hidden from customer navigation. Accessible directly via `/admin`.
* **Branches**: Managed internally by Admin (Vizag & Attapur). Customers order directly without branch pickers.

---

## 🚀 PHASE 1: Design System, Layout & Shared Components

```markdown
### PROMPT 1.1: Design Tokens & Tailwind Configuration
Set up the design system for Bhagya's Healthy Bakes in `src/app/globals.css` and Tailwind config:
1. Palette:
   - Primary Deep Navy: `#1E3A5F`
   - Primary Hover Navy: `#162C49`
   - Secondary Amber/Biscuit: `#D99036`
   - Warm Cream Background: `#FAF5EE`
   - Card Background: `#FFFFFF`
   - Pill Light Accent: `#EEF4FB`
   - Text Dark Navy: `#14233C`
   - Muted Gray: `#64748B`
2. Typography & Shapes:
   - Font: Inter or Outfit.
   - Buttons: Full pill shape (`rounded-full` / `px-6 py-2.5 border-2 border-[#1E3A5F]`).
   - Shadows: Soft organic drop shadow `0 4px 20px -2px rgba(30, 58, 95, 0.08)`.
3. Create CSS variables for theme colors and utility classes for pill buttons and health badges.
```

```markdown
### PROMPT 1.2: Header & Health Highlights Bar
Create `src/components/Header.tsx` and `src/components/HealthHighlightsBar.tsx`:
1. **Health Highlights Bar**:
   - Sticky top bar with cream/amber background.
   - Highlights with wheat icons: 🌾 No Sugar | 🌾 No Maida | 🌾 No Preservatives | 🌾 No Dalda.
2. **Header Navigation**:
   - Left: Logo `Bhagya's Healthy Bakes` with round badge styling.
   - Center: Search input bar with quick search popover.
   - Right: Cart Button with dynamic badge count.
   - DO NOT include any Branch Selector or Admin button in the customer header. (Clean ecommerce navbar like Amazon/Flipkart).
```

```markdown
### PROMPT 1.3: Cart Drawer Component
Create `src/components/CartDrawer.tsx` and cart state management (Context or Zustand):
1. Slide-over drawer displaying selected items, quantity (+ / -), item weight (250g, 500g, 1kg), price breakdown.
2. Selected Branch notification ("Fulfilling from Vizag Branch").
3. Subtotal, delivery fee calculation, total amount.
4. "Proceed to Payment & Checkout" pill button.
```

---

## 🛒 PHASE 2: Customer Storefront Pages

```markdown
### PROMPT 2.1: Home Page Hero Banner Carousel & Category Grid
Implement `src/app/page.tsx` and `src/components/HeroCarousel.tsx`:
1. **Hero Banner Carousel**:
   - Smooth auto-sliding banner carousel with navigation dots and left/right arrows.
   - Slide design featuring warm bakes images, promotional text ("100% Whole Wheat & Jaggery Delights"), and rounded CTA button ("Order Fresh Now").
2. **Category Selection Pills**:
   - Horizontal pill bar displaying categories: "All", "Cakes & Pastries", "Artisanal Cookies", "Dry Bakes & Breads", "Millet Treats", "Festival Specials".
```

```markdown
### PROMPT 2.2: Top Products & Horizontal Scroll Product Rows
Create `src/components/ProductCard.tsx` and `src/components/HorizontalProductRow.tsx`:
1. **Product Card**:
   - Image with hover zoom effect.
   - Health Badges overlay ("No Sugar", "Jaggery Made").
   - Title, weight badge, rating stars, price, MRP discount tag.
   - Rounded "Add to Cart" / "Quick Buy" pill button.
2. **Horizontal Scroll Section**:
   - Section 1: ⭐ **Top Products (Customer Favorites)** with left/right scroll control buttons and smooth touch scrolling.
   - Section 2: 🍪 **Guilt-Free Cookies & Biscuits**.
   - Section 3: 🎂 **Whole Wheat Healthy Cakes**.
```

```markdown
### PROMPT 2.3: Amazon / Flipkart Style Product Detail Page (`/product/[id]`)
Create `src/app/product/[id]/page.tsx`:
1. **Gallery & Media**:
   - High-res main product image with thumbnail gallery switcher.
   - Health Guarantees box (No Sugar, No Maida, No Preservatives, No Dalda).
2. **Product Info**:
   - Title, Rating summary (4.8 ★★★★★ - 124 reviews), In Stock status.
   - Price breakdown (Selling price, MRP strikethrough, % discount).
   - Weight selection pills (250g, 500g, 1kg).
3. **Ingredients & Nutritional Highlights**:
   - Accordion/Tabs for "Ingredients Used" (e.g. Organic Jaggery, Whole Wheat Flour, Pure Desi Ghee, Almonds), "Storage Instructions", and "Customer Reviews".
4. **Action Buttons**:
   - Rounded "Add to Cart" and "Buy Now" buttons.
   - Related products horizontal scroll row at the bottom.
```

---

## 💳 PHASE 3: UPI QR Payment & WhatsApp Order Redirection

```markdown
### PROMPT 3.1: Checkout Modal & Dynamic UPI QR Code Generator
Create `src/components/CheckoutModal.tsx`:
1. **Customer Details Form**:
   - Name, Phone Number, Delivery Address, Pincode, Branch confirmation.
2. **Dynamic UPI QR Code Generator**:
   - Generates exact UPI URL: `upi://pay?pa={branch_upi_id}&pn=BhagyasHealthyBakes&am={totalAmount}&cu=INR&tn=Order_{orderId}`.
   - Render clean QR code using `qrcode.react` canvas.
   - Displays exact amount payable, merchant name, and supported apps (GPay, PhonePe, Paytm, BHIM).
3. **Payment Confirmation Button**:
   - Rounded button "I Have Paid ₹{amount} -> Place Order via WhatsApp".
```

```markdown
### PROMPT 3.2: WhatsApp Order Routing Integration
Integrate WhatsApp order payload generator in `src/utils/whatsapp.ts`:
1. Construct formatted message string:
   * Header: `🍰 *NEW ORDER - BHAGYA'S HEALTHY BAKES*`
   * Order Details: Order ID, Selected Branch (Vizag/Attapur), Date & Time.
   * Customer Details: Name, Mobile Number, Full Address.
   * Itemized List: Item Name, Weight/Variant, Qty, Unit Price, Subtotal.
   * Grand Total & Payment Method: `UPI QR Code Scanned`.
2. Automatically trigger `window.open("https://wa.me/{branch_whatsapp_number}?text=" + encodeURIComponent(message), "_blank")`.
3. Clear cart state and display success modal with order tracking ID.
```

---

## ⚙️ PHASE 4: Admin Dashboard (`/admin`)

```markdown
### PROMPT 4.1: Admin Layout & Dashboard Overview
Create `src/app/admin/layout.tsx` and `src/app/admin/page.tsx`:
1. **Admin Sidebar Navigation**:
   - Dashboard Summary, Orders, Hero Banners, Categories, Products, Branch Settings.
2. **Metrics Overview**:
   - Total Orders Today, Total Revenue (Vizag vs Attapur), Pending Deliveries, Active Products count.
3. **Branch Quick Switch**:
   - Filter metrics and orders by Vizag or Attapur branch.
```

```markdown
### PROMPT 4.2: Admin Orders Management Page (`/admin/orders`)
Create `src/app/admin/orders/page.tsx`:
1. Filterable Orders Table (By Branch, Status: Pending Payment, Confirmed, Preparing, Out for Delivery, Delivered).
2. Expandable row displaying order items, customer contact, address, dynamic UPI transaction reference.
3. Status update toggle dropdown with automatic badge color changes.
```

```markdown
### PROMPT 4.3: Banner, Category & Product Management Pages
Create:
1. `src/app/admin/banners/page.tsx`: Add/Edit/Delete hero banner slides, upload image URLs, set slide sequence.
2. `src/app/admin/categories/page.tsx`: Add/Edit categories (Name, Slug, Icon/Image).
3. `src/app/admin/products/page.tsx`: Full product form (Title, Description, Ingredients, Price, MRP, Weight options, Category, Branch assignment, Health badges checkboxes, Top Product toggle).
```

---

## 🗄️ PHASE 5: Database Integration & Docker Setup

```markdown
### PROMPT 5.1: Prisma Schema & API Routes
Set up Prisma ORM with SQLite database in `prisma/schema.prisma`:
1. Define models for `Branch`, `Banner`, `Category`, `Product`, `Order`, `OrderItem`.
2. Seed initial data for Vizag & Attapur branches, sample bakes, and default banners.
3. Build API handlers under `src/app/api/` for dynamic CRUD operations.
```

```markdown
### PROMPT 5.2: Multi-Container Docker Setup
Create `Dockerfile` and `docker-compose.yml`:
1. Multi-stage Docker build for Next.js app.
2. Configure `docker-compose.yml` orchestrating `app` and persistent database volume.
3. Verify application running seamlessly via `docker compose up --build`.
```

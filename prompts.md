# 🍰 Bhagya's Healthy Bakes - Senior Architect Gap Analysis & Master Prompts

> **Architectural Status**: 
> - **Frontend UI / UX**: ~90% Complete (Storefront, Product Pages, Cart Drawer, Dynamic UPI QR Payment Modal, WhatsApp Redirection, Enterprise Dark Sidebar Admin Panel).
> - **Backend & Persistence**: ~30% Complete (Mock data structures active; SQLite / Prisma database schemas, API routes, image upload handlers, and containerized Docker setup pending).

---

## 📊 Senior Developer Comparison Matrix (WooCommerce / Custom SaaS vs. Current App)

| Feature Area | WordPress / WooCommerce Equivalent | Current Next.js App Implementation | Status & Remaining Gap |
| :--- | :--- | :--- | :--- |
| **Brand Identity & Tokens** | Custom Theme (Customizer / Global Styles) | Tailwind CSS v4 variables with Deep Navy (`#1E3A5F`), Biscuit (`#D99036`), Vanilla Cream (`#FAF5EE`), rounded pill buttons, and Health Badges bar (*No Sugar, No Maida, No Preservatives, No Dalda*). | **Completed (100%)** |
| **Customer Storefront** | Elementor / Gutenberg Homepage Layout | `Header.tsx` with search & cart badge, `HeroCarousel.tsx`, `HorizontalProductRow.tsx` (Top Products, Guilt-Free Cookies, Healthy Cakes). | **Completed (95%)** (Needs live search query filtering). |
| **Product Detail Page** | WooCommerce Single Product Template | `/product/[id]` with multi-image gallery, weight variant selection (250g, 500g, 1kg), ratings, 100% wholesome ingredients accordion, and rounded buy buttons. | **Completed (95%)** (Needs live reviews form). |
| **Payment Gateway** | Razorpay / UPI QR Gateway Plugin | Dynamic UPI QR code generator (`qrcode.react`) creating exact payable amount payload (`upi://pay?pa=...&am={totalAmount}`). | **Completed (90%)** (Needs screenshot upload / verification field). |
| **Order Routing** | WhatsApp Order Notification Plugin | `whatsapp.ts` auto-generating pre-formatted itemized order messages redirected directly to the seller's WhatsApp number (`+91 98765 43210`). | **Completed (100%)** |
| **Admin Control Panel** | WP Admin / WooCommerce Dashboard | Enterprise dark sidebar dashboard (`/admin`) matching KVR Motors layout with live metrics, KVR-style top action buttons, orders table with status updates, banner controls, category manager, and product catalog. | **Completed (90%)** (Needs backend API connection for live CRUD). |
| **Database & Persistence** | MySQL (wp_posts, wp_postmeta, wp_orders) | `mockData.ts` memory arrays. | **Pending (0%)** -> Needs Prisma ORM + SQLite / PostgreSQL schema & seed migration. |
| **API Layer** | WooCommerce REST API / WP GraphQL | Standard Next.js Client Components. | **Pending (0%)** -> Needs Next.js `/api/` endpoints for Products, Categories, Banners, Orders. |
| **Media / File Uploads** | WP Media Library | Unsplash static URLs. | **Pending (0%)** -> Needs local storage / S3 file upload handler for custom admin banner & product images. |
| **Containerization** | Dockerized LAMP / LEMP Stack | Single local Node dev process. | **Pending (0%)** -> Needs `Dockerfile` & `docker-compose.yml` multi-container setup. |

---

## 🚀 Master Prompts Suite (Phase-by-Phase Roadmap)

### 🟢 COMPLETED PHASES

```markdown
### PHASE 1: Design System & Header (COMPLETED)
- Configured globals.css with Navy (#1E3A5F), Amber (#D99036), Cream (#FAF5EE).
- Added rounded pill buttons (.btn-pill-navy) and Health Highlights Bar (No Sugar, No Maida, No Preservatives, No Dalda).
- Built Header.tsx and CartContext.tsx with local storage persistence.
```

```markdown
### PHASE 2: Customer Storefront & Product Pages (COMPLETED)
- Built HeroCarousel.tsx, ProductCard.tsx, HorizontalProductRow.tsx.
- Created Amazon/Flipkart style Product Detail Page (/product/[id]) with weight selectors and ingredient accordions.
- Updated Storefront Home Page (src/app/page.tsx).
```

```markdown
### PHASE 3: Dynamic UPI QR Code & WhatsApp Order Routing (COMPLETED)
- Created CheckoutModal.tsx with dynamic qrcode.react rendering exact payable amount upi:// URL.
- Integrated whatsapp.ts utility formatting itemized order details for direct WhatsApp dispatching.
```

```markdown
### PHASE 4: KVR Motors Style Enterprise Admin Panel (COMPLETED)
- Redesigned /admin to enterprise dark sidebar layout (#0B132B).
- Added KVR-style top action pills, date range selector, branch switcher, wave analytics chart, and stock donut widget.
- Included tabs for Orders, Banners, Categories, Products, and Branches.
```

---

### 🟡 REMAINING PHASES TO EXECUTE

```markdown
### PROMPT 5.1: Prisma ORM Schema & Database Initialization
Set up Prisma ORM with SQLite database in `prisma/schema.prisma`:
1. Define models for:
   - `Branch` (id, name, code, address, whatsapp, upiId)
   - `Banner` (id, title, subtitle, tagline, imageUrl, buttonText, buttonLink, active, order)
   - `Category` (id, name, slug, description, image, itemCount)
   - `BakeProduct` (id, name, slug, description, ingredients, price, mrp, weight, weightOptions, rating, reviewsCount, image, images, categoryId, healthBadges, isTopProduct, isBestSeller, inStock, shelfLife)
   - `Order` (id, orderNumber, customerName, phone, address, city, pincode, totalAmount, paymentStatus, orderStatus, createdAt)
   - `OrderItem` (id, orderId, productId, weight, quantity, price)
2. Generate Prisma Client and run initial migration: `npx prisma migrate dev --name init`.
3. Create a seed script (`prisma/seed.ts`) loading default bakes, categories, and banners into SQLite.
```

```markdown
### PROMPT 5.2: Backend REST API Endpoints
Create Next.js Route Handlers in `src/app/api/`:
1. `/api/banners`: GET (active banners), POST (add banner), PUT (update order), DELETE.
2. `/api/categories`: GET (all categories with item count), POST, PUT, DELETE.
3. `/api/products`: GET (with category & top product query filtering), POST, PUT, DELETE.
4. `/api/orders`: GET (for admin panel), POST (create order on checkout confirmation), PATCH (update order status).
```

```markdown
### PROMPT 5.3: Admin Panel Live API Integration & Image Uploads
Connect `/admin` frontend to the live Next.js API endpoints:
1. Replace `MOCK_PRODUCTS`, `MOCK_CATEGORIES`, `MOCK_BANNERS`, and `orders` state in `src/app/admin/page.tsx` with `fetch` calls.
2. Implement file upload API (`/api/upload`) allowing admins to upload custom banner and product images stored under `/public/uploads/`.
3. Add live search query filtering on storefront header and admin tables.
```

```markdown
### PROMPT 5.4: Multi-Container Docker Setup
Create Docker configuration for seamless local & cloud deployment:
1. Create `Dockerfile` with multi-stage build (deps, builder, runner) optimizing production Next.js image size.
2. Create `docker-compose.yml` orchestrating:
   - `web` service (Next.js app running on port 3000).
   - `db` persistent volume (for SQLite / PostgreSQL storage).
3. Test container execution via `docker compose up --build`.
```

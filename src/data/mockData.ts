export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description?: string;
  itemCount: number;
}

export interface BakeProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  ingredients: string[];
  price: number;
  mrp: number;
  weight: string;
  weightOptions: string[];
  rating: number;
  reviewsCount: number;
  image: string;
  images: string[];
  category: string;
  healthBadges: string[];
  isTopProduct?: boolean;
  isBestSeller?: boolean;
  isAvailable: boolean;
  inStock: boolean;
  shelfLife: string;
  // Legacy compatibility fields
  chefName?: string;
  chefId?: string;
  spiceLevel?: string;
  foodType?: string;
  availableQty?: number;
  prepTime?: string;
  originalPrice?: number;
}

export type Product = BakeProduct;

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  imageUrl: string;
  buttonText: string;
  buttonLink: string;
  healthHighlights: string[];
}

export const MOCK_CATEGORIES: Category[] = [
  {
    id: "cakes",
    name: "Whole Wheat Cakes",
    slug: "cakes",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop&q=80",
    description: "Baked with 100% whole wheat flour, organic jaggery & pure desi ghee.",
    itemCount: 12,
  },
  {
    id: "cookies",
    name: "Guilt-Free Cookies",
    slug: "cookies",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&auto=format&fit=crop&q=80",
    description: "Crispy homemade cookies free from maida & artificial preservatives.",
    itemCount: 16,
  },
  {
    id: "millet-bakes",
    name: "Millet & Oats Bakes",
    slug: "millet-bakes",
    image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=600&auto=format&fit=crop&q=80",
    description: "Nutrient-dense Ragi, Foxtail Millet & Roasted Oats snacks.",
    itemCount: 9,
  },
  {
    id: "dry-bakes",
    name: "Teatime Dry Bakes",
    slug: "dry-bakes",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80",
    description: "Classic tea cakes, rusks, and dry nut breads without refined sugars.",
    itemCount: 8,
  },
];

export const categories = MOCK_CATEGORIES;

export const MOCK_BANNERS: Banner[] = [
  {
    id: "banner-1",
    title: "100% Jaggery & Whole Wheat Cakes",
    subtitle: "Deliciously Healthy • Zero Guilt",
    tagline: "No Sugar • No Maida • No Preservatives • No Dalda",
    imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1200&auto=format&fit=crop&q=80",
    buttonText: "Order Fresh Now",
    buttonLink: "#top-products",
    healthHighlights: ["Organic Jaggery", "Pure Desi Ghee", "Whole Wheat"],
  },
  {
    id: "banner-2",
    title: "Artisanal Crunchy Millet Cookies",
    subtitle: "Freshly Baked Every Morning",
    tagline: "Healthy Teatime Companion for the Whole Family",
    imageUrl: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=1200&auto=format&fit=crop&q=80",
    buttonText: "Explore Cookies",
    buttonLink: "#cookies-section",
    healthHighlights: ["Ragi & Oats", "No Refined Oils", "High Fiber"],
  },
];

export const MOCK_PRODUCTS: BakeProduct[] = [
  {
    id: "bhb-01",
    name: "Organic Jaggery Choco Chip Wheat Cake",
    slug: "jaggery-choco-chip-wheat-cake",
    description: "Rich, moist whole wheat cake sweetened naturally with farm-fresh organic jaggery and loaded with premium dark choco chips.",
    ingredients: ["100% Whole Wheat Flour", "Organic Jaggery", "Pure Cow Ghee", "Dark Cocoa", "Dark Choco Chips", "Cardamom"],
    price: 499,
    mrp: 650,
    weight: "500g",
    weightOptions: ["250g", "500g", "1kg"],
    rating: 4.9,
    reviewsCount: 142,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=800&auto=format&fit=crop&q=80"
    ],
    category: "Whole Wheat Cakes",
    healthBadges: ["No Sugar", "No Maida", "No Preservatives", "No Dalda"],
    isTopProduct: true,
    isBestSeller: true,
    isAvailable: true,
    inStock: true,
    shelfLife: "7 Days (Ambient)",
  },
  {
    id: "bhb-02",
    name: "Almond & Pistachio Millet Cookies",
    slug: "almond-pistachio-millet-cookies",
    description: "Crunchy homemade cookies crafted from Ragi & Foxtail millet flour, loaded with toasted California almonds & pistachios.",
    ingredients: ["Ragi Flour", "Foxtail Millet", "Organic Jaggery Powder", "Pure Desi Ghee", "Almonds", "Pistachios"],
    price: 299,
    mrp: 380,
    weight: "250g",
    weightOptions: ["250g", "500g"],
    rating: 4.8,
    reviewsCount: 98,
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&auto=format&fit=crop&q=80"
    ],
    category: "Guilt-Free Cookies",
    healthBadges: ["No Sugar", "No Maida", "No Preservatives", "No Dalda"],
    isTopProduct: true,
    isBestSeller: true,
    isAvailable: true,
    inStock: true,
    shelfLife: "30 Days",
  },
  {
    id: "bhb-03",
    name: "Desi Ghee Date & Walnut Dry Cake",
    slug: "date-walnut-dry-cake",
    description: "Naturally sweet cake made with Arabian dates, crunchy California walnuts, whole wheat, and pure cow ghee.",
    ingredients: ["Arabian Dates", "Walnuts", "Whole Wheat Flour", "Pure Cow Ghee", "Milk", "Nutmeg"],
    price: 549,
    mrp: 700,
    weight: "500g",
    weightOptions: ["500g", "1kg"],
    rating: 4.9,
    reviewsCount: 86,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80"
    ],
    category: "Teatime Dry Bakes",
    healthBadges: ["No Sugar", "No Maida", "No Preservatives", "No Dalda"],
    isTopProduct: true,
    isBestSeller: false,
    isAvailable: true,
    inStock: true,
    shelfLife: "10 Days",
  },
  {
    id: "bhb-04",
    name: "Roasted Oats & Raisin Energy Biscuits",
    slug: "roasted-oats-raisin-biscuits",
    description: "Fiber-packed digestive biscuits made from rolled oats, golden raisins, and organic palm jaggery.",
    ingredients: ["Rolled Oats", "Whole Wheat Flour", "Golden Raisins", "Jaggery", "Desi Ghee", "Cinnamon"],
    price: 249,
    mrp: 320,
    weight: "250g",
    weightOptions: ["250g", "500g"],
    rating: 4.7,
    reviewsCount: 64,
    image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=800&auto=format&fit=crop&q=80"
    ],
    category: "Millet & Oats Bakes",
    healthBadges: ["No Sugar", "No Maida", "No Preservatives", "No Dalda"],
    isTopProduct: false,
    isBestSeller: true,
    isAvailable: true,
    inStock: true,
    shelfLife: "30 Days",
  }
];

export const products = MOCK_PRODUCTS;
export const chefs: any[] = [];
export const testimonials: any[] = [];

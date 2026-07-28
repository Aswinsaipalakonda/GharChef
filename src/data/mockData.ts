export interface Category {
  id: string;
  name: string;
  image: string;
}

export interface Chef {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviewsCount: number;
  location: string;
  image: string;
  chefImage: string; // Chef portrait
  experience: string;
  bio: string;
  isVerified: boolean;
  signatureDish: string;
  deliveryTime: string;
}

export interface Product {
  id: string;
  chefId: string;
  chefName: string;
  name: string;
  description: string;
  ingredients: string[];
  prepTime: string;
  availableQty: number;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  foodType: "veg" | "non-veg";
  spiceLevel: "mild" | "medium" | "hot";
  category: "Biryani" | "Thalis" | "Curries" | "Pickles" | "Sweets" | "Breakfast" | "Lunch" | "Dinner" | "Healthy Food" | "Festival Specials";
  isAvailable: boolean;
  isTrending?: boolean;
  isBestSeller?: boolean;
  isTodaySpecial?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  comment: string;
  chefSpecial: string;
  image: string;
}

export interface Coupon {
  code: string;
  discountType: "percentage" | "flat";
  value: number;
  minOrder: number;
  description: string;
}

// Categories list
export const categories: Category[] = [
  {
    id: "cat-biryani",
    name: "Biryani",
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "cat-thalis",
    name: "Thalis",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "cat-curries",
    name: "Curries",
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "cat-pickles",
    name: "Pickles",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "cat-sweets",
    name: "Sweets",
    image: "https://images.unsplash.com/photo-1605197586541-89499879b54b?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "cat-breakfast",
    name: "Breakfast",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "cat-healthy",
    name: "Healthy Food",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "cat-festival",
    name: "Festival Specials",
    image: "https://images.unsplash.com/photo-1605197586541-89499879b54b?q=80&w=300&auto=format&fit=crop",
  },
];

// Chefs list
export const chefs: Chef[] = [
  {
    id: "chef-ritu",
    name: "Ritu Verma",
    specialty: "North Indian Specialist",
    rating: 4.8,
    reviewsCount: 120,
    location: "Gachibowli, Hyderabad",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=600&auto=format&fit=crop",
    chefImage: "https://images.unsplash.com/photo-1594744803329-e58b31de215f?q=80&w=300&auto=format&fit=crop",
    experience: "15+ Years Cooking",
    bio: "Passionate about serving wholesome, traditional Punjabi meals. I use homeground spices and zero preservatives.",
    isVerified: true,
    signatureDish: "Paneer Butter Masala & Butter Naan",
    deliveryTime: "30-40 mins",
  },
  {
    id: "chef-swathi",
    name: "Swathi Kitchen",
    specialty: "South Indian Breakfast & Meals",
    rating: 4.7,
    reviewsCount: 96,
    location: "Madhapur, Hyderabad",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=600&auto=format&fit=crop",
    chefImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop",
    experience: "10 Years Cooking",
    bio: "Specializing in authentic, traditional Telugu breakfasts and complete thalis made with organic rice and pure ghee.",
    isVerified: true,
    signatureDish: "Ghee Karam Dosa & Steamed Idli",
    deliveryTime: "25-35 mins",
  },
  {
    id: "chef-mom",
    name: "Mom's Kitchen",
    specialty: "Hyderabadi Biryani & Mughlai",
    rating: 4.9,
    reviewsCount: 150,
    location: "Secunderabad, Hyderabad",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=600&auto=format&fit=crop",
    chefImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop",
    experience: "20+ Years Cooking",
    bio: "Cooking secret family recipes handed down through generations. Known for the most fragrant, light chicken dum biryani in town.",
    isVerified: true,
    signatureDish: "Hyderabadi Chicken Dum Biryani",
    deliveryTime: "35-45 mins",
  },
  {
    id: "chef-andhra",
    name: "Andhra Ruchulu",
    specialty: "Spicy Andhra Delicacies",
    rating: 4.8,
    reviewsCount: 110,
    location: "Kukatpally, Hyderabad",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=600&auto=format&fit=crop",
    chefImage: "https://images.unsplash.com/photo-1534751516642-a131ffd473fd?q=80&w=300&auto=format&fit=crop",
    experience: "12 Years Cooking",
    bio: "Spicy, tangy, and flavorsome Andhra curries and pickles made using cold-pressed peanut oil and local Guntur chilies.",
    isVerified: true,
    signatureDish: "Andhra Chicken Pickle & Gongura Pappu",
    deliveryTime: "30-40 mins",
  },
  {
    id: "chef-pickle",
    name: "Pickle Palace",
    specialty: "Traditional Homemade Pickles",
    rating: 4.7,
    reviewsCount: 84,
    location: "Jubilee Hills, Hyderabad",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=600&auto=format&fit=crop",
    chefImage: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=300&auto=format&fit=crop",
    experience: "25 Years Cooking",
    bio: "Grandma's recipe book brought to life. Preserved naturally under the sun, with zero artificial vinegar or colorings.",
    isVerified: true,
    signatureDish: "Avakaya Mango Pickle",
    deliveryTime: "2-3 days (Shipped)",
  },
];

// Food products list (Including all specific placeholders requested by the user)
export const products: Product[] = [
  // Biryani Placeholder
  {
    id: "prod-biryani-chicken",
    chefId: "chef-mom",
    chefName: "Mom's Kitchen",
    name: "Chicken Dum Biryani",
    description: "Premium long-grain Basmati rice layered with juicy chicken marinated in traditional spices, cooked on dum with pure ghee and saffron.",
    ingredients: ["Basmati Rice", "Chicken", "Ghee", "Mint", "Saffron", "Spices"],
    prepTime: "35-45 mins",
    availableQty: 8,
    price: 189,
    originalPrice: 229,
    discount: 17,
    rating: 4.8,
    reviewsCount: 120,
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=600&auto=format&fit=crop",
    foodType: "non-veg",
    spiceLevel: "medium",
    category: "Biryani",
    isAvailable: true,
    isTrending: true,
    isBestSeller: true,
    isTodaySpecial: true,
  },
  {
    id: "prod-biryani-veg",
    chefId: "chef-mom",
    chefName: "Mom's Kitchen",
    name: "Veg Dum Biryani",
    description: "Fragrant basmati rice layered with fresh seasonal vegetables, mint, caramelized onions, and slow-cooked to perfection in Mughlai home style.",
    ingredients: ["Basmati Rice", "Carrots", "Beans", "Paneer", "Mint", "Spices"],
    prepTime: "30-40 mins",
    availableQty: 10,
    price: 149,
    originalPrice: 179,
    discount: 16,
    rating: 4.7,
    reviewsCount: 64,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=600&auto=format&fit=crop",
    foodType: "veg",
    spiceLevel: "medium",
    category: "Biryani",
    isAvailable: true,
    isTrending: false,
  },

  // Pickles Placeholder
  {
    id: "prod-pickle-chicken",
    chefId: "chef-andhra",
    chefName: "Andhra Ruchulu",
    name: "Chicken Pickle",
    description: "Traditional boneless chicken chunks fried in cold-pressed sesame oil, blended with red chilies, mustard powder, and freshly ground ginger garlic.",
    ingredients: ["Boneless Chicken", "Sesame Oil", "Garlic", "Guntur Red Chili", "Mustard"],
    prepTime: "2-3 days",
    availableQty: 25,
    price: 249,
    originalPrice: 299,
    discount: 16,
    rating: 4.9,
    reviewsCount: 56,
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=600&auto=format&fit=crop",
    foodType: "non-veg",
    spiceLevel: "hot",
    category: "Pickles",
    isAvailable: true,
    isTrending: true,
    isTodaySpecial: true,
  },
  {
    id: "prod-pickle-mango",
    chefId: "chef-pickle",
    chefName: "Pickle Palace",
    name: "Mango Pickle",
    description: "Spicy cut-mango pickle (Avakaya) prepared with raw sour mangoes, mustard seeds, fenugreek, and cold pressed oil. Aged naturally in the sun.",
    ingredients: ["Raw Mango", "Mustard Seeds", "Fenugreek", "Cold Pressed Oil", "Salt"],
    prepTime: "2-3 days",
    availableQty: 40,
    price: 199,
    originalPrice: 249,
    discount: 20,
    rating: 4.8,
    reviewsCount: 78,
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=600&auto=format&fit=crop",
    foodType: "veg",
    spiceLevel: "hot",
    category: "Pickles",
    isAvailable: true,
    isBestSeller: true,
  },

  // Curries / Paneer Placeholder
  {
    id: "prod-curry-paneer",
    chefId: "chef-ritu",
    chefName: "Ritu Verma",
    name: "Paneer Curry",
    description: "Soft, home-made cottage cheese cubes cooked in a rich, buttery tomato-cashew gravy with a sprinkle of roasted dried fenugreek leaves.",
    ingredients: ["Paneer", "Tomatoes", "Cashews", "Butter", "Fenugreek", "Fresh Cream"],
    prepTime: "25-35 mins",
    availableQty: 12,
    price: 159,
    originalPrice: 199,
    discount: 20,
    rating: 4.7,
    reviewsCount: 86,
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=600&auto=format&fit=crop",
    foodType: "veg",
    spiceLevel: "mild",
    category: "Curries",
    isAvailable: true,
    isBestSeller: true,
    isTodaySpecial: true,
  },

  // Breakfast Placeholders
  {
    id: "prod-breakfast-poori",
    chefId: "chef-swathi",
    chefName: "Swathi Kitchen",
    name: "Poori Saagu (3pcs)",
    description: "Puffy, golden deep-fried whole wheat pooris served with a mildly-spiced potato and onion curry (saagu) and coconut chutney.",
    ingredients: ["Wheat Flour", "Potatoes", "Onions", "Ginger", "Coconut"],
    prepTime: "20-30 mins",
    availableQty: 15,
    price: 79,
    originalPrice: 99,
    discount: 20,
    rating: 4.6,
    reviewsCount: 90,
    image: "https://images.unsplash.com/photo-1627575030801-725622955f1a?q=80&w=600&auto=format&fit=crop",
    foodType: "veg",
    spiceLevel: "medium",
    category: "Breakfast",
    isAvailable: true,
    isBestSeller: true,
  },
  {
    id: "prod-breakfast-idli",
    chefId: "chef-swathi",
    chefName: "Swathi Kitchen",
    name: "Steamed Ghee Idli (4pcs)",
    description: "Soft, fluffy steamed rice-lentil cakes served hot, smeared with pure cow ghee and accompanied by tomato chutney and lentil podi.",
    ingredients: ["Rice", "Urad Dal", "Cow Ghee", "Podi Spices", "Coconut Chutney"],
    prepTime: "15-25 mins",
    availableQty: 20,
    price: 69,
    originalPrice: 79,
    discount: 12,
    rating: 4.8,
    reviewsCount: 110,
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=600&auto=format&fit=crop",
    foodType: "veg",
    spiceLevel: "mild",
    category: "Breakfast",
    isAvailable: true,
  },
  {
    id: "prod-breakfast-dosa",
    chefId: "chef-swathi",
    chefName: "Swathi Kitchen",
    name: "Masala Dosa",
    description: "Crispy fermented crepe stuffed with a flavorful spiced potato mash, cooked with pure ghee. Served with coconut chutney and hot sambar.",
    ingredients: ["Rice Batter", "Ghee", "Potatoes", "Sambar Spices", "Chutney"],
    prepTime: "20-30 mins",
    availableQty: 12,
    price: 99,
    originalPrice: 120,
    discount: 17,
    rating: 4.7,
    reviewsCount: 95,
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=600&auto=format&fit=crop",
    foodType: "veg",
    spiceLevel: "medium",
    category: "Breakfast",
    isAvailable: true,
    isTrending: true,
  },

  // Sweets / Sweets Section Placeholders
  {
    id: "prod-sweet-laddu",
    chefId: "chef-ritu",
    chefName: "Ritu Verma",
    name: "Motichoor Laddu (6pcs)",
    description: "Traditional festive sweet laddus made with fine gram flour boondi pearls fried in pure ghee, cardamom, and melon seeds.",
    ingredients: ["Gram Flour", "Pure Ghee", "Sugar Syrup", "Cardamom", "Melon Seeds"],
    prepTime: "1-2 days",
    availableQty: 20,
    price: 139,
    originalPrice: 169,
    discount: 17,
    rating: 4.8,
    reviewsCount: 52,
    image: "https://images.unsplash.com/photo-1605197586541-89499879b54b?q=80&w=600&auto=format&fit=crop",
    foodType: "veg",
    spiceLevel: "mild",
    category: "Sweets",
    isAvailable: true,
  },
  {
    id: "prod-sweet-gulabjamun",
    chefId: "chef-ritu",
    chefName: "Ritu Verma",
    name: "Gulab Jamun",
    description: "Melt-in-the-mouth khoya dumplings soaked in fresh warm sugar syrup, flavored with cardamom and rose water.",
    ingredients: ["Mawa/Khoya", "Sugar Syrup", "Cardamom", "Rose Water", "Pistachios"],
    prepTime: "1-2 days",
    availableQty: 15,
    price: 129,
    originalPrice: 159,
    discount: 18,
    rating: 4.8,
    reviewsCount: 72,
    image: "https://images.unsplash.com/photo-1605197586541-89499879b54b?q=80&w=600&auto=format&fit=crop",
    foodType: "veg",
    spiceLevel: "mild",
    category: "Sweets",
    isAvailable: true,
    isTodaySpecial: true,
  },

  // Lunch / Dinner / Thali / Healthy Placeholders
  {
    id: "prod-lunch-thali",
    chefId: "chef-ritu",
    chefName: "Ritu Verma",
    name: "Premium Veg Thali",
    description: "A complete home-cooked lunch platter of Paneer Butter Masala, Dal Makhani, Dry Sabzi, 3 soft Phulkas, Rice, Salad, Raita, and sweet.",
    ingredients: ["Paneer", "Lentils", "Atta", "Rice", "Yogurt", "Sweets"],
    prepTime: "35-45 mins",
    availableQty: 15,
    price: 219,
    originalPrice: 259,
    discount: 15,
    rating: 4.9,
    reviewsCount: 92,
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=600&auto=format&fit=crop",
    foodType: "veg",
    spiceLevel: "medium",
    category: "Lunch",
    isAvailable: true,
    isBestSeller: true,
  },
  {
    id: "prod-dinner-combo",
    chefId: "chef-ritu",
    chefName: "Ritu Verma",
    name: "Dal Tadka & Jeera Rice Combo",
    description: "Smoky yellow lentils tempered with ghee, dry red chilies, garlic, and cumin, served alongside fragrant basmati jeera rice.",
    ingredients: ["Toor Dal", "Basmati Rice", "Garlic", "Cumin Seeds", "Cow Ghee"],
    prepTime: "25-35 mins",
    availableQty: 15,
    price: 139,
    originalPrice: 159,
    discount: 12,
    rating: 4.7,
    reviewsCount: 45,
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=600&auto=format&fit=crop",
    foodType: "veg",
    spiceLevel: "medium",
    category: "Dinner",
    isAvailable: true,
  },
  {
    id: "prod-healthy-khichdi",
    chefId: "chef-ritu",
    chefName: "Ritu Verma",
    name: "Oats & Moong Dal Khichdi",
    description: "Comforting oats and yellow split moong dal cooked with minimal oil, cumin, ginger, and turmeric. High fiber and light on stomach.",
    ingredients: ["Oats", "Moong Dal", "Ginger", "Turmeric", "Carrots"],
    prepTime: "20-30 mins",
    availableQty: 10,
    price: 149,
    originalPrice: 179,
    discount: 16,
    rating: 4.8,
    reviewsCount: 38,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600&auto=format&fit=crop",
    foodType: "veg",
    spiceLevel: "mild",
    category: "Healthy Food",
    isAvailable: true,
  },
  {
    id: "prod-festive-platter",
    chefId: "chef-ritu",
    chefName: "Ritu Verma",
    name: "Diwali Special Sweet Box",
    description: "Assortment of handmade dry fruit laddus, Kaju Katli, and Besan Laddus prepared with pure ghee for festive celebrations.",
    ingredients: ["Kaju", "Dry Fruits", "Besan", "Ghee", "Cardamom"],
    prepTime: "1-2 days",
    availableQty: 30,
    price: 349,
    originalPrice: 399,
    discount: 12,
    rating: 4.9,
    reviewsCount: 67,
    image: "https://images.unsplash.com/photo-1605197586541-89499879b54b?q=80&w=600&auto=format&fit=crop",
    foodType: "veg",
    spiceLevel: "mild",
    category: "Festival Specials",
    isAvailable: true,
  }
];

// Testimonials
export const testimonials: Testimonial[] = [
  {
    id: "test-1",
    name: "Priya Sharma",
    rating: 5,
    comment: "The Chicken Dum Biryani from Mom's Kitchen was absolutely delicious! Tastes just like my mom's cooking. Will definitely order again.",
    chefSpecial: "Mom's Kitchen",
    image: "https://images.unsplash.com/photo-1594744803329-e58b31de215f?q=80&w=150&auto=format&fit=crop",
  },
  {
    id: "test-2",
    name: "Rahul Kumar",
    rating: 5,
    comment: "Amazing pickles and great packaging. Love supporting home chefs through GharChef!",
    chefSpecial: "Pickle Palace",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
  },
  {
    id: "test-3",
    name: "Anjali Reddy",
    rating: 5,
    comment: "Fresh, tasty and delivered on time. GharChef is my go-to for homemade food now.",
    chefSpecial: "Swathi Kitchen",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop",
  }
];

// Available Coupons
export const coupons: Coupon[] = [
  {
    code: "GHARCHEF10",
    discountType: "percentage",
    value: 10,
    minOrder: 199,
    description: "Get 10% OFF on your first order. Up to ₹100 discount.",
  },
  {
    code: "FREECHEF",
    discountType: "flat",
    value: 50,
    minOrder: 349,
    description: "Flat ₹50 OFF on orders above ₹349.",
  },
  {
    code: "FREEDEL",
    discountType: "flat",
    value: 30,
    minOrder: 249,
    description: "Get ₹30 OFF delivery charges on orders above ₹249.",
  }
];


export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: { url: string }[];
  category: string;
  featured: boolean;
  new: boolean;
  bestseller: boolean;
  stock: number;
  dimensions?: string;
  weight?: string;
  colors?: string[];
  materials?: string[];
  care?: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Mystique Spiral Vase",
    price: 129.99,
    description: "A captivating spiral vase that seems to dance and twist with magical energy. Each piece is uniquely hand-thrown and features a mesmerizing glaze that shifts from deep plum to amethyst, depending on the light. Perfect as a statement piece for any room.",
    images: [
      { url: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=2876&auto=format&fit=crop" },
      { url: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=2940&auto=format&fit=crop" },
      { url: "https://images.unsplash.com/photo-1582643381895-2539c9db489b?q=80&w=2940&auto=format&fit=crop" }
    ],
    category: "Tumblers",
    featured: true,
    new: false,
    bestseller: true,
    stock: 15,
    dimensions: "10\" H x 6\" W",
    weight: "3.2 lbs",
    colors: ["Plum Gradient", "Amethyst Mist"],
    materials: ["Stoneware", "Glass Glaze"],
    care: "Hand wash with mild soap. Not dishwasher safe."
  },
  {
    id: "2",
    name: "Aurora Bowl Set",
    price: 89.99,
    description: "A set of three nesting bowls featuring a stunning aurora-like glaze that mimics the magical northern lights. Each bowl transitions from deep bronze to ethereal amethyst with subtle hints of metallic shimmer. These versatile bowls are perfect for serving or as decorative pieces.",
    images: [
      { url: "https://plus.unsplash.com/premium_photo-1677176513137-482da19a110a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzN8fHNlcmFtaWMlMjBwcm9kdWN0fGVufDB8fDB8fHww" },
      { url: "https://images.unsplash.com/photo-1603975711481-98b1758b7b75?q=80&w=3029&auto=format&fit=crop" },
      { url: "https://images.unsplash.com/photo-1576020799627-aeac74d58064?q=80&w=3029&auto=format&fit=crop" }
    ],
    category: "Tumblers",
    featured: true,
    new: true,
    bestseller: false,
    stock: 10,
    dimensions: "Large: 10\" Dia, Medium: 8\" Dia, Small: 6\" Dia",
    weight: "5.1 lbs (set)",
    colors: ["Oxidized Bronze", "Amethyst Mist", "Gunmetal"],
    materials: ["Porcelain", "Reactive Glaze"],
    care: "Dishwasher safe, but hand washing recommended. Microwave safe."
  },
  {
    id: "3",
    name: "Enchanted Garden Tea Set",
    price: 159.99,
    description: "This magical tea set transforms your tea time into a whimsical experience. The set includes a teapot and four cups, each adorned with hand-painted delicate flowers that seem to bloom when filled with hot water. The reactive glaze creates unique patterns that make each set one-of-a-kind.",
    images: [
      { url: "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?q=80&w=2851&auto=format&fit=crop" },
      { url: "https://images.unsplash.com/photo-1556911899-5df3532e1414?q=80&w=3029&auto=format&fit=crop" },
      { url: "https://images.unsplash.com/photo-1606493601752-b3232eea4081?q=80&w=2946&auto=format&fit=crop" }
    ],
    category: "Ceramics",
    featured: false,
    new: false,
    bestseller: true,
    stock: 8,
    dimensions: "Teapot: 6\" H x 8\" W, Cups: 3\" H x 3\" Dia",
    weight: "3.8 lbs (set)",
    colors: ["Antique Ivory", "Velvet Mauve", "Fog Gray"],
    materials: ["Porcelain", "Non-toxic Ceramic Glaze"],
    care: "Hand wash only. Not microwave safe due to hand-painted details."
  },
  {
    id: "4",
    name: "Cosmic Drift Wall Platter",
    price: 199.99,
    description: "A stunning wall platter that captures the mysterious beauty of cosmic nebulae. This large decorative piece features swirling metallic glazes that create a hypnotic, galaxy-like pattern. Each piece is fired with a special technique that encourages the colors to blend and drift, making every platter unique.",
    images: [
      { url: "https://images.unsplash.com/photo-1686831451322-8d8e234a51e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTY0fHxzZXJhbWljJTIwcHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D" },
      { url: "https://images.unsplash.com/photo-1578749556382-b2e29721bf28?q=80&w=3029&auto=format&fit=crop" },
      { url: "https://images.unsplash.com/photo-1525974160448-038dacadcc71?q=80&w=3010&auto=format&fit=crop" }
    ],
    category: "",
    featured: true,
    new: true,
    bestseller: false,
    stock: 5,
    dimensions: "18\" Dia x 2\" D",
    weight: "6.5 lbs",
    colors: ["Deep Plum", "Gunmetal", "Amethyst Mist"],
    materials: ["Stoneware", "Metallic Glazes"],
    care: "Dust with a soft, dry cloth. Do not immerse in water."
  },
  {
    id: "5",
    name: "Whispering Reeds Incense Holder",
    price: 49.99,
    description: "This elegant incense holder mimics delicate reeds swaying in a mystical breeze. The handcrafted ceramic base features a flowing design that catches ash while creating a beautiful play of light and shadow. The matte finish in calming neutral tones complements any decor style.",
    images: [
      { url: "https://images.unsplash.com/photo-1670538593858-6752d0c1348a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTgyfHxzZXJhbWljJTIwcHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D" },
      { url: "https://images.unsplash.com/photo-1604244449430-6431e7d32f4a?q=80&w=3029&auto=format&fit=crop" },
      { url: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=3029&auto=format&fit=crop" }
    ],
    category: "",
    featured: false,
    new: true,
    bestseller: false,
    stock: 20,
    dimensions: "8\" L x 3\" W x 1.5\" H",
    weight: "1.2 lbs",
    colors: ["Fog Gray", "Antique Ivory"],
    materials: ["Ceramic", "Matte Glaze"],
    care: "Wipe with damp cloth when cool. Heat resistant but not fireproof."
  },
  {
    id: "6",
    name: "Moonlight Dinner Plate Set",
    price: 119.99,
    description: "Bring the enchantment of moonlight to your dining table with this set of four dinner Tumblers. Each plate features a gradient glaze that transitions from deep gunmetal to soft ivory, mimicking the moon's glow against the night sky. The organic shape and slightly raised rim add both beauty and practicality.",
    images: [
      { url: "https://images.unsplash.com/photo-1717852885839-166ce0621811?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTY3fHxzZXJhbWljJTIwcHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D" },
      { url: "https://images.unsplash.com/photo-1603199506016-b9a594b593c0?q=80&w=2874&auto=format&fit=crop" },
      { url: "https://images.unsplash.com/photo-1576066438507-7704e60df3cd?q=80&w=2942&auto=format&fit=crop" }
    ],
    category: "Tumblers",
    featured: true,
    new: false,
    bestseller: true,
    stock: 12,
    dimensions: "11\" Dia",
    weight: "8.4 lbs (set)",
    colors: ["Gunmetal Gray", "Fog Gray", "Antique Ivory"],
    materials: ["Stoneware", "Food-safe Glaze"],
    care: "Dishwasher and microwave safe. Avoid sudden temperature changes."
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getNewProducts = (): Product[] => {
  return products.filter(product => product.new);
};

export const getBestsellerProducts = (): Product[] => {
  return products.filter(product => product.bestseller);
};

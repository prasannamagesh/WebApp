export interface ProductBenefit {
  icon: 'shield' | 'beaker' | 'leaf';
  title: string;
  description: string;
}

export interface CatalogProduct {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  currency: string;
  rating: number;
  reviews: number;
  image: string;
  images?: string[];
  alt: string;
  badge?: string;
  concern: string;
  isBestSeller?: boolean;
  isNew?: boolean;
  description?: string;
  benefits?: ProductBenefit[];
  ingredients?: string[];
  volume?: string;
}

export const CATALOGUE: CatalogProduct[] = [
  {
    id: 'ectoin-recovery-serum',
    slug: 'ectoin-recovery-serum',
    name: 'Post Exposure Recovery Serum',
    subtitle: '2% Ectoin · Night · 30 ml',
    price: 1499,
    originalPrice: 1999,
    currency: '₹',
    rating: 4.9,
    reviews: 2418,
    image: '/images/products/ectoin-recovery-serum.png',
    images: ['/images/products/ectoin-recovery-serum.png'],
    alt: 'DermFix 2% Ectoin Post Exposure Recovery Serum',
    badge: 'Best Seller',
    concern: 'All',
    isBestSeller: true,
    volume: '30 ml',
    description: 'Lightweight recovery serum with 2% Ectoin to restore skin balance after exposure to environmental stressors. Ideal for sensitive, reactive, and compromised skin.',
    benefits: [
      { icon: 'shield', title: 'Strengthens Barrier', description: 'Restores skin barrier function and reduces sensitivity' },
      { icon: 'beaker', title: 'Clinically Proven', description: 'Formulated with ectoin, a natural osmoprotectant' },
      { icon: 'leaf', title: 'Gentle Formula', description: 'Free from harsh chemicals, suitable for all skin types' },
    ],
    ingredients: ['2% Ectoin', 'Ceramides', 'Panthenol', 'Allantoin'],
  },
  {
    id: 'brightening-serum',
    slug: 'brightening-serum',
    name: 'Brightening + Pore Refining Serum',
    subtitle: '5% Niacinamide + 1% TA · 30 ml',
    price: 1299,
    originalPrice: 1699,
    currency: '₹',
    rating: 4.8,
    reviews: 1832,
    image: '/images/products/brightening-serum.png',
    images: ['/images/products/brightening-serum.png'],
    alt: 'DermFix Brightening Serum',
    badge: 'New',
    concern: 'Brightening',
    isNew: true,
    volume: '30 ml',
    description: 'Powerful dual-action serum combining 5% Niacinamide with Tranexamic Acid to brighten dull skin, minimize pores, and improve texture for a radiant complexion.',
    benefits: [
      { icon: 'beaker', title: 'Brightens Complexion', description: 'Reduces hyperpigmentation and evens skin tone' },
      { icon: 'shield', title: 'Pore Minimizing', description: 'Visibly reduces pore appearance and refines skin texture' },
      { icon: 'leaf', title: 'Antioxidant Rich', description: 'Protects skin from environmental damage' },
    ],
    ingredients: ['5% Niacinamide', '1% Tranexamic Acid', 'Vitamin C', 'Zinc PCA'],
  },
  {
    id: 'barrier-moisturiser',
    slug: 'barrier-moisturiser',
    name: 'Barrier Repair Moisturiser',
    subtitle: 'Ceramide + Centella · 50 ml',
    price: 999,
    originalPrice: 1299,
    currency: '₹',
    rating: 4.7,
    reviews: 967,
    image: '/images/products/barrier-moisturiser.png',
    images: ['/images/products/barrier-moisturiser.png'],
    alt: 'DermFix Barrier Repair Moisturiser',
    concern: 'Dry Skin',
    volume: '50 ml',
    description: 'Rich, nourishing moisturizer enriched with ceramides and centella asiatica to repair damaged skin barrier and provide long-lasting hydration for sensitive skin.',
    benefits: [
      { icon: 'shield', title: 'Barrier Repair', description: 'Restores compromised skin barrier with ceramides' },
      { icon: 'leaf', title: 'Soothing Formula', description: 'Centella asiatica calms and reduces inflammation' },
      { icon: 'beaker', title: '24-Hour Hydration', description: 'Provides deep, lasting moisture without heaviness' },
    ],
    ingredients: ['3 Ceramides', 'Centella Asiatica', 'Hyaluronic Acid', 'Niacinamide'],
  },
  {
    id: 'spf-sunscreen',
    slug: 'spf-sunscreen',
    name: 'Ultra-Light SPF 50 PA++++',
    subtitle: 'Invisible Fluid · Daily · 50 ml',
    price: 1199,
    originalPrice: 1499,
    currency: '₹',
    rating: 4.6,
    reviews: 714,
    image: '/images/products/spf-sunscreen.png',
    images: ['/images/products/spf-sunscreen.png'],
    alt: 'DermFix SPF 50 Sunscreen',
    concern: 'Sun Care',
    isBestSeller: true,
    volume: '50 ml',
    description: 'Lightweight, invisible SPF 50 PA++++ sunscreen that provides broad-spectrum UV protection without leaving a white cast. Perfect for daily use on all skin types.',
    benefits: [
      { icon: 'shield', title: 'Broad Spectrum', description: 'SPF 50 PA++++ protection against UVA and UVB' },
      { icon: 'beaker', title: 'Weightless Formula', description: 'Invisible finish with no white cast or greasiness' },
      { icon: 'leaf', title: 'Water Resistant', description: 'Stays effective for up to 80 minutes in water' },
    ],
    ingredients: ['Titanium Dioxide', 'Zinc Oxide', 'Centella Asiatica', 'Vitamin E'],
  },
  {
    id: 'retinol-night-cream',
    slug: 'retinol-night-cream',
    name: 'Retinol Night Renewal Cream',
    subtitle: '0.3% Retinol · Advanced · 40 ml',
    price: 1599,
    originalPrice: 2099,
    currency: '₹',
    rating: 4.8,
    reviews: 1245,
    image: '/images/products/retinol-night-cream.png',
    images: ['/images/products/retinol-night-cream.png'],
    alt: 'DermFix Retinol Night Renewal Cream',
    concern: 'Anti-Aging',
    isBestSeller: true,
    volume: '40 ml',
    description: 'Advanced retinol cream with 0.3% stabilized retinol to reduce fine lines, improve skin texture, and promote cellular renewal overnight.',
    benefits: [
      { icon: 'beaker', title: 'Anti-Aging Action', description: 'Reduces fine lines and improves skin elasticity' },
      { icon: 'shield', title: 'Gentle Delivery', description: 'Microencapsulated retinol minimizes irritation' },
      { icon: 'leaf', title: 'Overnight Renewal', description: 'Works while you sleep for visible results' },
    ],
    ingredients: ['0.3% Retinol', 'Squalane', 'Peptides', 'Hyaluronic Acid'],
  },
  {
    id: 'hyaluronic-hydration-serum',
    slug: 'hyaluronic-hydration-serum',
    name: 'Hyaluronic Hydration Boost Serum',
    subtitle: '3% HA Complex · Hydrating · 30 ml',
    price: 899,
    currency: '₹',
    rating: 4.7,
    reviews: 892,
    image: '/images/products/hyaluronic-hydration-serum.png',
    images: ['/images/products/hyaluronic-hydration-serum.png'],
    alt: 'DermFix Hyaluronic Hydration Serum',
    concern: 'Hydration',
    volume: '30 ml',
    description: 'Multi-weight hyaluronic acid complex that penetrates all skin layers to provide intense hydration and plump fine lines for a dewy, youthful glow.',
    benefits: [
      { icon: 'beaker', title: 'Triple Hydration', description: 'Multi-weight HA for layered hydration' },
      { icon: 'leaf', title: 'Plumping Effect', description: 'Reduces fine lines and creases with moisture' },
      { icon: 'shield', title: 'Lightweight Feel', description: 'Hydrating without heaviness or stickiness' },
    ],
    ingredients: ['3% HA Complex', 'Glycerin', 'Allantoin', 'Panthenol'],
  },
  {
    id: 'vitamin-c-brightening',
    slug: 'vitamin-c-brightening',
    name: 'Vitamin C Radiance Serum',
    subtitle: '15% L-Ascorbic Acid · Brightening · 30 ml',
    price: 1399,
    originalPrice: 1799,
    currency: '₹',
    rating: 4.9,
    reviews: 1756,
    image: '/images/products/vitamin-c-brightening.png',
    images: ['/images/products/vitamin-c-brightening.png'],
    alt: 'DermFix Vitamin C Radiance Serum',
    concern: 'Brightening',
    badge: 'Best Seller',
    isBestSeller: true,
    volume: '30 ml',
    description: 'Pure 15% L-Ascorbic Acid serum with ferulic acid and vitamin E to brighten dull skin, fade dark spots, and boost collagen production for radiant, glowing skin.',
    benefits: [
      { icon: 'beaker', title: 'Brightens Skin', description: 'High potency vitamin C for visible radiance' },
      { icon: 'shield', title: 'Antioxidant Power', description: 'Protects against free radical damage and aging' },
      { icon: 'leaf', title: 'Collagen Boost', description: 'Stimulates collagen synthesis for firmer skin' },
    ],
    ingredients: ['15% L-Ascorbic Acid', 'Ferulic Acid', 'Vitamin E', 'Hyaluronic Acid'],
  },
  {
    id: 'peptide-eye-cream',
    slug: 'peptide-eye-cream',
    name: 'Peptide Eye Contour Cream',
    subtitle: 'Peptides + Caffeine · Firming · 15 ml',
    price: 899,
    originalPrice: 1199,
    currency: '₹',
    rating: 4.6,
    reviews: 634,
    image: '/images/products/peptide-eye-cream.png',
    images: ['/images/products/peptide-eye-cream.png'],
    alt: 'DermFix Peptide Eye Cream',
    concern: 'Anti-Aging',
    volume: '15 ml',
    description: 'Specialized eye cream with peptides and caffeine to reduce dark circles, puffiness, and fine lines around delicate eye area for a brighter, more awake appearance.',
    benefits: [
      { icon: 'beaker', title: 'Dark Circle Fighter', description: 'Caffeine reduces under-eye darkness and puffiness' },
      { icon: 'shield', title: 'Firming Action', description: 'Peptides strengthen and tighten delicate skin' },
      { icon: 'leaf', title: 'Gentle Formula', description: 'Hypoallergenic and safe for sensitive eyes' },
    ],
    ingredients: ['Peptide Complex', 'Caffeine', 'Hyaluronic Acid', 'Vitamin K'],
  },
];

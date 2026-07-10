import ProductDetail, { type ProductProps } from '@/components/ProductDetail';

// ─── Product data ─────────────────────────────────────────────────
// Swap this object with a database fetch to render any future product.
const SERUM_PRODUCT: ProductProps = {
  title: 'Post Exposure Recovery Serum',
  subtitle: '2% Ectoin Technology',
  tagline: 'Night · Preventive Skin Science',
  price: 1499,
  originalPrice: 1999,
  currency: '₹',
  volume: '30 ml / 1.01 fl oz',
  rating: 4.8,
  reviewCount: 312,
  images: [
    {
      src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-07-10%20at%2010.35.11%20PM-cE1jNUKGewZbsKQQeMilLjhlCDhwMW.jpeg',
      alt: 'DermFix 2% Ectoin Post Exposure Recovery Serum — product bottle',
    },
    {
      src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-07-10%20at%2010.37.21%20PM-mW7btvRX8ict7F9JUKRuXb9Pg3iz0N.jpeg',
      alt: 'DermFix 2% Ectoin Post Exposure Recovery Serum — lifestyle application shot',
    },
  ],
  description:
    'A lightweight, fast-absorbing night serum powered by 2% Ectoin — a natural extremolyte that shields skin cells from environmental stress. Formulated to repair barrier damage, deeply hydrate, and restore radiance while you sleep.',
  benefits: [
    {
      icon: 'shield',
      title: 'Barrier Repair',
      description: 'Strengthens and rebuilds the skin barrier with Ceramide Complex, Panthenol and Squalane.',
    },
    {
      icon: 'beaker',
      title: 'Clinically Active',
      description: 'Powered by 2% Ectoin, 2% Niacinamide, 1% Tranexamic Acid and 0.5% Centella Extract.',
    },
    {
      icon: 'leaf',
      title: 'Fragrance-Free Formula',
      description: 'Dermatologist-tested and free of fragrance, parabens and harsh sensitisers — safe for all skin types.',
    },
  ],
  ingredients: [
    'Ectoin 2%',
    'Niacinamide 2%',
    'Tranexamic Acid 1%',
    'Centella Extract 0.5%',
    'Sodium Hyaluronate',
    'Ceramide Complex',
    'Squalane',
    'Panthenol',
  ],
  badges: ['Dermatologically Tested', 'Clinically Proven', 'Fragrance Free', 'All Skin Types'],
};

export default function Home() {
  return (
    <main className="pt-[62px] lg:pt-[70px]">
      <ProductDetail {...SERUM_PRODUCT} />
    </main>
  );
}

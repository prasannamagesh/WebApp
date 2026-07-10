import { notFound } from 'next/navigation';
import ProductDetail from '@/components/ProductDetail';
import { CATALOGUE } from '@/data/products';

export async function generateStaticParams() {
  if (!CATALOGUE) return [];
  return CATALOGUE.map((product) => ({
    slug: product.slug,
  }));
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = CATALOGUE.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  return (
    <ProductDetail
      title={product.name}
      subtitle={product.subtitle}
      tagline={product.concern}
      price={product.price}
      originalPrice={product.originalPrice}
      currency={product.currency}
      volume={product.volume || ''}
      rating={product.rating}
      reviewCount={product.reviews}
      images={
        product.images?.map((img) => ({
          src: img,
          alt: product.alt,
        })) || [{ src: product.image, alt: product.alt }]
      }
      benefits={product.benefits || []}
      ingredients={product.ingredients || []}
      badges={product.badge ? [product.badge] : []}
      description={product.description || ''}
    />
  );
}

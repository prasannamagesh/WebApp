import HeroSection from '@/components/HeroSection';
import ProductGrid from '@/components/ProductGrid';
import BrandStory from '@/components/BrandStory';
import ScienceSection from '@/components/ScienceSection';
import ShopByConcern from '@/components/ShopByConcern';
import SkinTestBanner from '@/components/SkinTestBanner';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="pt-[62px] lg:pt-[70px]">
      <HeroSection />
      <ProductGrid />
      <BrandStory />
      <ScienceSection />
      <ShopByConcern />
      <SkinTestBanner />
      <Testimonials />
      <Footer />
    </main>
  );
}

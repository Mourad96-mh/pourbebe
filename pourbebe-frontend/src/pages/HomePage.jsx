import HeroSection from "../components/home/HeroSection";
import CategoryGrid from "../components/home/CategoryGrid";
import FeaturedProducts from "../components/home/FeaturedProducts";
import BirthListBanner from "../components/home/BirthListBanner";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoryGrid />
      <FeaturedProducts />
      <BirthListBanner />
    </>
  );
}

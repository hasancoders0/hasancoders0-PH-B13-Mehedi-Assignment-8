import Hero from "@/components/home/Hero";
import PopularProducts from "@/components/home/PopularProducts";
import SummerTips from "@/components/home/SummerTips";
import TopBrands from "@/components/home/TopBrands";

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-16">

      <Hero />

      <PopularProducts />

      <SummerTips />

      <TopBrands />

    </div>
  );
}
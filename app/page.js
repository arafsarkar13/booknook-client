import { Suspense } from "react";
import HeroSlider from "@/components/HeroSlider";
import NewArrivals from "@/components/NewArrivals";
import HowItWorks from "@/components/HowItWorks";
import AdSection from "@/components/AdSection";
import TopCategories from "@/components/TopCategories";
import CtaBanner from "@/components/CtaBanner";

export default function Home() {
  return (
    <div className="space-y-24 pb-10">
      {/* The negative top margin slides the hero up behind the floating navbar */}
      <div className="-mt-28">
        <Suspense
          fallback={
            <div className="h-[540px] animate-pulse bg-base-200 md:h-[620px]" />
          }
        >
          <HeroSlider />
        </Suspense>
      </div>
      <NewArrivals />
      <HowItWorks />
      <AdSection />
      <TopCategories />
      <CtaBanner />
    </div>
  );
}

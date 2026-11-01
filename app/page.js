import { Suspense } from "react";
import HeroSlider from "@/components/HeroSlider";
import NewArrivals from "@/components/NewArrivals";

export default function Home() {
  return (
    <div className="space-y-20 pb-10">
      <Suspense
        fallback={
          <div className="glass mx-auto h-[460px] max-w-6xl animate-pulse md:h-[520px]" />
        }
      >
        <HeroSlider />
      </Suspense>
      <NewArrivals />
    </div>
  );
}

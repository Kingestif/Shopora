import DualUserSection from "@/components/landing/Dual-User";
import FeatureGrid from "@/components/landing/Features";
import Hero from "@/components/landing/Hero";

export default function Home() {
  return (
    <div>
      <Hero/>
      <FeatureGrid/>
      <DualUserSection/>
    </div>
  );
}
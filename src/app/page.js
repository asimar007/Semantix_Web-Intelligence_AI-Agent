import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { ArchitectureSection } from "@/components/ArchitectureSection";
import { UseCasesSection } from "@/components/UseCasesSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

export default function LandingPage() {
  return (
    <>
      <Header />
      <HeroSection />
      <FeaturesSection />
      <ArchitectureSection />
      <UseCasesSection />
      <CTASection />
      <Footer />
    </>
  );
}

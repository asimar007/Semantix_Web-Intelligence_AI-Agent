import Features from "@/components/features";
import Footer from "@/components/Footer";
import Hero from "@/components/hero";
import FAQ from "@/components/faq";
import { Navbar } from "@/components/navbar";
import { ArchitectureSection } from "@/components/ArchitectureSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-16 xs:pt-20 sm:pt-24">
        <Hero />
        <Features />
        <ArchitectureSection />
        <FAQ />
        <Footer />
      </main>
    </>
  );
}

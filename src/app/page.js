import Features from "@/components/features";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
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
        <Footer />
      </main>
    </>
  );
}

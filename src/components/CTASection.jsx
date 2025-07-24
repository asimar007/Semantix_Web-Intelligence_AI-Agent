import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="relative z-10 py-20 bg-black/10 backdrop-blur-sm">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
          Ready to Transform Your Web Intelligence?
        </h2>
        <p className="mb-8 text-xl text-gray-300">
          Start processing websites with AI-powered semantic search and
          intelligent content extraction.
        </p>
        <div className="flex justify-center">
          <Button
            asChild
            size="lg"
            className="bg-white px-8 py-3 text-black hover:bg-gray-100"
          >
            <Link href="/playground">
              Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

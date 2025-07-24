import Link from "next/link";
import { ArrowRight, Bug } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function HeroSection() {
  return (
    <section className="relative z-10 overflow-hidden py-20 lg:py-32">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Bug className="w-5 h-5 text-green-500" />
            <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 backdrop-blur-sm">
              AI-Agent Web Intelligence
            </Badge>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Semantix
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent">
              Web Intelligence AI Agent
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto backdrop-blur-sm bg-black/20 rounded-lg p-4">
            Transform any website into a searchable knowledge base with advanced
            AI processing, semantic search, and intelligent content extraction.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/playground">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-8 py-6 shadow-2xl shadow-purple-500/25 cursor-pointer"
              >
                Start Processing <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Enhanced Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-purple-500/30 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-cyan-500/30 rounded-full blur-xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-500/20 rounded-full blur-lg animate-bounce delay-500" />
    </section>
  );
}

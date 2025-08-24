"use client";
import { Brain, Database, Globe, Search, Zap, Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="relative z-10 py-20 bg-black/20 backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Advanced AI Capabilities
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Powered by cutting-edge technology stack including Next.js 15,
            Google Gemini AI, and PineconeDB
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-white">
                Advanced Web Scraping
              </CardTitle>
              <CardDescription className="text-gray-300">
                Dual-engine approach combining Cheerio and Puppeteer for
                comprehensive content extraction
              </CardDescription>
            </CardHeader>
            <CardContent className="text-gray-400">
              <ul className="space-y-2">
                <li>• Static & dynamic content processing</li>
                <li>• Intelligent content filtering</li>
                <li>• Link analysis & categorization</li>
                <li>• Automatic fallback mechanisms</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-white">
                AI-Powered Processing
              </CardTitle>
              <CardDescription className="text-gray-300">
                Smart text chunking and semantic embeddings using Google
                Gemini's latest models
              </CardDescription>
            </CardHeader>
            <CardContent className="text-gray-400">
              <ul className="space-y-2">
                <li>• LangChain text splitters</li>
                <li>• Content filtering & optimization</li>
                <li>• High-quality vector representations</li>
                <li>• Batch processing with rate limiting</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4">
                <Database className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-white">
                Vector Database Storage
              </CardTitle>
              <CardDescription className="text-gray-300">
                PineconeDB integration with cloud-based storage and semantic
                search capabilities
              </CardDescription>
            </CardHeader>
            <CardContent className="text-gray-400">
              <ul className="space-y-2">
                <li>• Multi-tenant architecture</li>
                <li>• Metadata management</li>
                <li>• Duplicate prevention</li>
                <li>• Similarity-based retrieval</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-4">
                <Search className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-white">Semantic Search</CardTitle>
              <CardDescription className="text-gray-300">
                Advanced similarity search with configurable parameters and
                URL-specific filtering
              </CardDescription>
            </CardHeader>
            <CardContent className="text-gray-400">
              <ul className="space-y-2">
                <li>• Context-aware search results</li>
                <li>• Configurable top-K results</li>
                <li>• Website-specific filtering</li>
                <li>• Real-time query processing</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-white">Terminal Processing</CardTitle>
              <CardDescription className="text-gray-300">
                Interactive terminal interface with typewriter effects and
                step-by-step processing visualization
              </CardDescription>
            </CardHeader>
            <CardContent className="text-gray-400">
              <ul className="space-y-2">
                <li>• Terminal-style command display</li>
                <li>• Typewriter animation effects</li>
                <li>• Auto-scrolling terminal output</li>
                <li>• Visual processing indicators</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-white">
                Performance Optimized
              </CardTitle>
              <CardDescription className="text-gray-300">
                Enhanced memory allocation, concurrent processing, and
                intelligent caching
              </CardDescription>
            </CardHeader>
            <CardContent className="text-gray-400">
              <ul className="space-y-2">
                <li>• Text size limiting (50K chars)</li>
                <li>• Parallel processing</li>
                <li>• Collection-level caching</li>
                <li>• Resource limit protection</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

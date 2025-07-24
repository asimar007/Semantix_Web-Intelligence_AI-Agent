"use client";
import { Bug } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Header() {
  return (
    <nav className="relative z-10 border-b border-white/10 bg-black/30 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <Bug className="w-8 h-8 text-red-500" />
            <span className="text-xl font-bold text-white">Semantix</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <button
              className="text-gray-300 hover:text-white transition-colors bg-transparent border-none cursor-pointer"
              onClick={() => {
                document
                  .getElementById("features")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Features
            </button>
            <button
              className="text-gray-300 hover:text-white transition-colors bg-transparent border-none cursor-pointer"
              onClick={() => {
                document
                  .getElementById("architecture")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Architecture
            </button>
            <button
              className="text-gray-300 hover:text-white transition-colors bg-transparent border-none cursor-pointer"
              onClick={() => {
                document
                  .getElementById("use-cases")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Use Cases
            </button>
            <Link href="/playground">
              <Button
                variant="outline"
                className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white bg-transparent"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

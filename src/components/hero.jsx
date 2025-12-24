import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Github } from "lucide-react";
import React from "react";

const Hero = () => {
  return (
    <div className="min-h-[calc(100vh-6rem)] flex flex-col items-center py-20 px-6">
      <div className="md:mt-6 flex items-center justify-center">
        <div className="text-center max-w-2xl">
          <h1 className="mt-6 max-w-[20ch] text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold !leading-[1.2] tracking-tight">
            Semantix - Web Intelligence AI Agent
          </h1>
          <p className="mt-6 max-w-[60ch] xs:text-lg">
            Autonomous AI agent that scrapes, analyzes, and semantically indexes
            web content using embeddings and vector search.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center sm:justify-center gap-4">
            <Link href="/playground">
              <Button
                size="lg"
                className="w-full sm:w-auto rounded-full text-base cursor-pointer"
              >
                Get Started <ArrowUpRight className="!h-5 !w-5" />
              </Button>
            </Link>
            <Link
              href="https://github.com/asimar007/Semantix_Web-Intelligence_AI-Agent"
              target="_blank"
            >
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto rounded-full text-base shadow-none cursor-pointer"
              >
                <Github className="!h-5 !w-5" /> Github
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

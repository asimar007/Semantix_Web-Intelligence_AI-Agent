"use client";

import { useState } from "react";
import { SimpleHeader } from "@/components/SimpleHeader";
import { Button } from "@/components/ui/button";
import ChatWindow from "@/components/ChatWindow";
import ProcessingTerminal from "@/components/ProcessingTerminal";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Globe, MessageCircle, Loader2, Brain } from "lucide-react";
import Image from "next/image";

export default function PlaygroundPage() {
  const [currentUrl, setCurrentUrl] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [currentStep, setCurrentStep] = useState(-1);
  const [processingError, setProcessingError] = useState("");

  const processingSteps = [
    {
      command: "$ initialize_scraper --target=website",
      details: "Setting up web scraping environment...",
      subSteps: [
        "Loading Cheerio parser",
        "Initializing Puppeteer",
        "Setting user agent",
      ],
    },
    {
      command: "$ connect --url=" + url,
      details: "Establishing connection to target website...",
      subSteps: [
        "Resolving DNS",
        "Establishing TCP connection",
        "Sending HTTP request",
      ],
    },
    {
      command: "$ authenticate --agent=spider",
      details: "Authenticating with website...",
      subSteps: [
        "Validating SSL certificate",
        "Setting headers",
        "Bypassing rate limits",
      ],
    },
    {
      command: "$ fetch_content --extract=all",
      details: "Extracting website content...",
      subSteps: [
        "Parsing HTML structure",
        "Extracting text content",
        "Finding links and images",
      ],
    },
    {
      command: "$ process_content --ai=enabled",
      details: "Processing content with AI...",
      subSteps: [
        "Chunking text content",
        "Generating embeddings",
        "Optimizing for search",
      ],
    },
    {
      command: "$ store_vectors --database=chroma",
      details: "Storing in vector database...",
      subSteps: [
        "Connecting to ChromaDB",
        "Indexing vectors",
        "Creating metadata",
      ],
    },
    {
      command: "$ initialize_chat --ready=true",
      details: "Chat interface ready!",
      subSteps: [
        "Loading AI model",
        "Preparing context",
        "Ready for questions",
      ],
    },
  ];

  const handleUrlSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setProcessingError("");

    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }

    // Basic URL validation
    try {
      new URL(url);
    } catch {
      setError("Please enter a valid URL");
      return;
    }

    setIsProcessing(true);
    setCurrentUrl("");
    setCurrentStep(0);

    try {
      // Step 1-3: Initialize scraper, connect, authenticate
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setCurrentStep(1);
      await new Promise((resolve) => setTimeout(resolve, 800));
      setCurrentStep(2);
      await new Promise((resolve) => setTimeout(resolve, 600));
      setCurrentStep(3);

      // Step 4: Fetch content
      const scrapeResponse = await fetch("/api/scrape", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: url.trim() }),
      });

      const scrapeData = await scrapeResponse.json();

      if (!scrapeResponse.ok) {
        throw new Error(scrapeData.error || "Failed to scrape website");
      }

      setCurrentStep(4);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Step 5-6: Process and store
      setCurrentStep(5);
      const embedResponse = await fetch("/api/embed", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: scrapeData.content,
          url: url.trim(),
        }),
      });

      if (!embedResponse.ok) {
        const embedData = await embedResponse.json();
        throw new Error(embedData.error || "Failed to embed content");
      }

      setCurrentStep(6);
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Complete
      setCurrentUrl(url.trim());
      setCurrentStep(-1);
    } catch (error) {
      setProcessingError(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Full page background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <Image
            src="/images/clean-abstract-bg.png"
            alt="Abstract geometric background"
            fill
            className="object-cover object-center opacity-90"
            style={{
              transform: "scale(1.25)",
            }}
            priority={true}
            quality={90}
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
      </div>

      {/* Header Component */}
      <SimpleHeader />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Chat with Any Website
          </h1>
          <p className="text-lg text-gray-200 mb-12 max-w-2xl mx-auto">
            Transform any website into an intelligent conversation. Enter a URL
            and start asking questions about the content.
          </p>

          {/* URL Input Form */}
          <div className="max-w-2xl mx-auto mb-12">
            <form onSubmit={handleUrlSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com"
                    disabled={isProcessing}
                    className="w-full px-4 py-3 bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isProcessing || !url.trim()}
                  className="bg-white border border-gray-300 text-black px-6 py-6 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Start Chat"
                  )}
                </Button>
              </div>

              {error && (
                <div className="p-3 bg-red-500/20 text-red-300 border border-red-500/30 rounded-lg backdrop-blur-sm">
                  <p className="text-sm">{error}</p>
                </div>
              )}
            </form>
          </div>

          {/* Processing Terminal */}
          {isProcessing && (
            <ProcessingTerminal
              steps={processingSteps}
              currentStep={currentStep}
              error={processingError}
            />
          )}
        </section>

        {/* Chat Section */}
        {currentUrl && (
          <section className="pb-0 md:pb-8">
            <div className="w-screen md:w-full md:max-w-4xl mx-auto bg-black/40 backdrop-blur-sm border-0 md:border border-white/20 rounded-none md:rounded-lg overflow-hidden">
              <div className="bg-black/60 px-4 py-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-cyan-400" />
                  <h2 className="text-sm font-medium text-white">
                    Chat Interface
                  </h2>
                </div>
                <p className="text-xs text-gray-300 mt-1">
                  Currently chatting with: {currentUrl}
                </p>
              </div>
              <ChatWindow currentUrl={currentUrl} />
            </div>
          </section>
        )}

        {/* Features Section */}
        {!currentUrl && (
          <section className="py-16 bg-black/20 backdrop-blur-sm">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                How It Works
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Experience the power of AI-driven web intelligence with our
                advanced processing pipeline
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-white">
                    Smart Web Scraping
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Advanced content extraction from any website with
                    intelligent parsing and fallback mechanisms
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
                  <CardTitle className="text-white">AI Processing</CardTitle>
                  <CardDescription className="text-gray-300">
                    Content is processed using advanced AI embeddings for
                    semantic understanding and intelligent responses
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
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-white">Natural Chat</CardTitle>
                  <CardDescription className="text-gray-300">
                    Ask questions in natural language and get intelligent
                    responses based on website content
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-gray-400">
                  <ul className="space-y-2">
                    <li>• Context-aware search results</li>
                    <li>• Real-time query processing</li>
                    <li>• Website-specific filtering</li>
                    <li>• Intelligent response generation</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

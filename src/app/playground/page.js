"use client";

import { useState } from "react";
import { PlaygroundHeader } from "@/components/playgroundHeader";
import { Button } from "@/components/ui/button";
import ChatInterface from "@/components/chat/ChatInterface";
import ProcessingTerminal from "@/components/processingTerminal";
import { MessageCircle, Loader2 } from "lucide-react";

export default function PlaygroundPage() {
  const [currentUrl, setCurrentUrl] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [currentStep, setCurrentStep] = useState(-1);
  const [processingError, setProcessingError] = useState("");

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
    <div className="min-h-screen bg-background text-foreground">
      {/* Header Component - Always visible */}
      <div className="fixed top-0 left-0 right-0 z-50 p-4 flex justify-center pointer-events-none">
        <div className="pointer-events-auto w-full max-w-screen-xl">
          <PlaygroundHeader />
        </div>
      </div>

      {/* Main Content Area */}
      {currentUrl ? (
        // Full Screen Chat View
        <div className="fixed inset-0 top-0 pt-[88px] pb-4 px-4 bg-background animate-in fade-in duration-300">
          <div className="h-full w-full max-w-5xl mx-auto rounded-3xl overflow-hidden border border-border/50 shadow-2xl bg-background/50 backdrop-blur-sm">
            <ChatInterface
              currentUrl={currentUrl}
              onClose={() => setCurrentUrl("")}
            />
          </div>
        </div>
      ) : (
        // Hero & Input View
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32">
          {/* Hero Section */}
          <section className="py-16 text-center animate-in fade-in zoom-in duration-500">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
              Chat with Any Website
            </h1>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              Transform any website into an intelligent conversation. Enter a
              URL and start asking questions about the content.
            </p>

            {/* URL Input Form */}
            <div className="max-w-2xl mx-auto mb-12">
              <form onSubmit={handleUrlSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://example.com"
                      disabled={isProcessing}
                      className="w-full h-14 px-6 bg-muted border border-input rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm text-lg"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isProcessing || !url.trim()}
                    className="h-14 px-8 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium text-lg shadow-lg shadow-primary/20 hover:shadow-primary/30"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Start Chat"
                    )}
                  </Button>
                </div>

                {error && (
                  <div className="p-4 bg-destructive/10 text-destructive border border-destructive/20 rounded-xl animate-in slide-in-from-top-2">
                    <p className="text-sm font-medium">{error}</p>
                  </div>
                )}
              </form>
            </div>

            {/* Processing Terminal */}
            {isProcessing && (
              <div className="max-w-2xl mx-auto text-left">
                <ProcessingTerminal
                  currentStep={currentStep}
                  error={processingError}
                />
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}

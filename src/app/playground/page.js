"use client";

import { useState } from "react";
import { SimpleHeader } from "@/components/SimpleHeader";
import { Button } from "@/components/ui/button";
import ChatWindow from "@/components/ChatWindow";
import ProcessingTerminal from "@/components/ProcessingTerminal";
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
    <div className="min-h-screen">
      {/* Header Component */}
      <SimpleHeader />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 xs:pt-20 sm:pt-24">
        {/* Hero Section */}
        <section className="py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Chat with Any Website
          </h1>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
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
                    className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isProcessing || !url.trim()}
                  className="px-6 py-6 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
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
                <div className="p-3 bg-destructive/10 text-destructive border border-destructive/20 rounded-lg">
                  <p className="text-sm">{error}</p>
                </div>
              )}
            </form>
          </div>

          {/* Processing Terminal */}
          {isProcessing && (
            <ProcessingTerminal
              currentStep={currentStep}
              error={processingError}
            />
          )}
        </section>

        {/* Chat Section */}
        {currentUrl && (
          <section className="pb-0 md:pb-8">
            <div className="w-screen md:w-full md:max-w-4xl mx-auto bg-card border rounded-none md:rounded-lg overflow-hidden shadow-sm">
              <div className="px-4 py-3 border-b">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-primary" />
                  <h2 className="text-sm font-medium">Chat Interface</h2>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Currently chatting with: {currentUrl}
                </p>
              </div>
              <ChatWindow currentUrl={currentUrl} />
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

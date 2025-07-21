"use client";

import { useState } from "react";
import UrlInput from "../components/UrlInput";
import ChatWindow from "../components/ChatWindow";

export default function HomePage() {
  const [currentUrl, setCurrentUrl] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState("");

  const handleUrlSubmit = async (url) => {
    setIsProcessing(true);
    setStatus("Scraping website content...");
    setCurrentUrl("");

    setStatus("Scraping website content...");
    const scrapeResponse = await fetch("/api/scrape", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    const scrapeData = await scrapeResponse.json();

    setStatus("Processing and embedding content...");
    await fetch("/api/embed", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: scrapeData.content,
        url: url,
      }),
    });

    setStatus("");
    setCurrentUrl(url);
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="text-center py-12 px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Chat with Website Data
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Enter any website URL and start chatting with its content using AI.
          Get instant answers and insights from any webpage.
        </p>
      </header>

      <main className="container mx-auto px-6 pb-12">
        <div className="mb-8">
          <UrlInput onUrlSubmit={handleUrlSubmit} isProcessing={isProcessing} />
        </div>

        {status && (
          <div className="max-w-2xl mx-auto mb-8">
            <div
              className={`p-4 rounded-lg text-center ${
                status.startsWith("Error:")
                  ? "bg-red-50 text-red-800 border border-red-200"
                  : "bg-blue-50 text-blue-800 border border-blue-200"
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                {!status.startsWith("Error:") && (
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                )}
                <span className="font-medium">{status}</span>
              </div>
            </div>
          </div>
        )}

        <div className="mb-8">
          <ChatWindow currentUrl={currentUrl} />
        </div>
      </main>

      <footer className="text-center py-8 text-gray-500 text-sm">
        <p>Built with Next.js, OpenAI, and ChromaDB</p>
      </footer>
    </div>
  );
}

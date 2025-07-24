"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

export default function UrlInput({ onUrlSubmit, isProcessing }) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }

    onUrlSubmit(url.trim());
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Enter Website URL
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            disabled={isProcessing}
            className="flex-1"
          />
          <Button type="submit" disabled={isProcessing || !url.trim()}>
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Process Website"
            )}
          </Button>
        </div>

        {error && (
          <p className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}

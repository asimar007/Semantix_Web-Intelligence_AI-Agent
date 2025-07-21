"use client";

import { useState } from "react";

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

    // Basic URL validation
    try {
      new URL(url);
    } catch {
      setError("Please enter a valid URL");
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
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            disabled={isProcessing}
            className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg text-base 
                     focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                     disabled:bg-gray-100 disabled:cursor-not-allowed transition-all duration-200"
          />
          <button
            type="submit"
            disabled={isProcessing || !url.trim()}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg
                     hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200
                     disabled:bg-gray-400 disabled:cursor-not-allowed
                     transition-all duration-200 whitespace-nowrap"
          >
            {isProcessing ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
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
                Processing...
              </span>
            ) : (
              "Process Website"
            )}
          </button>
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

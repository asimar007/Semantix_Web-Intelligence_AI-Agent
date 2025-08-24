export default function ProcessingTerminal({ steps, currentStep, error }) {
  const processSteps = [
    "Initializing scraper",
    "Connecting to website",
    "Fetching content",
    "Processing data",
    "Generating embeddings",
    "Storing vectors",
    "Ready to chat",
  ];

  return (
    <div className="max-w-2xl mx-auto mb-8">
      <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-black/30 px-4 py-3 border-b border-white/10">
          <h3 className="text-sm font-medium text-white">Processing Status</h3>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {processSteps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;
            const isPending = index > currentStep;

            return (
              <div key={index} className="flex items-center gap-3">
                {/* Status Icon */}
                <div className="flex-shrink-0">
                  {isCompleted && (
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                  {isCurrent && (
                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                  {isPending && (
                    <div className="w-5 h-5 bg-white/20 rounded-full"></div>
                  )}
                </div>

                {/* Step Text */}
                <span
                  className={`text-sm ${
                    isCompleted
                      ? "text-gray-300"
                      : isCurrent
                      ? "text-blue-400 font-medium"
                      : "text-gray-500"
                  }`}
                >
                  {step}
                </span>
              </div>
            );
          })}

          {/* Error State */}
          {error && (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-md">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-sm text-red-300">Error: {error}</span>
              </div>
            </div>
          )}

          {/* Completion State */}
          {currentStep >= processSteps.length && !error && (
            <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-md">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-sm text-green-300 font-medium">
                  Ready to chat!
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

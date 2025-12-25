import { Check, Loader2, Terminal, AlertCircle, Circle } from "lucide-react";

export default function ProcessingTerminal({ currentStep, error }) {
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
    <div className="max-w-2xl mx-auto mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-background/80 backdrop-blur-md border border-border/40 rounded-xl overflow-hidden shadow-sm">
        {/* Header */}
        <div className="bg-muted/30 px-4 py-3 border-b border-border/40 flex items-center gap-2">
          <Terminal className="w-4 h-4 text-emerald-600 dark:text-emerald-500" />
          <h3 className="text-sm font-medium text-foreground/90">
            System Processing
          </h3>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          <div className="space-y-3">
            {processSteps.map((step, index) => {
              const isCompleted = index < currentStep;
              const isCurrent = index === currentStep;
              const isPending = index > currentStep;

              return (
                <div key={index} className="flex items-center gap-3">
                  {/* Status Icon */}
                  <div className="flex-shrink-0">
                    {isCompleted && (
                      <div className="w-5 h-5 bg-emerald-100 dark:bg-emerald-500/20 rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                      </div>
                    )}
                    {isCurrent && !error && (
                      <div className="w-5 h-5 bg-emerald-100 dark:bg-emerald-500/20 rounded-full flex items-center justify-center">
                        <Loader2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400 animate-spin" />
                      </div>
                    )}
                    {isCurrent && error && (
                      <div className="w-5 h-5 bg-destructive/10 rounded-full flex items-center justify-center">
                        <AlertCircle className="w-3 h-3 text-destructive" />
                      </div>
                    )}
                    {isPending && (
                      <div className="w-5 h-5 flex items-center justify-center">
                        <Circle className="w-2 h-2 text-muted-foreground/30 fill-muted-foreground/30" />
                      </div>
                    )}
                  </div>

                  {/* Step Text */}
                  <span
                    className={`text-sm transition-colors duration-300 ${
                      isCompleted
                        ? "text-muted-foreground"
                        : isCurrent
                        ? error
                          ? "text-destructive font-medium"
                          : "text-emerald-700 dark:text-emerald-400 font-medium"
                        : "text-muted-foreground/40"
                    }`}
                  >
                    {step}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Error State */}
          {error && (
            <div className="mt-4 p-3 bg-destructive/5 border border-destructive/20 rounded-lg animate-in fade-in zoom-in-95">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-destructive mt-0.5" />
                <span className="text-sm text-destructive font-medium">
                  Error: {error}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

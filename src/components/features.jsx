import { Bot, ChartPie, Search, Database, Zap, Globe } from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "Advanced Web Scraping",
    description:
      "Dual-engine approach combining Cheerio and Puppeteer for comprehensive content extraction.",
  },
  {
    icon: Database,
    title: "Vector Database Storage",
    description:
      "PineconeDB integration with cloud-based storage and semantic search capabilities",
  },
  {
    icon: Bot,
    title: "AI-Powered Processing",
    description:
      "Smart text chunking and semantic embeddings using Google Gemini's latest models.",
  },
  {
    icon: Search,
    title: "Semantic Search",
    description:
      "Advanced similarity search with configurable parameters and URL-specific filtering.",
  },
  {
    icon: ChartPie,
    title: "Terminal Processing",
    description:
      "Interactive terminal interface with typewriter effects and step-by-step processing visualization.",
  },
  {
    icon: Zap,
    title: "Performance Optimized",
    description:
      "Enhanced memory allocation, concurrent processing, and intelligent caching.",
  },
];

const Features = () => {
  return (
    <div id="features" className="w-full py-12 xs:py-20 px-6">
      <h2 className="text-3xl xs:text-4xl sm:text-5xl font-bold tracking-tight text-center">
        Advanced AI Capabilities
      </h2>
      <div className="w-full max-w-screen-lg mx-auto mt-10 sm:mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="flex flex-col bg-background border rounded-xl py-6 px-5"
          >
            <div className="mb-3 h-10 w-10 flex items-center justify-center bg-muted rounded-full">
              <feature.icon className="h-6 w-6" />
            </div>
            <span className="text-lg font-semibold">{feature.title}</span>
            <p className="mt-1 text-foreground/80 text-[15px]">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;

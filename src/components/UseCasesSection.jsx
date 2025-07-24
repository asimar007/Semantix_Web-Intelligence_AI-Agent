import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function UseCasesSection() {
  const useCases = [
    {
      title: "Website Knowledge Base",
      description: "Create searchable knowledge bases from any website content",
      icon: "🌐",
    },
    {
      title: "Content Analysis",
      description: "Semantic analysis of web content for deep insights",
      icon: "📊",
    },
    {
      title: "Research Automation",
      description: "Automated research and content aggregation",
      icon: "🔬",
    },
    {
      title: "Competitive Intelligence",
      description: "Monitor and analyze competitor websites",
      icon: "🎯",
    },
    {
      title: "Documentation Processing",
      description: "Convert web docs into searchable formats",
      icon: "📚",
    },
    {
      title: "Customer Support",
      description: "Build AI-powered support from website content",
      icon: "🤝",
    },
  ];

  return (
    <section
      id="use-cases"
      className="relative z-10 py-20 bg-black/20 backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Powerful Use Cases
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Transform how you interact with web content across various
            industries and applications
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <Card
              key={index}
              className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
            >
              <CardHeader>
                <div className="text-4xl mb-4">{useCase.icon}</div>
                <CardTitle className="text-white">{useCase.title}</CardTitle>
                <CardDescription className="text-gray-300">
                  {useCase.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

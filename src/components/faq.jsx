import { Brain, Code, FileText, Globe, ShieldCheck, Zap } from "lucide-react";

const faq = [
  {
    icon: Brain,
    question: "What is Semantix AI?",
    answer:
      "Semantix is an intelligent web scraping and analysis platform. It turns any website into a searchable knowledge base using advanced AI to understand and answer questions about the content.",
  },
  {
    icon: Globe,
    question: "How does the scraping work?",
    answer:
      "We use a hybrid approach combining static and dynamic scraping to handle everything from simple blogs to complex SPAs, ensuring comprehensive content extraction.",
  },
  {
    icon: Zap,
    question: "Which AI models are used?",
    answer:
      "The platform leverages Google Gemini AI for powerful text embedding and natural language generation, enabling accurate and context-aware responses.",
  },
  {
    icon: Code,
    question: "Can I run this locally?",
    answer:
      "Yes! Semantix is open-source. You can clone the repository, set up your environment variables, and run it locally with Node.js and Next.js.",
  },
  {
    icon: FileText,
    question: "What type of content can I query?",
    answer:
      "You can input any publicly accessible URL. The system processes text content, documentation, articles, and more, making them instantly queryable via chat.",
  },
  {
    icon: ShieldCheck,
    question: "Is my data secure?",
    answer:
      "Your queries and processed data are handled securely. We use industry-standard encryption and do not share your private data with third parties.",
  },
];

const FAQ = () => {
  return (
    <div
      id="faq"
      className="min-h-screen flex items-center justify-center px-6 py-12 xs:py-20"
    >
      <div className="max-w-screen-lg">
        <h2 className="text-3xl xs:text-4xl md:text-5xl !leading-[1.15] font-bold tracking-tight text-center">
          Frequently Asked Questions
        </h2>
        <p className="mt-3 xs:text-lg text-center text-muted-foreground">
          Quick answers to common questions about our products and services.
        </p>

        <div className="mt-12 grid md:grid-cols-2 bg-background rounded-xl overflow-hidden outline outline-[1px] outline-border outline-offset-[-1px]">
          {faq.map(({ question, answer, icon: Icon }) => (
            <div key={question} className="border p-6 -mt-px -ml-px">
              <div className="h-8 w-8 xs:h-10 xs:w-10 flex items-center justify-center rounded-full bg-accent">
                <Icon className="h-4 w-4 xs:h-6 xs:w-6" />
              </div>
              <div className="mt-3 mb-2 flex items-start gap-2 text-lg xs:text-[1.35rem] font-semibold tracking-tight">
                <span>{question}</span>
              </div>
              <p className="text-sm xs:text-base">{answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;

import Image from "next/image";

export function ArchitectureSection() {
  return (
    <section id="architecture" className="relative z-10 py-12 xs:py-20 px-6">
      <div className="max-w-screen-xl mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl xs:text-4xl sm:text-5xl font-bold tracking-tight">
            Built on Modern Architecture
          </h2>
          <p className="mt-4 text-base md:text-lg text-foreground/80 max-w-2xl mx-auto">
            Leveraging the latest technologies for maximum performance and
            scalability
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex flex-col items-center bg-background border rounded-xl py-6 px-5">
            <div className="mb-4 h-16 w-16 flex items-center justify-center bg-muted rounded-full">
              <Image
                src="/images/NextJS.png"
                alt="Next.js"
                width={48}
                height={48}
                className="w-12 h-12"
              />
            </div>
            <h3 className="text-lg font-semibold mb-1">Next.js 15</h3>
            <p className="text-foreground/80 text-sm text-center">
              React 19 with App Router
            </p>
          </div>

          <div className="flex flex-col items-center bg-background border rounded-xl py-6 px-5">
            <div className="mb-4 h-16 w-16 flex items-center justify-center">
              <Image
                src="/images/GoogleGemini.png"
                alt="Google Gemini"
                width={64}
                height={64}
                className="w-16 h-16"
              />
            </div>
            <h3 className="text-lg font-semibold mb-1">Google Gemini</h3>
            <p className="text-foreground/80 text-sm text-center">
              AI embeddings & processing
            </p>
          </div>

          <div className="flex flex-col items-center bg-background border rounded-xl py-6 px-5">
            <div className="mb-4 h-16 w-16 flex items-center justify-center bg-muted rounded-full">
              <Image
                src="/images/pinecone.png"
                alt="Pinecone"
                width={48}
                height={48}
                className="w-12 h-12"
              />
            </div>
            <h3 className="text-lg font-semibold mb-1">Pinecone</h3>
            <p className="text-foreground/80 text-sm text-center">
              Vector database storage
            </p>
          </div>

          <div className="flex flex-col items-center bg-background border rounded-xl py-6 px-5">
            <div className="mb-4 h-16 w-16 flex items-center justify-center">
              <Image
                src="/images/LangchainJS.png"
                alt="LangChain"
                width={64}
                height={64}
                className="w-16 h-16"
              />
            </div>
            <h3 className="text-lg font-semibold mb-1">LangChain JS</h3>
            <p className="text-foreground/80 text-sm text-center">
              Text processing & splitting
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

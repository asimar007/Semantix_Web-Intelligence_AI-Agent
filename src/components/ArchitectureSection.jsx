import Image from "next/image";

export function ArchitectureSection() {
  return (
    <section
      id="architecture"
      className="relative z-10 py-20 bg-black/10 backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Built on Modern Architecture
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Leveraging the latest technologies for maximum performance and
            scalability
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="flex items-center justify-center mx-auto mb-4">
              <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
                <Image
                  src="/images/NextJS.png"
                  alt="Next.js"
                  width={48}
                  height={48}
                  className="w-12 h-12"
                />
              </div>
            </div>
            <h3 className="text-white font-semibold mb-2">Next.js 15</h3>
            <p className="text-gray-400 text-sm">React 19 with App Router</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mx-auto mb-4">
              <Image
                src="/images/GoogleGemini.png"
                alt="Google Gemini"
                width={64}
                height={64}
                className="w-16 h-16"
              />
            </div>
            <h3 className="text-white font-semibold mb-2">Google Gemini</h3>
            <p className="text-gray-400 text-sm">AI embeddings & processing</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mx-auto mb-4">
              <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
                <Image
                  src="/images/pinecone.png"
                  alt="Pinecone"
                  width={48}
                  height={48}
                  className="w-12 h-12"
                />
              </div>
            </div>
            <h3 className="text-white font-semibold mb-2">Pinecone</h3>
            <p className="text-gray-400 text-sm">Vector database storage</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mx-auto mb-4">
              <Image
                src="/images/LangchainJS.png"
                alt="LangChain"
                width={64}
                height={64}
                className="w-16 h-16"
              />
            </div>
            <h3 className="text-white font-semibold mb-2">LangChain JS</h3>
            <p className="text-gray-400 text-sm">Text processing & splitting</p>
          </div>
        </div>
      </div>
    </section>
  );
}

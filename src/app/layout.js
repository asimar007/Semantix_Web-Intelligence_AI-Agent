import "./globals.css";
import Image from "next/image";

export const metadata = {
  title: "Semantix - Web Intelligence AI Agent",
  description:
    "Transform any website into a searchable knowledge base with advanced AI processing, semantic search, and intelligent content extraction.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <div className="min-h-screen bg-black relative overflow-hidden">
          {/* Full page background */}
          <div className="fixed inset-0 z-0">
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <Image
                src="/images/clean-abstract-bg.png"
                alt="Abstract geometric background"
                fill
                priority
                quality={75}
                className="object-cover object-center scale-125 opacity-90"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
          </div>
          <main className="relative z-10">{children}</main>
        </div>
      </body>
    </html>
  );
}

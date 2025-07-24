import { Bug } from "lucide-react";
import Link from "next/link";

export function SimpleHeader() {
  return (
    <nav className="relative z-10 border-b border-white/10 bg-black/30 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-2">
            <Bug className="w-8 h-8 text-red-500" />
            <span className="text-xl font-bold text-white">Semantix</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

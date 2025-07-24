import { Bug } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black/30 backdrop-blur-xl py-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
        <div className="flex items-center space-x-2 mb-2 md:mb-0">
          <Bug className="w-4 h-4 text-red-500" />
          <span className="text-white font-medium">Semantix</span>
        </div>
        <p>© 2024 Semantix. Web Intelligence AI Agent.</p>
      </div>
    </footer>
  );
}

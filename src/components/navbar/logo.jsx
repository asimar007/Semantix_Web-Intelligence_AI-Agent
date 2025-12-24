import { Bug } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Bug className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0" />
      <span className="text-lg sm:text-xl font-bold text-foreground">
        Semantix
      </span>
    </div>
  );
}

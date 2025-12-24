import { Bug } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Bug className="w-6 h-6 sm:w-8 sm:h-8 text-red-500 flex-shrink-0" />
      <span className="text-lg sm:text-xl font-bold text-foreground">
        Semantix
      </span>
    </div>
  );
}

import { Bug, Bot } from "lucide-react";
import { parseMessage } from "../../lib/chatUtils";

export default function MessageBubble({ message, isUser }) {
  return (
    <div
      className={`w-full ${
        isUser ? "bg-muted/10" : "bg-transparent"
      } border-b border-border/40`}
    >
      <div className="flex p-4 gap-4 text-base md:gap-6 md:max-w-5xl md:py-3 lg:px-8 m-auto">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div
            className={`h-8 w-8 rounded-lg flex items-center justify-center ${
              isUser
                ? "text-primary bg-primary/10"
                : "text-emerald-500 bg-emerald-500/10"
            }`}
          >
            {isUser ? <Bug className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
          </div>
        </div>

        {/* Message Content */}
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm mb-1 opacity-90 text-foreground/80">
            {isUser ? "You" : "Semantix AI"}
          </div>
          <div className="break-words leading-relaxed text-foreground">
            {parseMessage(message)}
          </div>
        </div>
      </div>
    </div>
  );
}

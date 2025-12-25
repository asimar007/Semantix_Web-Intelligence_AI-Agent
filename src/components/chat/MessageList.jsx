import { Bot } from "lucide-react";
import MessageBubble from "./MessageBubble";

export default function MessageList({ messages, isLoading, messagesEndRef }) {
  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent">
      {messages.length === 0 && (
        <div className="flex items-center justify-center h-full pb-20">
          <div className="text-center opacity-0 animate-in fade-in duration-700 slide-in-from-bottom-4">
            <div className="w-12 h-12 bg-muted/30 rounded-xl flex items-center justify-center mx-auto mb-6 ring-1 ring-border">
              <Bot className="w-6 h-6 text-foreground/80" />
            </div>
            <p className="text-muted-foreground font-medium">
              Initializing conversation...
            </p>
          </div>
        </div>
      )}

      {/* Message Container Pattern */}
      <div className="flex flex-col w-full pb-4">
        {messages.map((message, index) => (
          <MessageBubble
            key={index}
            message={message.text}
            isUser={message.isUser}
          />
        ))}

        {isLoading && (
          <div className="group w-full py-2">
            <div className="flex p-4 gap-4 text-base md:gap-6 md:max-w-5xl md:py-6 lg:px-8 m-auto">
              <div className="flex-shrink-0 flex flex-col relative mt-1">
                <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-emerald-500" />
                </div>
              </div>
              <div className="relative flex-1 py-1">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"></span>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} className="h-4" />
      </div>
    </div>
  );
}

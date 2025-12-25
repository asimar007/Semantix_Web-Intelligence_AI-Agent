import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function ChatInput({
  inputValue,
  setInputValue,
  isLoading,
  inputRef,
  onSendMessage,
  messagesCount,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSendMessage(inputValue);
  };

  const quickQuestions = [
    "Summarize this website",
    "What are the key topics?",
    "Extract all links and images",
    "Find important information",
  ];

  return (
    <div className="p-4 md:p-6 lg:pb-8 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t border-border/40">
      <div className="max-w-3xl lg:max-w-4xl mx-auto space-y-4">
        {messagesCount === 1 && !isLoading && (
          <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => onSendMessage(question)}
                className="px-4 py-2 bg-muted/50 hover:bg-muted text-muted-foreground text-xs md:text-sm rounded-full transition-all duration-200 border border-border/50 hover:border-border hover:scale-105 active:scale-95"
              >
                {question}
              </button>
            ))}
          </div>
        )}

        <div className="relative group">
          <form
            onSubmit={handleSubmit}
            className="relative flex items-end gap-2 bg-muted p-2 rounded-3xl focus-within:ring-1 focus-within:ring-primary/30 transition-shadow"
          >
            <Textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Message Semantix AI..."
              disabled={isLoading}
              rows={1}
              className="flex-1 bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground placeholder-muted-foreground min-h-[44px] max-h-[200px] py-3 px-4 resize-none text-[15px] leading-relaxed scrollbar-hide shadow-none"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <Button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              size="icon"
              variant="ghost"
              className={`mb-1 mr-1 h-9 w-9 rounded-xl transition-all duration-200 ${
                inputValue.trim()
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-muted/50 text-muted-foreground cursor-not-allowed hover:bg-muted/50"
              }`}
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
          <p className="text-[10px] text-muted-foreground mt-2 text-center font-medium opacity-60">
            Semantix can make mistakes. Consider checking important information.
          </p>
        </div>
      </div>
    </div>
  );
}

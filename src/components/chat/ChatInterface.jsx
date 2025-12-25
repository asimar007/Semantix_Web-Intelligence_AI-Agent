"use client";

import { Bot, X } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useChat } from "@/hooks/useChat";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";

export default function ChatInterface({ currentUrl, onClose }) {
  const {
    messages,
    inputValue,
    setInputValue,
    isLoading,
    messagesEndRef,
    inputRef,
    sendMessage,
  } = useChat(currentUrl);

  if (!currentUrl) return null;

  return (
    <div className="flex flex-col h-full bg-background relative">
      {/* Chat Header */}
      <div className="flex items-center justify-between px-4 py-3 md:px-6 md:py-4 border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-sm md:text-base text-foreground">
              Semantix AI
            </h3>
            <p className="text-xs text-muted-foreground truncate max-w-[200px] md:max-w-xs">
              {currentUrl}
            </p>
          </div>
        </div>
        <Button
          onClick={onClose}
          variant="ghost"
          size="icon"
          className="h-8 w-8 hover:bg-destructive/10 text-muted-foreground hover:text-destructive rounded-full transition-colors"
          title="End Chat"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      <MessageList
        messages={messages}
        isLoading={isLoading}
        messagesEndRef={messagesEndRef}
      />

      <ChatInput
        inputValue={inputValue}
        setInputValue={setInputValue}
        isLoading={isLoading}
        inputRef={inputRef}
        onSendMessage={sendMessage}
        messagesCount={messages.length}
      />
    </div>
  );
}

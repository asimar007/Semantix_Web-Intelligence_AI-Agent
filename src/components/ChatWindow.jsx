"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import MessageBubble from "./MessageBubble";

export default function ChatWindow({ currentUrl, onClose }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].isUser) {
      scrollToBottom();
    }
  }, [messages]);

  useEffect(() => {
    if (currentUrl) {
      setMessages([
        {
          text: `👋 I've analyzed ${currentUrl}.\n Ask me anything about the website!`,
          isUser: false,
          timestamp: Date.now(),
        },
      ]);
    }
  }, [currentUrl]);

  const sendMessage = async (messageText) => {
    if (!messageText.trim() || isLoading) return;

    setInputValue("");
    setIsLoading(true);

    setMessages((prev) => [
      ...prev,
      {
        text: messageText,
        isUser: true,
        timestamp: Date.now(),
      },
    ]);

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: messageText,
        url: currentUrl,
      }),
    });

    const data = await response.json();

    setMessages((prev) => [
      ...prev,
      {
        text: data.response || "Something went wrong. Please try again.",
        isUser: false,
        timestamp: Date.now(),
      },
    ]);

    setIsLoading(false);
    inputRef.current?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const quickQuestions = [
    "Summarize this website",
    "What are the key topics?",
    "Extract all links and images",
    "Find important information",
  ];

  const handleQuickQuestion = (question) => {
    sendMessage(question);
  };

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

      {/* Messages Area */}
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

      {/* Input Area */}
      <div className="p-4 md:p-6 lg:pb-8 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t border-border/40">
        <div className="max-w-3xl lg:max-w-4xl mx-auto space-y-4">
          {messages.length === 1 && !isLoading && (
            <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
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
              Semantix can make mistakes. Consider checking important
              information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

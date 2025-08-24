"use client";

import { useState, useRef, useEffect } from "react";
import { Send, MessageCircle, Bot, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MessageBubble from "./MessageBubble";

export default function ChatWindow({ currentUrl }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (currentUrl) {
      setMessages([
        {
          text: `👋 Hello! I've successfully analyzed the content from **${currentUrl}**\n\nI'm ready to help you explore and understand the website's content. Ask me anything - from summarizing key points to diving deep into specific topics!`,
          isUser: false,
          timestamp: Date.now(),
        },
      ]);
    }
  }, [currentUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue("");
    setIsLoading(true);

    setMessages((prev) => [
      ...prev,
      {
        text: userMessage,
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
        query: userMessage,
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

  const quickQuestions = [
    "Summarize this website",
    "What are the key topics?",
    "Extract all links and images",
    "Find important information",
  ];

  const handleQuickQuestion = (question) => {
    if (!isLoading) {
      setInputValue(question);
      inputRef.current?.focus();
    }
  };

  if (!currentUrl) {
    return (
      <Card className="h-64 bg-black/20 backdrop-blur-sm border-white/10">
        <CardContent className="flex items-center justify-center h-full p-8">
          <div className="text-center max-w-md">
            <div className="relative mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                <MessageCircle className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              AI Chat Ready!
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Enter a website URL above to start an intelligent conversation
              with the content. I'll analyze the page and answer your questions
              in real-time.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col h-screen md:h-[calc(100vh-300px)] bg-black/20 backdrop-blur-sm border-white/10 overflow-hidden">
      <CardContent className="flex-1 overflow-y-auto bg-gradient-to-b from-black/10 to-black/20 p-0">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <p className="text-gray-300 animate-pulse">
                Initializing conversation...
              </p>
            </div>
          </div>
        )}

        {messages.map((message, index) => (
          <MessageBubble
            key={index}
            message={message.text}
            isUser={message.isUser}
          />
        ))}

        {isLoading && (
          <div className="group w-full bg-gray-900/20 border-b border-white/5">
            <div className="flex p-4 gap-4 text-base md:gap-6 md:max-w-5xl md:py-6 lg:px-8 m-auto">
              <div className="flex-shrink-0 flex flex-col relative items-end">
                <div className="relative h-[32px] w-[32px] p-1 rounded-lg text-white flex items-center justify-center shadow-lg bg-gradient-to-r from-emerald-500 to-teal-600">
                  <Bot className="w-4 h-4" />
                </div>
              </div>
              <div className="relative flex w-[calc(100%-50px)] flex-col gap-1 md:gap-3 lg:w-[calc(100%-115px)]">
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-1">
                    <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                  <span className="text-gray-200 text-sm font-medium">
                    Analyzing content and generating response...
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </CardContent>

      {messages.length === 1 && !isLoading && (
        <div className="px-4 py-3 border-t border-white/10 bg-black/30 backdrop-blur-sm">
          <p className="text-xs text-gray-400 mb-2">
            Quick questions to get started
          </p>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="px-3 py-1.5 bg-black/40 hover:bg-black/60 text-gray-300 rounded-lg cursor-pointer transition-colors duration-200 border border-white/20"
                onClick={() => handleQuickQuestion(question)}
              >
                {question}
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div className="border-t border-white/10 p-4 bg-black/30 backdrop-blur-sm">
        <form onSubmit={handleSubmit} className="flex gap-3 items-end">
          <Textarea
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask me anything about this website..."
            disabled={isLoading}
            rows={1}
            className="flex-1 bg-black/40 backdrop-blur-sm border-white/20 text-white placeholder-gray-400 focus:ring-white focus:border-transparent disabled:opacity-50 resize-none min-h-[48px] max-h-[200px]"
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
            size="lg"
            className="bg-white hover:bg-gray-100 text-black min-h-[48px] px-6"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>

        <p className="text-xs text-gray-400 mt-2 text-center">
          Press Enter to send • Shift+Enter for new line
        </p>
      </div>
    </Card>
  );
}

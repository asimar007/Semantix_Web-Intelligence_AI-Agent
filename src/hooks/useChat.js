import { useState, useRef, useEffect } from "react";

export function useChat(currentUrl) {
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

    try {
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
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          text: "Failed to send message. Please check your connection.",
          isUser: false,
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  return {
    messages,
    inputValue,
    setInputValue,
    isLoading,
    messagesEndRef,
    inputRef,
    sendMessage,
  };
}

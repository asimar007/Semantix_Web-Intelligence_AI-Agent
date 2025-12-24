import { Bug, Bot } from "lucide-react";

function parseMessage(message) {
  const lines = message.split("\n");
  const elements = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();

    // Empty lines
    if (!trimmedLine) {
      elements.push(<br key={`br-${i}`} />);
      continue;
    }

    // Headers
    const headerMatch = line.match(/^(#{1,6})\s(.+)$/);
    if (headerMatch) {
      const level = headerMatch[1].length;
      const content = headerMatch[2];
      const Tag = `h${Math.min(level + 2, 6)}`; // h3, h4, h5, h6

      elements.push(
        <Tag
          key={`header-${i}`}
          className="font-bold mt-4 mb-2 text-foreground"
        >
          {parseInlineFormatting(content, `header-${i}`)}
        </Tag>
      );
      continue;
    }

    // List items
    const listMatch = line.match(/^(\s*)([-•*])\s(.+)$/);
    if (listMatch) {
      const indent = listMatch[1].length;
      const content = listMatch[3];

      elements.push(
        <div
          key={`list-${i}`}
          className={`flex items-start gap-2 my-1 ${indent > 0 ? "ml-4" : ""}`}
        >
          <span className="text-primary mt-0.5 flex-shrink-0">•</span>
          <span className="flex-1">
            {parseInlineFormatting(content, `list-${i}`)}
          </span>
        </div>
      );
      continue;
    }

    // Regular paragraphs
    elements.push(
      <div key={`para-${i}`} className="mb-2 leading-relaxed">
        {parseInlineFormatting(line, `para-${i}`)}
      </div>
    );
  }

  return elements;
}

function parseInlineFormatting(text, keyPrefix) {
  const parts = text.split(
    /(\*\*.*?\*\*|\*.*?\*|`.*?`|https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g
  );

  return parts.map((part, index) => {
    // Bold
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong
          key={`${keyPrefix}-${index}`}
          className="font-bold text-foreground"
        >
          {part.slice(2, -2)}
        </strong>
      );
    }
    // Italic
    if (part.startsWith("*") && part.endsWith("*") && !part.startsWith("**")) {
      return (
        <em key={`${keyPrefix}-${index}`} className="italic text-foreground/80">
          {part.slice(1, -1)}
        </em>
      );
    }
    // Code
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={`${keyPrefix}-${index}`}
          className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono border"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    // Links
    if (
      part.match(/^https?:\/\//) ||
      part.match(/^www\./) ||
      part.includes("@")
    ) {
      let href = part;
      let displayText = part;

      if (part.startsWith("www.")) href = `https://${part}`;
      if (part.includes("@") && !part.startsWith("mailto:"))
        href = `mailto:${part}`;

      // Clean up punctuation from end of URLs
      const cleanUrl = href.replace(/[.,;:!?]+$/, "");
      const cleanDisplay = displayText.replace(/[.,;:!?]+$/, "");

      return (
        <a
          key={`${keyPrefix}-${index}`}
          href={cleanUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:text-primary/80 underline decoration-1 hover:decoration-2 transition-all"
          title={`Open ${cleanUrl}`}
        >
          {cleanDisplay}
        </a>
      );
    }
    // Regular text
    return part;
  });
}

export default function MessageBubble({ message, isUser }) {
  return (
    <div
      className={`w-full ${
        isUser ? "bg-muted/10" : "bg-transparent"
      } border-b border-border/40`}
    >
      <div className="flex p-4 gap-4 text-base md:gap-6 md:max-w-5xl md:py-6 lg:px-8 m-auto">
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

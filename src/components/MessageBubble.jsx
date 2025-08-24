import { Bug, Bot, Copy, Check } from "lucide-react";
import { useState } from "react";

function parseMessageWithFormatting(message) {
  // Enhanced regex patterns
  const urlRegex =
    /(https?:\/\/[^\s<>"{}|\\^`\[\]]+|www\.[^\s<>"{}|\\^`\[\]]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
  const boldRegex = /\*\*(.*?)\*\*/g;
  const italicRegex = /\*(.*?)\*/g;
  const codeRegex = /`([^`]+)`/g;
  const blockCodeRegex = /```([\s\S]*?)```/g;

  // Split message into sections (handle code blocks first)
  const sections = [];
  let lastIndex = 0;

  // Find code blocks
  let blockMatch;
  const blockMatches = [];
  while ((blockMatch = blockCodeRegex.exec(message)) !== null) {
    blockMatches.push({
      type: "codeblock",
      start: blockMatch.index,
      end: blockMatch.index + blockMatch[0].length,
      content: blockMatch[1].trim(),
    });
  }

  // Process content between code blocks
  blockMatches.forEach((block, index) => {
    if (block.start > lastIndex) {
      const textContent = message.slice(lastIndex, block.start);
      sections.push({ type: "text", content: textContent });
    }
    sections.push(block);
    lastIndex = block.end;
  });

  // Add remaining text
  if (lastIndex < message.length) {
    sections.push({ type: "text", content: message.slice(lastIndex) });
  }

  // If no code blocks, treat entire message as text
  if (sections.length === 0) {
    sections.push({ type: "text", content: message });
  }

  return sections
    .map((section, sectionIndex) => {
      if (section.type === "codeblock") {
        return (
          <CodeBlock key={`codeblock-${sectionIndex}`} code={section.content} />
        );
      }

      // Process text content
      const lines = section.content.split("\n");

      return lines.map((line, lineIndex) => {
        if (line.trim() === "") {
          return <br key={`br-${sectionIndex}-${lineIndex}`} />;
        }

        // Check for list items
        const listMatch = line.match(/^(\s*)([-•*]|\d+\.)\s(.+)$/);
        if (listMatch) {
          const [, indent, bullet, content] = listMatch;
          return (
            <div
              key={`list-${sectionIndex}-${lineIndex}`}
              className={`flex items-start gap-2 my-0.5 ${
                indent ? "ml-4" : ""
              }`}
            >
              <span className="text-cyan-400 font-medium mt-0.5 flex-shrink-0">
                {bullet.includes(".") ? bullet : "•"}
              </span>
              <span className="flex-1">
                {parseInlineFormatting(content, `${sectionIndex}-${lineIndex}`)}
              </span>
            </div>
          );
        }

        // Check for headings
        const headingMatch = line.match(/^(#{1,6})\s(.+)$/);
        if (headingMatch) {
          const [, hashes, content] = headingMatch;
          const level = hashes.length;
          const Tag = `h${Math.min(level + 1, 6)}`;
          return (
            <Tag
              key={`heading-${sectionIndex}-${lineIndex}`}
              className={`font-bold text-white my-2 ${
                level === 1
                  ? "text-xl"
                  : level === 2
                  ? "text-lg"
                  : level === 3
                  ? "text-base"
                  : "text-sm"
              }`}
            >
              {parseInlineFormatting(content, `${sectionIndex}-${lineIndex}`)}
            </Tag>
          );
        }

        // Regular paragraph
        return (
          <div
            key={`line-${sectionIndex}-${lineIndex}`}
            className="mb-1 last:mb-0 leading-relaxed"
          >
            {parseInlineFormatting(line, `${sectionIndex}-${lineIndex}`)}
          </div>
        );
      });
    })
    .flat();
}

function parseInlineFormatting(text, keyPrefix) {
  const elements = [];
  let lastIndex = 0;
  const allMatches = [];

  // Find all inline formatting
  const patterns = [
    { regex: /\*\*(.*?)\*\*/g, type: "bold" },
    { regex: /\*(.*?)\*/g, type: "italic" },
    { regex: /`([^`]+)`/g, type: "code" },
    // Updated URL regex to exclude URLs already in markdown links [text](url)
    {
      regex:
        /(?<!\]\()(?<!\[.*?)(?<!\()https?:\/\/[^\s<>"{}|\\^`\[\]\)]+(?![\)\]])|(?<!\]\()(?<!\[.*?)www\.[^\s<>"{}|\\^`\[\]\)]+(?![\)\]])|(?<!\]\()(?<!\[.*?)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?![\)\]])/g,
      type: "url",
    },
  ];

  // First, find and replace markdown-style links [text](url)
  const markdownLinkRegex = /\[([^\]]+)\]\(([^\)]+)\)/g;
  let markdownMatch;
  while ((markdownMatch = markdownLinkRegex.exec(text)) !== null) {
    allMatches.push({
      type: "markdown_link",
      start: markdownMatch.index,
      end: markdownMatch.index + markdownMatch[0].length,
      content: markdownMatch[1], // link text
      url: markdownMatch[2], // actual URL
      fullMatch: markdownMatch[0],
    });
  }

  patterns.forEach((pattern) => {
    let match;
    while ((match = pattern.regex.exec(text)) !== null) {
      // Skip if this match overlaps with a markdown link
      const overlapsWithMarkdown = allMatches.some(
        (existing) =>
          existing.type === "markdown_link" &&
          match.start < existing.end &&
          match.index + match[0].length > existing.start
      );

      if (!overlapsWithMarkdown) {
        allMatches.push({
          type: pattern.type,
          start: match.index,
          end: match.index + match[0].length,
          content: match[1] || match[0],
          fullMatch: match[0],
        });
      }
    }
  });

  // Sort matches by position and filter overlapping
  allMatches.sort((a, b) => a.start - b.start);
  const filteredMatches = [];
  allMatches.forEach((match) => {
    const hasOverlap = filteredMatches.some(
      (existing) => match.start < existing.end && match.end > existing.start
    );
    if (!hasOverlap) {
      filteredMatches.push(match);
    }
  });

  // Process matches in order
  filteredMatches.forEach((match, matchIndex) => {
    // Add text before this match
    if (match.start > lastIndex) {
      const textBefore = text.slice(lastIndex, match.start);
      if (textBefore) {
        elements.push(textBefore);
      }
    }

    // Add formatted match
    const key = `${keyPrefix}-${match.type}-${matchIndex}`;

    switch (match.type) {
      case "bold":
        elements.push(
          <strong key={key} className="font-bold text-white">
            {match.content}
          </strong>
        );
        break;
      case "italic":
        elements.push(
          <em key={key} className="italic text-gray-200">
            {match.content}
          </em>
        );
        break;
      case "code":
        elements.push(
          <code
            key={key}
            className="bg-gray-800 text-cyan-300 px-1.5 py-0.5 rounded text-sm font-mono"
          >
            {match.content}
          </code>
        );
        break;
      case "markdown_link":
        let href = match.url;
        if (match.url.startsWith("www.")) {
          href = `https://${match.url}`;
        } else if (
          match.url.includes("@") &&
          !match.url.startsWith("mailto:")
        ) {
          href = `mailto:${match.url}`;
        }

        elements.push(
          <a
            key={key}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline decoration-1 hover:decoration-2 transition-all duration-200"
            title={`Open ${href} in new tab`}
          >
            {match.content}
          </a>
        );
        break;
      case "url":
        let urlHref = match.content;
        let displayText = match.content;

        if (match.content.startsWith("www.")) {
          urlHref = `https://${match.content}`;
        } else if (
          match.content.includes("@") &&
          !match.content.startsWith("mailto:")
        ) {
          urlHref = `mailto:${match.content}`;
        }

        urlHref = urlHref.replace(/[.,;:!?]+$/, "");
        displayText = displayText.replace(/[.,;:!?]+$/, "");

        elements.push(
          <a
            key={key}
            href={urlHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline decoration-1 hover:decoration-2 transition-all duration-200 break-all"
            title={`Open ${urlHref} in new tab`}
          >
            {displayText}
          </a>
        );
        break;
      default:
        elements.push(match.content);
    }

    lastIndex = match.end;
  });

  // Add remaining text
  if (lastIndex < text.length) {
    const remainingText = text.slice(lastIndex);
    if (remainingText) {
      elements.push(remainingText);
    }
  }

  // If no matches found, return the original text
  if (elements.length === 0) {
    elements.push(text);
  }

  return elements;
}

function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  // Parse URLs in code blocks
  const parseCodeContent = (text) => {
    const lines = text.split("\n");
    return lines.map((line, lineIndex) => {
      const urlRegex =
        /(https?:\/\/[^\s<>"{}|\\^`\[\]]+|www\.[^\s<>"{}|\\^`\[\]]+)/g;
      const parts = [];
      let lastIndex = 0;
      let match;

      while ((match = urlRegex.exec(line)) !== null) {
        // Add text before URL
        if (match.index > lastIndex) {
          parts.push(line.slice(lastIndex, match.index));
        }

        // Add clickable URL
        let href = match[0];
        if (href.startsWith("www.")) {
          href = `https://${href}`;
        }

        parts.push(
          <a
            key={`code-url-${lineIndex}-${match.index}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-300 hover:text-blue-200 underline decoration-1 hover:decoration-2 transition-all duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {match[0]}
          </a>
        );

        lastIndex = match.index + match[0].length;
      }

      // Add remaining text
      if (lastIndex < line.length) {
        parts.push(line.slice(lastIndex));
      }

      // Return line with newline if not last line
      const lineContent = parts.length > 0 ? parts : line;
      return (
        <span key={`code-line-${lineIndex}`}>
          {lineContent}
          {lineIndex < lines.length - 1 && <br />}
        </span>
      );
    });
  };

  return (
    <div className="relative my-4 rounded-lg overflow-hidden bg-gray-900 border border-gray-700">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <span className="text-xs text-gray-400 font-medium">Code</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-2 py-1 text-xs text-gray-400 hover:text-white transition-colors rounded"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3" />
              Copied
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="p-4 text-sm text-gray-100 font-mono leading-relaxed overflow-x-auto">
        <code>{parseCodeContent(code)}</code>
      </pre>
    </div>
  );
}

export default function MessageBubble({ message, isUser }) {
  return (
    <div
      className={`group w-full ${
        isUser
          ? "bg-gradient-to-r from-purple-500/5 to-cyan-500/5"
          : "bg-gray-900/20"
      } border-b border-white/5`}
    >
      <div className="flex p-4 gap-4 text-base md:gap-6 md:max-w-5xl md:py-6 lg:px-8 m-auto">
        {/* Avatar */}
        <div className="flex-shrink-0 flex flex-col relative items-end">
          <div
            className={`relative h-[32px] w-[32px] p-1 rounded-lg text-white flex items-center justify-center shadow-lg ${
              isUser
                ? "bg-gradient-to-r from-purple-500 to-cyan-500"
                : "bg-gradient-to-r from-emerald-500 to-teal-600"
            }`}
          >
            {isUser ? <Bug className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
          </div>
        </div>

        {/* Message Content */}
        <div className="relative flex w-[calc(100%-50px)] flex-col gap-1 md:gap-3 lg:w-[calc(100%-115px)]">
          <div className="flex flex-grow flex-col gap-3">
            <div className="min-h-[20px] flex flex-col items-start gap-2">
              <div
                className={`w-full break-words leading-relaxed ${
                  isUser ? "text-gray-100" : "text-gray-50"
                } prose prose-invert max-w-none`}
              >
                {parseMessageWithFormatting(message)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

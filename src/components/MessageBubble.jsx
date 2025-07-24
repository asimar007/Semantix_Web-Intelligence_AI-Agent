import { Bug, Bot } from "lucide-react";

function parseMessageWithFormatting(message) {
  // Enhanced URL regex pattern to match various URL formats and email addresses
  const urlRegex =
    /(https?:\/\/[^\s<>"{}|\\^`\[\]]+|www\.[^\s<>"{}|\\^`\[\]]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;

  // Bold text regex pattern
  const boldRegex = /\*\*(.*?)\*\*/g;

  // First, let's split by line breaks to handle each line separately
  const lines = message.split("\n");

  return lines.map((line, lineIndex) => {
    if (line.trim() === "") {
      return <br key={`br-${lineIndex}`} />;
    }

    // Process the line for bold formatting and links
    let processedLine = line;
    const elements = [];
    let lastIndex = 0;

    // Find all bold patterns and URLs in the line
    const allMatches = [];

    // Find bold matches
    let boldMatch;
    while ((boldMatch = boldRegex.exec(line)) !== null) {
      allMatches.push({
        type: "bold",
        start: boldMatch.index,
        end: boldMatch.index + boldMatch[0].length,
        content: boldMatch[1],
        fullMatch: boldMatch[0],
      });
    }

    // Find URL matches
    let urlMatch;
    const urlRegexCopy = new RegExp(urlRegex.source, urlRegex.flags);
    while ((urlMatch = urlRegexCopy.exec(line)) !== null) {
      allMatches.push({
        type: "url",
        start: urlMatch.index,
        end: urlMatch.index + urlMatch[0].length,
        content: urlMatch[0],
        fullMatch: urlMatch[0],
      });
    }

    // Sort matches by position
    allMatches.sort((a, b) => a.start - b.start);

    // Process matches in order
    allMatches.forEach((match, matchIndex) => {
      // Add text before this match
      if (match.start > lastIndex) {
        const textBefore = line.slice(lastIndex, match.start);
        if (textBefore) {
          elements.push(textBefore);
        }
      }

      // Add the formatted match
      if (match.type === "bold") {
        elements.push(
          <strong
            key={`bold-${lineIndex}-${matchIndex}`}
            className="font-bold text-white"
          >
            {match.content}
          </strong>
        );
      } else if (match.type === "url") {
        let href = match.content;
        let displayText = match.content;

        // Handle different URL formats
        if (match.content.startsWith("www.")) {
          href = `https://${match.content}`;
        } else if (
          match.content.includes("@") &&
          !match.content.startsWith("mailto:")
        ) {
          href = `mailto:${match.content}`;
        }

        // Clean up URLs (remove trailing punctuation)
        href = href.replace(/[.,;:!?]+$/, "");
        displayText = displayText.replace(/[.,;:!?]+$/, "");

        elements.push(
          <a
            key={`url-${lineIndex}-${matchIndex}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline decoration-1 hover:decoration-2 transition-all duration-200"
            title={`Open ${href} in new tab`}
          >
            {displayText}
          </a>
        );
      }

      lastIndex = match.end;
    });

    // Add remaining text after all matches
    if (lastIndex < line.length) {
      const remainingText = line.slice(lastIndex);
      if (remainingText) {
        elements.push(remainingText);
      }
    }

    // If no matches found, return the original line
    if (elements.length === 0) {
      elements.push(line);
    }

    return (
      <div key={`line-${lineIndex}`} className="mb-2 last:mb-0">
        {elements}
      </div>
    );
  });
}

export default function MessageBubble({ message, isUser }) {
  return (
    <div className={`group w-full ${isUser ? "bg-black/10" : "bg-black/5"}`}>
      <div className="flex p-4 gap-4 text-base md:gap-6 md:max-w-4xl md:py-6 lg:px-0 m-auto">
        {/* Avatar */}
        <div className="flex-shrink-0 flex flex-col relative items-end">
          <div
            className={`relative h-[30px] w-[30px] p-1 rounded-sm text-white flex items-center justify-center ${
              isUser
                ? "bg-gradient-to-r from-purple-500 to-cyan-500"
                : "bg-gradient-to-r from-gray-600 to-gray-700"
            }`}
          >
            {isUser ? <Bug className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
          </div>
        </div>

        {/* Message Content */}
        <div className="relative flex w-[calc(100%-50px)] flex-col gap-1 md:gap-3 lg:w-[calc(100%-115px)]">
          <div className="flex flex-grow flex-col gap-3">
            <div className="min-h-[20px] flex flex-col items-start gap-4 whitespace-pre-wrap break-words">
              <div className="w-full break-words text-gray-100 leading-relaxed">
                {parseMessageWithFormatting(message)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function parseMessageWithLinks(message, isUser) {
  // Enhanced URL regex pattern to match various URL formats and email addresses
  const urlRegex =
    /(https?:\/\/[^\s<>"{}|\\^`\[\]]+|www\.[^\s<>"{}|\\^`\[\]]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;

  const parts = message.split(urlRegex);

  return parts.map((part, index) => {
    // Check if this part is a URL or email
    if (urlRegex.test(part)) {
      let href = part;
      let displayText = part;

      // Handle different URL formats
      if (part.startsWith("www.")) {
        href = `https://${part}`;
      } else if (part.includes("@") && !part.startsWith("mailto:")) {
        href = `mailto:${part}`;
        displayText = part;
      }

      // Clean up URLs (remove trailing punctuation)
      href = href.replace(/[.,;:!?]+$/, "");
      displayText = displayText.replace(/[.,;:!?]+$/, "");

      return (
        <a
          key={index}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`underline decoration-2 hover:no-underline transition-all duration-200 font-medium ${
            isUser
              ? "text-blue-100 hover:text-white hover:bg-blue-500 hover:bg-opacity-20"
              : "text-blue-600 hover:text-blue-800 hover:bg-blue-50"
          } px-1 py-0.5 rounded`}
          title={`Open ${href} in new tab`}
        >
          {displayText}
          {href.startsWith("http") && (
            <svg
              className="inline w-3 h-3 ml-1 opacity-70"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          )}
        </a>
      );
    }

    // Return regular text
    return part;
  });
}

export default function MessageBubble({ message, isUser }) {
  return (
    <div className={`flex mb-4 ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[70%] px-4 py-3 rounded-2xl whitespace-pre-wrap break-words ${
          isUser
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-800 border border-gray-200"
        }`}
      >
        {parseMessageWithLinks(message, isUser)}
      </div>
    </div>
  );
}

import { useState, useEffect, useRef } from "react";

export default function ProcessingTerminal({ steps, currentStep, error }) {
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [currentTypingText, setCurrentTypingText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const terminalRef = useRef(null);
  const endOfTerminalRef = useRef(null);

  // Terminal-style commands matching your screenshot
  const terminalSteps = [
    {
      command: "$ initialize_scraper",
      response: "> Connection established.",
      details: "Loading web extraction modules...",
    },
    {
      command: "$ connect --target=website",
      response: "> Agent authenticated.",
      details: "Establishing secure tunnel...",
    },
    {
      command: "$ authenticate --agent=spider",
      response: "> HTML fetched successfully.",
      details: "Bypassing firewall protocols...",
    },
    {
      command: "$ fetch_html --url=...",
      response: "> Juggling ones and zeros...",
      details: "Navigating web labyrinth...",
    },
    {
      command: "$ process_data --ai=enabled",
      response: "> Polishing up the data gems...",
      details: "Neural pathways activated...",
    },
    {
      command: "$ initialize_vector_db",
      response: "> You Only Live Once (YOLO)",
      details: "Indexing the digital universe...",
    },
    {
      command: "$ deploy_chat_interface",
      response: "> Ready to hack the conversation!",
      details: "The ghost in the machine awakens...",
    },
  ];

  // Auto-scroll to bottom whenever new content is added
  const scrollToBottom = () => {
    endOfTerminalRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  // Scroll when steps change or typing updates
  useEffect(() => {
    scrollToBottom();
  }, [visibleSteps, currentTypingText, isTyping]);

  // Typewriter effect with auto-scroll
  const typeCommand = (text, callback) => {
    setIsTyping(true);
    setCurrentTypingText("");
    let i = 0;
    const interval = setInterval(() => {
      setCurrentTypingText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        setIsTyping(false);
        setTimeout(callback, 300);
      }
    }, 50);
  };

  useEffect(() => {
    if (currentStep >= 0 && currentStep < terminalSteps.length) {
      const step = terminalSteps[currentStep];
      typeCommand(step.command, () => {
        setVisibleSteps((prev) => [...prev, { ...step, status: "completed" }]);
      });
    }
  }, [currentStep]);

  return (
    <div className="max-w-4xl mx-auto mb-8">
      <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden shadow-2xl">
        {/* Terminal Header */}
        <div className="bg-gray-800 px-4 py-3 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-gray-300 text-sm font-mono ml-4">
              Terminal — Processing
            </span>
          </div>
        </div>

        {/* Terminal Content with Auto-scroll */}
        <div
          ref={terminalRef}
          className="p-6 font-mono text-sm bg-black min-h-[300px] max-h-[500px] overflow-y-auto"
          style={{ scrollBehavior: "smooth" }}
        >
          {/* Current typing command */}
          {isTyping && (
            <div className="flex items-center gap-2 mb-2">
              <span className="text-green-400">{currentTypingText}</span>
              <span className="w-2 h-4 bg-green-400 animate-pulse"></span>
            </div>
          )}

          {/* Completed steps */}
          {visibleSteps.map((step, index) => (
            <div key={index} className="mb-3 space-y-1">
              <div className="text-green-400">{step.command}</div>
              <div className="text-cyan-400">{step.response}</div>
              {step.details && (
                <div className="text-gray-500 text-xs italic ml-4">
                  {step.details}
                </div>
              )}
            </div>
          ))}

          {/* Processing indicator */}
          {currentStep >= 0 && currentStep < terminalSteps.length && !error && (
            <div className="flex items-center gap-2 text-green-400 mt-4">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Processing...</span>
            </div>
          )}

          {/* Completion message */}
          {currentStep >= terminalSteps.length - 1 && !error && (
            <div className="mt-4 space-y-1">
              <div className="text-green-400">$ chat_ready --status=online</div>
              <div className="text-cyan-400"> Ready to chat!</div>
              <div className="text-purple-400 text-xs italic">
                Welcome to the matrix.
              </div>
            </div>
          )}

          {/* Error display */}
          {error && (
            <div className="mt-4 space-y-1">
              <div className="text-red-400">$ error --message="{error}"</div>
              <div className="text-red-300"> System failure detected.</div>
            </div>
          )}

          {/* Invisible element to scroll to */}
          <div ref={endOfTerminalRef} />

          {/* Cursor */}
          {!isTyping && (
            <div className="mt-2 text-green-400">
              <span className="animate-pulse">█</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

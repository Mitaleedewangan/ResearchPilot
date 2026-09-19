import { useState } from "react";

function MessageBubble({ message }) {
  const [copied, setCopied] = useState(false);

  const isUser = message.role === "user";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  return (
    <div
      className={`flex w-full ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`flex gap-3 max-w-[92%] md:max-w-[80%] ${
          isUser ? "flex-row-reverse" : ""
        }`}
      >
        {/* =================================
            AVATAR
        ================================== */}

        <div
          className={`
            w-9
            h-9
            shrink-0
            rounded-xl
            flex
            items-center
            justify-center
            text-sm
            font-semibold
            shadow-lg
            ${
              isUser
                ? `
                  bg-gradient-to-br
                  from-indigo-500
                  to-violet-600
                  text-white
                  shadow-indigo-950/30
                `
                : `
                  bg-gradient-to-br
                  from-slate-800
                  to-slate-900
                  border
                  border-slate-700
                  text-indigo-400
                  shadow-black/20
                `
            }
          `}
        >
          {isUser ? "M" : "✦"}
        </div>

        {/* =================================
            CONTENT
        ================================== */}

        <div className="min-w-0">

          {/* Small Label */}

          <div
            className={`
              text-[10px]
              font-medium
              mb-1.5
              ${
                isUser
                  ? "text-right text-slate-500"
                  : "text-slate-500"
              }
            `}
          >
            {isUser ? "You" : "ResearchPilot"}
          </div>

          {/* =================================
              MESSAGE
          ================================== */}

          <div
            className={`
              px-4
              py-3
              rounded-2xl
              text-sm
              leading-6
              break-words
              ${
                isUser
                  ? `
                    bg-gradient-to-br
                    from-indigo-500
                    to-violet-600
                    text-white
                    rounded-tr-md
                    shadow-lg
                    shadow-indigo-950/20
                  `
                  : `
                    bg-slate-900/80
                    border
                    border-slate-800
                    text-slate-300
                    rounded-tl-md
                    shadow-xl
                    shadow-black/10
                  `
              }
            `}
          >
            <p className="whitespace-pre-wrap">
              {message.content || (
                <span className="inline-flex items-center gap-1.5 py-1">
                  <span
                    className="
                      w-1.5
                      h-1.5
                      bg-slate-500
                      rounded-full
                      animate-bounce
                    "
                  />

                  <span
                    className="
                      w-1.5
                      h-1.5
                      bg-slate-500
                      rounded-full
                      animate-bounce
                    "
                    style={{
                      animationDelay: "0.15s",
                    }}
                  />

                  <span
                    className="
                      w-1.5
                      h-1.5
                      bg-slate-500
                      rounded-full
                      animate-bounce
                    "
                    style={{
                      animationDelay: "0.3s",
                    }}
                  />
                </span>
              )}
            </p>
          </div>

          {/* =================================
              AI ACTIONS
          ================================== */}

          {!isUser && message.content && (
            <div className="flex items-center gap-1 mt-1.5 ml-1">

              <button
                onClick={handleCopy}
                className="
                  flex
                  items-center
                  gap-1.5
                  px-2
                  py-1
                  rounded-lg
                  text-[11px]
                  text-slate-600
                  hover:text-indigo-400
                  hover:bg-indigo-500/10
                  transition
                "
              >
                <span>
                  {copied ? "✓" : "⧉"}
                </span>

                <span>
                  {copied ? "Copied" : "Copy"}
                </span>
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default MessageBubble;
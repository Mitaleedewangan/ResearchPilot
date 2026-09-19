import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

function ChatWindow({ messages, loading }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  return (
    <div
      className="
        w-full
        bg-slate-950
        text-white
      "
    >
      <div
        className="
          max-w-5xl
          mx-auto
          px-4
          md:px-6
          py-6
          md:py-8
          space-y-6
        "
      >
        {messages.length === 0 ? (
          <div className="min-h-[300px] flex items-center justify-center">
            <p className="text-sm text-slate-500">
              Start a conversation with ResearchPilot.
            </p>
          </div>
        ) : (
          messages.map((message, index) => (
            <MessageBubble
              key={message.id || index}
              message={message}
            />
          ))
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}

export default ChatWindow;
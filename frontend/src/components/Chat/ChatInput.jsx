import { useState } from "react";

function ChatInput({ onSend, loading }) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!message.trim() || loading) return;

    onSend(message.trim());
    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div
      className="
        bg-slate-950/95
        backdrop-blur-xl
        px-4
        pt-3
        pb-4
      "
    >
      <form onSubmit={handleSubmit} className="max-w-5xl mx-auto">

        {/* =================================
            MAIN COMPOSER
        ================================== */}

        <div
          className="
            relative
            flex
            items-end
            gap-2
            bg-slate-900/80
            border
            border-slate-800
            rounded-2xl
            px-3
            py-3
            shadow-2xl
            shadow-black/20
            hover:border-slate-700
            focus-within:border-indigo-500/50
            focus-within:shadow-indigo-950/20
            transition-all
            duration-200
          "
        >

          {/* Plus Button */}

          <button
            type="button"
            disabled={loading}
            className="
              w-10
              h-10
              shrink-0
              rounded-xl
              flex
              items-center
              justify-center
              text-xl
              text-slate-500
              hover:text-indigo-400
              hover:bg-indigo-500/10
              disabled:opacity-30
              transition
            "
            title="More options"
          >
            +
          </button>

          {/* Textarea */}

          <textarea
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            onKeyDown={handleKeyDown}
            placeholder="Ask ResearchPilot anything..."
            rows={1}
            disabled={loading}
            className="
              flex-1
              resize-none
              bg-transparent
              outline-none
              text-sm
              text-slate-200
              placeholder:text-slate-600
              min-h-10
              max-h-32
              py-2.5
            "
          />

          {/* Send Button */}

          <button
            type="submit"
            disabled={!message.trim() || loading}
            className="
              w-10
              h-10
              shrink-0
              rounded-xl
              flex
              items-center
              justify-center
              bg-gradient-to-br
              from-indigo-500
              to-violet-600
              text-white
              shadow-lg
              shadow-indigo-950/30
              hover:from-indigo-400
              hover:to-violet-500
              hover:shadow-indigo-900/40
              disabled:bg-slate-800
              disabled:bg-none
              disabled:text-slate-600
              disabled:shadow-none
              disabled:cursor-not-allowed
              transition-all
              duration-200
            "
          >
            {loading ? (
              <span
                className="
                  w-4
                  h-4
                  border-2
                  border-white/30
                  border-t-white
                  rounded-full
                  animate-spin
                "
              />
            ) : (
              <span className="text-lg leading-none">
                ↑
              </span>
            )}
          </button>

        </div>

        {/* =================================
            HELPER TEXT
        ================================== */}

        <div
          className="
            flex
            items-center
            justify-center
            gap-2
            mt-2.5
          "
        >

          <span className="text-[11px] text-slate-600">
            ResearchPilot can search your documents and the web
          </span>

          <span className="text-slate-700">
            ·
          </span>

          <span className="text-[11px] text-slate-600">
            Enter to send
          </span>

          <span className="hidden sm:inline text-slate-700">
            ·
          </span>

          <span
            className="
              hidden
              sm:inline
              text-[11px]
              text-slate-600
            "
          >
            Shift + Enter for new line
          </span>

        </div>

      </form>
    </div>
  );
}

export default ChatInput;
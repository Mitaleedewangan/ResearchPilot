function WelcomeScreen({ onSuggestionClick }) {
  const suggestions = [
    {
      title: "Explain RAG",
      description: "Understand Retrieval-Augmented Generation",
      prompt: "Explain RAG in simple terms",
      icon: "🧠",
    },
    {
      title: "Analyze a topic",
      description: "Research a topic with AI reasoning",
      prompt: "Research the latest developments in Generative AI",
      icon: "🔎",
    },
    {
      title: "Ask about documents",
      description: "Find answers from your uploaded PDFs",
      prompt: "What are the main points in my uploaded documents?",
      icon: "📄",
    },
    {
      title: "Calculate something",
      description: "Use AI tools for calculations",
      prompt: "Calculate 245 × 38",
      icon: "🧮",
    },
  ];

  return (
    <div
      className="
        w-full
        min-h-full
        bg-slate-950
        text-white
        relative
        overflow-hidden
      "
    >
      {/* Background glow */}
      <div
        className="
          absolute
          top-[-180px]
          left-1/2
          -translate-x-1/2
          w-[600px]
          h-[420px]
          bg-indigo-600/10
          blur-[120px]
          rounded-full
          pointer-events-none
        "
      />

      <div
        className="
          absolute
          bottom-[-180px]
          right-[-120px]
          w-[420px]
          h-[320px]
          bg-violet-600/10
          blur-[110px]
          rounded-full
          pointer-events-none
        "
      />

      {/* Grid */}
      <div
        className="
          absolute inset-0
          opacity-[0.025]
          pointer-events-none
        "
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.5) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div
        className="
          relative
          max-w-5xl
          mx-auto
          px-4 md:px-6
          py-12 md:py-16
        "
      >
        {/* HERO */}
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <div
            className="
              w-16 h-16
              md:w-20 md:h-20
              rounded-2xl
              bg-gradient-to-br from-indigo-500 to-violet-600
              flex items-center justify-center
              shadow-2xl
              shadow-indigo-950/40
              mb-6
            "
          >
            <span className="text-3xl md:text-4xl">
              ✦
            </span>
          </div>

          {/* Badge */}
          <div
            className="
              inline-flex
              items-center gap-2
              px-3 py-1.5
              rounded-full
              bg-indigo-500/10
              border border-indigo-500/20
              text-indigo-400
              text-xs
              font-medium
              mb-5
            "
          >
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            AI Research Assistant
          </div>

          {/* Heading */}
          <h1
            className="
              text-4xl
              md:text-5xl
              lg:text-6xl
              font-bold
              tracking-tight
              leading-[1.08]
              text-white
            "
          >
            What can I research
            <span
              className="
                block
                mt-1
                bg-gradient-to-r
                from-indigo-400
                via-violet-400
                to-purple-400
                bg-clip-text
                text-transparent
              "
            >
              for you?
            </span>
          </h1>

          {/* Description */}
          <p
            className="
              mt-5
              max-w-2xl
              text-sm
              md:text-base
              leading-7
              text-slate-400
            "
          >
            ResearchPilot combines AI reasoning, document search,
            web research and intelligent tools to help you find
            and understand information faster.
          </p>
        </div>

        {/* SUGGESTIONS */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          {suggestions.map((item) => (
            <button
              key={item.title}
              onClick={() => onSuggestionClick(item.prompt)}
              className="
                group
                text-left
                p-4 md:p-5
                rounded-2xl
                bg-slate-900/70
                border border-slate-800
                hover:border-indigo-500/40
                hover:bg-slate-900
                transition-all duration-200
                shadow-lg
                shadow-black/10
              "
            >
              <div className="flex items-start gap-4">
                <div
                  className="
                    w-10 h-10
                    shrink-0
                    rounded-xl
                    bg-slate-800
                    border border-slate-700
                    flex items-center justify-center
                    text-lg
                    group-hover:bg-indigo-500/10
                    group-hover:border-indigo-500/20
                    transition
                  "
                >
                  {item.icon}
                </div>

                <div className="min-w-0">
                  <p
                    className="
                      text-sm
                      font-semibold
                      text-slate-200
                      group-hover:text-white
                    "
                  >
                    {item.title}
                  </p>

                  <p
                    className="
                      mt-1
                      text-xs
                      leading-5
                      text-slate-500
                    "
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* CAPABILITIES */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {[
            "Gemini AI",
            "RAG",
            "FAISS",
            "PDF Search",
            "Web Research",
            "Tool Calling",
            "Streaming",
          ].map((item) => (
            <span
              key={item}
              className="
                px-3 py-1.5
                rounded-full
                bg-slate-900
                border border-slate-800
                text-[11px]
                text-slate-500
              "
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WelcomeScreen;
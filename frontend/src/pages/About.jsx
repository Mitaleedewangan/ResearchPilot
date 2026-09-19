import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Navbar */}
      <header
        className="sticky top-0 z-50
                   border-b border-slate-800/70
                   bg-slate-950/80
                   backdrop-blur-xl"
      >

        <div className="max-w-7xl mx-auto px-5 lg:px-8">

          <div className="h-16 flex items-center justify-between">

            {/* Logo */}
            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex items-center gap-3"
            >

              <div
                className="w-9 h-9 rounded-xl
                           bg-gradient-to-br
                           from-indigo-500 to-violet-600
                           flex items-center justify-center"
              >
                <span className="font-bold">
                  R
                </span>
              </div>

              <div className="text-left">

                <p className="font-semibold text-sm">
                  ResearchPilot
                </p>

                <p className="text-[9px] text-slate-500">
                  AI Research Agent
                </p>

              </div>

            </button>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="text-xs text-slate-400
                         hover:text-white transition
                         flex items-center gap-2"
            >
              ← Back to home
            </button>

          </div>

        </div>

      </header>

      {/* Hero */}
      <main>

        <section className="max-w-5xl mx-auto px-5 pt-20 pb-16">

          <div className="max-w-3xl">

            <div
              className="inline-flex items-center gap-2
                         px-3 py-1.5
                         rounded-full
                         border border-indigo-500/20
                         bg-indigo-500/5
                         text-indigo-300
                         text-xs mb-6"
            >
              <span
                className="w-1.5 h-1.5 rounded-full
                           bg-indigo-400"
              />

              About ResearchPilot
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl
                         font-semibold
                         tracking-tight
                         leading-tight"
            >
              Research should feel
              <span
                className="text-transparent
                           bg-clip-text
                           bg-gradient-to-r
                           from-indigo-400
                           to-violet-400"
              >
                {" "}simpler.
              </span>
            </h1>

            <p
              className="mt-6
                         text-base
                         text-slate-400
                         leading-7
                         max-w-2xl"
            >
              ResearchPilot is an AI-powered research and
              knowledge workspace designed to help you work
              with information more efficiently.
            </p>

          </div>

        </section>

        {/* Mission */}
        <section className="border-y border-slate-800/70">

          <div className="max-w-5xl mx-auto px-5 py-20">

            <div className="grid md:grid-cols-2 gap-12">

              <div>

                <p className="text-xs uppercase tracking-widest text-indigo-400 font-medium mb-4">
                  Our purpose
                </p>

                <h2 className="text-3xl font-semibold">
                  From scattered information
                  to organized knowledge.
                </h2>

              </div>

              <div className="text-sm text-slate-500 leading-7">

                <p>
                  Research often means working across documents,
                  notes, questions and multiple sources.
                </p>

                <p className="mt-4">
                  ResearchPilot brings these activities together
                  in a single AI workspace where users can upload
                  documents, ask questions, retrieve relevant
                  context and generate structured research reports.
                </p>

              </div>

            </div>

          </div>

        </section>

        {/* Capabilities */}
        <section className="max-w-5xl mx-auto px-5 py-20">

          <div className="text-center max-w-2xl mx-auto">

            <p className="text-xs uppercase tracking-widest text-indigo-400 font-medium">
              What powers ResearchPilot
            </p>

            <h2 className="text-3xl font-semibold mt-3">
              Built around the research workflow
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-4 mt-12">

            {[
              {
                icon: "✦",
                title: "AI Reasoning",
                text: "Use an AI assistant to understand questions and work through research tasks.",
              },
              {
                icon: "◈",
                title: "Retrieval",
                text: "Retrieve relevant context from your uploaded documents using RAG.",
              },
              {
                icon: "▤",
                title: "Structured Reports",
                text: "Transform research findings into organized and readable reports.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-2xl
                           border border-slate-800
                           bg-slate-900/40
                           hover:bg-slate-900/70
                           hover:border-slate-700
                           transition"
              >

                <div
                  className="w-10 h-10 rounded-xl
                             bg-indigo-500/10
                             text-indigo-400
                             flex items-center justify-center
                             mb-5"
                >
                  {item.icon}
                </div>

                <h3 className="text-sm font-medium">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-500 leading-5 mt-2">
                  {item.text}
                </p>

              </div>
            ))}

          </div>

        </section>

        {/* CTA */}
        <section className="max-w-5xl mx-auto px-5 pb-24">

          <div
            className="rounded-3xl
                       border border-indigo-500/20
                       bg-gradient-to-br
                       from-indigo-500/10
                       via-slate-900
                       to-violet-500/10
                       p-10
                       text-center"
          >

            <h2 className="text-2xl sm:text-3xl font-semibold">
              Explore your research with AI.
            </h2>

            <p className="text-sm text-slate-500 mt-3">
              Create your ResearchPilot workspace and get started.
            </p>

            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="mt-6
                         px-6 py-3
                         rounded-xl
                         bg-indigo-600
                         hover:bg-indigo-500
                         text-sm
                         font-medium
                         transition"
            >
              Get started →
            </button>

          </div>

        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/70">

        <div
          className="max-w-5xl mx-auto
                     px-5 py-6
                     flex flex-col sm:flex-row
                     items-center
                     justify-between
                     gap-3"
        >

          <p className="text-[10px] text-slate-600">
            © 2026 ResearchPilot
          </p>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="text-[10px] text-slate-600
                       hover:text-indigo-400 transition"
          >
            Back to ResearchPilot
          </button>

        </div>

      </footer>

    </div>
  );
}

export default About;
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();
  const [mobileMenu, setMobileMenu] = useState(false);

  const goToLogin = () => {
    navigate("/login");
  };

  const goToSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">

      {/* ================================================= */}
      {/* BACKGROUND */}
      {/* ================================================= */}

      <div className="fixed inset-0 pointer-events-none overflow-hidden">

        <div
          className="absolute -top-60 left-1/2
                     -translate-x-1/2
                     w-[700px] h-[700px]
                     rounded-full
                     bg-indigo-600/10
                     blur-3xl"
        />

        <div
          className="absolute top-[45%] -left-60
                     w-[500px] h-[500px]
                     rounded-full
                     bg-violet-600/5
                     blur-3xl"
        />

        <div
          className="absolute top-[70%] -right-60
                     w-[500px] h-[500px]
                     rounded-full
                     bg-indigo-600/5
                     blur-3xl"
        />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

      </div>

      {/* ================================================= */}
      {/* NAVBAR */}
      {/* ================================================= */}

      <header className="relative z-50 border-b border-slate-800/60 bg-slate-950/70 backdrop-blur-xl">

        <div className="max-w-7xl mx-auto px-5 lg:px-8">

          <div className="h-16 flex items-center justify-between">

            {/* Logo */}
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-3"
            >

              <div
                className="w-9 h-9 rounded-xl
                           bg-gradient-to-br from-indigo-500 to-violet-600
                           flex items-center justify-center
                           shadow-lg shadow-indigo-950/30"
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

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">

              <a
                href="#features"
                className="text-sm text-slate-400 hover:text-white transition"
              >
                Features
              </a>

              <a
                href="#workflow"
                className="text-sm text-slate-400 hover:text-white transition"
              >
                How it works
              </a>

              <a
                href="/about"
                className="text-sm text-slate-400 hover:text-white transition"
              >
                About
              </a>

            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">

              <button
                type="button"
                onClick={goToLogin}
                className="px-4 py-2
                           rounded-lg
                           text-sm
                           text-slate-300
                           hover:text-white
                           hover:bg-slate-900
                           transition"
              >
                Sign in
              </button>

              <button
                type="button"
                onClick={goToSignup}
                className="px-4 py-2
                           rounded-lg
                           bg-indigo-600
                           hover:bg-indigo-500
                           text-sm
                           font-medium
                           transition
                           shadow-lg shadow-indigo-950/30"
              >
                Get started
              </button>

            </div>

            {/* Mobile Menu */}
            <button
              type="button"
              onClick={() => setMobileMenu(!mobileMenu)}
              className="md:hidden w-10 h-10
                         rounded-lg
                         border border-slate-800
                         text-slate-400
                         hover:text-white
                         hover:bg-slate-900"
            >
              {mobileMenu ? "×" : "☰"}
            </button>

          </div>

          {/* Mobile Navigation */}
          {mobileMenu && (
            <div className="md:hidden py-4 border-t border-slate-800">

              <div className="flex flex-col gap-2">

                <a
                  href="#features"
                  onClick={() => setMobileMenu(false)}
                  className="px-3 py-3 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-900"
                >
                  Features
                </a>

                <a
                  href="#workflow"
                  onClick={() => setMobileMenu(false)}
                  className="px-3 py-3 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-900"
                >
                  How it works
                </a>

                <button
                  type="button"
                  onClick={goToLogin}
                  className="text-left px-3 py-3 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-900"
                >
                  Sign in
                </button>

                <button
                  type="button"
                  onClick={goToSignup}
                  className="mt-1 px-3 py-3 rounded-lg bg-indigo-600 text-sm font-medium"
                >
                  Get started
                </button>

              </div>

            </div>
          )}

        </div>

      </header>

      {/* ================================================= */}
      {/* HERO */}
      {/* ================================================= */}

      <main className="relative z-10">

        <section className="max-w-7xl mx-auto px-5 lg:px-8 pt-20 lg:pt-28 pb-20">

          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* Hero Content */}
            <div>

              {/* Badge */}
              <div
                className="inline-flex items-center gap-2
                           px-3 py-1.5
                           rounded-full
                           border border-indigo-500/20
                           bg-indigo-500/5
                           text-indigo-300
                           text-xs
                           mb-6"
              >

                <span
                  className="w-1.5 h-1.5
                             rounded-full
                             bg-indigo-400
                             animate-pulse"
                />

                AI-powered research workspace

              </div>

              {/* Heading */}
              <h1
                className="text-5xl sm:text-6xl lg:text-[68px]
                           font-semibold
                           tracking-tight
                           leading-[1.02]"
              >

                Research

                <br />

                <span
                  className="text-transparent
                             bg-clip-text
                             bg-gradient-to-r
                             from-indigo-400
                             via-violet-400
                             to-indigo-400"
                >
                  smarter.
                </span>

                <br />

                Discover faster.

              </h1>

              {/* Description */}
              <p
                className="mt-6
                           text-base
                           text-slate-400
                           leading-7
                           max-w-xl"
              >
                ResearchPilot helps you search, understand and
                organize information using AI, document retrieval
                and intelligent research workflows.
              </p>

              {/* CTA */}
              <div className="flex flex-wrap gap-3 mt-8">

                <button
                  type="button"
                  onClick={goToSignup}
                  className="group
                             px-6 py-3.5
                             rounded-xl
                             bg-gradient-to-r
                             from-indigo-600
                             to-violet-600
                             hover:from-indigo-500
                             hover:to-violet-500
                             font-medium
                             text-sm
                             shadow-xl
                             shadow-indigo-950/30
                             transition-all"
                >

                  Start researching

                  <span
                    className="inline-block ml-2
                               transition-transform
                               group-hover:translate-x-1"
                  >
                    →
                  </span>

                </button>

                <button
                  type="button"
                  onClick={goToLogin}
                  className="px-6 py-3.5
                             rounded-xl
                             border border-slate-800
                             bg-slate-900/50
                             hover:bg-slate-900
                             hover:border-slate-700
                             text-sm
                             font-medium
                             text-slate-300
                             transition"
                >
                  Sign in
                </button>

              </div>

              {/* Trust */}
              <div className="flex flex-wrap items-center gap-5 mt-7">

                <div className="flex items-center gap-2">

                  <span className="text-emerald-400 text-sm">
                    ✓
                  </span>

                  <span className="text-xs text-slate-500">
                    AI-powered
                  </span>

                </div>

                <div className="w-px h-4 bg-slate-800" />

                <div className="flex items-center gap-2">

                  <span className="text-emerald-400 text-sm">
                    ✓
                  </span>

                  <span className="text-xs text-slate-500">
                    Document RAG
                  </span>

                </div>

                <div className="w-px h-4 bg-slate-800" />

                <div className="flex items-center gap-2">

                  <span className="text-emerald-400 text-sm">
                    ✓
                  </span>

                  <span className="text-xs text-slate-500">
                    Research reports
                  </span>

                </div>

              </div>

            </div>

            {/* ================================================= */}
            {/* PRODUCT PREVIEW */}
            {/* ================================================= */}

            <div className="relative">

              {/* Floating status */}
              <div
                className="absolute
                           -top-5
                           -right-2
                           lg:right-4
                           z-20
                           px-3 py-2
                           rounded-xl
                           border border-slate-800
                           bg-slate-900/90
                           backdrop-blur-xl
                           shadow-xl"
              >

                <div className="flex items-center gap-2">

                  <span
                    className="w-2 h-2
                               rounded-full
                               bg-emerald-400
                               animate-pulse"
                  />

                  <span className="text-[10px] text-slate-300">
                    AI Agent Ready
                  </span>

                </div>

              </div>

              {/* Browser window */}
              <div
                className="rounded-2xl
                           border border-slate-800
                           bg-slate-900/80
                           backdrop-blur-xl
                           overflow-hidden
                           shadow-2xl
                           shadow-black/30"
              >

                {/* Browser Header */}
                <div
                  className="h-11
                             flex items-center
                             justify-between
                             px-4
                             border-b border-slate-800"
                >

                  <div className="flex gap-1.5">

                    <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />

                  </div>

                  <span className="text-[9px] text-slate-600">
                    researchpilot.ai
                  </span>

                  <div className="w-10" />

                </div>

                {/* App */}
                <div className="grid grid-cols-[145px_1fr] min-h-[390px]">

                  {/* Sidebar */}
                  <div
                    className="border-r border-slate-800
                               bg-slate-950/50
                               p-3"
                  >

                    <div className="flex items-center gap-2 mb-7">

                      <div
                        className="w-7 h-7 rounded-lg
                                   bg-gradient-to-br
                                   from-indigo-500
                                   to-violet-600
                                   flex items-center justify-center"
                      >
                        <span className="text-[10px] font-bold">
                          R
                        </span>
                      </div>

                      <span className="text-[10px] font-medium">
                        ResearchPilot
                      </span>

                    </div>

                    <div
                      className="flex items-center gap-2
                                 px-2.5 py-2
                                 rounded-lg
                                 bg-indigo-500/10
                                 text-indigo-300
                                 text-[10px]"
                    >
                      💬 Chat
                    </div>

                    <div
                      className="flex items-center gap-2
                                 px-2.5 py-2
                                 mt-1
                                 rounded-lg
                                 text-slate-500
                                 text-[10px]"
                    >
                      🔍 Research History
                    </div>

                    <div className="mt-7">

                      <p className="text-[8px] uppercase tracking-wider text-slate-600 mb-2">
                        Knowledge Base
                      </p>

                      <div
                        className="px-2.5 py-2
                                   rounded-lg
                                   border border-slate-800
                                   text-[9px]
                                   text-slate-500"
                      >
                        📄 Research.pdf
                      </div>

                      <div
                        className="px-2.5 py-2 mt-1
                                   rounded-lg
                                   border border-slate-800
                                   text-[9px]
                                   text-slate-500"
                      >
                        📄 AI-Paper.pdf
                      </div>

                    </div>

                  </div>

                  {/* Chat Area */}
                  <div className="p-5">

                    <div className="flex items-center justify-between mb-6">

                      <div>

                        <p className="text-xs font-medium">
                          Research Assistant
                        </p>

                        <p className="text-[9px] text-slate-600 mt-1">
                          Context-aware AI workspace
                        </p>

                      </div>

                      <span
                        className="px-2 py-1
                                   rounded-lg
                                   bg-emerald-500/10
                                   text-emerald-400
                                   text-[8px]"
                      >
                        ● Online
                      </span>

                    </div>

                    {/* User Message */}
                    <div className="flex justify-end mb-5">

                      <div
                        className="max-w-[75%]
                                   px-3.5 py-2.5
                                   rounded-2xl
                                   rounded-br-md
                                   bg-indigo-600
                                   text-[10px]
                                   leading-4"
                      >
                        What are the key findings from my uploaded papers?
                      </div>

                    </div>

                    {/* AI */}
                    <div className="flex gap-3">

                      <div
                        className="w-7 h-7 shrink-0
                                   rounded-lg
                                   bg-slate-800
                                   flex items-center justify-center"
                      >
                        ✦
                      </div>

                      <div className="max-w-[80%]">

                        <p className="text-[10px] text-slate-300 leading-5">
                          I found relevant information across
                          your uploaded documents.
                        </p>

                        {/* Sources */}
                        <div className="mt-3 space-y-2">

                          <div
                            className="p-2.5
                                       rounded-lg
                                       bg-slate-950
                                       border border-slate-800"
                          >

                            <div className="flex items-center gap-2">

                              <span className="text-indigo-400 text-[9px]">
                                01
                              </span>

                              <span className="text-[9px] text-slate-400">
                                Research.pdf
                              </span>

                            </div>

                            <p className="text-[9px] text-slate-600 mt-1">
                              Relevant context retrieved from document...
                            </p>

                          </div>

                          <div
                            className="p-2.5
                                       rounded-lg
                                       bg-slate-950
                                       border border-slate-800"
                          >

                            <div className="flex items-center gap-2">

                              <span className="text-violet-400 text-[9px]">
                                02
                              </span>

                              <span className="text-[9px] text-slate-400">
                                AI-Paper.pdf
                              </span>

                            </div>

                            <p className="text-[9px] text-slate-600 mt-1">
                              Additional context found in source...
                            </p>

                          </div>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

              {/* Bottom floating card */}
              <div
                className="absolute
                           -bottom-5
                           -left-5
                           hidden sm:block
                           px-4 py-3
                           rounded-xl
                           border border-slate-800
                           bg-slate-900/95
                           backdrop-blur-xl
                           shadow-xl"
              >

                <div className="flex items-center gap-3">

                  <div
                    className="w-8 h-8 rounded-lg
                               bg-indigo-500/10
                               flex items-center justify-center"
                  >
                    ◈
                  </div>

                  <div>

                    <p className="text-[10px] text-slate-300">
                      RAG Retrieval
                    </p>

                    <p className="text-[9px] text-emerald-400 mt-0.5">
                      Context found
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* ================================================= */}
        {/* FEATURES */}
        {/* ================================================= */}

        <section
          id="features"
          className="border-y border-slate-800/70"
        >

          <div className="max-w-7xl mx-auto px-5 lg:px-8 py-20">

            <div className="max-w-2xl mb-12">

              <p className="text-xs uppercase tracking-widest text-indigo-400 font-medium mb-3">
                Built for research
              </p>

              <h2 className="text-3xl sm:text-4xl font-semibold">
                Everything you need to
                <span className="text-slate-500">
                  {" "}research with context.
                </span>
              </h2>

              <p className="text-sm text-slate-500 mt-4 leading-6">
                ResearchPilot brings your documents, AI reasoning
                and research workflow into one focused workspace.
              </p>

            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">

              {[
                {
                  icon: "✦",
                  title: "AI Research",
                  text: "Ask questions and let the AI reason over your research context.",
                },
                {
                  icon: "◈",
                  title: "Document RAG",
                  text: "Retrieve relevant information from your uploaded PDF documents.",
                },
                {
                  icon: "⌁",
                  title: "AI Tools",
                  text: "Combine retrieval, calculations and research tools in one workflow.",
                },
                {
                  icon: "▤",
                  title: "Research Reports",
                  text: "Turn your research into structured summaries and findings.",
                },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="group
                             p-5
                             rounded-2xl
                             border border-slate-800
                             bg-slate-900/40
                             hover:bg-slate-900/80
                             hover:border-slate-700
                             transition-all
                             duration-300"
                >

                  <div
                    className="w-10 h-10
                               rounded-xl
                               bg-indigo-500/10
                               text-indigo-400
                               flex items-center justify-center
                               mb-5
                               group-hover:bg-indigo-500/15
                               transition"
                  >
                    {feature.icon}
                  </div>

                  <h3 className="text-sm font-medium">
                    {feature.title}
                  </h3>

                  <p className="text-xs text-slate-500 leading-5 mt-2">
                    {feature.text}
                  </p>

                  <div
                    className="mt-5
                               text-[10px]
                               text-indigo-400
                               opacity-0
                               group-hover:opacity-100
                               transition"
                  >
                    Explore →
                  </div>

                </div>
              ))}

            </div>

          </div>

        </section>

        {/* ================================================= */}
        {/* WORKFLOW */}
        {/* ================================================= */}

        <section
          id="workflow"
          className="max-w-7xl mx-auto px-5 lg:px-8 py-24"
        >

          <div className="text-center max-w-2xl mx-auto">

            <p className="text-xs uppercase tracking-widest text-indigo-400 font-medium mb-3">
              Simple workflow
            </p>

            <h2 className="text-3xl sm:text-4xl font-semibold">
              From question to insight
            </h2>

            <p className="text-sm text-slate-500 mt-4">
              A research workflow designed to keep your context
              organized while AI handles the heavy lifting.
            </p>

          </div>

          <div className="grid md:grid-cols-4 gap-4 mt-14">

            {[
              {
                number: "01",
                title: "Upload",
                text: "Add your research papers and documents to your knowledge base.",
              },
              {
                number: "02",
                title: "Ask",
                text: "Ask questions naturally using the AI research assistant.",
              },
              {
                number: "03",
                title: "Retrieve",
                text: "Relevant context is retrieved from your documents using RAG.",
              },
              {
                number: "04",
                title: "Discover",
                text: "Get structured answers, findings and research reports.",
              },
            ].map((step, index) => (
              <div
                key={step.number}
                className="relative p-5"
              >

                {index !== 3 && (
                  <div
                    className="hidden md:block
                               absolute top-9 left-[70%]
                               w-[60%]
                               h-px
                               bg-slate-800"
                  />
                )}

                <div
                  className="relative z-10
                             w-10 h-10
                             rounded-xl
                             border border-slate-800
                             bg-slate-900
                             flex items-center justify-center
                             text-xs
                             text-indigo-400
                             mb-5"
                >
                  {step.number}
                </div>

                <h3 className="text-sm font-medium">
                  {step.title}
                </h3>

                <p className="text-xs text-slate-500 leading-5 mt-2">
                  {step.text}
                </p>

              </div>
            ))}

          </div>

        </section>

        {/* ================================================= */}
        {/* CTA */}
        {/* ================================================= */}

        <section
          
          className="max-w-5xl mx-auto px-5 pb-24"
        >

          <div
            className="relative
                       overflow-hidden
                       rounded-3xl
                       border border-indigo-500/20
                       bg-gradient-to-br
                       from-indigo-500/10
                       via-slate-900
                       to-violet-500/10
                       p-10 sm:p-14
                       text-center"
          >

            <div
              className="absolute
                         top-[-100px]
                         left-1/2
                         -translate-x-1/2
                         w-72 h-72
                         rounded-full
                         bg-indigo-500/10
                         blur-3xl"
            />

            <div className="relative">

              <div
                className="w-12 h-12
                           mx-auto
                           rounded-2xl
                           bg-gradient-to-br
                           from-indigo-500
                           to-violet-600
                           flex items-center justify-center
                           mb-6"
              >
                ✦
              </div>

              <h2 className="text-3xl sm:text-4xl font-semibold">
                Ready to research smarter?
              </h2>

              <p className="text-sm text-slate-500 mt-4 max-w-lg mx-auto leading-6">
                Create your ResearchPilot workspace and start
                exploring your documents with AI.
              </p>

              <button
                type="button"
                onClick={goToSignup}
                className="mt-7
                           px-7 py-3.5
                           rounded-xl
                           bg-white
                           text-slate-950
                           text-sm
                           font-semibold
                           hover:bg-slate-100
                           transition
                           shadow-xl"
              >
                Create your workspace →
              </button>

            </div>

          </div>

        </section>

      </main>

      {/* ================================================= */}
      {/* FOOTER */}
      {/* ================================================= */}

     {/* ================================================= */}
{/* FOOTER */}
{/* ================================================= */}

<footer className="relative border-t border-slate-800/70 bg-slate-950">

  <div className="max-w-7xl mx-auto px-5 lg:px-8">

    {/* Main Footer */}
    <div className="py-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">

      {/* Brand */}
      <div className="lg:col-span-2">

        <div className="flex items-center gap-3">

          <div
            className="w-10 h-10 rounded-xl
                       bg-gradient-to-br
                       from-indigo-500 to-violet-600
                       flex items-center justify-center
                       shadow-lg shadow-indigo-950/30"
          >
            <span className="font-bold text-lg">
              R
            </span>
          </div>

          <div>
            <p className="font-semibold text-sm text-white">
              ResearchPilot
            </p>

            <p className="text-[10px] text-slate-500 mt-0.5">
              AI Research & Knowledge Agent
            </p>
          </div>

        </div>

        <p className="text-xs text-slate-500 leading-5 mt-5 max-w-sm">
          A focused AI workspace for researching documents,
          retrieving knowledge and turning information into
          meaningful insights.
        </p>

        {/* Status */}
        <div className="flex items-center gap-2 mt-5">

          <span
            className="w-2 h-2 rounded-full
                       bg-emerald-400"
          />

          <span className="text-[10px] text-slate-500">
            AI research workspace
          </span>

        </div>

      </div>

      {/* Product */}
      <div>

        <p className="text-xs font-semibold text-slate-300 mb-4">
          Product
        </p>

        <div className="space-y-3">

          <button
            type="button"
            onClick={() => {
              document
                .getElementById("features")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="block text-xs text-slate-500
                       hover:text-indigo-400 transition"
          >
            Features
          </button>

          <button
            type="button"
            onClick={() => {
              document
                .getElementById("workflow")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="block text-xs text-slate-500
                       hover:text-indigo-400 transition"
          >
            How it works
          </button>

          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="block text-xs text-slate-500
                       hover:text-indigo-400 transition"
          >
            Get started
          </button>

        </div>

      </div>

      {/* Company */}
      <div>

        <p className="text-xs font-semibold text-slate-300 mb-4">
          Company
        </p>

        <div className="space-y-3">

          <button
            type="button"
            onClick={() => navigate("/about")}
            className="block text-xs text-slate-500
                       hover:text-indigo-400 transition"
          >
            About ResearchPilot
          </button>

          <button
            type="button"
            onClick={goToLogin}
            className="block text-xs text-slate-500
                       hover:text-indigo-400 transition"
          >
            Sign in
          </button>

          <button
            type="button"
            onClick={goToSignup}
            className="block text-xs text-slate-500
                       hover:text-indigo-400 transition"
          >
            Create account
          </button>

        </div>

      </div>

    </div>

    {/* Bottom Footer */}
    <div
      className="border-t border-slate-800/70
                 py-5
                 flex flex-col sm:flex-row
                 items-center
                 justify-between
                 gap-3"
    >

      <p className="text-[10px] text-slate-600">
        © 2026 ResearchPilot. All rights reserved.
      </p>

      <div className="flex items-center gap-5">

        <button
          type="button"
          className="text-[10px] text-slate-600
                     hover:text-slate-400 transition"
        >
          Privacy
        </button>

        <button
          type="button"
          className="text-[10px] text-slate-600
                     hover:text-slate-400 transition"
        >
          Terms
        </button>

        <span className="text-[10px] text-slate-700">
          Built with AI
        </span>

      </div>

    </div>

  </div>

</footer>

    </div>
  );
}

export default Landing;
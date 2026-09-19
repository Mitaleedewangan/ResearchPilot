import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await login(email, password);

      console.log("Login successful:", data);

      alert("Login successful!");
      navigate("/app");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.detail ||
          "Login failed. Please check your email and password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full bg-slate-950 text-white overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-48 -left-40
                     w-[450px] h-[450px]
                     rounded-full bg-indigo-600/10 blur-3xl"
        />

        <div
          className="absolute -bottom-48 -right-40
                     w-[450px] h-[450px]
                     rounded-full bg-violet-600/10 blur-3xl"
        />
      </div>

      {/* Main */}
      <div className="relative h-full w-full grid lg:grid-cols-2 overflow-hidden">

        {/* ================================================= */}
        {/* LEFT SIDE */}
        {/* ================================================= */}

        <div className="hidden lg:flex h-full items-center px-10 xl:px-16">

          <div className="w-full max-w-xl">

            {/* Logo */}
            <div className="flex items-center gap-3 mb-6">

              <div
                className="w-10 h-10 rounded-xl
                           bg-gradient-to-br from-indigo-500 to-violet-600
                           flex items-center justify-center
                           shadow-lg shadow-indigo-950/40"
              >
                <span className="font-bold text-lg">
                  R
                </span>
              </div>

              <div>
                <p className="font-semibold text-sm">
                  ResearchPilot
                </p>

                <p className="text-[10px] text-slate-500">
                  AI Research Agent
                </p>
              </div>

            </div>

            {/* Heading */}
            <div>

              <div
                className="inline-flex items-center gap-2
                           px-3 py-1.5 mb-4
                           rounded-full
                           border border-indigo-500/20
                           bg-indigo-500/5
                           text-indigo-300
                           text-[11px]"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full
                             bg-indigo-400 animate-pulse"
                />

                AI-powered research workspace
              </div>

              <h1 className="text-4xl xl:text-[46px] font-semibold leading-[1.08]">

                Research smarter.

                <br />

                <span
                  className="text-transparent
                             bg-clip-text
                             bg-gradient-to-r
                             from-indigo-400
                             to-violet-400"
                >
                  Discover faster.
                </span>

              </h1>

              <p className="mt-4 text-sm text-slate-400 leading-6 max-w-lg">
                Search, analyze and understand your research with
                an AI assistant powered by intelligent retrieval,
                document analysis and automated research workflows.
              </p>

            </div>

            {/* AI Preview */}
            <div
              className="mt-7
                         rounded-2xl
                         border border-slate-800
                         bg-slate-900/70
                         backdrop-blur-xl
                         overflow-hidden"
            >

              {/* Header */}
              <div
                className="flex items-center justify-between
                           px-4 py-3
                           border-b border-slate-800"
              >

                <div className="flex items-center gap-2">

                  <div
                    className="w-7 h-7 rounded-lg
                               bg-gradient-to-br
                               from-indigo-500 to-violet-600
                               flex items-center justify-center"
                  >
                    <span className="text-xs font-bold">
                      R
                    </span>
                  </div>

                  <span className="text-xs text-slate-300">
                    ResearchPilot
                  </span>

                </div>

                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-slate-700" />
                  <span className="w-2 h-2 rounded-full bg-slate-700" />
                  <span className="w-2 h-2 rounded-full bg-slate-700" />
                </div>

              </div>

              {/* Chat */}
              <div className="p-4 space-y-3">

                <div className="flex justify-end">

                  <div
                    className="max-w-[72%]
                               rounded-2xl rounded-br-md
                               bg-indigo-600/90
                               px-4 py-2.5
                               text-[11px]"
                  >
                    Summarize the key findings from my research papers.
                  </div>

                </div>

                <div className="flex gap-3">

                  <div
                    className="w-7 h-7 shrink-0 rounded-lg
                               bg-slate-800
                               flex items-center justify-center"
                  >
                    ✦
                  </div>

                  <div className="pt-1">

                    <p className="text-[11px] text-slate-300">
                      ResearchPilot is analyzing your documents...
                    </p>

                    <div className="flex gap-1 mt-2">

                      <span
                        className="w-1.5 h-1.5
                                   bg-indigo-400
                                   rounded-full animate-bounce"
                      />

                      <span
                        className="w-1.5 h-1.5
                                   bg-indigo-400
                                   rounded-full
                                   animate-bounce
                                   [animation-delay:150ms]"
                      />

                      <span
                        className="w-1.5 h-1.5
                                   bg-indigo-400
                                   rounded-full
                                   animate-bounce
                                   [animation-delay:300ms]"
                      />

                    </div>

                  </div>

                </div>

                <div className="flex gap-2 pt-1">

                  <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-[9px] text-slate-400">
                    RAG Retrieval
                  </span>

                  <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-[9px] text-slate-400">
                    AI Analysis
                  </span>

                  <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-[9px] text-slate-400">
                    Research Reports
                  </span>

                </div>

              </div>

            </div>

            {/* Features */}
            <div className="flex gap-6 mt-5">

              <div>
                <p className="text-xs font-medium text-slate-200">
                  Intelligent
                </p>

                <p className="text-[10px] text-slate-500 mt-1">
                  AI-powered reasoning
                </p>
              </div>

              <div className="w-px bg-slate-800" />

              <div>
                <p className="text-xs font-medium text-slate-200">
                  Context-aware
                </p>

                <p className="text-[10px] text-slate-500 mt-1">
                  RAG document search
                </p>
              </div>

              <div className="w-px bg-slate-800" />

              <div>
                <p className="text-xs font-medium text-slate-200">
                  Organized
                </p>

                <p className="text-[10px] text-slate-500 mt-1">
                  Research history
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* ================================================= */}
        {/* RIGHT SIDE */}
        {/* ================================================= */}

        <div className="h-full flex items-center justify-center px-5">

          <div className="w-full max-w-md">

            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center justify-center gap-3 mb-7">

              <div
                className="w-10 h-10 rounded-xl
                           bg-gradient-to-br
                           from-indigo-500 to-violet-600
                           flex items-center justify-center"
              >
                <span className="font-bold">
                  R
                </span>
              </div>

              <div>
                <p className="font-semibold text-sm">
                  ResearchPilot
                </p>

                <p className="text-[10px] text-slate-500">
                  AI Research Agent
                </p>
              </div>

            </div>

            {/* Heading */}
            <div className="mb-6">

              <p className="text-[10px] text-indigo-400 font-medium mb-2">
                WELCOME BACK
              </p>

              <h2 className="text-2xl xl:text-3xl font-semibold">
                Sign in to your workspace
              </h2>

              <p className="text-xs text-slate-500 mt-2">
                Continue your research with ResearchPilot.
              </p>

            </div>

            {/* Card */}
            <div
              className="rounded-2xl
                         border border-slate-800
                         bg-slate-900/60
                         backdrop-blur-xl
                         p-6"
            >

              <form
                onSubmit={handleLogin}
                className="space-y-4"
              >

                {/* Email */}
                <div>

                  <label className="block text-xs font-medium text-slate-300 mb-2">
                    Email address
                  </label>

                  <div className="relative">

                    <span
                      className="absolute left-4 top-1/2
                                 -translate-y-1/2
                                 text-slate-500 text-sm"
                    >
                      ✉
                    </span>

                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full
                                 h-12
                                 bg-slate-950
                                 border border-slate-800
                                 rounded-xl
                                 pl-11 pr-4
                                 text-sm
                                 text-slate-200
                                 placeholder:text-slate-600
                                 outline-none
                                 transition
                                 focus:border-indigo-500
                                 focus:ring-4
                                 focus:ring-indigo-500/10"
                      required
                    />

                  </div>

                </div>

                {/* Password */}
                <div>

                  <div className="flex justify-between mb-2">

                    <label className="text-xs font-medium text-slate-300">
                      Password
                    </label>

                    <span className="text-[10px] text-slate-600">
                      Protected
                    </span>

                  </div>

                  <div className="relative">

                    <span
                      className="absolute left-4 top-1/2
                                 -translate-y-1/2
                                 text-slate-500 text-sm"
                    >
                      🔒
                    </span>

                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full
                                 h-12
                                 bg-slate-950
                                 border border-slate-800
                                 rounded-xl
                                 pl-11 pr-12
                                 text-sm
                                 text-slate-200
                                 placeholder:text-slate-600
                                 outline-none
                                 transition
                                 focus:border-indigo-500
                                 focus:ring-4
                                 focus:ring-indigo-500/10"
                      required
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-1/2
                                 -translate-y-1/2
                                 w-8 h-8
                                 rounded-lg
                                 text-slate-500
                                 hover:text-slate-300
                                 hover:bg-slate-800
                                 transition"
                      title={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showPassword ? "◉" : "○"}
                    </button>

                  </div>

                </div>

                {/* Remember */}
                <div className="flex items-center gap-2 pt-1">

                  <input
                    type="checkbox"
                    id="remember"
                    className="accent-indigo-600"
                  />

                  <label
                    htmlFor="remember"
                    className="text-[11px] text-slate-500 cursor-pointer"
                  >
                    Remember me
                  </label>

                </div>

                {/* Login */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group w-full
                             h-12
                             rounded-xl
                             bg-gradient-to-r
                             from-indigo-600
                             to-violet-600
                             hover:from-indigo-500
                             hover:to-violet-500
                             disabled:opacity-60
                             disabled:cursor-not-allowed
                             text-sm
                             font-medium
                             shadow-lg
                             shadow-indigo-950/30
                             transition-all"
                >

                  <span className="flex items-center justify-center gap-2">

                    {loading ? (
                      <>
                        <span
                          className="w-4 h-4
                                     border-2
                                     border-white/30
                                     border-t-white
                                     rounded-full
                                     animate-spin"
                        />

                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign in to ResearchPilot

                        <span className="transition-transform group-hover:translate-x-1">
                          →
                        </span>
                      </>
                    )}

                  </span>

                </button>

              </form>

              {/* Divider */}
              <div className="flex items-center gap-3 my-5">

                <div className="flex-1 h-px bg-slate-800" />

                <span className="text-[9px] text-slate-600">
                  SECURE WORKSPACE
                </span>

                <div className="flex-1 h-px bg-slate-800" />

              </div>

              {/* Security */}
              <div
                className="flex items-center gap-3
                           p-3
                           rounded-xl
                           bg-slate-950/70
                           border border-slate-800"
              >

                <div
                  className="w-8 h-8 shrink-0
                             rounded-lg
                             bg-emerald-500/10
                             flex items-center justify-center"
                >
                  <span className="text-emerald-400 text-sm">
                    ✓
                  </span>
                </div>

                <div>

                  <p className="text-[11px] text-slate-300">
                    Your research stays protected
                  </p>

                  <p className="text-[9px] text-slate-600 mt-0.5">
                    Secure authentication for your workspace
                  </p>

                </div>

              </div>

            </div>

            <p className="text-center text-[10px] text-slate-700 mt-4">
              ResearchPilot • AI Research & Knowledge Agent
            </p>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Login;
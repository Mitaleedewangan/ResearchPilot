import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/authService";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await signup(name, email, password);

      console.log("Signup successful:", data);

      alert("Account created successfully!");
      navigate("/login");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.detail ||
          "Signup failed. Please try again."
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

                Start your research journey
              </div>

              <h1 className="text-4xl xl:text-[46px] font-semibold leading-[1.08]">

                Turn information into

                <br />

                <span
                  className="text-transparent
                             bg-clip-text
                             bg-gradient-to-r
                             from-indigo-400
                             to-violet-400"
                >
                  meaningful insights.
                </span>

              </h1>

              <p className="mt-4 text-sm text-slate-400 leading-6 max-w-lg">
                Create your ResearchPilot workspace and bring your
                documents, questions and research workflow together
                in one intelligent AI workspace.
              </p>

            </div>

            {/* Feature Cards */}
            <div className="mt-8 grid grid-cols-2 gap-3">

              <div
                className="p-4 rounded-2xl
                           border border-slate-800
                           bg-slate-900/60"
              >
                <div
                  className="w-9 h-9 rounded-xl
                             bg-indigo-500/10
                             flex items-center justify-center
                             mb-3"
                >
                  ✦
                </div>

                <p className="text-sm font-medium text-slate-200">
                  AI Research
                </p>

                <p className="text-[10px] text-slate-500 mt-1 leading-4">
                  Ask questions and get intelligent,
                  context-aware answers.
                </p>
              </div>

              <div
                className="p-4 rounded-2xl
                           border border-slate-800
                           bg-slate-900/60"
              >
                <div
                  className="w-9 h-9 rounded-xl
                             bg-violet-500/10
                             flex items-center justify-center
                             mb-3"
                >
                  ◈
                </div>

                <p className="text-sm font-medium text-slate-200">
                  Document RAG
                </p>

                <p className="text-[10px] text-slate-500 mt-1 leading-4">
                  Search your uploaded PDFs using
                  retrieval-augmented generation.
                </p>
              </div>

              <div
                className="p-4 rounded-2xl
                           border border-slate-800
                           bg-slate-900/60"
              >
                <div
                  className="w-9 h-9 rounded-xl
                             bg-indigo-500/10
                             flex items-center justify-center
                             mb-3"
                >
                  ◎
                </div>

                <p className="text-sm font-medium text-slate-200">
                  Research History
                </p>

                <p className="text-[10px] text-slate-500 mt-1 leading-4">
                  Keep your conversations organized
                  across research sessions.
                </p>
              </div>

              <div
                className="p-4 rounded-2xl
                           border border-slate-800
                           bg-slate-900/60"
              >
                <div
                  className="w-9 h-9 rounded-xl
                             bg-violet-500/10
                             flex items-center justify-center
                             mb-3"
                >
                  ↗
                </div>

                <p className="text-sm font-medium text-slate-200">
                  Research Reports
                </p>

                <p className="text-[10px] text-slate-500 mt-1 leading-4">
                  Transform research into structured
                  reports and insights.
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
            <div className="lg:hidden flex items-center justify-center gap-3 mb-6">

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
            <div className="mb-5">

              <p className="text-[10px] text-indigo-400 font-medium mb-2">
                GET STARTED
              </p>

              <h2 className="text-2xl xl:text-3xl font-semibold">
                Create your workspace
              </h2>

              <p className="text-xs text-slate-500 mt-2">
                Start exploring your research with AI.
              </p>

            </div>

            {/* Signup Card */}
            <div
              className="rounded-2xl
                         border border-slate-800
                         bg-slate-900/60
                         backdrop-blur-xl
                         p-6"
            >

              <form
                onSubmit={handleSignup}
                className="space-y-4"
              >

                {/* Name */}
                <div>

                  <label className="block text-xs font-medium text-slate-300 mb-2">
                    Full name
                  </label>

                  <div className="relative">

                    <span
                      className="absolute left-4 top-1/2
                                 -translate-y-1/2
                                 text-slate-500 text-sm"
                    >
                      ◯
                    </span>

                    <input
                      type="text"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
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

                  <label className="block text-xs font-medium text-slate-300 mb-2">
                    Password
                  </label>

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
                      placeholder="Create a password"
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

                {/* Terms */}
                <div className="flex items-start gap-2 pt-1">

                  <input
                    type="checkbox"
                    id="terms"
                    required
                    className="mt-0.5 accent-indigo-600"
                  />

                  <label
                    htmlFor="terms"
                    className="text-[10px] leading-4 text-slate-500"
                  >
                    I agree to use ResearchPilot responsibly
                    and keep my account information secure.
                  </label>

                </div>

                {/* Signup Button */}
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
                             text-white
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

                        Creating workspace...
                      </>
                    ) : (
                      <>
                        Create ResearchPilot Account

                        <span
                          className="transition-transform
                                     group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </>
                    )}

                  </span>

                </button>

              </form>

              {/* Login */}
              <div
                className="mt-5 pt-5
                           border-t border-slate-800
                           text-center"
              >

                <p className="text-xs text-slate-500">

                  Already have an account?

                  <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="ml-1
                               text-indigo-400
                               hover:text-indigo-300
                               font-medium
                               transition"
                  >
                    Sign in
                  </button>

                </p>

              </div>

            </div>

            {/* Security */}
            <div className="flex items-center justify-center gap-2 mt-4">

              <span className="text-emerald-400 text-xs">
                ✓
              </span>

              <span className="text-[10px] text-slate-600">
                Secure account authentication
              </span>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default SignUp;
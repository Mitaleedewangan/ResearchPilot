import { useNavigate } from "react-router-dom";
import { getUser, logout } from "../utils/auth";

function Header() {
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const userName = user?.name || "Researcher";
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <header
  className="
    h-16
    min-h-16
    shrink-0
    w-full
    bg-slate-900/95
    backdrop-blur-xl
    border-b border-slate-700/70
    flex items-center justify-between
    px-4 md:px-6
    relative
    z-10
  "
>
      {/* LEFT */}
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <h2 className="text-base md:text-lg font-semibold text-white truncate">
            AI Research Workspace
          </h2>

          <span
            className="
              hidden sm:inline-flex
              items-center
              px-2 py-0.5
              rounded-full
              bg-indigo-500/10
              border border-indigo-500/20
              text-[10px]
              font-medium
              text-indigo-400
            "
          >
            ResearchPilot
          </span>
        </div>

        <p className="hidden sm:block text-xs text-slate-500 mt-0.5">
          Ask questions, analyze documents and research the web
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* AI STATUS */}
        <div
          className="
            hidden sm:flex
            items-center gap-2
            px-3 py-2
            rounded-lg
            bg-emerald-500/10
            border border-emerald-500/20
          "
        >
          <span className="relative flex w-2 h-2">
            <span
              className="
                absolute
                inline-flex
                w-full h-full
                rounded-full
                bg-emerald-400
                opacity-50
                animate-ping
              "
            />

            <span
              className="
                relative
                inline-flex
                w-2 h-2
                rounded-full
                bg-emerald-400
              "
            />
          </span>

          <span className="text-xs font-medium text-emerald-400">
            AI Online
          </span>
        </div>

        <div className="hidden md:block h-7 w-px bg-slate-700" />

        {/* USER */}
        {user && (
          <div className="flex items-center gap-2.5">
            <div
              className="
                w-9 h-9
                rounded-full
                bg-gradient-to-br from-indigo-500 to-violet-600
                flex items-center justify-center
                text-white
                text-sm
                font-semibold
                shadow-lg
                shadow-indigo-950/30
              "
            >
              {userInitial}
            </div>

            <div className="hidden md:block max-w-28">
              <p className="text-sm font-medium text-slate-200 truncate">
                {userName}
              </p>

              <p className="text-[10px] text-slate-500">
                Researcher
              </p>
            </div>
          </div>
        )}

        {/* SETTINGS */}
        <button
          className="
            w-9 h-9
            rounded-lg
            border border-slate-700
            bg-slate-950/50
            text-slate-400
            hover:text-white
            hover:bg-slate-800
            hover:border-slate-600
            transition-all duration-200
          "
          title="Settings"
        >
          ⚙
        </button>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="
            px-3 py-2
            rounded-lg
            border border-slate-700
            bg-slate-950/50
            text-sm
            font-medium
            text-slate-400
            hover:text-red-400
            hover:bg-red-500/10
            hover:border-red-500/20
            transition-all duration-200
          "
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
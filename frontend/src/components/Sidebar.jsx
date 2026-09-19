// import { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { getChatSessions } from "../services/chatService";
// import { getUser } from "../utils/auth";

// function Sidebar({
//   onUpload,
//   documents = [],
//   onNewChat,
//   onSelectSession,
// }) {
//   const [collapsed, setCollapsed] = useState(false);
//   const [sessions, setSessions] = useState([]);

//   const fileInputRef = useRef(null);
//   const navigate = useNavigate();

//   const user = getUser();

//   useEffect(() => {
//     const loadSessions = async () => {
//       try {
//         const data = await getChatSessions();

//         if (data.success) {
//           setSessions(data.sessions || []);
//         }
//       } catch (error) {
//         console.error("Failed to load research history:", error);
//       }
//     };

//     loadSessions();
//   }, []);

//   const handleFileChange = (e) => {
//     const file = e.target.files?.[0];

//     if (!file) return;

//     if (file.type !== "application/pdf") {
//       alert("Please select a PDF file.");
//       e.target.value = "";
//       return;
//     }

//     if (onUpload) {
//       onUpload(file);
//     }

//     e.target.value = "";
//   };

//   const openFilePicker = () => {
//     fileInputRef.current?.click();
//   };

//   const userName = user?.name || "Researcher";
//   const userInitial = userName.charAt(0).toUpperCase();

//   return (
//     <aside
//       className={`
//         h-screen
//         shrink-0
//         bg-slate-900
//         border-r border-slate-700/70
//         text-white
//         flex flex-col
//         transition-all duration-300
//         relative
//         z-20
//         ${collapsed ? "w-20" : "w-72"}
//       `}
//     >
//       {/* ================= LOGO ================= */}
//       <div
//         className="
//           h-16
//           shrink-0
//           flex items-center justify-between
//           px-4
//           border-b border-slate-700/70
//           bg-slate-900
//         "
//       >
//         {!collapsed && (
//           <div className="flex items-center gap-3 min-w-0">
//             <div
//               className="
//                 w-9 h-9 shrink-0
//                 rounded-xl
//                 bg-gradient-to-br from-indigo-500 to-violet-600
//                 flex items-center justify-center
//                 shadow-lg shadow-indigo-950/40
//               "
//             >
//               <span className="text-white font-bold text-sm">
//                 R
//               </span>
//             </div>

//             <div className="min-w-0">
//               <h1 className="font-semibold text-sm text-white">
//                 ResearchPilot
//               </h1>

//               <p className="text-[11px] text-slate-500">
//                 AI Research Agent
//               </p>
//             </div>
//           </div>
//         )}

//         {collapsed && (
//           <div
//             className="
//               w-9 h-9
//               rounded-xl
//               bg-gradient-to-br from-indigo-500 to-violet-600
//               flex items-center justify-center
//               mx-auto
//               shadow-lg shadow-indigo-950/30
//             "
//           >
//             <span className="font-bold text-sm text-white">
//               R
//             </span>
//           </div>
//         )}

//         {!collapsed && (
//           <button
//             onClick={() => setCollapsed(true)}
//             className="
//               text-slate-500
//               hover:text-white
//               hover:bg-slate-800
//               p-2
//               rounded-lg
//               transition
//             "
//             title="Collapse sidebar"
//           >
//             ☰
//           </button>
//         )}

//         {collapsed && (
//           <button
//             onClick={() => setCollapsed(false)}
//             className="
//               absolute
//               left-[68px]
//               top-4
//               z-30
//               text-slate-400
//               hover:text-white
//               bg-slate-800
//               border border-slate-700
//               p-2
//               rounded-lg
//               transition
//               shadow-xl
//             "
//             title="Expand sidebar"
//           >
//             →
//           </button>
//         )}
//       </div>

//       {/* ================= NEW RESEARCH ================= */}
//       <div className="p-4 shrink-0">
//         <button
//           onClick={onNewChat}
//           className="
//             w-full
//             h-11
//             flex items-center justify-center gap-2
//             bg-gradient-to-r from-indigo-600 to-violet-600
//             hover:from-indigo-500 hover:to-violet-500
//             text-white
//             rounded-xl
//             text-sm
//             font-medium
//             shadow-lg shadow-indigo-950/30
//             transition-all duration-200
//           "
//         >
//           <span className="text-lg leading-none">
//             +
//           </span>

//           {!collapsed && (
//             <span>
//               New Research
//             </span>
//           )}
//         </button>
//       </div>

//       {/* ================= NAVIGATION ================= */}
//       <nav className="px-3 shrink-0">
//         {/* Chat */}
//         <button
//           onClick={() => navigate("/app")}
//           className="
//             w-full
//             flex items-center gap-3
//             px-3 py-3
//             rounded-xl
//             bg-slate-800
//             border border-slate-700
//             text-white
//             text-sm
//             font-medium
//             hover:bg-slate-750
//             transition
//           "
//         >
//           <span className="text-base">
//             💬
//           </span>

//           {!collapsed && (
//             <span>
//               Chat
//             </span>
//           )}
//         </button>

//         {/* Research History */}
//         <div className="mt-2">
//           <div
//             className="
//               w-full
//               flex items-center gap-3
//               px-3 py-3
//               rounded-xl
//               text-slate-400
//               text-sm
//             "
//           >
//             <span className="text-base">
//               🔍
//             </span>

//             {!collapsed && (
//               <span>
//                 Research History
//               </span>
//             )}
//           </div>

//           {/* History sessions ONLY scroll */}
//           {!collapsed && sessions.length > 0 && (
//             <div
//               className="
//                 mt-1
//                 ml-2
//                 pl-3
//                 border-l border-slate-700
//                 space-y-1
//                 max-h-52
//                 overflow-y-auto
//                 pr-1
//                 scrollbar-thin
//                 scrollbar-thumb-slate-700
//                 scrollbar-track-transparent
//               "
//             >
//               {sessions.map((session) => (
//                 <button
//                   key={session.session_id}
//                   onClick={() =>
//                     onSelectSession(session.session_id)
//                   }
//                   className="
//                     w-full
//                     text-left
//                     px-3 py-2.5
//                     rounded-lg
//                     text-xs
//                     text-slate-400
//                     hover:bg-slate-800
//                     hover:text-slate-200
//                     transition
//                     truncate
//                   "
//                   title={session.last_message}
//                 >
//                   {session.last_message?.length > 35
//                     ? session.last_message.slice(0, 35) + "..."
//                     : session.last_message}
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>
//       </nav>

//       {/* ================= KNOWLEDGE BASE ================= */}
//       <div
//         className="
//           mt-5
//           px-3
//           shrink-0
//         "
//       >
//         {!collapsed && (
//           <div className="flex items-center justify-between px-2 mb-3">
//             <div>
//               <p
//                 className="
//                   text-[11px]
//                   font-semibold
//                   uppercase
//                   tracking-wider
//                   text-slate-400
//                 "
//               >
//                 Knowledge Base
//               </p>

//               <p className="text-[10px] text-slate-600 mt-0.5">
//                 Your uploaded documents
//               </p>
//             </div>

//             <button
//               onClick={openFilePicker}
//               className="
//                 w-7 h-7
//                 flex items-center justify-center
//                 text-slate-400
//                 hover:text-white
//                 hover:bg-slate-800
//                 rounded-lg
//                 transition
//               "
//               title="Upload PDF"
//             >
//               +
//             </button>
//           </div>
//         )}

//         {/* Upload PDF */}
//         <button
//           onClick={openFilePicker}
//           className={`
//             w-full
//             flex items-center gap-3
//             px-3 py-3
//             rounded-xl
//             text-slate-400
//             bg-slate-950/50
//             border border-slate-700
//             hover:bg-slate-950
//             hover:border-slate-600
//             hover:text-white
//             transition
//             ${collapsed ? "justify-center" : ""}
//           `}
//           title="Upload PDF"
//         >
//           <span className="text-base">
//             📄
//           </span>

//           {!collapsed && (
//             <div className="text-left">
//               <p className="text-sm text-slate-300">
//                 Upload PDF
//               </p>

//               <p className="text-[10px] text-slate-500">
//                 Add to knowledge base
//               </p>
//             </div>
//           )}
//         </button>

//         <input
//           ref={fileInputRef}
//           type="file"
//           accept=".pdf,application/pdf"
//           onChange={handleFileChange}
//           className="hidden"
//         />

//         {/* Uploaded Documents */}
//        {/* Uploaded Documents */}
// {!collapsed && documents.length > 0 && (
//   <div
//     className="
//       mt-1
//       space-y-1
//       max-h-52
//       overflow-y-auto
//       pr-1
//       scrollbar-thin
//       scrollbar-thumb-slate-700
//       scrollbar-track-transparent
//     "
//   >
//     {documents.map((doc, index) => (
//       <div
//         key={`${doc.name}-${index}`}
//         className="
//           group
//           flex items-center gap-3
//           px-3 py-2.5
//           rounded-lg
//           bg-slate-950/60
//           border border-slate-800
//           hover:border-slate-700
//           transition
//         "
//       >
//         <div
//           className="
//             w-8 h-8
//             shrink-0
//             rounded-lg
//             bg-indigo-500/10
//             border border-indigo-500/10
//             flex items-center justify-center
//           "
//         >
//           <span className="text-sm">
//             📄
//           </span>
//         </div>

//         <div className="min-w-0 flex-1">
//           <p
//             className="
//               text-xs
//               text-slate-300
//               truncate
//             "
//             title={doc.name}
//           >
//             {doc.name}
//           </p>

//           <p className="text-[10px] text-slate-500 mt-0.5">
//             {doc.pages} pages · {doc.chunks} chunks
//           </p>
//         </div>
//       </div>
//     ))}
//   </div>
// )}

//         {/* Empty State */}
//         {!collapsed && documents.length === 0 && (
//           <div
//             className="
//               mt-3
//               px-3 py-4
//               rounded-xl
//               border border-dashed border-slate-700
//               bg-slate-950/30
//               text-center
//             "
//           >
//             <div className="text-lg mb-1">
//               📚
//             </div>

//             <p className="text-[11px] text-slate-500">
//               No documents yet
//             </p>

//             <p className="text-[10px] text-slate-600 mt-1">
//               Upload a PDF to start researching
//             </p>
//           </div>
//         )}
//       </div>

//       {/* ================= USER ================= */}
//       {/* ================= USER ================= */}
// <div
//   className="
//     mt-auto
//     p-1
//     border-t border-slate-700/70
//     shrink-0
//     bg-slate-900
//   "
// >
//   <div
//     className={`
//       flex items-center
//       ${collapsed ? "justify-center" : "gap-3"}
//     `}
//   >
//     {/* Avatar */}
//     <div
//       className="
//         w-9 h-9
//         min-w-9
//         shrink-0
//         rounded-full
//         bg-gradient-to-br from-indigo-500 to-violet-600
//         flex items-center justify-center
//         text-sm
//         font-semibold
//         text-white
//         shadow-lg shadow-indigo-950/30
//       "
//     >
//       {userInitial}
//     </div>

//     {/* User Details */}
//     {!collapsed && (
//       <div className="flex-1 min-w-0 overflow-hidden">
//         <p
//           className="
//             text-sm
//             font-semibold
//             text-slate-200
//             whitespace-nowrap
//             overflow-hidden
//             text-ellipsis
//           "
//           title={userName}
//         >
//           {userName}
//         </p>

//         <p className="text-xs text-slate-500 mt-0.5">
//           Researcher
//         </p>
//       </div>
//     )}
//   </div>
// </div>
//     </aside>
//   );
// }

// export default Sidebar;



import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getChatSessions } from "../services/chatService";
import { getUser } from "../utils/auth";

function Sidebar({
  onUpload,
  documents = [],
  onNewChat,
  onSelectSession,
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [sessions, setSessions] = useState([]);

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const user = getUser();

  useEffect(() => {
    const loadSessions = async () => {
      try {
        const data = await getChatSessions();

        if (data.success) {
          setSessions(data.sessions || []);
        }
      } catch (error) {
        console.error("Failed to load research history:", error);
      }
    };

    loadSessions();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Please select a PDF file.");
      e.target.value = "";
      return;
    }

    if (onUpload) {
      onUpload(file);
    }

    e.target.value = "";
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const userName = user?.name || "Researcher";
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <aside
      className={`
        h-dvh
        shrink-0
        flex
        flex-col
        bg-slate-900
        border-r border-slate-700/70
        text-white
        relative
        z-20
        overflow-hidden
        transition-all duration-300
        ${collapsed ? "w-20" : "w-72"}
      `}
    >
      {/* ================= LOGO ================= */}
      <div
        className="
          h-16
          shrink-0
          flex items-center justify-between
          px-4
          border-b border-slate-700/70
          bg-slate-900
        "
      >
        {!collapsed && (
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="
                w-9 h-9 shrink-0
                rounded-xl
                bg-gradient-to-br from-indigo-500 to-violet-600
                flex items-center justify-center
                shadow-lg shadow-indigo-950/40
              "
            >
              <span className="text-white font-bold text-sm">
                R
              </span>
            </div>

            <div className="min-w-0">
              <h1 className="font-semibold text-sm text-white">
                ResearchPilot
              </h1>

              <p className="text-[11px] text-slate-500">
                AI Research Agent
              </p>
            </div>
          </div>
        )}

        {collapsed && (
          <div
            className="
              w-9 h-9
              rounded-xl
              bg-gradient-to-br from-indigo-500 to-violet-600
              flex items-center justify-center
              mx-auto
            "
          >
            <span className="font-bold text-sm text-white">
              R
            </span>
          </div>
        )}

        {!collapsed && (
          <button
            onClick={() => setCollapsed(true)}
            className="
              text-slate-500
              hover:text-white
              hover:bg-slate-800
              p-2
              rounded-lg
              transition
            "
            title="Collapse sidebar"
          >
            ☰
          </button>
        )}

        {collapsed && (
          <button
            onClick={() => setCollapsed(false)}
            className="
              absolute
              left-[68px]
              top-4
              z-30
              text-slate-400
              hover:text-white
              bg-slate-800
              border border-slate-700
              p-2
              rounded-lg
              shadow-xl
            "
            title="Expand sidebar"
          >
            →
          </button>
        )}
      </div>

      {/* ================= NEW RESEARCH ================= */}
      <div className="p-4 shrink-0">
        <button
          onClick={onNewChat}
          className="
            w-full
            h-11
            flex items-center justify-center gap-2
            bg-gradient-to-r from-indigo-600 to-violet-600
            hover:from-indigo-500 hover:to-violet-500
            text-white
            rounded-xl
            text-sm
            font-medium
            shadow-lg shadow-indigo-950/30
            transition-all duration-200
          "
        >
          <span className="text-lg leading-none">+</span>

          {!collapsed && <span>New Research</span>}
        </button>
      </div>

      {/* ================= FIXED NAVIGATION ================= */}
      <nav className="px-3 shrink-0">
        {/* Chat */}
        <button
          onClick={() => navigate("/app")}
          className="
            w-full
            flex items-center gap-3
            px-3 py-3
            rounded-xl
            bg-slate-800
            border border-slate-700
            text-white
            text-sm
            font-medium
            hover:bg-slate-700
            transition
          "
        >
          <span className="text-base">💬</span>

          {!collapsed && <span>Chat</span>}
        </button>

        {/* Research History */}
        <div className="mt-2">
          <div
            className="
              w-full
              flex items-center gap-3
              px-3 py-3
              rounded-xl
              text-slate-400
              text-sm
            "
          >
            <span className="text-base">🔍</span>

            {!collapsed && <span>Research History</span>}
          </div>

          {/* HISTORY SCROLL */}
          {!collapsed && sessions.length > 0 && (
            <div
              className="
                mt-1
                ml-2
                pl-3
                border-l border-slate-700
                space-y-1
                max-h-40
                overflow-y-auto
                pr-1
                scrollbar-thin
                scrollbar-thumb-slate-700
                scrollbar-track-transparent
              "
            >
              {sessions.map((session) => (
                <button
                  key={session.session_id}
                  onClick={() =>
                    onSelectSession(session.session_id)
                  }
                  className="
                    w-full
                    text-left
                    px-3 py-2.5
                    rounded-lg
                    text-xs
                    text-slate-400
                    hover:bg-slate-800
                    hover:text-slate-200
                    transition
                    truncate
                  "
                  title={session.last_message}
                >
                  {session.last_message?.length > 35
                    ? session.last_message.slice(0, 35) + "..."
                    : session.last_message}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* ================= FLEXIBLE MIDDLE ================= */}
      <div className="flex-1 min-h-0 px-3 mt-5 overflow-hidden">
        {/* ================= KNOWLEDGE BASE ================= */}
        {!collapsed && (
          <div className="h-full flex flex-col min-h-0">
            {/* Title */}
            <div className="flex items-center justify-between px-2 mb-3 shrink-0">
              <div>
                <p
                  className="
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-wider
                    text-slate-400
                  "
                >
                  Knowledge Base
                </p>

                <p className="text-[10px] text-slate-600 mt-0.5">
                  Your uploaded documents
                </p>
              </div>

              <button
                onClick={openFilePicker}
                className="
                  w-7 h-7
                  flex items-center justify-center
                  text-slate-400
                  hover:text-white
                  hover:bg-slate-800
                  rounded-lg
                  transition
                "
                title="Upload PDF"
              >
                +
              </button>
            </div>

            {/* Upload */}
            <button
              onClick={openFilePicker}
              className="
                w-full
                shrink-0
                flex items-center gap-3
                px-3 py-3
                rounded-xl
                text-slate-400
                bg-slate-950/50
                border border-slate-700
                hover:bg-slate-950
                hover:border-slate-600
                hover:text-white
                transition
              "
              title="Upload PDF"
            >
              <span className="text-base">📄</span>

              <div className="text-left">
                <p className="text-sm text-slate-300">
                  Upload PDF
                </p>

                <p className="text-[10px] text-slate-500">
                  Add to knowledge base
                </p>
              </div>
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />

            {/* ================= DOCUMENT LIST SCROLL ================= */}
            {documents.length > 0 && (
              <div
                className="
                  mt-2
                  flex-1
                  min-h-0
                  overflow-y-auto
                  space-y-2
                  pr-1
                  scrollbar-thin
                  scrollbar-thumb-slate-700
                  scrollbar-track-transparent
                "
              >
                {documents.map((doc, index) => (
                  <div
                    key={`${doc.name}-${index}`}
                    className="
                      group
                      flex items-center gap-3
                      px-3 py-2.5
                      rounded-xl
                      bg-slate-950/60
                      border border-slate-800
                      hover:border-slate-700
                      transition
                    "
                  >
                    <div
                      className="
                        w-8 h-8
                        shrink-0
                        rounded-lg
                        bg-indigo-500/10
                        border border-indigo-500/10
                        flex items-center justify-center
                      "
                    >
                      <span className="text-sm">📄</span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <p
                        className="
                          text-xs
                          text-slate-300
                          truncate
                        "
                        title={doc.name}
                      >
                        {doc.name}
                      </p>

                      <p className="text-[10px] text-slate-500 mt-0.5">
                        {doc.pages} pages · {doc.chunks} chunks
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty */}
            {documents.length === 0 && (
              <div
                className="
                  mt-3
                  px-3 py-4
                  rounded-xl
                  border border-dashed border-slate-700
                  bg-slate-950/30
                  text-center
                "
              >
                <div className="text-lg mb-1">📚</div>

                <p className="text-[11px] text-slate-500">
                  No documents yet
                </p>

                <p className="text-[10px] text-slate-600 mt-1">
                  Upload a PDF to start researching
                </p>
              </div>
            )}
          </div>
        )}

        {/* COLLAPSED DOCUMENT ICON */}
        {collapsed && (
          <button
            onClick={openFilePicker}
            className="
              w-full
              flex justify-center
              px-3 py-3
              rounded-xl
              text-slate-400
              bg-slate-950/50
              border border-slate-700
              hover:text-white
              hover:bg-slate-950
            "
            title="Upload PDF"
          >
            📄
          </button>
        )}
      </div>

      {/* ================= USER - ALWAYS VISIBLE ================= */}
      <div
        className="
          h-[72px]
          shrink-0
          p-3
          border-t border-slate-700/70
          bg-slate-900
        "
      >
        <div
          className={`
            h-full
            flex items-center
            ${collapsed ? "justify-center" : "gap-3"}
          `}
        >
          {/* Avatar */}
          <div
            className="
              w-9 h-9
              min-w-9
              shrink-0
              rounded-full
              bg-gradient-to-br from-indigo-500 to-violet-600
              flex items-center justify-center
              text-sm
              font-semibold
              text-white
              shadow-lg shadow-indigo-950/30
            "
          >
            {userInitial}
          </div>

          {/* User */}
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p
                className="
                  text-sm
                  font-semibold
                  text-slate-200
                  truncate
                "
                title={userName}
              >
                {userName}
              </p>

              <p className="text-xs text-slate-500 mt-0.5">
                Researcher
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
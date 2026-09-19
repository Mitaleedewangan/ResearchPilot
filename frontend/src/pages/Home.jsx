// import { useEffect, useState } from "react";
// import { v4 as uuidv4 } from "uuid";

// import Sidebar from "../components/Sidebar";
// import Header from "../components/Header";
// import WelcomeScreen from "../components/WelcomeScreen";
// import ChatWindow from "../components/chat/ChatWindow";
// import ChatInput from "../components/chat/ChatInput";

// import {
//   streamMessage,
//   uploadDocument,
//   getDocuments,
//   generateResearchReport,
//   getChatHistory,
// } from "../services/chatService";

// function Home() {
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [documents, setDocuments] = useState([]);

//   const [sessionId, setSessionId] = useState(() => {
//     return (
//       localStorage.getItem("researchpilot_session_id") ||
//       uuidv4()
//     );
//   });

//   const [report, setReport] = useState(null);
//   const [reportLoading, setReportLoading] = useState(false);

//   /* ================= SESSION ================= */

//   useEffect(() => {
//     localStorage.setItem(
//       "researchpilot_session_id",
//       sessionId
//     );
//   }, [sessionId]);

//   /* ================= LOAD DOCUMENTS ================= */

//   useEffect(() => {
//     const loadDocuments = async () => {
//       try {
//         const data = await getDocuments();

//         if (data?.success) {
//           setDocuments(data.documents || []);
//         }
//       } catch (error) {
//         console.error(
//           "Failed to load documents:",
//           error
//         );
//       }
//     };

//     loadDocuments();
//   }, []);

//   /* ================= LOAD CHAT HISTORY ================= */

//   useEffect(() => {
//     const loadHistory = async () => {
//       try {
//         const data = await getChatHistory(sessionId);

//         if (data?.success) {
//           setMessages(data.messages || []);
//         } else {
//           setMessages([]);
//         }
//       } catch (error) {
//         console.error(
//           "Failed to load chat history:",
//           error
//         );

//         setMessages([]);
//       }
//     };

//     loadHistory();
//   }, [sessionId]);

//   /* ================= NEW CHAT ================= */

//   const handleNewChat = () => {
//     const newSessionId = uuidv4();

//     setSessionId(newSessionId);
//     setMessages([]);
//     setReport(null);

//     localStorage.setItem(
//       "researchpilot_session_id",
//       newSessionId
//     );
//   };

//   /* ================= SELECT SESSION ================= */

//   const handleSelectSession = async (selectedSessionId) => {
//     try {
//       setLoading(true);

//       setSessionId(selectedSessionId);

//       localStorage.setItem(
//         "researchpilot_session_id",
//         selectedSessionId
//       );

//       const data = await getChatHistory(
//         selectedSessionId
//       );

//       if (data?.success) {
//         setMessages(data.messages || []);
//       } else {
//         setMessages([]);
//       }

//       setReport(null);
//     } catch (error) {
//       console.error(
//         "Failed to load selected session:",
//         error
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= SEND MESSAGE ================= */

//   const handleSendMessage = async (message) => {
//     if (!message.trim() || loading) {
//       return;
//     }

//     const userMessage = {
//       id: `user-${Date.now()}`,
//       role: "user",
//       content: message,
//     };

//     const assistantMessageId = `assistant-${Date.now()}`;

//     setMessages((prev) => [
//       ...prev,
//       userMessage,
//       {
//         id: assistantMessageId,
//         role: "assistant",
//         content: "",
//       },
//     ]);

//     setLoading(true);

//     try {
//       await streamMessage(
//         message,
//         sessionId,
//         (chunk) => {
//           setMessages((prev) =>
//             prev.map((msg) =>
//               msg.id === assistantMessageId
//                 ? {
//                     ...msg,
//                     content: msg.content + chunk,
//                   }
//                 : msg
//             )
//           );
//         }
//       );
//     } catch (error) {
//       console.error(
//         "Failed to send message:",
//         error
//       );

//       setMessages((prev) =>
//         prev.map((msg) =>
//           msg.id === assistantMessageId
//             ? {
//                 ...msg,
//                 content:
//                   "Sorry, something went wrong. Please try again.",
//               }
//             : msg
//         )
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= SUGGESTION ================= */

//   const handleSuggestionClick = (prompt) => {
//     handleSendMessage(prompt);
//   };

//   /* ================= UPLOAD ================= */

//   const handleUpload = async (file) => {
//     try {
//       const data = await uploadDocument(file);

//       if (data?.success) {
//         setDocuments((prev) => [
//           ...prev,
//           {
//             name:
//               data.document?.name ||
//               file.name,
//             pages:
//               data.document?.pages ||
//               0,
//             chunks:
//               data.document?.chunks ||
//               0,
//           },
//         ]);

//         alert("PDF uploaded successfully.");
//       }
//     } catch (error) {
//       console.error(
//         "Upload failed:",
//         error
//       );

//       alert(
//         error?.message ||
//           "Failed to upload PDF."
//       );
//     }
//   };

//   /* ================= LATEST QUESTION ================= */

//   const getLatestUserQuestion = () => {
//     const userMessages = messages.filter(
//       (message) =>
//         message.role === "user" &&
//         message.content?.trim()
//     );

//     return userMessages.length
//       ? userMessages[userMessages.length - 1]
//           .content
//       : "";
//   };

//   /* ================= RESEARCH REPORT ================= */

//   const handleGenerateReport = async (question) => {
//     if (!question || reportLoading) {
//       return;
//     }

//     try {
//       setReportLoading(true);

//       const data =
//         await generateResearchReport(
//           question
//         );

//       if (data?.success) {
//         setReport(data);
//       } else {
//         setReport(null);
//       }
//     } catch (error) {
//       console.error(
//         "Failed to generate report:",
//         error
//       );
//     } finally {
//       setReportLoading(false);
//     }
//   };

//   const latestQuestion =
//     getLatestUserQuestion();

//   return (
//    <div
//   className="
//     h-dvh
//     w-full
//     flex
//     bg-slate-950
//     text-white
//     overflow-hidden
//   "
// >
//       {/* ================= SIDEBAR ================= */}
//       <Sidebar
//         onUpload={handleUpload}
//         documents={documents}
//         onNewChat={handleNewChat}
//         onSelectSession={handleSelectSession}
//       />

//       {/* ================= MAIN ================= */}
//      <div
//   className="
//     flex-1
//     min-w-0
//     min-h-0
//     flex
//     flex-col
//     bg-slate-950
//     overflow-hidden
//   "
// >
//         {/* HEADER */}
//         <Header />

//         {/* ================= CONTENT ================= */}
//         <main
//   className="
//     relative
//     flex-1
//     min-h-0
//     overflow-hidden
//     bg-slate-950
//   "
// >
//   <div
//     className="
//       relative
//       h-full
//       min-h-0
//       overflow-y-auto
//     "
//   />

//           {/* Scrollable content */}
//           <div
//             className="
//               relative
//               h-full
//               overflow-y-auto
//               scrollbar-thin
//               scrollbar-thumb-slate-700
//               scrollbar-track-transparent
//             "
//           >
//             {messages.length === 0 ? (
//               <WelcomeScreen
//                 onSuggestionClick={
//                   handleSuggestionClick
//                 }
//               />
//             ) : (
//               <ChatWindow
//                 messages={messages}
//                 loading={loading}
//               />
//             )}

//             {/* ================= REPORT ================= */}
//             {messages.length > 0 && (
//               <div
//                 className="
//                   max-w-5xl
//                   mx-auto
//                   px-4 md:px-6
//                   pb-5
//                 "
//               >
//                 <div className="flex justify-end">
//                   <button
//                     onClick={() =>
//                       handleGenerateReport(
//                         latestQuestion
//                       )
//                     }
//                     disabled={
//                       !latestQuestion ||
//                       reportLoading
//                     }
//                     className="
//                       inline-flex
//                       items-center gap-2
//                       px-4 py-2.5
//                       rounded-xl
//                       bg-slate-900
//                       border border-slate-800
//                       text-sm
//                       font-medium
//                       text-slate-300
//                       hover:text-white
//                       hover:border-indigo-500/30
//                       hover:bg-slate-800
//                       disabled:opacity-40
//                       disabled:cursor-not-allowed
//                       transition
//                     "
//                   >
//                     {reportLoading ? (
//                       <>
//                         <span
//                           className="
//                             w-4 h-4
//                             border-2
//                             border-slate-600
//                             border-t-indigo-400
//                             rounded-full
//                             animate-spin
//                           "
//                         />

//                         Generating...
//                       </>
//                     ) : (
//                       <>
//                         <span>
//                           📊
//                         </span>

//                         Generate Research Report

//                         <span>
//                           →
//                         </span>
//                       </>
//                     )}
//                   </button>
//                 </div>

//                 {/* REPORT CARD */}
//                 {report && (
//                   <div
//                     className="
//                       mt-5
//                       rounded-2xl
//                       bg-slate-900/80
//                       border border-slate-800
//                       shadow-xl
//                       shadow-black/20
//                       overflow-hidden
//                     "
//                   >
//                     {/* Report header */}
//                     <div
//                       className="
//                         px-5 py-4
//                         border-b border-slate-800
//                         flex items-center justify-between
//                       "
//                     >
//                       <div>
//                         <p className="text-sm font-semibold text-white">
//                           Research Report
//                         </p>

//                         <p className="text-xs text-slate-500 mt-1">
//                           Generated by ResearchPilot
//                         </p>
//                       </div>

//                       <span
//                         className="
//                           px-2.5 py-1
//                           rounded-full
//                           bg-indigo-500/10
//                           border border-indigo-500/20
//                           text-[10px]
//                           text-indigo-400
//                         "
//                       >
//                         AI Generated
//                       </span>
//                     </div>

//                     {/* Report content */}
//                     <div
//                       className="
//                         px-5 py-5
//                         text-sm
//                         leading-7
//                         text-slate-300
//                       "
//                     >
//                       {typeof report.report ===
//                       "string" ? (
//                         <p className="whitespace-pre-wrap">
//                           {report.report}
//                         </p>
//                       ) : typeof report.content ===
//                         "string" ? (
//                         <p className="whitespace-pre-wrap">
//                           {report.content}
//                         </p>
//                       ) : (
//                         <pre
//                           className="
//                             whitespace-pre-wrap
//                             text-xs
//                             text-slate-400
//                             font-sans
//                           "
//                         >
//                           {JSON.stringify(
//                             report,
//                             null,
//                             2
//                           )}
//                         </pre>
//                       )}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </main>

//         {/* ================= COMPOSER ================= */}
//        <div
//   className="
//     shrink-0
//     bg-slate-900/95
//     backdrop-blur-xl
//     border-t
//     border-slate-800
//   "
// >
//   <ChatInput
//     onSend={handleSendMessage}
//     loading={loading}
//   />
// </div>
//       </div>
//     </div>
//   );
// }

// export default Home;



import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import WelcomeScreen from "../components/WelcomeScreen";
import ChatWindow from "../components/Chat/ChatWindow";
import ChatInput from "../components/Chat/ChatInput";

import {
  streamMessage,
  uploadDocument,
  getDocuments,
  generateResearchReport,
  getChatHistory,
} from "../services/chatService";

function Home() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const [documents, setDocuments] = useState([]);

  const [sessionId, setSessionId] = useState(() => {
    return (
      localStorage.getItem("researchpilot_session_id") ||
      uuidv4()
    );
  });

  const [report, setReport] = useState(null);
  const [reportLoading, setReportLoading] = useState(false);

  /* =====================================================
     SAVE SESSION ID
  ===================================================== */

  useEffect(() => {
    localStorage.setItem(
      "researchpilot_session_id",
      sessionId
    );
  }, [sessionId]);

  /* =====================================================
     LOAD DOCUMENTS
  ===================================================== */

  useEffect(() => {
    const loadDocuments = async () => {
      try {
        const data = await getDocuments();

        if (data?.success) {
          setDocuments(data.documents || []);
        }
      } catch (error) {
        console.error(
          "Failed to load documents:",
          error
        );
      }
    };

    loadDocuments();
  }, []);

  /* =====================================================
     LOAD CHAT HISTORY
  ===================================================== */

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const data = await getChatHistory(sessionId);

        if (data?.success) {
          setMessages(data.messages || []);
        } else {
          setMessages([]);
        }
      } catch (error) {
        console.error(
          "Failed to load chat history:",
          error
        );

        setMessages([]);
      }
    };

    loadHistory();
  }, [sessionId]);

  /* =====================================================
     NEW CHAT
  ===================================================== */

  const handleNewChat = () => {
    const newSessionId = uuidv4();

    setSessionId(newSessionId);
    setMessages([]);
    setReport(null);

    localStorage.setItem(
      "researchpilot_session_id",
      newSessionId
    );
  };

  /* =====================================================
     SELECT CHAT SESSION
  ===================================================== */

  const handleSelectSession = async (
    selectedSessionId
  ) => {
    try {
      setLoading(true);

      setSessionId(selectedSessionId);

      localStorage.setItem(
        "researchpilot_session_id",
        selectedSessionId
      );

      const data = await getChatHistory(
        selectedSessionId
      );

      if (data?.success) {
        setMessages(data.messages || []);
      } else {
        setMessages([]);
      }

      setReport(null);
    } catch (error) {
      console.error(
        "Failed to load selected session:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     SEND MESSAGE
  ===================================================== */

  const handleSendMessage = async (message) => {
    if (!message.trim() || loading) {
      return;
    }

    const userMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: message,
    };

    const assistantMessageId =
      `assistant-${Date.now()}`;

    setMessages((prev) => [
      ...prev,
      userMessage,
      {
        id: assistantMessageId,
        role: "assistant",
        content: "",
      },
    ]);

    setLoading(true);

    try {
      await streamMessage(
        message,
        sessionId,
        (chunk) => {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessageId
                ? {
                    ...msg,
                    content:
                      msg.content + chunk,
                  }
                : msg
            )
          );
        }
      );
    } catch (error) {
      console.error(
        "Failed to send message:",
        error
      );

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMessageId
            ? {
                ...msg,
                content:
                  "Sorry, something went wrong. Please try again.",
              }
            : msg
        )
      );
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     SUGGESTION CLICK
  ===================================================== */

  const handleSuggestionClick = (prompt) => {
    handleSendMessage(prompt);
  };

  /* =====================================================
     UPLOAD DOCUMENT
  ===================================================== */

  const handleUpload = async (file) => {
    try {
      const data = await uploadDocument(file);

      if (data?.success) {
        setDocuments((prev) => [
          ...prev,
          {
            name:
              data.document?.name ||
              file.name,

            pages:
              data.document?.pages || 0,

            chunks:
              data.document?.chunks || 0,
          },
        ]);

        alert("PDF uploaded successfully.");
      }
    } catch (error) {
      console.error(
        "Upload failed:",
        error
      );

      alert(
        error?.message ||
          "Failed to upload PDF."
      );
    }
  };

  /* =====================================================
     GET LATEST USER QUESTION
  ===================================================== */

  const getLatestUserQuestion = () => {
    const userMessages = messages.filter(
      (message) =>
        message.role === "user" &&
        message.content?.trim()
    );

    return userMessages.length
      ? userMessages[
          userMessages.length - 1
        ].content
      : "";
  };

  /* =====================================================
     GENERATE RESEARCH REPORT
  ===================================================== */

  const handleGenerateReport = async (
    question
  ) => {
    if (!question || reportLoading) {
      return;
    }

    try {
      setReportLoading(true);

      const data =
        await generateResearchReport(
          question
        );

      if (data?.success) {
        setReport(data);
      } else {
        setReport(null);
      }
    } catch (error) {
      console.error(
        "Failed to generate report:",
        error
      );
    } finally {
      setReportLoading(false);
    }
  };

  const latestQuestion =
    getLatestUserQuestion();

  /* =====================================================
     UI
  ===================================================== */

  return (
    <div
      className="
        h-dvh
        w-full
        flex
        bg-slate-950
        text-white
        overflow-hidden
      "
    >
      {/* =================================================
          SIDEBAR
      ================================================= */}

      <Sidebar
        onUpload={handleUpload}
        documents={documents}
        onNewChat={handleNewChat}
        onSelectSession={handleSelectSession}
      />

      {/* =================================================
          MAIN APP
      ================================================= */}

      <div
        className="
          flex-1
          min-w-0
          min-h-0
          flex
          flex-col
          bg-slate-950
          overflow-hidden
        "
      >
        {/* =================================================
            HEADER / NAVBAR
        ================================================= */}

        <Header />

        {/* =================================================
            MAIN CONTENT
        ================================================= */}

        <main
          className="
            relative
            flex-1
            min-h-0
            overflow-hidden
            bg-slate-950
          "
        >
          {/* =================================================
              ONLY THIS AREA SCROLLS
          ================================================= */}

          <div
            className="
              relative
              h-full
              min-h-0
              overflow-y-auto
              scrollbar-thin
              scrollbar-thumb-slate-700
              scrollbar-track-transparent
            "
          >
            {/* =================================================
                WELCOME / CHAT
            ================================================= */}

            {messages.length === 0 ? (
              <WelcomeScreen
                onSuggestionClick={
                  handleSuggestionClick
                }
              />
            ) : (
              <ChatWindow
                messages={messages}
                loading={loading}
              />
            )}

            {/* =================================================
                RESEARCH REPORT SECTION
            ================================================= */}

            {messages.length > 0 && (
              <div
                className="
                  max-w-5xl
                  mx-auto
                  px-4
                  md:px-6
                  pb-6
                "
              >
                {/* REPORT BUTTON */}

                <div className="flex justify-end">
                  <button
                    onClick={() =>
                      handleGenerateReport(
                        latestQuestion
                      )
                    }
                    disabled={
                      !latestQuestion ||
                      reportLoading
                    }
                    className="
                      inline-flex
                      items-center
                      gap-2
                      px-4
                      py-2.5
                      rounded-xl
                      bg-slate-900
                      border
                      border-slate-800
                      text-sm
                      font-medium
                      text-slate-300
                      hover:text-white
                      hover:border-indigo-500/30
                      hover:bg-slate-800
                      disabled:opacity-40
                      disabled:cursor-not-allowed
                      transition-all
                    "
                  >
                    {reportLoading ? (
                      <>
                        <span
                          className="
                            w-4
                            h-4
                            border-2
                            border-slate-600
                            border-t-indigo-400
                            rounded-full
                            animate-spin
                          "
                        />

                        Generating...
                      </>
                    ) : (
                      <>
                        <span>📊</span>

                        Generate Research Report

                        <span>→</span>
                      </>
                    )}
                  </button>
                </div>

                {/* =================================================
                    REPORT CARD
                ================================================= */}

                {report && (
                  <div
                    className="
                      mt-5
                      rounded-2xl
                      bg-slate-900/80
                      border
                      border-slate-800
                      shadow-xl
                      shadow-black/20
                      overflow-hidden
                    "
                  >
                    {/* REPORT HEADER */}

                    <div
                      className="
                        px-5
                        py-4
                        border-b
                        border-slate-800
                        flex
                        items-center
                        justify-between
                        gap-4
                      "
                    >
                      <div className="min-w-0">
                        <p
                          className="
                            text-sm
                            font-semibold
                            text-white
                          "
                        >
                          Research Report
                        </p>

                        <p
                          className="
                            text-xs
                            text-slate-500
                            mt-1
                          "
                        >
                          Generated by ResearchPilot
                        </p>
                      </div>

                      <span
                        className="
                          shrink-0
                          px-2.5
                          py-1
                          rounded-full
                          bg-indigo-500/10
                          border
                          border-indigo-500/20
                          text-[10px]
                          text-indigo-400
                        "
                      >
                        AI Generated
                      </span>
                    </div>

                    {/* REPORT CONTENT */}

                    <div
                      className="
                        px-5
                        py-5
                        text-sm
                        leading-7
                        text-slate-300
                      "
                    >
                      {typeof report.report ===
                      "string" ? (
                        <p className="whitespace-pre-wrap">
                          {report.report}
                        </p>
                      ) : typeof report.content ===
                        "string" ? (
                        <p className="whitespace-pre-wrap">
                          {report.content}
                        </p>
                      ) : (
                        <pre
                          className="
                            whitespace-pre-wrap
                            text-xs
                            text-slate-400
                            font-sans
                          "
                        >
                          {JSON.stringify(
                            report,
                            null,
                            2
                          )}
                        </pre>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Bottom spacing so content does not touch composer */}

            <div className="h-4" />
          </div>
        </main>

        {/* =================================================
            CHAT COMPOSER
        ================================================= */}

        <div
          className="
            shrink-0
            bg-slate-900/95
            backdrop-blur-xl
            border-t
            border-slate-800
          "
        >
          <ChatInput
            onSend={handleSendMessage}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
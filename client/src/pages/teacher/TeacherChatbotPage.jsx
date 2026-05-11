// import React, { useState } from "react";
// import { useMyProfile } from "../../hooks/useMyProfile";
// import api from "../../api/axiosInstance";

// const TeacherChatbotPage = () => {
//   const { profile } = useMyProfile();
//   const [question, setQuestion] = useState("");
//   const [answer, setAnswer] = useState("");
//   const [loading, setLoading] = useState(false);

//   const department = profile?.department || "";

//   const handleAsk = async (e) => {
//     e.preventDefault();
//     if (!question.trim()) return;

//     try {
//       setLoading(true);
//       setAnswer("");

//       const params = { q: question };
//       if (department) params.department = department;

//       const res = await api.get("/calendar/chat", { params });
//       setAnswer(res.data.answer || "No response.");
//     } catch (error) {
//       console.error("Error querying chatbot:", error);
//       const msg =
//         error?.response?.data?.message ||
//         "Failed to get response from chatbot.";
//       setAnswer(msg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h2>Department Academic Assistant (Teacher)</h2>
//       {department && (
//         <p style={{ fontSize: "14px", color: "#555" }}>
//           Department detected: <strong>{department}</strong>
//         </p>
//       )}

//       <form
//         onSubmit={handleAsk}
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           gap: "8px",
//           maxWidth: "600px",
//         }}
//       >
//         <textarea
//           value={question}
//           onChange={(e) => setQuestion(e.target.value)}
//           placeholder={
//             "Ask about:\n- course offering timetable\n- enrollment / late enrollment\n- commencement of graduate/undergraduate classes\n- ERP portal for attendance"
//           }
//           rows={3}
//           style={{ padding: "8px" }}
//         />
//         <button type="submit" disabled={loading}>
//           {loading ? "Checking calendar..." : "Ask"}
//         </button>
//       </form>

//       {answer && (
//         <div
//           style={{
//             marginTop: "16px",
//             padding: "12px",
//             border: "1px solid #ddd",
//             borderRadius: "4px",
//             whiteSpace: "pre-wrap",
//           }}
//         >
//           {answer}
//         </div>
//       )}
//     </div>
//   );
// };

// export default TeacherChatbotPage;
// import React, { useState } from "react";
// import { useMyProfile } from "../../hooks/useMyProfile";
// import api from "../../api/axiosInstance";
// import {
//   MdSmartToy,
//   MdSend,
//   MdSchool,
//   MdInfoOutline,
//   MdHistory,
// } from "react-icons/md";
// import "./TeacherChatbotPage.css";

// const TeacherChatbotPage = () => {
//   const { profile } = useMyProfile();
//   const [question, setQuestion] = useState("");
//   const [answer, setAnswer] = useState("");
//   const [loading, setLoading] = useState(false);

//   const department = profile?.department || "";

//   const handleAsk = async (e) => {
//     e.preventDefault();
//     if (!question.trim()) return;

//     try {
//       setLoading(true);
//       setAnswer("");

//       const params = { q: question };
//       if (department) params.department = department;

//       const res = await api.get("/calendar/chat", { params });
//       setAnswer(res.data.answer || "No response.");
//     } catch (error) {
//       console.error("Error querying chatbot:", error);
//       const msg =
//         error?.response?.data?.message ||
//         "Failed to get response from chatbot.";
//       setAnswer(msg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="tchat-page">
//       {/* Header */}
//       <header className="tchat-header">
//         <div className="tchat-header__left">
//           <h1 className="tchat-title">
//             <MdSmartToy className="tchat-title__icon" size={22} />
//             <span>Department Academic Assistant</span>
//           </h1>
//           <p className="tchat-subtitle">
//             Ask about academic calendar, course offerings, enrollment rules,
//             class schedules and ERP-related queries for your department.
//           </p>
//         </div>

//         <div className="tchat-header__meta">
//           {department && (
//             <div className="tchat-meta-item">
//               <span className="tchat-meta-label">Department Detected</span>
//               <span className="tchat-meta-value tchat-meta-value--icon">
//                 <MdSchool size={14} />
//                 <span>{department}</span>
//               </span>
//             </div>
//           )}
//         </div>
//       </header>

//       {/* Optional info banner */}
//       <div className="tchat-info">
//         <MdInfoOutline size={18} />
//         <span>
//           This assistant uses your department context where available. For
//           precise results, mention programs and semesters in your question.
//         </span>
//       </div>

//       {/* Main grid: chat card + quick help */}
//       <section className="tchat-grid">
//         {/* Chat card */}
//         <article className="tchat-card tchat-card--chat">
//           <div className="tchat-card__header">
//             <h2 className="tchat-card__title">Ask a Question</h2>
//             <p className="tchat-card__subtitle">
//               You can ask about timetables, enrollment windows, commencement of
//               classes, exam schedules, or ERP attendance rules.
//             </p>
//           </div>

//           <form className="tchat-form" onSubmit={handleAsk}>
//             <div className="tchat-textarea-wrapper">
//               <textarea
//                 value={question}
//                 onChange={(e) => setQuestion(e.target.value)}
//                 placeholder={
//                   "Example questions:\n" +
//                   "- When does the new semester start for my department?\n" +
//                   "- What is the last date for course enrollment / add-drop?\n" +
//                   "- When will graduate classes commence?\n" +
//                   "- How do I mark attendance on the ERP portal?"
//                 }
//                 rows={4}
//                 className="tchat-textarea"
//               />
//             </div>
//             <button
//               type="submit"
//               disabled={loading}
//               className="tchat-submit-btn"
//             >
//               {loading ? (
//                 <span>Checking calendar...</span>
//               ) : (
//                 <>
//                   <MdSend size={18} />
//                   <span>Ask</span>
//                 </>
//               )}
//             </button>
//           </form>

//           {answer && (
//             <div className="tchat-answer">
//               <div className="tchat-answer__label">Assistant Response</div>
//               <div className="tchat-answer__box">
//                 <p className="tchat-answer__text">{answer}</p>
//               </div>
//             </div>
//           )}
//         </article>

//         {/* Right side: help & examples */}
//         <aside className="tchat-card tchat-card--side">
//           <div className="tchat-side-badge">Examples & Tips</div>
//           <h2 className="tchat-side-title">Ask better questions</h2>
//           <p className="tchat-side-text">
//             Be specific about the program, semester and type of event you are
//             asking about. This helps the assistant find relevant calendar
//             entries for your department.
//           </p>

//           <div className="tchat-side-section">
//             <h3 className="tchat-side-section__title">
//               <MdHistory size={16} />
//               <span>Good examples</span>
//             </h3>
//             <ul className="tchat-side-list">
//               <li>
//                 “When do <strong>BSCS 6th semester</strong> classes start in the{" "}
//                 <strong>Fall 2026</strong> term?”
//               </li>
//               <li>
//                 “What is the <strong>late enrollment</strong> deadline for{" "}
//                 <strong>MS Computer Science</strong> students?”
//               </li>
//               <li>
//                 “On which dates are the <strong>mid-term exams</strong> planned
//                 for my department?”
//               </li>
//               <li>
//                 “How do I access the <strong>ERP portal</strong> to upload
//                 attendance for my courses?”
//               </li>
//             </ul>
//           </div>

//           <div className="tchat-side-section">
//             <h3 className="tchat-side-section__title">
//               <MdInfoOutline size={16} />
//               <span>Note</span>
//             </h3>
//             <p className="tchat-side-note">
//               If any response seems outdated or incorrect, double-check with
//               your departmental office or admin. The assistant relies on the
//               latest configured calendar and rules.
//             </p>
//           </div>
//         </aside>
//       </section>
//     </div>
//   );
// };

// export default TeacherChatbotPage;
// import React, { useState, useMemo } from "react";
// import { useMyProfile } from "../../hooks/useMyProfile";
// import api from "../../api/axiosInstance";
// import {
//   MdSmartToy,
//   MdSend,
//   MdSchool,
//   MdInfoOutline,
//   MdHistory,
// } from "react-icons/md";
// import "./TeacherChatbotPage.css";

// const TeacherChatbotPage = () => {
//   const { profile } = useMyProfile();

//   // Profile department (read‑only, from backend)
//   const profileDepartment = profile?.department || "";

//   // Editable department input
//   const [departmentInput, setDepartmentInput] = useState("");

//   // Chat state
//   const [question, setQuestion] = useState("");
//   const [answer, setAnswer] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Effective department used for the query:
//   // 1) user text input (trimmed, uppercased)
//   // 2) else profile.department
//   // 3) else (no department sent; server will fallback to "ALL")
//   const effectiveDepartment = useMemo(() => {
//     if (departmentInput.trim()) {
//       return departmentInput.trim().toUpperCase();
//     }
//     if (profileDepartment) {
//       return profileDepartment.trim().toUpperCase();
//     }
//     return "";
//   }, [departmentInput, profileDepartment]);

//   const handleAsk = async (e) => {
//     e.preventDefault();
//     if (!question.trim()) return;

//     try {
//       setLoading(true);
//       setAnswer("");

//       const params = { q: question };
//       if (effectiveDepartment) {
//         params.department = effectiveDepartment;
//       }

//       const res = await api.get("/calendar/chat", { params });
//       setAnswer(res.data.answer || "No response.");
//     } catch (error) {
//       console.error("Error querying chatbot:", error);
//       const msg =
//         error?.response?.data?.message ||
//         "Failed to get response from chatbot.";
//       setAnswer(msg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="tchat-page">
//       {/* Header */}
//       <header className="tchat-header">
//         <div className="tchat-header__left">
//           <h1 className="tchat-title">
//             <MdSmartToy className="tchat-title__icon" size={22} />
//             <span>Department Academic Assistant</span>
//           </h1>
//           <p className="tchat-subtitle">
//             Ask about academic calendar, course offerings, enrollment rules,
//             class schedules, exam periods, result dates and ERP-related queries
//             for your department.
//           </p>
//         </div>

//         <div className="tchat-header__meta">
//           {profileDepartment && (
//             <div className="tchat-meta-item">
//               <span className="tchat-meta-label">Department from Profile</span>
//               <span className="tchat-meta-value tchat-meta-value--icon">
//                 <MdSchool size={14} />
//                 <span>{profileDepartment}</span>
//               </span>
//             </div>
//           )}

//           {effectiveDepartment && (
//             <div className="tchat-meta-item">
//               <span className="tchat-meta-label">Using Department For Query</span>
//               <span className="tchat-meta-value tchat-meta-value--icon">
//                 <MdSchool size={14} />
//                 <span>{effectiveDepartment}</span>
//               </span>
//             </div>
//           )}
//         </div>
//       </header>

//       {/* Optional info banner */}
//       <div className="tchat-info">
//         <MdInfoOutline size={18} />
//         <span>
//           You can override your profile department by typing a department code
//           below (e.g., CSE, ECE). If left blank, your profile department will be
//           used. If neither is set, the assistant will answer using common /
//           university-wide dates where available.
//         </span>
//       </div>

//       {/* Main grid: chat card + quick help */}
//       <section className="tchat-grid">
//         {/* Chat card */}
//         <article className="tchat-card tchat-card--chat">
//           <div className="tchat-card__header">
//             <h2 className="tchat-card__title">Ask a Question</h2>
//             <p className="tchat-card__subtitle">
//               You can ask about timetables, enrollment windows, commencement of
//               classes, semester freeze / withdrawal deadlines, exam schedules,
//               result submission / declaration, or ERP attendance rules.
//             </p>
//           </div>

//           {/* Department override field */}
//           <div className="tchat-dept-field">
//             <label
//               htmlFor="tchat-dept-input"
//               className="tchat-dept-label"
//             >
//               Department (optional)
//             </label>
//             <div className="tchat-dept-input-wrapper">
//               <span className="tchat-dept-input-prefix">
//                 <MdSchool size={14} />
//               </span>
//               <input
//                 id="tchat-dept-input"
//                 type="text"
//                 value={departmentInput}
//                 onChange={(e) => setDepartmentInput(e.target.value)}
//                 placeholder={
//                   profileDepartment
//                     ? `Override (e.g., CSE). Empty = ${profileDepartment}`
//                     : "e.g., CSE, ECE (optional)"
//                 }
//                 className="tchat-dept-input"
//               />
//             </div>
//             <p className="tchat-dept-hint">
//               If you leave this empty, the assistant will default to your
//               profile department
//               {profileDepartment ? ` (${profileDepartment})` : ""}. If neither
//               is available, it will check common (ALL) calendar entries.
//             </p>
//           </div>

//           <form className="tchat-form" onSubmit={handleAsk}>
//             <div className="tchat-textarea-wrapper">
//               <textarea
//                 value={question}
//                 onChange={(e) => setQuestion(e.target.value)}
//                 placeholder={
//                   "Example questions:\n" +
//                   "- When does the new semester start for my department?\n" +
//                   "- What is the last date for course enrollment / add-drop?\n" +
//                   "- When are the mid-semester exams planned?\n" +
//                   "- What is the last date for semester freeze or withdrawal?\n" +
//                   "- When will results be declared by COE for my department?"
//                 }
//                 rows={4}
//                 className="tchat-textarea"
//               />
//             </div>
//             <button
//               type="submit"
//               disabled={loading}
//               className="tchat-submit-btn"
//             >
//               {loading ? (
//                 <span>Checking calendar...</span>
//               ) : (
//                 <>
//                   <MdSend size={18} />
//                   <span>Ask</span>
//                 </>
//               )}
//             </button>
//           </form>

//           {answer && (
//             <div className="tchat-answer">
//               <div className="tchat-answer__label">Assistant Response</div>
//               <div className="tchat-answer__box">
//                 <p className="tchat-answer__text">{answer}</p>
//               </div>
//             </div>
//           )}
//         </article>

//         {/* Right side: help & examples */}
//         <aside className="tchat-card tchat-card--side">
//           <div className="tchat-side-badge">Examples & Tips</div>
//           <h2 className="tchat-side-title">Ask better questions</h2>
//           <p className="tchat-side-text">
//             Be specific about the program, semester and type of event you are
//             asking about. This helps the assistant find relevant calendar
//             entries for your department.
//           </p>

//           <div className="tchat-side-section">
//             <h3 className="tchat-side-section__title">
//               <MdHistory size={16} />
//               <span>Good examples</span>
//             </h3>
//             <ul className="tchat-side-list">
//               <li>
//                 “When do <strong>BSCS 6th semester</strong> classes start in the{" "}
//                 <strong>Fall 2026</strong> term?”
//               </li>
//               <li>
//                 “What is the <strong>late enrollment</strong> deadline for{" "}
//                 <strong>MS Computer Science</strong> students in CSE?”
//               </li>
//               <li>
//                 “On which date is the <strong>mid-semester exam</strong>{" "}
//                 scheduled for my department?”
//               </li>
//               <li>
//                 “What is the <strong>last date</strong> for{" "}
//                 <strong>semester freeze</strong> in my department?”
//               </li>
//               <li>
//                 “When will results be <strong>declared by COE</strong> for my
//                 department?”
//               </li>
//             </ul>
//           </div>

//           <div className="tchat-side-section">
//             <h3 className="tchat-side-section__title">
//               <MdInfoOutline size={16} />
//               <span>Note</span>
//             </h3>
//             <p className="tchat-side-note">
//               If any response seems outdated or incorrect, double-check with
//               your departmental office or admin. The assistant relies on the
//               latest configured calendar entries in the admin panel.
//             </p>
//           </div>
//         </aside>
//       </section>
//     </div>
//   );
// };

// export default TeacherChatbotPage;
// src/pages/teacher/TeacherChatbotPage.jsx
// import React, { useState, useMemo } from "react";
// import { useMyProfile } from "../../hooks/useMyProfile";
// import { queryChatbotApi } from "../../api/chatbotApi";
// import {
//   MdSmartToy,
//   MdSend,
//   MdSchool,
//   MdInfoOutline,
//   MdHistory,
//   MdAutoAwesome,
// } from "react-icons/md";
// import "./TeacherChatbotPage.css";

// const QUICK_QUESTIONS = [
//   "When are the final exams?",
//   "What is the semester freeze deadline?",
//   "When does enrollment start?",
//   "Last date for semester withdrawal?",
//   "When will results be declared?",
//   "When do classes commence?",
// ];

// const TeacherChatbotPage = () => {
//   const { profile } = useMyProfile();
//   const profileDepartment = profile?.department || "";

//   const [departmentInput, setDepartmentInput] = useState("");
//   const [question, setQuestion] = useState("");
//   const [answer, setAnswer] = useState("");
//   const [sources, setSources] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const effectiveDepartment = useMemo(() => {
//     if (departmentInput.trim()) return departmentInput.trim().toUpperCase();
//     if (profileDepartment) return profileDepartment.trim().toUpperCase();
//     return "";
//   }, [departmentInput, profileDepartment]);

//   const handleAsk = async (q = question) => {
//     if (!q.trim()) return;

//     try {
//       setLoading(true);
//       setAnswer("");
//       setSources([]);
//       setError("");

//       // ✅ Now calls RAG endpoint
//       const data = await queryChatbotApi(q.trim(), effectiveDepartment);

//       setAnswer(data.answer || "No response.");
//       setSources(data.sources || []);
//     } catch (err) {
//       console.error("Chatbot error:", err);
//       setError(
//         err?.response?.data?.message || "Failed to get a response. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     handleAsk(question);
//   };

//   const handleQuickQuestion = (q) => {
//     setQuestion(q);
//     handleAsk(q);
//   };

//   return (
//     <div className="tchat-page">
//       {/* Header */}
//       <header className="tchat-header">
//         <div className="tchat-header__left">
//           <h1 className="tchat-title">
//             <MdSmartToy className="tchat-title__icon" size={22} />
//             <span>Department Academic Assistant</span>
//             {/* ✅ RAG badge */}
//             <span style={styles.ragBadge}>
//               <MdAutoAwesome size={11} /> RAG
//             </span>
//           </h1>
//           <p className="tchat-subtitle">
//             Ask in natural language — no need for exact keywords. I understand
//             typos, informal phrasing, and department-specific questions.
//           </p>
//         </div>

//         <div className="tchat-header__meta">
//           {profileDepartment && (
//             <div className="tchat-meta-item">
//               <span className="tchat-meta-label">Profile Department</span>
//               <span className="tchat-meta-value tchat-meta-value--icon">
//                 <MdSchool size={14} />
//                 <span>{profileDepartment}</span>
//               </span>
//             </div>
//           )}
//           {effectiveDepartment && (
//             <div className="tchat-meta-item">
//               <span className="tchat-meta-label">Querying For</span>
//               <span className="tchat-meta-value tchat-meta-value--icon">
//                 <MdSchool size={14} />
//                 <span>{effectiveDepartment}</span>
//               </span>
//             </div>
//           )}
//         </div>
//       </header>

//       {/* Info banner */}
//       <div className="tchat-info">
//         <MdInfoOutline size={18} />
//         <span>
//           <strong>Upgraded to RAG AI.</strong> You can now ask questions
//           naturally — "when are my finals?", "exam date of CS dept", "sem
//           freeze deadline" — all work without exact spelling.
//         </span>
//       </div>

//       {/* Main grid */}
//       <section className="tchat-grid">
//         {/* Chat card */}
//         <article className="tchat-card tchat-card--chat">
//           <div className="tchat-card__header">
//             <h2 className="tchat-card__title">Ask a Question</h2>
//             <p className="tchat-card__subtitle">
//               Ask about timetables, enrollment, exams, results, semester
//               freeze, or any academic calendar event.
//             </p>
//           </div>

//           {/* Quick questions */}
//           <div style={styles.quickWrap}>
//             {QUICK_QUESTIONS.map((q, i) => (
//               <button
//                 key={i}
//                 style={styles.quickBtn}
//                 onClick={() => handleQuickQuestion(q)}
//                 disabled={loading}
//               >
//                 {q}
//               </button>
//             ))}
//           </div>

//           {/* Department override */}
//           <div className="tchat-dept-field">
//             <label htmlFor="tchat-dept-input" className="tchat-dept-label">
//               Department (optional override)
//             </label>
//             <div className="tchat-dept-input-wrapper">
//               <span className="tchat-dept-input-prefix">
//                 <MdSchool size={14} />
//               </span>
//               <input
//                 id="tchat-dept-input"
//                 type="text"
//                 value={departmentInput}
//                 onChange={(e) => setDepartmentInput(e.target.value)}
//                 placeholder={
//                   profileDepartment
//                     ? `Override dept. Empty = ${profileDepartment}`
//                     : "e.g., CS, IT, SE"
//                 }
//                 className="tchat-dept-input"
//               />
//             </div>
//             <p className="tchat-dept-hint">
//               You can also just write the department in your question — e.g.,
//               "exam date of CS department" works automatically.
//             </p>
//           </div>

//           {/* Question form */}
//           <form className="tchat-form" onSubmit={handleSubmit}>
//             <div className="tchat-textarea-wrapper">
//               <textarea
//                 value={question}
//                 onChange={(e) => setQuestion(e.target.value)}
//                 placeholder={
//                   "Try asking:\n" +
//                   "- when are my finals for cs department?\n" +
//                   "- sem freeze last date?\n" +
//                   "- when is result declaration?\n" +
//                   "- enrolment date it dept"
//                 }
//                 rows={4}
//                 className="tchat-textarea"
//               />
//             </div>
//             <button
//               type="submit"
//               disabled={loading || !question.trim()}
//               className="tchat-submit-btn"
//             >
//               {loading ? (
//                 <span>Searching...</span>
//               ) : (
//                 <>
//                   <MdSend size={18} />
//                   <span>Ask</span>
//                 </>
//               )}
//             </button>
//           </form>

//           {/* Error */}
//           {error && (
//             <div style={styles.errorBox}>
//               ⚠️ {error}
//             </div>
//           )}

//           {/* Answer */}
//           {answer && (
//             <div className="tchat-answer">
//               <div className="tchat-answer__label">Assistant Response</div>
//               <div className="tchat-answer__box">
//                 <p className="tchat-answer__text" style={{ whiteSpace: "pre-line" }}>
//                   {answer}
//                 </p>
//               </div>

//               {/* ✅ Show RAG sources (confidence scores) */}
//               {sources.length > 0 && (
//                 <div style={styles.sourcesWrap}>
//                   <span style={styles.sourcesLabel}>Matched from database:</span>
//                   <div style={styles.sourcesTags}>
//                     {sources.map((s, i) => (
//                       <span key={i} style={styles.sourceTag}>
//                         {s.department} · {s.key.replace(/_/g, " ")} ·{" "}
//                         {Math.round(s.score * 100)}% match
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </article>

//         {/* Right side: help */}
//         <aside className="tchat-card tchat-card--side">
//           <div className="tchat-side-badge">RAG-Powered Tips</div>
//           <h2 className="tchat-side-title">Ask naturally</h2>
//           <p className="tchat-side-text">
//             Unlike the old chatbot, you don't need exact keywords. Ask
//             casually and the AI understands meaning, not just words.
//           </p>

//           <div className="tchat-side-section">
//             <h3 className="tchat-side-section__title">
//               <MdHistory size={16} />
//               <span>These all work now</span>
//             </h3>
//             <ul className="tchat-side-list">
//               <li>"<strong>when are my finals</strong>" ✅</li>
//               <li>"<strong>exam date of cs dept</strong>" ✅</li>
//               <li>"<strong>enrolment dat</strong>" (typo) ✅</li>
//               <li>"<strong>sem freeze deadline</strong>" ✅</li>
//               <li>"<strong>results kab aayenge</strong>" — try it! ✅</li>
//             </ul>
//           </div>

//           <div className="tchat-side-section">
//             <h3 className="tchat-side-section__title">
//               <MdInfoOutline size={16} />
//               <span>Department detection</span>
//             </h3>
//             <p className="tchat-side-note">
//               You can mention the department in your question directly —
//               "give me exam date of IT department" — and it will automatically
//               filter results for that department.
//             </p>
//           </div>
//         </aside>
//       </section>
//     </div>
//   );
// };

// const styles = {
//   ragBadge: {
//     display: "inline-flex",
//     alignItems: "center",
//     gap: 3,
//     background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
//     color: "white",
//     fontSize: 10,
//     fontWeight: 700,
//     padding: "2px 8px",
//     borderRadius: 20,
//     marginLeft: 8,
//     verticalAlign: "middle",
//     letterSpacing: 0.5,
//   },
//   quickWrap: {
//     display: "flex",
//     flexWrap: "wrap",
//     gap: 6,
//     marginBottom: 16,
//   },
//   quickBtn: {
//     background: "#f5f3ff",
//     border: "1px solid #ddd6fe",
//     borderRadius: 20,
//     padding: "5px 12px",
//     fontSize: 12,
//     color: "#5b21b6",
//     cursor: "pointer",
//     fontWeight: 500,
//     transition: "background 0.15s",
//   },
//   errorBox: {
//     background: "#fef2f2",
//     border: "1px solid #fecaca",
//     color: "#dc2626",
//     padding: "10px 14px",
//     borderRadius: 10,
//     fontSize: 13,
//     marginTop: 12,
//   },
//   sourcesWrap: {
//     marginTop: 10,
//     padding: "8px 12px",
//     background: "#f5f3ff",
//     borderRadius: 10,
//     border: "1px solid #ddd6fe",
//   },
//   sourcesLabel: {
//     fontSize: 11,
//     fontWeight: 600,
//     color: "#5b21b6",
//     display: "block",
//     marginBottom: 6,
//   },
//   sourcesTags: {
//     display: "flex",
//     flexWrap: "wrap",
//     gap: 5,
//   },
//   sourceTag: {
//     background: "#ede9fe",
//     color: "#5b21b6",
//     fontSize: 10,
//     padding: "2px 8px",
//     borderRadius: 20,
//     fontWeight: 600,
//   },
// };

// export default TeacherChatbotPage;
import React, { useState } from "react";
import { queryChatbotApi } from "../../api/chatbotApi";
import { MdSmartToy, MdSend, MdInfoOutline, MdHistory, MdAutoAwesome } from "react-icons/md";
import "./TeacherChatbotPage.css";
 
const QUICK_QUESTIONS = [
  "When are finals for CS department?",
  "IT semester freeze last date?",
  "When does enrollment start?",
  "Result declaration date for CS?",
  "When do classes commence?",
  "Show all exam dates",
];
 
const TeacherChatbotPage = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
 
  const handleAsk = async (q = question) => {
    if (!q.trim()) return;
    try {
      setLoading(true);
      setAnswer("");
      setSources([]);
      setError("");
      const data = await queryChatbotApi(q.trim()); // no department param
      setAnswer(data.answer || "No response.");
      setSources(data.sources || []);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to get a response. Please try again.");
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div className="tchat-page">
      <header className="tchat-header">
        <div className="tchat-header__left">
          <h1 className="tchat-title">
            <MdSmartToy className="tchat-title__icon" size={22} />
            <span>Department Academic Assistant</span>
            <span style={styles.ragBadge}><MdAutoAwesome size={11} /> AI</span>
          </h1>
          <p className="tchat-subtitle">
            Ask naturally. Mention a department for specific results, or skip it for all departments.
          </p>
        </div>
      </header>
 
      <div className="tchat-info">
        <MdInfoOutline size={18} />
        <span>
          Write <strong>"finals for CS"</strong> for CS only, or <strong>"when are finals?"</strong> for all departments.
        </span>
      </div>
 
      <section className="tchat-grid">
        <article className="tchat-card tchat-card--chat">
          <div className="tchat-card__header">
            <h2 className="tchat-card__title">Ask a Question</h2>
          </div>
 
          <div style={styles.quickWrap}>
            {QUICK_QUESTIONS.map((q, i) => (
              <button key={i} style={styles.quickBtn}
                onClick={() => { setQuestion(q); handleAsk(q); }}
                disabled={loading}>{q}</button>
            ))}
          </div>
 
          <form className="tchat-form" onSubmit={(e) => { e.preventDefault(); handleAsk(); }}>
            <div className="tchat-textarea-wrapper">
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder={
                  "Examples:\n" +
                  "- When are finals for CS department?\n" +
                  "- IT semester freeze last date?\n" +
                  "- When does enrollment start? (shows all departments)\n" +
                  "- Result declaration date for CS"
                }
                rows={4}
                className="tchat-textarea"
              />
            </div>
            <button type="submit" disabled={loading || !question.trim()} className="tchat-submit-btn">
              {loading ? <span>Thinking...</span> : <><MdSend size={18} /><span>Ask</span></>}
            </button>
          </form>
 
          {error && <div style={styles.errorBox}>⚠️ {error}</div>}
 
          {answer && (
            <div className="tchat-answer">
              <div className="tchat-answer__label">Assistant Response</div>
              <div className="tchat-answer__box">
                <p className="tchat-answer__text" style={{ whiteSpace: "pre-line" }}>{answer}</p>
              </div>
              {sources.length > 0 && (
                <div style={styles.sourcesWrap}>
                  <span style={styles.sourcesLabel}>Matched from database:</span>
                  <div style={styles.sourcesTags}>
                    {sources.map((s, i) => (
                      <span key={i} style={styles.sourceTag}>
                        {s.department} · {s.key.replace(/_/g, " ")} · {Math.round(s.score * 100)}% match
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </article>
 
        <aside className="tchat-card tchat-card--side">
          <div className="tchat-side-badge">Tips</div>
          <h2 className="tchat-side-title">Department detection is automatic</h2>
          <p className="tchat-side-text">
            Just mention the department in your question. No separate field needed.
          </p>
          <div className="tchat-side-section">
            <h3 className="tchat-side-section__title">
              <MdHistory size={16} /><span>Specific department</span>
            </h3>
            <ul className="tchat-side-list">
              <li>"finals for <strong>CS</strong> department" ✅</li>
              <li>"<strong>IT</strong> semester freeze date" ✅</li>
              <li>"enrollment date <strong>SE</strong>" ✅</li>
            </ul>
          </div>
          <div className="tchat-side-section">
            <h3 className="tchat-side-section__title">
              <MdInfoOutline size={16} /><span>All departments</span>
            </h3>
            <ul className="tchat-side-list">
              <li>"When are final exams?" ✅</li>
              <li>"enrollment start date?" ✅</li>
              <li>"show all exam dates" ✅</li>
            </ul>
          </div>
        </aside>
      </section>
    </div>
  );
};
 
const styles = {
  ragBadge: { display:"inline-flex", alignItems:"center", gap:3, background:"linear-gradient(135deg,#4f46e5,#7c3aed)", color:"white", fontSize:10, fontWeight:700, padding:"2px 8px", borderRadius:20, marginLeft:8, verticalAlign:"middle" },
  quickWrap: { display:"flex", flexWrap:"wrap", gap:6, marginBottom:16 },
  quickBtn: { background:"#f5f3ff", border:"1px solid #ddd6fe", borderRadius:20, padding:"5px 12px", fontSize:12, color:"#5b21b6", cursor:"pointer", fontWeight:500 },
  errorBox: { background:"#fef2f2", border:"1px solid #fecaca", color:"#dc2626", padding:"10px 14px", borderRadius:10, fontSize:13, marginTop:12 },
  sourcesWrap: { marginTop:10, padding:"8px 12px", background:"#f5f3ff", borderRadius:10, border:"1px solid #ddd6fe" },
  sourcesLabel: { fontSize:11, fontWeight:600, color:"#5b21b6", display:"block", marginBottom:6 },
  sourcesTags: { display:"flex", flexWrap:"wrap", gap:5 },
  sourceTag: { background:"#ede9fe", color:"#5b21b6", fontSize:10, padding:"2px 8px", borderRadius:20, fontWeight:600 },
};
 
export default TeacherChatbotPage;
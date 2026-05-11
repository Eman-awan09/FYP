// import React, { useState } from "react";
// import { useMyProfile } from "../../hooks/useMyProfile";
// import api from "../../api/axiosInstance";

// const StudentChatbotPage = () => {
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
//       <h2>Department Academic Assistant (Student)</h2>
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

// export default StudentChatbotPage;

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
// import "./StudentChatbotPage.css";

// const StudentChatbotPage = () => {
//   const { profile } = useMyProfile();
//   const [question, setQuestion] = useState("");
//   const [answer, setAnswer] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Safely read department from profile (same backend logic)
//   const department = profile?.department || "";

//   /**
//    * Handle submit of the student's question.
//    * Backend logic is unchanged: GET /calendar/chat with q and optional department.
//    */
//   const handleAsk = async (e) => {
//     e.preventDefault();

//     // Avoid empty or whitespace-only queries
//     if (!question.trim()) return;

//     try {
//       setLoading(true);
//       setAnswer("");

//       const params = { q: question };
//       if (department) params.department = department;

//       const res = await api.get("/calendar/chat", { params });
//       setAnswer(res.data?.answer || "No response.");
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
//     <div className="schat-page">
//       {/* Header */}
//       <header className="schat-header">
//         <div className="schat-header__left">
//           <h1 className="schat-title">
//             <MdSmartToy className="schat-title__icon" size={22} />
//             <span>Department Academic Assistant (Student)</span>
//           </h1>
//           <p className="schat-subtitle">
//             Get quick answers about academic calendar, enrollment dates,
//             class schedules, exams and ERP-related queries for your department.
//           </p>
//         </div>

//         <div className="schat-header__meta">
//           {department && (
//             <div className="schat-meta-item">
//               <span className="schat-meta-label">Department Detected</span>
//               <span className="schat-meta-value schat-meta-value--icon">
//                 <MdSchool size={14} />
//                 <span>{department}</span>
//               </span>
//             </div>
//           )}
//         </div>
//       </header>

//       {/* Info banner */}
//       <div className="schat-info">
//         <MdInfoOutline size={18} />
//         <span>
//           This assistant auto-detects your department where possible. For better
//           answers, mention your program, semester, and session in your question.
//         </span>
//       </div>

//       {/* Main grid: chat + side info */}
//       <section className="schat-grid">
//         {/* Chat card */}
//         <article className="schat-card schat-card--chat">
//           <div className="schat-card__header">
//             <h2 className="schat-card__title">Ask a Question</h2>
//             <p className="schat-card__subtitle">
//               Ask about timetables, enrollment/late enrollment, start of
//               classes, exam schedules, or ERP attendance rules.
//             </p>
//           </div>

//           <form className="schat-form" onSubmit={handleAsk}>
//             <div className="schat-textarea-wrapper">
//               <textarea
//                 value={question}
//                 onChange={(e) => setQuestion(e.target.value)}
//                 placeholder={
//                   "Example questions:\n" +
//                   "- When does the new semester start for my department?\n" +
//                   "- What is the last date for course enrollment / add-drop?\n" +
//                   "- When will undergraduate classes commence?\n" +
//                   "- How is attendance managed in the ERP portal?"
//                 }
//                 rows={4}
//                 className="schat-textarea"
//               />
//             </div>
//             <button
//               type="submit"
//               disabled={loading}
//               className="schat-submit-btn"
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
//             <div className="schat-answer">
//               <div className="schat-answer__label">Assistant Response</div>
//               <div className="schat-answer__box">
//                 <p className="schat-answer__text">{answer}</p>
//               </div>
//             </div>
//           )}
//         </article>

//         {/* Side card: tips / examples */}
//         <aside className="schat-card schat-card--side">
//           <div className="schat-side-badge">Examples & Tips</div>
//           <h2 className="schat-side-title">Ask better questions</h2>
//           <p className="schat-side-text">
//             Be specific about your program, semester, and type of event. This
//             helps the assistant find the most relevant academic calendar entries
//             for you.
//           </p>

//           <div className="schat-side-section">
//             <h3 className="schat-side-section__title">
//               <MdHistory size={16} />
//               <span>Good examples</span>
//             </h3>
//             <ul className="schat-side-list">
//               <li>
//                 “When do <strong>BSCS 4th semester</strong> classes start in the{" "}
//                 <strong>Spring 2026</strong> term?”
//               </li>
//               <li>
//                 “What is the <strong>late enrollment</strong> deadline for{" "}
//                 <strong>BS Software Engineering</strong> students?”
//               </li>
//               <li>
//                 “On which dates are the <strong>mid-term exams</strong> planned
//                 for my department?”
//               </li>
//               <li>
//                 “How can I check my <strong>attendance</strong> on the{" "}
//                 <strong>ERP portal</strong>?”
//               </li>
//             </ul>
//           </div>

//           <div className="schat-side-section">
//             <h3 className="schat-side-section__title">
//               <MdInfoOutline size={16} />
//               <span>Note</span>
//             </h3>
//             <p className="schat-side-note">
//               If any response looks outdated or unclear, please confirm it with
//               your departmental office, advisor, or campus notice board. The
//               assistant depends on the latest configured academic calendar.
//             </p>
//           </div>
//         </aside>
//       </section>
//     </div>
//   );
// };

// export default StudentChatbotPage;
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
// import "./StudentChatbotPage.css";

// const StudentChatbotPage = () => {
//   const { profile } = useMyProfile();

//   // Department from profile (read-only)
//   const profileDepartment = profile?.department || "";

//   // Department text input (student can override)
//   const [departmentInput, setDepartmentInput] = useState("");

//   const [question, setQuestion] = useState("");
//   const [answer, setAnswer] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Effective department for the query:
//   // 1) departmentInput (trim+uppercase)
//   // 2) profile.department
//   // 3) else: send nothing, backend will use "ALL"
//   const effectiveDepartment = useMemo(() => {
//     if (departmentInput.trim()) {
//       return departmentInput.trim().toUpperCase();
//     }
//     if (profileDepartment) {
//       return profileDepartment.trim().toUpperCase();
//     }
//     return "";
//   }, [departmentInput, profileDepartment]);

//   /**
//    * Handle submit of the student's question.
//    * GET /calendar/chat with q and optional department.
//    */
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
//       setAnswer(res.data?.answer || "No response.");
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
//     <div className="schat-page">
//       {/* Header */}
//       <header className="schat-header">
//         <div className="schat-header__left">
//           <h1 className="schat-title">
//             <MdSmartToy className="schat-title__icon" size={22} />
//             <span>Department Academic Assistant (Student)</span>
//           </h1>
//           <p className="schat-subtitle">
//             Get quick answers about your department&apos;s academic calendar:
//             enrollment dates, semester freeze / withdrawal, class schedules,
//             exam periods, result timelines and ERP-related queries.
//           </p>
//         </div>

//         <div className="schat-header__meta">
//           {profileDepartment && (
//             <div className="schat-meta-item">
//               <span className="schat-meta-label">Department from Profile</span>
//               <span className="schat-meta-value schat-meta-value--icon">
//                 <MdSchool size={14} />
//                 <span>{profileDepartment}</span>
//               </span>
//             </div>
//           )}

//           {effectiveDepartment && (
//             <div className="schat-meta-item">
//               <span className="schat-meta-label">Using Department For Query</span>
//               <span className="schat-meta-value schat-meta-value--icon">
//                 <MdSchool size={14} />
//                 <span>{effectiveDepartment}</span>
//               </span>
//             </div>
//           )}
//         </div>
//       </header>

//       {/* Info banner */}
//       <div className="schat-info">
//         <MdInfoOutline size={18} />
//         <span>
//           You can type your department code below (e.g., CSE, ECE). If you leave
//           it empty, the assistant will use your profile department
//           {profileDepartment ? ` (${profileDepartment})` : ""}. If neither is
//           available, it will use university-wide calendar entries where
//           available.
//         </span>
//       </div>

//       {/* Main grid: chat + side info */}
//       <section className="schat-grid">
//         {/* Chat card */}
//         <article className="schat-card schat-card--chat">
//           <div className="schat-card__header">
//             <h2 className="schat-card__title">Ask a Question</h2>
//             <p className="schat-card__subtitle">
//               Ask about timetables, enrollment / late enrollment, semester
//               freeze / withdrawal deadlines, start of classes, exam schedules,
//               result declaration, or ERP attendance rules.
//             </p>
//           </div>

//           {/* Department override field */}
//           <div className="schat-dept-field">
//             <label
//               htmlFor="schat-dept-input"
//               className="schat-dept-label"
//             >
//               Department (optional)
//             </label>
//             <div className="schat-dept-input-wrapper">
//               <span className="schat-dept-input-prefix">
//                 <MdSchool size={14} />
//               </span>
//               <input
//                 id="schat-dept-input"
//                 type="text"
//                 value={departmentInput}
//                 onChange={(e) => setDepartmentInput(e.target.value)}
//                 placeholder={
//                   profileDepartment
//                     ? `Override (e.g., CSE). Empty = ${profileDepartment}`
//                     : "e.g., CSE, ECE (optional)"
//                 }
//                 className="schat-dept-input"
//               />
//             </div>
//             <p className="schat-dept-hint">
//               Leave this empty to use your profile department
//               {profileDepartment ? ` (${profileDepartment})` : ""}. If no
//               department is available, the assistant will use common
//               university-wide calendar entries (ALL) where configured.
//             </p>
//           </div>

//           <form className="schat-form" onSubmit={handleAsk}>
//             <div className="schat-textarea-wrapper">
//               <textarea
//                 value={question}
//                 onChange={(e) => setQuestion(e.target.value)}
//                 placeholder={
//                   "Example questions:\n" +
//                   "- When does the new semester start for my department?\n" +
//                   "- What is the last date for course enrollment / add-drop?\n" +
//                   "- When are the mid-semester or end-semester exams scheduled?\n" +
//                   "- What is the last date for semester freeze or withdrawal?\n" +
//                   "- When will results be declared by COE for my department?"
//                 }
//                 rows={4}
//                 className="schat-textarea"
//               />
//             </div>
//             <button
//               type="submit"
//               disabled={loading}
//               className="schat-submit-btn"
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
//             <div className="schat-answer">
//               <div className="schat-answer__label">Assistant Response</div>
//               <div className="schat-answer__box">
//                 <p className="schat-answer__text">{answer}</p>
//               </div>
//             </div>
//           )}
//         </article>

//         {/* Side card: tips / examples */}
//         <aside className="schat-card schat-card--side">
//           <div className="schat-side-badge">Examples & Tips</div>
//           <h2 className="schat-side-title">Ask better questions</h2>
//           <p className="schat-side-text">
//             Be specific about your program, semester, and type of event. This
//             helps the assistant find the most relevant academic calendar entries
//             for you.
//           </p>

//           <div className="schat-side-section">
//             <h3 className="schat-side-section__title">
//               <MdHistory size={16} />
//               <span>Good examples</span>
//             </h3>
//             <ul className="schat-side-list">
//               <li>
//                 “When do <strong>BSCS 4th semester</strong> classes start in the{" "}
//                 <strong>Spring 2026</strong> term?”
//               </li>
//               <li>
//                 “What is the <strong>late enrollment</strong> deadline for{" "}
//                 <strong>BS Software Engineering</strong> students in CSE?”
//               </li>
//               <li>
//                 “On which date is the <strong>mid-semester exam</strong>{" "}
//                 scheduled for my department?”
//               </li>
//               <li>
//                 “What is the <strong>last date</strong> for{" "}
//                 <strong>semester freeze</strong> or{" "}
//                 <strong>semester withdrawal</strong>?”
//               </li>
//               <li>
//                 “When will results be <strong>declared by COE</strong> for my
//                 department?”
//               </li>
//             </ul>
//           </div>

//           <div className="schat-side-section">
//             <h3 className="schat-side-section__title">
//               <MdInfoOutline size={16} />
//               <span>Note</span>
//             </h3>
//             <p className="schat-side-note">
//               If any response looks outdated or unclear, please confirm it with
//               your departmental office, advisor, or campus notice board. The
//               assistant depends on the latest configured academic calendar.
//             </p>
//           </div>
//         </aside>
//       </section>
//     </div>
//   );
// };

// export default StudentChatbotPage;
// src/pages/student/StudentChatbotPage.jsx
// import React, { useState, useMemo } from "react";
// import { useMyProfile } from "../../hooks/useMyProfile";
// import { queryChatbotApi } from "../../api/chatbotApi";
// import {
//   MdSmartToy,
//   MdSend,
//   MdSchool,
//   MdInfoOutline,
//   MdAutoAwesome,
// } from "react-icons/md";

// // Reuses TeacherChatbotPage CSS — same design system
// // import "../teacher/TeacherChatbotPage.css";
// import "./StudentChatbotPage.css";
// const QUICK_QUESTIONS = [
//   "When are my final exams?",
//   "What is the enrollment date?",
//   "Semester freeze last date?",
//   "When do classes start?",
//   "Result declaration date?",
//   "Late enrollment deadline?",
// ];

// const StudentChatbotPage = () => {
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

//   return (
//     <div className="tchat-page">
//       {/* Header */}
//       <header className="tchat-header">
//         <div className="tchat-header__left">
//           <h1 className="tchat-title">
//             <MdSmartToy className="tchat-title__icon" size={22} />
//             <span>Campus Academic Assistant</span>
//             <span style={styles.ragBadge}>
//               <MdAutoAwesome size={11} /> RAG
//             </span>
//           </h1>
//           <p className="tchat-subtitle">
//             Ask me anything about your academic calendar — exams, enrollment,
//             results, semester dates and more. Works with natural language!
//           </p>
//         </div>

//         <div className="tchat-header__meta">
//           {profileDepartment && (
//             <div className="tchat-meta-item">
//               <span className="tchat-meta-label">Your Department</span>
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
//           <strong>Smart AI Assistant.</strong> Ask in any way you like —
//           "when are finals?", "cs department exam date", "enrollment kab hai"
//           — it all works!
//         </span>
//       </div>

//       <section className="tchat-grid">
//         {/* Chat card */}
//         <article className="tchat-card tchat-card--chat">
//           <div className="tchat-card__header">
//             <h2 className="tchat-card__title">Ask Your Question</h2>
//           </div>

//           {/* Quick questions */}
//           <div style={styles.quickWrap}>
//             {QUICK_QUESTIONS.map((q, i) => (
//               <button
//                 key={i}
//                 style={styles.quickBtn}
//                 onClick={() => { setQuestion(q); handleAsk(q); }}
//                 disabled={loading}
//               >
//                 {q}
//               </button>
//             ))}
//           </div>

//           {/* Department override */}
//           <div className="tchat-dept-field">
//             <label htmlFor="schat-dept-input" className="tchat-dept-label">
//               Department (optional)
//             </label>
//             <div className="tchat-dept-input-wrapper">
//               <span className="tchat-dept-input-prefix">
//                 <MdSchool size={14} />
//               </span>
//               <input
//                 id="schat-dept-input"
//                 type="text"
//                 value={departmentInput}
//                 onChange={(e) => setDepartmentInput(e.target.value)}
//                 placeholder={
//                   profileDepartment
//                     ? `Empty = your dept (${profileDepartment})`
//                     : "e.g., CS, IT, SE"
//                 }
//                 className="tchat-dept-input"
//               />
//             </div>
//             <p className="tchat-dept-hint">
//               Or just include the department in your question — "exam date of
//               CS department" auto-detects it.
//             </p>
//           </div>

//           {/* Form */}
//           <form className="tchat-form" onSubmit={handleSubmit}>
//             <div className="tchat-textarea-wrapper">
//               <textarea
//                 value={question}
//                 onChange={(e) => setQuestion(e.target.value)}
//                 placeholder={
//                   "Examples:\n" +
//                   "- when are finals for cs?\n" +
//                   "- enrollment date?\n" +
//                   "- sem freeze last date it dept\n" +
//                   "- result kab aayega"
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
//                 <span>Finding answer...</span>
//               ) : (
//                 <>
//                   <MdSend size={18} />
//                   <span>Ask</span>
//                 </>
//               )}
//             </button>
//           </form>

//           {/* Error */}
//           {error && <div style={styles.errorBox}>⚠️ {error}</div>}

//           {/* Answer */}
//           {answer && (
//             <div className="tchat-answer">
//               <div className="tchat-answer__label">Answer</div>
//               <div className="tchat-answer__box">
//                 <p
//                   className="tchat-answer__text"
//                   style={{ whiteSpace: "pre-line" }}
//                 >
//                   {answer}
//                 </p>
//               </div>

//               {sources.length > 0 && (
//                 <div style={styles.sourcesWrap}>
//                   <span style={styles.sourcesLabel}>Sources matched:</span>
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

//         {/* Side help */}
//         <aside className="tchat-card tchat-card--side">
//           <div className="tchat-side-badge">How to use</div>
//           <h2 className="tchat-side-title">No exact words needed</h2>
//           <p className="tchat-side-text">
//             The old chatbot required exact phrases. This one understands your
//             meaning even with typos or informal language.
//           </p>

//           <div className="tchat-side-section">
//             <h3 className="tchat-side-section__title">
//               <span>All of these work ✅</span>
//             </h3>
//             <ul className="tchat-side-list">
//               <li>"<strong>when are my finals</strong>"</li>
//               <li>"<strong>exam date of cs dept</strong>"</li>
//               <li>"<strong>enrolment dat</strong>" (typo OK)</li>
//               <li>"<strong>result kab aata hai</strong>"</li>
//               <li>"<strong>last date sem freeze IT</strong>"</li>
//             </ul>
//           </div>

//           <div className="tchat-side-section">
//             <h3 className="tchat-side-section__title">
//               <MdInfoOutline size={16} />
//               <span>Tip</span>
//             </h3>
//             <p className="tchat-side-note">
//               Your department is auto-detected from your profile. You can
//               override it by typing above or including it in your question.
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
//   sourcesTags: { display: "flex", flexWrap: "wrap", gap: 5 },
//   sourceTag: {
//     background: "#ede9fe",
//     color: "#5b21b6",
//     fontSize: 10,
//     padding: "2px 8px",
//     borderRadius: 20,
//     fontWeight: 600,
//   },
// };

// export default StudentChatbotPage;
// src/pages/student/StudentChatbotPage.jsx
import React, { useState } from "react";
import { queryChatbotApi } from "../../api/chatbotApi";
import { MdSmartToy, MdSend, MdInfoOutline, MdAutoAwesome } from "react-icons/md";
import "../teacher/TeacherChatbotPage.css";

const QUICK_QUESTIONS = [
  "When are my final exams?",
  "Finals for CS department?",
  "Semester freeze last date IT?",
  "When does enrollment start?",
  "Result declaration date CS?",
  "Late enrollment deadline?",
];

const StudentChatbotPage = () => {
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
            <span>Campus Academic Assistant</span>
            <span style={styles.ragBadge}><MdAutoAwesome size={11} /> AI</span>
          </h1>
          <p className="tchat-subtitle">
            Ask anything about your academic calendar. Mention a department for specific info.
          </p>
        </div>
      </header>

      <div className="tchat-info">
        <MdInfoOutline size={18} />
        <span>
          Write <strong>"finals for CS"</strong> for CS only, or <strong>"when are finals?"</strong> to see all departments.
        </span>
      </div>

      <section className="tchat-grid">
        <article className="tchat-card tchat-card--chat">
          <div className="tchat-card__header">
            <h2 className="tchat-card__title">Ask Your Question</h2>
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
                  "- When are finals for CS?\n" +
                  "- IT semester freeze last date?\n" +
                  "- When does enrollment start? (all departments)\n" +
                  "- Result kab aayega CS mein?"
                }
                rows={4}
                className="tchat-textarea"
              />
            </div>
            <button type="submit" disabled={loading || !question.trim()} className="tchat-submit-btn">
              {loading ? <span>Finding answer...</span> : <><MdSend size={18} /><span>Ask</span></>}
            </button>
          </form>

          {error && <div style={styles.errorBox}>⚠️ {error}</div>}

          {answer && (
            <div className="tchat-answer">
              <div className="tchat-answer__label">Answer</div>
              <div className="tchat-answer__box">
                <p className="tchat-answer__text" style={{ whiteSpace: "pre-line" }}>{answer}</p>
              </div>
              {sources.length > 0 && (
                <div style={styles.sourcesWrap}>
                  <span style={styles.sourcesLabel}>Sources matched:</span>
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
          <div className="tchat-side-badge">How it works</div>
          <h2 className="tchat-side-title">No department field needed</h2>
          <p className="tchat-side-text">
            Just write the department name inside your question. The AI detects it automatically.
          </p>
          <div className="tchat-side-section">
            <h3 className="tchat-side-section__title"><span>With department ✅</span></h3>
            <ul className="tchat-side-list">
              <li>"finals for <strong>CS</strong>"</li>
              <li>"<strong>IT</strong> freeze date"</li>
              <li>"enrollment <strong>SE</strong> dept"</li>
            </ul>
          </div>
          <div className="tchat-side-section">
            <h3 className="tchat-side-section__title">
              <MdInfoOutline size={16} /><span>Without department ✅</span>
            </h3>
            <ul className="tchat-side-list">
              <li>"when are finals?" → shows all</li>
              <li>"enrollment date?" → shows all</li>
              <li>"result kab hai?" → shows all</li>
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

export default StudentChatbotPage;
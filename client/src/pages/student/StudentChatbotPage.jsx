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

import React, { useState } from "react";
import { useMyProfile } from "../../hooks/useMyProfile";
import api from "../../api/axiosInstance";
import {
  MdSmartToy,
  MdSend,
  MdSchool,
  MdInfoOutline,
  MdHistory,
} from "react-icons/md";
import "./StudentChatbotPage.css";

const StudentChatbotPage = () => {
  const { profile } = useMyProfile();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  // Safely read department from profile (same backend logic)
  const department = profile?.department || "";

  /**
   * Handle submit of the student's question.
   * Backend logic is unchanged: GET /calendar/chat with q and optional department.
   */
  const handleAsk = async (e) => {
    e.preventDefault();

    // Avoid empty or whitespace-only queries
    if (!question.trim()) return;

    try {
      setLoading(true);
      setAnswer("");

      const params = { q: question };
      if (department) params.department = department;

      const res = await api.get("/calendar/chat", { params });
      setAnswer(res.data?.answer || "No response.");
    } catch (error) {
      console.error("Error querying chatbot:", error);

      const msg =
        error?.response?.data?.message ||
        "Failed to get response from chatbot.";
      setAnswer(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="schat-page">
      {/* Header */}
      <header className="schat-header">
        <div className="schat-header__left">
          <h1 className="schat-title">
            <MdSmartToy className="schat-title__icon" size={22} />
            <span>Department Academic Assistant (Student)</span>
          </h1>
          <p className="schat-subtitle">
            Get quick answers about academic calendar, enrollment dates,
            class schedules, exams and ERP-related queries for your department.
          </p>
        </div>

        <div className="schat-header__meta">
          {department && (
            <div className="schat-meta-item">
              <span className="schat-meta-label">Department Detected</span>
              <span className="schat-meta-value schat-meta-value--icon">
                <MdSchool size={14} />
                <span>{department}</span>
              </span>
            </div>
          )}
        </div>
      </header>

      {/* Info banner */}
      <div className="schat-info">
        <MdInfoOutline size={18} />
        <span>
          This assistant auto-detects your department where possible. For better
          answers, mention your program, semester, and session in your question.
        </span>
      </div>

      {/* Main grid: chat + side info */}
      <section className="schat-grid">
        {/* Chat card */}
        <article className="schat-card schat-card--chat">
          <div className="schat-card__header">
            <h2 className="schat-card__title">Ask a Question</h2>
            <p className="schat-card__subtitle">
              Ask about timetables, enrollment/late enrollment, start of
              classes, exam schedules, or ERP attendance rules.
            </p>
          </div>

          <form className="schat-form" onSubmit={handleAsk}>
            <div className="schat-textarea-wrapper">
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder={
                  "Example questions:\n" +
                  "- When does the new semester start for my department?\n" +
                  "- What is the last date for course enrollment / add-drop?\n" +
                  "- When will undergraduate classes commence?\n" +
                  "- How is attendance managed in the ERP portal?"
                }
                rows={4}
                className="schat-textarea"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="schat-submit-btn"
            >
              {loading ? (
                <span>Checking calendar...</span>
              ) : (
                <>
                  <MdSend size={18} />
                  <span>Ask</span>
                </>
              )}
            </button>
          </form>

          {answer && (
            <div className="schat-answer">
              <div className="schat-answer__label">Assistant Response</div>
              <div className="schat-answer__box">
                <p className="schat-answer__text">{answer}</p>
              </div>
            </div>
          )}
        </article>

        {/* Side card: tips / examples */}
        <aside className="schat-card schat-card--side">
          <div className="schat-side-badge">Examples & Tips</div>
          <h2 className="schat-side-title">Ask better questions</h2>
          <p className="schat-side-text">
            Be specific about your program, semester, and type of event. This
            helps the assistant find the most relevant academic calendar entries
            for you.
          </p>

          <div className="schat-side-section">
            <h3 className="schat-side-section__title">
              <MdHistory size={16} />
              <span>Good examples</span>
            </h3>
            <ul className="schat-side-list">
              <li>
                “When do <strong>BSCS 4th semester</strong> classes start in the{" "}
                <strong>Spring 2026</strong> term?”
              </li>
              <li>
                “What is the <strong>late enrollment</strong> deadline for{" "}
                <strong>BS Software Engineering</strong> students?”
              </li>
              <li>
                “On which dates are the <strong>mid-term exams</strong> planned
                for my department?”
              </li>
              <li>
                “How can I check my <strong>attendance</strong> on the{" "}
                <strong>ERP portal</strong>?”
              </li>
            </ul>
          </div>

          <div className="schat-side-section">
            <h3 className="schat-side-section__title">
              <MdInfoOutline size={16} />
              <span>Note</span>
            </h3>
            <p className="schat-side-note">
              If any response looks outdated or unclear, please confirm it with
              your departmental office, advisor, or campus notice board. The
              assistant depends on the latest configured academic calendar.
            </p>
          </div>
        </aside>
      </section>
    </div>
  );
};

export default StudentChatbotPage;
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
import "./TeacherChatbotPage.css";

const TeacherChatbotPage = () => {
  const { profile } = useMyProfile();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const department = profile?.department || "";

  const handleAsk = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    try {
      setLoading(true);
      setAnswer("");

      const params = { q: question };
      if (department) params.department = department;

      const res = await api.get("/calendar/chat", { params });
      setAnswer(res.data.answer || "No response.");
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
    <div className="tchat-page">
      {/* Header */}
      <header className="tchat-header">
        <div className="tchat-header__left">
          <h1 className="tchat-title">
            <MdSmartToy className="tchat-title__icon" size={22} />
            <span>Department Academic Assistant</span>
          </h1>
          <p className="tchat-subtitle">
            Ask about academic calendar, course offerings, enrollment rules,
            class schedules and ERP-related queries for your department.
          </p>
        </div>

        <div className="tchat-header__meta">
          {department && (
            <div className="tchat-meta-item">
              <span className="tchat-meta-label">Department Detected</span>
              <span className="tchat-meta-value tchat-meta-value--icon">
                <MdSchool size={14} />
                <span>{department}</span>
              </span>
            </div>
          )}
        </div>
      </header>

      {/* Optional info banner */}
      <div className="tchat-info">
        <MdInfoOutline size={18} />
        <span>
          This assistant uses your department context where available. For
          precise results, mention programs and semesters in your question.
        </span>
      </div>

      {/* Main grid: chat card + quick help */}
      <section className="tchat-grid">
        {/* Chat card */}
        <article className="tchat-card tchat-card--chat">
          <div className="tchat-card__header">
            <h2 className="tchat-card__title">Ask a Question</h2>
            <p className="tchat-card__subtitle">
              You can ask about timetables, enrollment windows, commencement of
              classes, exam schedules, or ERP attendance rules.
            </p>
          </div>

          <form className="tchat-form" onSubmit={handleAsk}>
            <div className="tchat-textarea-wrapper">
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder={
                  "Example questions:\n" +
                  "- When does the new semester start for my department?\n" +
                  "- What is the last date for course enrollment / add-drop?\n" +
                  "- When will graduate classes commence?\n" +
                  "- How do I mark attendance on the ERP portal?"
                }
                rows={4}
                className="tchat-textarea"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="tchat-submit-btn"
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
            <div className="tchat-answer">
              <div className="tchat-answer__label">Assistant Response</div>
              <div className="tchat-answer__box">
                <p className="tchat-answer__text">{answer}</p>
              </div>
            </div>
          )}
        </article>

        {/* Right side: help & examples */}
        <aside className="tchat-card tchat-card--side">
          <div className="tchat-side-badge">Examples & Tips</div>
          <h2 className="tchat-side-title">Ask better questions</h2>
          <p className="tchat-side-text">
            Be specific about the program, semester and type of event you are
            asking about. This helps the assistant find relevant calendar
            entries for your department.
          </p>

          <div className="tchat-side-section">
            <h3 className="tchat-side-section__title">
              <MdHistory size={16} />
              <span>Good examples</span>
            </h3>
            <ul className="tchat-side-list">
              <li>
                “When do <strong>BSCS 6th semester</strong> classes start in the{" "}
                <strong>Fall 2026</strong> term?”
              </li>
              <li>
                “What is the <strong>late enrollment</strong> deadline for{" "}
                <strong>MS Computer Science</strong> students?”
              </li>
              <li>
                “On which dates are the <strong>mid-term exams</strong> planned
                for my department?”
              </li>
              <li>
                “How do I access the <strong>ERP portal</strong> to upload
                attendance for my courses?”
              </li>
            </ul>
          </div>

          <div className="tchat-side-section">
            <h3 className="tchat-side-section__title">
              <MdInfoOutline size={16} />
              <span>Note</span>
            </h3>
            <p className="tchat-side-note">
              If any response seems outdated or incorrect, double-check with
              your departmental office or admin. The assistant relies on the
              latest configured calendar and rules.
            </p>
          </div>
        </aside>
      </section>
    </div>
  );
};

export default TeacherChatbotPage;
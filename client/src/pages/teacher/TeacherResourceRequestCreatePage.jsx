// // src/pages/teacher/TeacherResourceRequestCreatePage.jsx
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import ResourceRequestForm from "../../components/resourceRequests/ResourceRequestForm";
// import { createResourceRequestApi } from "../../api/resourceRequestsApi";

// const TeacherResourceRequestCreatePage = () => {
//   const navigate = useNavigate();
//   const [submitting, setSubmitting] = useState(false);

//   const handleSubmit = async (values) => {
//     try {
//       setSubmitting(true);
//       await createResourceRequestApi(values);
//       alert("Resource request created.");
//       navigate("/teacher/resource-requests");
//     } catch (error) {
//       console.error("Error creating resource request:", error);
//       const msg =
//         error?.response?.data?.message ||
//         "Failed to create resource request.";
//       alert(msg);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div>
//       <h2>Create Resource Request (Teacher)</h2>
//       <ResourceRequestForm onSubmit={handleSubmit} isSubmitting={submitting} />
//     </div>
//   );
// };

// export default TeacherResourceRequestCreatePage;
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ResourceRequestForm from "../../components/resourceRequests/ResourceRequestForm";
import { createResourceRequestApi } from "../../api/resourceRequestsApi";

// Icons
import { MdInventory2, MdArrowBack, MdSchedule } from "react-icons/md";

import "./TeacherResourceRequestCreatePage.css";
import { toast } from 'react-toastify';

const TeacherResourceRequestCreatePage = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (values) => {
    try {
      setErrorMsg("");
      setSubmitting(true);
      await createResourceRequestApi(values);
      toast("Resource request created.");
      navigate("/teacher/resource-requests");
    } catch (error) {
      console.error("Error creating resource request:", error);
      const msg =
        error?.response?.data?.message ||
        "Failed to create resource request.";
      setErrorMsg(msg);
      toast(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="trc-page">
      {/* Page header */}
      <header className="trc-header">
        <div className="trc-header__left">
          <button
            type="button"
            className="trc-icon-btn"
            onClick={() => navigate("/teacher/resource-requests")}
            aria-label="Back to My Resource Requests"
          >
            <MdArrowBack size={18} />
          </button>

          <div className="trc-header__titles">
            <h1 className="trc-title">
              <MdInventory2 className="trc-title__icon" size={22} />
              <span>Create Resource Request</span>
            </h1>
            <p className="trc-subtitle">
              Request lab equipment, IT resources or special access from the
              server room staff or department administration.
            </p>
          </div>
        </div>

        <div className="trc-header__meta">
          <div className="trc-meta-item">
            <span className="trc-meta-label">Module</span>
            <span className="trc-meta-value">Teacher · Resources</span>
          </div>
          <div className="trc-meta-item">
            <span className="trc-meta-label">Typical Handling Time</span>
            <span className="trc-meta-value trc-meta-value--icon">
              <MdSchedule size={14} />
              <span>1–3 working days</span>
            </span>
          </div>
        </div>
      </header>

      {errorMsg && (
        <div className="trc-error">
          {errorMsg}
        </div>
      )}

      {/* Main layout: left = form, right = info */}
      <section className="trc-grid">
        {/* Left: form card */}
        <article className="trc-card trc-card--form">
          <div className="trc-card__header">
            <h2 className="trc-card__title">Request Details</h2>
            <p className="trc-card__subtitle">
              Fill in the purpose, resources required, preferred date/time and any
              additional notes.
            </p>
          </div>

          <div className="trc-form-wrapper">
            {/* Keep ResourceRequestForm logic untouched */}
            <ResourceRequestForm
              onSubmit={handleSubmit}
              isSubmitting={submitting}
            />
          </div>
        </article>

        {/* Right: contextual help */}
        <aside className="trc-card trc-card--side">
          <div className="trc-side-badge">Guidelines</div>
          <h2 className="trc-side-title">Make effective resource requests</h2>
          <p className="trc-side-text">
            Provide clear details about the purpose of your request and the exact
            resources you need. This helps the server room staff plan and
            allocate resources efficiently.
          </p>

          <ul className="trc-side-list">
            <li>
              Include the <strong>student roll number</strong> if the resource is
              for a specific student.
            </li>
            <li>
              Add realistic <strong>date and time</strong> for when you need the
              resources.
            </li>
            <li>
              Mention any <strong>special configurations</strong> or access levels
              clearly.
            </li>
          </ul>

          <p className="trc-side-note">
            You can review the status of this request anytime on the{" "}
            <Link to="/teacher/resource-requests">My Resource Requests</Link>{" "}
            page.
          </p>
        </aside>
      </section>
    </div>
  );
};

export default TeacherResourceRequestCreatePage;
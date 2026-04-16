// src/pages/teacher/TeacherComplaintEditPage.jsx
// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import ComplaintForm from "../../components/complaints/ComplaintForm";
// import {
//   fetchMyComplaintByIdApi,
//   updateMyComplaintApi,
//   uploadComplaintAttachmentsBase64Api,
// } from "../../api/complaintsApi"; // <-- fixed name
// import { fileToDataUrl } from "../../utils/fileUtils";
// import { COMPLAINT_CATEGORIES } from "../../constants/complaintCategories";

// const TeacherComplaintEditPage = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();

//   const [complaint, setComplaint] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);

//   const loadComplaint = async () => {
//     try {
//       setLoading(true);
//       const data = await fetchMyComplaintByIdApi(id);
//       setComplaint(data.complaint);
//     } catch (error) {
//       console.error("Error loading complaint:", error);
//       const msg =
//         error?.response?.data?.message || "Failed to load complaint.";
//       alert(msg);
//       navigate("/teacher/complaints");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadComplaint();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [id]);

//   const handleSubmit = async (values, files) => {
//     try {
//       setSubmitting(true);

//       if (!values.category) {
//         alert("Please select a complaint category.");
//         setSubmitting(false);
//         return;
//       }

//       await updateMyComplaintApi(id, values);

//       if (files && files.length > 0) {
//         const attachments = await Promise.all(
//           files.map(async (file) => ({
//             filename: file.name,
//             mimeType: file.type,
//             size: file.size,
//             data: await fileToDataUrl(file),
//           }))
//         );

//         await uploadComplaintAttachmentsBase64Api(id, attachments);
//       }

//       alert("Complaint updated.");
//       navigate("/teacher/complaints");
//     } catch (error) {
//       console.error("Error updating complaint:", error);
//       const msg =
//         error?.response?.data?.message ||
//         "Failed to update complaint. Please try again.";
//       alert(msg);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) return <div>Loading complaint...</div>;
//   if (!complaint) return null;

//   if (complaint.locked || complaint.status !== "PENDING") {
//     return (
//       <div>
//         <h2>Complaint Locked</h2>
//         <p>This complaint cannot be edited.</p>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h2>Edit Complaint (Teacher)</h2>
//       <ComplaintForm
//         initialValues={complaint}
//         allowedPriorities={["INTERMEDIATE", "HIGH", "CRITICAL"]}
//         showPriority={true}
//         categories={COMPLAINT_CATEGORIES}
//         isSubmitting={submitting}
//         onSubmit={handleSubmit}
//       />
//     </div>
//   );
// };

// export default TeacherComplaintEditPage;
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import ComplaintForm from "../../components/complaints/ComplaintForm";
import {
  fetchMyComplaintByIdApi,
  updateMyComplaintApi,
  uploadComplaintAttachmentsBase64Api,
} from "../../api/complaintsApi";
import { fileToDataUrl } from "../../utils/fileUtils";
import { COMPLAINT_CATEGORIES } from "../../constants/complaintCategories";

// React icons aligned with dashboard theme
import {
  MdEditNote,
  MdArrowBack,
  MdLock,
  MdErrorOutline,
  MdReportProblem,
} from "react-icons/md";

import "./TeacherComplaintEditPage.css";
import { toast } from 'react-toastify';

const TeacherComplaintEditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const loadComplaint = async () => {
    try {
      setErrorMsg("");
      setLoading(true);
      const data = await fetchMyComplaintByIdApi(id);
      setComplaint(data.complaint);
    } catch (error) {
      console.error("Error loading complaint:", error);
      const msg =
        error?.response?.data?.message || "Failed to load complaint.";
      setErrorMsg(msg);
      toast(msg);
      navigate("/teacher/complaints");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComplaint();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSubmit = async (values, files) => {
    try {
      setSubmitting(true);

      if (!values.category) {
        toast("Please select a complaint category.");
        setSubmitting(false);
        return;
      }

      await updateMyComplaintApi(id, values);

      if (files && files.length > 0) {
        const attachments = await Promise.all(
          files.map(async (file) => ({
            filename: file.name,
            mimeType: file.type,
            size: file.size,
            data: await fileToDataUrl(file),
          }))
        );

        await uploadComplaintAttachmentsBase64Api(id, attachments);
      }

      toast("Complaint updated.");
      navigate("/teacher/complaints");
    } catch (error) {
      console.error("Error updating complaint:", error);
      const msg =
        error?.response?.data?.message ||
        "Failed to update complaint. Please try again.";
      toast(msg);
      setErrorMsg(msg);
    } finally {
      setSubmitting(false);
    }
  };

  // Loading state in themed card
  if (loading) {
    return (
      <div className="t-edit-wrap t-edit-wrap--center">
        <div className="t-edit-card t-edit-card--status">
          <span className="t-edit-spinner" />
          <p>Loading complaint...</p>
        </div>
      </div>
    );
  }

  // Not found
  if (!complaint) {
    return (
      <div className="t-edit-wrap t-edit-wrap--center">
        <div className="t-edit-card t-edit-card--status t-edit-card--error">
          <MdErrorOutline size={28} />
          <h2>Complaint not found</h2>
          <p>{errorMsg || "No complaint data available."}</p>
          <Link to="/teacher/complaints" className="tedit-btn tedit-btn--primary">
            <MdArrowBack size={18} />
            <span>Back to My Complaints</span>
          </Link>
        </div>
      </div>
    );
  }

  // Locked / not pending
  if (complaint.locked || complaint.status !== "PENDING") {
    return (
      <div className="t-edit-wrap t-edit-wrap--center">
        <div className="t-edit-card t-edit-card--status t-edit-card--locked">
          <div className="t-edit-icon-circle">
            <MdLock size={28} />
          </div>
          <h2>Complaint Locked</h2>
          <p>
            This complaint cannot be edited because its status is{" "}
            <strong>{complaint.status}</strong> or it has been locked by the
            administration.
          </p>
          <Link to="/teacher/complaints" className="tedit-btn tedit-btn--primary">
            <MdArrowBack size={18} />
            <span>Back to My Complaints</span>
          </Link>
        </div>
      </div>
    );
  }

  // Editable state
  return (
    <div className="t-edit-wrap">
      {/* Page header, aligned with dashboard theme */}
      <header className="t-edit-header">
        <div className="t-edit-header__left">
          <button
            type="button"
            className="tedit-icon-btn"
            onClick={() => navigate("/teacher/complaints")}
            aria-label="Back to My Complaints"
          >
            <MdArrowBack size={18} />
          </button>

          <div className="t-edit-header__titles">
            <h1 className="t-edit-title">
              <MdEditNote className="t-edit-title__icon" size={22} />
              <span>Edit Complaint</span>
            </h1>
            <p className="t-edit-subtitle">
              Update the details and attachments while the complaint is still pending.
            </p>
          </div>
        </div>

        <div className="t-edit-header__meta">
          <div className="t-edit-meta-item">
            <span className="t-edit-meta-label">Complaint ID</span>
            <span className="t-edit-meta-value t-edit-meta-value--mono">
              {complaint._id}
            </span>
          </div>
          <div className="t-edit-meta-item">
            <span className="t-edit-meta-label">Status</span>
            <span className="tedit-badge tedit-badge--status">
              {complaint.status}
            </span>
          </div>
          <div className="t-edit-meta-item">
            <span className="t-edit-meta-label">Created</span>
            <span className="t-edit-meta-value">
              {new Date(complaint.createdAt).toLocaleString()}
            </span>
          </div>
        </div>
      </header>

      {errorMsg && (
        <div className="t-edit-error">
          <MdErrorOutline size={18} />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Main content area: left = form card, right = context info */}
      <section className="t-edit-grid">
        {/* Left: form card */}
        <article className="t-edit-card t-edit-card--form">
          <div className="t-edit-card__header">
            <div className="t-edit-card__title-block">
              <div className="t-edit-card__icon-box">
                <MdReportProblem size={20} />
              </div>
              <div>
                <h2 className="t-edit-card__title">Complaint Details</h2>
                <p className="t-edit-card__subtitle">
                  Edit the title, category, description, priority and attachments.
                </p>
              </div>
            </div>
          </div>

          {/* 
            We keep ComplaintForm exactly as you had it.
            Styling is applied from this page's CSS (wrapper classes).
          */}
          <div className="t-edit-form-wrapper">
            <ComplaintForm
              initialValues={complaint}
              allowedPriorities={["INTERMEDIATE", "HIGH", "CRITICAL"]}
              showPriority={true}
              categories={COMPLAINT_CATEGORIES}
              isSubmitting={submitting}
              onSubmit={handleSubmit}
            />
          </div>
        </article>

        {/* Right: contextual panel */}
        <aside className="t-edit-card t-edit-card--side">
          <div className="t-edit-side-badge">Teacher · Complaint Editing</div>
          <h2 className="t-edit-side-title">Make your request actionable</h2>
          <p className="t-edit-side-text">
            Clear categories, accurate priority and detailed descriptions help the
            campus services resolve issues faster and avoid back-and-forth emails.
          </p>

          <div className="t-edit-side-highlight">
            <MdReportProblem size={24} />
            <p>
              Use <strong>HIGH</strong> or <strong>CRITICAL</strong> for issues
              that block teaching, exams, or lab work. For minor issues, choose
              an appropriate lower priority.
            </p>
          </div>

          <p className="t-edit-side-note">
            Once the complaint status changes from <strong>PENDING</strong> to
            <strong> IN_PROGRESS</strong> or <strong>RESOLVED</strong>, the system
            will lock edits to preserve the audit trail. You can always create a
            follow-up complaint if new issues appear.
          </p>
        </aside>
      </section>
    </div>
  );
};

export default TeacherComplaintEditPage;
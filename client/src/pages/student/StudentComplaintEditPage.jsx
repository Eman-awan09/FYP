// // src/pages/student/StudentComplaintEditPage.jsx
// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import ComplaintForm from "../../components/complaints/ComplaintForm";
// import {
//   fetchMyComplaintByIdApi,
//   updateMyComplaintApi,
//   uploadComplaintAttachmentsBase64Api,
// } from "../../api/complaintsApi"; 
// import { fileToDataUrl } from "../../utils/fileUtils";
// import { COMPLAINT_CATEGORIES } from "../../constants/complaintCategories";

// const StudentComplaintEditPage = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();

//   const [complaint, setComplaint] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);

//   useEffect(() => {
//     const loadComplaint = async () => {
//       try {
//         setLoading(true);
//         const data = await fetchMyComplaintByIdApi(id);
//         setComplaint(data.complaint);
//       } catch (error) {
//         console.error("Error loading complaint:", error);
//         const msg =
//           error?.response?.data?.message || "Failed to load complaint.";
//         alert(msg);
//         navigate("/student/complaints");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) {
//       loadComplaint();
//     }
//   }, [id, navigate]);

//   const handleSubmit = async (values, files) => {
//     try {
//       setSubmitting(true);

//       if (!values.category) {
//         alert("Please select a complaint category.");
//         setSubmitting(false);
//         return;
//       }

//       // Update main fields
//       await updateMyComplaintApi(id, values);

//       // Upload attachments if any
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
//       navigate("/student/complaints");
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
//       <h2>Edit Complaint (Student)</h2>
//       <ComplaintForm
//         initialValues={complaint}
//         allowedPriorities={[]} // ignored when showPriority=false
//         showPriority={false}
//         categories={COMPLAINT_CATEGORIES}
//         isSubmitting={submitting}
//         onSubmit={handleSubmit}
//       />
//     </div>
//   );
// };

// export default StudentComplaintEditPage;
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
import { toast } from 'react-toastify';

// Icons similar to teacher edit page, but student oriented
import {
  MdEditNote,
  MdArrowBack,
  MdLock,
  MdErrorOutline,
  MdReportProblem,
} from "react-icons/md";

import "./StudentComplaintEditPage.css";

const StudentComplaintEditPage = () => {
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
      navigate("/student/complaints");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      loadComplaint();
    }
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

      // Update main fields
      await updateMyComplaintApi(id, values);

      // Upload attachments if any
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
      navigate("/student/complaints");
    } catch (error) {
      console.error("Error updating complaint:", error);
      const msg =
        error?.response?.data?.message ||
        "Failed to update complaint. Please try again.";
      setErrorMsg(msg);
      toast(msg);
    } finally {
      setSubmitting(false);
    }
  };

  // Loading state in themed card
  if (loading) {
    return (
      <div className="sce-wrap sce-wrap--center">
        <div className="sce-card sce-card--status">
          <span className="sce-spinner" />
          <p>Loading complaint...</p>
        </div>
      </div>
    );
  }

  // Not found
  if (!complaint) {
    return (
      <div className="sce-wrap sce-wrap--center">
        <div className="sce-card sce-card--status sce-card--error">
          <MdErrorOutline size={28} />
          <h2>Complaint not found</h2>
          <p>{errorMsg || "No complaint data available."}</p>
          <Link
            to="/student/complaints"
            className="sce-btn sce-btn--primary"
          >
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
      <div className="sce-wrap sce-wrap--center">
        <div className="sce-card sce-card--status sce-card--locked">
          <div className="sce-icon-circle">
            <MdLock size={28} />
          </div>
          <h2>Complaint Locked</h2>
          <p>
            This complaint cannot be edited because its status is{" "}
            <strong>{complaint.status}</strong> or it has been locked by the
            administration.
          </p>
          <Link
            to="/student/complaints"
            className="sce-btn sce-btn--primary"
          >
            <MdArrowBack size={18} />
            <span>Back to My Complaints</span>
          </Link>
        </div>
      </div>
    );
  }

  // Editable state
  return (
    <div className="sce-wrap">
      {/* Header */}
      <header className="sce-header">
        <div className="sce-header__left">
          <button
            type="button"
            className="sce-icon-btn"
            onClick={() => navigate("/student/complaints")}
            aria-label="Back to My Complaints"
          >
            <MdArrowBack size={18} />
          </button>

          <div className="sce-header__titles">
            <h1 className="sce-title">
              <MdEditNote className="sce-title__icon" size={22} />
              <span>Edit Complaint</span>
            </h1>
            <p className="sce-subtitle">
              Update the details of your complaint while it is still in{" "}
              <strong>pending</strong> status.
            </p>
          </div>
        </div>

        <div className="sce-header__meta">
          <div className="sce-meta-item">
            <span className="sce-meta-label">Complaint ID</span>
            <span className="sce-meta-value sce-meta-value--mono">
              {complaint._id}
            </span>
          </div>
          <div className="sce-meta-item">
            <span className="sce-meta-label">Status</span>
            <span className="sce-badge sce-badge--status">
              {complaint.status}
            </span>
          </div>
          <div className="sce-meta-item">
            <span className="sce-meta-label">Created</span>
            <span className="sce-meta-value">
              {new Date(complaint.createdAt).toLocaleString()}
            </span>
          </div>
        </div>
      </header>

      {errorMsg && (
        <div className="sce-error">
          <MdErrorOutline size={18} />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Main content: form + tips */}
      <section className="sce-grid">
        {/* Form card */}
        <article className="sce-card sce-card--form">
          <div className="sce-card__header">
            <div className="sce-card__title-block">
              <div className="sce-card__icon-box">
                <MdReportProblem size={20} />
              </div>
              <div>
                <h2 className="sce-card__title">Complaint Details</h2>
                <p className="sce-card__subtitle">
                  Edit the title, category, description and add or update
                  images. Clear information helps staff resolve your issue
                  quickly.
                </p>
              </div>
            </div>
          </div>

          <div className="sce-form-wrapper">
            <ComplaintForm
              initialValues={complaint}
              allowedPriorities={[]} // ignored when showPriority=false
              showPriority={false}
              categories={COMPLAINT_CATEGORIES}
              isSubmitting={submitting}
              onSubmit={handleSubmit}
            />
          </div>
        </article>

        {/* Right side: student tips */}
        <aside className="sce-card sce-card--side">
          <div className="sce-side-badge">Student · Complaint Editing</div>
          <h2 className="sce-side-title">Help staff understand your issue</h2>
          <p className="sce-side-text">
            The more clearly you describe the problem, the easier it is for
            staff to solve it. Here are a few suggestions:
          </p>

          <ul className="sce-tips">
            <li>
              Include <strong>exact location</strong> (room/lab/hostel number)
              and any special details (e.g., “second row, left side”).
            </li>
            <li>
              If possible, <strong>attach photos</strong> of the issue
              (e.g., broken chairs, damaged cables, error messages on screen).
            </li>
            <li>
              Avoid posting personal or sensitive information. Focus on the{" "}
              <strong>issue itself</strong>.
            </li>
          </ul>

          <p className="sce-side-note">
            Once your complaint moves from <strong>Pending</strong> to{" "}
            <strong>In Progress</strong> or <strong>Resolved</strong>, it will
            be locked to maintain an accurate history.
          </p>
        </aside>
      </section>
    </div>
  );
};

export default StudentComplaintEditPage;
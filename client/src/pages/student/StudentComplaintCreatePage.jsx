// // src/pages/student/StudentComplaintCreatePage.jsx
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import ComplaintForm from "../../components/complaints/ComplaintForm";
// import {
//   createComplaintApi,
//   uploadComplaintAttachmentsBase64Api,
// } from "../../api/complaintsApi"; 
// import { fileToDataUrl } from "../../utils/fileUtils";
// import { COMPLAINT_CATEGORIES } from "../../constants/complaintCategories";

// const StudentComplaintCreatePage = () => {
//   const navigate = useNavigate();
//   const [submitting, setSubmitting] = useState(false);

//   const handleSubmit = async (values, files) => {
//     try {
//       setSubmitting(true);

//       // Ensure category is selected (defensive, in case form didn’t validate)
//       if (!values.category) {
//         alert("Please select a complaint category.");
//         setSubmitting(false);
//         return;
//       }

//       // 1) create complaint
//       const createRes = await createComplaintApi(values);
//       const complaint = createRes.complaint;

//       // 2) convert files to base64 and send to backend
//       if (files && files.length > 0) {
//         const attachments = await Promise.all(
//           files.map(async (file) => ({
//             filename: file.name,
//             mimeType: file.type,
//             size: file.size,
//             data: await fileToDataUrl(file),
//           }))
//         );

//         await uploadComplaintAttachmentsBase64Api(complaint._id, attachments);
//       }

//       alert("Complaint created.");
//       navigate("/student/complaints");
//     } catch (error) {
//       console.error("Error creating complaint:", error);
//       const msg =
//         error?.response?.data?.message ||
//         "Failed to create complaint. Please try again.";
//       alert(msg);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div>
//       <h2>New Complaint (Student)</h2>
//       <ComplaintForm
//         // No priority field for students
//         allowedPriorities={[]}
//         showPriority={false}
//         // NEW: pass categories for dropdown
//         categories={COMPLAINT_CATEGORIES}
//         isSubmitting={submitting}
//         onSubmit={handleSubmit}
//       />
//     </div>
//   );
// };

// export default StudentComplaintCreatePage;
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ComplaintForm from "../../components/complaints/ComplaintForm";
import {
  createComplaintApi,
  uploadComplaintAttachmentsBase64Api,
} from "../../api/complaintsApi";
import { fileToDataUrl } from "../../utils/fileUtils";
import { COMPLAINT_CATEGORIES } from "../../constants/complaintCategories";

import { MdReportProblem, MdArrowBack, MdInfoOutline } from "react-icons/md";
import "./StudentComplaintCreatePage.css";
import { toast } from 'react-toastify';

const StudentComplaintCreatePage = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState("");

  const handleSubmit = async (values, files) => {
    try {
      setSubmitting(true);
      setLocalError("");

      // Ensure category is selected (defensive, in case form didn’t validate)
      if (!values.category) {
        toast("Please select a complaint category.");
        setSubmitting(false);
        return;
      }

      // 1) create complaint
      const createRes = await createComplaintApi(values);
      const complaint = createRes.complaint;

      // 2) convert files to base64 and send to backend
      if (files && files.length > 0) {
        const attachments = await Promise.all(
          files.map(async (file) => ({
            filename: file.name,
            mimeType: file.type,
            size: file.size,
            data: await fileToDataUrl(file),
          }))
        );

        await uploadComplaintAttachmentsBase64Api(complaint._id, attachments);
      }

      toast("Complaint created.");
      navigate("/student/complaints");
    } catch (error) {
      console.error("Error creating complaint:", error);
      const msg =
        error?.response?.data?.message ||
        "Failed to create complaint. Please try again.";
      setLocalError(msg);
      toast(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="scc-page">
      {/* Header */}
      <header className="scc-header">
        <div className="scc-header__left">
          <button
            type="button"
            className="scc-icon-btn"
            onClick={() => navigate("/student/complaints")}
            aria-label="Back to My Complaints"
          >
            <MdArrowBack size={18} />
          </button>

          <div className="scc-header__titles">
            <h1 className="scc-title">
              <MdReportProblem className="scc-title__icon" size={22} />
              <span>New Complaint</span>
            </h1>
            <p className="scc-subtitle">
              Submit a new complaint about classrooms, labs, hostels, IT
              services or other campus facilities. You can edit or delete it
              while it is still pending.
            </p>
          </div>
        </div>

        <div className="scc-header__meta">
          <div className="scc-meta-item">
            <span className="scc-meta-label">Module</span>
            <span className="scc-meta-value">Student · Complaints</span>
          </div>
        </div>
      </header>

      {localError && (
        <div className="scc-error">
          <MdInfoOutline size={18} />
          <span>{localError}</span>
        </div>
      )}

      {/* Main grid: form + tips */}
      <section className="scc-grid">
        {/* Form card */}
        <article className="scc-card scc-card--form">
          <div className="scc-card__header">
            <h2 className="scc-card__title">Complaint Details</h2>
            <p className="scc-card__subtitle">
              Provide a clear title, choose the right category and describe your
              problem. You can also attach images if they help explain the
              issue.
            </p>
          </div>

          <div className="scc-form-wrapper">
            <ComplaintForm
              // No priority field for students
              allowedPriorities={[]}
              showPriority={false}
              categories={COMPLAINT_CATEGORIES}
              isSubmitting={submitting}
              onSubmit={handleSubmit}
            />
          </div>
        </article>

        {/* Tips card */}
        <aside className="scc-card scc-card--side">
          <div className="scc-side-badge">Tips</div>
          <h2 className="scc-side-title">Help staff resolve your issue faster</h2>
          <p className="scc-side-text">
            A well-written complaint makes it easier for staff to understand and
            solve your problem.
          </p>

          <ul className="scc-side-list">
            <li>
              Include the <strong>exact location</strong> of the problem (room,
              lab, hostel block, floor, etc.).
            </li>
            <li>
              Be specific about <strong>what is wrong</strong> (e.g., “Projector
              shows error code…”, “Wi-Fi disconnects every 5 minutes”).
            </li>
            <li>
              Attach <strong>photos or screenshots</strong> when possible,
              especially for physical damage or error messages.
            </li>
            <li>
              Avoid personal attacks; focus on the issue so it can be fixed
              quickly and fairly.
            </li>
          </ul>

          <p className="scc-side-note">
            After submitting, you can track your complaint under{" "}
            <Link to="/student/complaints">My Complaints</Link>. You may edit or
            delete it while it remains in <strong>Pending</strong> status.
          </p>
        </aside>
      </section>
    </div>
  );
};

export default StudentComplaintCreatePage;
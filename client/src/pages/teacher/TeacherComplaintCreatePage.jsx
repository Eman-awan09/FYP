// // src/pages/teacher/TeacherComplaintCreatePage.jsx
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import ComplaintForm from "../../components/complaints/ComplaintForm";
// import {
//   createComplaintApi,
//   uploadComplaintAttachmentsBase64Api,
// } from "../../api/complaintsApi"; // <-- fixed name
// import { fileToDataUrl } from "../../utils/fileUtils";
// import { COMPLAINT_CATEGORIES } from "../../constants/complaintCategories";

// const TeacherComplaintCreatePage = () => {
//   const navigate = useNavigate();
//   const [submitting, setSubmitting] = useState(false);

//   const handleSubmit = async (values, files) => {
//     try {
//       setSubmitting(true);

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
//       navigate("/teacher/complaints");
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
//       <h2>New Complaint (Teacher)</h2>
//       <ComplaintForm
//         allowedPriorities={["INTERMEDIATE", "HIGH", "CRITICAL"]}
//         showPriority={true}
//         categories={COMPLAINT_CATEGORIES}
//         isSubmitting={submitting}
//         onSubmit={handleSubmit}
//       />
//     </div>
//   );
// };

// export default TeacherComplaintCreatePage;
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ComplaintForm from "../../components/complaints/ComplaintForm";
import {
  createComplaintApi,
  uploadComplaintAttachmentsBase64Api,
} from "../../api/complaintsApi";
import { fileToDataUrl } from "../../utils/fileUtils";
import { COMPLAINT_CATEGORIES } from "../../constants/complaintCategories";

// Icons
import { MdReportProblem, MdArrowBack, MdInfoOutline } from "react-icons/md";

import "./TeacherComplaintCreatePage.css";
import { toast } from 'react-toastify';

const TeacherComplaintCreatePage = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (values, files) => {
    try {
      setErrorMsg("");
      setSubmitting(true);

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
      navigate("/teacher/complaints");
    } catch (error) {
      console.error("Error creating complaint:", error);
      const msg =
        error?.response?.data?.message ||
        "Failed to create complaint. Please try again.";
      setErrorMsg(msg);
      toast(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="tcc-page">
      {/* Header */}
      <header className="tcc-header">
        <div className="tcc-header__left">
          <button
            type="button"
            className="tcc-icon-btn"
            onClick={() => navigate("/teacher/complaints")}
            aria-label="Back to My Complaints"
          >
            <MdArrowBack size={18} />
          </button>

          <div className="tcc-header__titles">
            <h1 className="tcc-title">
              <MdReportProblem className="tcc-title__icon" size={22} />
              <span>New Complaint</span>
            </h1>
            <p className="tcc-subtitle">
              Submit a new complaint for classroom, lab, IT or other campus
              services. Provide enough detail so it can be resolved quickly.
            </p>
          </div>
        </div>

        <div className="tcc-header__meta">
          <div className="tcc-meta-item">
            <span className="tcc-meta-label">Role</span>
            <span className="tcc-meta-value">Teacher</span>
          </div>
          <div className="tcc-meta-item">
            <span className="tcc-meta-label">Module</span>
            <span className="tcc-meta-value">Complaints</span>
          </div>
        </div>
      </header>

      {errorMsg && (
        <div className="tcc-error">
          <MdInfoOutline size={18} />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Main grid: form + side info */}
      <section className="tcc-grid">
        {/* Left: form card */}
        <article className="tcc-card tcc-card--form">
          <div className="tcc-card__header">
            <h2 className="tcc-card__title">Complaint Details</h2>
            <p className="tcc-card__subtitle">
              Fill in the title, select the appropriate category and priority,
              describe the issue and add any supporting images.
            </p>
          </div>

          <div className="tcc-form-wrapper">
            <ComplaintForm
              allowedPriorities={["INTERMEDIATE", "HIGH", "CRITICAL"]}
              showPriority={true}
              categories={COMPLAINT_CATEGORIES}
              isSubmitting={submitting}
              onSubmit={handleSubmit}
            />
          </div>
        </article>

        {/* Right: guidance card */}
        <aside className="tcc-card tcc-card--side">
          <div className="tcc-side-badge">Tips</div>
          <h2 className="tcc-side-title">Write clear and precise complaints</h2>
          <p className="tcc-side-text">
            A good complaint helps the service provider or admin team quickly
            understand the problem and take action.
          </p>

          <ul className="tcc-side-list">
            <li>
              Use a <strong>short, descriptive title</strong> (e.g., “Projector
              not working in CS-204”).
            </li>
            <li>
              Choose the <strong>correct category</strong> (IT, Electrical,
              Maintenance, etc.).
            </li>
            <li>
              Pick a <strong>realistic priority</strong> based on the impact on
              your teaching or students.
            </li>
            <li>
              Attach <strong>clear images</strong> or screenshots when possible.
            </li>
          </ul>

          <p className="tcc-side-note">
            Once the complaint is submitted, you can track its status on{" "}
            <Link to="/teacher/complaints">My Complaints</Link>. Edits are
            allowed while it remains <strong>PENDING</strong>.
          </p>
        </aside>
      </section>
    </div>
  );
};

export default TeacherComplaintCreatePage;
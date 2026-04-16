// // src/pages/serviceProvider/SpAssignedComplaintsPage.jsx
// import React, { useEffect, useState } from "react";
// import {
//   fetchAssignedComplaintsApi,
//   updateAssignedComplaintStatusApi,
// } from "../../api/complaintsApi";
// import ImageModal from "../../components/common/ImageModal";

// const STATUS_OPTIONS = ["ASSIGNED", "IN_PROGRESS", "RESOLVED", "CLOSED"];

// const SpAssignedComplaintsPage = () => {
//   const [complaints, setComplaints] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Image modal state
//   const [isImageModalOpen, setIsImageModalOpen] = useState(false);
//   const [activeImageSrc, setActiveImageSrc] = useState("");
//   const [activeImageAlt, setActiveImageAlt] = useState("");

//   const openImageModal = (src, alt) => {
//     if (!src) return;
//     setActiveImageSrc(src);
//     setActiveImageAlt(alt || "Attachment");
//     setIsImageModalOpen(true);
//   };

//   const closeImageModal = () => {
//     setIsImageModalOpen(false);
//     setActiveImageSrc("");
//     setActiveImageAlt("");
//   };

//   const loadComplaints = async () => {
//     try {
//       setLoading(true);
//       const data = await fetchAssignedComplaintsApi();
//       setComplaints(data.complaints || []);
//     } catch (error) {
//       console.error("Error loading assigned complaints:", error);
//       const msg =
//         error?.response?.data?.message ||
//         "Failed to load assigned complaints.";
//       alert(msg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadComplaints();
//   }, []);

//   const handleStatusChange = async (id, currentStatus, newStatus) => {
//     // If already RESOLVED, do not allow any further change
//     if (currentStatus === "RESOLVED") {
//       alert("This complaint has already been resolved. Status cannot be changed.");
//       return;
//     }

//     // If changing to RESOLVED, confirm with SP
//     if (newStatus === "RESOLVED") {
//       const confirmed = window.confirm(
//         "Are you sure you want to mark this complaint as RESOLVED? You will not be able to change the status afterwards."
//       );
//       if (!confirmed) return;
//     }

//     const note = window.prompt(
//       `Optional: add a note for changing status to ${newStatus}`,
//       ""
//     );

//     try {
//       await updateAssignedComplaintStatusApi(id, { status: newStatus, note });
//       alert("Status updated.");
//       loadComplaints();
//     } catch (error) {
//       console.error("Error updating status:", error);
//       const msg =
//         error?.response?.data?.message ||
//         "Failed to update complaint status.";
//       alert(msg);
//     }
//   };

//   return (
//     <div>
//       <h2>Assigned Complaints (Service Provider)</h2>

//       <div style={{ overflowX: "auto" }}>
//         <table
//           style={{
//             width: "100%",
//             borderCollapse: "collapse",
//             border: "1px solid #ddd",
//           }}
//         >
//           <thead>
//             <tr style={{ background: "#f5f5f5" }}>
//               <th style={thStyle}>Title</th>
//               <th style={thStyle}>From</th>
//               <th style={thStyle}>Role</th>
//               <th style={thStyle}>Category</th>
//               <th style={thStyle}>Priority</th>
//               <th style={thStyle}>Attachments</th>
//               <th style={thStyle}>Status</th>
//               <th style={thStyle}>Created</th>
//               <th style={thStyle}>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loading ? (
//               <tr>
//                 <td colSpan="9" style={{ textAlign: "center", padding: "12px" }}>
//                   Loading...
//                 </td>
//               </tr>
//             ) : complaints.length === 0 ? (
//               <tr>
//                 <td colSpan="9" style={{ textAlign: "center", padding: "12px" }}>
//                   No assigned complaints.
//                 </td>
//               </tr>
//             ) : (
//               complaints.map((c) => (
//                 <tr key={c._id}>
//                   <td style={tdStyle}>{c.title}</td>
//                   <td style={tdStyle}>
//                     {c.createdBy?.name || c.createdBy?.email}
//                   </td>
//                   <td style={tdStyle}>{c.creatorRole}</td>
//                   <td style={tdStyle}>{c.category}</td>
//                   <td style={tdStyle}>{c.priority}</td>

//                   {/* Attachments column for service provider */}
//                   <td style={tdStyle}>
//                     {c.attachments && c.attachments.length > 0 ? (
//                       <div
//                         style={{
//                           display: "flex",
//                           gap: "4px",
//                           flexWrap: "wrap",
//                         }}
//                       >
//                         {c.attachments.slice(0, 3).map((att, idx) => {
//                           const isImage =
//                             att.mimeType &&
//                             typeof att.mimeType === "string" &&
//                             att.mimeType.startsWith("image/");

//                           if (isImage && att.data) {
//                             return (
//                               <img
//                                 key={idx}
//                                 src={att.data}
//                                 alt={att.filename || `attachment-${idx + 1}`}
//                                 style={{
//                                   width: "40px",
//                                   height: "40px",
//                                   objectFit: "cover",
//                                   borderRadius: "3px",
//                                   border: "1px solid #ccc",
//                                   cursor: "pointer",
//                                 }}
//                                 onClick={() =>
//                                   openImageModal(
//                                     att.data,
//                                     att.filename || `attachment-${idx + 1}`
//                                   )
//                                 }
//                               />
//                             );
//                           }

//                           return (
//                             <span
//                               key={idx}
//                               style={{ fontSize: "12px", display: "block" }}
//                             >
//                               {att.filename || `File ${idx + 1}`}
//                             </span>
//                           );
//                         })}

//                         {c.attachments.length > 3 && (
//                           <span style={{ fontSize: "12px" }}>
//                             +{c.attachments.length - 3} more
//                           </span>
//                         )}
//                       </div>
//                     ) : (
//                       "-"
//                     )}
//                   </td>

//                   <td style={tdStyle}>{c.status}</td>
//                   <td style={tdStyle}>
//                     {new Date(c.createdAt).toLocaleString()}
//                   </td>
//                   <td style={tdStyle}>
//                     <StatusActions
//                       currentStatus={c.status}
//                       onChange={(newStatus) =>
//                         handleStatusChange(c._id, c.status, newStatus)
//                       }
//                     />
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* shared image modal */}
//       <ImageModal
//         isOpen={isImageModalOpen}
//         onClose={closeImageModal}
//         src={activeImageSrc}
//         alt={activeImageAlt}
//       />
//     </div>
//   );
// };

// const StatusActions = ({ currentStatus, onChange }) => {
//   const isResolved = currentStatus === "RESOLVED";

//   return (
//     <select
//       value={currentStatus}
//       onChange={(e) => onChange(e.target.value)}
//       style={{ padding: "6px" }}
//       disabled={isResolved} // disable full dropdown after resolved
//     >
//       {STATUS_OPTIONS.map((s) => (
//         <option
//           key={s}
//           value={s}
//           // optional: prevent selecting RESOLVED from CLOSED or vice versa,
//           // but requirement was only lock after RESOLVED, so we just show all
//         >
//           {s}
//         </option>
//       ))}
//     </select>
//   );
// };

// const thStyle = {
//   padding: "8px",
//   borderBottom: "1px solid #ddd",
//   textAlign: "left",
// };

// const tdStyle = {
//   padding: "8px",
//   borderBottom: "1px solid #eee",
// };

// export default SpAssignedComplaintsPage;

import React, { useEffect, useState } from "react";
import {
  fetchAssignedComplaintsApi,
  updateAssignedComplaintStatusApi,
} from "../../api/complaintsApi";
import ImageModal from "../../components/common/ImageModal";
import {
  MdBuild,
  MdRefresh,
  MdInfoOutline,
  MdReportProblem,
  MdCheckCircle,
} from "react-icons/md";
import "./SpAssignedComplaintsPage.css";
import { toast } from 'react-toastify';

const STATUS_OPTIONS = ["ASSIGNED", "IN_PROGRESS", "RESOLVED", "CLOSED"];

const SpAssignedComplaintsPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);

  // Image modal state
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [activeImageSrc, setActiveImageSrc] = useState("");
  const [activeImageAlt, setActiveImageAlt] = useState("");

  const openImageModal = (src, alt) => {
    if (!src) return;
    setActiveImageSrc(src);
    setActiveImageAlt(alt || "Attachment");
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
    setActiveImageSrc("");
    setActiveImageAlt("");
  };

  const loadComplaints = async () => {
    try {
      setLoading(true);
      const data = await fetchAssignedComplaintsApi();
      setComplaints(data.complaints || []);
    } catch (error) {
      console.error("Error loading assigned complaints:", error);
      const msg =
        error?.response?.data?.message ||
        "Failed to load assigned complaints.";
      toast(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComplaints();
  }, []);

  const handleStatusChange = async (id, currentStatus, newStatus) => {
    // If already RESOLVED, do not allow any further change
    if (currentStatus === "RESOLVED") {
      toast("This complaint has already been resolved. Status cannot be changed.");
      return;
    }

    // If changing to RESOLVED, confirm with SP
    if (newStatus === "RESOLVED") {
      const confirmed = window.confirm(
        "Are you sure you want to mark this complaint as RESOLVED? You will not be able to change the status afterwards."
      );
      if (!confirmed) return;
    }

    const note = window.prompt(
      `Optional: add a note for changing status to ${newStatus}`,
      ""
    );

    try {
      await updateAssignedComplaintStatusApi(id, { status: newStatus, note });
      toast("Status updated.");
      loadComplaints();
    } catch (error) {
      console.error("Error updating status:", error);
      const msg =
        error?.response?.data?.message ||
        "Failed to update complaint status.";
      toast(msg);
    }
  };

  const stats = {
    total: complaints.length,
    assigned: complaints.filter((c) => c.status === "ASSIGNED").length,
    inProgress: complaints.filter((c) => c.status === "IN_PROGRESS").length,
    resolved: complaints.filter((c) => c.status === "RESOLVED").length,
  };

  return (
    <div className="spc-page">
      {/* Header */}
      <header className="spc-header">
        <div className="spc-header__left">
          <h1 className="spc-title">
            <MdBuild className="spc-title__icon" size={22} />
            <span>Assigned Complaints</span>
          </h1>
          <p className="spc-subtitle">
            View and update the status of complaints assigned to you as a
            service provider. Add a short note when changing status so admins
            and creators know what was done.
          </p>
        </div>

        <div className="spc-header__actions">
          <button
            type="button"
            className="spc-btn spc-btn--ghost"
            onClick={loadComplaints}
            disabled={loading}
          >
            <MdRefresh size={18} />
            <span>{loading ? "Refreshing..." : "Refresh"}</span>
          </button>
        </div>
      </header>

      {/* Info banner */}
      <div className="spc-info">
        <MdInfoOutline size={18} />
        <span>
          When you mark a complaint as <strong>RESOLVED</strong>, you will not
          be able to change its status again. Make sure the work is complete.
        </span>
      </div>

      {/* Summary cards */}
      <section className="spc-section spc-summary">
        <div className="spc-summary-grid">
          <article className="spc-card spc-card--stat">
            <div className="spc-card__icon spc-card__icon--neutral">
              <MdReportProblem />
            </div>
            <div className="spc-card__body">
              <p className="spc-card__label">Total Assigned</p>
              <p className="spc-card__value">{stats.total}</p>
            </div>
          </article>

          <article className="spc-card spc-card--stat">
            <div className="spc-card__icon spc-card__icon--assigned">
              <MdReportProblem />
            </div>
            <div className="spc-card__body">
              <p className="spc-card__label">Assigned</p>
              <p className="spc-card__value">{stats.assigned}</p>
            </div>
          </article>

          <article className="spc-card spc-card--stat">
            <div className="spc-card__icon spc-card__icon--progress">
              <MdBuild />
            </div>
            <div className="spc-card__body">
              <p className="spc-card__label">In Progress</p>
              <p className="spc-card__value">{stats.inProgress}</p>
            </div>
          </article>

          <article className="spc-card spc-card--stat">
            <div className="spc-card__icon spc-card__icon--resolved">
              <MdCheckCircle />
            </div>
            <div className="spc-card__body">
              <p className="spc-card__label">Resolved</p>
              <p className="spc-card__value">{stats.resolved}</p>
            </div>
          </article>
        </div>
      </section>

      {/* Table */}
      <section className="spc-section">
        <div className="spc-table-card">
          <div className="spc-table__wrapper">
            <table className="spc-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>From</th>
                  <th>Role</th>
                  <th>Category</th>
                  <th>Priority</th>
                  <th>Attachments</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={9} className="spc-table__empty">
                      Loading...
                    </td>
                  </tr>
                ) : complaints.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="spc-table__empty">
                      No assigned complaints.
                    </td>
                  </tr>
                ) : (
                  complaints.map((c) => (
                    <tr key={c._id}>
                      <td>{c.title}</td>
                      <td>{c.createdBy?.name || c.createdBy?.email}</td>
                      <td>{c.creatorRole}</td>
                      <td>{c.category}</td>
                      <td>
                        <span
                          className={`spc-badge spc-badge--priority spc-badge--${(c.priority ||
                            "").toLowerCase()}`}
                        >
                          {c.priority}
                        </span>
                      </td>

                      {/* Attachments */}
                      <td>
                        {c.attachments && c.attachments.length > 0 ? (
                          <div className="spc-attachments">
                            {c.attachments.slice(0, 3).map((att, idx) => {
                              const isImage =
                                att.mimeType &&
                                typeof att.mimeType === "string" &&
                                att.mimeType.startsWith("image/");

                              if (isImage && att.data) {
                                return (
                                  <img
                                    key={idx}
                                    src={att.data}
                                    alt={
                                      att.filename || `attachment-${idx + 1}`
                                    }
                                    className="spc-attachment-thumb"
                                    onClick={() =>
                                      openImageModal(
                                        att.data,
                                        att.filename || `attachment-${idx + 1}`
                                      )
                                    }
                                  />
                                );
                              }

                              return (
                                <span
                                  key={idx}
                                  className="spc-attachment-name"
                                >
                                  {att.filename || `File ${idx + 1}`}
                                </span>
                              );
                            })}
                            {c.attachments.length > 3 && (
                              <span className="spc-attachment-more">
                                +{c.attachments.length - 3} more
                              </span>
                            )}
                          </div>
                        ) : (
                          "-"
                        )}
                      </td>

                      <td>
                        <span
                          className={`spc-badge spc-badge--status spc-badge--${(c.status ||
                            "").toLowerCase()}`}
                        >
                          {c.status}
                        </span>
                      </td>

                      <td>{new Date(c.createdAt).toLocaleString()}</td>

                      <td>
                        <StatusActions
                          currentStatus={c.status}
                          onChange={(newStatus) =>
                            handleStatusChange(c._id, c.status, newStatus)
                          }
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* shared image modal */}
      <ImageModal
        isOpen={isImageModalOpen}
        onClose={closeImageModal}
        src={activeImageSrc}
        alt={activeImageAlt}
      />
    </div>
  );
};

const StatusActions = ({ currentStatus, onChange }) => {
  const isResolved = currentStatus === "RESOLVED";

  return (
    <select
      value={currentStatus}
      onChange={(e) => onChange(e.target.value)}
      className="spc-status-select"
      disabled={isResolved} // disable full dropdown after resolved
    >
      {STATUS_OPTIONS.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
};

export default SpAssignedComplaintsPage;
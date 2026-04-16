// // src/pages/admin/AdminComplaintsPage.jsx
// import React, { useEffect, useState } from "react";
// import {
//   fetchAllComplaintsApi,
//   updateComplaintStatusAdminApi,
//   assignComplaintToServiceProviderApi,
// } from "../../api/complaintsApi";
// import { fetchServiceProvidersApi } from "../../api/userApi";
// import ImageModal from "../../components/common/ImageModal";

// const STATUS_OPTIONS = [
//   "",
//   "PENDING",
//   "APPROVED",
//   "REJECTED",
//   "ASSIGNED",
//   "IN_PROGRESS",
//   "RESOLVED",
//   "CLOSED",
// ];

// const PRIORITY_OPTIONS = ["", "INTERMEDIATE", "HIGH", "CRITICAL"];

// const ROLE_OPTIONS = ["", "STUDENT", "TEACHER"];

// const AdminComplaintsPage = () => {
//   const [complaints, setComplaints] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [statusFilter, setStatusFilter] = useState("");
//   const [priorityFilter, setPriorityFilter] = useState("");
//   const [creatorRoleFilter, setCreatorRoleFilter] = useState("");

//   const [serviceProviders, setServiceProviders] = useState([]);
//   const [spLoading, setSpLoading] = useState(false);
//   const [assigningId, setAssigningId] = useState(null);
//   const [assignSelections, setAssignSelections] = useState({}); // complaintId -> spId

//   // For viewing attachments in large view
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
//       const params = {};
//       if (statusFilter) params.status = statusFilter;
//       if (priorityFilter) params.priority = priorityFilter;
//       if (creatorRoleFilter) params.creatorRole = creatorRoleFilter;

//       const data = await fetchAllComplaintsApi(params);
//       setComplaints(data.complaints || []);
//     } catch (error) {
//       console.error("Error loading complaints:", error);
//       const msg =
//         error?.response?.data?.message || "Failed to load complaints.";
//       alert(msg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadServiceProviders = async () => {
//     try {
//       setSpLoading(true);
//       const data = await fetchServiceProvidersApi();
//       setServiceProviders(data.users || []);
//     } catch (error) {
//       console.error("Error loading service providers:", error);
//       const msg =
//         error?.response?.data?.message ||
//         "Failed to load service providers.";
//       alert(msg);
//     } finally {
//       setSpLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadComplaints();
//     loadServiceProviders();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const handleFilterSubmit = (e) => {
//     e.preventDefault();
//     loadComplaints();
//   };

//   const handleStatusChange = async (id, status, lock) => {
//     try {
//       await updateComplaintStatusAdminApi(id, { status, lock });
//       alert(`Complaint ${status.toLowerCase()}.`);
//       loadComplaints();
//     } catch (error) {
//       console.error("Error updating status:", error);
//       const msg =
//         error?.response?.data?.message ||
//         "Failed to update complaint status.";
//       alert(msg);
//     }
//   };

//   const handleAssignSelectionChange = (complaintId, spId) => {
//     setAssignSelections((prev) => ({
//       ...prev,
//       [complaintId]: spId,
//     }));
//   };

//   const handleAssign = async (complaintId) => {
//     const spId =
//       assignSelections[complaintId] ||
//       complaints.find((c) => c._id === complaintId)?.assignedTo?._id;

//     if (!spId) {
//       alert("Please select a service provider to assign.");
//       return;
//     }

//     try {
//       setAssigningId(complaintId);
//       await assignComplaintToServiceProviderApi(complaintId, spId);
//       alert("Complaint assigned to service provider.");
//       loadComplaints();
//     } catch (error) {
//       console.error("Error assigning complaint:", error);
//       const msg =
//         error?.response?.data?.message ||
//         "Failed to assign complaint. Please try again.";
//       alert(msg);
//     } finally {
//       setAssigningId(null);
//     }
//   };

//   return (
//     <div>
//       <h2>Admin - Complaints</h2>

//       {/* Filters */}
//       <form
//         onSubmit={handleFilterSubmit}
//         style={{
//           display: "flex",
//           gap: "12px",
//           marginBottom: "16px",
//           flexWrap: "wrap",
//         }}
//       >
//         <div>
//           <label>Status</label>
//           <select
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//             style={{ marginLeft: "8px" }}
//           >
//             {STATUS_OPTIONS.map((s) => (
//               <option key={s} value={s}>
//                 {s || "All"}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label>Priority</label>
//           <select
//             value={priorityFilter}
//             onChange={(e) => setPriorityFilter(e.target.value)}
//             style={{ marginLeft: "8px" }}
//           >
//             {PRIORITY_OPTIONS.map((p) => (
//               <option key={p} value={p}>
//                 {p || "All"}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label>Creator Role</label>
//           <select
//             value={creatorRoleFilter}
//             onChange={(e) => setCreatorRoleFilter(e.target.value)}
//             style={{ marginLeft: "8px" }}
//           >
//             {ROLE_OPTIONS.map((r) => (
//               <option key={r} value={r}>
//                 {r || "All"}
//               </option>
//             ))}
//           </select>
//         </div>

//         <button type="submit" disabled={loading}>
//           {loading ? "Filtering..." : "Apply Filters"}
//         </button>
//       </form>

//       <div style={{ marginBottom: "8px" }}>
//         {spLoading ? (
//           <small>Loading service providers...</small>
//         ) : (
//           <small>Service providers loaded: {serviceProviders.length}</small>
//         )}
//       </div>

//       <div style={{ overflowX: "auto" }}>
//         <table
//           style={{
//             width: "100%",
//             borderCollapse: "collapse",
//             border: "1px solid #ddd",
//           }}
//         >
//           <thead>
//             <tr style={{ background: "#100f0fff" }}>
//               <th style={thStyle}>Title</th>
//               <th style={thStyle}>Creator</th>
//               <th style={thStyle}>Role</th>
//               <th style={thStyle}>Category</th>
//               <th style={thStyle}>Priority</th>
//               <th style={thStyle}>Status</th>
//               <th style={thStyle}>Assigned To</th>
//               <th style={thStyle}>Is Resolved</th> {/* CHANGED */}
//               <th style={thStyle}>Attachments</th>
//               <th style={thStyle}>Created</th>
//               <th style={thStyle}>Admin Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loading ? (
//               <tr>
//                 <td
//                   colSpan="11"
//                   style={{ textAlign: "center", padding: "12px" }}
//                 >
//                   Loading...
//                 </td>
//               </tr>
//             ) : complaints.length === 0 ? (
//               <tr>
//                 <td
//                   colSpan="11"
//                   style={{ textAlign: "center", padding: "12px" }}
//                 >
//                   No complaints found.
//                 </td>
//               </tr>
//             ) : (
//               complaints.map((c) => {
//                 const currentAssignedId = c.assignedTo?._id || "";
//                 const selectedSpId =
//                   assignSelections[c._id] || currentAssignedId;

//                 const isResolvedOrClosed =
//                   c.status === "RESOLVED" || c.status === "CLOSED";
//                 const isResolvedFlag = isResolvedOrClosed ? "Yes" : "No";

//                 return (
//                   <tr key={c._id}>
//                     <td style={tdStyle}>{c.title}</td>
//                     <td style={tdStyle}>
//                       {c.createdBy?.name || c.createdBy?.email}
//                     </td>
//                     <td style={tdStyle}>{c.creatorRole}</td>
//                     <td style={tdStyle}>{c.category}</td>
//                     <td style={tdStyle}>{c.priority}</td>
//                     <td style={tdStyle}>{c.status}</td>
//                     <td style={tdStyle}>
//                       {c.assignedTo?.name || c.assignedTo?.email || "-"}
//                     </td>
//                     {/* Is Resolved column */}
//                     <td style={tdStyle}>{isResolvedFlag}</td>

//                     {/* Attachments column: thumbnails + click to enlarge */}
//                     <td style={tdStyle}>
//                       {c.attachments && c.attachments.length > 0 ? (
//                         <div
//                           style={{
//                             display: "flex",
//                             gap: "4px",
//                             flexWrap: "wrap",
//                           }}
//                         >
//                           {c.attachments.slice(0, 3).map((att, idx) => {
//                             const isImage =
//                               att.mimeType &&
//                               typeof att.mimeType === "string" &&
//                               att.mimeType.startsWith("image/");

//                             if (isImage && att.data) {
//                               return (
//                                 <img
//                                   key={idx}
//                                   src={att.data}
//                                   alt={att.filename || `attachment-${idx + 1}`}
//                                   style={{
//                                     width: "40px",
//                                     height: "40px",
//                                     objectFit: "cover",
//                                     borderRadius: "3px",
//                                     border: "1px solid #ccc",
//                                     cursor: "pointer",
//                                   }}
//                                   onClick={() =>
//                                     openImageModal(
//                                       att.data,
//                                       att.filename || `attachment-${idx + 1}`
//                                     )
//                                   }
//                                 />
//                               );
//                             }

//                             // Non-image or missing data: show filename
//                             return (
//                               <span
//                                 key={idx}
//                                 style={{ fontSize: "12px", display: "block" }}
//                               >
//                                 {att.filename || `File ${idx + 1}`}
//                               </span>
//                             );
//                           })}

//                           {c.attachments.length > 3 && (
//                             <span style={{ fontSize: "12px" }}>
//                               +{c.attachments.length - 3} more
//                             </span>
//                           )}
//                         </div>
//                       ) : (
//                         "-"
//                       )}
//                     </td>

//                     <td style={tdStyle}>
//                       {new Date(c.createdAt).toLocaleString()}
//                     </td>
//                     <td style={tdStyle}>
//                       {/* Status actions for pending */}
//                       {c.status === "PENDING" && (
//                         <div style={{ marginBottom: "8px" }}>
//                           <button
//                             style={{ marginRight: "6px" }}
//                             onClick={() =>
//                               handleStatusChange(c._id, "APPROVED", true)
//                             }
//                           >
//                             Approve & Lock
//                           </button>
//                           <button
//                             onClick={() =>
//                               handleStatusChange(c._id, "REJECTED", true)
//                             }
//                           >
//                             Reject
//                           </button>
//                         </div>
//                       )}

//                       {/* Assignment: HIDE when resolved/closed */}
//                       {!isResolvedOrClosed && (
//                         <div style={{ display: "flex", gap: "4px" }}>
//                           <select
//                             value={selectedSpId}
//                             onChange={(e) =>
//                               handleAssignSelectionChange(
//                                 c._id,
//                                 e.target.value
//                               )
//                             }
//                             style={{ padding: "6px" }}
//                           >
//                             <option value="">Select Service Provider</option>
//                             {serviceProviders.map((sp) => {
//                               const name = sp.name || sp.email;
//                               const dept =
//                                 sp.department || sp.specialization || "";
//                               const label = dept
//                                 ? `${name} (${dept})`
//                                 : name;

//                               return (
//                                 <option key={sp._id} value={sp._id}>
//                                   {label}
//                                 </option>
//                               );
//                             })}
//                           </select>
//                           <button
//                             disabled={assigningId === c._id}
//                             onClick={() => handleAssign(c._id)}
//                           >
//                             {assigningId === c._id
//                               ? "Assigning..."
//                               : c.assignedTo
//                               ? "Change Provider"
//                               : "Assign"}
//                           </button>
//                         </div>
//                       )}
//                     </td>
//                   </tr>
//                 );
//               })
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Global image modal for this page */}
//       <ImageModal
//         isOpen={isImageModalOpen}
//         onClose={closeImageModal}
//         src={activeImageSrc}
//         alt={activeImageAlt}
//       />
//     </div>
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

// export default AdminComplaintsPage;
import React, { useEffect, useState } from "react";
import {
  fetchAllComplaintsApi,
  updateComplaintStatusAdminApi,
  assignComplaintToServiceProviderApi,
} from "../../api/complaintsApi";
import { fetchServiceProvidersApi } from "../../api/userApi";
import ImageModal from "../../components/common/ImageModal";
import {
  MdReportProblem,
  MdFilterList,
  MdRefresh,
  MdInfoOutline,
  MdAssignmentInd,
  MdCheckCircle,
  MdBlock,
  MdWarningAmber,
} from "react-icons/md";
import "./AdminComplaintsPage.css";
import { toast } from 'react-toastify';

const STATUS_OPTIONS = [
  "",
  "PENDING",
  "APPROVED",
  "REJECTED",
  "ASSIGNED",
  "IN_PROGRESS",
  "RESOLVED",
  "CLOSED",
];

const PRIORITY_OPTIONS = ["", "INTERMEDIATE", "HIGH", "CRITICAL"];

const ROLE_OPTIONS = ["", "STUDENT", "TEACHER"];

const AdminComplaintsPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);

  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [creatorRoleFilter, setCreatorRoleFilter] = useState("");

  const [serviceProviders, setServiceProviders] = useState([]);
  const [spLoading, setSpLoading] = useState(false);
  const [assigningId, setAssigningId] = useState(null);
  const [assignSelections, setAssignSelections] = useState({}); // complaintId -> spId

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
      const params = {};
      if (statusFilter) params.status = statusFilter;
      if (priorityFilter) params.priority = priorityFilter;
      if (creatorRoleFilter) params.creatorRole = creatorRoleFilter;

      const data = await fetchAllComplaintsApi(params);
      setComplaints(data.complaints || []);
    } catch (error) {
      console.error("Error loading complaints:", error);
      const msg =
        error?.response?.data?.message || "Failed to load complaints.";
      toast(msg);
    } finally {
      setLoading(false);
    }
  };

  const loadServiceProviders = async () => {
    try {
      setSpLoading(true);
      const data = await fetchServiceProvidersApi();
      setServiceProviders(data.users || []);
    } catch (error) {
      console.error("Error loading service providers:", error);
      const msg =
        error?.response?.data?.message ||
        "Failed to load service providers.";
      toast(msg);
    } finally {
      setSpLoading(false);
    }
  };

  useEffect(() => {
    loadComplaints();
    loadServiceProviders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    loadComplaints();
  };

  const handleStatusChange = async (id, status, lock) => {
    try {
      await updateComplaintStatusAdminApi(id, { status, lock });
      toast(`Complaint ${status.toLowerCase()}.`);
      loadComplaints();
    } catch (error) {
      console.error("Error updating status:", error);
      const msg =
        error?.response?.data?.message ||
        "Failed to update complaint status.";
      toast(msg);
    }
  };

  const handleAssignSelectionChange = (complaintId, spId) => {
    setAssignSelections((prev) => ({
      ...prev,
      [complaintId]: spId,
    }));
  };

  const handleAssign = async (complaintId) => {
    const spId =
      assignSelections[complaintId] ||
      complaints.find((c) => c._id === complaintId)?.assignedTo?._id;

    if (!spId) {
      toast("Please select a service provider to assign.");
      return;
    }

    try {
      setAssigningId(complaintId);
      await assignComplaintToServiceProviderApi(complaintId, spId);
      toast("Complaint assigned to service provider.");
      loadComplaints();
    } catch (error) {
      console.error("Error assigning complaint:", error);
      const msg =
        error?.response?.data?.message ||
        "Failed to assign complaint. Please try again.";
      toast(msg);
    } finally {
      setAssigningId(null);
    }
  };

  const stats = {
    total: complaints.length,
    pending: complaints.filter((c) => c.status === "PENDING").length,
    inProgress: complaints.filter((c) => c.status === "IN_PROGRESS").length,
    resolved: complaints.filter((c) => c.status === "RESOLVED").length,
  };

  return (
    <div className="ac-page">
      {/* Header */}
      <header className="ac-header">
        <div className="ac-header__left">
          <h1 className="ac-title">
            <MdReportProblem className="ac-title__icon" size={22} />
            <span>Complaints Administration</span>
          </h1>
          <p className="ac-subtitle">
            Review, filter and route complaints submitted by students and
            teachers. Approve, reject, assign or close complaints as needed.
          </p>
        </div>

        <div className="ac-header__actions">
          <button
            type="button"
            className="ac-btn ac-btn--ghost"
            onClick={loadComplaints}
            disabled={loading}
          >
            <MdRefresh size={18} />
            <span>{loading ? "Refreshing..." : "Refresh"}</span>
          </button>
        </div>
      </header>

      {/* Info / service provider load indicator */}
      <div className="ac-info">
        <MdInfoOutline size={18} />
        <span>
          Service providers loaded:{" "}
          {spLoading ? "Loading..." : serviceProviders.length}
        </span>
      </div>

      {/* Summary cards */}
      <section className="ac-section ac-summary">
        <div className="ac-summary-grid">
          <article className="ac-card ac-card--stat">
            <div className="ac-card__icon ac-card__icon--neutral">
              <MdReportProblem />
            </div>
            <div className="ac-card__body">
              <p className="ac-card__label">Total</p>
              <p className="ac-card__value">{stats.total}</p>
            </div>
          </article>
          <article className="ac-card ac-card--stat">
            <div className="ac-card__icon ac-card__icon--pending">
              <MdWarningAmber />
            </div>
            <div className="ac-card__body">
              <p className="ac-card__label">Pending</p>
              <p className="ac-card__value">{stats.pending}</p>
            </div>
          </article>
          <article className="ac-card ac-card--stat">
            <div className="ac-card__icon ac-card__icon--progress">
              <MdAssignmentInd />
            </div>
            <div className="ac-card__body">
              <p className="ac-card__label">In Progress</p>
              <p className="ac-card__value">{stats.inProgress}</p>
            </div>
          </article>
          <article className="ac-card ac-card--stat">
            <div className="ac-card__icon ac-card__icon--resolved">
              <MdCheckCircle />
            </div>
            <div className="ac-card__body">
              <p className="ac-card__label">Resolved</p>
              <p className="ac-card__value">{stats.resolved}</p>
            </div>
          </article>
        </div>
      </section>

      {/* Filters */}
      <section className="ac-section">
        <form className="ac-filters" onSubmit={handleFilterSubmit}>
          <div className="ac-filters__group">
            <div className="ac-filter-label">
              <MdFilterList size={18} />
              <span>Filters</span>
            </div>

            <div className="ac-filter-controls">
              {/* Status */}
              <div className="ac-select">
                <label htmlFor="statusFilter">Status</label>
                <select
                  id="statusFilter"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s || "All"}
                    </option>
                  ))}
                </select>
              </div>

              {/* Priority */}
              <div className="ac-select">
                <label htmlFor="priorityFilter">Priority</label>
                <select
                  id="priorityFilter"
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                >
                  {PRIORITY_OPTIONS.map((p) => (
                    <option key={p} value={p}>
                      {p || "All"}
                    </option>
                  ))}
                </select>
              </div>

              {/* Creator Role */}
              <div className="ac-select">
                <label htmlFor="creatorRoleFilter">Creator Role</label>
                <select
                  id="creatorRoleFilter"
                  value={creatorRoleFilter}
                  onChange={(e) => setCreatorRoleFilter(e.target.value)}
                >
                  {ROLE_OPTIONS.map((r) => (
                    <option key={r} value={r}>
                      {r || "All"}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="ac-btn ac-btn--primary ac-filters__submit"
          >
            {loading ? "Filtering..." : "Apply Filters"}
          </button>
        </form>
      </section>

      {/* Complaints table */}
      <section className="ac-section">
        <div className="ac-table-card">
          <div className="ac-table__wrapper">
            <table className="ac-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Creator</th>
                  <th>Role</th>
                  <th>Category</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Assigned To</th>
                  <th>Resolved?</th>
                  <th>Attachments</th>
                  <th>Created</th>
                  <th>Admin Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={11} className="ac-table__empty">
                      Loading...
                    </td>
                  </tr>
                ) : complaints.length === 0 ? (
                  <tr>
                    <td colSpan={11} className="ac-table__empty">
                      No complaints found.
                    </td>
                  </tr>
                ) : (
                  complaints.map((c) => {
                    const currentAssignedId = c.assignedTo?._id || "";
                    const selectedSpId =
                      assignSelections[c._id] || currentAssignedId;

                    const isResolvedOrClosed =
                      c.status === "RESOLVED" || c.status === "CLOSED";
                    const isResolvedFlag = isResolvedOrClosed ? "Yes" : "No";

                    return (
                      <tr key={c._id}>
                        <td>{c.title}</td>
                        <td>{c.createdBy?.name || c.createdBy?.email}</td>
                        <td>{c.creatorRole}</td>
                        <td>{c.category}</td>
                        <td>
                          <span
                            className={`ac-badge ac-badge--priority ac-badge--${(c.priority ||
                              "")
                              .toLowerCase()}`}
                          >
                            {c.priority}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`ac-badge ac-badge--status ac-badge--${(c.status ||
                              "")
                              .toLowerCase()}`}
                          >
                            {c.status}
                          </span>
                        </td>
                        <td>
                          {c.assignedTo?.name || c.assignedTo?.email || "-"}
                        </td>
                        <td>{isResolvedFlag}</td>

                        {/* Attachments */}
                        <td>
                          {c.attachments && c.attachments.length > 0 ? (
                            <div className="ac-attachments">
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
                                      className="ac-attachment-thumb"
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
                                    className="ac-attachment-name"
                                  >
                                    {att.filename || `File ${idx + 1}`}
                                  </span>
                                );
                              })}
                              {c.attachments.length > 3 && (
                                <span className="ac-attachment-more">
                                  +{c.attachments.length - 3} more
                                </span>
                              )}
                            </div>
                          ) : (
                            "-"
                          )}
                        </td>

                        <td>{new Date(c.createdAt).toLocaleString()}</td>

                        {/* Admin actions */}
                        <td>
                          <div className="ac-actions">
                            {c.status === "PENDING" && (
                              <div className="ac-actions__row">
                                <button
                                  type="button"
                                  className="ac-chip ac-chip--success"
                                  onClick={() =>
                                    handleStatusChange(
                                      c._id,
                                      "APPROVED",
                                      true
                                    )
                                  }
                                >
                                  Approve &amp; Lock
                                </button>
                                <button
                                  type="button"
                                  className="ac-chip ac-chip--danger"
                                  onClick={() =>
                                    handleStatusChange(
                                      c._id,
                                      "REJECTED",
                                      true
                                    )
                                  }
                                >
                                  Reject
                                </button>
                              </div>
                            )}

                            {!isResolvedOrClosed && (
                              <div className="ac-actions__row ac-actions__row--assign">
                                <select
                                  value={selectedSpId}
                                  onChange={(e) =>
                                    handleAssignSelectionChange(
                                      c._id,
                                      e.target.value
                                    )
                                  }
                                  className="ac-assign-select"
                                >
                                  <option value="">
                                    Select Service Provider
                                  </option>
                                  {serviceProviders.map((sp) => {
                                    const name = sp.name || sp.email;
                                    const dept =
                                      sp.department || sp.specialization || "";
                                    const label = dept
                                      ? `${name} (${dept})`
                                      : name;

                                    return (
                                      <option key={sp._id} value={sp._id}>
                                        {label}
                                      </option>
                                    );
                                  })}
                                </select>
                                <button
                                  type="button"
                                  className="ac-chip ac-chip--primary"
                                  disabled={assigningId === c._id}
                                  onClick={() => handleAssign(c._id)}
                                >
                                  {assigningId === c._id
                                    ? "Assigning..."
                                    : c.assignedTo
                                    ? "Change Provider"
                                    : "Assign"}
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <ImageModal
        isOpen={isImageModalOpen}
        onClose={closeImageModal}
        src={activeImageSrc}
        alt={activeImageAlt}
      />
    </div>
  );
};

export default AdminComplaintsPage;
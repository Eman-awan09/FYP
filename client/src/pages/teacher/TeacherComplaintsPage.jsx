// src/pages/teacher/TeacherComplaintsPage.jsx
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   fetchMyComplaintsApi,
//   deleteMyComplaintApi,
// } from "../../api/complaintsApi";

// const TeacherComplaintsPage = () => {
//   const [complaints, setComplaints] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const loadComplaints = async () => {
//     try {
//       setLoading(true);
//       const data = await fetchMyComplaintsApi();
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

//   useEffect(() => {
//     loadComplaints();
//   }, []);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this complaint?")) {
//       return;
//     }
//     try {
//       await deleteMyComplaintApi(id);
//       alert("Complaint deleted.");
//       loadComplaints();
//     } catch (error) {
//       console.error("Error deleting complaint:", error);
//       const msg =
//         error?.response?.data?.message || "Failed to delete complaint.";
//       alert(msg);
//     }
//   };

//   return (
//     <div>
//       <h2>My Complaints (Teacher)</h2>

//       <div style={{ marginBottom: "16px" }}>
//         <Link
//           to="/teacher/complaints/new"
//           style={{
//             padding: "8px 12px",
//             background: "#1976d2",
//             color: "#fff",
//             borderRadius: "4px",
//             textDecoration: "none",
//           }}
//         >
//           + New Complaint
//         </Link>
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
//             <tr style={{ background: "#f5f5f5" }}>
//               <th style={thStyle}>Title</th>
//               <th style={thStyle}>Category</th>
//               <th style={thStyle}>Priority</th>
//               <th style={thStyle}>Status</th>
//               <th style={thStyle}>Created</th>
//               <th style={thStyle}>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loading ? (
//               <tr>
//                 <td colSpan="6" style={{ textAlign: "center", padding: "12px" }}>
//                   Loading...
//                 </td>
//               </tr>
//             ) : complaints.length === 0 ? (
//               <tr>
//                 <td colSpan="6" style={{ textAlign: "center", padding: "12px" }}>
//                   No complaints yet.
//                 </td>
//               </tr>
//             ) : (
//               complaints.map((c) => (
//                 <tr key={c._id}>
//                   <td style={tdStyle}>{c.title}</td>
//                   <td style={tdStyle}>{c.category}</td>
//                   <td style={tdStyle}>{c.priority}</td>
//                   <td style={tdStyle}>{c.status}</td>
//                   <td style={tdStyle}>
//                     {new Date(c.createdAt).toLocaleString()}
//                   </td>
//                   <td style={tdStyle}>
//                     {c.status === "PENDING" && !c.locked && (
//                       <>
//                         <Link
//                           to={`/teacher/complaints/${c._id}/edit`}
//                           style={{ marginRight: "8px" }}
//                         >
//                           Edit
//                         </Link>
//                         <button onClick={() => handleDelete(c._id)}>
//                           Delete
//                         </button>
//                       </>
//                     )}
//                     {(c.status !== "PENDING" || c.locked) && (
//                       <span style={{ color: "#777" }}>Locked</span>
//                     )}
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
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

// export default TeacherComplaintsPage;

import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  fetchMyComplaintsApi,
  deleteMyComplaintApi,
} from "../../api/complaintsApi";
import {
  MdFilterList,
  MdOutlineErrorOutline,
  MdOutlineCheckCircle,
  MdOutlinePendingActions,
  MdSearch,
  MdAdd,
  MdDeleteOutline,
  MdEditNote,
  MdRefresh,
} from "react-icons/md";
import "./TeacherComplaintsPage.css";
import { toast } from 'react-toastify';

const TeacherComplaintsPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // UI state (frontend only)
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [priorityFilter, setPriorityFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  const loadComplaints = async () => {
    try {
      setLoading(true);
      const data = await fetchMyComplaintsApi();
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

  useEffect(() => {
    loadComplaints();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this complaint?")) {
      return;
    }
    try {
      setDeletingId(id);
      await deleteMyComplaintApi(id);
      toast("Complaint deleted.");
      await loadComplaints();
    } catch (error) {
      console.error("Error deleting complaint:", error);
      const msg =
        error?.response?.data?.message || "Failed to delete complaint.";
      toast(msg);
    } finally {
      setDeletingId(null);
    }
  };

  // Derived stats for header
  const stats = useMemo(() => {
    const total = complaints.length;
    const pending = complaints.filter((c) => c.status === "PENDING").length;
    const inProgress = complaints.filter(
      (c) => c.status === "IN_PROGRESS"
    ).length;
    const resolved = complaints.filter((c) => c.status === "RESOLVED").length;
    return { total, pending, inProgress, resolved };
  }, [complaints]);

  // Filtered + searched complaints
  const filteredComplaints = useMemo(() => {
    return complaints.filter((c) => {
      if (statusFilter !== "ALL" && c.status !== statusFilter) return false;
      if (priorityFilter !== "ALL" && c.priority !== priorityFilter)
        return false;

      if (searchTerm.trim()) {
        const term = searchTerm.trim().toLowerCase();
        const composite =
          `${c.title} ${c.category} ${c.priority} ${c.status}`.toLowerCase();
        if (!composite.includes(term)) return false;
      }

      return true;
    });
  }, [complaints, statusFilter, priorityFilter, searchTerm]);

  return (
    <div className="t-complaints">
      {/* Header */}
      <header className="t-complaints__header">
        <div>
          <h1 className="t-complaints__title">My Complaints</h1>
          <p className="t-complaints__subtitle">
            Create, track and manage your complaints as a teacher.
          </p>
        </div>
        <div className="t-complaints__header-actions">
          <button
            type="button"
            className="tc-btn tc-btn--ghost"
            onClick={loadComplaints}
            disabled={loading}
          >
            <MdRefresh size={18} />
            <span>{loading ? "Refreshing..." : "Refresh"}</span>
          </button>
          <Link to="/teacher/complaints/new" className="tc-btn tc-btn--primary">
            <MdAdd size={18} />
            <span>New Complaint</span>
          </Link>
        </div>
      </header>

      {/* Summary cards */}
      <section className="t-complaints__section t-complaints__summary">
        <div className="tc-summary-grid">
          <article className="tc-card tc-card--stat">
            <div className="tc-card__body">
              <p className="tc-card__label">Total</p>
              <p className="tc-card__value">{stats.total}</p>
            </div>
          </article>

          <article className="tc-card tc-card--stat tc-card--pending">
            <div className="tc-card__icon">
              <MdOutlinePendingActions />
            </div>
            <div className="tc-card__body">
              <p className="tc-card__label">Pending</p>
              <p className="tc-card__value">{stats.pending}</p>
            </div>
          </article>

          <article className="tc-card tc-card--stat tc-card--inprogress">
            <div className="tc-card__icon">
              <MdOutlineErrorOutline />
            </div>
            <div className="tc-card__body">
              <p className="tc-card__label">In Progress</p>
              <p className="tc-card__value">{stats.inProgress}</p>
            </div>
          </article>

          <article className="tc-card tc-card--stat tc-card--resolved">
            <div className="tc-card__icon">
              <MdOutlineCheckCircle />
            </div>
            <div className="tc-card__body">
              <p className="tc-card__label">Resolved</p>
              <p className="tc-card__value">{stats.resolved}</p>
            </div>
          </article>
        </div>
      </section>

      {/* Filters + Search */}
      <section className="t-complaints__section tc-filters">
        <div className="tc-filters__group">
          <div className="tc-filters__label">
            <MdFilterList size={18} />
            <span>Filters</span>
          </div>

          <div className="tc-filters__controls">
            <div className="tc-select">
              <label htmlFor="statusFilter">Status</label>
              <select
                id="statusFilter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="ALL">All Statuses</option>
                <option value="PENDING">Pending</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="RESOLVED">Resolved</option>
              </select>
            </div>

            <div className="tc-select">
              <label htmlFor="priorityFilter">Priority</label>
              <select
                id="priorityFilter"
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
              >
                <option value="ALL">All Priorities</option>
                <option value="INTERMEDIATE">Intermediate</option>
                <option value="HIGH">High</option>
                <option value="CRITICAL">Critical</option>
              </select>
            </div>
          </div>
        </div>

        <div className="tc-search">
          <MdSearch size={18} />
          <input
            type="text"
            placeholder="Search by title, category, status..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </section>

      {/* Table / list */}
      <section className="t-complaints__section">
        <div className="tc-table-card">
          <div className="tc-table__wrapper">
            <table className="tc-table">
              <thead>
                <tr>
                  <th >Title</th>
                  <th>Category</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="tc-table__empty">
                      Loading complaints...
                    </td>
                  </tr>
                ) : filteredComplaints.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="tc-table__empty">
                      No complaints found.
                    </td>
                  </tr>
                ) : (
                  filteredComplaints.map((c) => {
                    const isEditable = c.status === "PENDING" && !c.locked;
                    return (
                      <tr key={c._id}>
                        <td>{c.title}</td>
                        <td>{c.category}</td>
                        <td>
                          <span
                            className={`tc-badge tc-badge--priority tc-badge--${(c.priority || "")
                              .toLowerCase()}`}
                          >
                            {c.priority}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`tc-badge tc-badge--status tc-badge--${(c.status || "")
                              .toLowerCase()}`}
                          >
                            {formatStatus(c.status)}
                          </span>
                        </td>
                        <td>{new Date(c.createdAt).toLocaleString()}</td>
                        <td>
                          {isEditable ? (
                            <div className="tc-actions">
                              <Link
                                to={`/teacher/complaints/${c._id}/edit`}
                                className="tc-icon-btn"
                                title="Edit complaint"
                              >
                                <MdEditNote size={18} />
                              </Link>
                              <button
                                type="button"
                                className="tc-icon-btn tc-icon-btn--danger"
                                onClick={() => handleDelete(c._id)}
                                disabled={deletingId === c._id}
                                title="Delete complaint"
                              >
                                <MdDeleteOutline size={18} />
                              </button>
                            </div>
                          ) : (
                            <span className="tc-locked">Locked</span>
                          )}
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
    </div>
  );
};

function formatStatus(status) {
  if (!status) return "";
  return status
    .toLowerCase()
    .split("_")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");
}

export default TeacherComplaintsPage;
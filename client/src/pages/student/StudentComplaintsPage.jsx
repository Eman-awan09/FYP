// // src/pages/student/StudentComplaintsPage.jsx
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   fetchMyComplaintsApi,
//   deleteMyComplaintApi,
// } from "../../api/complaintsApi";

// const StudentComplaintsPage = () => {
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
//       <h2>My Complaints (Student)</h2>

//       <div style={{ marginBottom: "16px" }}>
//         <Link
//           to="/student/complaints/new"
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
//                           to={`/student/complaints/${c._id}/edit`}
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

// export default StudentComplaintsPage;
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  fetchMyComplaintsApi,
  deleteMyComplaintApi,
} from "../../api/complaintsApi";
import {
  MdReportProblem,
  MdRefresh,
  MdAdd,
  MdFilterList,
  MdSearch,
  MdEditNote,
  MdDeleteOutline,
  MdLock,
  MdWarningAmber,
  MdBuild,
  MdCheckCircle,
} from "react-icons/md";
import "./StudentComplaintsPage.css";
import { toast } from 'react-toastify';

const StudentComplaintsPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);

  // UI state (frontend only)
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [priorityFilter, setPriorityFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState(null);

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
      loadComplaints();
    } catch (error) {
      console.error("Error deleting complaint:", error);
      const msg =
        error?.response?.data?.message || "Failed to delete complaint.";
      toast(msg);
    } finally {
      setDeletingId(null);
    }
  };

  // Derived stats for summary cards
  const stats = useMemo(() => {
    const total = complaints.length;
    const pending = complaints.filter((c) => c.status === "PENDING").length;
    const inProgress = complaints.filter(
      (c) => c.status === "IN_PROGRESS"
    ).length;
    const resolved = complaints.filter((c) => c.status === "RESOLVED").length;
    return { total, pending, inProgress, resolved };
  }, [complaints]);

  // Apply filters + search
  const filteredComplaints = useMemo(() => {
    return complaints.filter((c) => {
      if (statusFilter !== "ALL" && c.status !== statusFilter) return false;
      if (priorityFilter !== "ALL" && c.priority !== priorityFilter)
        return false;

      if (searchTerm.trim()) {
        const term = searchTerm.trim().toLowerCase();
        const text = `${c.title} ${c.category} ${c.priority} ${c.status}`.toLowerCase();
        if (!text.includes(term)) return false;
      }

      return true;
    });
  }, [complaints, statusFilter, priorityFilter, searchTerm]);

  return (
    <div className="sc-page">
      {/* Header */}
      <header className="sc-header">
        <div className="sc-header__left">
          <h1 className="sc-title">
            <MdReportProblem className="sc-title__icon" size={22} />
            <span>My Complaints</span>
          </h1>
          <p className="sc-subtitle">
            Submit and keep track of problems you face related to classrooms,
            labs, hostels, IT services, or any campus facilities. You can edit
            and delete complaints while they are still pending.
          </p>
        </div>

        <div className="sc-header__actions">
          <button
            type="button"
            className="sc-btn sc-btn--ghost"
            onClick={loadComplaints}
            disabled={loading}
          >
            <MdRefresh size={18} />
            <span>{loading ? "Refreshing..." : "Refresh"}</span>
          </button>

          <Link
            to="/student/complaints/new"
            className="sc-btn sc-btn--primary"
          >
            <MdAdd size={18} />
            <span>New Complaint</span>
          </Link>
        </div>
      </header>

      {/* Summary cards */}
      <section className="sc-section sc-summary">
        <div className="sc-summary-grid">
          <article className="sc-card sc-card--stat">
            <div className="sc-card__icon sc-card__icon--neutral">
              <MdReportProblem />
            </div>
            <div className="sc-card__body">
              <p className="sc-card__label">Total Complaints</p>
              <p className="sc-card__value">{stats.total}</p>
            </div>
          </article>

          <article className="sc-card sc-card--stat">
            <div className="sc-card__icon sc-card__icon--pending">
              <MdWarningAmber />
            </div>
            <div className="sc-card__body">
              <p className="sc-card__label">Pending</p>
              <p className="sc-card__value">{stats.pending}</p>
            </div>
          </article>

          <article className="sc-card sc-card--stat">
            <div className="sc-card__icon sc-card__icon--progress">
              <MdBuild />
            </div>
            <div className="sc-card__body">
              <p className="sc-card__label">In Progress</p>
              <p className="sc-card__value">{stats.inProgress}</p>
            </div>
          </article>

          <article className="sc-card sc-card--stat">
            <div className="sc-card__icon sc-card__icon--resolved">
              <MdCheckCircle />
            </div>
            <div className="sc-card__body">
              <p className="sc-card__label">Resolved</p>
              <p className="sc-card__value">{stats.resolved}</p>
            </div>
          </article>
        </div>
      </section>

      {/* Filters & search */}
      <section className="sc-section sc-filters">
        <div className="sc-filters__group">
          <div className="sc-filter-label">
            <MdFilterList size={18} />
            <span>Filters</span>
          </div>
          <div className="sc-filter-controls">
            <div className="sc-select">
              <label htmlFor="statusFilter">Status</label>
              <select
                id="statusFilter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="ALL">All</option>
                <option value="PENDING">Pending</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="RESOLVED">Resolved</option>
                <option value="CLOSED">Closed</option>
              </select>
            </div>

            <div className="sc-select">
              <label htmlFor="priorityFilter">Priority</label>
              <select
                id="priorityFilter"
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
              >
                <option value="ALL">All</option>
                <option value="LOW">Low</option>
                <option value="INTERMEDIATE">Intermediate</option>
                <option value="HIGH">High</option>
                <option value="CRITICAL">Critical</option>
              </select>
            </div>
          </div>
        </div>

        <div className="sc-search">
          <MdSearch size={18} />
          <input
            type="text"
            placeholder="Search by title, category, status..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </section>

      {/* Complaints table */}
      <section className="sc-section">
        <div className="sc-table-card">
          <div className="sc-table__wrapper">
            <table className="sc-table">
              <thead>
                <tr>
                  <th>Title</th>
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
                    <td colSpan={6} className="sc-table__empty">
                      Loading...
                    </td>
                  </tr>
                ) : filteredComplaints.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="sc-table__empty">
                      No complaints found.
                    </td>
                  </tr>
                ) : (
                  filteredComplaints.map((c) => {
                    const isLocked = c.status !== "PENDING" || c.locked;

                    return (
                      <tr key={c._id}>
                        <td>{c.title}</td>
                        <td>{c.category}</td>
                        <td>
                          <span
                            className={`sc-badge sc-badge--priority sc-badge--${(c.priority ||
                              "LOW").toLowerCase()}`}
                          >
                            {c.priority}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`sc-badge sc-badge--status sc-badge--${(c.status ||
                              "").toLowerCase()}`}
                          >
                            {c.status}
                          </span>
                        </td>
                        <td>{new Date(c.createdAt).toLocaleString()}</td>
                        <td>
                          {c.status === "PENDING" && !c.locked ? (
                            <div className="sc-actions">
                              <Link
                                to={`/student/complaints/${c._id}/edit`}
                                className="sc-icon-btn"
                                title="Edit complaint"
                              >
                                <MdEditNote size={18} />
                              </Link>
                              <button
                                type="button"
                                className="sc-icon-btn sc-icon-btn--danger"
                                onClick={() => handleDelete(c._id)}
                                disabled={deletingId === c._id}
                                title="Delete complaint"
                              >
                                <MdDeleteOutline size={18} />
                              </button>
                            </div>
                          ) : (
                            <span className="sc-locked">
                              <MdLock size={14} />
                              Locked
                            </span>
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

export default StudentComplaintsPage;
// // src/pages/teacher/TeacherResourceRequestsPage.jsx
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { fetchMyResourceRequestsApi } from "../../api/resourceRequestsApi";

// const TeacherResourceRequestsPage = () => {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const loadRequests = async () => {
//     try {
//       setLoading(true);
//       const data = await fetchMyResourceRequestsApi();
//       setRequests(data.requests || []);
//     } catch (error) {
//       console.error("Error loading resource requests:", error);
//       const msg =
//         error?.response?.data?.message ||
//         "Failed to load resource requests.";
//       alert(msg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadRequests();
//   }, []);

//   return (
//     <div>
//       <h2>My Resource Requests (Teacher)</h2>

//       <div style={{ marginBottom: "16px" }}>
//         <Link
//           to="/teacher/resource-requests/new"
//           style={{
//             padding: "8px 12px",
//             background: "#1976d2",
//             color: "#fff",
//             borderRadius: "4px",
//             textDecoration: "none",
//           }}
//         >
//           + New Resource Request
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
//               <th style={thStyle}>Student Roll</th>
//               <th style={thStyle}>Purpose</th>
//               <th style={thStyle}>Items</th>
//               <th style={thStyle}>Date/Time</th>
//               <th style={thStyle}>Status</th>
//               <th style={thStyle}>Handled By</th>
//               <th style={thStyle}>Created</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loading ? (
//               <tr>
//                 <td colSpan="7" style={{ textAlign: "center", padding: "12px" }}>
//                   Loading...
//                 </td>
//               </tr>
//             ) : requests.length === 0 ? (
//               <tr>
//                 <td colSpan="7" style={{ textAlign: "center", padding: "12px" }}>
//                   No resource requests.
//                 </td>
//               </tr>
//             ) : (
//               requests.map((r) => (
//                 <tr key={r._id}>
//                   <td style={tdStyle}>{r.studentRollNumber}</td>
//                   <td style={tdStyle}>{r.purpose}</td>
//                   <td style={tdStyle}>
//                     {r.resources
//                       ?.map((item) => `${item.name} (x${item.quantity})`)
//                       .join(", ")}
//                   </td>
//                   <td style={tdStyle}>
//                     {new Date(r.dateTime).toLocaleString()}
//                   </td>
//                   <td style={tdStyle}>{r.status}</td>
//                   <td style={tdStyle}>
//                     {r.handledByServerRoomStaff
//                       ? r.handledByServerRoomStaff.name ||
//                         r.handledByServerRoomStaff.email
//                       : "-"}
//                   </td>
//                   <td style={tdStyle}>
//                     {new Date(r.createdAt).toLocaleString()}
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

// export default TeacherResourceRequestsPage;
import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { fetchMyResourceRequestsApi } from "../../api/resourceRequestsApi";
import {
  MdInventory2,
  MdAdd,
  MdRefresh,
  MdSchedule,
  MdCheckCircleOutline,
  MdPending,
  MdSearch,
} from "react-icons/md";
import "./TeacherResourceRequestsPage.css";
import { toast } from 'react-toastify';

const TeacherResourceRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  // UI state
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  const loadRequests = async () => {
    try {
      setLoading(true);
      const data = await fetchMyResourceRequestsApi();
      setRequests(data.requests || []);
    } catch (error) {
      console.error("Error loading resource requests:", error);
      const msg =
        error?.response?.data?.message ||
        "Failed to load resource requests.";
      toast(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const stats = useMemo(() => {
    const total = requests.length;
    const pending = requests.filter((r) => r.status === "PENDING").length;
    const approved = requests.filter((r) => r.status === "APPROVED").length;
    const rejected = requests.filter((r) => r.status === "REJECTED").length;
    return { total, pending, approved, rejected };
  }, [requests]);

  const filteredRequests = useMemo(() => {
    return requests.filter((r) => {
      if (statusFilter !== "ALL" && r.status !== statusFilter) return false;
      if (searchTerm.trim()) {
        const term = searchTerm.trim().toLowerCase();
        const composite = `${r.studentRollNumber || ""} ${r.purpose || ""} ${
          r.status || ""
        } ${r.handledByServerRoomStaff?.name || ""} ${
          r.handledByServerRoomStaff?.email || ""
        }`
          .toLowerCase()
          .trim();
        if (!composite.includes(term)) return false;
      }
      return true;
    });
  }, [requests, statusFilter, searchTerm]);

  return (
    <div className="trr-page">
      {/* Header */}
      <header className="trr-header">
        <div className="trr-header__left">
          <h1 className="trr-title">
            <MdInventory2 className="trr-title__icon" size={22} />
            <span>My Resource Requests</span>
          </h1>
          <p className="trr-subtitle">
            Track and review all resource requests you have made to the server
            room or administration.
          </p>
        </div>

        <div className="trr-header__actions">
          <button
            type="button"
            className="trr-btn trr-btn--ghost"
            onClick={loadRequests}
            disabled={loading}
          >
            <MdRefresh size={18} />
            <span>{loading ? "Refreshing..." : "Refresh"}</span>
          </button>
          <Link
            to="/teacher/resource-requests/new"
            className="trr-btn trr-btn--primary"
          >
            <MdAdd size={18} />
            <span>New Request</span>
          </Link>
        </div>
      </header>

      {/* Summary cards */}
      <section className="trr-section trr-summary">
        <div className="trr-summary-grid">
          <article className="trr-card trr-card--stat">
            <div className="trr-card__icon trr-card__icon--neutral">
              <MdInventory2 />
            </div>
            <div className="trr-card__body">
              <p className="trr-card__label">Total</p>
              <p className="trr-card__value">{stats.total}</p>
            </div>
          </article>

          <article className="trr-card trr-card--stat">
            <div className="trr-card__icon trr-card__icon--pending">
              <MdPending />
            </div>
            <div className="trr-card__body">
              <p className="trr-card__label">Pending</p>
              <p className="trr-card__value">{stats.pending}</p>
            </div>
          </article>

          <article className="trr-card trr-card--stat">
            <div className="trr-card__icon trr-card__icon--approved">
              <MdCheckCircleOutline />
            </div>
            <div className="trr-card__body">
              <p className="trr-card__label">Approved</p>
              <p className="trr-card__value">{stats.approved}</p>
            </div>
          </article>

          <article className="trr-card trr-card--stat">
            <div className="trr-card__icon trr-card__icon--time">
              <MdSchedule />
            </div>
            <div className="trr-card__body">
              <p className="trr-card__label">Rejected</p>
              <p className="trr-card__value">{stats.rejected}</p>
            </div>
          </article>
        </div>
      </section>

      {/* Filters */}
      <section className="trr-section trr-filters">
        <div className="trr-filters__left">
          <div className="trr-filter-group">
            <span className="trr-filter-label">Status</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="trr-select"
            >
              <option value="ALL">All</option>
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
        </div>
        <div className="trr-search">
          <MdSearch size={18} />
          <input
            type="text"
            placeholder="Search by roll, purpose, status, staff..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </section>

      {/* Table */}
      <section className="trr-section">
        <div className="trr-table-card">
          <div className="trr-table__wrapper">
            <table className="trr-table">
              <thead>
                <tr>
                  <th>Student Roll</th>
                  <th>Purpose</th>
                  <th>Items</th>
                  <th>Date/Time</th>
                  <th>Status</th>
                  <th>Handled By</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7} className="trr-table__empty">
                      Loading resource requests...
                    </td>
                  </tr>
                ) : filteredRequests.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="trr-table__empty">
                      No resource requests found.
                    </td>
                  </tr>
                ) : (
                  filteredRequests.map((r) => {
                    const staff =
                      r.handledByServerRoomStaff &&
                      (r.handledByServerRoomStaff.name ||
                        r.handledByServerRoomStaff.email);
                    const items = r.resources
                      ?.map((item) => `${item.name} (x${item.quantity})`)
                      .join(", ");
                    return (
                      <tr key={r._id}>
                        <td>{r.studentRollNumber}</td>
                        <td>{r.purpose}</td>
                        <td>{items || "-"}</td>
                        <td>{new Date(r.dateTime).toLocaleString()}</td>
                        <td>
                          <span
                            className={`trr-badge trr-badge--status trr-badge--${(r.status || "")
                              .toLowerCase()}`}
                          >
                            {r.status}
                          </span>
                        </td>
                        <td>{staff || "-"}</td>
                        <td>{new Date(r.createdAt).toLocaleString()}</td>
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

export default TeacherResourceRequestsPage;
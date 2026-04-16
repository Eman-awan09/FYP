// // src/pages/serverRoom/SrResourceRequestsPage.jsx
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { fetchServerRoomResourceRequestsApi } from "../../api/resourceRequestsApi";

// const SrResourceRequestsPage = () => {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const loadRequests = async () => {
//     try {
//       setLoading(true);
//       const data = await fetchServerRoomResourceRequestsApi();
//       setRequests(data.requests || []);
//     } catch (error) {
//       console.error("Error loading server room requests:", error);
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
//       <h2>Resource Requests (Server Room)</h2>

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
//               <th style={thStyle}>Teacher</th>
//               <th style={thStyle}>Student Roll</th>
//               <th style={thStyle}>Purpose</th>
//               <th style={thStyle}>Items</th>
//               <th style={thStyle}>Date/Time</th>
//               <th style={thStyle}>Status</th>
//               <th style={thStyle}>Handled By</th>
//               <th style={thStyle}>Details</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loading ? (
//               <tr>
//                 <td colSpan="8" style={{ textAlign: "center", padding: "12px" }}>
//                   Loading...
//                 </td>
//               </tr>
//             ) : requests.length === 0 ? (
//               <tr>
//                 <td colSpan="8" style={{ textAlign: "center", padding: "12px" }}>
//                   No resource requests.
//                 </td>
//               </tr>
//             ) : (
//               requests.map((r) => (
//                 <tr key={r._id}>
//                   <td style={tdStyle}>
//                     {r.requestedByTeacher
//                       ? r.requestedByTeacher.name ||
//                         r.requestedByTeacher.email
//                       : "-"}
//                   </td>
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
//                     <Link to={`/server-room/requests/${r._id}`}>View</Link>
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

// export default SrResourceRequestsPage;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchServerRoomResourceRequestsApi } from "../../api/resourceRequestsApi";
import {
  MdStorage,
  MdInventory2,
  MdRefresh,
  MdInfoOutline,
  MdCheckCircle,
  MdPending,
} from "react-icons/md";
import "./SrResourceRequestsPage.css";
import { toast } from 'react-toastify';

const SrResourceRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadRequests = async () => {
    try {
      setLoading(true);
      const data = await fetchServerRoomResourceRequestsApi();
      setRequests(data.requests || []);
    } catch (error) {
      console.error("Error loading server room requests:", error);
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

  const stats = {
    total: requests.length,
    pending: requests.filter((r) => r.status === "PENDING").length,
    approved: requests.filter((r) => r.status === "APPROVED").length,
    rejected: requests.filter((r) => r.status === "REJECTED").length,
  };

  return (
    <div className="sr-rr-page">
      {/* Header */}
      <header className="sr-rr-header">
        <div className="sr-rr-header__left">
          <h1 className="sr-rr-title">
            <MdStorage className="sr-rr-title__icon" size={22} />
            <span>Server Room – Resource Requests</span>
          </h1>
          <p className="sr-rr-subtitle">
            Monitor and process resource requests from teachers. Approve,
            reject, or follow up to ensure labs, exams and seminars run
            smoothly.
          </p>
        </div>

        <div className="sr-rr-header__actions">
          <button
            type="button"
            className="sr-rr-btn sr-rr-btn--ghost"
            onClick={loadRequests}
            disabled={loading}
          >
            <MdRefresh size={18} />
            <span>{loading ? "Refreshing..." : "Refresh"}</span>
          </button>
        </div>
      </header>

      {/* Info banner */}
      <div className="sr-rr-info">
        <MdInfoOutline size={18} />
        <span>
          Each request contains the purpose, date/time and list of items. Use
          the details page to update status and add handling information.
        </span>
      </div>

      {/* Summary cards */}
      <section className="sr-rr-section sr-rr-summary">
        <div className="sr-rr-summary-grid">
          <article className="sr-rr-card sr-rr-card--stat">
            <div className="sr-rr-card__icon sr-rr-card__icon--neutral">
              <MdInventory2 />
            </div>
            <div className="sr-rr-card__body">
              <p className="sr-rr-card__label">Total Requests</p>
              <p className="sr-rr-card__value">{stats.total}</p>
            </div>
          </article>

          <article className="sr-rr-card sr-rr-card--stat">
            <div className="sr-rr-card__icon sr-rr-card__icon--pending">
              <MdPending />
            </div>
            <div className="sr-rr-card__body">
              <p className="sr-rr-card__label">Pending</p>
              <p className="sr-rr-card__value">{stats.pending}</p>
            </div>
          </article>

          <article className="sr-rr-card sr-rr-card--stat">
            <div className="sr-rr-card__icon sr-rr-card__icon--approved">
              <MdCheckCircle />
            </div>
            <div className="sr-rr-card__body">
              <p className="sr-rr-card__label">Approved</p>
              <p className="sr-rr-card__value">{stats.approved}</p>
            </div>
          </article>

          <article className="sr-rr-card sr-rr-card--stat">
            <div className="sr-rr-card__icon sr-rr-card__icon--rejected">
              <MdInventory2 />
            </div>
            <div className="sr-rr-card__body">
              <p className="sr-rr-card__label">Rejected</p>
              <p className="sr-rr-card__value">{stats.rejected}</p>
            </div>
          </article>
        </div>
      </section>

      {/* Table */}
      <section className="sr-rr-section">
        <div className="sr-rr-table-card">
          <div className="sr-rr-table__wrapper">
            <table className="sr-rr-table">
              <thead>
                <tr>
                  <th>Teacher</th>
                  <th>Student Roll</th>
                  <th>Purpose</th>
                  <th>Items</th>
                  <th>Date/Time</th>
                  <th>Status</th>
                  <th>Handled By</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={8} className="sr-rr-table__empty">
                      Loading...
                    </td>
                  </tr>
                ) : requests.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="sr-rr-table__empty">
                      No resource requests.
                    </td>
                  </tr>
                ) : (
                  requests.map((r) => (
                    <tr key={r._id}>
                      <td>
                        {r.requestedByTeacher
                          ? r.requestedByTeacher.name ||
                            r.requestedByTeacher.email
                          : "-"}
                      </td>
                      <td>{r.studentRollNumber}</td>
                      <td>{r.purpose}</td>
                      <td>
                        {r.resources
                          ?.map(
                            (item) => `${item.name} (x${item.quantity})`
                          )
                          .join(", ")}
                      </td>
                      <td>{new Date(r.dateTime).toLocaleString()}</td>
                      <td>
                        <span
                          className={`sr-rr-badge sr-rr-badge--status sr-rr-badge--${(r.status ||
                            "").toLowerCase()}`}
                        >
                          {r.status}
                        </span>
                      </td>
                      <td>
                        {r.handledByServerRoomStaff
                          ? r.handledByServerRoomStaff.name ||
                            r.handledByServerRoomStaff.email
                          : "-"}
                      </td>
                      <td>
                        <Link
                          to={`/server-room/requests/${r._id}`}
                          className="sr-rr-link"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SrResourceRequestsPage;
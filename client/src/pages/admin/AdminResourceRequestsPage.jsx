// // src/pages/admin/AdminResourceRequestsPage.jsx
// import React, { useEffect, useState } from "react";
// import { fetchAllResourceRequestsForAdminApi } from "../../api/resourceRequestsApi";

// const AdminResourceRequestsPage = () => {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const loadRequests = async () => {
//     try {
//       setLoading(true);
//       const data = await fetchAllResourceRequestsForAdminApi();
//       setRequests(data.requests || []);
//     } catch (error) {
//       console.error("Error loading resource requests (admin):", error);
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
//       <h2>Resource Requests (Admin Monitoring)</h2>

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
//               <th style={thStyle}>Created</th>
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

// export default AdminResourceRequestsPage;

import React, { useEffect, useState } from "react";
import { fetchAllResourceRequestsForAdminApi } from "../../api/resourceRequestsApi";
import {
  MdReceiptLong,
  MdRefresh,
  MdInfoOutline,
  MdInventory2,
  MdCheckCircle,
  MdPending,
} from "react-icons/md";
import "./AdminResourceRequestsPage.css";
import { toast } from 'react-toastify';

const AdminResourceRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadRequests = async () => {
    try {
      setLoading(true);
      const data = await fetchAllResourceRequestsForAdminApi();
      setRequests(data.requests || []);
    } catch (error) {
      console.error("Error loading resource requests (admin):", error);
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
    <div className="arr-page">
      {/* Header */}
      <header className="arr-header">
        <div className="arr-header__left">
          <h1 className="arr-title">
            <MdReceiptLong className="arr-title__icon" size={22} />
            <span>Resource Requests Monitoring</span>
          </h1>
          <p className="arr-subtitle">
            Monitor all resource requests submitted by teachers, including lab
            equipment, IT resources and special access, and track how they are
            handled by server room staff.
          </p>
        </div>

        <div className="arr-header__actions">
          <button
            type="button"
            className="arr-btn arr-btn--ghost"
            onClick={loadRequests}
            disabled={loading}
          >
            <MdRefresh size={18} />
            <span>{loading ? "Refreshing..." : "Refresh"}</span>
          </button>
        </div>
      </header>

      {/* Info */}
      <div className="arr-info">
        <MdInfoOutline size={18} />
        <span>
          These resource requests are created by teachers. Server room staff
          update the status as they process each request.
        </span>
      </div>

      {/* Summary cards */}
      <section className="arr-section arr-summary">
        <div className="arr-summary-grid">
          <article className="arr-card arr-card--stat">
            <div className="arr-card__icon arr-card__icon--neutral">
              <MdInventory2 />
            </div>
            <div className="arr-card__body">
              <p className="arr-card__label">Total Requests</p>
              <p className="arr-card__value">{stats.total}</p>
            </div>
          </article>

          <article className="arr-card arr-card--stat">
            <div className="arr-card__icon arr-card__icon--pending">
              <MdPending />
            </div>
            <div className="arr-card__body">
              <p className="arr-card__label">Pending</p>
              <p className="arr-card__value">{stats.pending}</p>
            </div>
          </article>

          <article className="arr-card arr-card--stat">
            <div className="arr-card__icon arr-card__icon--approved">
              <MdCheckCircle />
            </div>
            <div className="arr-card__body">
              <p className="arr-card__label">Approved</p>
              <p className="arr-card__value">{stats.approved}</p>
            </div>
          </article>

          <article className="arr-card arr-card--stat">
            <div className="arr-card__icon arr-card__icon--rejected">
              <MdReceiptLong />
            </div>
            <div className="arr-card__body">
              <p className="arr-card__label">Rejected</p>
              <p className="arr-card__value">{stats.rejected}</p>
            </div>
          </article>
        </div>
      </section>

      {/* Table */}
      <section className="arr-section">
        <div className="arr-table-card">
          <div className="arr-table__wrapper">
            <table className="arr-table">
              <thead>
                <tr>
                  <th>Teacher</th>
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
                    <td colSpan={8} className="arr-table__empty">
                      Loading...
                    </td>
                  </tr>
                ) : requests.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="arr-table__empty">
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
                          className={`arr-badge arr-badge--status arr-badge--${(r.status ||
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
                      <td>{new Date(r.createdAt).toLocaleString()}</td>
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

export default AdminResourceRequestsPage;
// // src/pages/dashboardPlaceholder/SpDashboard.jsx
// import React from "react";

// const SpDashboard = () => {
//   return (
//     <div>
//       <h2>Service Provider Dashboard</h2>
//       <p>
//         Welcome Service Provider! Assigned complaints will be managed from
//         this panel.
//       </p>
//     </div>
//   );
// };

// export default SpDashboard;
// import React from "react";
// import { Link } from "react-router-dom";
// import {
//   MdBuild,
//   MdReportProblem,
//   MdCheckCircle,
//   MdWarningAmber,
//   MdChat,
//   MdChevronRight,
//   MdInfoOutline,
// } from "react-icons/md";
// import "./SpDashboard.css";

// const SpDashboard = () => {
//   // Placeholder stats for now – replace with API data later
//   const complaintStats = {
//     total: 32,
//     assigned: 10,
//     inProgress: 12,
//     resolved: 9,
//     closed: 1,
//   };

//   const recentAssigned = [
//     {
//       id: "C-2201",
//       title: "Wi-Fi not working in Lab-5",
//       category: "Network / IT",
//       priority: "CRITICAL",
//       status: "IN_PROGRESS",
//       createdAt: "2026-02-05T09:30:00Z",
//     },
//     {
//       id: "C-2198",
//       title: "Projector bulb fused in CS-204",
//       category: "Lab Equipment",
//       priority: "HIGH",
//       status: "ASSIGNED",
//       createdAt: "2026-02-04T12:10:00Z",
//     },
//     {
//       id: "C-2192",
//       title: "AC not cooling in CS-101",
//       category: "Maintenance",
//       priority: "INTERMEDIATE",
//       status: "ASSIGNED",
//       createdAt: "2026-02-03T08:45:00Z",
//     },
//   ];

//   const recentResolved = [
//     {
//       id: "C-2186",
//       title: "No power in Lab-2",
//       category: "Electrical",
//       resolvedAt: "2026-02-02T16:20:00Z",
//     },
//     {
//       id: "C-2181",
//       title: "Printer jam in admin office",
//       category: "IT Support",
//       resolvedAt: "2026-02-01T11:05:00Z",
//     },
//   ];

//   return (
//     <div className="spd-dashboard">
//       {/* Header */}
//       <header className="spd-header">
//         <div className="spd-header__left">
//           <h1 className="spd-title">
//             <MdBuild className="spd-title__icon" size={22} />
//             <span>Service Provider Overview</span>
//           </h1>
//           <p className="spd-subtitle">
//             View assigned complaints, track your progress and quickly access
//             your profile. Keep the campus services running smoothly.
//           </p>
//         </div>

//         <div className="spd-header__actions">
//           <Link
//             to="/service-provider/complaints"
//             className="spd-btn spd-btn--primary"
//           >
//             <MdReportProblem size={18} />
//             <span>Assigned Complaints</span>
//           </Link>
//           <Link
//             to="/service-provider/profile"
//             className="spd-btn spd-btn--ghost"
//           >
//             <MdBuild size={18} />
//             <span>My Profile</span>
//           </Link>
//         </div>
//       </header>

//       {/* Info banner */}
//       <div className="spd-info">
//         <MdInfoOutline size={18} />
//         <span>
//           When you mark a complaint as <strong>RESOLVED</strong>, its status is
//           locked. Make sure the issue is fixed and leave a short note on what
//           was done.
//         </span>
//       </div>

//       {/* Top stat row */}
//       <section className="spd-section">
//         <div className="spd-grid spd-grid--top">
//           {/* Total */}
//           <article className="spd-card spd-card--stat spd-card--total">
//             <div className="spd-card__header-inline">
//               <div className="spd-card__title-with-icon">
//                 <span className="spd-card__circle-icon">
//                   <MdReportProblem size={18} />
//                 </span>
//                 <h2 className="spd-card__title">All Assigned Complaints</h2>
//               </div>
//               <Link
//                 to="/service-provider/complaints"
//                 className="spd-link-inline"
//               >
//                 View All <MdChevronRight size={14} />
//               </Link>
//             </div>
//             <p className="spd-card__label">
//               Complaints assigned to you from students and teachers.
//             </p>
//             <div className="spd-card__stat-main">
//               <span className="spd-card__stat-number">
//                 {complaintStats.total}
//               </span>
//               <span className="spd-card__stat-caption">total assigned</span>
//             </div>
//             <div className="spd-card__stat-row">
//               <span>Assigned: {complaintStats.assigned}</span>
//               <span>In Progress: {complaintStats.inProgress}</span>
//               <span>Resolved: {complaintStats.resolved}</span>
//             </div>
//           </article>

//           {/* Assigned */}
//           <article className="spd-card spd-card--stat spd-card--assigned">
//             <div className="spd-card__header-inline">
//               <div className="spd-card__title-with-icon">
//                 <span className="spd-card__circle-icon">
//                   <MdWarningAmber size={18} />
//                 </span>
//                 <h2 className="spd-card__title">Newly Assigned</h2>
//               </div>
//             </div>
//             <p className="spd-card__label">
//               Check new complaints that have not yet been started.
//             </p>
//             <div className="spd-card__stat-main">
//               <span className="spd-card__stat-number">
//                 {complaintStats.assigned}
//               </span>
//               <span className="spd-card__stat-caption">awaiting action</span>
//             </div>
//           </article>

//           {/* In Progress */}
//           <article className="spd-card spd-card--stat spd-card--inprogress">
//             <div className="spd-card__header-inline">
//               <div className="spd-card__title-with-icon">
//                 <span className="spd-card__circle-icon">
//                   <MdBuild size={18} />
//                 </span>
//                 <h2 className="spd-card__title">In Progress</h2>
//               </div>
//             </div>
//             <p className="spd-card__label">
//               Complaints currently being worked on by you or your team.
//             </p>
//             <div className="spd-card__stat-main">
//               <span className="spd-card__stat-number">
//                 {complaintStats.inProgress}
//               </span>
//               <span className="spd-card__stat-caption">
//                 currently active
//               </span>
//             </div>
//           </article>

//           {/* Resolved */}
//           <article className="spd-card spd-card--stat spd-card--resolved">
//             <div className="spd-card__header-inline">
//               <div className="spd-card__title-with-icon">
//                 <span className="spd-card__circle-icon">
//                   <MdCheckCircle size={18} />
//                 </span>
//                 <h2 className="spd-card__title">Resolved</h2>
//               </div>
//             </div>
//             <p className="spd-card__label">
//               Complaints you have successfully resolved and closed.
//             </p>
//             <div className="spd-card__stat-main">
//               <span className="spd-card__stat-number">
//                 {complaintStats.resolved}
//               </span>
//               <span className="spd-card__stat-caption">
//                 recently resolved
//               </span>
//             </div>
//           </article>
//         </div>
//       </section>

//       {/* Middle row: Assigned list + Resolved snapshot */}
//       <section className="spd-section spd-grid spd-grid--main">
//         {/* Recent assigned */}
//         <article className="spd-card spd-card--panel">
//           <div className="spd-card__header">
//             <div className="spd-card__title-with-icon">
//               <span className="spd-card__circle-icon spd-card__circle-icon--soft">
//                 <MdReportProblem size={18} />
//               </span>
//               <div>
//                 <h2 className="spd-card__title">Recently Assigned</h2>
//                 <p className="spd-card__subtitle">
//                   A few of the most recent complaints assigned to you. Use the
//                   Assigned Complaints page to see full details and update
//                   status.
//                 </p>
//               </div>
//             </div>
//             <Link
//               to="/service-provider/complaints"
//               className="spd-link-btn"
//             >
//               Go to List
//             </Link>
//           </div>

//           <div className="spd-table__wrapper">
//             <table className="spd-table">
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Title</th>
//                   <th>Category</th>
//                   <th>Priority</th>
//                   <th>Status</th>
//                   <th>Created</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {recentAssigned.map((c) => (
//                   <tr key={c.id}>
//                     <td>{c.id}</td>
//                     <td>{c.title}</td>
//                     <td>{c.category}</td>
//                     <td>
//                       <span
//                         className={`spd-badge spd-badge--priority spd-badge--${c.priority.toLowerCase()}`}
//                       >
//                         {c.priority}
//                       </span>
//                     </td>
//                     <td>
//                       <span
//                         className={`spd-badge spd-badge--status spd-badge--${c.status.toLowerCase()}`}
//                       >
//                         {formatStatus(c.status)}
//                       </span>
//                     </td>
//                     <td>{new Date(c.createdAt).toLocaleString()}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </article>

//         {/* Right column: Resolved + tips */}
//         <div className="spd-grid spd-grid--side">
//           {/* Recently resolved */}
//           <article className="spd-card spd-card--panel">
//             <div className="spd-card__header">
//               <div className="spd-card__title-with-icon">
//                 <span className="spd-card__circle-icon spd-card__circle-icon--soft">
//                   <MdCheckCircle size={18} />
//                 </span>
//                 <div>
//                   <h2 className="spd-card__title">Recently Resolved</h2>
//                   <p className="spd-card__subtitle">
//                     A brief glimpse of your recent work for reference.
//                   </p>
//                 </div>
//               </div>
//             </div>
//             <ul className="spd-list">
//               {recentResolved.map((r) => (
//                 <li key={r.id} className="spd-list__item">
//                   <div className="spd-list__dot" />
//                   <div className="spd-list__content">
//                     <p className="spd-list__title">{r.title}</p>
//                     <p className="spd-list__meta">
//                       {r.category} ·{" "}
//                       {new Date(r.resolvedAt).toLocaleString()}
//                     </p>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </article>

//           {/* Chatbot hint / notes */}
//           <article className="spd-card spd-card--panel">
//             <div className="spd-card__title-with-icon">
//               <span className="spd-card__circle-icon spd-card__circle-icon--soft">
//                 <MdChat size={18} />
//               </span>
//               <h2 className="spd-card__title">Communication & Notes</h2>
//             </div>
//             <p className="spd-card__subtitle">
//               When you change the complaint status, use notes to briefly explain
//               what was done (e.g., “Replaced projector bulb”, “Restarted
//               router, network stable”).
//             </p>

//             <ul className="spd-tips">
//               <li>
//                 Short, clear notes help <strong>admins and teachers</strong>{" "}
//                 understand your work without needing a separate call.
//               </li>
//               <li>
//                 For complex issues, mention if{" "}
//                 <strong>follow-up work</strong> is required or if hardware was
//                 replaced.
//               </li>
//               <li>
//                 If the issue cannot be resolved, mark the status appropriately
//                 and describe the blocker.
//               </li>
//             </ul>
//           </article>
//         </div>
//       </section>
//     </div>
//   );
// };

// function formatStatus(status) {
//   if (!status) return "";
//   return status
//     .toLowerCase()
//     .split("_")
//     .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
//     .join(" ");
// }

// export default SpDashboard;
// src/pages/serviceProvider/SpDashboard.jsx
// import React, { useEffect, useMemo, useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   MdBuild,
//   MdReportProblem,
//   MdCheckCircle,
//   MdWarningAmber,
//   MdChat,
//   MdChevronRight,
//   MdInfoOutline,
//   MdPerson,
// } from "react-icons/md";
// import "./SpDashboard.css";

// import {
//   fetchAssignedComplaintsApi,
// } from "../../api/complaintsApi";
// import { useMyProfile } from "../../hooks/useMyProfile";

// /**
//  * Convert status like "IN_PROGRESS" into "In Progress"
//  */
// function formatStatus(status) {
//   if (!status) return "";
//   return status
//     .toLowerCase()
//     .split("_")
//     .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
//     .join(" ");
// }

// const SpDashboard = () => {
//   const { profile } = useMyProfile();

//   const [complaints, setComplaints] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Load complaints assigned to this service provider
//   useEffect(() => {
//     const loadAssignedComplaints = async () => {
//       try {
//         setError("");
//         setLoading(true);
//         const data = await fetchAssignedComplaintsApi();
//         // assuming API returns { complaints: [...] } or plain array
//         setComplaints(data.complaints || data || []);
//       } catch (err) {
//         console.error("Error loading assigned complaints (SP dashboard):", err);
//         setError(
//           err?.response?.data?.message ||
//             "Failed to load assigned complaints for dashboard."
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadAssignedComplaints();
//   }, []);

//   // Stats derived from real complaints
//   const complaintStats = useMemo(() => {
//     const total = complaints.length;
//     const assigned = complaints.filter((c) => c.status === "ASSIGNED").length;
//     const inProgress = complaints.filter(
//       (c) => c.status === "IN_PROGRESS"
//     ).length;
//     const resolved = complaints.filter(
//       (c) => c.status === "RESOLVED"
//     ).length;
//     const closed = complaints.filter((c) => c.status === "CLOSED").length;

//     return { total, assigned, inProgress, resolved, closed };
//   }, [complaints]);

//   // Recently assigned (ASSIGNED or IN_PROGRESS, latest 3)
//   const recentAssigned = useMemo(() => {
//     const list = complaints.filter(
//       (c) => c.status === "ASSIGNED" || c.status === "IN_PROGRESS"
//     );
//     const sorted = list.sort(
//       (a, b) =>
//         new Date(b.createdAt || b.updatedAt) -
//         new Date(a.createdAt || a.updatedAt)
//     );

//     return sorted.slice(0, 3).map((c) => ({
//       id: c._id,
//       title: c.title,
//       category: c.category,
//       priority: c.priority,
//       status: c.status,
//       createdAt: c.createdAt,
//     }));
//   }, [complaints]);

//   // Recently resolved (RESOLVED or CLOSED, latest 2)
//   const recentResolved = useMemo(() => {
//     const list = complaints.filter(
//       (c) => c.status === "RESOLVED" || c.status === "CLOSED"
//     );
//     const sorted = list.sort(
//       (a, b) =>
//         new Date(b.updatedAt || b.createdAt) -
//         new Date(a.updatedAt || a.createdAt)
//     );

//     return sorted.slice(0, 2).map((c) => ({
//       id: c._id,
//       title: c.title,
//       category: c.category,
//       resolvedAt: c.updatedAt || c.createdAt,
//     }));
//   }, [complaints]);

//   // Profile snapshot like other dashboards
//   const profileSnapshot = useMemo(() => {
//     const name = profile?.name || "Service Provider";
//     const email = profile?.email || "";
//     const department = profile?.department || profile?.specialization || "Not set";
//     const phone = profile?.phone || "Not set";
//     const campus = profile?.campusOrBuilding || "Not set";

//     return { name, email, department, phone, campus };
//   }, [profile]);

//   return (
//     <div className="spd-dashboard">
//       {/* Error banner */}
//       {error && (
//         <div className="spd-error-banner">
//           <span>{error}</span>
//         </div>
//       )}

//       {/* Header */}
//       <header className="spd-header">
//         <div className="spd-header__left">
//           <h1 className="spd-title">
//             <MdBuild className="spd-title__icon" size={22} />
//             <span>Service Provider Overview</span>
//           </h1>
//           <p className="spd-subtitle">
//             View assigned complaints, track your progress and quickly access
//             your profile. Keep the campus services running smoothly.
//           </p>
//         </div>

//         <div className="spd-header__actions">
//           <Link
//             to="/service-provider/complaints"
//             className="spd-btn spd-btn--primary"
//           >
//             <MdReportProblem size={18} />
//             <span>Assigned Complaints</span>
//           </Link>
//           <Link
//             to="/service-provider/profile"
//             className="spd-btn spd-btn--ghost"
//           >
//             <MdBuild size={18} />
//             <span>My Profile</span>
//           </Link>
//         </div>
//       </header>

//       {/* Info banner */}
//       <div className="spd-info">
//         <MdInfoOutline size={18} />
//         <span>
//           When you mark a complaint as <strong>RESOLVED</strong>, its status is
//           locked. Make sure the issue is fixed and leave a short note on what
//           was done.
//         </span>
//       </div>

//       {/* Top stat row */}
//       <section className="spd-section">
//         <div className="spd-grid spd-grid--top">
//           {/* Total */}
//           <article className="spd-card spd-card--stat spd-card--total">
//             <div className="spd-card__header-inline">
//               <div className="spd-card__title-with-icon">
//                 <span className="spd-card__circle-icon">
//                   <MdReportProblem size={18} />
//                 </span>
//                 <h2 className="spd-card__title">All Assigned Complaints</h2>
//               </div>
//               <Link
//                 to="/service-provider/complaints"
//                 className="spd-link-inline"
//               >
//                 View All <MdChevronRight size={14} />
//               </Link>
//             </div>
//             <p className="spd-card__label">
//               Complaints assigned to you from students and teachers.
//             </p>
//             <div className="spd-card__stat-main">
//               <span className="spd-card__stat-number">
//                 {loading ? "…" : complaintStats.total}
//               </span>
//               <span className="spd-card__stat-caption">total assigned</span>
//             </div>
//             <div className="spd-card__stat-row">
//               <span>Assigned: {complaintStats.assigned}</span>
//               <span>In Progress: {complaintStats.inProgress}</span>
//               <span>Resolved: {complaintStats.resolved}</span>
//             </div>
//           </article>

//           {/* Assigned */}
//           <article className="spd-card spd-card--stat spd-card--assigned">
//             <div className="spd-card__header-inline">
//               <div className="spd-card__title-with-icon">
//                 <span className="spd-card__circle-icon">
//                   <MdWarningAmber size={18} />
//                 </span>
//                 <h2 className="spd-card__title">Newly Assigned</h2>
//               </div>
//             </div>
//             <p className="spd-card__label">
//               Check new complaints that have not yet been started.
//             </p>
//             <div className="spd-card__stat-main">
//               <span className="spd-card__stat-number">
//                 {complaintStats.assigned}
//               </span>
//               <span className="spd-card__stat-caption">awaiting action</span>
//             </div>
//           </article>

//           {/* In Progress */}
//           <article className="spd-card spd-card--stat spd-card--inprogress">
//             <div className="spd-card__header-inline">
//               <div className="spd-card__title-with-icon">
//                 <span className="spd-card__circle-icon">
//                   <MdBuild size={18} />
//                 </span>
//                 <h2 className="spd-card__title">In Progress</h2>
//               </div>
//             </div>
//             <p className="spd-card__label">
//               Complaints currently being worked on by you or your team.
//             </p>
//             <div className="spd-card__stat-main">
//               <span className="spd-card__stat-number">
//                 {complaintStats.inProgress}
//               </span>
//               <span className="spd-card__stat-caption">
//                 currently active
//               </span>
//             </div>
//           </article>

//           {/* Resolved */}
//           <article className="spd-card spd-card--stat spd-card--resolved">
//             <div className="spd-card__header-inline">
//               <div className="spd-card__title-with-icon">
//                 <span className="spd-card__circle-icon">
//                   <MdCheckCircle size={18} />
//                 </span>
//                 <h2 className="spd-card__title">Resolved</h2>
//               </div>
//             </div>
//             <p className="spd-card__label">
//               Complaints you have successfully resolved and closed.
//             </p>
//             <div className="spd-card__stat-main">
//               <span className="spd-card__stat-number">
//                 {complaintStats.resolved}
//               </span>
//               <span className="spd-card__stat-caption">
//                 recently resolved
//               </span>
//             </div>
//           </article>
//         </div>
//       </section>

//       {/* Middle row: Assigned list + Resolved snapshot */}
//       <section className="spd-section spd-grid spd-grid--main">
//         {/* Recent assigned */}
//         <article className="spd-card spd-card--panel">
//           <div className="spd-card__header">
//             <div className="spd-card__title-with-icon">
//               <span className="spd-card__circle-icon spd-card__circle-icon--soft">
//                 <MdReportProblem size={18} />
//               </span>
//               <div>
//                 <h2 className="spd-card__title">Recently Assigned</h2>
//                 <p className="spd-card__subtitle">
//                   A few of the most recent complaints assigned to you. Use the
//                   Assigned Complaints page to see full details and update
//                   status.
//                 </p>
//               </div>
//             </div>
//             <Link
//               to="/service-provider/complaints"
//               className="spd-link-btn"
//             >
//               Go to List
//             </Link>
//           </div>

//           <div className="spd-table__wrapper">
//             <table className="spd-table">
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Title</th>
//                   <th>Category</th>
//                   <th>Priority</th>
//                   <th>Status</th>
//                   <th>Created</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {loading ? (
//                   <tr>
//                     <td colSpan={6} className="spd-table__empty">
//                       Loading assigned complaints...
//                     </td>
//                   </tr>
//                 ) : recentAssigned.length === 0 ? (
//                   <tr>
//                     <td colSpan={6} className="spd-table__empty">
//                       No complaints assigned yet.
//                     </td>
//                   </tr>
//                 ) : (
//                   recentAssigned.map((c) => (
//                     <tr key={c.id}>
//                       <td>{c.id}</td>
//                       <td>{c.title}</td>
//                       <td>{c.category}</td>
//                       <td>
//                         <span
//                           className={`spd-badge spd-badge--priority spd-badge--${c.priority.toLowerCase()}`}
//                         >
//                           {c.priority}
//                         </span>
//                       </td>
//                       <td>
//                         <span
//                           className={`spd-badge spd-badge--status spd-badge--${c.status.toLowerCase()}`}
//                         >
//                           {formatStatus(c.status)}
//                         </span>
//                       </td>
//                       <td>
//                         {c.createdAt
//                           ? new Date(c.createdAt).toLocaleString()
//                           : "-"}
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </article>

//         {/* Right column: Resolved + tips */}
//         <div className="spd-grid spd-grid--side">
//           {/* Recently resolved */}
//           <article className="spd-card spd-card--panel">
//             <div className="spd-card__header">
//               <div className="spd-card__title-with-icon">
//                 <span className="spd-card__circle-icon spd-card__circle-icon--soft">
//                   <MdCheckCircle size={18} />
//                 </span>
//                 <div>
//                   <h2 className="spd-card__title">Recently Resolved</h2>
//                   <p className="spd-card__subtitle">
//                     A brief glimpse of your recent work for reference.
//                   </p>
//                 </div>
//               </div>
//             </div>
//             <ul className="spd-list">
//               {loading ? (
//                 <li className="spd-list__item">
//                   <div className="spd-list__content">
//                     <p className="spd-list__title">Loading resolved complaints...</p>
//                   </div>
//                 </li>
//               ) : recentResolved.length === 0 ? (
//                 <li className="spd-list__item">
//                   <div className="spd-list__content">
//                     <p className="spd-list__title">No resolved complaints yet.</p>
//                   </div>
//                 </li>
//               ) : (
//                 recentResolved.map((r) => (
//                   <li key={r.id} className="spd-list__item">
//                     <div className="spd-list__dot" />
//                     <div className="spd-list__content">
//                       <p className="spd-list__title">{r.title}</p>
//                       <p className="spd-list__meta">
//                         {r.category} ·{" "}
//                         {r.resolvedAt
//                           ? new Date(r.resolvedAt).toLocaleString()
//                           : "-"}
//                       </p>
//                     </div>
//                   </li>
//                 ))
//               )}
//             </ul>
//           </article>

//           {/* Chatbot hint / notes */}
//           <article className="spd-card spd-card--panel">
//             <div className="spd-card__title-with-icon">
//               <span className="spd-card__circle-icon spd-card__circle-icon--soft">
//                 <MdChat size={18} />
//               </span>
//               <h2 className="spd-card__title">Communication & Notes</h2>
//             </div>
//             <p className="spd-card__subtitle">
//               When you change the complaint status, use notes to briefly explain
//               what was done (e.g., “Replaced projector bulb”, “Restarted
//               router, network stable”).
//             </p>

//             <ul className="spd-tips">
//               <li>
//                 Short, clear notes help <strong>admins and teachers</strong>{" "}
//                 understand your work without needing a separate call.
//               </li>
//               <li>
//                 For complex issues, mention if{" "}
//                 <strong>follow-up work</strong> is required or if hardware was
//                 replaced.
//               </li>
//               <li>
//                 If the issue cannot be resolved, mark the status appropriately
//                 and describe the blocker.
//               </li>
//             </ul>
//           </article>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default SpDashboard;

// src/pages/serviceProvider/SpDashboard.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  MdBuild,
  MdReportProblem,
  MdCheckCircle,
  MdWarningAmber,
  MdChat,
  MdChevronRight,
  MdInfoOutline,
  MdPerson,
} from "react-icons/md";
import "./SpDashboard.css";

import { fetchAssignedComplaintsApi } from "../../api/complaintsApi";
import { useMyProfile } from "../../hooks/useMyProfile";

/**
 * Convert status like "IN_PROGRESS" into "In Progress"
 */
function formatStatus(status) {
  if (!status) return "";
  return status
    .toLowerCase()
    .split("_")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");
}

const SpDashboard = () => {
  const { profile } = useMyProfile();

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load complaints assigned to this service provider
  useEffect(() => {
    const loadAssignedComplaints = async () => {
      try {
        setError("");
        setLoading(true);
        const data = await fetchAssignedComplaintsApi();
        // Adjust this if your API returns a different key
        setComplaints(data.complaints || data || []);
      } catch (err) {
        console.error("Error loading assigned complaints (SP dashboard):", err);
        setError(
          err?.response?.data?.message ||
            "Failed to load assigned complaints for dashboard."
        );
      } finally {
        setLoading(false);
      }
    };

    loadAssignedComplaints();
  }, []);

  // Stats derived from real complaints
  const complaintStats = useMemo(() => {
    const total = complaints.length;
    const assigned = complaints.filter((c) => c.status === "ASSIGNED").length;
    const inProgress = complaints.filter(
      (c) => c.status === "IN_PROGRESS"
    ).length;
    const resolved = complaints.filter(
      (c) => c.status === "RESOLVED"
    ).length;
    const closed = complaints.filter((c) => c.status === "CLOSED").length;

    return { total, assigned, inProgress, resolved, closed };
  }, [complaints]);

  // Recently assigned (ASSIGNED or IN_PROGRESS, latest 3)
  const recentAssigned = useMemo(() => {
    const list = complaints.filter(
      (c) => c.status === "ASSIGNED" || c.status === "IN_PROGRESS"
    );
    const sorted = list.sort(
      (a, b) =>
        new Date(b.createdAt || b.updatedAt) -
        new Date(a.createdAt || a.updatedAt)
    );

    return sorted.slice(0, 3).map((c) => ({
      id: c._id,
      title: c.title,
      category: c.category,
      priority: c.priority,
      status: c.status,
      createdAt: c.createdAt,
    }));
  }, [complaints]);

  // Recently resolved (RESOLVED or CLOSED, latest 2)
  const recentResolved = useMemo(() => {
    const list = complaints.filter(
      (c) => c.status === "RESOLVED" || c.status === "CLOSED"
    );
    const sorted = list.sort(
      (a, b) =>
        new Date(b.updatedAt || b.createdAt) -
        new Date(a.updatedAt || a.createdAt)
    );

    return sorted.slice(0, 2).map((c) => ({
      id: c._id,
      title: c.title,
      category: c.category,
      resolvedAt: c.updatedAt || c.createdAt,
    }));
  }, [complaints]);

  // Profile snapshot (similar to other dashboards)
  const profileSnapshot = useMemo(() => {
    const name = profile?.name || "Service Provider";
    const email = profile?.email || "";
    const department = profile?.department || profile?.specialization || "Not set";
    const phone = profile?.phone || "Not set";
    const campus = profile?.campusOrBuilding || "Not set";

    return { name, email, department, phone, campus };
  }, [profile]);

  return (
    <div className="spd-dashboard">
      {/* Error banner */}
      {error && (
        <div className="spd-error-banner">
          <span>{error}</span>
        </div>
      )}

      {/* Header */}
      <header className="spd-header">
        <div className="spd-header__left">
          <h1 className="spd-title">
            <MdBuild className="spd-title__icon" size={22} />
            <span>Service Provider Overview</span>
          </h1>
          <p className="spd-subtitle">
            View assigned complaints, track your progress and quickly access
            your profile. Keep the campus services running smoothly.
          </p>
        </div>

        <div className="spd-header__actions">
          <Link
            to="/service-provider/complaints"
            className="spd-btn spd-btn--primary"
          >
            <MdReportProblem size={18} />
            <span>Assigned Complaints</span>
          </Link>
          <Link
            to="/service-provider/profile"
            className="spd-btn spd-btn--ghost"
          >
            <MdBuild size={18} />
            <span>My Profile</span>
          </Link>
        </div>
      </header>

      {/* Info banner */}
      <div className="spd-info">
        <MdInfoOutline size={18} />
        <span>
          When you mark a complaint as <strong>RESOLVED</strong>, its status is
          locked. Make sure the issue is fixed and leave a short note on what
          was done.
        </span>
      </div>

      {/* Top stat row */}
      <section className="spd-section">
        <div className="spd-grid spd-grid--top">
          {/* Total */}
          <article className="spd-card spd-card--stat spd-card--total">
            <div className="spd-card__header-inline">
              <div className="spd-card__title-with-icon">
                <span className="spd-card__circle-icon">
                  <MdReportProblem size={18} />
                </span>
                <h2 className="spd-card__title">All Assigned Complaints</h2>
              </div>
              <Link
                to="/service-provider/complaints"
                className="spd-link-inline"
              >
                View All <MdChevronRight size={14} />
              </Link>
            </div>
            <p className="spd-card__label">
              Complaints assigned to you from students and teachers.
            </p>
            <div className="spd-card__stat-main">
              <span className="spd-card__stat-number">
                {loading ? "…" : complaintStats.total}
              </span>
              <span className="spd-card__stat-caption">total assigned</span>
            </div>
            <div className="spd-card__stat-row">
              <span>Assigned: {complaintStats.assigned}</span>
              <span>In Progress: {complaintStats.inProgress}</span>
              <span>Resolved: {complaintStats.resolved}</span>
            </div>
          </article>

          {/* Assigned */}
          <article className="spd-card spd-card--stat spd-card--assigned">
            <div className="spd-card__header-inline">
              <div className="spd-card__title-with-icon">
                <span className="spd-card__circle-icon">
                  <MdWarningAmber size={18} />
                </span>
                <h2 className="spd-card__title">Newly Assigned</h2>
              </div>
            </div>
            <p className="spd-card__label">
              Check new complaints that have not yet been started.
            </p>
            <div className="spd-card__stat-main">
              <span className="spd-card__stat-number">
                {complaintStats.assigned}
              </span>
              <span className="spd-card__stat-caption">awaiting action</span>
            </div>
          </article>

          {/* In Progress */}
          <article className="spd-card spd-card--stat spd-card--inprogress">
            <div className="spd-card__header-inline">
              <div className="spd-card__title-with-icon">
                <span className="spd-card__circle-icon">
                  <MdBuild size={18} />
                </span>
                <h2 className="spd-card__title">In Progress</h2>
              </div>
            </div>
            <p className="spd-card__label" >
              {/* Complaints currently being worked on by you or your team. */}
              Complaints currently being worked on by you.
            </p>
            <div className="spd-card__stat-main">
              <span className="spd-card__stat-number">
                {complaintStats.inProgress}
              </span>
              <span className="spd-card__stat-caption">
                currently active
              </span>
            </div>
          </article>

          {/* Resolved */}
          <article className="spd-card spd-card--stat spd-card--resolved">
            <div className="spd-card__header-inline">
              <div className="spd-card__title-with-icon">
                <span className="spd-card__circle-icon">
                  <MdCheckCircle size={18} />
                </span>
                <h2 className="spd-card__title">Resolved</h2>
              </div>
            </div>
            <p className="spd-card__label">
              Complaints you have successfully resolved and closed.
            </p>
            <div className="spd-card__stat-main">
              <span className="spd-card__stat-number">
                {complaintStats.resolved}
              </span>
              <span className="spd-card__stat-caption">
                recently resolved
              </span>
            </div>
          </article>
        </div>
      </section>

      {/* Middle row: Assigned list + Resolved snapshot */}
      <section className="spd-section spd-grid spd-grid--main">
        {/* Recent assigned */}
        <article className="spd-card spd-card--panel">
          <div className="spd-card__header">
            <div className="spd-card__title-with-icon">
              <span className="spd-card__circle-icon spd-card__circle-icon--soft">
                <MdReportProblem size={18} />
              </span>
              <div>
                <h2 className="spd-card__title">Recently Assigned</h2>
                <p className="spd-card__subtitle">
                  A few of the most recent complaints assigned to you. Use the
                  Assigned Complaints page to see full details and update
                  status.
                </p>
              </div>
            </div>
            <Link
              to="/service-provider/complaints"
              className="spd-link-btn"
            >
              Go to List
            </Link>
          </div>

          <div className="spd-table__wrapper">
            <table className="spd-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="spd-table__empty">
                      Loading assigned complaints...
                    </td>
                  </tr>
                ) : recentAssigned.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="spd-table__empty">
                      No complaints assigned yet.
                    </td>
                  </tr>
                ) : (
                  recentAssigned.map((c) => (
                    <tr key={c.id}>
                      <td>{c.id}</td>
                      <td>{c.title}</td>
                      <td>{c.category}</td>
                      <td>
                        <span
                          className={`spd-badge spd-badge--priority spd-badge--${c.priority.toLowerCase()}`}
                        >
                          {c.priority}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`spd-badge spd-badge--status spd-badge--${c.status.toLowerCase()}`}
                        >
                          {formatStatus(c.status)}
                        </span>
                      </td>
                      <td>
                        {c.createdAt
                          ? new Date(c.createdAt).toLocaleString()
                          : "-"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </article>

        {/* Right column: Resolved + tips */}
        <div className="spd-grid spd-grid--side">
          {/* Recently resolved */}
          <article className="spd-card spd-card--panel">
            <div className="spd-card__header">
              <div className="spd-card__title-with-icon">
                <span className="spd-card__circle-icon spd-card__circle-icon--soft">
                  <MdCheckCircle size={18} />
                </span>
                <div>
                  <h2 className="spd-card__title">Recently Resolved</h2>
                  <p className="spd-card__subtitle">
                    A brief glimpse of your recent work for reference.
                  </p>
                </div>
              </div>
            </div>
            <ul className="spd-list">
              {loading ? (
                <li className="spd-list__item">
                  <div className="spd-list__content">
                    <p className="spd-list__title">
                      Loading resolved complaints...
                    </p>
                  </div>
                </li>
              ) : recentResolved.length === 0 ? (
                <li className="spd-list__item">
                  <div className="spd-list__content">
                    <p className="spd-list__title">No resolved complaints yet.</p>
                  </div>
                </li>
              ) : (
                recentResolved.map((r) => (
                  <li key={r.id} className="spd-list__item">
                    <div className="spd-list__dot" />
                    <div className="spd-list__content">
                      <p className="spd-list__title">{r.title}</p>
                      <p className="spd-list__meta">
                        {r.category} ·{" "}
                        {r.resolvedAt
                          ? new Date(r.resolvedAt).toLocaleString()
                          : "-"}
                      </p>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </article>

          {/* Chatbot hint / notes */}
          <article className="spd-card spd-card--panel">
            <div className="spd-card__title-with-icon">
              <span className="spd-card__circle-icon spd-card__circle-icon--soft">
                <MdChat size={18} />
              </span>
              <h2 className="spd-card__title">Communication & Notes</h2>
            </div>
            <p className="spd-card__subtitle">
              When you change the complaint status, use notes to briefly explain
              what was done (e.g., “Replaced projector bulb”, “Restarted
              router, network stable”).
            </p>

            <ul className="spd-tips">
              <li>
                Short, clear notes help <strong>admins and teachers</strong>{" "}
                understand your work without needing a separate call.
              </li>
              <li>
                For complex issues, mention if{" "}
                <strong>follow-up work</strong> is required or if hardware was
                replaced.
              </li>
              <li>
                If the issue cannot be resolved, mark the status appropriately
                and describe the blocker.
              </li>
            </ul>
          </article>
        </div>
      </section>

      {/* Bottom row: Profile Snapshot */}
      <section className="spd-section">
        <article className="spd-card spd-card--panel spd-card--profile">
          <div className="spd-card__header">
            <div className="spd-card__title-with-icon">
              <span className="spd-card__circle-icon spd-card__circle-icon--soft">
                <MdPerson size={18} />
              </span>
              <div>
                <h2 className="spd-card__title">Profile Snapshot</h2>
                <p className="spd-card__subtitle">
                  Basic information loaded from your profile.
                </p>
              </div>
            </div>
            <Link to="/service-provider/profile" className="spd-link-btn">
              <MdBuild size={16} />
              <span>Edit Profile</span>
            </Link>
          </div>

          <div className="spd-profile">
            <div className="spd-profile__avatar">
              {profileSnapshot.name.charAt(0)}
            </div>
            <div className="spd-profile__info">
              <p className="spd-profile__name">{profileSnapshot.name}</p>
              <p className="spd-profile__meta">{profileSnapshot.email}</p>
              <p className="spd-profile__meta">
                Department / Specialization: {profileSnapshot.department}
              </p>
              <p className="spd-profile__meta">
                Campus / Building: {profileSnapshot.campus}
              </p>
              <p className="spd-profile__meta">Phone: {profileSnapshot.phone}</p>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
};

export default SpDashboard;
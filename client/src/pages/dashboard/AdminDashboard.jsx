// // src/pages/dashboardPlaceholder/AdminDashboard.jsx
// import React from "react";

// const AdminDashboard = () => {
//   return (
//     <div>
//       <h2>Admin Dashboard</h2>
//       <p>
//         Welcome Admin! User management, complaints, events and analytics will
//         appear here.
//       </p>
//     </div>
//   );
// };

// export default AdminDashboard;

// import React from "react";
// import { Link } from "react-router-dom";
// import {
//   MdPeople,
//   MdReportProblem,
//   MdInventory2,
//   MdEvent,
//   MdAdminPanelSettings,
//   MdChevronRight,
//   MdSecurity,
//   MdDashboardCustomize,
//   MdChat,
// } from "react-icons/md";
// import "./AdminDashboard.css";

// const AdminDashboard = () => {
//   // Placeholder stats – replace with real data later
//   const userStats = {
//     total: 320,
//     active: 298,
//     blocked: 22,
//   };

//   const complaintStats = {
//     total: 145,
//     pending: 16,
//     inProgress: 21,
//     resolved: 96,
//     closed: 12,
//   };

//   const resourceStats = {
//     total: 58,
//     pending: 7,
//     approved: 43,
//     rejected: 8,
//   };

//   const eventStats = {
//     total: 12,
//     active: 5,
//   };

//   const recentComplaints = [
//     {
//       id: "C-1205",
//       title: "Wi-Fi unstable in CS Block",
//       category: "Network / IT",
//       priority: "HIGH",
//       status: "IN_PROGRESS",
//     },
//     {
//       id: "C-1199",
//       title: "Projector issue in Seminar Hall",
//       category: "Lab Equipment",
//       priority: "INTERMEDIATE",
//       status: "PENDING",
//     },
//     {
//       id: "C-1193",
//       title: "AC not working in Lab-3",
//       category: "Maintenance",
//       priority: "CRITICAL",
//       status: "RESOLVED",
//     },
//   ];

//   const recentResourceRequests = [
//     {
//       id: "R-221",
//       purpose: "Lab mid-term practical exam",
//       status: "APPROVED",
//     },
//     {
//       id: "R-217",
//       purpose: "Seminar sound system test",
//       status: "PENDING",
//     },
//   ];

//   const upcomingEvents = [
//     {
//       id: "E-310",
//       title: "Department Orientation",
//       when: "Sep 05 · 10:00 AM",
//       where: "Main Auditorium",
//     },
//     {
//       id: "E-311",
//       title: "Annual CS Project Exhibition",
//       when: "Sep 20 · 09:00 AM",
//       where: "CS Block Lobby",
//     },
//   ];

//   return (
//     <div className="ad-dashboard">
//       {/* Header */}
//       <header className="ad-header">
//         <div className="ad-header__left">
//           <h1 className="ad-title">
//             <MdAdminPanelSettings className="ad-title__icon" size={22} />
//             <span>Admin Overview</span>
//           </h1>
//           <p className="ad-subtitle">
//             Centralized view of users, complaints, resource requests, events and
//             academic calendar. Use this dashboard to quickly navigate to admin
//             modules.
//           </p>
//         </div>

//         <div className="ad-header__actions">
//           <Link to="/admin/users" className="ad-btn ad-btn--primary">
//             <MdPeople size={18} />
//             <span>Manage Users</span>
//           </Link>
//           <Link to="/admin/complaints" className="ad-btn ad-btn--ghost">
//             <MdReportProblem size={18} />
//             <span>View Complaints</span>
//           </Link>
//         </div>
//       </header>

//       {/* Top summary row */}
//       <section className="ad-section">
//         <div className="ad-grid ad-grid--top">
//           {/* Users */}
//           <article className="ad-card ad-card--stat ad-card--users">
//             <div className="ad-card__header-inline">
//               <div className="ad-card__title-with-icon">
//                 <span className="ad-card__circle-icon">
//                   <MdPeople size={18} />
//                 </span>
//                 <h2 className="ad-card__title">Users</h2>
//               </div>
//               <Link to="/admin/users" className="ad-link-inline">
//                 Manage <MdChevronRight size={14} />
//               </Link>
//             </div>
//             <p className="ad-card__label">
//               Students, teachers, service providers &amp; server room staff.
//             </p>
//             <div className="ad-card__stat-main">
//               <span className="ad-card__stat-number">
//                 {userStats.total}
//               </span>
//               <span className="ad-card__stat-caption">total users</span>
//             </div>
//             <div className="ad-card__stat-row">
//               <span>Active: {userStats.active}</span>
//               <span>Blocked: {userStats.blocked}</span>
//             </div>
//           </article>

//           {/* Complaints */}
//           <article className="ad-card ad-card--stat ad-card--complaints">
//             <div className="ad-card__header-inline">
//               <div className="ad-card__title-with-icon">
//                 <span className="ad-card__circle-icon">
//                   <MdReportProblem size={18} />
//                 </span>
//                 <h2 className="ad-card__title">Complaints</h2>
//               </div>
//               <Link to="/admin/complaints" className="ad-link-inline">
//                 Open <MdChevronRight size={14} />
//               </Link>
//             </div>
//             <p className="ad-card__label">
//               All complaints from students and teachers across the campus.
//             </p>
//             <div className="ad-card__stat-main">
//               <span className="ad-card__stat-number">
//                 {complaintStats.total}
//               </span>
//               <span className="ad-card__stat-caption">total complaints</span>
//             </div>
//             <div className="ad-card__stat-row">
//               <span>Pending: {complaintStats.pending}</span>
//               <span>In Progress: {complaintStats.inProgress}</span>
//               <span>Resolved: {complaintStats.resolved}</span>
//             </div>
//           </article>

//           {/* Resource Requests */}
//           <article className="ad-card ad-card--stat ad-card--resources">
//             <div className="ad-card__header-inline">
//               <div className="ad-card__title-with-icon">
//                 <span className="ad-card__circle-icon">
//                   <MdInventory2 size={18} />
//                 </span>
//                 <h2 className="ad-card__title">Resource Requests</h2>
//               </div>
//               <Link
//                 to="/admin/resource-requests"
//                 className="ad-link-inline"
//               >
//                 Monitor <MdChevronRight size={14} />
//               </Link>
//             </div>
//             <p className="ad-card__label">
//               Requests going through server room staff (lab/IT resources).
//             </p>
//             <div className="ad-card__stat-main">
//               <span className="ad-card__stat-number">
//                 {resourceStats.total}
//               </span>
//               <span className="ad-card__stat-caption">total requests</span>
//             </div>
//             <div className="ad-card__stat-row">
//               <span>Pending: {resourceStats.pending}</span>
//               <span>Approved: {resourceStats.approved}</span>
//               <span>Rejected: {resourceStats.rejected}</span>
//             </div>
//           </article>

//           {/* Events */}
//           <article className="ad-card ad-card--stat ad-card--events">
//             <div className="ad-card__header-inline">
//               <div className="ad-card__title-with-icon">
//                 <span className="ad-card__circle-icon">
//                   <MdEvent size={18} />
//                 </span>
//                 <h2 className="ad-card__title">Events</h2>
//               </div>
//               <Link to="/admin/events" className="ad-link-inline">
//                 Events page <MdChevronRight size={14} />
//               </Link>
//             </div>
//             <p className="ad-card__label">
//               Seminars, exams, and campus activities for all departments.
//             </p>
//             <div className="ad-card__stat-main">
//               <span className="ad-card__stat-number">{eventStats.active}</span>
//               <span className="ad-card__stat-caption">active events</span>
//             </div>
//             <div className="ad-card__stat-row">
//               <span>Total: {eventStats.total}</span>
//             </div>
//           </article>
//         </div>
//       </section>

//       {/* Middle row: complaints + resource requests */}
//       <section className="ad-section ad-grid ad-grid--main">
//         {/* Latest complaints snapshot */}
//         <article className="ad-card ad-card--panel">
//           <div className="ad-card__header">
//             <div className="ad-card__title-with-icon">
//               <span className="ad-card__circle-icon ad-card__circle-icon--soft">
//                 <MdReportProblem size={18} />
//               </span>
//               <div>
//                 <h2 className="ad-card__title">Recent Complaints</h2>
//                 <p className="ad-card__subtitle">
//                   Monitor a few of the latest complaints requiring admin
//                   attention. Use the complaints page for full details.
//                 </p>
//               </div>
//             </div>
//             <Link to="/admin/complaints" className="ad-link-btn">
//               Complaints
//             </Link>
//           </div>

//           <div className="ad-table__wrapper">
//             <table className="ad-table">
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Title</th>
//                   <th>Category</th>
//                   <th>Priority</th>
//                   <th>Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {recentComplaints.map((c) => (
//                   <tr key={c.id}>
//                     <td>{c.id}</td>
//                     <td>{c.title}</td>
//                     <td>{c.category}</td>
//                     <td>
//                       <span
//                         className={`ad-badge ad-badge--priority ad-badge--${c.priority.toLowerCase()}`}
//                       >
//                         {c.priority}
//                       </span>
//                     </td>
//                     <td>
//                       <span
//                         className={`ad-badge ad-badge--status ad-badge--${c.status.toLowerCase()}`}
//                       >
//                         {formatStatus(c.status)}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </article>

//         {/* Right column: Resource requests + calendar/chatbot */}
//         <div className="ad-grid ad-grid--side">
//           {/* Resource requests snippet */}
//           <article className="ad-card ad-card--panel">
//             <div className="ad-card__header">
//               <div className="ad-card__title-with-icon">
//                 <span className="ad-card__circle-icon ad-card__circle-icon--soft">
//                   <MdInventory2 size={18} />
//                 </span>
//                 <div>
//                   <h2 className="ad-card__title">Recent Resource Requests</h2>
//                   <p className="ad-card__subtitle">
//                     Requests created by teachers; processed by server room
//                     staff.
//                   </p>
//                 </div>
//               </div>
//               <Link
//                 to="/admin/resource-requests"
//                 className="ad-link-btn"
//               >
//                 View all
//               </Link>
//             </div>

//             <ul className="ad-list">
//               {recentResourceRequests.map((r) => (
//                 <li key={r.id} className="ad-list__item ad-list__item--space">
//                   <div className="ad-list__content">
//                     <p className="ad-list__title">{r.purpose}</p>
//                     <p className="ad-list__meta">ID: {r.id}</p>
//                   </div>
//                   <span
//                     className={`ad-badge ad-badge--status ad-badge--${r.status.toLowerCase()}`}
//                   >
//                     {r.status}
//                   </span>
//                 </li>
//               ))}
//             </ul>
//           </article>

//           {/* Calendar / chatbot module */}
//           <article className="ad-card ad-card--panel ad-card--calendar">
//             <div className="ad-card__header">
//               <div className="ad-card__title-with-icon">
//                 <span className="ad-card__circle-icon ad-card__circle-icon--soft">
//                   <MdDashboardCustomize size={18} />
//                 </span>
//                 <div>
//                   <h2 className="ad-card__title">Academic Calendar & Chatbot</h2>
//                   <p className="ad-card__subtitle">
//                     Configure department calendar entries that power the teacher
//                     chatbot and date-related queries.
//                   </p>
//                 </div>
//               </div>
//               <Link
//                 to="/admin/calendar"
//                 className="ad-link-btn"
//               >
//                 Manage Calendar
//               </Link>
//             </div>

//             <div className="ad-calendar-snippet">
//               <p>
//                 Use the <strong>Department Academic Calendar</strong> module to
//                 define:
//               </p>
//               <ul>
//                 <li>Course offering timetables per department</li>
//                 <li>Enrollment and late-enrollment windows</li>
//                 <li>Class commencement dates for programs</li>
//                 <li>Exam weeks and break periods</li>
//               </ul>
//               <p>
//                 The <strong>Teacher Chatbot</strong> uses these entries to
//                 answer time-sensitive questions accurately.
//               </p>
//               <Link to="/admin/calendar" className="ad-btn ad-btn--ghost">
//                 <MdChat size={16} />
//                 <span>Open Calendar / Chatbot Config</span>
//               </Link>
//             </div>
//           </article>
//         </div>
//       </section>

//       {/* Bottom row: Security / system section */}
//       <section className="ad-section ad-grid ad-grid--bottom">
//         <article className="ad-card ad-card--panel ad-card--security">
//           <div className="ad-card__title-with-icon">
//             <span className="ad-card__circle-icon ad-card__circle-icon--soft">
//               <MdSecurity size={18} />
//             </span>
//             <h2 className="ad-card__title">System & Security Notes</h2>
//           </div>
//           <ul className="ad-tips">
//             <li>
//               Review <strong>user roles</strong> periodically to ensure least
//               privilege access for all accounts.
//             </li>
//             <li>
//               Close or resolve old complaints that have been fully addressed to
//               keep the queue clean.
//             </li>
//             <li>
//               Coordinate with <strong>server room staff</strong> to ensure
//               resource requests are processed on time.
//             </li>
//             <li>
//               Keep the academic calendar updated so the chatbot responses
//               remain accurate throughout the semester.
//             </li>
//           </ul>
//         </article>
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

// export default AdminDashboard;

// // src/pages/admin/AdminDashboard.jsx
// import React, { useEffect, useMemo, useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   MdPeople,
//   MdReportProblem,
//   MdInventory2,
//   MdEvent,
//   MdAdminPanelSettings,
//   MdChevronRight,
//   MdSecurity,
//   MdDashboardCustomize,
//   MdChat,
// } from "react-icons/md";
// import "./AdminDashboard.css";

// import { fetchUsersApi } from "../../api/userApi";
// import { fetchAllComplaintsApi } from "../../api/complaintsApi";
// import { fetchAllResourceRequestsForAdminApi } from "../../api/resourceRequestsApi";
// import { fetchAdminEventsApi } from "../../api/eventsApi";

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

// /**
//  * Categorize events: upcoming = date > now, else past.
//  * (Admins just need a basic active vs total; details live on events page.)
//  */
// function categorizeAdminEvents(events) {
//   const now = new Date();
//   const upcoming = [];
//   const past = [];

//   events.forEach((ev) => {
//     const dt = new Date(ev.date);
//     if (dt >= now) {
//       upcoming.push(ev);
//     } else {
//       past.push(ev);
//     }
//   });

//   upcoming.sort((a, b) => new Date(a.date) - new Date(b.date));
//   past.sort((a, b) => new Date(b.date) - new Date(a.date));

//   return { upcoming, past };
// }

// const AdminDashboard = () => {
//   const [users, setUsers] = useState([]);
//   const [usersLoading, setUsersLoading] = useState(false);

//   const [complaints, setComplaints] = useState([]);
//   const [complaintsLoading, setComplaintsLoading] = useState(false);

//   const [resourceRequests, setResourceRequests] = useState([]);
//   const [resourcesLoading, setResourcesLoading] = useState(false);

//   const [events, setEvents] = useState([]);
//   const [eventsLoading, setEventsLoading] = useState(false);

//   const [error, setError] = useState("");

//   // Load users
//   useEffect(() => {
//     const loadUsers = async () => {
//       try {
//         setUsersLoading(true);
//         const data = await fetchUsersApi();
//         setUsers(data.users || []);
//       } catch (err) {
//         console.error("Error loading users for admin dashboard:", err);
//         setError(
//           err?.response?.data?.message ||
//             "Failed to load users data for admin overview."
//         );
//       } finally {
//         setUsersLoading(false);
//       }
//     };

//     loadUsers();
//   }, []);

//   // Load all complaints
//   useEffect(() => {
//     const loadComplaints = async () => {
//       try {
//         setComplaintsLoading(true);
//         const data = await fetchAllComplaintsApi();
//         setComplaints(data.complaints || []);
//       } catch (err) {
//         console.error("Error loading complaints for admin dashboard:", err);
//         setError(
//           err?.response?.data?.message ||
//             "Failed to load complaints data for admin overview."
//         );
//       } finally {
//         setComplaintsLoading(false);
//       }
//     };

//     loadComplaints();
//   }, []);

//   // Load all resource requests for admin
//   useEffect(() => {
//     const loadResourceRequests = async () => {
//       try {
//         setResourcesLoading(true);
//         const data = await fetchAllResourceRequestsForAdminApi();
//         const list = data.requests || data.resourceRequests || data || [];
//         setResourceRequests(list);
//       } catch (err) {
//         console.error("Error loading resource requests for admin dashboard:", err);
//         setError(
//           err?.response?.data?.message ||
//             "Failed to load resource requests data for admin overview."
//         );
//       } finally {
//         setResourcesLoading(false);
//       }
//     };

//     loadResourceRequests();
//   }, []);

//   // Load events for admin
//   useEffect(() => {
//     const loadEvents = async () => {
//       try {
//         setEventsLoading(true);
//         const data = await fetchAdminEventsApi();
//         setEvents(data.events || []);
//       } catch (err) {
//         console.error("Error loading events for admin dashboard:", err);
//         setError(
//           err?.response?.data?.message ||
//             "Failed to load events data for admin overview."
//         );
//       } finally {
//         setEventsLoading(false);
//       }
//     };

//     loadEvents();
//   }, []);

//   // === Derived stats ===

//   const userStats = useMemo(() => {
//     const total = users.length;
//     const active = users.filter((u) => u.isActive !== false).length;
//     const blocked = users.filter((u) => u.isActive === false).length;
//     return { total, active, blocked };
//   }, [users]);

//   const complaintStats = useMemo(() => {
//     const total = complaints.length;
//     const pending = complaints.filter((c) => c.status === "PENDING").length;
//     const inProgress = complaints.filter(
//       (c) => c.status === "IN_PROGRESS"
//     ).length;
//     const resolved = complaints.filter(
//       (c) => c.status === "RESOLVED"
//     ).length;
//     const closed = complaints.filter((c) => c.status === "CLOSED").length;
//     return { total, pending, inProgress, resolved, closed };
//   }, [complaints]);

//   const resourceStats = useMemo(() => {
//     const total = resourceRequests.length;
//     const pending = resourceRequests.filter(
//       (r) => r.status === "PENDING"
//     ).length;
//     const approved = resourceRequests.filter(
//       (r) => r.status === "APPROVED"
//     ).length;
//     const rejected = resourceRequests.filter(
//       (r) => r.status === "REJECTED"
//     ).length;
//     return { total, pending, approved, rejected };
//   }, [resourceRequests]);

//   const eventStats = useMemo(() => {
//     const total = events.length;
//     const active = events.filter((e) => e.isActive !== false).length;
//     return { total, active };
//   }, [events]);

//   const recentComplaints = useMemo(() => {
//     const sorted = [...complaints].sort(
//       (a, b) => new Date(b.createdAt || b.updatedAt) - new Date(a.createdAt || a.updatedAt)
//     );
//     return sorted.slice(0, 3).map((c) => ({
//       id: c._id,
//       title: c.title,
//       category: c.category,
//       priority: c.priority,
//       status: c.status,
//     }));
//   }, [complaints]);

//   const recentResourceRequests = useMemo(() => {
//     const sorted = [...resourceRequests].sort(
//       (a, b) => new Date(b.dateTime) - new Date(a.dateTime)
//     );
//     return sorted.slice(0, 2).map((r) => ({
//       id: r._id,
//       purpose: r.purpose,
//       status: r.status,
//     }));
//   }, [resourceRequests]);

//   const { upcoming, past } = useMemo(
//     () => categorizeAdminEvents(events),
//     [events]
//   );

//   const upcomingEvents = useMemo(() => {
//     const list = [...upcoming].slice(0, 2);
//     return list.map((ev) => ({
//       id: ev._id,
//       title: ev.title,
//       when: new Date(ev.date).toLocaleString(),
//       where: ev.venue,
//     }));
//   }, [upcoming]);

//   return (
//     <div className="ad-dashboard">
//       {/* Error banner */}
//       {error && (
//         <div className="ad-error-banner">
//           <span>{error}</span>
//         </div>
//       )}

//       {/* Header */}
//       <header className="ad-header">
//         <div className="ad-header__left">
//           <h1 className="ad-title">
//             <MdAdminPanelSettings className="ad-title__icon" size={22} />
//             <span>Admin Overview</span>
//           </h1>
//           <p className="ad-subtitle">
//             Centralized view of users, complaints, resource requests, events and
//             academic calendar. Use this dashboard to quickly navigate to admin
//             modules.
//           </p>
//         </div>

//         <div className="ad-header__actions">
//           <Link to="/admin/users" className="ad-btn ad-btn--primary">
//             <MdPeople size={18} />
//             <span>Manage Users</span>
//           </Link>
//           <Link to="/admin/complaints" className="ad-btn ad-btn--ghost">
//             <MdReportProblem size={18} />
//             <span>View Complaints</span>
//           </Link>
//         </div>
//       </header>

//       {/* Top summary row */}
//       <section className="ad-section">
//         <div className="ad-grid ad-grid--top">
//           {/* Users */}
//           <article className="ad-card ad-card--stat ad-card--users">
//             <div className="ad-card__header-inline">
//               <div className="ad-card__title-with-icon">
//                 <span className="ad-card__circle-icon">
//                   <MdPeople size={18} />
//                 </span>
//                 <h2 className="ad-card__title">Users</h2>
//               </div>
//               <Link to="/admin/users" className="ad-link-inline">
//                 Manage <MdChevronRight size={14} />
//               </Link>
//             </div>
//             <p className="ad-card__label">
//               Students, teachers, service providers &amp; server room staff.
//             </p>
//             <div className="ad-card__stat-main">
//               <span className="ad-card__stat-number">
//                 {usersLoading ? "…" : userStats.total}
//               </span>
//               <span className="ad-card__stat-caption">total users</span>
//             </div>
//             <div className="ad-card__stat-row">
//               <span>Active: {userStats.active}</span>
//               <span>Blocked: {userStats.blocked}</span>
//             </div>
//           </article>

//           {/* Complaints */}
//           <article className="ad-card ad-card--stat ad-card--complaints">
//             <div className="ad-card__header-inline">
//               <div className="ad-card__title-with-icon">
//                 <span className="ad-card__circle-icon">
//                   <MdReportProblem size={18} />
//                 </span>
//                 <h2 className="ad-card__title">Complaints</h2>
//               </div>
//               <Link to="/admin/complaints" className="ad-link-inline">
//                 Open <MdChevronRight size={14} />
//               </Link>
//             </div>
//             <p className="ad-card__label">
//               All complaints from students and teachers across the campus.
//             </p>
//             <div className="ad-card__stat-main">
//               <span className="ad-card__stat-number">
//                 {complaintsLoading ? "…" : complaintStats.total}
//               </span>
//               <span className="ad-card__stat-caption">total complaints</span>
//             </div>
//             <div className="ad-card__stat-row">
//               <span>Pending: {complaintStats.pending}</span>
//               <span>In Progress: {complaintStats.inProgress}</span>
//               <span>Resolved: {complaintStats.resolved}</span>
//             </div>
//           </article>

//           {/* Resource Requests */}
//           <article className="ad-card ad-card--stat ad-card--resources">
//             <div className="ad-card__header-inline">
//               <div className="ad-card__title-with-icon">
//                 <span className="ad-card__circle-icon">
//                   <MdInventory2 size={18} />
//                 </span>
//                 <h2 className="ad-card__title">Resource Requests</h2>
//               </div>
//               <Link
//                 to="/admin/resource-requests"
//                 className="ad-link-inline"
//               >
//                 Monitor <MdChevronRight size={14} />
//               </Link>
//             </div>
//             <p className="ad-card__label">
//               Requests going through server room staff (lab/IT resources).
//             </p>
//             <div className="ad-card__stat-main">
//               <span className="ad-card__stat-number">
//                 {resourcesLoading ? "…" : resourceStats.total}
//               </span>
//               <span className="ad-card__stat-caption">total requests</span>
//             </div>
//             <div className="ad-card__stat-row">
//               <span>Pending: {resourceStats.pending}</span>
//               <span>Approved: {resourceStats.approved}</span>
//               <span>Rejected: {resourceStats.rejected}</span>
//             </div>
//           </article>

//           {/* Events */}
//           <article className="ad-card ad-card--stat ad-card--events">
//             <div className="ad-card__header-inline">
//               <div className="ad-card__title-with-icon">
//                 <span className="ad-card__circle-icon">
//                   <MdEvent size={18} />
//                 </span>
//                 <h2 className="ad-card__title">Events</h2>
//               </div>
//               <Link to="/admin/events" className="ad-link-inline">
//                 Events page <MdChevronRight size={14} />
//               </Link>
//             </div>
//             <p className="ad-card__label">
//               Seminars, exams, and campus activities for all departments.
//             </p>
//             <div className="ad-card__stat-main">
//               <span className="ad-card__stat-number">
//                 {eventsLoading ? "…" : eventStats.active}
//               </span>
//               <span className="ad-card__stat-caption">active events</span>
//             </div>
//             <div className="ad-card__stat-row">
//               <span>Total: {eventStats.total}</span>
//             </div>
//           </article>
//         </div>
//       </section>

//       {/* Middle row: complaints + resource requests */}
//       <section className="ad-section ad-grid ad-grid--main">
//         {/* Latest complaints snapshot */}
//         <article className="ad-card ad-card--panel">
//           <div className="ad-card__header">
//             <div className="ad-card__title-with-icon">
//               <span className="ad-card__circle-icon ad-card__circle-icon--soft">
//                 <MdReportProblem size={18} />
//               </span>
//               <div>
//                 <h2 className="ad-card__title">Recent Complaints</h2>
//                 <p className="ad-card__subtitle">
//                   Monitor a few of the latest complaints requiring admin
//                   attention. Use the complaints page for full details.
//                 </p>
//               </div>
//             </div>
//             <Link to="/admin/complaints" className="ad-link-btn">
//               Complaints
//             </Link>
//           </div>

//           <div className="ad-table__wrapper">
//             <table className="ad-table">
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Title</th>
//                   <th>Category</th>
//                   <th>Priority</th>
//                   <th>Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {complaintsLoading ? (
//                   <tr>
//                     <td colSpan={5}>Loading complaints...</td>
//                   </tr>
//                 ) : recentComplaints.length === 0 ? (
//                   <tr>
//                     <td colSpan={5}>No complaints found.</td>
//                   </tr>
//                 ) : (
//                   recentComplaints.map((c) => (
//                     <tr key={c.id}>
//                       <td>{c.id}</td>
//                       <td>{c.title}</td>
//                       <td>{c.category}</td>
//                       <td>
//                         <span
//                           className={`ad-badge ad-badge--priority ad-badge--${c.priority.toLowerCase()}`}
//                         >
//                           {c.priority}
//                         </span>
//                       </td>
//                       <td>
//                         <span
//                           className={`ad-badge ad-badge--status ad-badge--${c.status.toLowerCase()}`}
//                         >
//                           {formatStatus(c.status)}
//                         </span>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </article>

//         {/* Right column: Resource requests + calendar/chatbot */}
//         <div className="ad-grid ad-grid--side">
//           {/* Resource requests snippet */}
//           <article className="ad-card ad-card--panel">
//             <div className="ad-card__header">
//               <div className="ad-card__title-with-icon">
//                 <span className="ad-card__circle-icon ad-card__circle-icon--soft">
//                   <MdInventory2 size={18} />
//                 </span>
//                 <div>
//                   <h2 className="ad-card__title">Recent Resource Requests</h2>
//                   <p className="ad-card__subtitle">
//                     Requests created by teachers; processed by server room
//                     staff.
//                   </p>
//                 </div>
//               </div>
//               <Link
//                 to="/admin/resource-requests"
//                 className="ad-link-btn"
//               >
//                 View all
//               </Link>
//             </div>

//             <ul className="ad-list">
//               {resourcesLoading ? (
//                 <li className="ad-list__item">
//                   <div className="ad-list__content">
//                     <p className="ad-list__title">
//                       Loading resource requests...
//                     </p>
//                   </div>
//                 </li>
//               ) : recentResourceRequests.length === 0 ? (
//                 <li className="ad-list__item">
//                   <div className="ad-list__content">
//                     <p className="ad-list__title">
//                       No recent resource requests.
//                     </p>
//                   </div>
//                 </li>
//               ) : (
//                 recentResourceRequests.map((r) => (
//                   <li
//                     key={r.id}
//                     className="ad-list__item ad-list__item--space"
//                   >
//                     <div className="ad-list__content">
//                       <p className="ad-list__title">{r.purpose}</p>
//                       <p className="ad-list__meta">ID: {r.id}</p>
//                     </div>
//                     <span
//                       className={`ad-badge ad-badge--status ad-badge--${r.status.toLowerCase()}`}
//                     >
//                       {r.status}
//                     </span>
//                   </li>
//                 ))
//               )}
//             </ul>
//           </article>

//           {/* Calendar / chatbot module */}
//           <article className="ad-card ad-card--panel ad-card--calendar">
//             <div className="ad-card__header">
//               <div className="ad-card__title-with-icon">
//                 <span className="ad-card__circle-icon ad-card__circle-icon--soft">
//                   <MdDashboardCustomize size={18} />
//                 </span>
//                 <div>
//                   <h2 className="ad-card__title">Academic Calendar & Chatbot</h2>
//                   <p className="ad-card__subtitle">
//                     Configure department calendar entries that power the teacher
//                     chatbot and date-related queries.
//                   </p>
//                 </div>
//               </div>
//               <Link
//                 to="/admin/calendar"
//                 className="ad-link-btn"
//               >
//                 Manage Calendar
//               </Link>
//             </div>

//             <div className="ad-calendar-snippet">
//               <p>
//                 Use the <strong>Department Academic Calendar</strong> module to
//                 define:
//               </p>
//               <ul>
//                 <li>Course offering timetables per department</li>
//                 <li>Enrollment and late-enrollment windows</li>
//                 <li>Class commencement dates for programs</li>
//                 <li>Exam weeks and break periods</li>
//               </ul>
//               <p>
//                 The <strong>Teacher Chatbot</strong> uses these entries to
//                 answer time-sensitive questions accurately.
//               </p>
//               <Link to="/admin/calendar" className="ad-btn ad-btn--ghost">
//                 <MdChat size={16} />
//                 <span>Open Calendar / Chatbot Config</span>
//               </Link>
//             </div>
//           </article>
//         </div>
//       </section>

//       {/* Bottom row: Security / system section */}
//       <section className="ad-section ad-grid ad-grid--bottom">
//         <article className="ad-card ad-card--panel ad-card--security">
//           <div className="ad-card__title-with-icon">
//             <span className="ad-card__circle-icon ad-card__circle-icon--soft">
//               <MdSecurity size={18} />
//             </span>
//             <h2 className="ad-card__title">System & Security Notes</h2>
//           </div>
//           <ul className="ad-tips">
//             <li>
//               Review <strong>user roles</strong> periodically to ensure least
//               privilege access for all accounts.
//             </li>
//             <li>
//               Close or resolve old complaints that have been fully addressed to
//               keep the queue clean.
//             </li>
//             <li>
//               Coordinate with <strong>server room staff</strong> to ensure
//               resource requests are processed on time.
//             </li>
//             <li>
//               Keep the academic calendar updated so the chatbot responses
//               remain accurate throughout the semester.
//             </li>
//           </ul>
//         </article>
//       </section>
//     </div>
//   );
// };

// export default AdminDashboard;

// src/pages/admin/AdminDashboard.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  MdPeople,
  MdReportProblem,
  MdInventory2,
  MdEvent,
  MdAdminPanelSettings,
  MdChevronRight,
  MdSecurity,
  MdDashboardCustomize,
  MdChat,
} from "react-icons/md";
import "./AdminDashboard.css";

import { fetchUsersApi } from "../../api/userApi";
import { fetchAllComplaintsApi } from "../../api/complaintsApi";
import { fetchAllResourceRequestsForAdminApi } from "../../api/resourceRequestsApi";
import { fetchAdminEventsApi } from "../../api/eventsApi";
import {
  listDepartmentCalendarEntriesApi,
} from "../../api/calendarApi";

/* ===== Helpers ===== */

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

/**
 * Categorize events: upcoming vs past from admin perspective
 */
function categorizeAdminEvents(events) {
  const now = new Date();
  const upcoming = [];
  const past = [];

  events.forEach((ev) => {
    const dt = new Date(ev.date);
    if (dt >= now) {
      upcoming.push(ev);
    } else {
      past.push(ev);
    }
  });

  upcoming.sort((a, b) => new Date(a.date) - new Date(b.date));
  past.sort((a, b) => new Date(b.date) - new Date(a.date));

  return { upcoming, past };
}

/* ===== Component ===== */

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);

  const [complaints, setComplaints] = useState([]);
  const [complaintsLoading, setComplaintsLoading] = useState(false);

  const [resourceRequests, setResourceRequests] = useState([]);
  const [resourcesLoading, setResourcesLoading] = useState(false);

  const [events, setEvents] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(false);

  const [calendarEntries, setCalendarEntries] = useState([]);
  const [calendarLoading, setCalendarLoading] = useState(false);

  const [error, setError] = useState("");

  /* === Load users === */
  useEffect(() => {
    const loadUsers = async () => {
      try {
        setUsersLoading(true);
        const data = await fetchUsersApi();
        setUsers(data.users || []);
      } catch (err) {
        console.error("Error loading users for admin dashboard:", err);
        setError(
          err?.response?.data?.message ||
            "Failed to load users data for admin overview."
        );
      } finally {
        setUsersLoading(false);
      }
    };
    loadUsers();
  }, []);

  /* === Load complaints === */
  useEffect(() => {
    const loadComplaints = async () => {
      try {
        setComplaintsLoading(true);
        const data = await fetchAllComplaintsApi();
        setComplaints(data.complaints || []);
      } catch (err) {
        console.error("Error loading complaints for admin dashboard:", err);
        setError(
          err?.response?.data?.message ||
            "Failed to load complaints data for admin overview."
        );
      } finally {
        setComplaintsLoading(false);
      }
    };
    loadComplaints();
  }, []);

  /* === Load resource requests === */
  useEffect(() => {
    const loadResourceRequests = async () => {
      try {
        setResourcesLoading(true);
        const data = await fetchAllResourceRequestsForAdminApi();
        const list = data.requests || data.resourceRequests || data || [];
        setResourceRequests(list);
      } catch (err) {
        console.error(
          "Error loading resource requests for admin dashboard:",
          err
        );
        setError(
          err?.response?.data?.message ||
            "Failed to load resource requests data for admin overview."
        );
      } finally {
        setResourcesLoading(false);
      }
    };
    loadResourceRequests();
  }, []);

  /* === Load events === */
  useEffect(() => {
    const loadEvents = async () => {
      try {
        setEventsLoading(true);
        const data = await fetchAdminEventsApi();
        setEvents(data.events || []);
      } catch (err) {
        console.error("Error loading events for admin dashboard:", err);
        setError(
          err?.response?.data?.message ||
            "Failed to load events data for admin overview."
        );
      } finally {
        setEventsLoading(false);
      }
    };
    loadEvents();
  }, []);

  /* === Load calendar entries (all departments) === */
  useEffect(() => {
    const loadCalendar = async () => {
      try {
        setCalendarLoading(true);
        const data = await listDepartmentCalendarEntriesApi();
        const list = data.entries || data || [];
        setCalendarEntries(list);
      } catch (err) {
        console.error("Error loading calendar entries:", err);
        setError(
          err?.response?.data?.message ||
            "Failed to load calendar data for admin overview."
        );
      } finally {
        setCalendarLoading(false);
      }
    };
    loadCalendar();
  }, []);

  /* === Derived stats === */

  const userStats = useMemo(() => {
    const total = users.length;
    const active = users.filter((u) => u.isActive !== false).length;
    const blocked = users.filter((u) => u.isActive === false).length;
    return { total, active, blocked };
  }, [users]);

  const complaintStats = useMemo(() => {
    const total = complaints.length;
    const pending = complaints.filter((c) => c.status === "PENDING").length;
    const inProgress = complaints.filter(
      (c) => c.status === "IN_PROGRESS"
    ).length;
    const resolved = complaints.filter(
      (c) => c.status === "RESOLVED"
    ).length;
    const closed = complaints.filter((c) => c.status === "CLOSED").length;
    return { total, pending, inProgress, resolved, closed };
  }, [complaints]);

  const resourceStats = useMemo(() => {
    const total = resourceRequests.length;
    const pending = resourceRequests.filter(
      (r) => r.status === "PENDING"
    ).length;
    const approved = resourceRequests.filter(
      (r) => r.status === "APPROVED"
    ).length;
    const rejected = resourceRequests.filter(
      (r) => r.status === "REJECTED"
    ).length;
    return { total, pending, approved, rejected };
  }, [resourceRequests]);

  const eventStats = useMemo(() => {
    const total = events.length;
    const active = events.filter((e) => e.isActive !== false).length;
    return { total, active };
  }, [events]);

  const recentComplaints = useMemo(() => {
    const sorted = [...complaints].sort(
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
    }));
  }, [complaints]);

  const recentResourceRequests = useMemo(() => {
    const sorted = [...resourceRequests].sort(
      (a, b) => new Date(b.dateTime) - new Date(a.dateTime)
    );
    return sorted.slice(0, 2).map((r) => ({
      id: r._id,
      purpose: r.purpose,
      status: r.status,
    }));
  }, [resourceRequests]);

  const { upcoming } = useMemo(
    () => categorizeAdminEvents(events),
    [events]
  );

  const upcomingEvents = useMemo(() => {
    const list = [...upcoming].slice(0, 2);
    return list.map((ev) => ({
      id: ev._id,
      title: ev.title,
      when: new Date(ev.date).toLocaleString(),
      where: ev.venue,
    }));
  }, [upcoming]);

  const calendarStats = useMemo(() => {
    const total = calendarEntries.length;
    // group entries by department to show coverage
    const departments = new Set(
      calendarEntries.map((e) => e.department || "").filter(Boolean)
    );
    return { totalEntries: total, departments: departments.size };
  }, [calendarEntries]);

  /* === Render === */

  return (
    <div className="ad-dashboard">
      {/* Error banner */}
      {error && (
        <div className="ad-error-banner">
          <span>{error}</span>
        </div>
      )}

      {/* Header */}
      <header className="ad-header">
        <div className="ad-header__left">
          <h1 className="ad-title">
            <MdAdminPanelSettings className="ad-title__icon" size={22} />
            <span>Admin Overview</span>
          </h1>
          <p className="ad-subtitle">
            Centralized view of users, complaints, resource requests, events and
            academic calendar. Use this dashboard to quickly navigate to admin
            modules.
          </p>
        </div>

        <div className="ad-header__actions">
          <Link to="/admin/users" className="ad-btn ad-btn--primary">
            <MdPeople size={18} />
            <span>Manage Users</span>
          </Link>
          <Link to="/admin/complaints" className="ad-btn ad-btn--ghost">
            <MdReportProblem size={18} />
            <span>View Complaints</span>
          </Link>
        </div>
      </header>

      {/* Top summary row */}
      <section className="ad-section">
        <div className="ad-grid ad-grid--top">
          {/* Users */}
          <article className="ad-card ad-card--stat ad-card--users">
            <div className="ad-card__header-inline">
              <div className="ad-card__title-with-icon">
                <span className="ad-card__circle-icon">
                  <MdPeople size={18} />
                </span>
                <h2 className="ad-card__title">Users</h2>
              </div>
              <Link to="/admin/users" className="ad-link-inline">
                Manage <MdChevronRight size={14} />
              </Link>
            </div>
            <p className="ad-card__label">
              Students, teachers, service providers &amp; server room staff.
            </p>
            <div className="ad-card__stat-main">
              <span className="ad-card__stat-number">
                {usersLoading ? "…" : userStats.total}
              </span>
              <span className="ad-card__stat-caption">total users</span>
            </div>
            <div className="ad-card__stat-row">
              <span>Active: {userStats.active}</span>
              <span>Blocked: {userStats.blocked}</span>
            </div>
          </article>

          {/* Complaints */}
          <article className="ad-card ad-card--stat ad-card--complaints">
            <div className="ad-card__header-inline">
              <div className="ad-card__title-with-icon">
                <span className="ad-card__circle-icon">
                  <MdReportProblem size={18} />
                </span>
                <h2 className="ad-card__title">Complaints</h2>
              </div>
              <Link to="/admin/complaints" className="ad-link-inline">
                Open <MdChevronRight size={14} />
              </Link>
            </div>
            <p className="ad-card__label">
              All complaints from students and teachers across the campus.
            </p>
            <div className="ad-card__stat-main">
              <span className="ad-card__stat-number">
                {complaintsLoading ? "…" : complaintStats.total}
              </span>
              <span className="ad-card__stat-caption">total complaints</span>
            </div>
            <div className="ad-card__stat-row">
              <span>Pending: {complaintStats.pending}</span>
              <span>In Progress: {complaintStats.inProgress}</span>
              <span>Resolved: {complaintStats.resolved}</span>
            </div>
          </article>

          {/* Resource Requests */}
          <article className="ad-card ad-card--stat ad-card--resources">
            <div className="ad-card__header-inline">
              <div className="ad-card__title-with-icon">
                <span className="ad-card__circle-icon">
                  <MdInventory2 size={18} />
                </span>
                <h2 className="ad-card__title">Resource Requests</h2>
              </div>
              <Link
                to="/admin/resource-requests"
                className="ad-link-inline"
              >
                Monitor <MdChevronRight size={14} />
              </Link>
            </div>
            <p className="ad-card__label">
              Requests going through server room staff (lab/IT resources).
            </p>
            <div className="ad-card__stat-main">
              <span className="ad-card__stat-number">
                {resourcesLoading ? "…" : resourceStats.total}
              </span>
              <span className="ad-card__stat-caption">total requests</span>
            </div>
            <div className="ad-card__stat-row">
              <span>Pending: {resourceStats.pending}</span>
              <span>Approved: {resourceStats.approved}</span>
              <span>Rejected: {resourceStats.rejected}</span>
            </div>
          </article>

          {/* Events */}
          <article className="ad-card ad-card--stat ad-card--events">
            <div className="ad-card__header-inline">
              <div className="ad-card__title-with-icon">
                <span className="ad-card__circle-icon">
                  <MdEvent size={18} />
                </span>
                <h2 className="ad-card__title">Events</h2>
              </div>
              <Link to="/admin/events" className="ad-link-inline">
                Events page <MdChevronRight size={14} />
              </Link>
            </div>
            <p className="ad-card__label">
              Seminars, exams, and campus activities for all departments.
            </p>
            <div className="ad-card__stat-main">
              <span className="ad-card__stat-number">
                {eventsLoading ? "…" : eventStats.active}
              </span>
              <span className="ad-card__stat-caption">active events</span>
            </div>
            <div className="ad-card__stat-row">
              <span>Total: {eventStats.total}</span>
            </div>
          </article>
        </div>
      </section>

      {/* Middle row: complaints + resource requests */}
      <section className="ad-section ad-grid ad-grid--main">
        {/* Latest complaints snapshot */}
        <article className="ad-card ad-card--panel">
          <div className="ad-card__header">
            <div className="ad-card__title-with-icon">
              <span className="ad-card__circle-icon ad-card__circle-icon--soft">
                <MdReportProblem size={18} />
              </span>
              <div>
                <h2 className="ad-card__title">Recent Complaints</h2>
                <p className="ad-card__subtitle">
                  Monitor a few of the latest complaints requiring admin
                  attention. Use the complaints page for full details.
                </p>
              </div>
            </div>
            <Link to="/admin/complaints" className="ad-link-btn">
              Complaints
            </Link>
          </div>

          <div className="ad-table__wrapper">
            <table className="ad-table">
              <thead>
                <tr>
                  <th>Sr.</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Priority</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {complaintsLoading ? (
                  <tr>
                    <td colSpan={5}>Loading complaints...</td>
                  </tr>
                ) : recentComplaints.length === 0 ? (
                  <tr>
                    <td colSpan={5}>No complaints found.</td>
                  </tr>
                ) : (
                  recentComplaints.map((c,index) => (
                    <tr key={c.id}>
                      <td>{index+1}</td>
                      <td>{c.title}</td>
                      <td>{c.category}</td>
                      <td>
                        <span
                          className={`ad-badge ad-badge--priority ad-badge--${c.priority.toLowerCase()}`}
                        >
                          {c.priority}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`ad-badge ad-badge--status ad-badge--${c.status.toLowerCase()}`}
                        >
                          {formatStatus(c.status)}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </article>

        {/* Right column: Resource requests + calendar/chatbot */}
        <div className="ad-grid ad-grid--side">
          {/* Resource requests snippet */}
          <article className="ad-card ad-card--panel">
            <div className="ad-card__header">
              <div className="ad-card__title-with-icon">
                <span className="ad-card__circle-icon ad-card__circle-icon--soft">
                  <MdInventory2 size={18} />
                </span>
                <div>
                  <h2 className="ad-card__title">Recent Resource Requests</h2>
                  <p className="ad-card__subtitle">
                    Requests created by teachers; processed by server room
                    staff.
                  </p>
                </div>
              </div>
              <Link
                to="/admin/resource-requests"
                className="ad-link-btn"
              >
                View all
              </Link>
            </div>

            <ul className="ad-list">
              {resourcesLoading ? (
                <li className="ad-list__item">
                  <div className="ad-list__content">
                    <p className="ad-list__title">
                      Loading resource requests...
                    </p>
                  </div>
                </li>
              ) : recentResourceRequests.length === 0 ? (
                <li className="ad-list__item">
                  <div className="ad-list__content">
                    <p className="ad-list__title">
                      No recent resource requests.
                    </p>
                  </div>
                </li>
              ) : (
                recentResourceRequests.map((r) => (
                  <li
                    key={r.id}
                    className="ad-list__item ad-list__item--space"
                  >
                    <div className="ad-list__content">
                      <p className="ad-list__title">{r.purpose}</p>
                      <p className="ad-list__meta">ID: {r.id}</p>
                    </div>
                    <span
                      className={`ad-badge ad-badge--status ad-badge--${r.status.toLowerCase()}`}
                    >
                      {r.status}
                    </span>
                  </li>
                ))
              )}
            </ul>
          </article>

          {/* Calendar / chatbot module */}
          <article className="ad-card ad-card--panel ad-card--calendar">
            <div className="ad-card__header">
              <div className="ad-card__title-with-icon">
                <span className="ad-card__circle-icon ad-card__circle-icon--soft">
                  <MdDashboardCustomize size={18} />
                </span>
                <div>
                  <h2 className="ad-card__title">Academic Calendar & Chatbot</h2>
                  <p className="ad-card__subtitle">
                    Configure department calendar entries that power the teacher
                    and student academic assistants.
                  </p>
                </div>
              </div>
              <Link
                to="/admin/calendar"
                className="ad-link-btn"
              >
                Manage Calendar
              </Link>
            </div>

            <div className="ad-calendar-snippet">
              <p>
                Calendar coverage:{" "}
                <strong>{calendarLoading ? "…" : calendarStats.departments}</strong>{" "}
                departments,{" "}
                <strong>{calendarLoading ? "…" : calendarStats.totalEntries}</strong>{" "}
                entries.
              </p>
              <p>
                Use the <strong>Department Academic Calendar</strong> module to
                define:
              </p>
              <ul>
                <li>Course offering timetables per department</li>
                <li>Enrollment and late-enrollment windows</li>
                <li>Class commencement dates for programs</li>
                <li>Exam weeks and break periods</li>
                <li>ERP attendance open periods</li>
              </ul>
              <p>
                The <strong>Teacher</strong> and <strong>Student</strong>{" "}
                academic assistants use these entries to answer date-related
                questions accurately.
              </p>
              <Link to="/admin/calendar" className="ad-btn ad-btn--ghost">
                <MdChat size={16} />
                <span>Open Calendar / Chatbot Config</span>
              </Link>
            </div>
          </article>
        </div>
      </section>

      {/* Bottom row: Security / system section */}
      <section className="ad-section ad-grid ad-grid--bottom">
        <article className="ad-card ad-card--panel ad-card--security">
          <div className="ad-card__title-with-icon">
            <span className="ad-card__circle-icon ad-card__circle-icon--soft">
              <MdSecurity size={18} />
            </span>
            <h2 className="ad-card__title">System & Security Notes</h2>
          </div>
          <ul className="ad-tips">
            <li>
              Review <strong>user roles</strong> periodically to ensure least
              privilege access for all accounts.
            </li>
            <li>
              Close or resolve old complaints that have been fully addressed to
              keep the queue clean.
            </li>
            <li>
              Coordinate with <strong>server room staff</strong> to ensure
              resource requests are processed on time.
            </li>
            <li>
              Keep the academic calendar updated so the chatbot responses
              remain accurate throughout the semester.
            </li>
          </ul>
        </article>
      </section>
    </div>
  );
};

export default AdminDashboard;
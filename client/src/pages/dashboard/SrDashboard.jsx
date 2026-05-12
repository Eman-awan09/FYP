// // src/pages/dashboardPlaceholder/SrDashboard.jsx
// import React from "react";

// const SrDashboard = () => {
//   return (
//     <div>
//       <h2>Server Room Dashboard</h2>
//       <p>
//         Welcome Server Room Staff! Teacher resource requests will be handled here.
//       </p>
//     </div>
//   );
// };

// export default SrDashboard;
// import React from "react";
// import { Link } from "react-router-dom";
// import {
//   MdStorage,
//   MdInventory2,
//   MdCheckCircle,
//   MdPending,
//   MdWarningAmber,
//   MdInfoOutline,
//   MdChevronRight,
//   MdLaptop,
//   MdSchedule,
// } from "react-icons/md";
// import "./SrDashboard.css";

// const SrDashboard = () => {
//   // Placeholder stats – later you can fetch real data from APIs
//   const requestStats = {
//     total: 42,
//     pending: 7,
//     approved: 28,
//     rejected: 7,
//   };

//   const todayRequests = [
//     {
//       id: "R-401",
//       teacher: "Dr. Ali Ahmed",
//       purpose: "Lab mid-term for CS-301 (Projectors & PCs)",
//       time: "Today · 09:00 AM",
//       status: "PENDING",
//     },
//     {
//       id: "R-402",
//       teacher: "Prof. Sara Khan",
//       purpose: "Seminar AV setup in Auditorium",
//       time: "Today · 02:30 PM",
//       status: "APPROVED",
//     },
//   ];

//   const recentHandled = [
//     {
//       id: "R-395",
//       teacher: "Sir Bilal Hussain",
//       purpose: "Network for workshop",
//       handledBy: "Server Room A",
//       status: "COMPLETED",
//     },
//     {
//       id: "R-392",
//       teacher: "Dr. Sana Tariq",
//       purpose: "Additional laptops for lab exam",
//       handledBy: "Server Room B",
//       status: "APPROVED",
//     },
//   ];

//   return (
//     <div className="sr-dashboard">
//       {/* Header */}
//       <header className="sr-header">
//         <div className="sr-header__left">
//           <h1 className="sr-title">
//             <MdStorage className="sr-title__icon" size={22} />
//             <span>Server Room Overview</span>
//           </h1>
//           <p className="sr-subtitle">
//             Monitor and manage all resource requests from teachers. Plan your
//             day around approved and pending requests to keep labs and events
//             running smoothly.
//           </p>
//         </div>

//         <div className="sr-header__actions">
//           <Link to="/server-room/requests" className="sr-btn sr-btn--primary">
//             <MdInventory2 size={18} />
//             <span>All Requests</span>
//           </Link>
//           <Link to="/server-room/profile" className="sr-btn sr-btn--ghost">
//             <MdLaptop size={18} />
//             <span>My Profile</span>
//           </Link>
//         </div>
//       </header>

//       {/* Info banner */}
//       <div className="sr-info">
//         <MdInfoOutline size={18} />
//         <span>
//           When processing a resource request, always update the status and add a
//           short note, so teachers and admins know what was prepared.
//         </span>
//       </div>

//       {/* Top stat row */}
//       <section className="sr-section">
//         <div className="sr-grid sr-grid--top">
//           {/* Total Requests */}
//           <article className="sr-card sr-card--stat sr-card--total">
//             <div className="sr-card__header-inline">
//               <div className="sr-card__title-with-icon">
//                 <span className="sr-card__circle-icon">
//                   <MdInventory2 size={18} />
//                 </span>
//                 <h2 className="sr-card__title">All Resource Requests</h2>
//               </div>
//               <Link to="/server-room/requests" className="sr-link-inline">
//                 View All <MdChevronRight size={14} />
//               </Link>
//             </div>
//             <p className="sr-card__label">
//               All requests from teachers for labs, seminars and exams.
//             </p>
//             <div className="sr-card__stat-main">
//               <span className="sr-card__stat-number">{requestStats.total}</span>
//               <span className="sr-card__stat-caption">total requests</span>
//             </div>
//             <div className="sr-card__stat-row">
//               <span>Pending: {requestStats.pending}</span>
//               <span>Approved: {requestStats.approved}</span>
//               <span>Rejected: {requestStats.rejected}</span>
//             </div>
//           </article>

//           {/* Pending */}
//           <article className="sr-card sr-card--stat sr-card--pending">
//             <div className="sr-card__header-inline">
//               <div className="sr-card__title-with-icon">
//                 <span className="sr-card__circle-icon">
//                   <MdPending size={18} />
//                 </span>
//                 <h2 className="sr-card__title">Pending</h2>
//               </div>
//             </div>
//             <p className="sr-card__label">
//               Requests waiting for your decision or scheduling.
//             </p>
//             <div className="sr-card__stat-main">
//               <span className="sr-card__stat-number">{requestStats.pending}</span>
//               <span className="sr-card__stat-caption">awaiting action</span>
//             </div>
//           </article>

//           {/* Approved */}
//           <article className="sr-card sr-card--stat sr-card--approved">
//             <div className="sr-card__header-inline">
//               <div className="sr-card__title-with-icon">
//                 <span className="sr-card__circle-icon">
//                   <MdCheckCircle size={18} />
//                 </span>
//                 <h2 className="sr-card__title">Approved</h2>
//               </div>
//             </div>
//             <p className="sr-card__label">
//               Approved requests for which resources must be prepared in time.
//             </p>
//             <div className="sr-card__stat-main">
//               <span className="sr-card__stat-number">{requestStats.approved}</span>
//               <span className="sr-card__stat-caption">in the queue</span>
//             </div>
//           </article>

//           {/* Rejected */}
//           <article className="sr-card sr-card--stat sr-card--rejected">
//             <div className="sr-card__header-inline">
//               <div className="sr-card__title-with-icon">
//                 <span className="sr-card__circle-icon">
//                   <MdWarningAmber size={18} />
//                 </span>
//                 <h2 className="sr-card__title">Rejected</h2>
//               </div>
//             </div>
//             <p className="sr-card__label">
//               Requests that could not be fulfilled. Keep reasons documented.
//             </p>
//             <div className="sr-card__stat-main">
//               <span className="sr-card__stat-number">{requestStats.rejected}</span>
//               <span className="sr-card__stat-caption">not fulfilled</span>
//             </div>
//           </article>
//         </div>
//       </section>

//       {/* Middle row: today's schedule + recent handled */}
//       <section className="sr-section sr-grid sr-grid--main">
//         {/* Today’s schedule */}
//         <article className="sr-card sr-card--panel">
//           <div className="sr-card__header">
//             <div className="sr-card__title-with-icon">
//               <span className="sr-card__circle-icon sr-card__circle-icon--soft">
//                 <MdSchedule size={18} />
//               </span>
//               <div>
//                 <h2 className="sr-card__title">Today&apos;s Schedule</h2>
//                 <p className="sr-card__subtitle">
//                   Requests that require resources today. Verify timing and
//                   items carefully.
//                 </p>
//               </div>
//             </div>
//             <Link to="/server-room/requests" className="sr-link-btn">
//               All Requests
//             </Link>
//           </div>

//           <div className="sr-table__wrapper">
//             <table className="sr-table">
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Teacher</th>
//                   <th>Purpose</th>
//                   <th>Time</th>
//                   <th>Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {todayRequests.map((r) => (
//                   <tr key={r.id}>
//                     <td>{r.id}</td>
//                     <td>{r.teacher}</td>
//                     <td>{r.purpose}</td>
//                     <td>{r.time}</td>
//                     <td>
//                       <span
//                         className={`sr-badge sr-badge--status sr-badge--${r.status.toLowerCase()}`}
//                       >
//                         {r.status}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </article>

//         {/* Right column: recently handled + tips */}
//         <div className="sr-grid sr-grid--side">
//           {/* Recently handled */}
//           <article className="sr-card sr-card--panel">
//             <div className="sr-card__header">
//               <div className="sr-card__title-with-icon">
//                 <span className="sr-card__circle-icon sr-card__circle-icon--soft">
//                   <MdCheckCircle size={18} />
//                 </span>
//                 <div>
//                   <h2 className="sr-card__title">Recently Handled</h2>
//                   <p className="sr-card__subtitle">
//                     A quick snapshot of requests you or your team recently
//                     processed.
//                   </p>
//                 </div>
//               </div>
//             </div>
//             <ul className="sr-list">
//               {recentHandled.map((r) => (
//                 <li key={r.id} className="sr-list__item">
//                   <div className="sr-list__dot" />
//                   <div className="sr-list__content">
//                     <p className="sr-list__title">{r.purpose}</p>
//                     <p className="sr-list__meta">
//                       {r.teacher} · Handled by {r.handledBy} · {r.status}
//                     </p>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </article>

//           {/* Tips */}
//           <article className="sr-card sr-card--panel">
//             <div className="sr-card__title-with-icon">
//               <span className="sr-card__circle-icon sr-card__circle-icon--soft">
//                 <MdInfoOutline size={18} />
//               </span>
//               <h2 className="sr-card__title">Operational Tips</h2>
//             </div>
//             <p className="sr-card__subtitle">
//               Consistent handling and documentation of requests improves
//               reliability of lab and exam operations.
//             </p>

//             <ul className="sr-tips">
//               <li>
//                 Check <strong>inventory availability</strong> before approving a
//                 request.
//               </li>
//               <li>
//                 Coordinate with <strong>teachers</strong> for large events to
//                 avoid clashes in equipment usage.
//               </li>
//               <li>
//                 Use notes on the request details page to{" "}
//                 <strong>document what was provided</strong> and where.
//               </li>
//             </ul>
//           </article>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default SrDashboard;
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  MdStorage,
  MdInventory2,
  MdCheckCircle,
  MdPending,
  MdWarningAmber,
  MdInfoOutline,
  MdChevronRight,
  MdLaptop,
  MdSchedule,
} from "react-icons/md";
import "./SrDashboard.css";

import { fetchServerRoomResourceRequestsApi } from "../../api/resourceRequestsApi";
import { useMyProfile } from "../../hooks/useMyProfile";

const SrDashboard = () => {
  const { profile } = useMyProfile();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load all resource requests for server-room staff
  useEffect(() => {
    const loadRequests = async () => {
      try {
        setError("");
        setLoading(true);
        const data = await fetchServerRoomResourceRequestsApi();
        // assuming API returns { requests: [...] } or { resourceRequests: [...] }
        const list =
          data.requests || data.resourceRequests || data || [];
        setRequests(list);
      } catch (err) {
        console.error("Error loading server-room resource requests:", err);
        setError(
          err?.response?.data?.message ||
            "Failed to load resource requests for dashboard."
        );
      } finally {
        setLoading(false);
      }
    };

    loadRequests();
  }, []);

  // Derived stats from real requests
  const requestStats = useMemo(() => {
    const total = requests.length;
    const pending = requests.filter((r) => r.status === "PENDING").length;
    const approved = requests.filter((r) => r.status === "APPROVED").length;
    const rejected = requests.filter((r) => r.status === "REJECTED").length;
    return { total, pending, approved, rejected };
  }, [requests]);

  // Helper to check if request is today
  const getTodayRange = () => {
    const now = new Date();
    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      0,
      0,
      0,
      0
    );
    const endOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      23,
      59,
      59,
      999
    );
    return { startOfToday, endOfToday };
  };

  // Today requests based on dateTime
  const todayRequests = useMemo(() => {
    if (!requests || requests.length === 0) return [];
    const { startOfToday, endOfToday } = getTodayRange();

    const todays = requests.filter((r) => {
      const dt = new Date(r.dateTime);
      return dt >= startOfToday && dt <= endOfToday;
    });

    // Sort by time ascending
    todays.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));

    return todays.map((r) => ({
      id: r._id,
      teacher: r.requestedByTeacher?.name || "Teacher",
      purpose: r.purpose,
      time: r.dateTime ? new Date(r.dateTime).toLocaleString() : "-",
      status: r.status,
    }));
  }, [requests]);

  // Recently handled: latest non-pending requests
  const recentHandled = useMemo(() => {
    const handled = requests.filter(
      (r) => r.status !== "PENDING"
    );

    handled.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

    return handled.slice(0, 4).map((r) => ({
      id: r._id,
      teacher: r.requestedByTeacher?.name || "Teacher",
      purpose: r.purpose,
      handledBy:
        r.handledByServerRoomStaff?.name || "Server Room Staff",
      status: r.status,
    }));
  }, [requests]);

  return (
    <div className="sr-dashboard">
      {/* Error banner if needed */}
      {error && (
        <div className="sr-error-banner">
          <span>{error}</span>
        </div>
      )}

      {/* Header */}
      <header className="sr-header">
        <div className="sr-header__left">
          <h1 className="sr-title">
            <MdStorage className="sr-title__icon" size={22} />
            <span>Server Room Overview</span>
          </h1>
          <p className="sr-subtitle">
            Monitor and manage all resource requests from teachers. Plan your
            day around approved and pending requests to keep labs and events
            running smoothly.
          </p>
        </div>

        <div className="sr-header__actions">
          <Link to="/server-room/requests" className="sr-btn sr-btn--primary">
            <MdInventory2 size={18} />
            <span>All Requests</span>
          </Link>
          <Link to="/server-room/profile" className="sr-btn sr-btn--ghost">
            <MdLaptop size={18} />
            <span>My Profile</span>
          </Link>
        </div>
      </header>

      {/* Info banner */}
      <div className="sr-info">
        <MdInfoOutline size={18} />
        <span>
          When processing a resource request, always update the status and add a
          short note, so teachers and admins know what was prepared.
        </span>
      </div>

      {/* Top stat row */}
      <section className="sr-section">
        <div className="sr-grid sr-grid--top">
          {/* Total Requests */}
          <article className="sr-card sr-card--stat sr-card--total">
            <div className="sr-card__header-inline">
              <div className="sr-card__title-with-icon">
                <span className="sr-card__circle-icon">
                  <MdInventory2 size={18} />
                </span>
                <h2 className="sr-card__title">All Resource Requests</h2>
              </div>
              <Link to="/server-room/requests" className="sr-link-inline">
                View All <MdChevronRight size={14} />
              </Link>
            </div>
            <p className="sr-card__label">
              All requests from teachers for labs, seminars and exams.
            </p>
            <div className="sr-card__stat-main">
              <span className="sr-card__stat-number">{requestStats.total}</span>
              <span className="sr-card__stat-caption">total requests</span>
            </div>
            <div className="sr-card__stat-row">
              <span>Pending: {requestStats.pending}</span>
              <span>Approved: {requestStats.approved}</span>
              <span>Rejected: {requestStats.rejected}</span>
            </div>
          </article>

          {/* Pending */}
          <article className="sr-card sr-card--stat sr-card--pending">
            <div className="sr-card__header-inline">
              <div className="sr-card__title-with-icon">
                <span className="sr-card__circle-icon">
                  <MdPending size={18} />
                </span>
                <h2 className="sr-card__title">Pending</h2>
              </div>
            </div>
            <p className="sr-card__label">
              Requests waiting for your decision or scheduling.
            </p>
            <div className="sr-card__stat-main">
              <span className="sr-card__stat-number">
                {requestStats.pending}
              </span>
              <span className="sr-card__stat-caption">awaiting action</span>
            </div>
          </article>

          {/* Approved */}
          <article className="sr-card sr-card--stat sr-card--approved">
            <div className="sr-card__header-inline">
              <div className="sr-card__title-with-icon">
                <span className="sr-card__circle-icon">
                  <MdCheckCircle size={18} />
                </span>
                <h2 className="sr-card__title">Approved</h2>
              </div>
            </div>
            <p className="sr-card__label">
              Approved requests for which resources must be prepared in time.
            </p>
            <div className="sr-card__stat-main">
              <span className="sr-card__stat-number">
                {requestStats.approved}
              </span>
              <span className="sr-card__stat-caption">in the queue</span>
            </div>
          </article>

          {/* Rejected */}
          <article className="sr-card sr-card--stat sr-card--rejected">
            <div className="sr-card__header-inline">
              <div className="sr-card__title-with-icon">
                <span className="sr-card__circle-icon">
                  <MdWarningAmber size={18} />
                </span>
                <h2 className="sr-card__title">Rejected</h2>
              </div>
            </div>
            <p className="sr-card__label">
              Requests that could not be fulfilled. Keep reasons documented.
            </p>
            <div className="sr-card__stat-main">
              <span className="sr-card__stat-number">
                {requestStats.rejected}
              </span>
              <span className="sr-card__stat-caption">not fulfilled</span>
            </div>
          </article>
        </div>
      </section>

      {/* Middle row: today's schedule + recent handled */}
      <section className="sr-section sr-grid sr-grid--main">
        {/* Today’s schedule */}
        <article className="sr-card sr-card--panel">
          <div className="sr-card__header">
            <div className="sr-card__title-with-icon">
              <span className="sr-card__circle-icon sr-card__circle-icon--soft">
                <MdSchedule size={18} />
              </span>
              <div>
                <h2 className="sr-card__title">Today&apos;s Schedule</h2>
                <p className="sr-card__subtitle">
                  Requests that require resources today. Verify timing and
                  items carefully.
                </p>
              </div>
            </div>
            <Link to="/server-room/requests" className="sr-link-btn">
              All Requests
            </Link>
          </div>

          <div className="sr-table__wrapper">
            <table className="sr-table">
              <thead>
                <tr>
                  <th>Sr.</th>
                  <th>Teacher</th>
                  <th>Purpose</th>
                  <th>Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5}>Loading today&apos;s requests...</td>
                  </tr>
                ) : todayRequests.length === 0 ? (
                  <tr>
                    <td colSpan={5}>No requests scheduled for today.</td>
                  </tr>
                ) : (
                  todayRequests.map((r,index) => (
                    <tr key={r.id}>
                      <td>{index+1}</td>
                      <td>{r.teacher}</td>
                      <td>{r.purpose}</td>
                      <td>{r.time}</td>
                      <td>
                        <span
                          className={`sr-badge sr-badge--status sr-badge--${r.status.toLowerCase()}`}
                        >
                          {r.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </article>

        {/* Right column: recently handled + tips */}
        <div className="sr-grid sr-grid--side">
          {/* Recently handled */}
          <article className="sr-card sr-card--panel">
            <div className="sr-card__header">
              <div className="sr-card__title-with-icon">
                <span className="sr-card__circle-icon sr-card__circle-icon--soft">
                  <MdCheckCircle size={18} />
                </span>
                <div>
                  <h2 className="sr-card__title">Recently Handled</h2>
                  <p className="sr-card__subtitle">
                    A quick snapshot of requests you or your team recently
                    processed.
                  </p>
                </div>
              </div>
            </div>
            <ul className="sr-list">
              {loading ? (
                <li className="sr-list__item">
                  <div className="sr-list__content">
                    <p className="sr-list__title">Loading recent requests...</p>
                  </div>
                </li>
              ) : recentHandled.length === 0 ? (
                <li className="sr-list__item">
                  <div className="sr-list__content">
                    <p className="sr-list__title">
                      No recently handled requests.
                    </p>
                  </div>
                </li>
              ) : (
                recentHandled.map((r) => (
                  <li key={r.id} className="sr-list__item">
                    <div className="sr-list__dot" />
                    <div className="sr-list__content">
                      <p className="sr-list__title">{r.purpose}</p>
                      <p className="sr-list__meta">
                        {r.teacher} · Handled by {r.handledBy} · {r.status}
                      </p>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </article>

          {/* Tips */}
          <article className="sr-card sr-card--panel">
            <div className="sr-card__title-with-icon">
              <span className="sr-card__circle-icon sr-card__circle-icon--soft">
                <MdInfoOutline size={18} />
              </span>
              <h2 className="sr-card__title">Operational Tips</h2>
            </div>
            <p className="sr-card__subtitle">
              Consistent handling and documentation of requests improves
              reliability of lab and exam operations.
            </p>

            <ul className="sr-tips">
              <li>
                Check <strong>inventory availability</strong> before approving a
                request.
              </li>
              <li>
                Coordinate with <strong>teachers</strong> for large events to
                avoid clashes in equipment usage.
              </li>
              <li>
                Use notes on the request details page to{" "}
                <strong>document what was provided</strong> and where.
              </li>
            </ul>
          </article>
        </div>
      </section>
    </div>
  );
};

export default SrDashboard;
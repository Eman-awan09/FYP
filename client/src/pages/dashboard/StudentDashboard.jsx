// // src/pages/dashboardPlaceholder/StudentDashboard.jsx
// import React from 'react';

// const StudentDashboard = () => {
//   return (
//     <div>
//       <h2>Student Dashboard</h2>
//       <p>Welcome! This is a placeholder. Complaints, events, and chatbot will be added here.</p>
//     </div>
//   );
// };

// export default StudentDashboard;
// src/pages/dashboardPlaceholder/StudentDashboard.jsx
// import React from "react";
// import { Link } from "react-router-dom";
// import {
//   MdReportProblem,
//   MdEvent,
//   MdSmartToy,
//   MdArrowForward,
//   MdPerson,
//   MdEditNote,
//   MdSchool,
// } from "react-icons/md";
// import "./StudentDashboard.css";

// /**
//  * StudentDashboard
//  *
//  * Overview of:
//  *  - Complaints: counts + recent items (placeholder data)
//  *  - Events: summary + highlighted items (placeholder)
//  *  - Chatbot: quick entry
//  *  - Profile: snapshot (placeholder)
//  *
//  * All numbers/lists are placeholders and should be replaced
//  * with real API data when available.
//  */
// const StudentDashboard = () => {
//   // === Placeholder data (replace with real data from APIs) ===

//   const complaintSummary = {
//     total: 8,
//     pending: 3,
//     inProgress: 2,
//     resolved: 3,
//   };

//   const recentComplaints = [
//     {
//       id: "C-S-1040",
//       title: "Wi‑Fi not working in hostel",
//       category: "IT Services",
//       priority: "HIGH",
//       status: "PENDING",
//       createdAt: "2026-02-05T09:15:00Z",
//     },
//     {
//       id: "C-S-1039",
//       title: "Broken fans in CS‑101 classroom",
//       category: "Classroom",
//       priority: "INTERMEDIATE",
//       status: "IN_PROGRESS",
//       createdAt: "2026-02-03T11:20:00Z",
//     },
//     {
//       id: "C-S-1037",
//       title: "Leaking tap in hostel washroom",
//       category: "Hostel",
//       priority: "LOW",
//       status: "RESOLVED",
//       createdAt: "2026-01-30T07:45:00Z",
//     },
//   ];

//   const eventsSummary = {
//     upcoming: 3,
//     today: 1,
//     past: 4,
//   };

//   const highlightEvents = [
//     {
//       id: "E-S-210",
//       title: "Department Orientation",
//       when: "Today · 09:00 AM",
//       location: "CS Auditorium",
//     },
//     {
//       id: "E-S-211",
//       title: "Career Counseling Session",
//       when: "Feb 20 · 11:30 AM",
//       location: "Seminar Hall",
//     },
//   ];

//   const profileSnapshot = {
//     name: "Example Student",
//     email: "student@example.edu",
//     department: "Computer Science",
//     program: "BSCS 4th Semester",
//   };

//   return (
//     <div className="student-dashboard">
//       {/* ==== Page Header ==== */}
//       <header className="student-dashboard__header">
//         <div>
//           <h1 className="student-dashboard__title">Student Overview</h1>
//           <p className="student-dashboard__subtitle">
//             Quick access to your complaints, events, academic assistant and
//             profile in one place.
//           </p>
//         </div>
//         <div className="student-dashboard__header-actions">
//           <Link
//             to="/student/complaints/new"
//             className="sd-btn sd-btn--primary"
//           >
//             <MdReportProblem size={18} />
//             <span>New Complaint</span>
//           </Link>
//           <Link to="/student/events" className="sd-btn sd-btn--ghost">
//             <MdEvent size={18} />
//             <span>Events</span>
//           </Link>
//         </div>
//       </header>

//       {/* ==== Top Stat Row: Complaints, Events, Chatbot, Profile ==== */}
//       <section className="student-dashboard__section">
//         <div className="sd-grid sd-grid--top">
//           {/* Complaints summary */}
//           <article className="sd-card sd-card--stat sd-card--warning">
//             <div className="sd-card__header-inline">
//               <div className="sd-card__title-with-icon">
//                 <span className="sd-card__circle-icon">
//                   <MdReportProblem size={18} />
//                 </span>
//                 <h2 className="sd-card__title">My Complaints</h2>
//               </div>
//               <Link to="/student/complaints" className="sd-link-inline">
//                 View all <MdArrowForward size={14} />
//               </Link>
//             </div>
//             <p className="sd-card__label">
//               Issues you have reported across campus
//             </p>
//             <div className="sd-card__stat-main">
//               <span className="sd-card__stat-number">
//                 {complaintSummary.total}
//               </span>
//               <span className="sd-card__stat-caption">total complaints</span>
//             </div>
//             <div className="sd-card__stat-row">
//               <span>Pending: {complaintSummary.pending}</span>
//               <span>In Progress: {complaintSummary.inProgress}</span>
//               <span>Resolved: {complaintSummary.resolved}</span>
//             </div>
//           </article>

//           {/* Events summary */}
//           <article className="sd-card sd-card--stat sd-card--neutral">
//             <div className="sd-card__header-inline">
//               <div className="sd-card__title-with-icon">
//                 <span className="sd-card__circle-icon">
//                   <MdEvent size={18} />
//                 </span>
//                 <h2 className="sd-card__title">Campus Events</h2>
//               </div>
//               <Link to="/student/events" className="sd-link-inline">
//                 Events page <MdArrowForward size={14} />
//               </Link>
//             </div>
//             <p className="sd-card__label">
//               Academic calendar, seminars &amp; important activities
//             </p>
//             <div className="sd-card__stat-main">
//               <span className="sd-card__stat-number">
//                 {eventsSummary.upcoming}
//               </span>
//               <span className="sd-card__stat-caption">upcoming</span>
//             </div>
//             <div className="sd-card__stat-row">
//               <span>Today: {eventsSummary.today}</span>
//               <span>Past: {eventsSummary.past}</span>
//             </div>
//           </article>

//           {/* Chatbot quick access */}
//           <article className="sd-card sd-card--stat sd-card--chatbot">
//             <div className="sd-card__header-inline">
//               <div className="sd-card__title-with-icon">
//                 <span className="sd-card__circle-icon">
//                   <MdSmartToy size={18} />
//                 </span>
//                 <h2 className="sd-card__title">Academic Assistant</h2>
//               </div>
//               <Link to="/student/chatbot" className="sd-link-inline">
//                 Open <MdArrowForward size={14} />
//               </Link>
//             </div>
//             <p className="sd-card__label">
//               Ask about timetables, enrollment, ERP and more.
//             </p>
//             <form
//               className="sd-chat-quick"
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 // Optional: redirect to chatbot with query param if desired
//               }}
//             >
//               <input
//                 className="sd-chat-quick__input"
//                 type="text"
//                 placeholder="Ask about timetable, exams, ERP..."
//               />
//               <button type="submit" className="sd-chat-quick__btn">
//                 Go
//               </button>
//             </form>
//           </article>

//           {/* Profile snapshot (small) */}
//           <article className="sd-card sd-card--stat sd-card--profile-mini">
//             <div className="sd-card__header-inline">
//               <div className="sd-card__title-with-icon">
//                 <span className="sd-card__circle-icon">
//                   <MdPerson size={18} />
//                 </span>
//                 <h2 className="sd-card__title">My Profile</h2>
//               </div>
//               <Link to="/student/profile" className="sd-link-inline">
//                 Edit <MdArrowForward size={14} />
//               </Link>
//             </div>
//             <div className="sd-mini-profile">
//               <div className="sd-mini-profile__avatar">
//                 {profileSnapshot.name.charAt(0)}
//               </div>
//               <div className="sd-mini-profile__info">
//                 <p className="sd-mini-profile__name">{profileSnapshot.name}</p>
//                 <p className="sd-mini-profile__meta">
//                   {profileSnapshot.program}
//                 </p>
//                 <p className="sd-mini-profile__meta">
//                   <MdSchool size={14} /> {profileSnapshot.department}
//                 </p>
//               </div>
//             </div>
//           </article>
//         </div>
//       </section>

//       {/* ==== Middle Row: Complaints + Events Highlights ==== */}
//       <section className="student-dashboard__section sd-grid sd-grid--main">
//         {/* Recent complaints table snippet */}
//         <article className="sd-card sd-card--panel">
//           <div className="sd-card__header">
//             <div className="sd-card__title-with-icon">
//               <span className="sd-card__circle-icon sd-card__circle-icon--soft">
//                 <MdReportProblem size={18} />
//               </span>
//               <div>
//                 <h2 className="sd-card__title">Recent Complaints</h2>
//                 <p className="sd-card__subtitle">
//                   Latest complaints that you have submitted. Manage all details
//                   on the complaints page.
//                 </p>
//               </div>
//             </div>
//             <Link to="/student/complaints" className="sd-link-btn">
//               Complaints Page
//             </Link>
//           </div>

//           <div className="sd-table__wrapper">
//             <table className="sd-table">
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
//                 {recentComplaints.map((c) => (
//                   <tr key={c.id}>
//                     <td>{c.id}</td>
//                     <td>{c.title}</td>
//                     <td>{c.category}</td>
//                     <td>
//                       <span
//                         className={`sd-badge sd-badge--priority sd-badge--${c.priority.toLowerCase()}`}
//                       >
//                         {c.priority}
//                       </span>
//                     </td>
//                     <td>
//                       <span
//                         className={`sd-badge sd-badge--status sd-badge--${c.status.toLowerCase()}`}
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

//         {/* Right column: Events preview + quick tips */}
//         <div className="sd-grid sd-grid--side">
//           {/* Highlight events */}
//           <article className="sd-card sd-card--panel">
//             <div className="sd-card__header">
//               <div className="sd-card__title-with-icon">
//                 <span className="sd-card__circle-icon sd-card__circle-icon--soft">
//                   <MdEvent size={18} />
//                 </span>
//                 <div>
//                   <h2 className="sd-card__title">Highlighted Events</h2>
//                   <p className="sd-card__subtitle">
//                     Today &amp; upcoming events you should know about.
//                   </p>
//                 </div>
//               </div>
//               <Link to="/student/events" className="sd-link-btn">
//                 All Events
//               </Link>
//             </div>
//             <ul className="sd-list">
//               {highlightEvents.map((ev) => (
//                 <li key={ev.id} className="sd-list__item">
//                   <div className="sd-list__dot" />
//                   <div className="sd-list__content">
//                     <p className="sd-list__title">{ev.title}</p>
//                     <p className="sd-list__meta">
//                       {ev.when} · {ev.location}
//                     </p>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </article>

//           {/* Quick usage tips */}
//           <article className="sd-card sd-card--panel sd-card--tips">
//             <div className="sd-card__title-with-icon">
//               <span className="sd-card__circle-icon sd-card__circle-icon--soft">
//                 <MdSmartToy size={18} />
//               </span>
//               <h2 className="sd-card__title">Using the Student Module</h2>
//             </div>
//             <ul className="sd-tips">
//               <li>
//                 <strong>Complaints:</strong> Report issues with classrooms,
//                 labs, hostels or IT. You can edit or delete while status is{" "}
//                 <code>PENDING</code>.
//               </li>
//               <li>
//                 <strong>Events:</strong> Check <code>Campus Events</code> for
//                 orientations, seminars, exams and important dates.
//               </li>
//               <li>
//                 <strong>Chatbot:</strong> Use the{" "}
//                 <code>Academic Assistant</code> to ask about academic calendar,
//                 enrollment and ERP rules.
//               </li>
//               <li>
//                 <strong>Profile:</strong> Keep your personal and department
//                 information up to date for accurate records.
//               </li>
//             </ul>
//           </article>
//         </div>
//       </section>

//       {/* ==== Bottom Row: Full Profile Snapshot ==== */}
//       <section className="student-dashboard__section sd-grid sd-grid--bottom">
//         <article className="sd-card sd-card--panel sd-card--profile">
//           <div className="sd-card__header">
//             <div className="sd-card__title-with-icon">
//               <span className="sd-card__circle-icon sd-card__circle-icon--soft">
//                 <MdPerson size={18} />
//               </span>
//               <div>
//                 <h2 className="sd-card__title">Profile Snapshot</h2>
//                 <p className="sd-card__subtitle">
//                   Basic information that will be loaded from your profile page.
//                 </p>
//               </div>
//             </div>
//             <Link to="/student/profile" className="sd-link-btn">
//               <MdEditNote size={16} />
//               <span>Edit Profile</span>
//             </Link>
//           </div>

//           <div className="sd-profile">
//             <div className="sd-profile__avatar">
//               {profileSnapshot.name.charAt(0)}
//             </div>
//             <div className="sd-profile__info">
//               <p className="sd-profile__name">{profileSnapshot.name}</p>
//               <p className="sd-profile__meta">{profileSnapshot.email}</p>
//               <p className="sd-profile__meta">
//                 Department: {profileSnapshot.department}
//               </p>
//               <p className="sd-profile__meta">
//                 Program: {profileSnapshot.program}
//               </p>
//             </div>
//           </div>
//         </article>
//       </section>
//     </div>
//   );
// };

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

// export default StudentDashboard;

// src/pages/dashboardPlaceholder/StudentDashboard.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  MdReportProblem,
  MdEvent,
  MdSmartToy,
  MdArrowForward,
  MdChevronRight,
  MdPerson,
  MdEditNote,
  MdSchool,
} from "react-icons/md";
import "./StudentDashboard.css";

import { fetchMyComplaintsApi } from "../../api/complaintsApi";
import { fetchEventsApi } from "../../api/eventsApi";
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

/**
 * Categorize events by date
 */
function categorizeEventsByDate(events) {
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

  const pastEvents = [];
  const todayEvents = [];
  const upcomingEvents = [];

  events.forEach((event) => {
    const eventDate = new Date(event.date);

    if (eventDate < startOfToday) {
      pastEvents.push(event);
    } else if (eventDate > endOfToday) {
      upcomingEvents.push(event);
    } else {
      todayEvents.push(event);
    }
  });

  pastEvents.sort((a, b) => new Date(b.date) - new Date(a.date));
  todayEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
  upcomingEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

  return { pastEvents, todayEvents, upcomingEvents };
}

const StudentDashboard = () => {
  const { profile } = useMyProfile();

  const [complaints, setComplaints] = useState([]);
  const [complaintsLoading, setComplaintsLoading] = useState(false);

  const [events, setEvents] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(false);

  const [error, setError] = useState("");

  // Load student's own complaints
  useEffect(() => {
    const loadComplaints = async () => {
      try {
        setComplaintsLoading(true);
        const data = await fetchMyComplaintsApi();
        setComplaints(data.complaints || []);
      } catch (err) {
        console.error("Error loading student complaints:", err);
        setError(
          err?.response?.data?.message ||
            "Failed to load complaints data for dashboard."
        );
      } finally {
        setComplaintsLoading(false);
      }
    };

    loadComplaints();
  }, []);

  // Load events
  useEffect(() => {
    const loadEvents = async () => {
      try {
        setEventsLoading(true);
        const data = await fetchEventsApi();
        setEvents(data.events || []);
      } catch (err) {
        console.error("Error loading events:", err);
        setError(
          err?.response?.data?.message ||
            "Failed to load events data for dashboard."
        );
      } finally {
        setEventsLoading(false);
      }
    };

    loadEvents();
  }, []);

  // Complaint summary from real data
  const complaintSummary = useMemo(() => {
    const total = complaints.length;
    const pending = complaints.filter((c) => c.status === "PENDING").length;
    const inProgress = complaints.filter(
      (c) => c.status === "IN_PROGRESS"
    ).length;
    const resolved = complaints.filter(
      (c) => c.status === "RESOLVED"
    ).length;
    return { total, pending, inProgress, resolved };
  }, [complaints]);

  // Recent complaints (3 latest)
  const recentComplaints = useMemo(() => {
    const sorted = [...complaints].sort(
      (a, b) => new Date(b.createdAt || b.updatedAt) - new Date(a.createdAt || a.updatedAt)
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

  // Events summary & highlights
  const { pastEvents, todayEvents, upcomingEvents } = useMemo(
    () => categorizeEventsByDate(events),
    [events]
  );

  const eventsSummary = useMemo(
    () => ({
      upcoming: upcomingEvents.length,
      today: todayEvents.length,
      past: pastEvents.length,
    }),
    [upcomingEvents.length, todayEvents.length, pastEvents.length]
  );

  const highlightEvents = useMemo(() => {
    const highlights = [...todayEvents, ...upcomingEvents].slice(0, 2);
    return highlights.map((ev) => ({
      id: ev._id,
      title: ev.title,
      when: new Date(ev.date).toLocaleString(),
      location: ev.venue,
    }));
  }, [todayEvents, upcomingEvents]);

  // Profile snapshot from useMyProfile
  const profileSnapshot = useMemo(() => {
    const name = profile?.name || "Student";
    const email = profile?.email || "";
    const department = profile?.department || "Not set";
    const program = profile?.semester || "Program not set";

    return { name, email, department, program };
  }, [profile]);

  return (
    <div className="student-dashboard">
      {/* Optional error banner */}
      {error && (
        <div className="sd-error-banner">
          <span>{error}</span>
        </div>
      )}

      {/* ==== Page Header ==== */}
      <header className="student-dashboard__header">
        <div>
          <h1 className="student-dashboard__title">Student Overview</h1>
          <p className="student-dashboard__subtitle">
            Quick access to your complaints, events, academic assistant and
            profile in one place.
          </p>
        </div>
        <div className="student-dashboard__header-actions">
          <Link
            to="/student/complaints/new"
            className="sd-btn sd-btn--primary"
          >
            <MdReportProblem size={18} />
            <span>New Complaint</span>
          </Link>
          <Link to="/student/events" className="sd-btn sd-btn--ghost">
            <MdEvent size={18} />
            <span>Events</span>
          </Link>
        </div>
      </header>

      {/* ==== Top Stat Row: Complaints, Events, Chatbot, Profile ==== */}
      <section className="student-dashboard__section">
        <div className="sd-grid sd-grid--top">
          {/* Complaints summary */}
          <article className="sd-card sd-card--stat sd-card--warning">
            <div className="sd-card__header-inline">
              <div className="sd-card__title-with-icon">
                <span className="sd-card__circle-icon">
                  <MdReportProblem size={18} />
                </span>
                <h2 className="sd-card__title">My Complaints</h2>
              </div>
              <Link to="/student/complaints" className="sd-link-inline">
                View all <MdChevronRight size={14} />
              </Link>
            </div>
            <p className="sd-card__label">
              Issues you have reported across campus.
            </p>
            <div className="sd-card__stat-main">
              <span className="sd-card__stat-number">
                {complaintSummary.total}
              </span>
              <span className="sd-card__stat-caption">total complaints</span>
            </div>
            <div className="sd-card__stat-row">
              <span>Pending: {complaintSummary.pending}</span>
              <span>In Progress: {complaintSummary.inProgress}</span>
              <span>Resolved: {complaintSummary.resolved}</span>
            </div>
          </article>

          {/* Events summary */}
          <article className="sd-card sd-card--stat sd-card--neutral">
            <div className="sd-card__header-inline">
              <div className="sd-card__title-with-icon">
                <span className="sd-card__circle-icon">
                  <MdEvent size={18} />
                </span>
                <h2 className="sd-card__title">Campus Events</h2>
              </div>
              <Link to="/student/events" className="sd-link-inline">
                Events page <MdChevronRight size={14} />
              </Link>
            </div>
            <p className="sd-card__label">
              Academic calendar, seminars &amp; important activities.
            </p>
            <div className="sd-card__stat-main">
              <span className="sd-card__stat-number">
                {eventsSummary.upcoming}
              </span>
              <span className="sd-card__stat-caption">upcoming</span>
            </div>
            <div className="sd-card__stat-row">
              <span>Today: {eventsSummary.today}</span>
              <span>Past: {eventsSummary.past}</span>
            </div>
          </article>

          {/* Chatbot quick access */}
          <article className="sd-card sd-card--stat sd-card--chatbot">
            <div className="sd-card__header-inline">
              <div className="sd-card__title-with-icon">
                <span className="sd-card__circle-icon">
                  <MdSmartToy size={18} />
                </span>
                <h2 className="sd-card__title">Academic Assistant</h2>
              </div>
              <Link to="/student/chatbot" className="sd-link-inline">
                Open <MdChevronRight size={14} />
              </Link>
            </div>
            <p className="sd-card__label">
              Ask about timetables, enrollment, ERP and more.
            </p>
            <form
              className="sd-chat-quick"
              onSubmit={(e) => {
                e.preventDefault();
                // Optional: redirect to chatbot with query param if desired
              }}
            >
              <input
                className="sd-chat-quick__input"
                type="text"
                placeholder="Ask about timetable, exams, ERP..."
              />
              <button type="submit" className="sd-chat-quick__btn">
                Go
              </button>
            </form>
          </article>

          {/* Profile snapshot (small) */}
          <article className="sd-card sd-card--stat sd-card--profile-mini">
            <div className="sd-card__header-inline">
              <div className="sd-card__title-with-icon">
                <span className="sd-card__circle-icon">
                  <MdPerson size={18} />
                </span>
                <h2 className="sd-card__title">My Profile</h2>
              </div>
              <Link to="/student/profile" className="sd-link-inline">
                Edit <MdChevronRight size={14} />
              </Link>
            </div>
            <div className="sd-mini-profile">
              <div className="sd-mini-profile__avatar">
                {profileSnapshot.name.charAt(0)}
              </div>
              <div className="sd-mini-profile__info">
                <p className="sd-mini-profile__name">{profileSnapshot.name}</p>
                <p className="sd-mini-profile__meta">
                  {profileSnapshot.program}
                </p>
                <p className="sd-mini-profile__meta">
                  <MdSchool size={14} /> {profileSnapshot.department}
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* ==== Middle Row: Complaints + Events Highlights ==== */}
      <section className="student-dashboard__section sd-grid sd-grid--main">
        {/* Recent complaints table snippet */}
        <article className="sd-card sd-card--panel">
          <div className="sd-card__header">
            <div className="sd-card__title-with-icon">
              <span className="sd-card__circle-icon sd-card__circle-icon--soft">
                <MdReportProblem size={18} />
              </span>
              <div>
                <h2 className="sd-card__title">Recent Complaints</h2>
                <p className="sd-card__subtitle">
                  Latest complaints that you have submitted. Manage all details
                  on the complaints page.
                </p>
              </div>
            </div>
            <Link to="/student/complaints" className="sd-link-btn">
              Complaints Page
            </Link>
          </div>

          <div className="sd-table__wrapper">
            <table className="sd-table">
              <thead>
                <tr>
                  <th>Sr.</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {complaintsLoading ? (
                  <tr>
                    <td colSpan={6} className="sd-table__empty">
                      Loading complaints...
                    </td>
                  </tr>
                ) : recentComplaints.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="sd-table__empty">
                      No complaints found.
                    </td>
                  </tr>
                ) : (
                  recentComplaints.map((c,index) => (
                    <tr key={c.id}>
                      <td>{index+1}</td>
                      <td>{c.title}</td>
                      <td>{c.category}</td>
                      <td>
                        <span
                          className={`sd-badge sd-badge--priority sd-badge--${c.priority.toLowerCase()}`}
                        >
                          {c.priority}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`sd-badge sd-badge--status sd-badge--${c.status.toLowerCase()}`}
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

        {/* Right column: Events preview + quick tips */}
        <div className="sd-grid sd-grid--side">
          {/* Highlight events */}
          <article className="sd-card sd-card--panel">
            <div className="sd-card__header">
              <div className="sd-card__title-with-icon">
                <span className="sd-card__circle-icon sd-card__circle-icon--soft">
                  <MdEvent size={18} />
                </span>
                <div>
                  <h2 className="sd-card__title">Highlighted Events</h2>
                  <p className="sd-card__subtitle">
                    Today &amp; upcoming events you should know about.
                  </p>
                </div>
              </div>
              <Link to="/student/events" className="sd-link-btn">
                All Events
              </Link>
            </div>
            <ul className="sd-list">
              {eventsLoading ? (
                <li className="sd-list__item">
                  <div className="sd-list__content">
                    <p className="sd-list__title">Loading events...</p>
                  </div>
                </li>
              ) : highlightEvents.length === 0 ? (
                <li className="sd-list__item">
                  <div className="sd-list__content">
                    <p className="sd-list__title">No upcoming events.</p>
                  </div>
                </li>
              ) : (
                highlightEvents.map((ev) => (
                  <li key={ev.id} className="sd-list__item">
                    <div className="sd-list__dot" />
                    <div className="sd-list__content">
                      <p className="sd-list__title">{ev.title}</p>
                      <p className="sd-list__meta">
                        {ev.when} · {ev.location}
                      </p>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </article>

          {/* Quick usage tips */}
          <article className="sd-card sd-card--panel sd-card--tips">
            <div className="sd-card__title-with-icon">
              <span className="sd-card__circle-icon sd-card__circle-icon--soft">
                <MdSmartToy size={18} />
              </span>
              <h2 className="sd-card__title">Using the Student Module</h2>
            </div>
            <ul className="sd-tips">
              <li>
                <strong>Complaints:</strong> Report issues with classrooms,
                labs, hostels or IT. You can edit or delete while status is{" "}
                <code>PENDING</code>.
              </li>
              <li>
                <strong>Events:</strong> Check <code>Campus Events</code> for
                orientations, seminars, exams and important dates.
              </li>
              <li>
                <strong>Chatbot:</strong> Use the{" "}
                <code>Academic Assistant</code> to ask about academic calendar,
                enrollment and ERP rules.
              </li>
              <li>
                <strong>Profile:</strong> Keep your personal and department
                information up to date for accurate records.
              </li>
            </ul>
          </article>
        </div>
      </section>

      {/* ==== Bottom Row: Full Profile Snapshot ==== */}
      {/* <section className="student-dashboard__section sd-grid sd-grid--bottom">
        <article className="sd-card sd-card--panel sd-card--profile">
          <div className="sd-card__header">
            <div className="sd-card__title-with-icon">
              <span className="sd-card__circle-icon sd-card__circle-icon--soft">
                <MdPerson size={18} />
              </span>
              <div>
                <h2 className="sd-card__title">Profile Snapshot</h2>
                <p className="sd-card__subtitle">
                  Basic information loaded from your profile page.
                </p>
              </div>
            </div>
            <Link to="/student/profile" className="sd-link-btn">
              <MdEditNote size={16} />
              <span>Edit Profile</span>
            </Link>
          </div>

          <div className="sd-profile">
            <div className="sd-profile__avatar">
              {profileSnapshot.name.charAt(0)}
            </div>
            <div className="sd-profile__info">
              <p className="sd-profile__name">{profileSnapshot.name}</p>
              <p className="sd-profile__meta">{profileSnapshot.email}</p>
              <p className="sd-profile__meta">
                Department: {profileSnapshot.department}
              </p>
              <p className="sd-profile__meta">
                Program: {profileSnapshot.program}
              </p>
            </div>
          </div>
        </article>
      </section> */}
    </div>
  );
};

export default StudentDashboard;
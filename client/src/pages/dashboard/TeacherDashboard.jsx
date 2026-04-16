// import React from "react";
// import { Link } from "react-router-dom";
// import {
//   MdReportProblem,
//   MdInventory2,
//   MdEvent,
//   MdSmartToy,
//   MdArrowForward,
//   MdEditNote,
//   MdPerson,
// } from "react-icons/md";
// import "./TeacherDashboard.css";

// /**
//  * TeacherDashboard
//  *
//  * Overview of:
//  *  - Complaints: counts + recent items
//  *  - Resource Requests: counts + recent items
//  *  - Events: upcoming/today/past summary
//  *  - Chatbot: quick entry
//  *  - Profile: quick snapshot
//  *
//  * All numbers/lists are placeholders and should be replaced
//  * with real API data when available.
//  */
// const TeacherDashboard = () => {
//   // === Placeholder data (replace with real data from APIs) ===
//   const complaintSummary = {
//     total: 26,
//     pending: 4,
//     inProgress: 3,
//     resolved: 19,
//   };

//   const recentComplaints = [
//     {
//       id: "C-1040",
//       title: "Projector not working",
//       category: "IT Support",
//       priority: "HIGH",
//       status: "IN_PROGRESS",
//       createdAt: "2026-02-04T10:15:00Z",
//     },
//     {
//       id: "C-1039",
//       title: "Broken chairs in CS-204",
//       category: "Classroom",
//       priority: "INTERMEDIATE",
//       status: "PENDING",
//       createdAt: "2026-02-03T13:10:00Z",
//     },
//     {
//       id: "C-1035",
//       title: "Lab PCs need software update",
//       category: "Lab Equipment",
//       priority: "CRITICAL",
//       status: "RESOLVED",
//       createdAt: "2026-01-29T08:02:00Z",
//     },
//   ];

//   const resourceSummary = {
//     total: 14,
//     pending: 3,
//     approved: 9,
//     rejected: 2,
//   };

//   const recentResourceRequests = [
//     {
//       id: "R-91",
//       purpose: "Lab mid-term practical",
//       status: "PENDING",
//       dateTime: "2026-02-05T09:00:00Z",
//     },
//     {
//       id: "R-90",
//       purpose: "Seminar projector backup",
//       status: "APPROVED",
//       dateTime: "2026-02-02T11:30:00Z",
//     },
//   ];

//   const eventsSummary = {
//     upcoming: 2,
//     today: 1,
//     past: 5,
//   };

//   const highlightEvents = [
//     {
//       id: "E-210",
//       title: "Mid-Term Review Meeting",
//       when: "Today · 10:00 AM",
//       location: "Room C-201",
//     },
//     {
//       id: "E-211",
//       title: "AI in Education Seminar",
//       when: "Feb 18 · 02:30 PM",
//       location: "Auditorium",
//     },
//   ];

//   const profileSnapshot = {
//     name: "Prof. Example Teacher",
//     email: "teacher@example.edu",
//     department: "Computer Science",
//     totalCourses: 4,
//     students: 120,
//   };

//   return (
//     <div className="teacher-dashboard">
//       {/* ==== Page Header ==== */}
//       <header className="teacher-dashboard__header">
//         <div>
//           <h1 className="teacher-dashboard__title">Teacher Overview</h1>
//           <p className="teacher-dashboard__subtitle">
//             See all your complaints, resource requests, events and tools in one
//             place.
//           </p>
//         </div>
//         <div className="teacher-dashboard__header-actions">
//           <Link to="/teacher/complaints/new" className="td-btn td-btn--primary">
//             <MdReportProblem size={18} />
//             <span>New Complaint</span>
//           </Link>
//           <Link
//             to="/teacher/resource-requests/new"
//             className="td-btn td-btn--ghost"
//           >
//             <MdInventory2 size={18} />
//             <span>Resource Request</span>
//           </Link>
//         </div>
//       </header>

//       {/* ==== Top Stat Row: Complaints, Resources, Events, Chatbot ==== */}
//       <section className="teacher-dashboard__section">
//         <div className="td-grid td-grid--top">
//           {/* Complaints summary */}
//           <article className="td-card td-card--stat td-card--warning">
//             <div className="td-card__header-inline">
//               <div className="td-card__title-with-icon">
//                 <span className="td-card__circle-icon">
//                   <MdReportProblem size={18} />
//                 </span>
//                 <h2 className="td-card__title">Complaints</h2>
//               </div>
//               <Link to="/teacher/complaints" className="td-link-inline">
//                 View all <MdArrowForward size={14} />
//               </Link>
//             </div>
//             <p className="td-card__label">
//               You and your students&apos; issues
//             </p>
//             <div className="td-card__stat-main">
//               <span className="td-card__stat-number">
//                 {complaintSummary.total}
//               </span>
//               <span className="td-card__stat-caption">total complaints</span>
//             </div>
//             <div className="td-card__stat-row">
//               <span>Pending: {complaintSummary.pending}</span>
//               <span>In Progress: {complaintSummary.inProgress}</span>
//               <span>Resolved: {complaintSummary.resolved}</span>
//             </div>
//           </article>

//           {/* Resource requests summary */}
//           <article className="td-card td-card--stat td-card--info">
//             <div className="td-card__header-inline">
//               <div className="td-card__title-with-icon">
//                 <span className="td-card__circle-icon">
//                   <MdInventory2 size={18} />
//                 </span>
//                 <h2 className="td-card__title">Resource Requests</h2>
//               </div>
//             <Link
//               to="/teacher/resource-requests"
//               className="td-link-inline"
//             >
//               View all <MdArrowForward size={14} />
//             </Link>
//             </div>
//             <p className="td-card__label">
//               Items requested from server room / admin
//             </p>
//             <div className="td-card__stat-main">
//               <span className="td-card__stat-number">
//                 {resourceSummary.total}
//               </span>
//               <span className="td-card__stat-caption">requests total</span>
//             </div>
//             <div className="td-card__stat-row">
//               <span>Pending: {resourceSummary.pending}</span>
//               <span>Approved: {resourceSummary.approved}</span>
//               <span>Rejected: {resourceSummary.rejected}</span>
//             </div>
//           </article>

//           {/* Events summary */}
//           <article className="td-card td-card--stat td-card--neutral">
//             <div className="td-card__header-inline">
//               <div className="td-card__title-with-icon">
//                 <span className="td-card__circle-icon">
//                   <MdEvent size={18} />
//                 </span>
//                 <h2 className="td-card__title">Events</h2>
//               </div>
//               <Link to="/teacher/events" className="td-link-inline">
//                 Events page <MdArrowForward size={14} />
//               </Link>
//             </div>
//             <p className="td-card__label">
//               Department seminars, classes &amp; meetings
//             </p>
//             <div className="td-card__stat-main">
//               <span className="td-card__stat-number">
//                 {eventsSummary.upcoming}
//               </span>
//               <span className="td-card__stat-caption">upcoming</span>
//             </div>
//             <div className="td-card__stat-row">
//               <span>Today: {eventsSummary.today}</span>
//               <span>Past: {eventsSummary.past}</span>
//             </div>
//           </article>

//           {/* Chatbot quick access */}
//           <article className="td-card td-card--stat td-card--chatbot">
//             <div className="td-card__header-inline">
//               <div className="td-card__title-with-icon">
//                 <span className="td-card__circle-icon">
//                   <MdSmartToy size={18} />
//                 </span>
//                 <h2 className="td-card__title">Academic Chatbot</h2>
//               </div>
//               <Link to="/teacher/chatbot" className="td-link-inline">
//                 Open <MdArrowForward size={14} />
//               </Link>
//             </div>
//             <p className="td-card__label">
//               Ask about timetables, ERP, course offerings &amp; more.
//             </p>
//             <form
//               className="td-chat-quick"
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 // Optional: redirect to chatbot page, maybe with query param
//               }}
//             >
//               <input
//                 className="td-chat-quick__input"
//                 type="text"
//                 placeholder="Ask about timetable, ERP, enrollment..."
//               />
//               <button type="submit" className="td-chat-quick__btn">
//                 Go
//               </button>
//             </form>
//           </article>
//         </div>
//       </section>

//       {/* ==== Middle Row: Complaints + Right Column (Events & Resources) ==== */}
//       <section className="teacher-dashboard__section td-grid td-grid--main">
//         {/* Recent complaints table snippet */}
//         <article className="td-card td-card--panel">
//           <div className="td-card__header">
//             <div className="td-card__title-with-icon">
//               <span className="td-card__circle-icon td-card__circle-icon--soft">
//                 <MdReportProblem size={18} />
//               </span>
//               <div>
//                 <h2 className="td-card__title">Recent Complaints</h2>
//                 <p className="td-card__subtitle">
//                   Quick view of your latest complaints. Manage details on the
//                   complaints page.
//                 </p>
//               </div>
//             </div>
//             <Link to="/teacher/complaints" className="td-link-btn">
//               Complaints Page
//             </Link>
//           </div>

//           <div className="td-table__wrapper">
//             <table className="td-table">
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
//                         className={`td-badge td-badge--priority td-badge--${c.priority.toLowerCase()}`}
//                       >
//                         {c.priority}
//                       </span>
//                     </td>
//                     <td>
//                       <span
//                         className={`td-badge td-badge--status td-badge--${c.status.toLowerCase()}`}
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

//         {/* Right column: Events preview and Resource requests preview */}
//         <div className="td-grid td-grid--side">
//           {/* Highlight events */}
//           <article className="td-card td-card--panel">
//             <div className="td-card__header">
//               <div className="td-card__title-with-icon">
//                 <span className="td-card__circle-icon td-card__circle-icon--soft">
//                   <MdEvent size={18} />
//                 </span>
//                 <div>
//                   <h2 className="td-card__title">Highlighted Events</h2>
//                   <p className="td-card__subtitle">
//                     Today &amp; upcoming events relevant to you.
//                   </p>
//                 </div>
//               </div>
//               <Link to="/teacher/events" className="td-link-btn">
//                 All Events
//               </Link>
//             </div>
//             <ul className="td-list">
//               {highlightEvents.map((ev) => (
//                 <li key={ev.id} className="td-list__item">
//                   <div className="td-list__dot" />
//                   <div className="td-list__content">
//                     <p className="td-list__title">{ev.title}</p>
//                     <p className="td-list__meta">
//                       {ev.when} · {ev.location}
//                     </p>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </article>

//           {/* Recent resource requests */}
//           <article className="td-card td-card--panel">
//             <div className="td-card__header">
//               <div className="td-card__title-with-icon">
//                 <span className="td-card__circle-icon td-card__circle-icon--soft">
//                   <MdInventory2 size={18} />
//                 </span>
//                 <div>
//                   <h2 className="td-card__title">Recent Resource Requests</h2>
//                   <p className="td-card__subtitle">
//                     Track your latest requests to the server room / admin.
//                   </p>
//                 </div>
//               </div>
//               <Link to="/teacher/resource-requests" className="td-link-btn">
//                 Requests
//               </Link>
//             </div>
//             <ul className="td-list">
//               {recentResourceRequests.map((r) => (
//                 <li key={r.id} className="td-list__item td-list__item--space">
//                   <div className="td-list__content">
//                     <p className="td-list__title">{r.purpose}</p>
//                     <p className="td-list__meta">
//                       {new Date(r.dateTime).toLocaleString()}
//                     </p>
//                   </div>
//                   <span
//                     className={`td-badge td-badge--status td-badge--${r.status.toLowerCase()}`}
//                   >
//                     {r.status}
//                   </span>
//                 </li>
//               ))}
//             </ul>
//           </article>
//         </div>
//       </section>

//       {/* ==== Bottom Row: Profile Snapshot + Quick Tips ==== */}
//       <section className="teacher-dashboard__section td-grid td-grid--bottom">
//         {/* Profile snapshot */}
//         <article className="td-card td-card--panel td-card--profile">
//           <div className="td-card__header">
//             <div className="td-card__title-with-icon">
//               <span className="td-card__circle-icon td-card__circle-icon--soft">
//                 <MdPerson size={18} />
//               </span>
//               <div>
//                 <h2 className="td-card__title">Profile Snapshot</h2>
//                 <p className="td-card__subtitle">
//                   Basic information loaded from your profile.
//                 </p>
//               </div>
//             </div>
//             <Link to="/teacher/profile" className="td-link-btn">
//               <MdEditNote size={16} />
//               <span>Edit Profile</span>
//             </Link>
//           </div>

//           <div className="td-profile">
//             <div className="td-profile__avatar">
//               {profileSnapshot.name.charAt(0)}
//             </div>
//             <div className="td-profile__info">
//               <p className="td-profile__name">{profileSnapshot.name}</p>
//               <p className="td-profile__meta">{profileSnapshot.email}</p>
//               <p className="td-profile__meta">
//                 Department: {profileSnapshot.department}
//               </p>
//               <div className="td-profile__stats">
//                 <div>
//                   <span className="td-profile__stat-label">Courses</span>
//                   <span className="td-profile__stat-value">
//                     {profileSnapshot.totalCourses}
//                   </span>
//                 </div>
//                 <div>
//                   <span className="td-profile__stat-label">Students</span>
//                   <span className="td-profile__stat-value">
//                     {profileSnapshot.students}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </article>

//         {/* Quick usage tips / info */}
//         <article className="td-card td-card--panel td-card--tips">
//           <div className="td-card__title-with-icon">
//             <span className="td-card__circle-icon td-card__circle-icon--soft">
//               <MdSmartToy size={18} />
//             </span>
//             <h2 className="td-card__title">Using the Teacher Module</h2>
//           </div>
//           <ul className="td-tips">
//             <li>
//               <strong>Complaints:</strong> Create complaints on behalf of your
//               class or yourself. Edit while status is <code>PENDING</code>.
//             </li>
//             <li>
//               <strong>Resource Requests:</strong> Use the module to request lab
//               resources, equipment, or temporary access from server room staff.
//             </li>
//             <li>
//               <strong>Events:</strong> Check upcoming departmental events,
//               mid-terms, and seminars in the Events page.
//             </li>
//             <li>
//               <strong>Chatbot:</strong> Ask about academic calendar, ERP,
//               course offering and enrollment rules using the Teacher Chatbot.
//             </li>
//             <li>
//               <strong>Profile:</strong> Keep your contact and department info
//               updated to ensure correct routing of complaints and requests.
//             </li>
//           </ul>
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

// export default TeacherDashboard;
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  MdReportProblem,
  MdInventory2,
  MdEvent,
  MdSmartToy,
  MdChevronRight,
  MdArrowForward,
  MdEditNote,
  MdPerson,
} from "react-icons/md";
import { GoLinkExternal } from "react-icons/go";

import "./TeacherDashboard.css";

import { fetchMyComplaintsApi } from "../../api/complaintsApi";
import { fetchMyResourceRequestsApi } from "../../api/resourceRequestsApi";
import { fetchEventsApi } from "../../api/eventsApi";
import { useMyProfile } from "../../hooks/useMyProfile";

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

const TeacherDashboard = () => {
  const { profile } = useMyProfile();

  const [complaints, setComplaints] = useState([]);
  const [complaintsLoading, setComplaintsLoading] = useState(false);

  const [resourceRequests, setResourceRequests] = useState([]);
  const [resourcesLoading, setResourcesLoading] = useState(false);

  const [events, setEvents] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(false);

  const [error, setError] = useState("");

  // Load complaints created by this teacher
  useEffect(() => {
    const loadComplaints = async () => {
      try {
        setComplaintsLoading(true);
        const data = await fetchMyComplaintsApi();
        // assuming API returns { complaints: [...] }
        setComplaints(data.complaints || []);
      } catch (err) {
        console.error("Error loading teacher complaints:", err);
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

  // Load resource requests made by this teacher
  useEffect(() => {
    const loadResourceRequests = async () => {
      try {
        setResourcesLoading(true);
        const data = await fetchMyResourceRequestsApi();
        // assuming API returns { requests: [...] } or { resourceRequests: [...] }
        const list =
          data.requests || data.resourceRequests || data || [];
        setResourceRequests(list);
      } catch (err) {
        console.error("Error loading resource requests:", err);
        setError(
          err?.response?.data?.message ||
            "Failed to load resource requests data for dashboard."
        );
      } finally {
        setResourcesLoading(false);
      }
    };

    loadResourceRequests();
  }, []);

  // Load all events
  useEffect(() => {
    const loadEvents = async () => {
      try {
        setEventsLoading(true);
        const data = await fetchEventsApi();
        // assuming API returns { events: [...] }
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

  // Derived complaint summary from real complaints
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

  // Get recent complaints (3 latest by createdAt / updatedAt)
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

  // Derived resource summary
  const resourceSummary = useMemo(() => {
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

  const recentResourceRequests = useMemo(() => {
    const sorted = [...resourceRequests].sort(
      (a, b) => new Date(b.dateTime) - new Date(a.dateTime)
    );
    return sorted.slice(0, 2).map((r) => ({
      id: r._id,
      purpose: r.purpose,
      status: r.status,
      dateTime: r.dateTime,
    }));
  }, [resourceRequests]);

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
    const base = {
      name: profile?.name || "Teacher",
      email: profile?.email || "",
      department: profile?.department || "Not set",
      totalCourses: 0,
      students: 0,
    };
    // If you later store courses/student counts in profile or another API,
    // you can extend this here without changing UI.
    return base;
  }, [profile]);

  return (
    <div className="teacher-dashboard">
      {/* Optional inline error bar */}
      {error && (
        <div className="td-error-banner">
          <span>{error}</span>
        </div>
      )}

      {/* ==== Page Header ==== */}
      <header className="teacher-dashboard__header">
        <div>
          <h1 className="teacher-dashboard__title">Teacher Overview</h1>
          <p className="teacher-dashboard__subtitle">
            See your complaints, resource requests, events and tools in one
            place.
          </p>
        </div>
        <div className="teacher-dashboard__header-actions">
          <Link to="/teacher/complaints/new" className="td-btn td-btn--primary">
            <MdReportProblem size={18} />
            <span>New Complaint</span>
          </Link>
          <Link
            to="/teacher/resource-requests/new"
            className="td-btn td-btn--ghost"
          >
            <MdInventory2 size={18} />
            <span>Resource Request</span>
          </Link>
        </div>
      </header>

      {/* ==== Top Stat Row: Complaints, Resources, Events, Chatbot ==== */}
      <section className="teacher-dashboard__section">
        <div className="td-grid td-grid--top">
          {/* Complaints summary */}
          <article className="td-card td-card--stat td-card--warning">
            <div className="td-card__header-inline">
              <div className="td-card__title-with-icon">
                <span className="td-card__circle-icon">
                  <MdReportProblem size={18} />
                </span>
                <h2 className="td-card__title">Complaints</h2>
              </div>
              <Link to="/teacher/complaints" className="td-link-inline">
                View All <MdChevronRight size={14} />
              </Link>
            </div>
            <p className="td-card__label">
              Complaints submitted by you or on behalf of your class.
            </p>
            <div className="td-card__stat-main">
              <span className="td-card__stat-number">
                {complaintSummary.total}
              </span>
              <span className="td-card__stat-caption">total complaints</span>
            </div>
            <div className="td-card__stat-row">
              <span>Pending: {complaintSummary.pending}</span>
              <span>In Progress: {complaintSummary.inProgress}</span>
              <span>Resolved: {complaintSummary.resolved}</span>
            </div>
          </article>

          {/* Resource requests summary */}
          <article className="td-card td-card--stat td-card--info">
            <div className="td-card__header-inline">
              <div className="td-card__title-with-icon">
                <span className="td-card__circle-icon">
                  <MdInventory2 size={18} />
                </span>
                <h2 className="td-card__title">Resource Requests</h2>
              </div>
              <Link to="/teacher/resource-requests" className="td-link-inline">
                View all <MdChevronRight size={14} />
              </Link>
            </div>
            <p className="td-card__label">
              Items requested from the server room or administration.
            </p>
            <div className="td-card__stat-main">
              <span className="td-card__stat-number">
                {resourceSummary.total}
              </span>
              <span className="td-card__stat-caption">requests total</span>
            </div>
            <div className="td-card__stat-row">
              <span>Pending: {resourceSummary.pending}</span>
              <span>Approved: {resourceSummary.approved}</span>
              <span>Rejected: {resourceSummary.rejected}</span>
            </div>
          </article>

          {/* Events summary */}
          <article className="td-card td-card--stat td-card--neutral">
            <div className="td-card__header-inline">
              <div className="td-card__title-with-icon">
                <span className="td-card__circle-icon">
                  <MdEvent size={18} />
                </span>
                <h2 className="td-card__title">Events</h2>
              </div>
              <Link to="/teacher/events" className="td-link-inline">
                Events page <MdChevronRight size={14} />
              </Link>
            </div>
            <p className="td-card__label">
              Department seminars, classes, campus events &amp; meetings.
            </p>
            <div className="td-card__stat-main">
              <span className="td-card__stat-number">
                {eventsSummary.upcoming}
              </span>
              <span className="td-card__stat-caption">upcoming</span>
            </div>
            <div className="td-card__stat-row">
              <span>Today: {eventsSummary.today}</span>
              <span>Past: {eventsSummary.past}</span>
            </div>
          </article>

          {/* Chatbot quick access */}
          <article className="td-card td-card--stat td-card--chatbot">
            <div className="td-card__header-inline">
              <div className="td-card__title-with-icon">
                <span className="td-card__circle-icon">
                  <MdSmartToy size={18} />
                </span>
                <h2 className="td-card__title">Academic Chatbot</h2>
              </div>
              <Link to="/teacher/chatbot" className="td-link-inline">
                Open <MdChevronRight size={14} />
              </Link>
            </div>
            <p className="td-card__label">
              Ask about timetables, ERP, course offerings &amp; more.
            </p>
            <form
              className="td-chat-quick"
              onSubmit={(e) => {
                e.preventDefault();
                // Optional: redirect to chatbot page, maybe with query param
              }}
            >
              <input
                className="td-chat-quick__input"
                type="text"
                placeholder="Ask about timetable, ERP, enrollment..."
              />
              <button type="submit" className="td-chat-quick__btn">
                Go
              </button>
            </form>
          </article>
        </div>
      </section>

      {/* ==== Middle Row: Complaints + Right Column (Events & Resources) ==== */}
      <section className="teacher-dashboard__section td-grid td-grid--main">
        {/* Recent complaints table snippet */}
        <article className="td-card td-card--panel">
          <div className="td-card__header">
            <div className="td-card__title-with-icon">
              <span className="td-card__circle-icon td-card__circle-icon--soft">
                <MdReportProblem size={18} />
              </span>
              <div>
                <h2 className="td-card__title">Recent Complaints</h2>
                <p className="td-card__subtitle">
                  Quick view of your latest complaints. Manage details on the
                  complaints page.
                </p>
              </div>
            </div>
            <Link to="/teacher/complaints" className="td-link-btn">
              Complaints Page
            </Link>
          </div>

          <div className="td-table__wrapper">
            <table className="td-table">
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
                {complaintsLoading ? (
                  <tr>
                    <td colSpan={6}>Loading complaints...</td>
                  </tr>
                ) : recentComplaints.length === 0 ? (
                  <tr>
                    <td colSpan={6}>No complaints found.</td>
                  </tr>
                ) : (
                  recentComplaints.map((c) => (
                    <tr key={c.id}>
                      <td>{c.id}</td>
                      <td>{c.title}</td>
                      <td>{c.category}</td>
                      <td>
                        <span
                          className={`td-badge td-badge--priority td-badge--${c.priority.toLowerCase()}`}
                        >
                          {c.priority}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`td-badge td-badge--status td-badge--${c.status.toLowerCase()}`}
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

        {/* Right column: Events preview and Resource requests preview */}
        <div className="td-grid td-grid--side">
          {/* Highlight events */}
          <article className="td-card td-card--panel">
            <div className="td-card__header">
              <div className="td-card__title-with-icon">
                <span className="td-card__circle-icon td-card__circle-icon--soft">
                  <MdEvent size={18} />
                </span>
                <div>
                  <h2 className="td-card__title">Highlighted Events</h2>
                  <p className="td-card__subtitle">
                    Today &amp; upcoming events relevant to you.
                  </p>
                </div>
              </div>
              <Link to="/teacher/events" className="td-link-btn">
                All Events
              </Link>
            </div>
            <ul className="td-list">
              {eventsLoading ? (
                <li className="td-list__item">
                  <div className="td-list__content">
                    <p className="td-list__title">Loading events...</p>
                  </div>
                </li>
              ) : highlightEvents.length === 0 ? (
                <li className="td-list__item">
                  <div className="td-list__content">
                    <p className="td-list__title">No upcoming events.</p>
                  </div>
                </li>
              ) : (
                highlightEvents.map((ev) => (
                  <li key={ev.id} className="td-list__item">
                    <div className="td-list__dot" />
                    <div className="td-list__content">
                      <p className="td-list__title">{ev.title}</p>
                      <p className="td-list__meta">
                        {ev.when} · {ev.location}
                      </p>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </article>

          {/* Recent resource requests */}
          <article className="td-card td-card--panel">
            <div className="td-card__header">
              <div className="td-card__title-with-icon">
                <span className="td-card__circle-icon td-card__circle-icon--soft">
                  <MdInventory2 size={18} />
                </span>
                <div>
                  <h2 className="td-card__title">Recent Resource Requests</h2>
                  <p className="td-card__subtitle">
                    Track your latest requests to the server room / admin.
                  </p>
                </div>
              </div>
              <Link to="/teacher/resource-requests" className="td-link-btn">
                Requests
              </Link>
            </div>
            <ul className="td-list">
              {resourcesLoading ? (
                <li className="td-list__item">
                  <div className="td-list__content">
                    <p className="td-list__title">
                      Loading resource requests...
                    </p>
                  </div>
                </li>
              ) : recentResourceRequests.length === 0 ? (
                <li className="td-list__item">
                  <div className="td-list__content">
                    <p className="td-list__title">
                      No recent resource requests.
                    </p>
                  </div>
                </li>
              ) : (
                recentResourceRequests.map((r) => (
                  <li
                    key={r.id}
                    className="td-list__item td-list__item--space"
                  >
                    <div className="td-list__content">
                      <p className="td-list__title">{r.purpose}</p>
                      <p className="td-list__meta">
                        {r.dateTime
                          ? new Date(r.dateTime).toLocaleString()
                          : "-"}
                      </p>
                    </div>
                    <span
                      className={`td-badge td-badge--status td-badge--${r.status.toLowerCase()}`}
                    >
                      {r.status}
                    </span>
                  </li>
                ))
              )}
            </ul>
          </article>
        </div>
      </section>

      {/* ==== Bottom Row: Profile Snapshot + Quick Tips ==== */}
      {/* Profile snapshot */}
      <section className="teacher-dashboard__section td-grid td-grid--bottom">
        
        {/* <article className="td-card td-card--panel td-card--profile">
          <div className="td-card__header">
            <div className="td-card__title-with-icon">
              <span className="td-card__circle-icon td-card__circle-icon--soft">
                <MdPerson size={18} />
              </span>
              <div>
                <h2 className="td-card__title">Profile Snapshot</h2>
                <p className="td-card__subtitle">
                  Basic information loaded from your profile.
                </p>
              </div>
            </div>
            <Link to="/teacher/profile" className="td-link-btn">
              <MdEditNote size={16} />
              <span>Edit Profile</span>
            </Link>
          </div>

          <div className="td-profile">
            <div className="td-profile__avatar">
              {profileSnapshot.name.charAt(0)}
            </div>
            <div className="td-profile__info">
              <p className="td-profile__name">{profileSnapshot.name}</p>
              <p className="td-profile__meta">{profileSnapshot.email}</p>
              <p className="td-profile__meta">
                Department: {profileSnapshot.department}
              </p>
              <div className="td-profile__stats">
                <div>
                  <span className="td-profile__stat-label">Courses</span>
                  <span className="td-profile__stat-value">
                    {profileSnapshot.totalCourses}
                  </span>
                </div>
                <div>
                  <span className="td-profile__stat-label">Students</span>
                  <span className="td-profile__stat-value">
                    {profileSnapshot.students}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </article> */}

        {/* Quick usage tips / info */}
        <article className="td-card td-card--panel td-card--tips">
          <div className="td-card__title-with-icon">
            <span className="td-card__circle-icon td-card__circle-icon--soft">
              <MdSmartToy size={18} />
            </span>
            <h2 className="td-card__title">Using the Teacher Module</h2>
          </div>
          <ul className="td-tips">
            <li>
              <strong>Complaints:</strong> Create complaints on behalf of your
              class or yourself. Edit while status is <code>PENDING</code>.
            </li>
            <li>
              <strong>Resource Requests:</strong> Request lab resources,
              equipment or temporary access from server room staff.
            </li>
            <li>
              <strong>Events:</strong> Check upcoming departmental events,
              mid‑terms and seminars in the Events page.
            </li>
            <li>
              <strong>Chatbot:</strong> Ask about academic calendar, ERP,
              course offerings and enrollment rules using the Teacher Chatbot.
            </li>
            <li>
              <strong>Profile:</strong> Keep your contact and department info
              updated to ensure correct routing of complaints and requests.
            </li>
          </ul>
        </article>
      </section>
    </div>
  );
};

export default TeacherDashboard;
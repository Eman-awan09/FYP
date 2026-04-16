// // src/pages/admin/AdminEventsPage.jsx
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   fetchAdminEventsApi,
//   deleteEventApi,
// } from "../../api/eventsApi";

// const AdminEventsPage = () => {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const loadEvents = async () => {
//     try {
//       setLoading(true);
//       const data = await fetchAdminEventsApi();
//       setEvents(data.events || []);
//     } catch (error) {
//       console.error("Error loading events (admin):", error);
//       const msg =
//         error?.response?.data?.message || "Failed to load events.";
//       alert(msg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadEvents();
//   }, []);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this event?")) {
//       return;
//     }
//     try {
//       await deleteEventApi(id);
//       alert("Event deleted.");
//       loadEvents();
//     } catch (error) {
//       console.error("Error deleting event:", error);
//       const msg =
//         error?.response?.data?.message || "Failed to delete event.";
//       alert(msg);
//     }
//   };

//   return (
//     <div>
//       <h2>Admin - Events</h2>

//       <div style={{ marginBottom: "16px" }}>
//         <Link
//           to="/admin/events/new"
//           style={{
//             padding: "8px 12px",
//             background: "#1976d2",
//             color: "#fff",
//             borderRadius: "4px",
//             textDecoration: "none",
//           }}
//         >
//           + New Event
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
//               <th style={thStyle}>Date</th>
//               <th style={thStyle}>Venue</th>
//               <th style={thStyle}>Ticket Price</th>
//               <th style={thStyle}>Active</th>
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
//             ) : events.length === 0 ? (
//               <tr>
//                 <td colSpan="6" style={{ textAlign: "center", padding: "12px" }}>
//                   No events found.
//                 </td>
//               </tr>
//             ) : (
//               events.map((event) => (
//                 <tr key={event._id}>
//                   <td style={tdStyle}>{event.title}</td>
//                   <td style={tdStyle}>
//                     {new Date(event.date).toLocaleString()}
//                   </td>
//                   <td style={tdStyle}>{event.venue}</td>
//                   <td style={tdStyle}>{event.ticketPrice || 0}</td>
//                   <td style={tdStyle}>{event.isActive ? "Yes" : "No"}</td>
//                   <td style={tdStyle}>
//                     <Link
//                       to={`/admin/events/${event._id}`}
//                       style={{ marginRight: "8px" }}
//                     >
//                       Edit
//                     </Link>
//                     <button onClick={() => handleDelete(event._id)}>
//                       Delete
//                     </button>
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

// export default AdminEventsPage;
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAdminEventsApi, deleteEventApi } from "../../api/eventsApi";
import {
  MdEvent,
  MdAdd,
  MdRefresh,
  MdInfoOutline,
  MdCheckCircle,
} from "react-icons/md";
import "./AdminEventsPage.css";
import { toast } from 'react-toastify';

const AdminEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const data = await fetchAdminEventsApi();
      setEvents(data.events || []);
    } catch (error) {
      console.error("Error loading events (admin):", error);
      const msg =
        error?.response?.data?.message || "Failed to load events.";
      toast(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) {
      return;
    }
    try {
      await deleteEventApi(id);
      toast("Event deleted.");
      loadEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
      const msg =
        error?.response?.data?.message || "Failed to delete event.";
      toast(msg);
    }
  };

  const stats = {
    total: events.length,
    active: events.filter((e) => e.isActive).length,
  };

  return (
    <div className="ae-page">
      {/* Header */}
      <header className="ae-header">
        <div className="ae-header__left">
          <h1 className="ae-title">
            <MdEvent className="ae-title__icon" size={22} />
            <span>Events Management</span>
          </h1>
          <p className="ae-subtitle">
            Create, monitor and maintain events visible to students and teachers
            such as seminars, workshops, exams and departmental activities.
          </p>
        </div>

        <div className="ae-header__actions">
          <button
            type="button"
            className="ae-btn ae-btn--ghost"
            onClick={loadEvents}
            disabled={loading}
          >
            <MdRefresh size={18} />
            <span>{loading ? "Refreshing..." : "Refresh"}</span>
          </button>
          <Link to="/admin/events/new" className="ae-btn ae-btn--primary">
            <MdAdd size={18} />
            <span>New Event</span>
          </Link>
        </div>
      </header>

      {/* Info */}
      <div className="ae-info">
        <MdInfoOutline size={18} />
        <span>
          Active events are shown to end-users in their event views. Inactive
          events remain hidden but stay in the system for record.
        </span>
      </div>

      {/* Summary */}
      <section className="ae-section ae-summary">
        <div className="ae-summary-grid">
          <article className="ae-card ae-card--stat">
            <div className="ae-card__icon ae-card__icon--neutral">
              <MdEvent />
            </div>
            <div className="ae-card__body">
              <p className="ae-card__label">Total Events</p>
              <p className="ae-card__value">{stats.total}</p>
            </div>
          </article>

          <article className="ae-card ae-card--stat">
            <div className="ae-card__icon ae-card__icon--active">
              <MdCheckCircle />
            </div>
            <div className="ae-card__body">
              <p className="ae-card__label">Active</p>
              <p className="ae-card__value">{stats.active}</p>
            </div>
          </article>
        </div>
      </section>

      {/* Table */}
      <section className="ae-section">
        <div className="ae-table-card">
          <div className="ae-table__wrapper">
            <table className="ae-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Venue</th>
                  <th>Ticket Price</th>
                  <th>Active</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="ae-table__empty">
                      Loading...
                    </td>
                  </tr>
                ) : events.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="ae-table__empty">
                      No events found.
                    </td>
                  </tr>
                ) : (
                  events.map((event) => (
                    <tr key={event._id}>
                      <td>{event.title}</td>
                      <td>{new Date(event.date).toLocaleString()}</td>
                      <td>{event.venue}</td>
                      <td>{event.ticketPrice || 0}</td>
                      <td>
                        <span
                          className={`ae-badge ae-badge--status ae-badge--${
                            event.isActive ? "active" : "inactive"
                          }`}
                        >
                          {event.isActive ? "Yes" : "No"}
                        </span>
                      </td>
                      <td>
                        <div className="ae-actions">
                          <Link
                            to={`/admin/events/${event._id}`}
                            className="ae-chip ae-chip--primary"
                          >
                            Edit
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDelete(event._id)}
                            className="ae-chip ae-chip--danger"
                          >
                            Delete
                          </button>
                        </div>
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

export default AdminEventsPage;
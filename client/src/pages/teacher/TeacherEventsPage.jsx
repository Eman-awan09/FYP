// // src/pages/teacher/TeacherEventsPage.jsx
// import React, { useEffect, useState } from "react";
// import { fetchEventsApi } from "../../api/eventsApi";
// import EventCard from "../../components/events/EventCard";

// const TeacherEventsPage = () => {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const loadEvents = async () => {
//     try {
//       setLoading(true);
//       const data = await fetchEventsApi();
//       setEvents(data.events || []);
//     } catch (error) {
//       console.error("Error loading events (teacher):", error);
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

//   const { pastEvents, todayEvents, upcomingEvents } =
//     categorizeEventsByDate(events);

//   if (loading) {
//     return (
//       <div>
//         <h2>Events</h2>
//         <p>Loading events...</p>
//       </div>
//     );
//   }

//   const noEvents =
//     pastEvents.length === 0 &&
//     todayEvents.length === 0 &&
//     upcomingEvents.length === 0;

//   return (
//     <div>
//       <h2>Events</h2>

//       {noEvents && <p>No events available.</p>}

//       {upcomingEvents.length > 0 && (
//         <section style={{ marginBottom: "24px" }}>
//           <h3>Upcoming Events</h3>
//           {upcomingEvents.map((event) => (
//             <EventCard key={event._id} event={event} />
//           ))}
//         </section>
//       )}

//       {todayEvents.length > 0 && (
//         <section style={{ marginBottom: "24px" }}>
//           <h3>Today</h3>
//           {todayEvents.map((event) => (
//             <EventCard key={event._id} event={event} />
//           ))}
//         </section>
//       )}

//       {pastEvents.length > 0 && (
//         <section style={{ marginBottom: "24px" }}>
//           <h3>Past Events</h3>
//           {pastEvents.map((event) => (
//             <EventCard key={event._id} event={event} />
//           ))}
//         </section>
//       )}
//     </div>
//   );
// };

// // Reuse same helper (you can extract to a separate util file if you want)
// function categorizeEventsByDate(events) {
//   const now = new Date();

//   const startOfToday = new Date(
//     now.getFullYear(),
//     now.getMonth(),
//     now.getDate(),
//     0,
//     0,
//     0,
//     0
//   );
//   const endOfToday = new Date(
//     now.getFullYear(),
//     now.getMonth(),
//     now.getDate(),
//     23,
//     59,
//     59,
//     999
//   );

//   const pastEvents = [];
//   const todayEvents = [];
//   const upcomingEvents = [];

//   events.forEach((event) => {
//     const eventDate = new Date(event.date);

//     if (eventDate < startOfToday) {
//       pastEvents.push(event);
//     } else if (eventDate > endOfToday) {
//       upcomingEvents.push(event);
//     } else {
//       todayEvents.push(event);
//     }
//   });

//   pastEvents.sort((a, b) => new Date(b.date) - new Date(a.date));
//   todayEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
//   upcomingEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

//   return { pastEvents, todayEvents, upcomingEvents };
// }

// export default TeacherEventsPage;
// import React, { useEffect, useState, useMemo } from "react";
// import { fetchEventsApi } from "../../api/eventsApi";
// import EventCard from "../../components/events/EventCard";
// import {
//   MdEvent,
//   MdRefresh,
//   MdCalendarToday,
//   MdSchedule,
//   MdInfoOutline,
// } from "react-icons/md";
// import "./TeacherEventsPage.css";
// import { toast } from 'react-toastify';

// const TeacherEventsPage = () => {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");

//   const loadEvents = async () => {
//     try {
//       setErrorMsg("");
//       setLoading(true);
//       const data = await fetchEventsApi();
//       setEvents(data.events || []);
//     } catch (error) {
//       console.error("Error loading events (teacher):", error);
//       const msg =
//         error?.response?.data?.message || "Failed to load events.";
//       setErrorMsg(msg);
//       toast(msg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadEvents();
//   }, []);

//   const { pastEvents, todayEvents, upcomingEvents } =
//     categorizeEventsByDate(events);

//   const noEvents =
//     pastEvents.length === 0 &&
//     todayEvents.length === 0 &&
//     upcomingEvents.length === 0;

//   const stats = useMemo(
//     () => ({
//       total: events.length,
//       upcoming: upcomingEvents.length,
//       today: todayEvents.length,
//       past: pastEvents.length,
//     }),
//     [events.length, upcomingEvents.length, todayEvents.length, pastEvents.length]
//   );

//   if (loading && events.length === 0) {
//     return (
//       <div className="tev-page tev-page--center">
//         <div className="tev-status-card">
//           <span className="tev-spinner" />
//           <p>Loading events...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="tev-page">
//       {/* Header */}
//       <header className="tev-header">
//         <div className="tev-header__left">
//           <h1 className="tev-title">
//             <MdEvent className="tev-title__icon" size={22} />
//             <span>Events & Schedule</span>
//           </h1>
//           <p className="tev-subtitle">
//             View academic events, departmental seminars, reviews, and any
//             schedule relevant to your teaching responsibilities.
//           </p>
//         </div>

//         <div className="tev-header__actions">
//           <button
//             type="button"
//             className="tev-btn tev-btn--ghost"
//             onClick={loadEvents}
//             disabled={loading}
//           >
//             <MdRefresh size={18} />
//             <span>{loading ? "Refreshing..." : "Refresh"}</span>
//           </button>
//         </div>
//       </header>

//       {/* Inline error message */}
//       {errorMsg && (
//         <div className="tev-error">
//           <MdInfoOutline size={18} />
//           <span>{errorMsg}</span>
//         </div>
//       )}

//       {/* Summary cards */}
//       <section className="tev-section tev-summary">
//         <div className="tev-summary-grid">
//           <article className="tev-card tev-card--stat">
//             <div className="tev-card__icon tev-card__icon--neutral">
//               <MdCalendarToday />
//             </div>
//             <div className="tev-card__body">
//               <p className="tev-card__label">Total</p>
//               <p className="tev-card__value">{stats.total}</p>
//             </div>
//           </article>

//           <article className="tev-card tev-card--stat">
//             <div className="tev-card__icon tev-card__icon--upcoming">
//               <MdSchedule />
//             </div>
//             <div className="tev-card__body">
//               <p className="tev-card__label">Upcoming</p>
//               <p className="tev-card__value">{stats.upcoming}</p>
//             </div>
//           </article>

//           <article className="tev-card tev-card--stat">
//             <div className="tev-card__icon tev-card__icon--today">
//               <MdCalendarToday />
//             </div>
//             <div className="tev-card__body">
//               <p className="tev-card__label">Today</p>
//               <p className="tev-card__value">{stats.today}</p>
//             </div>
//           </article>

//           <article className="tev-card tev-card--stat">
//             <div className="tev-card__icon tev-card__icon--past">
//               <MdEvent />
//             </div>
//             <div className="tev-card__body">
//               <p className="tev-card__label">Past</p>
//               <p className="tev-card__value">{stats.past}</p>
//             </div>
//           </article>
//         </div>
//       </section>

//       {/* Content grid: lists + small info panel */}
//       <section className="tev-section tev-grid">
//         <div className="tev-lists">
//           {noEvents && (
//             <div className="tev-empty">
//               <p>No events available at the moment.</p>
//             </div>
//           )}

//           {upcomingEvents.length > 0 && (
//             <section className="tev-list-section">
//               <h2 className="tev-list-title">Upcoming Events</h2>
//               <p className="tev-list-subtitle">
//                 Plan your classes and assessments around upcoming activities.
//               </p>
//               <div className="tev-event-list">
//                 {upcomingEvents.map((event) => (
//                   <EventCard key={event._id} event={event} />
//                 ))}
//               </div>
//             </section>
//           )}

//           {todayEvents.length > 0 && (
//             <section className="tev-list-section">
//               <h2 className="tev-list-title">Today</h2>
//               <p className="tev-list-subtitle">
//                 Events scheduled for today. Make sure you and your students are
//                 ready.
//               </p>
//               <div className="tev-event-list">
//                 {todayEvents.map((event) => (
//                   <EventCard key={event._id} event={event} />
//                 ))}
//               </div>
//             </section>
//           )}

//           {pastEvents.length > 0 && (
//             <section className="tev-list-section">
//               <h2 className="tev-list-title">Past Events</h2>
//               <p className="tev-list-subtitle">
//                 Recently completed events for reference and record.
//               </p>
//               <div className="tev-event-list">
//                 {pastEvents.map((event) => (
//                   <EventCard key={event._id} event={event} />
//                 ))}
//               </div>
//             </section>
//           )}
//         </div>

//         {/* Right info panel */}
//         <aside className="tev-card tev-card--side">
//           <div className="tev-side-badge">Teacher View</div>
//           <h2 className="tev-side-title">Stay aligned with the calendar</h2>
//           <p className="tev-side-text">
//             Events on this page may include mid-term reviews, final exams,
//             departmental seminars, workshops, and special campus activities.
//           </p>

//           <ul className="tev-side-list">
//             <li>
//               Use upcoming events to <strong>plan course coverage</strong> and
//               avoid scheduling quizzes or assignments on heavy event days.
//             </li>
//             <li>
//               Share key events with your students so they are{" "}
//               <strong>aware of departmental activities</strong>.
//             </li>
//             <li>
//               Review past events to keep a <strong>record of academic
//               engagement</strong> and department initiatives.
//             </li>
//           </ul>

//           <p className="tev-side-note">
//             If important events are missing or details are incorrect, contact
//             your department coordinator or admin to update the calendar.
//           </p>
//         </aside>
//       </section>
//     </div>
//   );
// };

// // Helper unchanged
// export function categorizeEventsByDate(events) {
//   const now = new Date();

//   const startOfToday = new Date(
//     now.getFullYear(),
//     now.getMonth(),
//     now.getDate(),
//     0, 0, 0, 0
//   );
//   const endOfToday = new Date(
//     now.getFullYear(),
//     now.getMonth(),
//     now.getDate(),
//     23, 59, 59, 999
//   );

//   const pastEvents = [];
//   const todayEvents = [];
//   const upcomingEvents = [];

//   events.forEach((event) => {
//     const eventDate = new Date(event.date);

//     if (eventDate < startOfToday) {
//       pastEvents.push(event);
//     } else if (eventDate > endOfToday) {
//       upcomingEvents.push(event);
//     } else {
//       todayEvents.push(event);
//     }
//   });

//   pastEvents.sort((a, b) => new Date(b.date) - new Date(a.date));
//   todayEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
//   upcomingEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

//   return { pastEvents, todayEvents, upcomingEvents };
// }

// export default TeacherEventsPage;
// src/pages/teacher/TeacherEventsPage.jsx
import React, { useEffect, useState, useMemo } from "react";
import { fetchEventsApi } from "../../api/eventsApi";
import EventCard from "../../components/events/EventCard";
import {
  MdEvent,
  MdRefresh,
  MdCalendarToday,
  MdSchedule,
  MdInfoOutline,
} from "react-icons/md";
import "./TeacherEventsPage.css";
import { toast } from "react-toastify";

const TeacherEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [activeFilter, setActiveFilter] = useState("UPCOMING"); // UPCOMING | TODAY | PAST

  const loadEvents = async () => {
    try {
      setErrorMsg("");
      setLoading(true);
      const data = await fetchEventsApi();
      setEvents(data.events || []);
    } catch (error) {
      console.error("Error loading events (teacher):", error);
      const msg =
        error?.response?.data?.message || "Failed to load events.";
      setErrorMsg(msg);
      toast(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const { pastEvents, todayEvents, upcomingEvents } =
    categorizeEventsByDate(events);

  const noEvents =
    pastEvents.length === 0 &&
    todayEvents.length === 0 &&
    upcomingEvents.length === 0;

  const stats = useMemo(
    () => ({
      total: events.length,
      upcoming: upcomingEvents.length,
      today: todayEvents.length,
      past: pastEvents.length,
    }),
    [events.length, upcomingEvents.length, todayEvents.length, pastEvents.length]
  );

  // Get events to show based on activeFilter
  const filteredEvents = useMemo(() => {
    if (activeFilter === "TODAY") return todayEvents;
    if (activeFilter === "PAST") return pastEvents;
    return upcomingEvents; // default UPCOMING
  }, [activeFilter, todayEvents, upcomingEvents, pastEvents]);

  const filteredTitle =
    activeFilter === "TODAY"
      ? "Today's Events"
      : activeFilter === "PAST"
      ? "Past Events"
      : "Upcoming Events";

  const filteredSubtitle =
    activeFilter === "TODAY"
      ? "Events scheduled for today. Make sure you and your students are ready."
      : activeFilter === "PAST"
      ? "Recently completed events for reference and record."
      : "Plan your classes and assessments around upcoming activities.";

  if (loading && events.length === 0) {
    return (
      <div className="tev-page tev-page--center">
        <div className="tev-status-card">
          <span className="tev-spinner" />
          <p>Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="tev-page">
      {/* Header */}
      <header className="tev-header">
        <div className="tev-header__left">
          <h1 className="tev-title">
            <MdEvent className="tev-title__icon" size={22} />
            <span>Events & Schedule</span>
          </h1>
          <p className="tev-subtitle">
            View academic events, departmental seminars, reviews, and any
            schedule relevant to your teaching responsibilities.
          </p>
        </div>

        <div className="tev-header__actions">
          <button
            type="button"
            className="tev-btn tev-btn--ghost"
            onClick={loadEvents}
            disabled={loading}
          >
            <MdRefresh size={18} />
            <span>{loading ? "Refreshing..." : "Refresh"}</span>
          </button>
        </div>
      </header>

      {/* Inline error message */}
      {errorMsg && (
        <div className="tev-error">
          <MdInfoOutline size={18} />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Summary cards */}
      <section className="tev-section tev-summary">
        <div className="tev-summary-grid">
          <article className="tev-card tev-card--stat">
            <div className="tev-card__icon tev-card__icon--neutral">
              <MdCalendarToday />
            </div>
            <div className="tev-card__body">
              <p className="tev-card__label">Total</p>
              <p className="tev-card__value">{stats.total}</p>
            </div>
          </article>

          <article className="tev-card tev-card--stat">
            <div className="tev-card__icon tev-card__icon--upcoming">
              <MdSchedule />
            </div>
            <div className="tev-card__body">
              <p className="tev-card__label">Upcoming</p>
              <p className="tev-card__value">{stats.upcoming}</p>
            </div>
          </article>

          <article className="tev-card tev-card--stat">
            <div className="tev-card__icon tev-card__icon--today">
              <MdCalendarToday />
            </div>
            <div className="tev-card__body">
              <p className="tev-card__label">Today</p>
              <p className="tev-card__value">{stats.today}</p>
            </div>
          </article>

          <article className="tev-card tev-card--stat">
            <div className="tev-card__icon tev-card__icon--past">
              <MdEvent />
            </div>
            <div className="tev-card__body">
              <p className="tev-card__label">Past</p>
              <p className="tev-card__value">{stats.past}</p>
            </div>
          </article>
        </div>
      </section>

      {/* Filter buttons */}
      <section className="tev-section tev-filters">
        <div className="tev-filter-group">
          <button
            type="button"
            className={
              "tev-filter-btn" +
              (activeFilter === "UPCOMING" ? " tev-filter-btn--active" : "")
            }
            onClick={() => setActiveFilter("UPCOMING")}
          >
            Upcoming Events
          </button>
          <button
            type="button"
            className={
              "tev-filter-btn" +
              (activeFilter === "TODAY" ? " tev-filter-btn--active" : "")
            }
            onClick={() => setActiveFilter("TODAY")}
          >
            Today&apos;s Events
          </button>
          <button
            type="button"
            className={
              "tev-filter-btn" +
              (activeFilter === "PAST" ? " tev-filter-btn--active" : "")
            }
            onClick={() => setActiveFilter("PAST")}
          >
            Past Events
          </button>
        </div>
      </section>

      {/* Content grid: filtered list + info panel */}
      <section className="tev-section tev-grid">
        <div className="tev-lists">
          {noEvents && (
            <div className="tev-empty">
              <p>No events available at the moment.</p>
            </div>
          )}

          {!noEvents && (
            <section className="tev-list-section">
              <h2 className="tev-list-title">{filteredTitle}</h2>
              <p className="tev-list-subtitle">{filteredSubtitle}</p>

              {filteredEvents.length === 0 ? (
                <div className="tev-empty tev-empty--inner">
                  <p>
                    No{" "}
                    {activeFilter === "TODAY"
                      ? "events for today."
                      : activeFilter === "PAST"
                      ? "past events available."
                      : "upcoming events scheduled."}
                  </p>
                </div>
              ) : (
                <div className="tev-event-list">
                  {filteredEvents.map((event) => (
                    <EventCard key={event._id} event={event} />
                  ))}
                </div>
              )}
            </section>
          )}
        </div>

        {/* Right info panel */}
        <aside className="tev-card tev-card--side">
          <div className="tev-side-badge">Teacher View</div>
          <h2 className="tev-side-title">Stay aligned with the calendar</h2>
          <p className="tev-side-text">
            Events on this page may include mid-term reviews, final exams,
            departmental seminars, workshops, and special campus activities.
          </p>

          <ul className="tev-side-list">
            <li>
              Use upcoming events to <strong>plan course coverage</strong> and
              avoid scheduling quizzes or assignments on heavy event days.
            </li>
            <li>
              Share key events with your students so they are{" "}
              <strong>aware of departmental activities</strong>.
            </li>
            <li>
              Review past events to keep a{" "}
              <strong>record of academic engagement</strong> and department
              initiatives.
            </li>
          </ul>

          <p className="tev-side-note">
            If important events are missing or details are incorrect, contact
            your department coordinator or admin to update the calendar.
          </p>
        </aside>
      </section>
    </div>
  );
};

// Helper unchanged
export function categorizeEventsByDate(events) {
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

export default TeacherEventsPage;
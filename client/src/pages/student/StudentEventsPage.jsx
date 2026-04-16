// // src/pages/student/StudentEventsPage.jsx
// import React, { useEffect, useState } from "react";
// import { fetchEventsApi } from "../../api/eventsApi";
// import EventCard from "../../components/events/EventCard";

// const StudentEventsPage = () => {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const loadEvents = async () => {
//     try {
//       setLoading(true);
//       const data = await fetchEventsApi();
//       setEvents(data.events || []);
//     } catch (error) {
//       console.error("Error loading events (student):", error);
//       const msg =
//         error?.response?.data?.message || "Failed to load events.";
//       toast(msg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadEvents();
//   }, []);

//   // Categorize events by date
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

// // Helper to split events into past / today / upcoming
// function categorizeEventsByDate(events) {
//   const now = new Date();

//   // Normalize today's start and end
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
//       // Between start and end of today
//       todayEvents.push(event);
//     }
//   });

//   // Optional: sort each group (e.g., by date ascending/descending)
//   pastEvents.sort((a, b) => new Date(b.date) - new Date(a.date)); // recent past first
//   todayEvents.sort((a, b) => new Date(a.date) - new Date(b.date)); // earliest today first
//   upcomingEvents.sort((a, b) => new Date(a.date) - new Date(b.date)); // soonest first

//   return { pastEvents, todayEvents, upcomingEvents };
// }

// export default StudentEventsPage;

// src/pages/student/StudentEventsPage.jsx
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
// import "./StudentEventsPage.css";
// import { toast } from 'react-toastify';

// const StudentEventsPage = () => {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");

//   // Load events from backend (logic unchanged)
//   const loadEvents = async () => {
//     try {
//       setErrorMsg("");
//       setLoading(true);
//       const data = await fetchEventsApi();
//       setEvents(data.events || []);
//     } catch (error) {
//       console.error("Error loading events (student):", error);
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

//   // Simple stats for summary cards
//   const stats = useMemo(
//     () => ({
//       total: events.length,
//       upcoming: upcomingEvents.length,
//       today: todayEvents.length,
//       past: pastEvents.length,
//     }),
//     [events.length, upcomingEvents.length, todayEvents.length, pastEvents.length]
//   );

//   // Show centered loader when initially loading with no data
//   if (loading && events.length === 0) {
//     return (
//       <div className="sev-page sev-page--center">
//         <div className="sev-status-card">
//           <span className="sev-spinner" />
//           <p>Loading events...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="sev-page">
//       {/* Header */}
//       <header className="sev-header">
//         <div className="sev-header__left">
//           <h1 className="sev-title">
//             <MdEvent className="sev-title__icon" size={22} />
//             <span>Campus Events</span>
//           </h1>
//           <p className="sev-subtitle">
//             Explore academic events, seminars, workshops, and important campus
//             activities relevant to you as a student.
//           </p>
//         </div>

//         <div className="sev-header__actions">
//           <button
//             type="button"
//             className="sev-btn sev-btn--ghost"
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
//         <div className="sev-error">
//           <MdInfoOutline size={18} />
//           <span>{errorMsg}</span>
//         </div>
//       )}

//       {/* Summary cards */}
//       <section className="sev-section sev-summary">
//         <div className="sev-summary-grid">
//           <article className="sev-card sev-card--stat">
//             <div className="sev-card__icon sev-card__icon--neutral">
//               <MdCalendarToday />
//             </div>
//             <div className="sev-card__body">
//               <p className="sev-card__label">Total</p>
//               <p className="sev-card__value">{stats.total}</p>
//             </div>
//           </article>

//           <article className="sev-card sev-card--stat">
//             <div className="sev-card__icon sev-card__icon--upcoming">
//               <MdSchedule />
//             </div>
//             <div className="sev-card__body">
//               <p className="sev-card__label">Upcoming</p>
//               <p className="sev-card__value">{stats.upcoming}</p>
//             </div>
//           </article>

//           <article className="sev-card sev-card--stat">
//             <div className="sev-card__icon sev-card__icon--today">
//               <MdCalendarToday />
//             </div>
//             <div className="sev-card__body">
//               <p className="sev-card__label">Today</p>
//               <p className="sev-card__value">{stats.today}</p>
//             </div>
//           </article>

//           <article className="sev-card sev-card--stat">
//             <div className="sev-card__icon sev-card__icon--past">
//               <MdEvent />
//             </div>
//             <div className="sev-card__body">
//               <p className="sev-card__label">Past</p>
//               <p className="sev-card__value">{stats.past}</p>
//             </div>
//           </article>
//         </div>
//       </section>

//       {/* Content grid: event lists + info panel */}
//       <section className="sev-section sev-grid">
//         <div className="sev-lists">
//           {noEvents && (
//             <div className="sev-empty">
//               <p>No events available at the moment.</p>
//             </div>
//           )}

//           {upcomingEvents.length > 0 && (
//             <section className="sev-list-section">
//               <h2 className="sev-list-title">Upcoming Events</h2>
//               <p className="sev-list-subtitle">
//                 Stay prepared for upcoming academic and campus activities.
//               </p>
//               <div className="sev-event-list">
//                 {upcomingEvents.map((event) => (
//                   <EventCard key={event._id} event={event} />
//                 ))}
//               </div>
//             </section>
//           )}

//           {todayEvents.length > 0 && (
//             <section className="sev-list-section">
//               <h2 className="sev-list-title">Today</h2>
//               <p className="sev-list-subtitle">
//                 Events happening today. Make sure you don’t miss anything
//                 important.
//               </p>
//               <div className="sev-event-list">
//                 {todayEvents.map((event) => (
//                   <EventCard key={event._id} event={event} />
//                 ))}
//               </div>
//             </section>
//           )}

//           {pastEvents.length > 0 && (
//             <section className="sev-list-section">
//               <h2 className="sev-list-title">Past Events</h2>
//               <p className="sev-list-subtitle">
//                 Completed events for your reference and record.
//               </p>
//               <div className="sev-event-list">
//                 {pastEvents.map((event) => (
//                   <EventCard key={event._id} event={event} />
//                 ))}
//               </div>
//             </section>
//           )}
//         </div>

//         {/* Right info panel */}
//         <aside className="sev-card sev-card--side">
//           <div className="sev-side-badge">Student View</div>
//           <h2 className="sev-side-title">Make the most of campus events</h2>
//           <p className="sev-side-text">
//             Events on this page may include orientations, workshops, guest
//             lectures, exams, and other important campus activities.
//           </p>

//           <ul className="sev-side-list">
//             <li>
//               Use upcoming events to <strong>plan your study schedule</strong>{" "}
//               and avoid last-minute clashes with exams or activities.
//             </li>
//             <li>
//               Check events happening <strong>today</strong> so you are always
//               aware of what’s going on in your department and campus.
//             </li>
//             <li>
//               Review past events to recall <strong>important sessions</strong>{" "}
//               or find out what you might have missed.
//             </li>
//           </ul>

//           <p className="sev-side-note">
//             If you notice missing or incorrect event details, please contact
//             your department office or campus admin to update the calendar.
//           </p>
//         </aside>
//       </section>
//     </div>
//   );
// };

// // Helper to split events into past / today / upcoming (logic unchanged)
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

//   pastEvents.sort((a, b) => new Date(b.date) - new Date(a.date)); // recent past first
//   todayEvents.sort((a, b) => new Date(a.date) - new Date(b.date)); // earliest today first
//   upcomingEvents.sort((a, b) => new Date(a.date) - new Date(b.date)); // soonest first

//   return { pastEvents, todayEvents, upcomingEvents };
// }

// export default StudentEventsPage;

// src/pages/student/StudentEventsPage.jsx
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
import "./StudentEventsPage.css";
import { toast } from "react-toastify";

const StudentEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [activeFilter, setActiveFilter] = useState("UPCOMING"); // UPCOMING | TODAY | PAST

  // Load events from backend (logic unchanged)
  const loadEvents = async () => {
    try {
      setErrorMsg("");
      setLoading(true);
      const data = await fetchEventsApi();
      setEvents(data.events || []);
    } catch (error) {
      console.error("Error loading events (student):", error);
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

  // Stats for summary cards
  const stats = useMemo(
    () => ({
      total: events.length,
      upcoming: upcomingEvents.length,
      today: todayEvents.length,
      past: pastEvents.length,
    }),
    [events.length, upcomingEvents.length, todayEvents.length, pastEvents.length]
  );

  // Filtered list for selected tab
  const filteredEvents = useMemo(() => {
    if (activeFilter === "TODAY") return todayEvents;
    if (activeFilter === "PAST") return pastEvents;
    return upcomingEvents; // UPCOMING
  }, [activeFilter, todayEvents, upcomingEvents, pastEvents]);

  const filteredTitle =
    activeFilter === "TODAY"
      ? "Today's Events"
      : activeFilter === "PAST"
      ? "Past Events"
      : "Upcoming Events";

  const filteredSubtitle =
    activeFilter === "TODAY"
      ? "Events happening today. Make sure you don’t miss anything important."
      : activeFilter === "PAST"
      ? "Completed events for your reference and record."
      : "Stay prepared for upcoming academic and campus activities.";

  // Centered loader when initially loading with no data
  if (loading && events.length === 0) {
    return (
      <div className="sev-page sev-page--center">
        <div className="sev-status-card">
          <span className="sev-spinner" />
          <p>Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="sev-page">
      {/* Header */}
      <header className="sev-header">
        <div className="sev-header__left">
          <h1 className="sev-title">
            <MdEvent className="sev-title__icon" size={22} />
            <span>Campus Events</span>
          </h1>
          <p className="sev-subtitle">
            Explore academic events, seminars, workshops, and important campus
            activities relevant to you as a student.
          </p>
        </div>

        <div className="sev-header__actions">
          <button
            type="button"
            className="sev-btn sev-btn--ghost"
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
        <div className="sev-error">
          <MdInfoOutline size={18} />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Summary cards */}
      <section className="sev-section sev-summary">
        <div className="sev-summary-grid">
          <article className="sev-card sev-card--stat">
            <div className="sev-card__icon sev-card__icon--neutral">
              <MdCalendarToday />
            </div>
            <div className="sev-card__body">
              <p className="sev-card__label">Total</p>
              <p className="sev-card__value">{stats.total}</p>
            </div>
          </article>

          <article className="sev-card sev-card--stat">
            <div className="sev-card__icon sev-card__icon--upcoming">
              <MdSchedule />
            </div>
            <div className="sev-card__body">
              <p className="sev-card__label">Upcoming</p>
              <p className="sev-card__value">{stats.upcoming}</p>
            </div>
          </article>

          <article className="sev-card sev-card--stat">
            <div className="sev-card__icon sev-card__icon--today">
              <MdCalendarToday />
            </div>
            <div className="sev-card__body">
              <p className="sev-card__label">Today</p>
              <p className="sev-card__value">{stats.today}</p>
            </div>
          </article>

          <article className="sev-card sev-card--stat">
            <div className="sev-card__icon sev-card__icon--past">
              <MdEvent />
            </div>
            <div className="sev-card__body">
              <p className="sev-card__label">Past</p>
              <p className="sev-card__value">{stats.past}</p>
            </div>
          </article>
        </div>
      </section>

      {/* Filter buttons */}
      <section className="sev-section sev-filters">
        <div className="sev-filter-group">
          <button
            type="button"
            className={
              "sev-filter-btn" +
              (activeFilter === "UPCOMING" ? " sev-filter-btn--active" : "")
            }
            onClick={() => setActiveFilter("UPCOMING")}
          >
            Upcoming Events
          </button>
          <button
            type="button"
            className={
              "sev-filter-btn" +
              (activeFilter === "TODAY" ? " sev-filter-btn--active" : "")
            }
            onClick={() => setActiveFilter("TODAY")}
          >
            Today&apos;s Events
          </button>
          <button
            type="button"
            className={
              "sev-filter-btn" +
              (activeFilter === "PAST" ? " sev-filter-btn--active" : "")
            }
            onClick={() => setActiveFilter("PAST")}
          >
            Past Events
          </button>
        </div>
      </section>

      {/* Content grid: filtered list + info panel */}
      <section className="sev-section sev-grid">
        <div className="sev-lists">
          {noEvents && (
            <div className="sev-empty">
              <p>No events available at the moment.</p>
            </div>
          )}

          {!noEvents && (
            <section className="sev-list-section">
              <h2 className="sev-list-title">{filteredTitle}</h2>
              <p className="sev-list-subtitle">{filteredSubtitle}</p>

              {filteredEvents.length === 0 ? (
                <div className="sev-empty sev-empty--inner">
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
                <div className="sev-event-list">
                  {filteredEvents.map((event) => (
                    <EventCard key={event._id} event={event} />
                  ))}
                </div>
              )}
            </section>
          )}
        </div>

        {/* Right info panel */}
        <aside className="sev-card sev-card--side">
          <div className="sev-side-badge">Student View</div>
          <h2 className="sev-side-title">Make the most of campus events</h2>
          <p className="sev-side-text">
            Events on this page may include orientations, workshops, guest
            lectures, exams, and other important campus activities.
          </p>

          <ul className="sev-side-list">
            <li>
              Use upcoming events to <strong>plan your study schedule</strong>{" "}
              and avoid last-minute clashes with exams or activities.
            </li>
            <li>
              Check events happening <strong>today</strong> so you are always
              aware of what’s going on in your department and campus.
            </li>
            <li>
              Review past events to recall <strong>important sessions</strong>{" "}
              or find out what you might have missed.
            </li>
          </ul>

          <p className="sev-side-note">
            If you notice missing or incorrect event details, please contact
            your department office or campus admin to update the calendar.
          </p>
        </aside>
      </section>
    </div>
  );
};

// Helper to split events into past / today / upcoming (logic unchanged)
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

  pastEvents.sort((a, b) => new Date(b.date) - new Date(a.date)); // recent past first
  todayEvents.sort((a, b) => new Date(a.date) - new Date(b.date)); // earliest today first
  upcomingEvents.sort((a, b) => new Date(a.date) - new Date(b.date)); // soonest first

  return { pastEvents, todayEvents, upcomingEvents };
}

export default StudentEventsPage;
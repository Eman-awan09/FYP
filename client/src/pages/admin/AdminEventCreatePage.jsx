// // src/pages/admin/AdminEventCreatePage.jsx
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import EventForm from "../../components/events/EventForm";
// import { createEventApi } from "../../api/eventsApi";

// const AdminEventCreatePage = () => {
//   const navigate = useNavigate();
//   const [submitting, setSubmitting] = useState(false);

//   const handleSubmit = async (values) => {
//     try {
//       setSubmitting(true);
//       await createEventApi(values);
//       alert("Event created.");
//       navigate("/admin/events");
//     } catch (error) {
//       console.error("Error creating event:", error);
//       const msg =
//         error?.response?.data?.message ||
//         "Failed to create event. Please try again.";
//       alert(msg);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div>
//       <h2>Create Event</h2>
//       <EventForm onSubmit={handleSubmit} isSubmitting={submitting} />
//     </div>
//   );
// };

// export default AdminEventCreatePage;
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import EventForm from "../../components/events/EventForm";
import { createEventApi } from "../../api/eventsApi";
import { MdEvent, MdArrowBack, MdInfoOutline } from "react-icons/md";
import "./AdminEventCreatePage.css";
import { toast } from 'react-toastify';

const AdminEventCreatePage = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState("");

  const handleSubmit = async (values) => {
    try {
      setLocalError("");
      setSubmitting(true);
      await createEventApi(values);
      toast("Event created.");
      navigate("/admin/events");
    } catch (error) {
      console.error("Error creating event:", error);
      const msg =
        error?.response?.data?.message ||
        "Failed to create event. Please try again.";
      setLocalError(msg);
      toast(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="aec-page">
      {/* Header */}
      <header className="aec-header">
        <div className="aec-header__left">
          <button
            type="button"
            className="aec-icon-btn"
            onClick={() => navigate("/admin/events")}
            aria-label="Back to Events"
          >
            <MdArrowBack size={18} />
          </button>

          <div className="aec-header__titles">
            <h1 className="aec-title">
              <MdEvent className="aec-title__icon" size={22} />
              <span>Create Event</span>
            </h1>
            <p className="aec-subtitle">
              Add a new event to the campus calendar. Active events will appear
              in teacher and student dashboards according to date and time.
            </p>
          </div>
        </div>

        <div className="aec-header__meta">
          <div className="aec-meta-item">
            <span className="aec-meta-label">Module</span>
            <span className="aec-meta-value">Admin · Events</span>
          </div>
        </div>
      </header>

      {localError && (
        <div className="aec-error">
          <MdInfoOutline size={18} />
          <span>{localError}</span>
        </div>
      )}

      {/* Main grid: form + tips */}
      <section className="aec-grid">
        {/* Form card */}
        <article className="aec-card aec-card--form">
          <div className="aec-card__header">
            <h2 className="aec-card__title">Event Details</h2>
            <p className="aec-card__subtitle">
              Provide a clear title, date, venue and ticket information. You
              can later edit or deactivate the event from the events list.
            </p>
          </div>

          <div className="aec-form-wrapper">
            <EventForm onSubmit={handleSubmit} isSubmitting={submitting} />
          </div>
        </article>

        {/* Tips card */}
        <aside className="aec-card aec-card--side">
          <div className="aec-side-badge">Guidelines</div>
          <h2 className="aec-side-title">Plan events clearly</h2>
          <p className="aec-side-text">
            Well-defined events help teachers and students plan around important
            activities.
          </p>
          <ul className="aec-side-list">
            <li>
              Use a <strong>short, descriptive title</strong> that indicates
              purpose (e.g., “Mid-Term Exam – BSCS 4th Sem”).
            </li>
            <li>
              Set the <strong>correct start date/time</strong> so it appears in
              the correct upcoming / today section.
            </li>
            <li>
              Specify the <strong>venue</strong> or indicate online/Zoom link
              in the description/venue field.
            </li>
            <li>
              If there is no fee, keep <strong>ticket price</strong> at 0.
            </li>
          </ul>
          <p className="aec-side-note">
            After creating an event, you can manage it from{" "}
            <Link to="/admin/events">Events Management</Link>, including
            editing, deactivating, or deleting it.
          </p>
        </aside>
      </section>
    </div>
  );
};

export default AdminEventCreatePage;
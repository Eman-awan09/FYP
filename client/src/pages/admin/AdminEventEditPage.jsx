// // src/pages/admin/AdminEventEditPage.jsx
// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import EventForm from "../../components/events/EventForm";
// import { fetchEventByIdApi, updateEventApi } from "../../api/eventsApi";

// const AdminEventEditPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [event, setEvent] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);

//   const loadEvent = async () => {
//     try {
//       setLoading(true);
//       const data = await fetchEventByIdApi(id);
//       setEvent(data.event);
//     } catch (error) {
//       console.error("Error loading event:", error);
//       const msg =
//         error?.response?.data?.message ||
//         "Failed to load event. Please try again.";
//       alert(msg);
//       navigate("/admin/events");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadEvent();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [id]);

//   const handleSubmit = async (values) => {
//     try {
//       setSubmitting(true);
//       await updateEventApi(id, values);
//       alert("Event updated.");
//       navigate("/admin/events");
//     } catch (error) {
//       console.error("Error updating event:", error);
//       const msg =
//         error?.response?.data?.message ||
//         "Failed to update event. Please try again.";
//       alert(msg);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) return <div>Loading event...</div>;
//   if (!event) return null;

//   return (
//     <div>
//       <h2>Edit Event</h2>
//       <EventForm
//         initialValues={event}
//         onSubmit={handleSubmit}
//         isSubmitting={submitting}
//       />
//     </div>
//   );
// };

// export default AdminEventEditPage;
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import EventForm from "../../components/events/EventForm";
import { fetchEventByIdApi, updateEventApi } from "../../api/eventsApi";
import { MdEvent, MdArrowBack, MdInfoOutline } from "react-icons/md";
import "./AdminEventEditPage.css";
import { toast } from 'react-toastify';

const AdminEventEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState("");

  const loadEvent = async () => {
    try {
      setLocalError("");
      setLoading(true);
      const data = await fetchEventByIdApi(id);
      setEvent(data.event);
    } catch (error) {
      console.error("Error loading event:", error);
      const msg =
        error?.response?.data?.message ||
        "Failed to load event. Please try again.";
      setLocalError(msg);
      toast(msg);
      navigate("/admin/events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSubmit = async (values) => {
    try {
      setSubmitting(true);
      await updateEventApi(id, values);
      toast("Event updated.");
      navigate("/admin/events");
    } catch (error) {
      console.error("Error updating event:", error);
      const msg =
        error?.response?.data?.message ||
        "Failed to update event. Please try again.";
      setLocalError(msg);
      toast(msg);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading && !event) {
    return (
      <div className="aee-page aee-page--center">
        <div className="aee-status-card">
          <span className="aee-spinner" />
          <p>Loading event...</p>
        </div>
      </div>
    );
  }

  if (!event) return null;

  return (
    <div className="aee-page">
      {/* Header */}
      <header className="aee-header">
        <div className="aee-header__left">
          <button
            type="button"
            className="aee-icon-btn"
            onClick={() => navigate("/admin/events")}
            aria-label="Back to Events"
          >
            <MdArrowBack size={18} />
          </button>

          <div className="aee-header__titles">
            <h1 className="aee-title">
              <MdEvent className="aee-title__icon" size={22} />
              <span>Edit Event</span>
            </h1>
            <p className="aee-subtitle">
              Modify the details of this event. Changes will be reflected
              immediately in the teacher and student event lists if the event is
              active.
            </p>
          </div>
        </div>

        <div className="aee-header__meta">
          <div className="aee-meta-item">
            <span className="aee-meta-label">Event ID</span>
            <span className="aee-meta-value aee-meta-value--mono">
              {event._id}
            </span>
          </div>
          <div className="aee-meta-item">
            <span className="aee-meta-label">Status</span>
            <span className="aee-meta-value aee-meta-value--badge">
              {event.isActive ? "Active" : "Inactive"}
            </span>
          </div>
        </div>
      </header>

      {localError && (
        <div className="aee-error">
          <MdInfoOutline size={18} />
          <span>{localError}</span>
        </div>
      )}

      {/* Main grid: form + tips */}
      <section className="aee-grid">
        {/* Form card */}
        <article className="aee-card aee-card--form">
          <div className="aee-card__header">
            <h2 className="aee-card__title">Event Details</h2>
            <p className="aee-card__subtitle">
              Update the title, date, venue, ticket price and whether the event
              is currently active. Use active status to show or hide events from
              end-users.
            </p>
          </div>

          <div className="aee-form-wrapper">
            <EventForm
              initialValues={event}
              onSubmit={handleSubmit}
              isSubmitting={submitting}
            />
          </div>
        </article>

        {/* Right side: helper content */}
        <aside className="aee-card aee-card--side">
          <div className="aee-side-badge">Guidelines</div>
          <h2 className="aee-side-title">Visibility & timing</h2>
          <p className="aee-side-text">
            Events should clearly communicate when and where they are happening,
            and what audience they target (students, teachers, full campus).
          </p>

          <ul className="aee-side-list">
            <li>
              Set the <strong>correct date and time</strong> so they appear in
              the right sections (upcoming, today, past).
            </li>
            <li>
              Use <strong>venue</strong> and notes to indicate whether the event
              is on-campus, online or hybrid.
            </li>
            <li>
              Adjust <strong>ticket price</strong> only if the event requires a
              fee; leave it at 0 for free events.
            </li>
          </ul>

          <p className="aee-side-note">
            You can always return to the{" "}
            <Link to="/admin/events">Events Management</Link> page to deactivate
            or further edit events as needed.
          </p>
        </aside>
      </section>
    </div>
  );
};

export default AdminEventEditPage;
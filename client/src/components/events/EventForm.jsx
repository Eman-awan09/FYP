// // src/components/events/EventForm.jsx
// import React, { useState } from "react";

// const EventForm = ({ initialValues, onSubmit, isSubmitting }) => {
//   const [form, setForm] = useState({
//     title: initialValues?.title || "",
//     date: initialValues?.date
//       ? new Date(initialValues.date).toISOString().slice(0, 16)
//       : "",
//     venue: initialValues?.venue || "",
//     ticketPrice: initialValues?.ticketPrice || 0,
//     description: initialValues?.description || "",
//     isActive:
//       initialValues?.isActive !== undefined ? initialValues.isActive : true,
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]:
//         type === "checkbox"
//           ? checked
//           : name === "ticketPrice"
//           ? Number(value)
//           : value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!form.title.trim() || !form.date || !form.venue.trim()) {
//       alert("Title, date and venue are required.");
//       return;
//     }

//     const payload = {
//       title: form.title.trim(),
//       date: form.date,
//       venue: form.venue.trim(),
//       ticketPrice: form.ticketPrice || 0,
//       description: form.description.trim(),
//       isActive: form.isActive,
//     };

//     onSubmit(payload);
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       style={{ maxWidth: "500px", display: "flex", flexDirection: "column", gap: "12px" }}
//     >
//       <div>
//         <label>Title *</label>
//         <input
//           name="title"
//           value={form.title}
//           onChange={handleChange}
//           style={{ width: "100%", padding: "8px" }}
//         />
//       </div>

//       <div>
//         <label>Date & Time *</label>
//         <input
//           type="datetime-local"
//           name="date"
//           value={form.date}
//           onChange={handleChange}
//           style={{ width: "250px", padding: "8px" }}
//         />
//       </div>

//       <div>
//         <label>Venue *</label>
//         <input
//           name="venue"
//           value={form.venue}
//           onChange={handleChange}
//           style={{ width: "100%", padding: "8px" }}
//         />
//       </div>

//       <div>
//         <label>Ticket Price</label>
//         <input
//           type="number"
//           min={0}
//           name="ticketPrice"
//           value={form.ticketPrice}
//           onChange={handleChange}
//           style={{ width: "100%", padding: "8px" }}
//         />
//       </div>

//       <div>
//         <label>Description</label>
//         <textarea
//           name="description"
//           value={form.description}
//           onChange={handleChange}
//           rows={3}
//           style={{ width: "100%", padding: "8px" }}
//         />
//       </div>

//       <div>
//         <label>
//           <input
//             type="checkbox"
//             name="isActive"
//             checked={form.isActive}
//             onChange={handleChange}
//           />
//           &nbsp;Active
//         </label>
//       </div>

//       <button
//         type="submit"
//         disabled={isSubmitting}
//         style={{
//           padding: "10px",
//           background: "#1976d2",
//           color: "#fff",
//           border: "none",
//           borderRadius: "4px",
//           cursor: isSubmitting ? "not-allowed" : "pointer",
//         }}
//       >
//         {isSubmitting ? "Saving..." : "Save Event"}
//       </button>
//     </form>
//   );
// };

// export default EventForm;

import React, { useState } from "react";
import {
  MdTitle,
  MdEvent,
  MdLocationOn,
  MdAttachMoney,
  MdDescription,
  MdToggleOn,
  MdToggleOff,
} from "react-icons/md";
import "./EventForm.css";
import { toast } from 'react-toastify';

const EventForm = ({ initialValues, onSubmit, isSubmitting }) => {
  const [form, setForm] = useState({
    title: initialValues?.title || "",
    date: initialValues?.date
      ? new Date(initialValues.date).toISOString().slice(0, 16)
      : "",
    venue: initialValues?.venue || "",
    ticketPrice: initialValues?.ticketPrice || 0,
    description: initialValues?.description || "",
    isActive:
      initialValues?.isActive !== undefined ? initialValues.isActive : true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "ticketPrice"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.date || !form.venue.trim()) {
      toast("Title, date and venue are required.");
      return;
    }

    const payload = {
      title: form.title.trim(),
      date: form.date,
      venue: form.venue.trim(),
      ticketPrice: form.ticketPrice || 0,
      description: form.description.trim(),
      isActive: form.isActive,
    };

    onSubmit(payload);
  };

  return (
    <form className="ev-form" onSubmit={handleSubmit}>
      {/* Title */}
      <div className="ev-field">
        <label className="ev-label" htmlFor="ev-title">
          Title <span className="ev-required">*</span>
        </label>
        <div className="ev-input-box">
          <span className="ev-input-icon">
            <MdTitle />
          </span>
          <input
            id="ev-title"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="ev-input"
            placeholder="Event title"
          />
        </div>
      </div>

      {/* Date & Time */}
      <div className="ev-field ev-field--inline">
        <label className="ev-label" htmlFor="ev-date">
          Date &amp; Time <span className="ev-required">*</span>
        </label>
        <div className="ev-input-box ev-input-box--small">
          <span className="ev-input-icon">
            <MdEvent />
          </span>
          <input
            id="ev-date"
            type="datetime-local"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="ev-input"
          />
        </div>
      </div>

      {/* Venue */}
      <div className="ev-field">
        <label className="ev-label" htmlFor="ev-venue">
          Venue <span className="ev-required">*</span>
        </label>
        <div className="ev-input-box">
          <span className="ev-input-icon">
            <MdLocationOn />
          </span>
          <input
            id="ev-venue"
            name="venue"
            value={form.venue}
            onChange={handleChange}
            className="ev-input"
            placeholder="Auditorium, Lab-1, Online, etc."
          />
        </div>
      </div>

      {/* Ticket Price */}
      <div className="ev-field ev-field--inline">
        <label className="ev-label" htmlFor="ev-ticketPrice">
          Ticket Price
        </label>
        <div className="ev-input-box ev-input-box--small">
          <span className="ev-input-icon">
            <MdAttachMoney />
          </span>
          <input
            id="ev-ticketPrice"
            type="number"
            min={0}
            name="ticketPrice"
            value={form.ticketPrice}
            onChange={handleChange}
            className="ev-input"
          />
        </div>
      </div>

      {/* Description */}
      <div className="ev-field">
        <label className="ev-label" htmlFor="ev-description">
          Description
        </label>
        <div className="ev-input-box ev-input-box--textarea">
          <span className="ev-input-icon">
            <MdDescription />
          </span>
          <textarea
            id="ev-description"
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            className="ev-textarea"
            placeholder="Brief detail about the event, audience, agenda, etc."
          />
        </div>
      </div>

      {/* Active toggle */}
      <div className="ev-field ev-field--toggle">
        <label className="ev-label" htmlFor="ev-isActive">
          Active
        </label>
        <button
          type="button"
          className={`ev-toggle ${
            form.isActive ? "ev-toggle--on" : "ev-toggle--off"
          }`}
          onClick={() =>
            setForm((prev) => ({ ...prev, isActive: !prev.isActive }))
          }
        >
          {form.isActive ? (
            <>
              <MdToggleOn size={20} />
              <span>Active</span>
            </>
          ) : (
            <>
              <MdToggleOff size={20} />
              <span>Inactive</span>
            </>
          )}
        </button>
        {/* Keep the actual checkbox to preserve logic/structure if needed */}
        <input
          id="ev-isActive"
          type="checkbox"
          name="isActive"
          checked={form.isActive}
          onChange={handleChange}
          className="ev-toggle-checkbox"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="ev-submit-btn"
      >
        {isSubmitting ? "Saving..." : "Save Event"}
      </button>
    </form>
  );
};

export default EventForm;
// // src/components/events/EventCard.jsx
// import React from "react";

// const EventCard = ({ event }) => {
//   return (
//     <div
//       style={{
//         border: "1px solid #ddd",
//         borderRadius: "6px",
//         padding: "12px",
//         marginBottom: "12px",
//       }}
//     >
//       <h3 style={{ marginTop: 0 }}>{event.title}</h3>
//       <p style={{ margin: "4px 0" }}>
//         <strong>Date:</strong> {new Date(event.date).toLocaleString()}
//       </p>
//       <p style={{ margin: "4px 0" }}>
//         <strong>Venue:</strong> {event.venue}
//       </p>
//       {event.ticketPrice > 0 && (
//         <p style={{ margin: "4px 0" }}>
//           <strong>Ticket Price:</strong> {event.ticketPrice}
//         </p>
//       )}
//       {event.description && (
//         <p style={{ margin: "4px 0" }}>{event.description}</p>
//       )}
//     </div>
//   );
// };

// export default EventCard;

import React from "react";
import { MdEvent, MdLocationOn, MdAttachMoney } from "react-icons/md";
import "./EventCard.css";

const EventCard = ({ event }) => {
  const { title, date, venue, ticketPrice, description } = event || {};

  const formattedDate = date ? new Date(date).toLocaleString() : "-";
  const hasTicket = typeof ticketPrice === "number" && ticketPrice > 0;

  return (
    <article className="evc-card">
      <header className="evc-header">
        <div className="evc-icon">
          <MdEvent size={18} />
        </div>
        <div className="evc-header-text">
          <h3 className="evc-title">{title}</h3>
          <p className="evc-date">{formattedDate}</p>
        </div>
      </header>

      <div className="evc-body">
        <p className="evc-row">
          <MdLocationOn className="evc-row-icon" size={16} />
          <span className="evc-row-label">Venue:</span>
          <span className="evc-row-value">{venue || "-"}</span>
        </p>

        {hasTicket && (
          <p className="evc-row">
            <MdAttachMoney className="evc-row-icon" size={16} />
            <span className="evc-row-label">Ticket:</span>
            <span className="evc-row-value">{ticketPrice}</span>
          </p>
        )}

        {description && (
          <p className="evc-description">{description}</p>
        )}
      </div>
    </article>
  );
};

export default EventCard;
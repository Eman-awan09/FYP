// // src/components/resourceRequests/ResourceRequestForm.jsx
// import React, { useState } from "react";

// /**
//  * Reusable form for creating a resource request.
//  */
// const ResourceRequestForm = ({ onSubmit, isSubmitting }) => {
//   const [studentRollNumber, setStudentRollNumber] = useState("");
//   const [purpose, setPurpose] = useState("");
//   const [dateTime, setDateTime] = useState("");
//   const [items, setItems] = useState([
//     { name: "", quantity: 1, notes: "" },
//   ]);

//   const handleItemChange = (index, field, value) => {
//     setItems((prev) =>
//       prev.map((item, i) =>
//         i === index
//           ? { ...item, [field]: field === "quantity" ? Number(value) : value }
//           : item
//       )
//     );
//   };

//   const handleAddItem = () => {
//     setItems((prev) => [...prev, { name: "", quantity: 1, notes: "" }]);
//   };

//   const handleRemoveItem = (index) => {
//     setItems((prev) => prev.filter((_, i) => i !== index));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!studentRollNumber.trim() || !purpose.trim() || !dateTime) {
//       alert("Student roll number, purpose and date/time are required.");
//       return;
//     }

//     const cleanedItems = items
//       .map((item) => ({
//         ...item,
//         name: item.name.trim(),
//         notes: item.notes.trim(),
//       }))
//       .filter((item) => item.name);

//     if (cleanedItems.length === 0) {
//       alert("Please add at least one resource item with a name.");
//       return;
//     }

//     onSubmit({
//       studentRollNumber: studentRollNumber.trim(),
//       purpose: purpose.trim(),
//       dateTime,
//       resources: cleanedItems,
//     });
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       style={{ maxWidth: "600px", display: "flex", flexDirection: "column", gap: "12px" }}
//     >
//       <div>
//         <label>Student Roll Number *</label>
//         <input
//           type="text"
//           value={studentRollNumber}
//           onChange={(e) => setStudentRollNumber(e.target.value)}
//           placeholder="e.g., 20CS123"
//           style={{ width: "100%", padding: "8px" }}
//         />
//       </div>

//       <div>
//         <label>Purpose / Course / Lab *</label>
//         <textarea
//           value={purpose}
//           onChange={(e) => setPurpose(e.target.value)}
//           placeholder="e.g., Lab exam for course XYZ"
//           rows={3}
//           style={{ width: "100%", padding: "8px" }}
//         />
//       </div>

//       <div>
//         <label>Date & Time *</label>
//         <input
//           type="datetime-local"
//           value={dateTime}
//           onChange={(e) => setDateTime(e.target.value)}
//           style={{ width: "250px", padding: "8px" }}
//         />
//       </div>

//       <div>
//         <label>Resources *</label>
//         {items.map((item, index) => (
//           <div
//             key={index}
//             style={{
//               border: "1px solid #ddd",
//               padding: "8px",
//               marginBottom: "8px",
//               borderRadius: "4px",
//             }}
//           >
//             <div>
//               <label>Item Name</label>
//               <input
//                 type="text"
//                 value={item.name}
//                 onChange={(e) =>
//                   handleItemChange(index, "name", e.target.value)
//                 }
//                 placeholder="e.g., Projector, Laptop"
//                 style={{ width: "100%", padding: "6px" }}
//               />
//             </div>
//             <div style={{ marginTop: "4px" }}>
//               <label>Quantity</label>
//               <input
//                 type="number"
//                 min={1}
//                 value={item.quantity}
//                 onChange={(e) =>
//                   handleItemChange(index, "quantity", e.target.value)
//                 }
//                 style={{ width: "80px", padding: "6px" }}
//               />
//             </div>
//             <div style={{ marginTop: "4px" }}>
//               <label>Notes</label>
//               <input
//                 type="text"
//                 value={item.notes}
//                 onChange={(e) =>
//                   handleItemChange(index, "notes", e.target.value)
//                 }
//                 placeholder="e.g., HDMI cable required"
//                 style={{ width: "100%", padding: "6px" }}
//               />
//             </div>
//             {items.length > 1 && (
//               <button
//                 type="button"
//                 onClick={() => handleRemoveItem(index)}
//                 style={{
//                   marginTop: "4px",
//                   padding: "4px 8px",
//                   background: "#e53935",
//                   color: "#fff",
//                   border: "none",
//                   borderRadius: "3px",
//                   cursor: "pointer",
//                 }}
//               >
//                 Remove
//               </button>
//             )}
//           </div>
//         ))}
//         <button
//           type="button"
//           onClick={handleAddItem}
//           style={{
//             padding: "6px 10px",
//             background: "#1976d2",
//             color: "#fff",
//             border: "none",
//             borderRadius: "4px",
//             cursor: "pointer",
//           }}
//         >
//           + Add Item
//         </button>
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
//         {isSubmitting ? "Submitting..." : "Submit Request"}
//       </button>
//     </form>
//   );
// };

// export default ResourceRequestForm;

import React, { useState } from "react";
import {
  MdBadge,
  MdDescription,
  MdEvent,
  MdDevices,
  MdAdd,
  MdDeleteOutline,
  MdNotes,
} from "react-icons/md";
import "./ResourceRequestForm.css";
import { toast } from 'react-toastify';

/**
 * Reusable form for creating a resource request.
 * Logic and API contract remain unchanged.
 */
const ResourceRequestForm = ({ onSubmit, isSubmitting }) => {
  const [studentRollNumber, setStudentRollNumber] = useState("");
  const [purpose, setPurpose] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [items, setItems] = useState([{ name: "", quantity: 1, notes: "" }]);

  const handleItemChange = (index, field, value) => {
    setItems((prev) =>
      prev.map((item, i) =>
        i === index
          ? { ...item, [field]: field === "quantity" ? Number(value) : value }
          : item
      )
    );
  };

  const handleAddItem = () => {
    setItems((prev) => [...prev, { name: "", quantity: 1, notes: "" }]);
  };

  const handleRemoveItem = (index) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!studentRollNumber.trim() || !purpose.trim() || !dateTime) {
      toast("Student roll number, purpose and date/time are required.");
      return;
    }

    const cleanedItems = items
      .map((item) => ({
        ...item,
        name: item.name.trim(),
        notes: item.notes.trim(),
      }))
      .filter((item) => item.name);

    if (cleanedItems.length === 0) {
      toast("Please add at least one resource item with a name.");
      return;
    }

    onSubmit({
      studentRollNumber: studentRollNumber.trim(),
      purpose: purpose.trim(),
      dateTime,
      resources: cleanedItems,
    });
  };

  return (
    <form className="rr-form" onSubmit={handleSubmit}>
      {/* Student Roll Number */}
      <div className="rr-field">
        <label className="rr-label" htmlFor="rr-roll">
          Student Roll Number <span className="rr-required">*</span>
        </label>
        <div className="rr-input-box">
          <span className="rr-input-icon">
            <MdBadge />
          </span>
          <input
            id="rr-roll"
            type="text"
            value={studentRollNumber}
            onChange={(e) => setStudentRollNumber(e.target.value)}
            placeholder="e.g., 20CS123"
            className="rr-input"
          />
        </div>
      </div>

      {/* Purpose */}
      <div className="rr-field">
        <label className="rr-label" htmlFor="rr-purpose">
          Purpose / Course / Lab <span className="rr-required">*</span>
        </label>
        <div className="rr-input-box rr-input-box--textarea">
          <span className="rr-input-icon">
            <MdDescription />
          </span>
          <textarea
            id="rr-purpose"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            placeholder="e.g., Lab exam for course XYZ"
            rows={3}
            className="rr-textarea"
          />
        </div>
      </div>

      {/* Date & Time */}
      <div className="rr-field rr-field--inline">
        <label className="rr-label" htmlFor="rr-datetime">
          Date &amp; Time <span className="rr-required">*</span>
        </label>
        <div className="rr-input-box rr-input-box--small">
          <span className="rr-input-icon">
            <MdEvent />
          </span>
          <input
            id="rr-datetime"
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            className="rr-input"
          />
        </div>
      </div>

      {/* Resources list */}
      <div className="rr-field">
        <label className="rr-label">Resources <span className="rr-required">*</span></label>
        <div className="rr-items">
          {items.map((item, index) => (
            <div key={index} className="rr-item-card">
              {/* Item name */}
              <div className="rr-item-row">
                <label className="rr-item-label" htmlFor={`rr-item-name-${index}`}>
                  Item Name
                </label>
                <div className="rr-input-box">
                  <span className="rr-input-icon">
                    <MdDevices />
                  </span>
                  <input
                    id={`rr-item-name-${index}`}
                    type="text"
                    value={item.name}
                    onChange={(e) =>
                      handleItemChange(index, "name", e.target.value)
                    }
                    placeholder="e.g., Projector, Laptop, Router"
                    className="rr-input"
                  />
                </div>
              </div>

              {/* Quantity + Notes */}
              <div className="rr-item-row rr-item-row--split">
                <div className="rr-item-col rr-item-col--qty">
                  <label
                    className="rr-item-label"
                    htmlFor={`rr-item-qty-${index}`}
                  >
                    Quantity
                  </label>
                  <div className="rr-input-box rr-input-box--small">
                    <span className="rr-input-icon">#</span>
                    <input
                      id={`rr-item-qty-${index}`}
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) =>
                        handleItemChange(index, "quantity", e.target.value)
                      }
                      className="rr-input"
                    />
                  </div>
                </div>

                <div className="rr-item-col">
                  <label
                    className="rr-item-label"
                    htmlFor={`rr-item-notes-${index}`}
                  >
                    Notes
                  </label>
                  <div className="rr-input-box">
                    <span className="rr-input-icon">
                      <MdNotes />
                    </span>
                    <input
                      id={`rr-item-notes-${index}`}
                      type="text"
                      value={item.notes}
                      onChange={(e) =>
                        handleItemChange(index, "notes", e.target.value)
                      }
                      placeholder="e.g., HDMI cable required"
                      className="rr-input"
                    />
                  </div>
                </div>
              </div>

              {/* Remove button */}
              {items.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveItem(index)}
                  className="rr-remove-btn"
                >
                  <MdDeleteOutline size={16} />
                  <span>Remove</span>
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Add item button */}
        <button
          type="button"
          onClick={handleAddItem}
          className="rr-add-btn"
        >
          <MdAdd size={18} />
          <span>Add Item</span>
        </button>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="rr-submit-btn"
      >
        {isSubmitting ? "Submitting..." : "Submit Request"}
      </button>
    </form>
  );
};

export default ResourceRequestForm;
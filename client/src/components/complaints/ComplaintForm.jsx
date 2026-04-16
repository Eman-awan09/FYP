// // src/components/complaints/ComplaintForm.jsx
// import React, { useState } from "react";

// const MAX_FILES = 3;

// const ComplaintForm = ({
//   initialValues,
//   allowedPriorities = [],
//   isSubmitting,
//   onSubmit,
//   showPriority = true,
//   categories, // NEW: optional array of { value, label }
// }) => {
//   const [form, setForm] = useState({
//     title: initialValues?.title || "",
//     description: initialValues?.description || "",
//     category: initialValues?.category || "",
//     priority:
//       initialValues?.priority ||
//       (showPriority && allowedPriorities.length > 0
//         ? allowedPriorities[0]
//         : ""),
//   });

//   const [selectedFiles, setSelectedFiles] = useState([]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Handle file selection, limit to MAX_FILES and images only
//   const handleFilesChange = (e) => {
//     const files = Array.from(e.target.files || []);

//     // Filter only images (if you want to restrict)
//     const imageFiles = files.filter((file) => file.type.startsWith("image/"));

//     if (imageFiles.length !== files.length) {
//       alert("Only image files are allowed (jpeg, png, etc.).");
//     }

//     const newList = [...selectedFiles, ...imageFiles];

//     if (newList.length > MAX_FILES) {
//       alert(`You can upload up to ${MAX_FILES} images.`);
//       newList.splice(MAX_FILES); // keep only first MAX_FILES
//     }

//     setSelectedFiles(newList);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (
//       !form.title.trim() ||
//       !form.description.trim() ||
//       !form.category.trim()
//     ) {
//       alert("Title, description and category are required.");
//       return;
//     }

//     const payload = {
//       title: form.title.trim(),
//       description: form.description.trim(),
//       category: form.category.trim(),
//     };

//     if (showPriority && form.priority) {
//       payload.priority = form.priority;
//     }

//     // Pass both form payload and selectedFiles to parent
//     onSubmit(payload, selectedFiles);
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       style={{
//         maxWidth: "600px",
//         display: "flex",
//         flexDirection: "column",
//         gap: "12px",
//       }}
//     >
//       <div>
//         <label>Title *</label>
//         <input
//           name="title"
//           value={form.title}
//           onChange={handleChange}
//           placeholder="Brief title"
//           maxLength={150}
//           style={{ width: "100%", padding: "8px" }}
//         />
//       </div>

//       <div>
//         <label>Description *</label>
//         <textarea
//           name="description"
//           value={form.description}
//           onChange={handleChange}
//           placeholder="Describe the issue in detail"
//           rows={4}
//           style={{ width: "100%", padding: "8px" }}
//         />
//       </div>

//       <div>
//         <label>Category *</label>
//         {Array.isArray(categories) && categories.length > 0 ? (
//           <select
//             name="category"
//             value={form.category}
//             onChange={handleChange}
//             style={{ width: "100%", padding: "8px" }}
//           >
//             {categories.map((cat) => (
//               <option key={cat.value} value={cat.value}>
//                 {cat.label}
//               </option>
//             ))}
//           </select>
//         ) : (
//           // Fallback for places where categories are not provided
//           <input
//             name="category"
//             value={form.category}
//             onChange={handleChange}
//             placeholder="IT, Electrical, Maintenance, etc."
//             style={{ width: "100%", padding: "8px" }}
//           />
//         )}
//       </div>

//       {showPriority && (
//         <div>
//           <label>Priority *</label>
//           <select
//             name="priority"
//             value={form.priority}
//             onChange={handleChange}
//             style={{ width: "200px", padding: "8px" }}
//           >
//             {allowedPriorities.map((p) => (
//               <option key={p} value={p}>
//                 {p}
//               </option>
//             ))}
//           </select>
//         </div>
//       )}

//       {/* Attachments */}
//       <div>
//         <label>Attachments (images only, up to 3)</label>
//         <div style={{ marginTop: "4px", marginBottom: "4px" }}>
//           <input
//             type="file"
//             multiple
//             accept="image/*"
//             onChange={handleFilesChange}
//           />
//         </div>
//         {selectedFiles.length > 0 && (
//           <ul style={{ paddingLeft: "20px" }}>
//             {selectedFiles.map((file, idx) => (
//               <li key={idx}>{file.name}</li>
//             ))}
//           </ul>
//         )}
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
//         {isSubmitting ? "Saving..." : "Save Complaint"}
//       </button>
//     </form>
//   );
// };

// export default ComplaintForm;
import React, { useState } from "react";
import {
  MdTitle,
  MdDescription,
  MdCategory,
  MdFlag,
  MdAttachFile,
} from "react-icons/md";
import "./ComplaintForm.css";

const MAX_FILES = 3;

const ComplaintForm = ({
  initialValues,
  allowedPriorities = [],
  isSubmitting,
  onSubmit,
  showPriority = true,
  categories, // optional array of { value, label }
}) => {
  const [form, setForm] = useState({
    title: initialValues?.title || "",
    description: initialValues?.description || "",
    category: initialValues?.category || "",
    priority:
      initialValues?.priority ||
      (showPriority && allowedPriorities.length > 0
        ? allowedPriorities[0]
        : ""),
  });

  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file selection, limit to MAX_FILES and images only
  const handleFilesChange = (e) => {
    const files = Array.from(e.target.files || []);

    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    if (imageFiles.length !== files.length) {
      alert("Only image files are allowed (jpeg, png, etc.).");
    }

    const newList = [...selectedFiles, ...imageFiles];

    if (newList.length > MAX_FILES) {
      alert(`You can upload up to ${MAX_FILES} images.`);
      newList.splice(MAX_FILES);
    }

    setSelectedFiles(newList);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.title.trim() ||
      !form.description.trim() ||
      !form.category.trim()
    ) {
      alert("Title, description and category are required.");
      return;
    }

    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category.trim(),
    };

    if (showPriority && form.priority) {
      payload.priority = form.priority;
    }

    onSubmit(payload, selectedFiles);
  };

  return (
    <form className="complaint-form" onSubmit={handleSubmit}>
      {/* Title */}
      <div className="cf-field">
        <label className="cf-label" htmlFor="cf-title">
          Title <span className="cf-required">*</span>
        </label>
        <div className="cf-input-box">
          <span className="cf-input-icon">
            <MdTitle />
          </span>
          <input
            id="cf-title"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Brief title"
            maxLength={150}
            className="cf-input"
          />
        </div>
      </div>

      {/* Description */}
      <div className="cf-field">
        <label className="cf-label" htmlFor="cf-description">
          Description <span className="cf-required">*</span>
        </label>
        <div className="cf-input-box cf-input-box--textarea">
          <span className="cf-input-icon">
            <MdDescription />
          </span>
          <textarea
            id="cf-description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Describe the issue in detail"
            rows={4}
            className="cf-textarea"
          />
        </div>
      </div>

      {/* Category */}
      <div className="cf-field">
        <label className="cf-label" htmlFor="cf-category">
          Category <span className="cf-required">*</span>
        </label>
        <div className="cf-input-box">
          <span className="cf-input-icon">
            <MdCategory />
          </span>
          {Array.isArray(categories) && categories.length > 0 ? (
            <select
              id="cf-category"
              name="category"
              value={form.category}
              onChange={handleChange}
              className="cf-select"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              id="cf-category"
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="IT, Electrical, Maintenance, etc."
              className="cf-input"
            />
          )}
        </div>
      </div>

      {/* Priority */}
      {showPriority && (
        <div className="cf-field cf-field--inline">
          <label className="cf-label" htmlFor="cf-priority">
            Priority <span className="cf-required">*</span>
          </label>
          <div className="cf-input-box cf-input-box--small">
            <span className="cf-input-icon">
              <MdFlag />
            </span>
            <select
              id="cf-priority"
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="cf-select"
            >
              {allowedPriorities.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Attachments */}
      <div className="cf-field">
        <label className="cf-label" htmlFor="cf-attachments">
          Attachments (images only, up to 3)
        </label>
        <div className="cf-file-box">
          <div className="cf-input-box cf-input-box--file">
            <span className="cf-input-icon">
              <MdAttachFile />
            </span>
            <input
              id="cf-attachments"
              type="file"
              multiple
              accept="image/*"
              onChange={handleFilesChange}
              className="cf-file-input"
            />
          </div>
          {selectedFiles.length > 0 && (
            <ul className="cf-file-list">
              {selectedFiles.map((file, idx) => (
                <li key={idx} className="cf-file-item">
                  {file.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="cf-submit-btn"
      >
        {isSubmitting ? "Saving..." : "Save Complaint"}
      </button>
    </form>
  );
};

export default ComplaintForm;
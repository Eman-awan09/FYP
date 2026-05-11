// // src/pages/admin/AdminDepartmentCalendarPage.jsx
// import React, { useEffect, useState } from "react";
// import {
//   upsertDepartmentCalendarEntryApi,
//   listDepartmentCalendarEntriesApi,
//   deleteDepartmentCalendarEntryApi,
// } from "../../api/calendarApi";
// import {
//   CALENDAR_KEYS,
//   CALENDAR_KEY_LABELS,
// } from "../../constants/calendarKeys";

// const KEY_OPTIONS = Object.values(CALENDAR_KEYS);

// const AdminDepartmentCalendarPage = () => {
//   const [entries, setEntries] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [filterDepartment, setFilterDepartment] = useState("");

//   const [form, setForm] = useState({
//     id: null,
//     department: "",
//     key: CALENDAR_KEYS.COURSE_OFFERING_TIMETABLE,
//     date: "",
//     note: "",
//   });
//   const [saving, setSaving] = useState(false);

//   const loadEntries = async () => {
//     try {
//       setLoading(true);
//       const params = {};
//       if (filterDepartment) params.department = filterDepartment;
//       const data = await listDepartmentCalendarEntriesApi(params);
//       setEntries(data.entries || []);
//     } catch (error) {
//       console.error("Error loading calendar entries:", error);
//       const msg =
//         error?.response?.data?.message ||
//         "Failed to load department calendar entries.";
//       alert(msg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadEntries();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const resetForm = () => {
//     setForm({
//       id: null,
//       department: "",
//       key: CALENDAR_KEYS.COURSE_OFFERING_TIMETABLE,
//       date: "",
//       note: "",
//     });
//   };

//   const handleEdit = (entry) => {
//     setForm({
//       id: entry._id,
//       department: entry.department || "",
//       key: entry.key,
//       date: entry.date ? entry.date.slice(0, 10) : "",
//       note: entry.note || "",
//     });
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this calendar entry?")) return;
//     try {
//       await deleteDepartmentCalendarEntryApi(id);
//       alert("Entry deleted.");
//       loadEntries();
//     } catch (error) {
//       console.error("Error deleting entry:", error);
//       const msg =
//         error?.response?.data?.message ||
//         "Failed to delete calendar entry.";
//       alert(msg);
//     }
//   };

//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!form.department.trim()) {
//       alert("Department is required.");
//       return;
//     }
//     if (!form.date) {
//       alert("Date is required.");
//       return;
//     }

//     const payload = {
//       department: form.department.trim().toUpperCase(),
//       key: form.key,
//       date: form.date,
//       note: form.note.trim(),
//     };

//     try {
//       setSaving(true);
//       await upsertDepartmentCalendarEntryApi(payload);
//       alert("Calendar entry saved.");
//       resetForm();
//       loadEntries();
//     } catch (error) {
//       console.error("Error saving entry:", error);
//       const msg =
//         error?.response?.data?.message ||
//         "Failed to save calendar entry.";
//       alert(msg);
//     } finally {
//       setSaving(false);
//     }
//   };

//   return (
//     <div>
//       <h2>Admin - Department Academic Calendar</h2>

//       {/* Filters */}
//       <div
//         style={{
//           marginBottom: "16px",
//           display: "flex",
//           gap: "12px",
//           flexWrap: "wrap",
//         }}
//       >
//         <div>
//           <label>Filter by Department</label>
//           <input
//             type="text"
//             value={filterDepartment}
//             onChange={(e) => setFilterDepartment(e.target.value)}
//             placeholder="e.g., CSE, ECE, BBA"
//             style={{ marginLeft: "8px" }}
//           />
//         </div>
//         <button onClick={loadEntries} disabled={loading}>
//           {loading ? "Filtering..." : "Apply Filters"}
//         </button>
//       </div>

//       {/* Form */}
//       <form
//         onSubmit={handleSubmit}
//         style={{
//           maxWidth: "600px",
//           display: "flex",
//           flexDirection: "column",
//           gap: "8px",
//           marginBottom: "24px",
//         }}
//       >
//         <h3>{form.id ? "Edit Calendar Entry" : "Create/Update Calendar Entry"}</h3>

//         <label>
//           Department *
//           <input
//             name="department"
//             value={form.department}
//             onChange={handleFormChange}
//             placeholder="e.g., CSE"
//             style={{ width: "100%", padding: "8px", marginTop: "4px" }}
//           />
//         </label>

//         <label>
//           Calendar Item *
//           <select
//             name="key"
//             value={form.key}
//             onChange={handleFormChange}
//             style={{ width: "100%", padding: "8px", marginTop: "4px" }}
//           >
//             {KEY_OPTIONS.map((k) => (
//               <option key={k} value={k}>
//                 {CALENDAR_KEY_LABELS[k] || k}
//               </option>
//             ))}
//           </select>
//         </label>

//         <label>
//           Date *
//           <input
//             type="date"
//             name="date"
//             value={form.date}
//             onChange={handleFormChange}
//             style={{ width: "100%", padding: "8px", marginTop: "4px" }}
//           />
//         </label>

//         <label>
//           Note (optional)
//           <textarea
//             name="note"
//             value={form.note}
//             onChange={handleFormChange}
//             rows={2}
//             style={{ width: "100%", padding: "8px", marginTop: "4px" }}
//           />
//         </label>

//         <button type="submit" disabled={saving}>
//           {saving ? "Saving..." : "Save Calendar Entry"}
//         </button>

//         {form.id && (
//           <button type="button" onClick={resetForm} style={{ marginTop: "4px" }}>
//             Cancel Edit
//           </button>
//         )}
//       </form>

//       {/* Entries Table */}
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
//               <th style={thStyle}>Department</th>
//               <th style={thStyle}>Item</th>
//               <th style={thStyle}>Date</th>
//               <th style={thStyle}>Note</th>
//               <th style={thStyle}>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loading ? (
//               <tr>
//                 <td colSpan="5" style={{ textAlign: "center", padding: "12px" }}>
//                   Loading...
//                 </td>
//               </tr>
//             ) : entries.length === 0 ? (
//               <tr>
//                 <td colSpan="5" style={{ textAlign: "center", padding: "12px" }}>
//                   No calendar entries found.
//                 </td>
//               </tr>
//             ) : (
//               entries.map((e) => (
//                 <tr key={e._id}>
//                   <td style={tdStyle}>{e.department}</td>
//                   <td style={tdStyle}>
//                     {CALENDAR_KEY_LABELS[e.key] || e.key}
//                   </td>
//                   <td style={tdStyle}>
//                     {e.date ? new Date(e.date).toLocaleDateString() : "-"}
//                   </td>
//                   <td style={tdStyle}>{e.note || "-"}</td>
//                   <td style={tdStyle}>
//                     <button
//                       onClick={() => handleEdit(e)}
//                       style={{ marginRight: "6px" }}
//                     >
//                       Edit
//                     </button>
//                     <button onClick={() => handleDelete(e._id)}>Delete</button>
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

// export default AdminDepartmentCalendarPage;
// import React, { useEffect, useState } from "react";
// import {
//   upsertDepartmentCalendarEntryApi,
//   listDepartmentCalendarEntriesApi,
//   deleteDepartmentCalendarEntryApi,
// } from "../../api/calendarApi";
// import {
//   CALENDAR_KEYS,
//   CALENDAR_KEY_LABELS,
// } from "../../constants/calendarKeys";
// import {
//   MdCalendarMonth,
//   MdFilterList,
//   MdRefresh,
//   MdEventNote,
//   MdEditCalendar,
//   MdDeleteForever,
//   MdInfoOutline,
// } from "react-icons/md";
// import "./AdminDepartmentCalendarPage.css";
// import { toast } from 'react-toastify';


// const KEY_OPTIONS = Object.values(CALENDAR_KEYS);

// const AdminDepartmentCalendarPage = () => {
//   const [entries, setEntries] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [filterDepartment, setFilterDepartment] = useState("");

//   const [form, setForm] = useState({
//     id: null,
//     department: "",
//     key: CALENDAR_KEYS.COURSE_OFFERING_TIMETABLE,
//     date: "",
//     note: "",
//   });
//   const [saving, setSaving] = useState(false);
//   const [localError, setLocalError] = useState("");

//   const loadEntries = async () => {
//     try {
//       setLoading(true);
//       const params = {};
//       if (filterDepartment) params.department = filterDepartment;
//       const data = await listDepartmentCalendarEntriesApi(params);
//       setEntries(data.entries || []);
//     } catch (error) {
//       console.error("Error loading calendar entries:", error);
//       const msg =
//         error?.response?.data?.message ||
//         "Failed to load department calendar entries.";
//       toast(msg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadEntries();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const resetForm = () => {
//     setForm({
//       id: null,
//       department: "",
//       key: CALENDAR_KEYS.COURSE_OFFERING_TIMETABLE,
//       date: "",
//       note: "",
//     });
//     setLocalError("");
//   };

//   const handleEdit = (entry) => {
//     setForm({
//       id: entry._id,
//       department: entry.department || "",
//       key: entry.key,
//       date: entry.date ? entry.date.slice(0, 10) : "",
//       note: entry.note || "",
//     });
//     setLocalError("");
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this calendar entry?")) return;
//     try {
//       await deleteDepartmentCalendarEntryApi(id);
//       toast("Entry deleted.");
//       loadEntries();
//     } catch (error) {
//       console.error("Error deleting entry:", error);
//       const msg =
//         error?.response?.data?.message ||
//         "Failed to delete calendar entry.";
//       toast(msg);
//     }
//   };

//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//     if (localError) setLocalError("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!form.department.trim()) {
//       setLocalError("Department is required.");
//       toast("Department is required.");
//       return;
//     }
//     if (!form.date) {
//       setLocalError("Date is required.");
//       toast("Date is required.");
//       return;
//     }

//     const payload = {
//       department: form.department.trim().toUpperCase(),
//       key: form.key,
//       date: form.date,
//       note: form.note.trim(),
//     };

//     try {
//       setSaving(true);
//       await upsertDepartmentCalendarEntryApi(payload);
//       toast("Calendar entry saved.");
//       resetForm();
//       loadEntries();
//     } catch (error) {
//       console.error("Error saving entry:", error);
//       const msg =
//         error?.response?.data?.message ||
//         "Failed to save calendar entry.";
//       toast(msg);
//     } finally {
//       setSaving(false);
//     }
//   };

//   const totalEntries = entries.length;

//   return (
//     <div className="adc-page">
//       {/* Header */}
//       <header className="adc-header">
//         <div className="adc-header__left">
//           <h1 className="adc-title">
//             <MdCalendarMonth className="adc-title__icon" size={22} />
//             <span>Department Academic Calendar</span>
//           </h1>
//           <p className="adc-subtitle">
//             Define and manage key academic dates for each department such as
//             course offering timetables, class commencement dates, enrollment
//             windows and exam periods. These entries power the teacher chatbot
//             and calendar queries.
//           </p>
//         </div>

//         <div className="adc-header__actions">
//           <button
//             type="button"
//             className="adc-btn adc-btn--ghost"
//             onClick={loadEntries}
//             disabled={loading}
//           >
//             <MdRefresh size={18} />
//             <span>{loading ? "Refreshing..." : "Refresh"}</span>
//           </button>
//         </div>
//       </header>

//       {/* Info banner */}
//       <div className="adc-info">
//         <MdInfoOutline size={18} />
//         <span>
//           Entries are matched by <strong>department code</strong> (e.g., CSE,
//           ECE). Teachers&apos; chatbot queries will use these entries to answer
//           calendar-related questions.
//         </span>
//       </div>

//       {/* Top grid: filters + quick stats */}
//       <section className="adc-section adc-top-grid">
//         {/* Filters */}
//         <div className="adc-filters-card">
//           <form className="adc-filters" onSubmit={(e) => { e.preventDefault(); loadEntries(); }}>
//             <div className="adc-filters__group">
//               <div className="adc-filter-label">
//                 <MdFilterList size={18} />
//                 <span>Filter</span>
//               </div>
//               <div className="adc-filter-controls">
//                 <div className="adc-field">
//                   <label htmlFor="adc-filter-dept">Department</label>
//                   <input
//                     id="adc-filter-dept"
//                     type="text"
//                     value={filterDepartment}
//                     onChange={(e) => setFilterDepartment(e.target.value)}
//                     placeholder="e.g., CSE, ECE, BBA"
//                   />
//                 </div>
//               </div>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="adc-btn adc-btn--primary adc-filters__submit"
//             >
//               {loading ? "Filtering..." : "Apply Filters"}
//             </button>
//           </form>
//         </div>

//         {/* Simple stats */}
//         <div className="adc-summary-card">
//           <div className="adc-summary-icon">
//             <MdEventNote size={20} />
//           </div>
//           <div className="adc-summary-body">
//             <p className="adc-summary-label">Total Entries</p>
//             <p className="adc-summary-value">{totalEntries}</p>
//             <p className="adc-summary-note">
//               One or more entries per department / calendar item combination.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Form */}
//       <section className="adc-section adc-grid">
//         <article className="adc-card adc-card--form">
//           <div className="adc-card__header">
//             <h2 className="adc-card__title">
//               {form.id ? "Edit Calendar Entry" : "Create / Update Calendar Entry"}
//             </h2>
//             <p className="adc-card__subtitle">
//               Specify a department, link it to a calendar item (e.g., course
//               offering timetable) and choose the relevant date. Optionally add a
//               note for more context.
//             </p>
//           </div>

//           {localError && (
//             <div className="adc-error-inline">
//               <MdInfoOutline size={16} />
//               <span>{localError}</span>
//             </div>
//           )}

//           <form className="adc-form" onSubmit={handleSubmit}>
//             {/* Department */}
//             <div className="adc-form-field">
//               <label className="adc-form-label" htmlFor="adc-dept">
//                 Department <span className="adc-required">*</span>
//               </label>
//               <div className="adc-input-box">
//                 <span className="adc-input-icon">Dept</span>
//                 <input
//                   id="adc-dept"
//                   name="department"
//                   value={form.department}
//                   onChange={handleFormChange}
//                   placeholder="e.g., CSE"
//                   className="adc-input"
//                 />
//               </div>
//             </div>

//             {/* Calendar Item */}
//             <div className="adc-form-field">
//               <label className="adc-form-label" htmlFor="adc-key">
//                 Calendar Item <span className="adc-required">*</span>
//               </label>
//               <div className="adc-input-box">
//                 <span className="adc-input-icon">
//                   <MdEditCalendar size={16} />
//                 </span>
//                 <select
//                   id="adc-key"
//                   name="key"
//                   value={form.key}
//                   onChange={handleFormChange}
//                   className="adc-select"
//                 >
//                   {KEY_OPTIONS.map((k) => (
//                     <option key={k} value={k}>
//                       {CALENDAR_KEY_LABELS[k] || k}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             {/* Date */}
//             <div className="adc-form-field adc-form-field--inline">
//               <label className="adc-form-label" htmlFor="adc-date">
//                 Date <span className="adc-required">*</span>
//               </label>
//               <div className="adc-input-box adc-input-box--small">
//                 <span className="adc-input-icon">
//                   <MdCalendarMonth size={16} />
//                 </span>
//                 <input
//                   id="adc-date"
//                   type="date"
//                   name="date"
//                   value={form.date}
//                   onChange={handleFormChange}
//                   className="adc-input"
//                 />
//               </div>
//             </div>

//             {/* Note */}
//             <div className="adc-form-field">
//               <label className="adc-form-label" htmlFor="adc-note">
//                 Note (optional)
//               </label>
//               <div className="adc-input-box adc-input-box--textarea">
//                 <span className="adc-input-icon">
//                   <MdEventNote size={16} />
//                 </span>
//                 <textarea
//                   id="adc-note"
//                   name="note"
//                   value={form.note}
//                   onChange={handleFormChange}
//                   rows={2}
//                   className="adc-textarea"
//                   placeholder="e.g., Valid for Fall 2026 undergrad programs"
//                 />
//               </div>
//             </div>

//             <button
//               type="submit"
//               disabled={saving}
//               className="adc-submit-btn"
//             >
//               {saving ? "Saving..." : "Save Calendar Entry"}
//             </button>

//             {form.id && (
//               <button
//                 type="button"
//                 onClick={resetForm}
//                 className="adc-cancel-btn"
//               >
//                 Cancel Edit
//               </button>
//             )}
//           </form>
//         </article>

//         {/* Table card */}
//         <article className="adc-card adc-card--table">
//           <h2 className="adc-card__title adc-card__title--compact">
//             Existing Entries
//           </h2>
//           <p className="adc-card__subtitle adc-card__subtitle--compact">
//             Manage academic calendar entries for each department. Editing an
//             entry will overwrite any existing configuration with the same key
//             and department.
//           </p>

//           <div className="adc-table__wrapper">
//             <table className="adc-table">
//               <thead>
//                 <tr>
//                   <th>Department</th>
//                   <th>Item</th>
//                   <th>Date</th>
//                   <th>Note</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {loading ? (
//                   <tr>
//                     <td colSpan={5} className="adc-table__empty">
//                       Loading...
//                     </td>
//                   </tr>
//                 ) : entries.length === 0 ? (
//                   <tr>
//                     <td colSpan={5} className="adc-table__empty">
//                       No calendar entries found.
//                     </td>
//                   </tr>
//                 ) : (
//                   entries.map((e) => (
//                     <tr key={e._id}>
//                       <td>{e.department}</td>
//                       <td>{CALENDAR_KEY_LABELS[e.key] || e.key}</td>
//                       <td>
//                         {e.date
//                           ? new Date(e.date).toLocaleDateString()
//                           : "-"}
//                       </td>
//                       <td>{e.note || "-"}</td>
//                       <td>
//                         <div className="adc-actions">
//                           <button
//                             type="button"
//                             onClick={() => handleEdit(e)}
//                             className="adc-chip adc-chip--primary"
//                           >
//                             Edit
//                           </button>
//                           <button
//                             type="button"
//                             onClick={() => handleDelete(e._id)}
//                             className="adc-chip adc-chip--danger"
//                           >
//                             <MdDeleteForever size={14} />
//                             <span>Delete</span>
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </article>
//       </section>
//     </div>
//   );
// };

// export default AdminDepartmentCalendarPage;

// client/src/pages/admin/AdminDepartmentCalendarPage.jsx
import React, { useEffect, useState } from "react";
import {
  upsertDepartmentCalendarEntryApi,
  listDepartmentCalendarEntriesApi,
  deleteDepartmentCalendarEntryApi,
} from "../../api/calendarApi";
import {
  CALENDAR_KEYS,
  CALENDAR_KEY_LABELS,
} from "../../constants/calendarKeys";
import {
  MdCalendarMonth,
  MdFilterList,
  MdRefresh,
  MdEventNote,
  MdEditCalendar,
  MdDeleteForever,
  MdInfoOutline,
} from "react-icons/md";
import "./AdminDepartmentCalendarPage.css";
import { toast } from "react-toastify";

const KEY_OPTIONS = Object.values(CALENDAR_KEYS);

const AdminDepartmentCalendarPage = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filterDepartment, setFilterDepartment] = useState("");

  const [form, setForm] = useState({
    id: null,
    department: "",
    key: CALENDAR_KEYS.COURSE_OFFERING_TIMETABLE,
    date: "",
    note: "",
  });
  const [saving, setSaving] = useState(false);
  const [localError, setLocalError] = useState("");

  const loadEntries = async () => {
    try {
      setLoading(true);
      const params = {};
      if (filterDepartment) params.department = filterDepartment;
      const data = await listDepartmentCalendarEntriesApi(params);
      setEntries(data.entries || []);
    } catch (error) {
      console.error("Error loading calendar entries:", error);
      const msg =
        error?.response?.data?.message ||
        "Failed to load department calendar entries.";
      toast(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEntries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetForm = () => {
    setForm({
      id: null,
      department: "",
      key: CALENDAR_KEYS.COURSE_OFFERING_TIMETABLE,
      date: "",
      note: "",
    });
    setLocalError("");
  };

  const handleEdit = (entry) => {
    setForm({
      id: entry._id,
      department: entry.department || "",
      key: entry.key,
      date: entry.date ? entry.date.slice(0, 10) : "",
      note: entry.note || "",
    });
    setLocalError("");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this calendar entry?")) return;
    try {
      await deleteDepartmentCalendarEntryApi(id);
      toast("Entry deleted.");
      loadEntries();
    } catch (error) {
      console.error("Error deleting entry:", error);
      const msg =
        error?.response?.data?.message || "Failed to delete calendar entry.";
      toast(msg);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (localError) setLocalError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.department.trim()) {
      setLocalError("Department is required.");
      toast("Department is required.");
      return;
    }
    if (!form.date) {
      setLocalError("Date is required.");
      toast("Date is required.");
      return;
    }

    const payload = {
      department: form.department.trim().toUpperCase(),
      key: form.key,
      date: form.date,
      note: form.note.trim(),
    };

    try {
      setSaving(true);
      await upsertDepartmentCalendarEntryApi(payload);
      toast("Calendar entry saved.");
      resetForm();
      loadEntries();
    } catch (error) {
      console.error("Error saving entry:", error);
      const msg =
        error?.response?.data?.message || "Failed to save calendar entry.";
      toast(msg);
    } finally {
      setSaving(false);
    }
  };

  const totalEntries = entries.length;

  return (
    <div className="adc-page">
      {/* Header */}
      <header className="adc-header">
        <div className="adc-header__left">
          <h1 className="adc-title">
            <MdCalendarMonth className="adc-title__icon" size={22} />
            <span>Department Academic Calendar</span>
          </h1>
          <p className="adc-subtitle">
            Define and manage key academic dates for each department such as
            course offering timetables, class commencement dates, enrollment
            windows, exam periods, and result timelines. These entries power the
            teacher chatbot and calendar queries.
          </p>
        </div>

        <div className="adc-header__actions">
          <button
            type="button"
            className="adc-btn adc-btn--ghost"
            onClick={loadEntries}
            disabled={loading}
          >
            <MdRefresh size={18} />
            <span>{loading ? "Refreshing..." : "Refresh"}</span>
          </button>
        </div>
      </header>

      {/* Info banner */}
      <div className="adc-info">
        <MdInfoOutline size={18} />
        <span>
          Entries are matched by <strong>department code</strong> (e.g., CSE,
          ECE). Teachers&apos; chatbot queries will use these entries to answer
          calendar-related questions.
        </span>
      </div>

      {/* Top grid: filters + quick stats */}
      <section className="adc-section adc-top-grid">
        {/* Filters */}
        <div className="adc-filters-card">
          <form
            className="adc-filters"
            onSubmit={(e) => {
              e.preventDefault();
              loadEntries();
            }}
          >
            <div className="adc-filters__group">
              <div className="adc-filter-label">
                <MdFilterList size={18} />
                <span>Filter</span>
              </div>
              <div className="adc-filter-controls">
                <div className="adc-field">
                  <label htmlFor="adc-filter-dept">Department</label>
                  <input
                    id="adc-filter-dept"
                    type="text"
                    value={filterDepartment}
                    onChange={(e) => setFilterDepartment(e.target.value)}
                    placeholder="e.g., CSE, ECE, BBA"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="adc-btn adc-btn--primary adc-filters__submit"
            >
              {loading ? "Filtering..." : "Apply Filters"}
            </button>
          </form>
        </div>

        {/* Simple stats */}
        <div className="adc-summary-card">
          <div className="adc-summary-icon">
            <MdEventNote size={20} />
          </div>
          <div className="adc-summary-body">
            <p className="adc-summary-label">Total Entries</p>
            <p className="adc-summary-value">{totalEntries}</p>
            <p className="adc-summary-note">
              One or more entries per department / calendar item combination.
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="adc-section adc-grid">
        <article className="adc-card adc-card--form">
          <div className="adc-card__header">
            <h2 className="adc-card__title">
              {form.id ? "Edit Calendar Entry" : "Create / Update Calendar Entry"}
            </h2>
            <p className="adc-card__subtitle">
              Specify a department, link it to a calendar item (e.g., course
              offering timetable, mid-semester exam, result declaration) and
              choose the relevant date. Optionally add a note for more context.
            </p>
          </div>

          {localError && (
            <div className="adc-error-inline">
              <MdInfoOutline size={16} />
              <span>{localError}</span>
            </div>
          )}

          <form className="adc-form" onSubmit={handleSubmit}>
            {/* Department */}
            <div className="adc-form-field">
              <label className="adc-form-label" htmlFor="adc-dept">
                Department <span className="adc-required">*</span>
              </label>
              <div className="adc-input-box">
                <span className="adc-input-icon">Dept</span>
                <input
                  id="adc-dept"
                  name="department"
                  value={form.department}
                  onChange={handleFormChange}
                  placeholder="e.g., CSE"
                  className="adc-input"
                />
              </div>
            </div>

            {/* Calendar Item */}
            <div className="adc-form-field">
              <label className="adc-form-label" htmlFor="adc-key">
                Calendar Item <span className="adc-required">*</span>
              </label>
              <div className="adc-input-box">
                <span className="adc-input-icon">
                  <MdEditCalendar size={16} />
                </span>
                <select
                  id="adc-key"
                  name="key"
                  value={form.key}
                  onChange={handleFormChange}
                  className="adc-select"
                >
                  {KEY_OPTIONS.map((k) => (
                    <option key={k} value={k}>
                      {CALENDAR_KEY_LABELS[k] || k}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Date */}
            <div className="adc-form-field adc-form-field--inline">
              <label className="adc-form-label" htmlFor="adc-date">
                Date <span className="adc-required">*</span>
              </label>
              <div className="adc-input-box adc-input-box--small">
                <span className="adc-input-icon">
                  <MdCalendarMonth size={16} />
                </span>
                <input
                  id="adc-date"
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleFormChange}
                  className="adc-input"
                />
              </div>
            </div>

            {/* Note */}
            <div className="adc-form-field">
              <label className="adc-form-label" htmlFor="adc-note">
                Note (optional)
              </label>
              <div className="adc-input-box adc-input-box--textarea">
                <span className="adc-input-icon">
                  <MdEventNote size={16} />
                </span>
                <textarea
                  id="adc-note"
                  name="note"
                  value={form.note}
                  onChange={handleFormChange}
                  rows={2}
                  className="adc-textarea"
                  placeholder="e.g., Valid for Fall 2026 undergraduate programs only"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="adc-submit-btn"
            >
              {saving ? "Saving..." : "Save Calendar Entry"}
            </button>

            {form.id && (
              <button
                type="button"
                onClick={resetForm}
                className="adc-cancel-btn"
              >
                Cancel Edit
              </button>
            )}
          </form>
        </article>

        {/* Table card */}
        <article className="adc-card adc-card--table">
          <h2 className="adc-card__title adc-card__title--compact">
            Existing Entries
          </h2>
          <p className="adc-card__subtitle adc-card__subtitle--compact">
            Manage academic calendar entries for each department. Editing an
            entry will overwrite any existing configuration with the same key
            and department.
          </p>

          <div className="adc-table__wrapper">
            <table className="adc-table">
              <thead>
                <tr>
                  <th>Department</th>
                  <th>Item</th>
                  <th>Date</th>
                  <th>Note</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="adc-table__empty">
                      Loading...
                    </td>
                  </tr>
                ) : entries.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="adc-table__empty">
                      No calendar entries found.
                    </td>
                  </tr>
                ) : (
                  entries.map((e) => (
                    <tr key={e._id}>
                      <td>{e.department}</td>
                      <td>{CALENDAR_KEY_LABELS[e.key] || e.key}</td>
                      <td>
                        {e.date ? new Date(e.date).toLocaleDateString() : "-"}
                      </td>
                      <td>{e.note || "-"}</td>
                      <td>
                        <div className="adc-actions">
                          <button
                            type="button"
                            onClick={() => handleEdit(e)}
                            className="adc-chip adc-chip--primary"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(e._id)}
                            className="adc-chip adc-chip--danger"
                          >
                            <MdDeleteForever size={14} />
                            <span>Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </article>
      </section>
    </div>
  );
};

export default AdminDepartmentCalendarPage;
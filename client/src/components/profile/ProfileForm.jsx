// // src/components/profile/ProfileForm.jsx
// import React, { useState } from "react";
// import { USER_ROLES } from "../../constants/roles";

// const ProfileForm = ({ role, values, onChange, onSubmit, submitting }) => {
//   const [localError, setLocalError] = useState("");

//   if (!role) return null;

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     onChange(name, value);
//     if (localError) setLocalError(""); // clear inline error on change
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // basic client-side validation
//     if (!values.name || !values.name.trim()) {
//       setLocalError("Name is required.");
//       return;
//     }

//     // we let backend validate phone, etc.
//     onSubmit(e);
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       style={{
//         maxWidth: "480px",
//         display: "flex",
//         flexDirection: "column",
//         gap: "12px",
//       }}
//     >
//       {localError && (
//         <div style={{ color: "red", fontSize: "13px" }}>{localError}</div>
//       )}

//       {/* Common fields */}
//       <div>
//         <label>
//           Name<span style={{ color: "red" }}> *</span>
//           <input
//             type="text"
//             name="name"
//             value={values.name || ""}
//             onChange={handleInputChange}
//             style={{ width: "100%", padding: "8px", marginTop: "4px" }}
//           />
//         </label>
//       </div>

//       <div>
//         <label>
//           Email (read-only)
//           <input
//             type="email"
//             name="email"
//             value={values.email || ""}
//             readOnly
//             style={{
//               width: "100%",
//               padding: "8px",
//               marginTop: "4px",
//               backgroundColor: "#f5f5f5",
//             }}
//           />
//         </label>
//       </div>

//       <div>
//         <label>
//           Phone
//           <input
//             type="text"
//             name="phone"
//             value={values.phone || ""}
//             onChange={handleInputChange}
//             style={{ width: "100%", padding: "8px", marginTop: "4px" }}
//           />
//         </label>
//       </div>

//       {/* Role-specific sections (same as before, using your fields) */}
//       {role === USER_ROLES.STUDENT && (
//         <>
//           <div>
//             <label>
//               Department
//               <input
//                 type="text"
//                 name="department"
//                 value={values.department || ""}
//                 onChange={handleInputChange}
//                 style={{ width: "100%", padding: "8px", marginTop: "4px" }}
//               />
//             </label>
//           </div>
//           <div>
//             <label>
//               Semester
//               <input
//                 type="text"
//                 name="semester"
//                 value={values.semester || ""}
//                 onChange={handleInputChange}
//                 style={{ width: "100%", padding: "8px", marginTop: "4px" }}
//               />
//             </label>
//           </div>
//         </>
//       )}

//       {role === USER_ROLES.TEACHER && (
//         <>
//           <div>
//             <label>
//               Department
//               <input
//                 type="text"
//                 name="department"
//                 value={values.department || ""}
//                 onChange={handleInputChange}
//                 style={{ width: "100%", padding: "8px", marginTop: "4px" }}
//               />
//             </label>
//           </div>
//           <div>
//             <label>
//               Designation
//               <input
//                 type="text"
//                 name="designation"
//                 value={values.designation || ""}
//                 onChange={handleInputChange}
//                 style={{ width: "100%", padding: "8px", marginTop: "4px" }}
//               />
//             </label>
//           </div>
//         </>
//       )}

//       {role === USER_ROLES.SERVICE_PROVIDER && (
//         <>
//           <div>
//             <label>
//               Specialization
//               <input
//                 type="text"
//                 name="specialization"
//                 value={values.specialization || ""}
//                 onChange={handleInputChange}
//                 style={{ width: "100%", padding: "8px", marginTop: "4px" }}
//               />
//             </label>
//           </div>
//           <div>
//             <label>
//               Campus / Building
//               <input
//                 type="text"
//                 name="campusOrBuilding"
//                 value={values.campusOrBuilding || ""}
//                 onChange={handleInputChange}
//                 style={{ width: "100%", padding: "8px", marginTop: "4px" }}
//               />
//             </label>
//           </div>
//         </>
//       )}

//       {role === USER_ROLES.SERVER_ROOM_STAFF && (
//         <>
//           <div>
//             <label>
//               Specialization
//               <input
//                 type="text"
//                 name="specialization"
//                 value={values.specialization || ""}
//                 onChange={handleInputChange}
//                 style={{ width: "100%", padding: "8px", marginTop: "4px" }}
//               />
//             </label>
//           </div>
//           <div>
//             <label>
//               Campus / Building
//               <input
//                 type="text"
//                 name="campusOrBuilding"
//                 value={values.campusOrBuilding || ""}
//                 onChange={handleInputChange}
//                 style={{ width: "100%", padding: "8px", marginTop: "4px" }}
//               />
//             </label>
//           </div>
//         </>
//       )}

//       {role === USER_ROLES.ADMIN && (
//         <>
//           {/* Admin: currently only name + phone + read-only info */}
//         </>
//       )}

//       {/* Status info (read-only) */}
//       <div style={{ marginTop: "8px", fontSize: "12px", color: "#555" }}>
//         <div>Role: {role}</div>
//         <div>
//           Email Verified: {values.isEmailVerified ? "Yes" : "No"}
//         </div>
//         <div>Account Active: {values.isActive ? "Yes" : "No"}</div>
//       </div>

//       <button
//         type="submit"
//         disabled={submitting}
//         style={{ marginTop: "12px", padding: "8px 12px" }}
//       >
//         {submitting ? "Saving..." : "Save Profile"}
//       </button>
//     </form>
//   );
// };

// export default ProfileForm;
// import React, { useState } from "react";
// import { USER_ROLES } from "../../constants/roles";
// import {
//   MdPerson,
//   MdEmail,
//   MdPhone,
//   MdSchool,
//   MdWork,
//   MdBusiness,
//   MdVerifiedUser,
//   MdToggleOn,
//   MdToggleOff,
// } from "react-icons/md";
// import "./ProfileForm.css";
// const ProfileForm = ({ role, values, onChange, onSubmit, submitting }) => {
//   const [localError, setLocalError] = useState("");

//   if (!role) return null;

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     onChange(name, value);
//     if (localError) setLocalError(""); // clear inline error on change
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // basic client-side validation
//     if (!values.name || !values.name.trim()) {
//       setLocalError("Name is required.");
//       return;
//     }

//     // delegate to parent handler
//     onSubmit(e);
//   };

//   return (
//     <form className="pf-form" onSubmit={handleSubmit}>
//       {localError && (
//         <div className="pf-error-inline">
//           {localError}
//         </div>
//       )}

//       {/* Name */}
//       <div className="pf-field">
//         <label className="pf-label" htmlFor="pf-name">
//           Name <span className="pf-required">*</span>
//         </label>
//         <div className="pf-input-box">
//           <span className="pf-input-icon">
//             <MdPerson />
//           </span>
//           <input
//             id="pf-name"
//             type="text"
//             name="name"
//             value={values.name || ""}
//             onChange={handleInputChange}
//             className="pf-input"
//             placeholder="Your full name"
//           />
//         </div>
//       </div>

//       {/* Email (read-only) */}
//       <div className="pf-field">
//         <label className="pf-label" htmlFor="pf-email">
//           Email (read-only)
//         </label>
//         <div className="pf-input-box pf-input-box--readonly">
//           <span className="pf-input-icon">
//             <MdEmail />
//           </span>
//           <input
//             id="pf-email"
//             type="email"
//             name="email"
//             value={values.email || ""}
//             readOnly
//             className="pf-input pf-input--readonly"
//           />
//         </div>
//       </div>

//       {/* Phone */}
//       <div className="pf-field">
//         <label className="pf-label" htmlFor="pf-phone">
//           Phone
//         </label>
//         <div className="pf-input-box">
//           <span className="pf-input-icon">
//             <MdPhone />
//           </span>
//           <input
//             id="pf-phone"
//             type="text"
//             name="phone"
//             value={values.phone || ""}
//             onChange={handleInputChange}
//             className="pf-input"
//             placeholder="+92 300 0000000"
//           />
//         </div>
//       </div>

//       {/* Role-specific fields */}
//       {role === USER_ROLES.STUDENT && (
//         <>
//           <div className="pf-field">
//             <label className="pf-label" htmlFor="pf-department">
//               Department
//             </label>
//             <div className="pf-input-box">
//               <span className="pf-input-icon">
//                 <MdSchool />
//               </span>
//               {/* <input
//                 id="pf-department"
//                 type="text"
//                 name="department"
//                 value={values.department || ""}
//                 onChange={handleInputChange}
//                 className="pf-input"
//                 placeholder="BS Computer Science"
//               /> */}
//               <select
//                 id="pf-department"
//                 name="department"
//                 value={values.department || ""}
//                 onChange={handleInputChange}
//                 className="pf-input"
//               >
//                 <option value="bscs">BSCS</option>
//                 <option value="bsse">BSSE</option>
//                 <option value="bsit">BSIT</option>
//                 <option value="bsai">BSAI</option>
//                 <option value="bsds">BSDS</option>
//                 <option value="bsdfcs">BSDFCS</option>
//               </select>
//             </div>
//           </div>

//           <div className="pf-field">
//             <label className="pf-label" htmlFor="pf-semester">
//               Semester
//             </label>
//             <div className="pf-input-box">
//               <span className="pf-input-icon">
//                 <MdSchool />
//               </span>
//               {/* <input
//                 id="pf-semester"
//                 type="text"
//                 name="semester"
//                 value={values.semester || ""}
//                 onChange={handleInputChange}
//                 className="pf-input"
//                 placeholder="e.g., 5th"
//               /> */}
//               <select
//                 id="pf-semester"
//                 name="semester"
//                 value={values.semester || ""}
//                 onChange={handleInputChange}
//                 className="pf-input"
//               >
//                 <option value="1st Semester">1st Semester</option>
//                 <option value="2nd Semester">2nd Semester</option>
//                 <option value="3rd Semester">3rd Semester</option>
//                 <option value="4th Semester">4th Semester</option>
//                 <option value="5th Semester">5th Semester</option>
//                 <option value="6th Semester">6th Semester</option>
//                 <option value="7th Semester">7th Semester</option>
//                 <option value="8th Semester">8th Semester</option>
//               </select>
//             </div>
//           </div>
//         </>
//       )}

//       {role === USER_ROLES.TEACHER && (
//         <>
//           <div className="pf-field">
//             <label className="pf-label" htmlFor="pf-department">
//               Department
//             </label>
//             <div className="pf-input-box">
//               <span className="pf-input-icon">
//                 <MdSchool />
//               </span>
//               {/* <input
//                 id="pf-department"
//                 type="text"
//                 name="department"
//                 value={values.department || ""}
//                 onChange={handleInputChange}
//                 className="pf-input"
//                 placeholder="e.g., Computer Science"
//               /> */}
//                <select
//                 id="pf-department"
//                 name="department"
//                 value={values.department || ""}
//                 onChange={handleInputChange}
//                 className="pf-input"
//               >
//                 <option value="bscs">BSCS</option>
//                 <option value="bsse">BSSE</option>
//                 <option value="bsit">BSIT</option>
//                 <option value="bsai">BSAI</option>
//                 <option value="bsds">BSDS</option>
//                 <option value="bsdfcs">BSDFCS</option>
//               </select>
//             </div>
//           </div>

//           <div className="pf-field">
//             <label className="pf-label" htmlFor="pf-designation">
//               Designation
//             </label>
//             <div className="pf-input-box">
//               <span className="pf-input-icon">
//                 <MdWork />
//               </span>
//               {/* <input
//                 id="pf-designation"
//                 type="text"
//                 name="designation"
//                 value={values.designation || ""}
//                 onChange={handleInputChange}
//                 className="pf-input"
//                 placeholder="e.g., Assistant Professor"
//               /> */}
//               <select
//                 id="pf-designation"
//                 name="designation"
//                 value={values.designation || ""}
//                 onChange={handleInputChange}
//                 className="pf-input"
//               >
//                 <option value="Lecturer">Lecturer</option>
//                 <option value="Assistant Lecturer">Assistant Lecturer</option>
//                 <option value="Professor">Professor</option>
//               </select>
//             </div>
//           </div>
//         </>
//       )}

//       {(role === USER_ROLES.SERVICE_PROVIDER ||
//         role === USER_ROLES.SERVER_ROOM_STAFF) && (
//         <>
//           <div className="pf-field">
//             <label className="pf-label" htmlFor="pf-specialization">
//               Specialization
//             </label>
//             <div className="pf-input-box">
//               <span className="pf-input-icon">
//                 <MdWork />
//               </span>
//               <input
//                 id="pf-specialization"
//                 type="text"
//                 name="specialization"
//                 value={values.specialization || ""}
//                 onChange={handleInputChange}
//                 className="pf-input"
//                 placeholder="IT Support, Electrical, etc."
//               />
//             </div>
//           </div>

//           <div className="pf-field">
//             <label className="pf-label" htmlFor="pf-campusOrBuilding">
//               Campus / Building
//             </label>
//             <div className="pf-input-box">
//               <span className="pf-input-icon">
//                 <MdBusiness />
//               </span>
//               <input
//                 id="pf-campusOrBuilding"
//                 type="text"
//                 name="campusOrBuilding"
//                 value={values.campusOrBuilding || ""}
//                 onChange={handleInputChange}
//                 className="pf-input"
//                 placeholder="Main Campus, CS Block, etc."
//               />
//             </div>
//           </div>
//         </>
//       )}

//       {role === USER_ROLES.ADMIN && (
//         <>
//           {/* Admin: currently only name + phone + read-only info */}
//         </>
//       )}

//       {/* Status info (read-only) */}
//       <div className="pf-status">
//         <div className="pf-status-row">
//           <span className="pf-status-label">Role</span>
//           <span className="pf-status-value">{role}</span>
//         </div>
//         <div className="pf-status-row">
//           <span className="pf-status-label">Email Verified</span>
//           <span className="pf-status-value pf-status-value--icon">
//             {values.isEmailVerified ? (
//               <>
//                 <MdVerifiedUser />
//                 <span>Yes</span>
//               </>
//             ) : (
//               <>
//                 <MdVerifiedUser />
//                 <span>No</span>
//               </>
//             )}
//           </span>
//         </div>
//         <div className="pf-status-row">
//           <span className="pf-status-label">Account Active</span>
//           <span className="pf-status-value pf-status-value--icon">
//             {values.isActive ? (
//               <>
//                 <MdToggleOn />
//                 <span>Active</span>
//               </>
//             ) : (
//               <>
//                 <MdToggleOff />
//                 <span>Inactive</span>
//               </>
//             )}
//           </span>
//         </div>
//       </div>

//       <button
//         type="submit"
//         disabled={submitting}
//         className="pf-submit-btn"
//       >
//         {submitting ? "Saving..." : "Save Profile"}
//       </button>
//     </form>
//   );
// };

// export default ProfileForm;

// import React, { useState } from "react";
// import { USER_ROLES } from "../../constants/roles";
// import {
//   MdPerson,
//   MdEmail,
//   MdPhone,
//   MdSchool,
//   MdWork,
//   MdBusiness,
//   MdVerifiedUser,
//   MdToggleOn,
//   MdToggleOff,
// } from "react-icons/md";
// import "./ProfileForm.css";

// /* ── Shared option lists (keep in sync with AdminUserCreatePage) ── */
// const DEPARTMENT_OPTIONS = [
//   { value: "bscs", label: "BSCS" },
//   { value: "bsse", label: "BSSE" },
//   { value: "bsit", label: "BSIT" },
//   { value: "bsai", label: "BSAI" },
//   { value: "bsds", label: "BSDS" },
//   { value: "bsdfcs", label: "BSDFCS" },
// ];

// const SEMESTER_OPTIONS = [
//   "1st Semester",
//   "2nd Semester",
//   "3rd Semester",
//   "4th Semester",
//   "5th Semester",
//   "6th Semester",
//   "7th Semester",
//   "8th Semester",
// ];

// const DESIGNATION_OPTIONS = [
//   { value: "Lecturer", label: "Lecturer" },
//   { value: "Assistant Lecturer", label: "Assistant Lecturer" },
//   { value: "Professor", label: "Professor" },
// ];

// /* ── Field map — mirrors AdminUserCreatePage ROLE_FIELDS ─────────── */
// const ROLE_FIELDS = {
//   [USER_ROLES.STUDENT]: ["department", "semester"],
//   [USER_ROLES.TEACHER]: ["department", "designation"],
//   [USER_ROLES.SERVICE_PROVIDER]: [
//     "department",
//     "specialization",
//     "campusOrBuilding",
//   ],
//   [USER_ROLES.SERVER_ROOM_STAFF]: ["specialization", "campusOrBuilding"],
//   [USER_ROLES.ADMIN]: [],
// };

// const ProfileForm = ({ role, values, onChange, onSubmit, submitting }) => {
//   const [localError, setLocalError] = useState("");

//   if (!role) return null;

//   const show = (field) => ROLE_FIELDS[role]?.includes(field) ?? false;

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     onChange(name, value);
//     if (localError) setLocalError("");
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!values.name || !values.name.trim()) {
//       setLocalError("Name is required.");
//       return;
//     }
//     onSubmit(e);
//   };

//   return (
//     <form className="pf-form" onSubmit={handleSubmit}>
//       {localError && <div className="pf-error-inline">{localError}</div>}

//       {/* ── Always-visible ──────────────────────────────────────── */}

//       {/* Name */}
//       <div className="pf-field">
//         <label className="pf-label" htmlFor="pf-name">
//           Name <span className="pf-required">*</span>
//         </label>
//         <div className="pf-input-box">
//           <span className="pf-input-icon">
//             <MdPerson />
//           </span>
//           <input
//             id="pf-name"
//             type="text"
//             name="name"
//             value={values.name || ""}
//             onChange={handleInputChange}
//             className="pf-input"
//             placeholder="Your full name"
//           />
//         </div>
//       </div>

//       {/* Email (read-only) */}
//       <div className="pf-field">
//         <label className="pf-label" htmlFor="pf-email">
//           Email (read-only)
//         </label>
//         <div className="pf-input-box pf-input-box--readonly">
//           <span className="pf-input-icon">
//             <MdEmail />
//           </span>
//           <input
//             id="pf-email"
//             type="email"
//             name="email"
//             value={values.email || ""}
//             readOnly
//             className="pf-input pf-input--readonly"
//           />
//         </div>
//       </div>

//       {/* Phone */}
//       <div className="pf-field">
//         <label className="pf-label" htmlFor="pf-phone">
//           Phone
//         </label>
//         <div className="pf-input-box">
//           <span className="pf-input-icon">
//             <MdPhone />
//           </span>
//           <input
//             id="pf-phone"
//             type="text"
//             name="phone"
//             value={values.phone || ""}
//             onChange={handleInputChange}
//             className="pf-input"
//             placeholder="+92 300 0000000"
//           />
//         </div>
//       </div>

//       {/* ── Role-specific ───────────────────────────────────────── */}

//       {/* Department — STUDENT | TEACHER | SERVICE_PROVIDER */}
//       {show("department") && (
//         <div className="pf-field">
//           <label className="pf-label" htmlFor="pf-department">
//             Department
//           </label>
//           <div className="pf-input-box">
//             <span className="pf-input-icon">
//               <MdSchool />
//             </span>
//             <select
//               id="pf-department"
//               name="department"
//               value={values.department || ""}
//               onChange={handleInputChange}
//               className="pf-input"
//             >
//               <option value="">-- Select Department --</option>
//               {DEPARTMENT_OPTIONS.map((d) => (
//                 <option key={d.value} value={d.value}>
//                   {d.label}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//       )}

//       {/* Semester — STUDENT only */}
//       {show("semester") && (
//         <div className="pf-field">
//           <label className="pf-label" htmlFor="pf-semester">
//             Semester
//           </label>
//           <div className="pf-input-box">
//             <span className="pf-input-icon">
//               <MdSchool />
//             </span>
//             <select
//               id="pf-semester"
//               name="semester"
//               value={values.semester || ""}
//               onChange={handleInputChange}
//               className="pf-input"
//             >
//               <option value="">-- Select Semester --</option>
//               {SEMESTER_OPTIONS.map((s) => (
//                 <option key={s} value={s}>
//                   {s}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//       )}

//       {/* Designation — TEACHER only */}
//       {show("designation") && (
//         <div className="pf-field">
//           <label className="pf-label" htmlFor="pf-designation">
//             Designation
//           </label>
//           <div className="pf-input-box">
//             <span className="pf-input-icon">
//               <MdWork />
//             </span>
//             <select
//               id="pf-designation"
//               name="designation"
//               value={values.designation || ""}
//               onChange={handleInputChange}
//               className="pf-input"
//             >
//               <option value="">-- Select Designation --</option>
//               {DESIGNATION_OPTIONS.map((d) => (
//                 <option key={d.value} value={d.value}>
//                   {d.label}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//       )}

//       {/* Specialization — SERVICE_PROVIDER | SERVER_ROOM_STAFF */}
//       {show("specialization") && (
//         <div className="pf-field">
//           <label className="pf-label" htmlFor="pf-specialization">
//             Specialization
//           </label>
//           <div className="pf-input-box">
//             <span className="pf-input-icon">
//               <MdWork />
//             </span>
//             <input
//               id="pf-specialization"
//               type="text"
//               name="specialization"
//               value={values.specialization || ""}
//               onChange={handleInputChange}
//               className="pf-input"
//               placeholder="IT Support, Electrical, etc."
//             />
//           </div>
//         </div>
//       )}

//       {/* Campus / Building — SERVICE_PROVIDER | SERVER_ROOM_STAFF */}
//       {show("campusOrBuilding") && (
//         <div className="pf-field">
//           <label className="pf-label" htmlFor="pf-campusOrBuilding">
//             Campus / Building
//           </label>
//           <div className="pf-input-box">
//             <span className="pf-input-icon">
//               <MdBusiness />
//             </span>
//             <input
//               id="pf-campusOrBuilding"
//               type="text"
//               name="campusOrBuilding"
//               value={values.campusOrBuilding || ""}
//               onChange={handleInputChange}
//               className="pf-input"
//               placeholder="Main Campus, CS Block, etc."
//             />
//           </div>
//         </div>
//       )}

//       {/* ── Read-only status strip ──────────────────────────────── */}
//       <div className="pf-status">
//         <div className="pf-status-row">
//           <span className="pf-status-label">Role</span>
//           <span className="pf-status-value">{role}</span>
//         </div>

//         <div className="pf-status-row">
//           <span className="pf-status-label">Email Verified</span>
//           <span className="pf-status-value pf-status-value--icon">
//             <MdVerifiedUser
//               style={{ color: values.isEmailVerified ? "#16a34a" : "#dc2626" }}
//             />
//             <span>{values.isEmailVerified ? "Yes" : "No"}</span>
//           </span>
//         </div>

//         <div className="pf-status-row">
//           <span className="pf-status-label">Account Active</span>
//           <span className="pf-status-value pf-status-value--icon">
//             {values.isActive ? (
//               <MdToggleOn style={{ color: "#16a34a" }} />
//             ) : (
//               <MdToggleOff style={{ color: "#dc2626" }} />
//             )}
//             <span>{values.isActive ? "Active" : "Inactive"}</span>
//           </span>
//         </div>
//       </div>

//       <button type="submit" disabled={submitting} className="pf-submit-btn">
//         {submitting ? "Saving..." : "Save Profile"}
//       </button>
//     </form>
//   );
// };

// export default ProfileForm;
// import React, { useState } from "react";
// import { USER_ROLES } from "../../constants/roles";
// import {
//   MdPerson,
//   MdEmail,
//   MdPhone,
//   MdSchool,
//   MdWork,
//   MdApartment,
//   MdVerifiedUser,
//   MdToggleOn,
//   MdToggleOff,
// } from "react-icons/md";
// import "./ProfileForm.css";
// import {
//   ACADEMIC_DEPARTMENT_OPTIONS,
//   SERVICE_DEPARTMENT_OPTIONS,
//   SEMESTER_OPTIONS,
//   DESIGNATION_OPTIONS,
//   CAMPUS_OPTIONS,
// } from "../../constants/formOptions";

// /* ── Field map ───────────────────────────────────────────────────── */
// const ROLE_FIELDS = {
//   [USER_ROLES.STUDENT]: ["department", "semester"],
//   [USER_ROLES.TEACHER]: ["department", "designation"],
//   [USER_ROLES.SERVICE_PROVIDER]: [
//     "department",
//     "specialization",
//     "campusOrBuilding",
//   ],
//   [USER_ROLES.SERVER_ROOM_STAFF]: ["specialization", "campusOrBuilding"],
//   [USER_ROLES.ADMIN]: [],
// };

// const ProfileForm = ({ role, values, onChange, onSubmit, submitting }) => {
//   const [localError, setLocalError] = useState("");

//   if (!role) return null;

//   const show = (field) => ROLE_FIELDS[role]?.includes(field) ?? false;

//   /* Pick correct department list for this role */
//   const getDepartmentOptions = () => {
//     if (role === USER_ROLES.SERVICE_PROVIDER) return SERVICE_DEPARTMENT_OPTIONS;
//     return ACADEMIC_DEPARTMENT_OPTIONS;
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     onChange(name, value);
//     if (localError) setLocalError("");
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!values.name || !values.name.trim()) {
//       setLocalError("Name is required.");
//       return;
//     }
//     onSubmit(e);
//   };

//   return (
//     <form className="pf-form" onSubmit={handleSubmit}>
//       {localError && (
//         <div className="pf-error-inline">{localError}</div>
//       )}

//       {/* ── Always-visible ──────────────────────────────────────── */}

//       {/* Name */}
//       <div className="pf-field">
//         <label className="pf-label" htmlFor="pf-name">
//           Name <span className="pf-required">*</span>
//         </label>
//         <div className="pf-input-box">
//           <span className="pf-input-icon"><MdPerson /></span>
//           <input
//             id="pf-name"
//             type="text"
//             name="name"
//             value={values.name || ""}
//             onChange={handleInputChange}
//             className="pf-input"
//             placeholder="Your full name"
//           />
//         </div>
//       </div>

//       {/* Email (read-only) */}
//       <div className="pf-field">
//         <label className="pf-label" htmlFor="pf-email">
//           Email (read-only)
//         </label>
//         <div className="pf-input-box pf-input-box--readonly">
//           <span className="pf-input-icon"><MdEmail /></span>
//           <input
//             id="pf-email"
//             type="email"
//             name="email"
//             value={values.email || ""}
//             readOnly
//             className="pf-input pf-input--readonly"
//           />
//         </div>
//       </div>

//       {/* Phone */}
//       <div className="pf-field">
//         <label className="pf-label" htmlFor="pf-phone">
//           Phone
//         </label>
//         <div className="pf-input-box">
//           <span className="pf-input-icon"><MdPhone /></span>
//           <input
//             id="pf-phone"
//             type="text"
//             name="phone"
//             value={values.phone || ""}
//             onChange={handleInputChange}
//             className="pf-input"
//             placeholder="+92 300 0000000"
//           />
//         </div>
//       </div>

//       {/* ── Role-specific fields ─────────────────────────────────── */}

//       {/* Department
//           · STUDENT / TEACHER      → academic list
//           · SERVICE_PROVIDER       → service category list         */}
//       {show("department") && (
//         <div className="pf-field">
//           <label className="pf-label" htmlFor="pf-department">
//             {role === USER_ROLES.SERVICE_PROVIDER
//               ? "Service Category"
//               : "Department"}
//           </label>
//           <div className="pf-input-box">
//             <span className="pf-input-icon"><MdSchool /></span>
//             <select
//               id="pf-department"
//               name="department"
//               value={values.department || ""}
//               onChange={handleInputChange}
//               className="pf-input"
//             >
//               {getDepartmentOptions().map((d) => (
//                 <option key={d.value} value={d.value}>
//                   {d.label}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//       )}

//       {/* Semester — STUDENT only */}
//       {show("semester") && (
//         <div className="pf-field">
//           <label className="pf-label" htmlFor="pf-semester">
//             Semester
//           </label>
//           <div className="pf-input-box">
//             <span className="pf-input-icon"><MdSchool /></span>
//             <select
//               id="pf-semester"
//               name="semester"
//               value={values.semester || ""}
//               onChange={handleInputChange}
//               className="pf-input"
//             >
//               <option value="">-- Select Semester --</option>
//               {SEMESTER_OPTIONS.map((s) => (
//                 <option key={s} value={s}>{s}</option>
//               ))}
//             </select>
//           </div>
//         </div>
//       )}

//       {/* Designation — TEACHER only */}
//       {show("designation") && (
//         <div className="pf-field">
//           <label className="pf-label" htmlFor="pf-designation">
//             Designation
//           </label>
//           <div className="pf-input-box">
//             <span className="pf-input-icon"><MdWork /></span>
//             <select
//               id="pf-designation"
//               name="designation"
//               value={values.designation || ""}
//               onChange={handleInputChange}
//               className="pf-input"
//             >
//               {DESIGNATION_OPTIONS.map((d) => (
//                 <option key={d.value} value={d.value}>{d.label}</option>
//               ))}
//             </select>
//           </div>
//         </div>
//       )}

//       {/* Specialization — SERVICE_PROVIDER | SERVER_ROOM_STAFF */}
//       {show("specialization") && (
//         <div className="pf-field">
//           <label className="pf-label" htmlFor="pf-specialization">
//             Specialization
//           </label>
//           <div className="pf-input-box">
//             <span className="pf-input-icon"><MdWork /></span>
//             <input
//               id="pf-specialization"
//               type="text"
//               name="specialization"
//               value={values.specialization || ""}
//               onChange={handleInputChange}
//               className="pf-input"
//               placeholder="IT Support, Electrical, etc."
//             />
//           </div>
//         </div>
//       )}

//       {/* Campus / Building — SERVICE_PROVIDER | SERVER_ROOM_STAFF */}
//       {show("campusOrBuilding") && (
//         <div className="pf-field">
//           <label className="pf-label" htmlFor="pf-campusOrBuilding">
//             Campus / Building
//           </label>
//           <div className="pf-input-box">
//             <span className="pf-input-icon"><MdApartment /></span>
//             <select
//               id="pf-campusOrBuilding"
//               name="campusOrBuilding"
//               value={values.campusOrBuilding || ""}
//               onChange={handleInputChange}
//               className="pf-input"
//             >
//               {CAMPUS_OPTIONS.map((c) => (
//                 <option key={c.value} value={c.value}>{c.label}</option>
//               ))}
//             </select>
//           </div>
//         </div>
//       )}

//       {/* ── Read-only status strip ───────────────────────────────── */}
//       <div className="pf-status">
//         <div className="pf-status-row">
//           <span className="pf-status-label">Role</span>
//           <span className="pf-status-value">{role}</span>
//         </div>

//         <div className="pf-status-row">
//           <span className="pf-status-label">Email Verified</span>
//           <span className="pf-status-value pf-status-value--icon">
//             <MdVerifiedUser
//               style={{ color: values.isEmailVerified ? "#16a34a" : "#dc2626" }}
//             />
//             <span>{values.isEmailVerified ? "Yes" : "No"}</span>
//           </span>
//         </div>

//         <div className="pf-status-row">
//           <span className="pf-status-label">Account Active</span>
//           <span className="pf-status-value pf-status-value--icon">
//             {values.isActive ? (
//               <MdToggleOn style={{ color: "#16a34a" }} />
//             ) : (
//               <MdToggleOff style={{ color: "#dc2626" }} />
//             )}
//             <span>{values.isActive ? "Active" : "Inactive"}</span>
//           </span>
//         </div>
//       </div>

//       <button type="submit" disabled={submitting} className="pf-submit-btn">
//         {submitting ? "Saving..." : "Save Profile"}
//       </button>
//     </form>
//   );
// };

// export default ProfileForm;

import React, { useState } from "react";
import { USER_ROLES } from "../../constants/roles";
import {
  MdPerson,
  MdEmail,
  MdPhone,
  MdSchool,
  MdWork,
  MdApartment,
  MdVerifiedUser,
  MdToggleOn,
  MdToggleOff,
} from "react-icons/md";
import "./ProfileForm.css";
import {
  ACADEMIC_DEPARTMENT_OPTIONS,
  SERVICE_DEPARTMENT_OPTIONS,
  SEMESTER_OPTIONS,
  DESIGNATION_OPTIONS,
  CAMPUS_OPTIONS,
} from "../../constants/formOptions";

/* ── Field map ───────────────────────────────────────────────────── */
const ROLE_FIELDS = {
  [USER_ROLES.STUDENT]: ["department", "semester"],
  [USER_ROLES.TEACHER]: ["department", "designation"],
  [USER_ROLES.SERVICE_PROVIDER]: ["department", "specialization", "campusOrBuilding"],
  [USER_ROLES.SERVER_ROOM_STAFF]: ["specialization", "campusOrBuilding"],
  [USER_ROLES.ADMIN]: [],
};

const ProfileForm = ({ role, values, onChange, onSubmit, submitting }) => {
  const [localError, setLocalError] = useState("");

  if (!role) return null;

  /* ── Normalize role so "SERVICE_PROVIDER" always matches ────────
     Defensive: trim + uppercase in case backend ever sends
     "service_provider" or " SERVICE_PROVIDER "                     */
  const normalizedRole = role?.toString().trim().toUpperCase();

  const show = (field) =>
    ROLE_FIELDS[normalizedRole]?.includes(field) ?? false;

  /* Pick correct department list for this role */
  const getDepartmentOptions = () => {
    if (normalizedRole === USER_ROLES.SERVICE_PROVIDER)
      return SERVICE_DEPARTMENT_OPTIONS;
    return ACADEMIC_DEPARTMENT_OPTIONS;
  };

  const isServiceProvider = normalizedRole === USER_ROLES.SERVICE_PROVIDER;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
    if (localError) setLocalError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.name || !values.name.trim()) {
      setLocalError("Name is required.");
      return;
    }
    onSubmit(e);
  };

  return (
    <form className="pf-form" onSubmit={handleSubmit}>
      {localError && (
        <div className="pf-error-inline">{localError}</div>
      )}

      {/* ── Always-visible ──────────────────────────────────────── */}

      {/* Name */}
      <div className="pf-field">
        <label className="pf-label" htmlFor="pf-name">
          Name <span className="pf-required">*</span>
        </label>
        <div className="pf-input-box">
          <span className="pf-input-icon">
            <MdPerson />
          </span>
          <input
            id="pf-name"
            type="text"
            name="name"
            value={values.name || ""}
            onChange={handleInputChange}
            className="pf-input"
            placeholder="Your full name"
          />
        </div>
      </div>

      {/* Email (read-only) */}
      <div className="pf-field">
        <label className="pf-label" htmlFor="pf-email">
          Email (read-only)
        </label>
        <div className="pf-input-box pf-input-box--readonly">
          <span className="pf-input-icon">
            <MdEmail />
          </span>
          <input
            id="pf-email"
            type="email"
            name="email"
            value={values.email || ""}
            readOnly
            className="pf-input pf-input--readonly"
          />
        </div>
      </div>

      {/* Phone */}
      <div className="pf-field">
        <label className="pf-label" htmlFor="pf-phone">
          Phone
        </label>
        <div className="pf-input-box">
          <span className="pf-input-icon">
            <MdPhone />
          </span>
          <input
            id="pf-phone"
            type="text"
            name="phone"
            value={values.phone || ""}
            onChange={handleInputChange}
            className="pf-input"
            placeholder="+92 300 0000000"
          />
        </div>
      </div>

      {/* ── Role-specific fields ─────────────────────────────────── */}

      {/* Department
          · STUDENT / TEACHER    → academic department list
          · SERVICE_PROVIDER     → service category list            */}
      {show("department") && (
        <div className="pf-field">
          <label className="pf-label" htmlFor="pf-department">
            {isServiceProvider ? "Service Category" : "Department"}
          </label>
          <div className="pf-input-box">
            <span className="pf-input-icon">
              <MdSchool />
            </span>
            <select
              id="pf-department"
              name="department"
              value={values.department || ""}
              onChange={handleInputChange}
              className="pf-input"
            >
              {getDepartmentOptions().map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Semester — STUDENT only */}
      {show("semester") && (
        <div className="pf-field">
          <label className="pf-label" htmlFor="pf-semester">
            Semester
          </label>
          <div className="pf-input-box">
            <span className="pf-input-icon">
              <MdSchool />
            </span>
            <select
              id="pf-semester"
              name="semester"
              value={values.semester || ""}
              onChange={handleInputChange}
              className="pf-input"
            >
              <option value="">-- Select Semester --</option>
              {SEMESTER_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Designation — TEACHER only */}
      {show("designation") && (
        <div className="pf-field">
          <label className="pf-label" htmlFor="pf-designation">
            Designation
          </label>
          <div className="pf-input-box">
            <span className="pf-input-icon">
              <MdWork />
            </span>
            <select
              id="pf-designation"
              name="designation"
              value={values.designation || ""}
              onChange={handleInputChange}
              className="pf-input"
            >
              {DESIGNATION_OPTIONS.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Specialization — SERVICE_PROVIDER | SERVER_ROOM_STAFF */}
      {show("specialization") && (
        <div className="pf-field">
          <label className="pf-label" htmlFor="pf-specialization">
            Specialization
          </label>
          <div className="pf-input-box">
            <span className="pf-input-icon">
              <MdWork />
            </span>
            <input
              id="pf-specialization"
              type="text"
              name="specialization"
              value={values.specialization || ""}
              onChange={handleInputChange}
              className="pf-input"
              placeholder="IT Support, Electrical, etc."
            />
          </div>
        </div>
      )}

      {/* Campus / Building — SERVICE_PROVIDER | SERVER_ROOM_STAFF */}
      {show("campusOrBuilding") && (
        <div className="pf-field">
          <label className="pf-label" htmlFor="pf-campusOrBuilding">
            Campus / Building
          </label>
          <div className="pf-input-box">
            <span className="pf-input-icon">
              <MdApartment />
            </span>
            <select
              id="pf-campusOrBuilding"
              name="campusOrBuilding"
              value={values.campusOrBuilding || ""}
              onChange={handleInputChange}
              className="pf-input"
            >
              {CAMPUS_OPTIONS.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* ── Read-only status strip ───────────────────────────────── */}
      <div className="pf-status">
        <div className="pf-status-row">
          <span className="pf-status-label">Role</span>
          <span className="pf-status-value">{role}</span>
        </div>

        <div className="pf-status-row">
          <span className="pf-status-label">Email Verified</span>
          <span className="pf-status-value pf-status-value--icon">
            <MdVerifiedUser
              style={{
                color: values.isEmailVerified ? "#16a34a" : "#dc2626",
              }}
            />
            <span>{values.isEmailVerified ? "Yes" : "No"}</span>
          </span>
        </div>

        <div className="pf-status-row">
          <span className="pf-status-label">Account Active</span>
          <span className="pf-status-value pf-status-value--icon">
            {values.isActive ? (
              <MdToggleOn style={{ color: "#16a34a" }} />
            ) : (
              <MdToggleOff style={{ color: "#dc2626" }} />
            )}
            <span>{values.isActive ? "Active" : "Inactive"}</span>
          </span>
        </div>
      </div>

      <button type="submit" disabled={submitting} className="pf-submit-btn">
        {submitting ? "Saving..." : "Save Profile"}
      </button>
    </form>
  );
};

export default ProfileForm;
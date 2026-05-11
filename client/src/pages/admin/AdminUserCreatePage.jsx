// // src/pages/admin/AdminUserCreatePage.jsx
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { createUserApi } from "../../api/userApi";
// import { COMPLAINT_CATEGORIES } from "../../constants/complaintCategories";

// const ROLE_OPTIONS = [
//   "SERVICE_PROVIDER",
//   "SERVER_ROOM_STAFF",
//   "STUDENT",
//   "TEACHER",
//   "ADMIN",
// ];

// const AdminUserCreatePage = () => {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "SERVICE_PROVIDER",
//     phone: "",
//     department: "",
//     specialization: "",
//     campusOrBuilding: "",
//     designation: "",
//     semester: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!form.email || !form.password || !form.role) {
//       alert("Email, password and role are required.");
//       return;
//     }

//     // If role is service provider and we care about department, ensure it's selected
//     if (
//       form.role === "SERVICE_PROVIDER" &&
//       (!form.department || form.department === "")
//     ) {
//       alert("Please select a department for the service provider.");
//       return;
//     }

//     try {
//       setLoading(true);
//       await createUserApi(form);
//       alert("User created successfully.");
//       navigate("/admin/users");
//     } catch (error) {
//       console.error("Error creating user:", error);
//       const msg =
//         error?.response?.data?.message ||
//         "Failed to create user. Please try again.";
//       alert(msg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Helper to decide when to show department field
//   const showDepartmentField =
//     form.role === "SERVICE_PROVIDER" ||
//     form.role === "TEACHER" ||
//     form.role === "STUDENT";

//   return (
//     <div>
//       <h2>Create User (Admin)</h2>

//       <form
//         onSubmit={handleSubmit}
//         style={{
//           maxWidth: "480px",
//           display: "flex",
//           flexDirection: "column",
//           gap: "12px",
//         }}
//       >
//         <div>
//           <label>Name</label>
//           <input
//             name="name"
//             value={form.name}
//             onChange={handleChange}
//             placeholder="Full Name"
//             style={{ width: "100%", padding: "8px" }}
//           />
//         </div>

//         <div>
//           <label>Email *</label>
//           <input
//             type="email"
//             name="email"
//             value={form.email}
//             onChange={handleChange}
//             placeholder="official email"
//             required
//             style={{ width: "100%", padding: "8px" }}
//           />
//         </div>

//         <div>
//           <label>Password *</label>
//           <input
//             type="password"
//             name="password"
//             value={form.password}
//             onChange={handleChange}
//             placeholder="temporary password"
//             required
//             style={{ width: "100%", padding: "8px" }}
//           />
//         </div>

//         <div>
//           <label>Role *</label>
//           <select
//             name="role"
//             value={form.role}
//             onChange={handleChange}
//             style={{ width: "100%", padding: "8px" }}
//           >
//             {ROLE_OPTIONS.map((r) => (
//               <option key={r} value={r}>
//                 {r}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label>Phone</label>
//           <input
//             name="phone"
//             value={form.phone}
//             onChange={handleChange}
//             placeholder="phone number"
//             style={{ width: "100%", padding: "8px" }}
//           />
//         </div>

//         {/* Department as dropdown (for roles that use it) */}
//         {showDepartmentField && (
//           <div>
//             <label>Department</label>
//             <select
//               name="department"
//               value={form.department}
//               onChange={handleChange}
//               style={{ width: "100%", padding: "8px" }}
//             >
//               {COMPLAINT_CATEGORIES.map((cat) => (
//                 <option key={cat.value} value={cat.value}>
//                   {cat.label}
//                 </option>
//               ))}
//             </select>
//           </div>
//         )}

//         <div>
//           <label>Specialization (for service providers)</label>
//           <input
//             name="specialization"
//             value={form.specialization}
//             onChange={handleChange}
//             placeholder="Network, Electrical, etc."
//             style={{ width: "100%", padding: "8px" }}
//           />
//         </div>

//         <div>
//           <label>Campus / Building (for server room staff)</label>
//           <input
//             name="campusOrBuilding"
//             value={form.campusOrBuilding}
//             onChange={handleChange}
//             placeholder="Main Campus, Block A..."
//             style={{ width: "100%", padding: "8px" }}
//           />
//         </div>

//         <div>
//           <label>Designation (for teachers)</label>
//           <input
//             name="designation"
//             value={form.designation}
//             onChange={handleChange}
//             placeholder="Professor, Lecturer..."
//             style={{ width: "100%", padding: "8px" }}
//           />
//         </div>

//         <div>
//           <label>Semester (for students)</label>
//           <input
//             name="semester"
//             value={form.semester}
//             onChange={handleChange}
//             placeholder="e.g., 5th Semester"
//             style={{ width: "100%", padding: "8px" }}
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           style={{
//             padding: "10px",
//             background: "#1976d2",
//             color: "#fff",
//             border: "none",
//             borderRadius: "4px",
//             cursor: loading ? "not-allowed" : "pointer",
//           }}
//         >
//           {loading ? "Creating..." : "Create User"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AdminUserCreatePage;

// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { createUserApi } from "../../api/userApi";
// import { COMPLAINT_CATEGORIES } from "../../constants/complaintCategories";
// import { DESIGNATIONS_CATEGORIES } from "../../constants/designation";

// import {
//   MdPerson,
//   MdEmail,
//   MdLock,
//   MdPhone,
//   MdWork,
//   MdApartment,
//   MdSchool,
//   MdDashboardCustomize,
//   MdArrowBack,
//   MdInfoOutline,
// } from "react-icons/md";
// import "./AdminUserCreatePage.css";
// import { toast } from 'react-toastify';

// const ROLE_OPTIONS = [
//   "SERVICE_PROVIDER",
//   "SERVER_ROOM_STAFF",
//   "STUDENT",
//   "TEACHER",
//   "ADMIN",
// ];

// const AdminUserCreatePage = () => {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "SERVICE_PROVIDER",
//     phone: "",
//     department: "",
//     specialization: "",
//     campusOrBuilding: "",
//     designation: "",
//     semester: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!form.email || !form.password || !form.role) {
//       toast("Email, password and role are required.");
//       return;
//     }

//     // If role is service provider and we care about department, ensure it's selected
//     if (
//       form.role === "SERVICE_PROVIDER" &&
//       (!form.department || form.department === "")
//     ) {
//       toast("Please select a department for the service provider.");
//       return;
//     }

//     try {
//       setLoading(true);
//       await createUserApi(form);
//       toast("User created successfully.");
//       navigate("/admin/users");
//     } catch (error) {
//       console.error("Error creating user:", error);
//       const msg =
//         error?.response?.data?.message ||
//         "Failed to create user. Please try again.";
//       toast(msg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const showDepartmentField =
//     form.role === "SERVICE_PROVIDER" ||
//     form.role === "TEACHER" ||
//     form.role === "STUDENT";

//   return (
//     <div className="auc-page">
//       {/* Header */}
//       <header className="auc-header">
//         <div className="auc-header__left">
//           <button
//             type="button"
//             className="auc-icon-btn"
//             onClick={() => navigate("/admin/users")}
//             aria-label="Back to User Management"
//           >
//             <MdArrowBack size={18} />
//           </button>

//           <div className="auc-header__titles">
//             <h1 className="auc-title">
//               <MdDashboardCustomize className="auc-title__icon" size={22} />
//               <span>Create User</span>
//             </h1>
//             <p className="auc-subtitle">
//               Add a new user to the system and assign the correct role and
//               department. Created users can log in with the temporary password
//               you set here.
//             </p>
//           </div>
//         </div>

//         <div className="auc-header__meta">
//           <div className="auc-meta-item">
//             <span className="auc-meta-label">Module</span>
//             <span className="auc-meta-value">Admin · Users</span>
//           </div>
//           <div className="auc-meta-item">
//             <span className="auc-meta-label">Roles Available</span>
//             <span className="auc-meta-value">
//               SERVICE_PROVIDER, SERVER_ROOM_STAFF, STUDENT, TEACHER, ADMIN
//             </span>
//           </div>
//         </div>
//       </header>

//       <div className="auc-info">
//         <MdInfoOutline size={18} />
//         <span>
//           Users with the <strong>ADMIN</strong> role have full access. Create
//           admin accounts only for trusted staff.
//         </span>
//       </div>

//       {/* Main grid: form + tips */}
//       <section className="auc-grid">
//         {/* Form card */}
//         <article className="auc-card auc-card--form">
//           <div className="auc-card__header">
//             <h2 className="auc-card__title">User Details</h2>
//             <p className="auc-card__subtitle">
//               Fill in the basic information, select a role and (if required)
//               assign a department and specialization.
//             </p>
//           </div>

//           <form className="auc-form" onSubmit={handleSubmit}>
//             {/* Name */}
//             <div className="auc-field">
//               <label className="auc-label" htmlFor="auc-name">
//                 Name
//               </label>
//               <div className="auc-input-box">
//                 <span className="auc-input-icon">
//                   <MdPerson />
//                 </span>
//                 <input
//                   id="auc-name"
//                   name="name"
//                   value={form.name}
//                   onChange={handleChange}
//                   placeholder="Full Name"
//                   className="auc-input"
//                 />
//               </div>
//             </div>

//             {/* Email */}
//             <div className="auc-field">
//               <label className="auc-label" htmlFor="auc-email">
//                 Email <span className="auc-required">*</span>
//               </label>
//               <div className="auc-input-box">
//                 <span className="auc-input-icon">
//                   <MdEmail />
//                 </span>
//                 <input
//                   id="auc-email"
//                   type="email"
//                   name="email"
//                   value={form.email}
//                   onChange={handleChange}
//                   placeholder="Official email"
//                   required
//                   className="auc-input"
//                 />
//               </div>
//             </div>

//             {/* Password */}
//             <div className="auc-field">
//               <label className="auc-label" htmlFor="auc-password">
//                 Temporary Password <span className="auc-required">*</span>
//               </label>
//               <div className="auc-input-box">
//                 <span className="auc-input-icon">
//                   <MdLock />
//                 </span>
//                 <input
//                   id="auc-password"
//                   type="password"
//                   name="password"
//                   value={form.password}
//                   onChange={handleChange}
//                   placeholder="Temporary password"
//                   required
//                   className="auc-input"
//                 />
//               </div>
//             </div>

//             {/* Role */}
//             <div className="auc-field">
//               <label className="auc-label" htmlFor="auc-role">
//                 Role <span className="auc-required">*</span>
//               </label>
//               <div className="auc-input-box">
//                 <span className="auc-input-icon">
//                   <MdWork />
//                 </span>
//                 <select
//                   id="auc-role"
//                   name="role"
//                   value={form.role}
//                   onChange={handleChange}
//                   className="auc-select"
//                 >
//                   {ROLE_OPTIONS.map((r) => (
//                     <option key={r} value={r}>
//                       {r}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             {/* Phone */}
//             <div className="auc-field">
//               <label className="auc-label" htmlFor="auc-phone">
//                 Phone
//               </label>
//               <div className="auc-input-box">
//                 <span className="auc-input-icon">
//                   <MdPhone />
//                 </span>
//                 <input
//                   id="auc-phone"
//                   name="phone"
//                   value={form.phone}
//                   onChange={handleChange}
//                   placeholder="Phone number"
//                   className="auc-input"
//                 />
//               </div>
//             </div>

//             {/* Department (dropdown) */}
//             {showDepartmentField && (
//               <div className="auc-field">
//                 <label className="auc-label" htmlFor="auc-department">
//                   Department
//                 </label>
//                 <div className="auc-input-box">
//                   <span className="auc-input-icon">
//                     <MdSchool />
//                   </span>
//                   <select
//                     id="auc-department"
//                     name="department"
//                     value={form.department}
//                     onChange={handleChange}
//                     className="auc-select"
//                   >
//                     {COMPLAINT_CATEGORIES.map((cat) => (
//                       <option key={cat.value} value={cat.value}>
//                         {cat.label}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//             )}

//             {/* Specialization */}
//             <div className="auc-field">
//               <label className="auc-label" htmlFor="auc-specialization">
//                 Specialization (Service Providers)
//               </label>
//               <div className="auc-input-box">
//                 <span className="auc-input-icon">
//                   <MdWork />
//                 </span>
//                 <input
//                   id="auc-specialization"
//                   name="specialization"
//                   value={form.specialization}
//                   onChange={handleChange}
//                   placeholder="Network, Electrical, etc."
//                   className="auc-input"
//                 />
//               </div>
//             </div>

//             {/* Campus / Building */}
//             <div className="auc-field">
//               <label className="auc-label" htmlFor="auc-campus">
//                 Campus / Building (Server Room Staff)
//               </label>
//               <div className="auc-input-box">
//                 <span className="auc-input-icon">
//                   <MdApartment />
//                 </span>
//                 <input
//                   id="auc-campus"
//                   name="campusOrBuilding"
//                   value={form.campusOrBuilding}
//                   onChange={handleChange}
//                   placeholder="Main Campus, Block A..."
//                   className="auc-input"
//                 />
//               </div>
//             </div>

//             {/* Designation */}
//             <div className="auc-field">
//               <label className="auc-label" htmlFor="auc-designation">
//                 Designation (Teachers)
//               </label>
//               <div className="auc-input-box">
//                 <span className="auc-input-icon">
//                   <MdWork />
//                 </span>
//                {/* <input
//                   id="auc-designation"
//                   name="designation"
//                   value={form.designation}
//                   onChange={handleChange}
//                   placeholder="Professor, Lecturer..."
//                   className="auc-input"
//                 /> */}
//                 <select
//                     id="auc-designation"
//                     name="designation"
//                     value={form.designation}
//                     onChange={handleChange}
//                     className="auc-select"
//                   >
//                     {DESIGNATIONS_CATEGORIES.map((cat) => (
//                       <option key={cat.value} value={cat.value}>
//                         {cat.label}
//                       </option>
//                     ))}
//                   </select>
//               </div>
//             </div>

//             {/* Semester */}
//             <div className="auc-field">
//               <label className="auc-label" htmlFor="auc-semester">
//                 Semester (Students)
//               </label>
//               <div className="auc-input-box">
//                 <span className="auc-input-icon">
//                   <MdSchool />
//                 </span>
//                 <input
//                   id="auc-semester"
//                   name="semester"
//                   value={form.semester}
//                   onChange={handleChange}
//                   placeholder="e.g., 5th Semester"
//                   className="auc-input"
//                 />
//               </div>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="auc-submit-btn"
//             >
//               {loading ? "Creating..." : "Create User"}
//             </button>
//           </form>
//         </article>

//         {/* Right: helper content */}
//         <aside className="auc-card auc-card--side">
//           <div className="auc-side-badge">Guidelines</div>
//           <h2 className="auc-side-title">Assign roles carefully</h2>
//           <p className="auc-side-text">
//             The role you assign determines what the user can access:
//           </p>
//           <ul className="auc-side-list">
//             <li>
//               <strong>STUDENT</strong> – Can submit complaints, see events and
//               use the chatbot.
//             </li>
//             <li>
//               <strong>TEACHER</strong> – Can create complaints and resource
//               requests on behalf of classes.
//             </li>
//             <li>
//               <strong>SERVICE_PROVIDER</strong> – Handles assigned complaints
//               (IT, Electrical, Maintenance, etc.).
//             </li>
//             <li>
//               <strong>SERVER_ROOM_STAFF</strong> – Manages resource requests and
//               server room operations.
//             </li>
//             <li>
//               <strong>ADMIN</strong> – Full access to users and system
//               configuration.
//             </li>
//           </ul>

//           <p className="auc-side-note">
//             For security, new users should be instructed to{" "}
//             <strong>change their password</strong> after the first login using
//             the temporary password you set here.
//           </p>

//           <p className="auc-side-note">
//             You can review and modify user accounts anytime in{" "}
//             <Link to="/admin/users">User Management</Link>.
//           </p>
//         </aside>
//       </section>
//     </div>
//   );
// };

// export default AdminUserCreatePage;
// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { createUserApi } from "../../api/userApi";
// import { COMPLAINT_CATEGORIES } from "../../constants/complaintCategories";
// import { DESIGNATIONS_CATEGORIES } from "../../constants/designation";

// import {
//   MdPerson,
//   MdEmail,
//   MdLock,
//   MdPhone,
//   MdWork,
//   MdApartment,
//   MdSchool,
//   MdDashboardCustomize,
//   MdArrowBack,
//   MdInfoOutline,
//   MdBusiness,
// } from "react-icons/md";
// import "./AdminUserCreatePage.css";
// import { toast } from "react-toastify";

// const ROLE_OPTIONS = [
//   "SERVICE_PROVIDER",
//   "SERVER_ROOM_STAFF",
//   "STUDENT",
//   "TEACHER",
//   "ADMIN",
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

// const DEPARTMENT_OPTIONS = [
//   { value: "bscs", label: "BSCS" },
//   { value: "bsse", label: "BSSE" },
//   { value: "bsit", label: "BSIT" },
//   { value: "bsai", label: "BSAI" },
//   { value: "bsds", label: "BSDS" },
//   { value: "bsdfcs", label: "BSDFCS" },
// ];

// const DESIGNATION_OPTIONS = [
//   { value: "Lecturer", label: "Lecturer" },
//   { value: "Assistant Lecturer", label: "Assistant Lecturer" },
//   { value: "Senior Lecturer", label: "Senior Lecturer" },
//   { value: "Professor", label: "Professor" },
// ];

// /* ── Which extra fields each role needs ─────────────────────────── */
// const ROLE_FIELDS = {
//   STUDENT: ["department", "semester"],
//   TEACHER: ["department", "designation"],
//   SERVICE_PROVIDER: ["department", "specialization", "campusOrBuilding"],
//   SERVER_ROOM_STAFF: ["specialization", "campusOrBuilding"],
//   ADMIN: [],
// };

// const INITIAL_FORM = {
//   name: "",
//   email: "",
//   password: "",
//   role: "SERVICE_PROVIDER",
//   phone: "",
//   department: "",
//   specialization: "",
//   campusOrBuilding: "",
//   designation: "",
//   semester: "",
// };

// const AdminUserCreatePage = () => {
//   const navigate = useNavigate();
//   const [form, setForm] = useState(INITIAL_FORM);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleRoleChange = (e) => {
//     const newRole = e.target.value;
//     // reset role-specific fields when role changes
//     setForm((prev) => ({
//       ...INITIAL_FORM,
//       name: prev.name,
//       email: prev.email,
//       password: prev.password,
//       phone: prev.phone,
//       role: newRole,
//     }));
//   };

//   const show = (field) => ROLE_FIELDS[form.role]?.includes(field);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!form.email || !form.password || !form.role) {
//       toast.error("Email, password and role are required.");
//       return;
//     }

//     if (show("department") && !form.department) {
//       toast.error("Please select a department.");
//       return;
//     }

//     try {
//       setLoading(true);
//       await createUserApi(form);
//       toast.success("User created successfully.");
//       navigate("/admin/users");
//     } catch (error) {
//       console.error("Error creating user:", error);
//       const msg =
//         error?.response?.data?.message ||
//         "Failed to create user. Please try again.";
//       toast.error(msg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auc-page">
//       {/* ── Header ───────────────────────────────────────────────── */}
//       <header className="auc-header">
//         <div className="auc-header__left">
//           <button
//             type="button"
//             className="auc-icon-btn"
//             onClick={() => navigate("/admin/users")}
//             aria-label="Back to User Management"
//           >
//             <MdArrowBack size={18} />
//           </button>

//           <div className="auc-header__titles">
//             <h1 className="auc-title">
//               <MdDashboardCustomize className="auc-title__icon" size={22} />
//               <span>Create User</span>
//             </h1>
//             <p className="auc-subtitle">
//               Add a new user to the system and assign the correct role and
//               department. Created users can log in with the temporary password
//               you set here.
//             </p>
//           </div>
//         </div>

//         <div className="auc-header__meta">
//           <div className="auc-meta-item">
//             <span className="auc-meta-label">Module</span>
//             <span className="auc-meta-value">Admin · Users</span>
//           </div>
//           <div className="auc-meta-item">
//             <span className="auc-meta-label">Roles Available</span>
//             <span className="auc-meta-value">
//               SERVICE_PROVIDER, SERVER_ROOM_STAFF, STUDENT, TEACHER, ADMIN
//             </span>
//           </div>
//         </div>
//       </header>

//       <div className="auc-info">
//         <MdInfoOutline size={18} />
//         <span>
//           Users with the <strong>ADMIN</strong> role have full access. Create
//           admin accounts only for trusted staff.
//         </span>
//       </div>

//       {/* ── Main grid ────────────────────────────────────────────── */}
//       <section className="auc-grid">
//         {/* Form card */}
//         <article className="auc-card auc-card--form">
//           <div className="auc-card__header">
//             <h2 className="auc-card__title">User Details</h2>
//             <p className="auc-card__subtitle">
//               Fill in the basic information, select a role, and complete the
//               fields relevant to that role.
//             </p>
//           </div>

//           <form className="auc-form" onSubmit={handleSubmit}>
//             {/* ── Always-visible fields ──────────────────────────── */}

//             {/* Name */}
//             <div className="auc-field">
//               <label className="auc-label" htmlFor="auc-name">
//                 Name
//               </label>
//               <div className="auc-input-box">
//                 <span className="auc-input-icon">
//                   <MdPerson />
//                 </span>
//                 <input
//                   id="auc-name"
//                   name="name"
//                   value={form.name}
//                   onChange={handleChange}
//                   placeholder="Full Name"
//                   className="auc-input"
//                 />
//               </div>
//             </div>

//             {/* Email */}
//             <div className="auc-field">
//               <label className="auc-label" htmlFor="auc-email">
//                 Email <span className="auc-required">*</span>
//               </label>
//               <div className="auc-input-box">
//                 <span className="auc-input-icon">
//                   <MdEmail />
//                 </span>
//                 <input
//                   id="auc-email"
//                   type="email"
//                   name="email"
//                   value={form.email}
//                   onChange={handleChange}
//                   placeholder="Official email"
//                   required
//                   className="auc-input"
//                 />
//               </div>
//             </div>

//             {/* Password */}
//             <div className="auc-field">
//               <label className="auc-label" htmlFor="auc-password">
//                 Temporary Password <span className="auc-required">*</span>
//               </label>
//               <div className="auc-input-box">
//                 <span className="auc-input-icon">
//                   <MdLock />
//                 </span>
//                 <input
//                   id="auc-password"
//                   type="password"
//                   name="password"
//                   value={form.password}
//                   onChange={handleChange}
//                   placeholder="Temporary password"
//                   required
//                   className="auc-input"
//                 />
//               </div>
//             </div>

//             {/* Role */}
//             <div className="auc-field">
//               <label className="auc-label" htmlFor="auc-role">
//                 Role <span className="auc-required">*</span>
//               </label>
//               <div className="auc-input-box">
//                 <span className="auc-input-icon">
//                   <MdWork />
//                 </span>
//                 <select
//                   id="auc-role"
//                   name="role"
//                   value={form.role}
//                   onChange={handleRoleChange}
//                   className="auc-select"
//                 >
//                   {ROLE_OPTIONS.map((r) => (
//                     <option key={r} value={r}>
//                       {r}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             {/* Phone */}
//             <div className="auc-field">
//               <label className="auc-label" htmlFor="auc-phone">
//                 Phone
//               </label>
//               <div className="auc-input-box">
//                 <span className="auc-input-icon">
//                   <MdPhone />
//                 </span>
//                 <input
//                   id="auc-phone"
//                   name="phone"
//                   value={form.phone}
//                   onChange={handleChange}
//                   placeholder="Phone number"
//                   className="auc-input"
//                 />
//               </div>
//             </div>

//             {/* ── Role-specific fields ───────────────────────────── */}

//             {/* Department — STUDENT | TEACHER | SERVICE_PROVIDER */}
//             {show("department") && (
//               <div className="auc-field">
//                 <label className="auc-label" htmlFor="auc-department">
//                   Department <span className="auc-required">*</span>
//                 </label>
//                 <div className="auc-input-box">
//                   <span className="auc-input-icon">
//                     <MdSchool />
//                   </span>
//                   <select
//                     id="auc-department"
//                     name="department"
//                     value={form.department}
//                     onChange={handleChange}
//                     className="auc-select"
//                   >
//                     <option value="">-- Select Department --</option>
//                     {DEPARTMENT_OPTIONS.map((d) => (
//                       <option key={d.value} value={d.value}>
//                         {d.label}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//             )}

//             {/* Semester — STUDENT only */}
//             {show("semester") && (
//               <div className="auc-field">
//                 <label className="auc-label" htmlFor="auc-semester">
//                   Semester
//                 </label>
//                 <div className="auc-input-box">
//                   <span className="auc-input-icon">
//                     <MdSchool />
//                   </span>
//                   <select
//                     id="auc-semester"
//                     name="semester"
//                     value={form.semester}
//                     onChange={handleChange}
//                     className="auc-select"
//                   >
//                     <option value="">-- Select Semester --</option>
//                     {SEMESTER_OPTIONS.map((s) => (
//                       <option key={s} value={s}>
//                         {s}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//             )}

//             {/* Designation — TEACHER only */}
//             {show("designation") && (
//               <div className="auc-field">
//                 <label className="auc-label" htmlFor="auc-designation">
//                   Designation
//                 </label>
//                 <div className="auc-input-box">
//                   <span className="auc-input-icon">
//                     <MdWork />
//                   </span>
//                   <select
//                     id="auc-designation"
//                     name="designation"
//                     value={form.designation}
//                     onChange={handleChange}
//                     className="auc-select"
//                   >
//                     <option value="">-- Select Designation --</option>
//                     {DESIGNATION_OPTIONS.map((d) => (
//                       <option key={d.value} value={d.value}>
//                         {d.label}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//             )}

//             {/* Specialization — SERVICE_PROVIDER | SERVER_ROOM_STAFF */}
//             {show("specialization") && (
//               <div className="auc-field">
//                 <label className="auc-label" htmlFor="auc-specialization">
//                   Specialization
//                 </label>
//                 <div className="auc-input-box">
//                   <span className="auc-input-icon">
//                     <MdWork />
//                   </span>
//                   <input
//                     id="auc-specialization"
//                     name="specialization"
//                     value={form.specialization}
//                     onChange={handleChange}
//                     placeholder="Network, Electrical, etc."
//                     className="auc-input"
//                   />
//                 </div>
//               </div>
//             )}

//             {/* Campus / Building — SERVICE_PROVIDER | SERVER_ROOM_STAFF */}
//             {show("campusOrBuilding") && (
//               <div className="auc-field">
//                 <label className="auc-label" htmlFor="auc-campus">
//                   Campus / Building
//                 </label>
//                 <div className="auc-input-box">
//                   <span className="auc-input-icon">
//                     <MdApartment />
//                   </span>
//                   <input
//                     id="auc-campus"
//                     name="campusOrBuilding"
//                     value={form.campusOrBuilding}
//                     onChange={handleChange}
//                     placeholder="Main Campus, Block A..."
//                     className="auc-input"
//                   />
//                 </div>
//               </div>
//             )}

//             {/* Role hint banner */}
//             <div className="auc-role-hint">
//               <MdInfoOutline size={15} />
//               <span>
//                 {form.role === "STUDENT" &&
//                   "Students can submit complaints, view events, and use the chatbot."}
//                 {form.role === "TEACHER" &&
//                   "Teachers can create complaints and resource requests on behalf of classes."}
//                 {form.role === "SERVICE_PROVIDER" &&
//                   "Service providers handle assigned complaints (IT, Electrical, Maintenance…)."}
//                 {form.role === "SERVER_ROOM_STAFF" &&
//                   "Server room staff manage resource requests and server room operations."}
//                 {form.role === "ADMIN" &&
//                   "Admins have full access — only create for trusted staff."}
//               </span>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="auc-submit-btn"
//             >
//               {loading ? "Creating..." : "Create User"}
//             </button>
//           </form>
//         </article>

//         {/* ── Side panel ───────────────────────────────────────── */}
//         <aside className="auc-card auc-card--side">
//           <div className="auc-side-badge">Guidelines</div>
//           <h2 className="auc-side-title">Assign roles carefully</h2>
//           <p className="auc-side-text">
//             The role determines what the user can access and which fields are
//             required:
//           </p>

//           <ul className="auc-side-list">
//             <li>
//               <strong>STUDENT</strong> — Department + Semester
//             </li>
//             <li>
//               <strong>TEACHER</strong> — Department + Designation
//             </li>
//             <li>
//               <strong>SERVICE_PROVIDER</strong> — Department + Specialization +
//               Campus
//             </li>
//             <li>
//               <strong>SERVER_ROOM_STAFF</strong> — Specialization + Campus
//             </li>
//             <li>
//               <strong>ADMIN</strong> — Name, Email & Password only
//             </li>
//           </ul>

//           <p className="auc-side-note">
//             New users should <strong>change their password</strong> after the
//             first login using the temporary password you set here.
//           </p>

//           <p className="auc-side-note">
//             You can review and modify user accounts anytime in{" "}
//             <Link to="/admin/users">User Management</Link>.
//           </p>
//         </aside>
//       </section>
//     </div>
//   );
// };

// export default AdminUserCreatePage;
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserApi } from "../../api/userApi";
import {
  MdPerson,
  MdEmail,
  MdLock,
  MdPhone,
  MdWork,
  MdApartment,
  MdSchool,
  MdDashboardCustomize,
  MdArrowBack,
  MdInfoOutline,
} from "react-icons/md";
import "./AdminUserCreatePage.css";
import { toast } from "react-toastify";
import {
  ACADEMIC_DEPARTMENT_OPTIONS,
  SERVICE_DEPARTMENT_OPTIONS,
  SEMESTER_OPTIONS,
  DESIGNATION_OPTIONS,
  CAMPUS_OPTIONS,
} from "../../constants/formOptions";

const ROLE_OPTIONS = [
  "SERVICE_PROVIDER",
  "SERVER_ROOM_STAFF",
  "STUDENT",
  "TEACHER",
  "ADMIN",
];

/* ── Which extra fields each role needs ─────────────────────────── */
const ROLE_FIELDS = {
  STUDENT: ["department", "semester"],
  TEACHER: ["department", "designation"],
  SERVICE_PROVIDER: ["department", "specialization", "campusOrBuilding"],
  SERVER_ROOM_STAFF: ["specialization", "campusOrBuilding"],
  ADMIN: [],
};

const INITIAL_FORM = {
  name: "",
  email: "",
  password: "",
  role: "SERVICE_PROVIDER",
  phone: "",
  department: "",
  specialization: "",
  campusOrBuilding: "",
  designation: "",
  semester: "",
};

const AdminUserCreatePage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /* Reset role-specific fields when role changes */
  const handleRoleChange = (e) => {
    const newRole = e.target.value;
    setForm((prev) => ({
      ...INITIAL_FORM,
      name: prev.name,
      email: prev.email,
      password: prev.password,
      phone: prev.phone,
      role: newRole,
    }));
  };

  const show = (field) => ROLE_FIELDS[form.role]?.includes(field);

  /* Pick the correct department list based on role */
  const getDepartmentOptions = () => {
    if (form.role === "SERVICE_PROVIDER") return SERVICE_DEPARTMENT_OPTIONS;
    return ACADEMIC_DEPARTMENT_OPTIONS;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password || !form.role) {
      toast.error("Email, password and role are required.");
      return;
    }

    if (show("department") && !form.department) {
      toast.error("Please select a department.");
      return;
    }

    if (show("semester") && !form.semester) {
      toast.error("Please select a semester.");
      return;
    }

    if (show("designation") && !form.designation) {
      toast.error("Please select a designation.");
      return;
    }

    if (show("campusOrBuilding") && !form.campusOrBuilding) {
      toast.error("Please select a campus / building.");
      return;
    }

    try {
      setLoading(true);
      await createUserApi(form);
      toast.success("User created successfully.");
      navigate("/admin/users");
    } catch (error) {
      console.error("Error creating user:", error);
      const msg =
        error?.response?.data?.message ||
        "Failed to create user. Please try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auc-page">
      {/* ── Header ───────────────────────────────────────────────── */}
      <header className="auc-header">
        <div className="auc-header__left">
          <button
            type="button"
            className="auc-icon-btn"
            onClick={() => navigate("/admin/users")}
            aria-label="Back to User Management"
          >
            <MdArrowBack size={18} />
          </button>

          <div className="auc-header__titles">
            <h1 className="auc-title">
              <MdDashboardCustomize className="auc-title__icon" size={22} />
              <span>Create User</span>
            </h1>
            <p className="auc-subtitle">
              Add a new user to the system and assign the correct role and
              department. Created users can log in with the temporary password
              you set here.
            </p>
          </div>
        </div>

        <div className="auc-header__meta">
          <div className="auc-meta-item">
            <span className="auc-meta-label">Module</span>
            <span className="auc-meta-value">Admin · Users</span>
          </div>
          <div className="auc-meta-item">
            <span className="auc-meta-label">Roles Available</span>
            <span className="auc-meta-value">
              SERVICE_PROVIDER, SERVER_ROOM_STAFF, STUDENT, TEACHER, ADMIN
            </span>
          </div>
        </div>
      </header>

      <div className="auc-info">
        <MdInfoOutline size={18} />
        <span>
          Users with the <strong>ADMIN</strong> role have full access. Create
          admin accounts only for trusted staff.
        </span>
      </div>

      {/* ── Main grid ────────────────────────────────────────────── */}
      <section className="auc-grid">
        {/* ── Form card ────────────────────────────────────────── */}
        <article className="auc-card auc-card--form">
          <div className="auc-card__header">
            <h2 className="auc-card__title">User Details</h2>
            <p className="auc-card__subtitle">
              Fill in the basic information, select a role, and complete the
              fields relevant to that role.
            </p>
          </div>

          <form className="auc-form" onSubmit={handleSubmit}>

            {/* Name */}
            <div className="auc-field">
              <label className="auc-label" htmlFor="auc-name">
                Name
              </label>
              <div className="auc-input-box">
                <span className="auc-input-icon"><MdPerson /></span>
                <input
                  id="auc-name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="auc-input"
                />
              </div>
            </div>

            {/* Email */}
            <div className="auc-field">
              <label className="auc-label" htmlFor="auc-email">
                Email <span className="auc-required">*</span>
              </label>
              <div className="auc-input-box">
                <span className="auc-input-icon"><MdEmail /></span>
                <input
                  id="auc-email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Official email"
                  required
                  className="auc-input"
                />
              </div>
            </div>

            {/* Password */}
            <div className="auc-field">
              <label className="auc-label" htmlFor="auc-password">
                Temporary Password <span className="auc-required">*</span>
              </label>
              <div className="auc-input-box">
                <span className="auc-input-icon"><MdLock /></span>
                <input
                  id="auc-password"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Temporary password"
                  required
                  className="auc-input"
                />
              </div>
            </div>

            {/* Role */}
            <div className="auc-field">
              <label className="auc-label" htmlFor="auc-role">
                Role <span className="auc-required">*</span>
              </label>
              <div className="auc-input-box">
                <span className="auc-input-icon"><MdWork /></span>
                <select
                  id="auc-role"
                  name="role"
                  value={form.role}
                  onChange={handleRoleChange}
                  className="auc-select"
                >
                  {ROLE_OPTIONS.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Phone */}
            <div className="auc-field">
              <label className="auc-label" htmlFor="auc-phone">
                Phone
              </label>
              <div className="auc-input-box">
                <span className="auc-input-icon"><MdPhone /></span>
                <input
                  id="auc-phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone number"
                  className="auc-input"
                />
              </div>
            </div>

            {/* ── Role-specific fields ───────────────────────── */}

            {/* Department
                · STUDENT / TEACHER  → academic departments
                · SERVICE_PROVIDER   → service categories         */}
            {show("department") && (
              <div className="auc-field">
                <label className="auc-label" htmlFor="auc-department">
                  {form.role === "SERVICE_PROVIDER"
                    ? "Service Category"
                    : "Department"}{" "}
                  <span className="auc-required">*</span>
                </label>
                <div className="auc-input-box">
                  <span className="auc-input-icon"><MdSchool /></span>
                  <select
                    id="auc-department"
                    name="department"
                    value={form.department}
                    onChange={handleChange}
                    className="auc-select"
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
              <div className="auc-field">
                <label className="auc-label" htmlFor="auc-semester">
                  Semester <span className="auc-required">*</span>
                </label>
                <div className="auc-input-box">
                  <span className="auc-input-icon"><MdSchool /></span>
                  <select
                    id="auc-semester"
                    name="semester"
                    value={form.semester}
                    onChange={handleChange}
                    className="auc-select"
                  >
                    <option value="">-- Select Semester --</option>
                    {SEMESTER_OPTIONS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Designation — TEACHER only */}
            {show("designation") && (
              <div className="auc-field">
                <label className="auc-label" htmlFor="auc-designation">
                  Designation <span className="auc-required">*</span>
                </label>
                <div className="auc-input-box">
                  <span className="auc-input-icon"><MdWork /></span>
                  <select
                    id="auc-designation"
                    name="designation"
                    value={form.designation}
                    onChange={handleChange}
                    className="auc-select"
                  >
                    {DESIGNATION_OPTIONS.map((d) => (
                      <option key={d.value} value={d.value}>{d.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Specialization — SERVICE_PROVIDER | SERVER_ROOM_STAFF */}
            {show("specialization") && (
              <div className="auc-field">
                <label className="auc-label" htmlFor="auc-specialization">
                  Specialization
                </label>
                <div className="auc-input-box">
                  <span className="auc-input-icon"><MdWork /></span>
                  <input
                    id="auc-specialization"
                    name="specialization"
                    value={form.specialization}
                    onChange={handleChange}
                    placeholder="Network, Electrical, etc."
                    className="auc-input"
                  />
                </div>
              </div>
            )}

            {/* Campus / Building — SERVICE_PROVIDER | SERVER_ROOM_STAFF */}
            {show("campusOrBuilding") && (
              <div className="auc-field">
                <label className="auc-label" htmlFor="auc-campus">
                  Campus / Building <span className="auc-required">*</span>
                </label>
                <div className="auc-input-box">
                  <span className="auc-input-icon"><MdApartment /></span>
                  <select
                    id="auc-campus"
                    name="campusOrBuilding"
                    value={form.campusOrBuilding}
                    onChange={handleChange}
                    className="auc-select"
                  >
                    {CAMPUS_OPTIONS.map((c) => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Role hint */}
            <div className="auc-role-hint">
              <MdInfoOutline size={15} />
              <span>
                {form.role === "STUDENT" &&
                  "Students can submit complaints, view events, and use the chatbot."}
                {form.role === "TEACHER" &&
                  "Teachers can create complaints and resource requests on behalf of classes."}
                {form.role === "SERVICE_PROVIDER" &&
                  "Service providers handle assigned complaints (IT, Electrical, Maintenance…)."}
                {form.role === "SERVER_ROOM_STAFF" &&
                  "Server room staff manage resource requests and server room operations."}
                {form.role === "ADMIN" &&
                  "Admins have full access — only create for trusted staff."}
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="auc-submit-btn"
            >
              {loading ? "Creating..." : "Create User"}
            </button>
          </form>
        </article>

        {/* ── Side panel ─────────────────────────────────────── */}
        <aside className="auc-card auc-card--side">
          <div className="auc-side-badge">Guidelines</div>
          <h2 className="auc-side-title">Assign roles carefully</h2>
          <p className="auc-side-text">
            The role determines what the user can access and which fields are
            required:
          </p>
          <ul className="auc-side-list">
            <li><strong>STUDENT</strong> — Department + Semester</li>
            <li><strong>TEACHER</strong> — Department + Designation</li>
            <li>
              <strong>SERVICE_PROVIDER</strong> — Service Category +
              Specialization + Building
            </li>
            <li>
              <strong>SERVER_ROOM_STAFF</strong> — Specialization + Building
            </li>
            <li><strong>ADMIN</strong> — Name, Email &amp; Password only</li>
          </ul>

          <p className="auc-side-note">
            New users should <strong>change their password</strong> after the
            first login using the temporary password you set here.
          </p>

          <p className="auc-side-note">
            You can review and modify user accounts anytime in{" "}
            <Link to="/admin/users">User Management</Link>.
          </p>
        </aside>
      </section>
    </div>
  );
};

export default AdminUserCreatePage;
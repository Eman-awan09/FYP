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

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserApi } from "../../api/userApi";
import { COMPLAINT_CATEGORIES } from "../../constants/complaintCategories";
import { DESIGNATIONS_CATEGORIES } from "../../constants/designation";

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
import { toast } from 'react-toastify';

const ROLE_OPTIONS = [
  "SERVICE_PROVIDER",
  "SERVER_ROOM_STAFF",
  "STUDENT",
  "TEACHER",
  "ADMIN",
];

const AdminUserCreatePage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
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
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password || !form.role) {
      toast("Email, password and role are required.");
      return;
    }

    // If role is service provider and we care about department, ensure it's selected
    if (
      form.role === "SERVICE_PROVIDER" &&
      (!form.department || form.department === "")
    ) {
      toast("Please select a department for the service provider.");
      return;
    }

    try {
      setLoading(true);
      await createUserApi(form);
      toast("User created successfully.");
      navigate("/admin/users");
    } catch (error) {
      console.error("Error creating user:", error);
      const msg =
        error?.response?.data?.message ||
        "Failed to create user. Please try again.";
      toast(msg);
    } finally {
      setLoading(false);
    }
  };

  const showDepartmentField =
    form.role === "SERVICE_PROVIDER" ||
    form.role === "TEACHER" ||
    form.role === "STUDENT";

  return (
    <div className="auc-page">
      {/* Header */}
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

      {/* Main grid: form + tips */}
      <section className="auc-grid">
        {/* Form card */}
        <article className="auc-card auc-card--form">
          <div className="auc-card__header">
            <h2 className="auc-card__title">User Details</h2>
            <p className="auc-card__subtitle">
              Fill in the basic information, select a role and (if required)
              assign a department and specialization.
            </p>
          </div>

          <form className="auc-form" onSubmit={handleSubmit}>
            {/* Name */}
            <div className="auc-field">
              <label className="auc-label" htmlFor="auc-name">
                Name
              </label>
              <div className="auc-input-box">
                <span className="auc-input-icon">
                  <MdPerson />
                </span>
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
                <span className="auc-input-icon">
                  <MdEmail />
                </span>
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
                <span className="auc-input-icon">
                  <MdLock />
                </span>
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
                <span className="auc-input-icon">
                  <MdWork />
                </span>
                <select
                  id="auc-role"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="auc-select"
                >
                  {ROLE_OPTIONS.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
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
                <span className="auc-input-icon">
                  <MdPhone />
                </span>
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

            {/* Department (dropdown) */}
            {showDepartmentField && (
              <div className="auc-field">
                <label className="auc-label" htmlFor="auc-department">
                  Department
                </label>
                <div className="auc-input-box">
                  <span className="auc-input-icon">
                    <MdSchool />
                  </span>
                  <select
                    id="auc-department"
                    name="department"
                    value={form.department}
                    onChange={handleChange}
                    className="auc-select"
                  >
                    {COMPLAINT_CATEGORIES.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Specialization */}
            <div className="auc-field">
              <label className="auc-label" htmlFor="auc-specialization">
                Specialization (Service Providers)
              </label>
              <div className="auc-input-box">
                <span className="auc-input-icon">
                  <MdWork />
                </span>
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

            {/* Campus / Building */}
            <div className="auc-field">
              <label className="auc-label" htmlFor="auc-campus">
                Campus / Building (Server Room Staff)
              </label>
              <div className="auc-input-box">
                <span className="auc-input-icon">
                  <MdApartment />
                </span>
                <input
                  id="auc-campus"
                  name="campusOrBuilding"
                  value={form.campusOrBuilding}
                  onChange={handleChange}
                  placeholder="Main Campus, Block A..."
                  className="auc-input"
                />
              </div>
            </div>

            {/* Designation */}
            <div className="auc-field">
              <label className="auc-label" htmlFor="auc-designation">
                Designation (Teachers)
              </label>
              <div className="auc-input-box">
                <span className="auc-input-icon">
                  <MdWork />
                </span>
               {/* <input
                  id="auc-designation"
                  name="designation"
                  value={form.designation}
                  onChange={handleChange}
                  placeholder="Professor, Lecturer..."
                  className="auc-input"
                /> */}
                <select
                    id="auc-designation"
                    name="designation"
                    value={form.designation}
                    onChange={handleChange}
                    className="auc-select"
                  >
                    {DESIGNATIONS_CATEGORIES.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
              </div>
            </div>

            {/* Semester */}
            <div className="auc-field">
              <label className="auc-label" htmlFor="auc-semester">
                Semester (Students)
              </label>
              <div className="auc-input-box">
                <span className="auc-input-icon">
                  <MdSchool />
                </span>
                <input
                  id="auc-semester"
                  name="semester"
                  value={form.semester}
                  onChange={handleChange}
                  placeholder="e.g., 5th Semester"
                  className="auc-input"
                />
              </div>
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

        {/* Right: helper content */}
        <aside className="auc-card auc-card--side">
          <div className="auc-side-badge">Guidelines</div>
          <h2 className="auc-side-title">Assign roles carefully</h2>
          <p className="auc-side-text">
            The role you assign determines what the user can access:
          </p>
          <ul className="auc-side-list">
            <li>
              <strong>STUDENT</strong> – Can submit complaints, see events and
              use the chatbot.
            </li>
            <li>
              <strong>TEACHER</strong> – Can create complaints and resource
              requests on behalf of classes.
            </li>
            <li>
              <strong>SERVICE_PROVIDER</strong> – Handles assigned complaints
              (IT, Electrical, Maintenance, etc.).
            </li>
            <li>
              <strong>SERVER_ROOM_STAFF</strong> – Manages resource requests and
              server room operations.
            </li>
            <li>
              <strong>ADMIN</strong> – Full access to users and system
              configuration.
            </li>
          </ul>

          <p className="auc-side-note">
            For security, new users should be instructed to{" "}
            <strong>change their password</strong> after the first login using
            the temporary password you set here.
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
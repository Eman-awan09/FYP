// // src/pages/auth/RegisterPage.jsx
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { registerApi } from "../../api/authApi";

// const RegisterPage = () => {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "STUDENT", // STUDENT or TEACHER
//     department: "",
//     semester: "",
//     designation: "",
//     phone: "",
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

//     if (!form.name || !form.email || !form.password || !form.role) {
//       alert("Please fill all required fields.");
//       return;
//     }

//     try {
//       setLoading(true);
//       const data = await registerApi(form);
//       alert("Registered. OTP sent to your email.");

//       // Pass email to OTP page (via query param or state)
//       navigate(`/verify-otp?email=${encodeURIComponent(data.email)}`);
//     } catch (error) {
//       console.error("Register error:", error);
//       const msg =
//         error?.response?.data?.message || "Registration failed. Please try again.";
//       alert(msg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const isStudent = form.role === "STUDENT";
//   const isTeacher = form.role === "TEACHER";

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         background: "#f5f5f5",
//       }}
//     >
//       <form
//         onSubmit={handleSubmit}
//         style={{
//           background: "#fff",
//           padding: "24px",
//           borderRadius: "8px",
//           boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//           width: "360px",
//           display: "flex",
//           flexDirection: "column",
//           gap: "12px",
//         }}
//       >
//         <h2 style={{ marginTop: 0, marginBottom: "8px" }}>Register</h2>

//         <small>Only Students and Teachers can self-register.</small>

//         <div>
//           <label>Name *</label>
//           <input
//             name="name"
//             value={form.name}
//             onChange={handleChange}
//             placeholder="Full Name"
//             required
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
//             placeholder="university email"
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
//             placeholder="••••••••"
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
//             <option value="STUDENT">Student</option>
//             <option value="TEACHER">Teacher</option>
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

//         <div>
//           <label>Department</label>
//           <input
//             name="department"
//             value={form.department}
//             onChange={handleChange}
//             placeholder="e.g., Computer Science"
//             style={{ width: "100%", padding: "8px" }}
//           />
//         </div>

//         {isStudent && (
//           <div>
//             <label>Semester</label>
//             <input
//               name="semester"
//               value={form.semester}
//               onChange={handleChange}
//               placeholder="e.g., 5th semester"
//               style={{ width: "100%", padding: "8px" }}
//             />
//           </div>
//         )}

//         {isTeacher && (
//           <div>
//             <label>Designation</label>
//             <input
//               name="designation"
//               value={form.designation}
//               onChange={handleChange}
//               placeholder="Professor, Lecturer..."
//               style={{ width: "100%", padding: "8px" }}
//             />
//           </div>
//         )}

//         <button
//           type="submit"
//           disabled={loading}
//           style={{
//             marginTop: "8px",
//             padding: "10px",
//             background: "#1976d2",
//             color: "#fff",
//             border: "none",
//             borderRadius: "4px",
//             cursor: loading ? "not-allowed" : "pointer",
//           }}
//         >
//           {loading ? "Registering..." : "Register"}
//         </button>

//         <button
//           type="button"
//           onClick={() => navigate("/login")}
//           style={{
//             marginTop: "4px",
//             padding: "8px",
//             background: "transparent",
//             border: "none",
//             textDecoration: "underline",
//             cursor: "pointer",
//           }}
//         >
//           Back to Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default RegisterPage;

// // src/pages/auth/RegisterPage.jsx
// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import {
//   FaEnvelope,
//   FaLock,
//   FaUser,
//   FaPhone,
//   FaBuilding,
//   FaUniversity,
//   FaUserTie,
// } from "react-icons/fa";
// import { MdSchool, MdReportProblem, MdInventory2 } from "react-icons/md";
// import { registerApi } from "../../api/authApi";
// import "./RegisterPage.css";
// import { toast } from 'react-toastify';
// import  Navbar  from '../../components/home/1Navbar/Navbar';



// const RegisterPage = () => {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "STUDENT",
//     department: "",
//     semester: "",
//     designation: "",
//     phone: "",
//   });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!form.name || !form.email || !form.password || !form.role) {
//       toast("Please fill all required fields.");
//       return;
//     }
//     try {
//       setLoading(true);
//       const data = await registerApi(form);
//       toast("Registered. OTP sent to your email.");
//       navigate(`/verify-otp?email=${encodeURIComponent(data.email)}`);
//     } catch (error) {
//       const msg =
//         error?.response?.data?.message ||
//         "Registration failed. Please try again.";
//       toast(msg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const isStudent = form.role === "STUDENT";
//   const isTeacher = form.role === "TEACHER";

//   return (
//     <div className="register-page">
//       <Navbar/>
//       <div className="register-card layout-card">
//         {/* LEFT: Register form */}
//         <div className="layout-card__left">
//           <div className="register-card__header">
//             <span className="register-badge">CampusHub</span>
//             <h1>Create your CampusHub account</h1>
//             <p className="subtitle">
//               Students & Teachers can self-register using their university
//               details.
//             </p>
//           </div>

//           <form className="register-form" onSubmit={handleSubmit}>
//             <label className="field-label">Full Name *</label>
//             <div className="input-box">
//               <FaUser className="input-icon" />
//               <input
//                 name="name"
//                 value={form.name}
//                 onChange={handleChange}
//                 placeholder="Full Name"
//                 required
//               />
//             </div>

//             <label className="field-label">University Email *</label>
//             <div className="input-box">
//               <FaEnvelope className="input-icon" />
//               <input
//                 type="email"
//                 name="email"
//                 value={form.email}
//                 onChange={handleChange}
//                 placeholder="you@university.edu"
//                 required
//               />
//             </div>

//             <label className="field-label">Password *</label>
//             <div className="input-box">
//               <FaLock className="input-icon" />
//               <input
//                 type="password"
//                 name="password"
//                 value={form.password}
//                 onChange={handleChange}
//                 placeholder="••••••••"
//                 required
//               />
//             </div>

//             <label className="field-label">Role *</label>
//             <select
//               name="role"
//               value={form.role}
//               onChange={handleChange}
//               className="role-select"
//             >
//               <option value="STUDENT">Student</option>
//               <option value="TEACHER">Teacher</option>
//             </select>

//             <label className="field-label">Phone</label>
//             <div className="input-box">
//               <FaPhone className="input-icon" />
//               <input
//                 name="phone"
//                 value={form.phone}
//                 onChange={handleChange}
//                 placeholder="Phone number"
//               />
//             </div>

//             <label className="field-label">Department</label>
//             {/* <div className="input-box"> */}
//               {/* <FaBuilding className="input-icon" /> */}
//               {/* <input
//                 name="department"
//                 value={form.department}
//                 onChange={handleChange}
//                 placeholder="e.g., Computer Science"
//               /> */}
//               <select
//                 name="department"
//                 value={form.department}
//                 onChange={handleChange}
//                 className="role-select"
//               >
//                 <option value="BSCS">BSCS</option>
//                 <option value="BSSE">BSSE</option>
//                 <option value="BSIT">BSIT</option>
//                 <option value="BSAI">BSAI</option>
//                 <option value="BSDS">BSDS</option>
//                 <option value="BSDFCS">BSDFCS</option>
//               </select>
//             {/* </div> */}

//             {isStudent && (
//               <>
//                 <label className="field-label">Semester</label>
//                 {/* <div className="input-box">
//                   <FaUniversity className="input-icon" />
//                   <input
//                     name="semester"
//                     value={form.semester}
//                     onChange={handleChange}
//                     placeholder="e.g., 5th semester"
//                   />
//                 </div> */}
//                 <select
//                 name="semester"
//                 value={form.semester}
//                 onChange={handleChange}
//                 className="role-select"
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
//               </>
//             )}

//             {isTeacher && (
//               <>
//                 <label className="field-label">Designation</label>
//                 <div className="input-box">
//                   <FaUserTie className="input-icon" />
//                   <input
//                     name="designation"
//                     value={form.designation}
//                     onChange={handleChange}
//                     placeholder="Professor, Lecturer..."
//                   />
//                 </div>
//               </>
//             )}

//             <button type="submit" className="primary-btn" disabled={loading}>
//               {loading ? "Registering..." : "Register"}
//             </button>

//             <button
//               type="button"
//               className="link-btn"
//               style={{ color: "black" }}
//               onClick={() => navigate("/login")}
//             >
//               Already have an account? Login
//             </button>
//           </form>
//         </div>

//         {/* RIGHT: Content + image + login CTA */}
//         <div className="layout-card__right">
//           <div className="register-right-inner">
//             <div className="right-badges">
//               <span className="right-badge">Students & Teachers</span>
//               <span className="right-badge right-badge--outline">
//                 Campus Info · Complaints · Resources
//               </span>
//             </div>

//             <h2>Join your campus digital desk</h2>
//             <p>
//               After registering, you can view announcements, submit complaints,
//               track responses and download study resources specific to your
//               department and role.
//             </p>

//             <div className="register-illustration-wrapper">
//               <img
//                 src="https://images.pexels.com/photos/3861964/pexels-photo-3861964.jpeg?auto=compress&cs=tinysrgb&w=1200"
//                 alt="Students registering for campus portal"
//                 className="register-image"
//               />
//               <div className="register-illustration-overlay">
//                 <div className="overlay-item">
//                   <MdSchool size={18} />
//                   <span>Campus Access</span>
//                 </div>
//                 <div className="overlay-item">
//                   <MdReportProblem size={18} />
//                   <span>Raise Issues</span>
//                 </div>
//                 <div className="overlay-item">
//                   <MdInventory2 size={18} />
//                   <span>Resources</span>
//                 </div>
//               </div>
//             </div>

//             <button
//               type="button"
//               // className="secondary-btn"
//               style={{ textDecoration: "none", fontSize: "0.8rem", color: "black" }}
//               onClick={() => navigate("/login")}
//             >
//               Already registered? Sign in
//             </button>

//             <p className="security-text">
//               🔒 Your account is protected with OTP verification and role-based
//               access.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;

// src/pages/auth/RegisterPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaPhone,
} from "react-icons/fa";
import { MdSchool, MdReportProblem, MdInventory2 } from "react-icons/md";
import { registerApi } from "../../api/authApi";
import "./RegisterPage.css";
import { toast } from "react-toastify";
import Navbar from "../../components/home/1Navbar/Navbar";

/* ── Shared option lists (keep in sync across the app) ──────────── */
const DEPARTMENT_OPTIONS = [
  { value: "bscs", label: "BSCS" },
  { value: "bsse", label: "BSSE" },
  { value: "bsit", label: "BSIT" },
  { value: "bsai", label: "BSAI" },
  { value: "bsds", label: "BSDS" },
  { value: "bsdfcs", label: "BSDFCS" },
];

const SEMESTER_OPTIONS = [
  "1st Semester",
  "2nd Semester",
  "3rd Semester",
  "4th Semester",
  "5th Semester",
  "6th Semester",
  "7th Semester",
  "8th Semester",
];

const DESIGNATION_OPTIONS = [
  { value: "Lecturer", label: "Lecturer" },
  { value: "Assistant Lecturer", label: "Assistant Lecturer" },
  { value: "Senior Lecturer", label: "Senior Lecturer" },
  { value: "Professor", label: "Professor" },
];

/* ── Initial form state ─────────────────────────────────────────── */
const INITIAL_FORM = {
  name: "",
  email: "",
  password: "",
  role: "STUDENT",
  department: "",
  semester: "",
  designation: "",
  phone: "",
};

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);

  const isStudent = form.role === "STUDENT";
  const isTeacher = form.role === "TEACHER";

  /* ── Handlers ─────────────────────────────────────────────────── */
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
      department: prev.department,
      role: newRole,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password || !form.role) {
      toast.error("Please fill all required fields.");
      return;
    }

    if (!form.department) {
      toast.error("Please select a department.");
      return;
    }

    if (isStudent && !form.semester) {
      toast.error("Please select your semester.");
      return;
    }

    if (isTeacher && !form.designation) {
      toast.error("Please select your designation.");
      return;
    }

    try {
      setLoading(true);
      const data = await registerApi(form);
      toast.success("Registered! OTP sent to your email.");
      navigate(`/verify-otp?email=${encodeURIComponent(data.email)}`);
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        "Registration failed. Please try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  /* ── Render ───────────────────────────────────────────────────── */
  return (
    <div className="register-page">
      <Navbar />

      <div className="register-card layout-card">
        {/* ── LEFT: form ──────────────────────────────────────────── */}
        <div className="layout-card__left">
          <div className="register-card__header">
            <span className="register-badge">CampusHub</span>
            <h1>Create your CampusHub account</h1>
            <p className="subtitle">
              Students &amp; Teachers can self-register using their university
              details.
            </p>
          </div>

          <form className="register-form" onSubmit={handleSubmit}>
            {/* Name */}
            <label className="field-label">
              Full Name <span className="field-required">*</span>
            </label>
            <div className="input-box">
              <FaUser className="input-icon" />
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
              />
            </div>

            {/* Email */}
            <label className="field-label">
              University Email <span className="field-required">*</span>
            </label>
            <div className="input-box">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@university.edu"
                required
              />
            </div>

            {/* Password */}
            <label className="field-label">
              Password <span className="field-required">*</span>
            </label>
            <div className="input-box">
              <FaLock className="input-icon" />
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
            </div>

            {/* Role */}
            <label className="field-label">
              Role <span className="field-required">*</span>
            </label>
            <select
              name="role"
              value={form.role}
              onChange={handleRoleChange}
              className="role-select"
            >
              <option value="STUDENT">Student</option>
              <option value="TEACHER">Teacher</option>
            </select>

            {/* Phone */}
            <label className="field-label">Phone</label>
            <div className="input-box">
              <FaPhone className="input-icon" />
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone number"
              />
            </div>

            {/* Department — both roles */}
            <label className="field-label">
              Department <span className="field-required">*</span>
            </label>
            <select
              name="department"
              value={form.department}
              onChange={handleChange}
              className="role-select"
            >
              <option value="">-- Select Department --</option>
              {DEPARTMENT_OPTIONS.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>

            {/* Semester — STUDENT only */}
            {isStudent && (
              <>
                <label className="field-label">
                  Semester <span className="field-required">*</span>
                </label>
                <select
                  name="semester"
                  value={form.semester}
                  onChange={handleChange}
                  className="role-select"
                >
                  <option value="">-- Select Semester --</option>
                  {SEMESTER_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </>
            )}

            {/* Designation — TEACHER only */}
            {isTeacher && (
              <>
                <label className="field-label">
                  Designation <span className="field-required">*</span>
                </label>
                <select
                  name="designation"
                  value={form.designation}
                  onChange={handleChange}
                  className="role-select"
                >
                  <option value="">-- Select Designation --</option>
                  {DESIGNATION_OPTIONS.map((d) => (
                    <option key={d.value} value={d.value}>
                      {d.label}
                    </option>
                  ))}
                </select>
              </>
            )}

            <button
              type="submit"
              className="primary-btn"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>

            <button
              type="button"
              className="link-btn"
              style={{ color: "black" }}
              onClick={() => navigate("/login")}
            >
              Already have an account? Login
            </button>
          </form>
        </div>

        {/* ── RIGHT: info panel ────────────────────────────────────── */}
        <div className="layout-card__right">
          <div className="register-right-inner">
            <div className="right-badges">
              <span className="right-badge">Students &amp; Teachers</span>
              <span className="right-badge right-badge--outline">
                Campus Info · Complaints · Resources
              </span>
            </div>

            <h2>Join your campus digital desk</h2>
            <p>
              After registering, you can view announcements, submit complaints,
              track responses and download study resources specific to your
              department and role.
            </p>

            <div className="register-illustration-wrapper">
              <img
                src="https://images.pexels.com/photos/3861964/pexels-photo-3861964.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Students registering for campus portal"
                className="register-image"
              />
              <div className="register-illustration-overlay">
                <div className="overlay-item">
                  <MdSchool size={18} />
                  <span>Campus Access</span>
                </div>
                <div className="overlay-item">
                  <MdReportProblem size={18} />
                  <span>Raise Issues</span>
                </div>
                <div className="overlay-item">
                  <MdInventory2 size={18} />
                  <span>Resources</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              style={{
                textDecoration: "none",
                fontSize: "0.8rem",
                color: "black",
              }}
              onClick={() => navigate("/login")}
            >
              Already registered? Sign in
            </button>

            <p className="security-text">
              🔒 Your account is protected with OTP verification and role-based
              access.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
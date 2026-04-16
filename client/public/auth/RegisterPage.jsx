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

// src/pages/auth/RegisterPage.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaPhone,
  FaBuilding,
  FaUniversity,
  FaUserTie,
} from "react-icons/fa";
import { registerApi } from "../../api/authApi";
import "./RegisterPage.css";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "STUDENT",
    department: "",
    semester: "",
    designation: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.role) {
      alert("Please fill all required fields.");
      return;
    }
    try {
      setLoading(true);
      const data = await registerApi(form);
      alert("Registered. OTP sent to your email.");
      navigate(`/verify-otp?email=${encodeURIComponent(data.email)}`);
    } catch (error) {
      const msg =
        error?.response?.data?.message || "Registration failed. Please try again.";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  const isStudent = form.role === "STUDENT";
  const isTeacher = form.role === "TEACHER";

  return (
    <div className="register-layout">
      {/* LEFT – FORM */}
      <div className="register-left">
        <div className="register-card">
          <h1>Register</h1>
          <p className="subtitle">Only Students & Teachers can self-register</p>

          <form className="register-form" onSubmit={handleSubmit}>
            <label>Name *</label>
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

            <label>Email *</label>
            <div className="input-box">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="University email"
                required
              />
            </div>

            <label>Password *</label>
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

            <label>Role *</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="role-select"
            >
              <option value="STUDENT">Student</option>
              <option value="TEACHER">Teacher</option>
            </select>

            <label>Phone</label>
            <div className="input-box">
              <FaPhone className="input-icon" />
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone number"
              />
            </div>

            <label>Department</label>
            <div className="input-box">
              <FaBuilding className="input-icon" />
              <input
                name="department"
                value={form.department}
                onChange={handleChange}
                placeholder="e.g., Computer Science"
              />
            </div>

            {isStudent && (
              <>
                <label>Semester</label>
                <div className="input-box">
                  <FaUniversity className="input-icon" />
                  <input
                    name="semester"
                    value={form.semester}
                    onChange={handleChange}
                    placeholder="e.g., 5th semester"
                  />
                </div>
              </>
            )}

            {isTeacher && (
              <>
                <label>Designation</label>
                <div className="input-box">
                  <FaUserTie className="input-icon" />
                  <input
                    name="designation"
                    value={form.designation}
                    onChange={handleChange}
                    placeholder="Professor, Lecturer..."
                  />
                </div>
              </>
            )}

            <button type="submit" className="primary-btn" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>

            <button
              type="button"
              className="link-btn"
              onClick={() => navigate("/login")}
            >
              Back to Login
            </button>
          </form>
        </div>
      </div>

      {/* RIGHT – BRAND / INFO */}
      <div className="register-right">
        <div className="right-content">
          <h2>University Management System</h2>
          <p>Secure access for students, teachers, and staff — all in one place.</p>

          <img
            src="/images/register-illustration.svg"
            alt="Register Illustration"
            className="register-image"
          />

          <span className="security-text">🔒 Your data is protected and encrypted</span>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

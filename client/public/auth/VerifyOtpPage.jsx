// // src/pages/auth/VerifyOtpPage.jsx
// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { verifyOtpApi } from "../../api/authApi";
// import { useAuthContext } from "../../contexts/AuthContext";

// /**
//  * Reads email from query param if present.
//  * On success: logs user in and redirects to role dashboard.
//  */
// const VerifyOtpPage = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { login } = useAuthContext();

//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Read ?email= from URL
//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const emailParam = params.get("email");
//     if (emailParam) {
//       setEmail(emailParam);
//     }
//   }, [location.search]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!email || !otp) {
//       alert("Please provide email and OTP.");
//       return;
//     }

//     try {
//       setLoading(true);
//       const data = await verifyOtpApi(email, otp);
//       alert("OTP verified successfully.");

//       // data: { message, token, user }
//       login(data.token, data.user);

//       const role = data.user.role;
//       if (role === "STUDENT") navigate("/student");
//       else if (role === "TEACHER") navigate("/teacher");
//       else navigate("/");
//     } catch (error) {
//       console.error("Verify OTP error:", error);
//       const msg =
//         error?.response?.data?.message || "OTP verification failed. Please try again.";
//       alert(msg);
//     } finally {
//       setLoading(false);
//     }
//   };

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
//           width: "320px",
//           display: "flex",
//           flexDirection: "column",
//           gap: "12px",
//         }}
//       >
//         <h2 style={{ marginTop: 0 }}>Verify OTP</h2>

//         <div>
//           <label>Email</label>
//           <input
//             type="email"
//             value={email}
//             disabled={!!email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="registered email"
//             style={{ width: "100%", padding: "8px" }}
//           />
//         </div>

//         <div>
//           <label>OTP</label>
//           <input
//             type="text"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             placeholder="6-digit OTP"
//             maxLength={6}
//             style={{ width: "100%", padding: "8px", letterSpacing: "4px" }}
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           style={{
//             marginTop: "4px",
//             padding: "10px",
//             background: "#1976d2",
//             color: "#fff",
//             border: "none",
//             borderRadius: "4px",
//             cursor: loading ? "not-allowed" : "pointer",
//           }}
//         >
//           {loading ? "Verifying..." : "Verify OTP"}
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

// export default VerifyOtpPage;

// src/pages/auth/VerifyOtpPage.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyOtpApi } from "../../api/authApi";
import { useAuthContext } from "../../contexts/AuthContext";
import { FaEnvelope, FaKey } from "react-icons/fa";
import "./VerifyOtpPage.css";

const VerifyOtpPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuthContext();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  // Read ?email= from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const emailParam = params.get("email");
    if (emailParam) setEmail(emailParam);
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !otp) {
      alert("Please provide email and OTP.");
      return;
    }
    try {
      setLoading(true);
      const data = await verifyOtpApi(email, otp);
      alert("OTP verified successfully.");
      login(data.token, data.user);

      const role = data.user.role;
      if (role === "STUDENT") navigate("/student");
      else if (role === "TEACHER") navigate("/teacher");
      else navigate("/");
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        "OTP verification failed. Please try again.";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verify-wrapper">
      <div className="verify-card">
        <h1>Verify OTP</h1>
        <p className="subtitle">Enter the 6-digit OTP sent to your email</p>

        <form onSubmit={handleSubmit} className="verify-form">
          <label>Email</label>
          <div className="input-box">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              value={email}
              disabled={!!email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="registered email"
              required
            />
          </div>

          <label>OTP</label>
          <div className="input-box">
            <FaKey className="input-icon" />
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="6-digit OTP"
              maxLength={6}
              style={{ letterSpacing: "4px" }}
              required
            />
          </div>

          <button type="submit" className="primary-btn" disabled={loading}>
            {loading ? "Verifying..." : "Verify OTP"}
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
  );
};

export default VerifyOtpPage;

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
import { toast } from 'react-toastify';

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
      toast("Please provide email and OTP.");
      return;
    }
    try {
      setLoading(true);
      const data = await verifyOtpApi(email, otp);
      toast("OTP verified successfully.");
      login(data.token, data.user);

      const role = data.user.role;
      if (role === "STUDENT") navigate("/student");
      else if (role === "TEACHER") navigate("/teacher");
      else navigate("/");
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        "OTP verification failed. Please try again.";
      toast(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verify-page">
      <div className="verify-card layout-card">
        {/* LEFT – OTP FORM */}
        <div className="layout-card__left">
          <div className="verify-card__header">
            <span className="verify-badge">CampusHub</span>
            <h1>Verify your email</h1>
            <p className="subtitle">
              Enter the 6‑digit OTP we sent to your registered email to
              activate your CampusHub account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="verify-form">
            <label className="field-label">Email</label>
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

            <label className="field-label">One-Time Password (OTP)</label>
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

        {/* RIGHT – INFO / CONTEXT */}
        <div className="layout-card__right">
          <div className="verify-right-inner">
            <h2>Why we need OTP verification</h2>
            <p>
              OTP verification keeps your campus account secure and ensures that
              only valid university email addresses can access CampusHub.
            </p>

            <ul className="verify-highlight-list">
              <li>Protects your profile, complaints and requests from misuse.</li>
              <li>
                Confirms your identity as a student or teacher before granting
                access.
              </li>
              <li>
                Helps maintain accurate and trusted data across the campus
                system.
              </li>
            </ul>

            <div className="verify-steps">
              <div className="verify-step">
                <span className="step-badge">1</span>
                <div>
                  <h3>Check your inbox</h3>
                  <p>
                    We&apos;ve sent a 6‑digit OTP to your registered email
                    address. If you don&apos;t see it, check spam or promotions.
                  </p>
                </div>
              </div>
              <div className="verify-step">
                <span className="step-badge">2</span>
                <div>
                  <h3>Enter the code</h3>
                  <p>
                    Type the OTP here and click &quot;Verify OTP&quot; to
                    complete the activation.
                  </p>
                </div>
              </div>
              <div className="verify-step">
                <span className="step-badge">3</span>
                <div>
                  <h3>Start using CampusHub</h3>
                  <p>
                    After successful verification, you&apos;ll be redirected to
                    your role‑based dashboard.
                  </p>
                </div>
              </div>
            </div>

            <p className="security-text">
              🔒 We never share your email. OTPs expire after a short time for
              your security.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtpPage;
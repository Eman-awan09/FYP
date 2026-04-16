// // src/pages/auth/LoginPage.jsx
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { loginApi } from '../../api/authApi';
// import { useAuthContext } from '../../contexts/AuthContext';

// const LoginPage = () => {
//   const navigate = useNavigate();
//   const { login } = useAuthContext();

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Basic frontend validation
//     if (!email || !password) {
//       alert('Please enter email and password.');
//       return;
//     }

//     try {
//       setLoading(true);
//       const data = await loginApi(email, password);
//       // data = { token, user }
//       login(data.token, data.user);

//       // Redirect based on role
//       const role = data.user.role;
//       if (role === 'STUDENT') navigate('/student');
//       else if (role === 'TEACHER') navigate('/teacher');
//       else if (role === 'SERVICE_PROVIDER') navigate('/service-provider');
//       else if (role === 'SERVER_ROOM_STAFF') navigate('/server-room');
//       else if (role === 'ADMIN') navigate('/admin');
//       else navigate('/');
//     } catch (error) {
//       console.error('Login error:', error);
//       const message =
//         error?.response?.data?.message || 'Login failed. Please check credentials.';
//       alert(message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       style={{
//         minHeight: '100vh',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         background: '#f5f5f5',
//       }}
//     >
//       <form
//         onSubmit={handleSubmit}
//         style={{
//           background: '#fff',
//           padding: '24px',
//           borderRadius: '8px',
//           boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//           width: '320px',
//         }}
//       >
//         <h2 style={{ marginTop: 0, marginBottom: '16px' }}>Login</h2>

//         <div style={{ marginBottom: '12px' }}>
//           <label>Email</label>
//           <input
//             type="email"
//             style={{ width: '100%', padding: '8px' }}
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="university email"
//           />
//         </div>

//         <div style={{ marginBottom: '16px' }}>
//           <label>Password</label>
//           <input
//             type="password"
//             style={{ width: '100%', padding: '8px' }}
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="••••••••"
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           style={{
//             width: '100%',
//             padding: '10px',
//             background: '#1976d2',
//             color: '#fff',
//             border: 'none',
//             borderRadius: '4px',
//             cursor: loading ? 'not-allowed' : 'pointer',
//           }}
//         >
//           {loading ? 'Logging in...' : 'Login'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default LoginPage;

// src/pages/auth/LoginPage.jsx
// src/pages/auth/LoginPage.jsx
// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { FaEnvelope, FaLock } from "react-icons/fa";
// import { loginApi } from "../../api/authApi";
// import { useAuthContext } from "../../contexts/AuthContext";
// import "./LoginPage.css";

// const LoginPage = () => {
//   const navigate = useNavigate();
//   const { login } = useAuthContext();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       toast("Please enter email and password.");
//       return;
//     }

//     try {
//       setLoading(true);
//       const data = await loginApi(email, password);
//       login(data.token, data.user);

//       const role = data.user.role;
//       if (role === "STUDENT") navigate("/student");
//       else if (role === "TEACHER") navigate("/teacher");
//       else if (role === "SERVICE_PROVIDER") navigate("/service-provider");
//       else if (role === "SERVER_ROOM_STAFF") navigate("/server-room");
//       else if (role === "ADMIN") navigate("/admin");
//       else navigate("/");
//     } catch (error) {
//       toast(
//         error?.response?.data?.message ||
//           "Login failed. Please check credentials."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="login-layout">
//       {/* LEFT – LOGIN FORM */}
//       <div className="login-left">
//         <div className="login-card">
//           <h1>Welcome Back 👋</h1>
//           <p className="subtitle">
//             Login to access your university portal
//           </p>

//           <form onSubmit={handleSubmit} className="login-form">
//             <label>Email</label>
//             <div className="input-box">
//               <FaEnvelope className="input-icon" />
//               <input
//                 type="email"
//                 placeholder="university email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>

//             <label>Password</label>
//             <div className="input-box">
//               <FaLock className="input-icon" />
//               <input
//                 type="password"
//                 placeholder="••••••••"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>

//             <div className="login-options">
//               <Link to="/forgot-password">Forgot password?</Link>
//             </div>

//             <button type="submit" className="primary-btn" disabled={loading}>
//               {loading ? "Logging in..." : "Login"}
//             </button>
//           </form>

//           <p className="register-text">
//             Don’t have an account?{" "}
//             <Link to="/register">Create account</Link>
//           </p>
//         </div>
//       </div>

//       {/* RIGHT – BRAND / INFO */}
//       <div className="login-right">
//         <div className="right-content">
//           <h2>University Management System</h2>
//           <p>
//             Secure access for students, teachers, service providers,
//             and administrators — all in one place.
//           </p>

//           <img
//             src="/images/login-illustration.svg"
//             alt="Login Illustration"
//             className="login-image"
//           />

//           <span className="security-text">
//             🔒 Your data is protected and encrypted
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { MdSchool, MdReportProblem, MdInventory2 } from "react-icons/md";
import { loginApi } from "../../api/authApi";
import { useAuthContext } from "../../contexts/AuthContext";
import  Navbar  from '../../components/home/1Navbar/Navbar';

import "./LoginPage.css";
import { toast } from 'react-toastify';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuthContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      // toast("");
      toast("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);
      const data = await loginApi(email, password);
      login(data.token, data.user);
      
      const role = data.user.role;
      if (role === "STUDENT") navigate("/student");
      else if (role === "TEACHER") navigate("/teacher");
      else if (role === "SERVICE_PROVIDER") navigate("/service-provider");
      else if (role === "SERVER_ROOM_STAFF") navigate("/server-room");
      else if (role === "ADMIN") navigate("/admin");
      else navigate("/");
    } catch (error) {
      // alert(
      //   error?.response?.data?.message ||
      //     "Login failed. Please check credentials."
      // );
      toast(error?.response?.data?.message || "Login failed. Please check credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <Navbar/>
      <div className="login-card layout-card">
        {/* LEFT: Login form */}
        <div className="layout-card__left">
          <div className="login-card__header">
            <span className="login-badge">CampusHub</span>
            <h1>Sign in to CampusHub</h1>
            <p className="subtitle">
              Use your university email to continue to your campus dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <label className="field-labels" >University Email</label>
            <div className="input-box">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                placeholder="you@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <label className="field-labels">Password</label>
            <div className="input-box">
              <FaLock className="input-icon" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="login-options">
              <Link to="/forgot-password" style={{color:"black"}}>Forgot password?</Link>
            </div>
            
            <button type="submit" className="primary-btn" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
            <button
              type="button"
              style={{ textDecoration: "underline", fontSize: "0.8rem" }}
              onClick={() => navigate("/register")}
            >
              Create a CampusHub account? Register
            </button>
          </form>
        </div>

        {/* RIGHT: content + image + register CTA */}
        <div className="layout-card__right">
          <div className="right-inner">
            <div className="right-badges">
              <span className="right-badge">Campus Information</span>
              <span className="right-badge right-badge--outline">
                Complaints · Resources · Events
              </span>
            </div>

            <h2>New to CampusHub?</h2>
            <p>
              Create your account to access campus announcements, submit and
              track complaints, and download important study resources from your
              department.
            </p>

            <div className="login-illustration-wrapper">
              <img
                src="https://images.pexels.com/photos/1181371/pexels-photo-1181371.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Students collaborating on campus"
                className="login-image"
              />
              <div className="login-illustration-overlay">
                <div className="overlay-item">
                  <MdSchool size={18} />
                  <span>Campus Info</span>
                </div>
                <div className="overlay-item">
                  <MdReportProblem size={18} />
                  <span>Complaints</span>
                </div>
                <div className="overlay-item">
                  <MdInventory2 size={18} />
                  <span>Resources</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="secondary-btn"
              onClick={() => navigate("/register")}
            >
              Create a CampusHub account
            </button>

            <p className="security-text">
              🔒 Secure, role-based access for students, teachers, admins and
              staff.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
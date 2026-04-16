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
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { loginApi } from "../../api/authApi";
import { useAuthContext } from "../../contexts/AuthContext";
import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuthContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password.");
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
      alert(
        error?.response?.data?.message ||
          "Login failed. Please check credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-layout">
      {/* LEFT – LOGIN FORM */}
      <div className="login-left">
        <div className="login-card">
          <h1>Welcome Back 👋</h1>
          <p className="subtitle">
            Login to access your university portal
          </p>

          <form onSubmit={handleSubmit} className="login-form">
            <label>Email</label>
            <div className="input-box">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                placeholder="university email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <label>Password</label>
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
              <Link to="/forgot-password">Forgot password?</Link>
            </div>

            <button type="submit" className="primary-btn" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="register-text">
            Don’t have an account?{" "}
            <Link to="/register">Create account</Link>
          </p>
        </div>
      </div>

      {/* RIGHT – BRAND / INFO */}
      <div className="login-right">
        <div className="right-content">
          <h2>University Management System</h2>
          <p>
            Secure access for students, teachers, service providers,
            and administrators — all in one place.
          </p>

          <img
            src="/images/login-illustration.svg"
            alt="Login Illustration"
            className="login-image"
          />

          <span className="security-text">
            🔒 Your data is protected and encrypted
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;


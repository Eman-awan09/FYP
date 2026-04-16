// // src/components/layout/TopBar.jsx
// import React from 'react';
// import { useAuthContext } from '../../contexts/AuthContext';

// const TopBar = () => {
//   const { user, logout } = useAuthContext();

//   return (
//     <header
//       style={{
//         height: '56px',
//         borderBottom: '1px solid #ddd',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         padding: '0 16px',
//       }}
//     >
//       <h3 style={{ margin: 0 }}>Campus Info & Complaint Desk</h3>
//       {user && (
//         <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//           <span>{user.name || user.email}</span>
//           <button onClick={logout}>Logout</button>
//         </div>
//       )}
//     </header>
//   );
// };

// export default TopBar;

// import React from "react";
// import { useAuthContext } from "../../contexts/AuthContext";
// import "./TopBar.css";

// const TopBar = () => {
//   const { user, logout } = useAuthContext();

//   return (
//     <header className="topbar">
//       <div className="topbar__left">
//         <h3 className="topbar__title">Campus Info &amp; Complaint Desk</h3>
//         <p className="topbar__subtitle">
//           Central place for campus services, complaints &amp; events
//         </p>
//       </div>

//       {user && (
//         <div className="topbar__right">
//           <div className="topbar__user">
//             {/* Simple generated initials avatar */}
//             <div className="topbar__avatar">
//               {String(user.name || user.email || "U")
//                 .trim()
//                 .charAt(0)
//                 .toUpperCase()}
//             </div>
//             <div className="topbar__user-info">
//               <span className="topbar__user-name">
//                 {user.name || user.email}
//               </span>
//               {user.role && (
//                 <span className="topbar__user-role">{user.role}</span>
//               )}
//             </div>
//           </div>

//           <button
//             type="button"
//             className="topbar__logout-btn"
//             onClick={logout}
//           >
//             Logout
//           </button>
//         </div>
//       )}
//     </header>
//   );
// };

// export default TopBar;

// import React from "react";
// import { useAuthContext } from "../../contexts/AuthContext";
// import "./TopBar.css";

// /**
//  * TopBar
//  * - Shows global title and user info
//  * - Always shows sidebar toggle button (all devices)
//  */
// const TopBar = ({ isSidebarOpen, onToggleSidebar }) => {
//   const { user, logout } = useAuthContext();

//   return (
//     <header className="topbar">
//       {/* Left section: sidebar toggle + titles */}
//       <div className="topbar__left">
//         <button
//           type="button"
//           className={`topbar__sidebar-toggle ${
//             isSidebarOpen ? "topbar__sidebar-toggle--open" : ""
//           }`}
//           onClick={onToggleSidebar}
//           aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
//         >
//           <span className="topbar__toggle-bar" />
//           <span className="topbar__toggle-bar" />
//           <span className="topbar__toggle-bar" />
//         </button>

//         <div className="topbar__titles">
//           <h3 className="topbar__title">Campus Info &amp; Complaint Desk</h3>
//           <p className="topbar__subtitle">
//             Central place for campus services, complaints &amp; events
//           </p>
//         </div>
//       </div>

//       {/* Right section: user info + logout */}
//       {user && (
//         <div className="topbar__right">
//           <div className="topbar__user">
//             <div className="topbar__avatar">
//               {String(user.name || user.email || "U")
//                 .trim()
//                 .charAt(0)
//                 .toUpperCase()}
//             </div>
//             <div className="topbar__user-info">
//               <span className="topbar__user-name">
//                 {user.name || user.email}
//               </span>
//               {user.role && (
//                 <span className="topbar__user-role">{user.role}</span>
//               )}
//             </div>
//           </div>

//           <button
//             type="button"
//             className="topbar__logout-btn"
//             onClick={logout}
//           >
//             Logout
//           </button>
//         </div>
//       )}
//     </header>
//   );
// };

// export default TopBar;

import React from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import "./TopBar.css";

/**
 * TopBar
 * - Always shows sidebar toggle (controls overlay sidebar)
 */
const TopBar = ({ isSidebarOpen, onToggleSidebar }) => {
  const { user, logout } = useAuthContext();

  return (
    <header className="topbar">
      <div className="topbar__left">
        <button
          type="button"
          className={`topbar__sidebar-toggle ${
            isSidebarOpen ? "topbar__sidebar-toggle--open" : ""
          }`}
          onClick={onToggleSidebar}
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          <span className="topbar__toggle-bar" />
          <span className="topbar__toggle-bar" />
          <span className="topbar__toggle-bar" />
        </button>

        <div className="topbar__titles">
          <h3 className="topbar__title">Campus Info &amp; Complaint Desk</h3>
          <p className="topbar__subtitle">
            Central place for campus services, complaints &amp; events
          </p>
        </div>
      </div>

      {user && (
        <div className="topbar__right">
          <div className="topbar__user">
            <div className="topbar__avatar">
              {String(user.name || user.email || "U")
                .trim()
                .charAt(0)
                .toUpperCase()}
            </div>
            <div className="topbar__user-info">
              <span className="topbar__user-name">
                {user.name || user.email}
              </span>
              {user.role && (
                <span className="topbar__user-role">{user.role}</span>
              )}
            </div>
          </div>

          <button
            type="button"
            className="topbar__logout-btn"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default TopBar;
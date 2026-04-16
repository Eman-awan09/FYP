// // src/components/layout/SideNav.jsx
// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { roleSidebarConfig } from './roleSidebarConfig';
// import { useAuthContext } from '../../contexts/AuthContext';

// const SideNav = () => {
//   const { user } = useAuthContext();

//   if (!user) return null;

//   const navItems = roleSidebarConfig[user.role] || [];

//   return (
//     <aside
//       style={{
//         width: '220px',
//         padding: '16px',
//         borderRight: '1px solid #ddd',
//         minHeight: '100vh',
//       }}
//     >
//       <div style={{ marginBottom: '24px' }}>
//         <h2 style={{ margin: 0 }}>Campus Desk</h2>
//         <small>{user.role}</small>
//       </div>

//       <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
//         {navItems.map((item) => (
//           <NavLink
//             key={item.path}
//             to={item.path}
//             style={({ isActive }) => ({
//               padding: '8px 12px',
//               borderRadius: '4px',
//               textDecoration: 'none',
//               color: isActive ? '#fff' : '#333',
//               background: isActive ? '#1976d2' : 'transparent',
//             })}
//           >
//             {item.label}
//           </NavLink>
//         ))}
//       </nav>
//     </aside>
//   );
// };

// export default SideNav;


// import React from "react";
// import { NavLink } from "react-router-dom";
// import { roleSidebarConfig } from "./roleSidebarConfig";
// import { useAuthContext } from "../../contexts/AuthContext";
// import "./SideNav.css";

// /**
//  * SideNav
//  * - Controlled by isOpen (from parent)
//  * - On mobile: slides in/out over content, but never under topbar
//  * - Menu text always visible when open
//  */
// const SideNav = ({ isOpen, onToggleSidebar }) => {
//   const { user } = useAuthContext();

//   if (!user) return null;

//   const navItems = roleSidebarConfig[user.role] || [];

//   return (
//     <>
//       {/* Dark overlay on mobile when sidebar open */}
//       <div
//         className={`sidenav-overlay ${isOpen ? "sidenav-overlay--visible" : ""}`}
//         onClick={onToggleSidebar}
//       />

//       <aside className={`sidenav ${isOpen ? "sidenav--open" : "sidenav--closed"}`}>
//         {/* Top brand + close on small screens */}
//         <div className="sidenav__header">
//           <div className="sidenav__brand">
//             <div className="sidenav__logo">CD</div>
//             <div className="sidenav__brand-text">
//               <h2>Campus Desk</h2>
//               <small>{user.role}</small>
//             </div>
//           </div>

//           {/* Extra close button only visible on mobile (top-right) */}
//           <button
//             type="button"
//             className="sidenav__close-btn"
//             onClick={onToggleSidebar}
//             aria-label="Close sidebar"
//           >
//             ×
//           </button>
//         </div>

//         {/* Navigation items */}
//         <nav className="sidenav__nav">
//           {navItems.map((item) => (
//             <NavLink
//               key={item.path}
//               to={item.path}
//               end
//               className={({ isActive }) =>
//                 `sidenav__link ${isActive ? "sidenav__link--active" : ""}`
//               }
//               onClick={() => {
//                 // On very small screens, close sidebar after navigation
//                 if (window.innerWidth <= 768) {
//                   onToggleSidebar();
//                 }
//               }}
//             >
//               <span className="sidenav__link-bullet" />
//               <span className="sidenav__link-label">{item.label}</span>
//             </NavLink>
//           ))}
//         </nav>
//       </aside>
//     </>
//   );
// };

// export default SideNav;

// import React, { useMemo } from "react";
// import { NavLink, useLocation } from "react-router-dom";
// import { roleSidebarConfig } from "./roleSidebarConfig";
// import { useAuthContext } from "../../contexts/AuthContext";
// import "./SideNav.css";

// // React Icons
// import { MdDashboard, MdPeople, MdEvent, MdPerson, MdChat } from "react-icons/md";
// import { FaHandshake, FaTicketAlt } from "react-icons/fa";
// import { RiComputerLine } from "react-icons/ri";

// /**
//  * Map basic icon suggestions per label keyword.
//  * You can adjust or extend this mapping as needed.
//  */
// const getIconForLabel = (label) => {
//   const lower = label.toLowerCase();
//   if (lower.includes("dashboard")) return MdDashboard;
//   if (lower.includes("user")) return MdPeople;
//   if (lower.includes("complain")) return FaTicketAlt;
//   if (lower.includes("resource") || lower.includes("request"))
//     return FaHandshake;
//   if (lower.includes("event")) return MdEvent;
//   if (lower.includes("profile")) return MdPerson;
//   if (lower.includes("chat")) return MdChat;
//   if (lower.includes("server")) return RiComputerLine;
//   return MdDashboard;
// };

// const SideNav = ({ isOpen, isDesktop, onToggleSidebar, onCloseSidebar }) => {
//   const { user } = useAuthContext();
//   const location = useLocation();

//   if (!user) return null;

//   const navItems = roleSidebarConfig[user.role] || [];

//   // Derive icon config once
//   const itemsWithIcons = useMemo(
//     () =>
//       navItems.map((item) => ({
//         ...item,
//         Icon: getIconForLabel(item.label),
//       })),
//     [navItems]
//   );

//   return (
//     <>
//       {/* Dark overlay when full sidebar open (all screens) */}
//       <div
//         className={`sidenav-overlay ${
//           isOpen ? "sidenav-overlay--visible" : ""
//         }`}
//         onClick={onCloseSidebar}
//       />

//       {/* Permanent Icon Rail (desktop only) */}
//       {isDesktop && (
//         <div className="sidenav-rail">
//           <div className="sidenav-rail__brand">
//             <div className="sidenav-rail__logo">CD</div>
//           </div>
//           <nav className="sidenav-rail__nav">
//             {itemsWithIcons.map(({ path, label, Icon }) => (
//               <NavLink
//                 key={path}
//                 to={path}
//                 end
//                 className={({ isActive }) =>
//                   `sidenav-rail__item ${
//                     isActive ? "sidenav-rail__item--active" : ""
//                   }`
//                 }
//               >
//                 <Icon className="sidenav-rail__icon" />
//                 <span className="sidenav-rail__tooltip">{label}</span>
//               </NavLink>
//             ))}
//           </nav>
//         </div>
//       )}

//       {/* Full Sidebar (overlay) */}
//       <aside
//         className={`sidenav ${
//           isOpen ? "sidenav--open" : "sidenav--closed"
//         }`}
//       >
//         <div className="sidenav__header">
//           <div className="sidenav__brand">
//             <div className="sidenav__logo">CD</div>
//             <div className="sidenav__brand-text">
//               <h2>Campus Desk</h2>
//               <small>{user.role}</small>
//             </div>
//           </div>

//           <button
//             type="button"
//             className="sidenav__close-btn"
//             onClick={onCloseSidebar}
//             aria-label="Close sidebar"
//           >
//             ×
//           </button>
//         </div>

//         <nav className="sidenav__nav">
//           {itemsWithIcons.map(({ path, label, Icon }) => {
//             const isActive = location.pathname === path;
//             return (
//               <NavLink
//                 key={path}
//                 to={path}
//                 end
//                 className={({ isActive: routeActive }) =>
//                   `sidenav__link ${
//                     routeActive || isActive ? "sidenav__link--active" : ""
//                   }`
//                 }
//                 onClick={() => {
//                   // close sidebar after navigation on small screens
//                   if (!isDesktop) {
//                     onCloseSidebar();
//                   }
//                 }}
//               >
//                 <Icon className="sidenav__icon" />
//                 <span className="sidenav__link-label">{label}</span>
//               </NavLink>
//             );
//           })}
//         </nav>
//       </aside>
//     </>
//   );
// };

// export default SideNav;

import React, { useMemo, useCallback } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { roleSidebarConfig } from "./roleSidebarConfig";
import { useAuthContext } from "../../contexts/AuthContext";
import "./SideNav.css";

// React Icons
import { MdDashboard, MdPeople, MdEvent, MdPerson, MdChat } from "react-icons/md";
import { FaHandshake, FaTicketAlt } from "react-icons/fa";
import { RiComputerLine } from "react-icons/ri";

/**
 * Icon mapping by label keyword.
 */
const getIconForLabel = (label) => {
  const lower = label.toLowerCase();
  if (lower.includes("dashboard")) return MdDashboard;
  if (lower.includes("user")) return MdPeople;
  if (lower.includes("complain")) return FaTicketAlt;
  if (lower.includes("resource") || lower.includes("request"))
    return FaHandshake;
  if (lower.includes("event")) return MdEvent;
  if (lower.includes("profile")) return MdPerson;
  if (lower.includes("chat")) return MdChat;
  if (lower.includes("server")) return RiComputerLine;
  return MdDashboard;
};

/**
 * SideNav
 * Props:
 *  - isOpen: boolean (global sidebar open state)
 *  - isDesktop: boolean (>= 1024px)
 *  - onToggleSidebar: function (toggles isOpen)
 *  - onCloseSidebar: function (sets isOpen = false)
 */
const SideNav = ({ isOpen, isDesktop, onToggleSidebar, onCloseSidebar }) => {
  const { user } = useAuthContext();
  const location = useLocation();

  if (!user) return null;

  const navItems = roleSidebarConfig[user.role] || [];

  const itemsWithIcons = useMemo(
    () =>
      navItems.map((item) => ({
        ...item,
        Icon: getIconForLabel(item.label),
      })),
    [navItems]
  );

  /**
   * Desktop: open sidebar on rail hover.
   */
  const handleRailMouseEnter = useCallback(() => {
    if (!isDesktop) return;
    if (!isOpen) {
      onToggleSidebar();
    }
  }, [isDesktop, isOpen, onToggleSidebar]);

  /**
   * Desktop: close sidebar when mouse leaves full sidebar container.
   */
  const handleSidebarMouseLeave = useCallback(() => {
    if (!isDesktop) return;
    if (isOpen) {
      onCloseSidebar();
    }
  }, [isDesktop, isOpen, onCloseSidebar]);

  /**
   * When a link is clicked:
   *  - On mobile: close sidebar to reveal content.
   *  - On desktop: keep open until mouse leaves, so do nothing special.
   */
  const handleNavItemClick = () => {
    if (!isDesktop) {
      onCloseSidebar();
    }
  };

  return (
    <>
      {/* Dark overlay when full sidebar open (only used visually on non-desktop OR when you want overlay even on desktop) */}
      <div
        className={`sidenav-overlay ${
          isOpen ? "sidenav-overlay--visible" : ""
        }`}
        onClick={onCloseSidebar}
      />

      {/* Permanent Icon Rail (desktop only, triggers hover open) */}
      {isDesktop && (
        <div
          className="sidenav-rail"
          onMouseEnter={handleRailMouseEnter}
        >
          <div className="sidenav-rail__brand">
            <div className="sidenav-rail__logo">CD</div>
          </div>
          <nav className="sidenav-rail__nav">
            {itemsWithIcons.map(({ path, label, Icon }) => (
              <NavLink
                key={path}
                to={path}
                end
                className={({ isActive }) =>
                  `sidenav-rail__item ${
                    isActive ? "sidenav-rail__item--active" : ""
                  }`
                }
              >
                <Icon className="sidenav-rail__icon" />
                <span className="sidenav-rail__tooltip">{label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      )}

      {/* Full Sidebar (overlay) */}
      <aside
        className={`sidenav ${
          isOpen ? "sidenav--open" : "sidenav--closed"
        }`}
        onMouseLeave={handleSidebarMouseLeave}
      >
        <div className="sidenav__header">
          <div className="sidenav__brand">
            <div className="sidenav__logo">CD</div>
            <div className="sidenav__brand-text">
              <h2>Campus Desk</h2>
              <small>{user.role}</small>
            </div>
          </div>

          <button
            type="button"
            className="sidenav__close-btn"
            onClick={onCloseSidebar}
            aria-label="Close sidebar"
          >
            ×
          </button>
        </div>

        <nav className="sidenav__nav">
          {itemsWithIcons.map(({ path, label, Icon }) => {
            const isActive = location.pathname === path;
            return (
              <NavLink
                key={path}
                to={path}
                end
                className={({ isActive: routeActive }) =>
                  `sidenav__link ${
                    routeActive || isActive ? "sidenav__link--active" : ""
                  }`
                }
                onClick={handleNavItemClick}
              >
                <Icon className="sidenav__icon" />
                <span className="sidenav__link-label">{label}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default SideNav;
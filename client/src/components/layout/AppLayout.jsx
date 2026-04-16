// src/components/layout/AppLayout.jsx
// import React from 'react';
// import SideNav from './SideNav';
// import TopBar from './TopBar';

// /**
//  * Shared layout for all dashboards.
//  */
// const AppLayout = ({ children }) => {
//   return (
//     <div style={{ display: 'flex', minHeight: '100vh' }}>
//       <SideNav />
//       <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
//         <TopBar />
//         <main style={{ padding: '16px', flex: 1 }}>{children}</main>
//       </div>
//     </div>
//   );
// };

// export default AppLayout;

// import React from "react";
// import SideNav from "./SideNav";
// import TopBar from "./TopBar";
// import "./AppLayout.css";

// /**
//  * Shared layout for all dashboards.
//  * - Responsive layout with collapsible sidebar on smaller screens
//  * - Uses CSS for styling instead of inline styles
//  */
// const AppLayout = ({ children }) => {
//   return (
//     <div className="app-layout">
//       {/* Sidebar */}
//       <SideNav />

//       {/* Main container */}
//       <div className="app-layout__main">
//         {/* Top bar */}
//         <TopBar />

//         {/* Page content */}
//         <main className="app-layout__content">{children}</main>
//       </div>
//     </div>
//   );
// };

// export default AppLayout;

// import React, { useState, useCallback } from "react";
// import SideNav from "./SideNav";
// import TopBar from "./TopBar";
// import "./AppLayout.css";

// /**
//  * Shared layout for all dashboards.
//  * - Manages sidebar open/close state for all devices
//  * - Ensures topbar does not overlap sidebar
//  */
// const AppLayout = ({ children }) => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   // Toggle sidebar from TopBar / sidebar itself
//   const handleToggleSidebar = useCallback(() => {
//     setIsSidebarOpen((prev) => !prev);
//   }, []);

//   return (
//     <div className="app-layout">
//       {/* Sidebar */}
//       <SideNav isOpen={isSidebarOpen} onToggleSidebar={handleToggleSidebar} />

//       {/* Main area */}
//       <div className="app-layout__main">
//         <TopBar
//           isSidebarOpen={isSidebarOpen}
//           onToggleSidebar={handleToggleSidebar}
//         />
//         <main className="app-layout__content">{children}</main>
//       </div>
//     </div>
//   );
// };

// export default AppLayout;


import React, { useState, useEffect, useCallback } from "react";
import SideNav from "./SideNav";
import TopBar from "./TopBar";
import "./AppLayout.css";

/**
 * Shared layout for all dashboards.
 * - Has a permanent left icon-rail (big screens) and overlay sidebar (all screens)
 * - Body always uses full width; sidebar overlays on top when opened
 */
const AppLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  // Track desktop / mobile to adjust default sidebar behavior
  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const handleCloseSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  return (
    <div className="app-layout">
      {/* Sidebar (overlay) and left icon-rail are managed inside SideNav */}
      <SideNav
        isOpen={isSidebarOpen}
        isDesktop={isDesktop}
        onToggleSidebar={handleToggleSidebar}
        onCloseSidebar={handleCloseSidebar}
      />

      {/* Main area (topbar + content) */}
      <div className="app-layout__main">
        <TopBar
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={handleToggleSidebar}
        />
        <main className="app-layout__content">{children}</main>
      </div>
    </div>
  );
};

export default AppLayout;
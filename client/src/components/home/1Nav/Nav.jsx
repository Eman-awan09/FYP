// import React from "react";
// import { FaArrowRight } from "react-icons/fa"; // replacing Icon1 with this icon
// import "./nav.css";

// export const Navbar = () => {
//   return (
//     <div className="hero-container">
//             <img
//               src="image.png"
//               className="hero-icon"
//             />
//     </div>
//   );
// };

// src/components/layout/Navbar.jsx
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { MdPerson, MdMenu, MdClose } from "react-icons/md";
import "./nav.css";

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobile = () => setMobileOpen((prev) => !prev);
  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="app-navbar">
      <div className="app-navbar__inner">
        {/* Left: Brand / Logo */}
        <Link to="/" className="app-navbar__brand" onClick={closeMobile}>
          <div className="app-navbar__logo">
            <img src="/image.png" alt="CampusHub logo" />
          </div>
          <div className="app-navbar__brand-text">
            <span className="app-navbar__brand-title">CampusHub</span>
            <span className="app-navbar__brand-subtitle">
              Info · Complaints · Resources
            </span>
          </div>
        </Link>

        {/* Center: desktop nav links */}
        <nav className="app-navbar__nav app-navbar__nav--desktop">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              "app-navbar__link" + (isActive ? " app-navbar__link--active" : "")
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/events"
            className={({ isActive }) =>
              "app-navbar__link" + (isActive ? " app-navbar__link--active" : "")
            }
          >
            Events
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              "app-navbar__link" + (isActive ? " app-navbar__link--active" : "")
            }
          >
            About
          </NavLink>
        </nav>

        {/* Right: actions + mobile toggle */}
        <div className="app-navbar__right">
          {/* Desktop actions */}
          <div className="app-navbar__actions app-navbar__actions--desktop">
            <Link
              to="/login"
              className="app-navbar__btn app-navbar__btn--ghost"
            >
              <MdPerson size={16} />
              <span>Login</span>
            </Link>
            <Link
              to="/register"
              className="app-navbar__btn app-navbar__btn--primary"
            >
              Register
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="app-navbar__toggle"
            onClick={toggleMobile}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <MdClose size={20} /> : <MdMenu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileOpen && (
        <div className="app-navbar__mobile-menu">
          <nav className="app-navbar__nav app-navbar__nav--mobile">
            <NavLink
              to="/"
              end
              onClick={closeMobile}
              className={({ isActive }) =>
                "app-navbar__mobile-link" +
                (isActive ? " app-navbar__mobile-link--active" : "")
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/events"
              onClick={closeMobile}
              className={({ isActive }) =>
                "app-navbar__mobile-link" +
                (isActive ? " app-navbar__mobile-link--active" : "")
              }
            >
              Events
            </NavLink>
            <NavLink
              to="/about"
              onClick={closeMobile}
              className={({ isActive }) =>
                "app-navbar__mobile-link" +
                (isActive ? " app-navbar__mobile-link--active" : "")
              }
            >
              About
            </NavLink>
          </nav>

          <div className="app-navbar__actions app-navbar__actions--mobile">
            <Link
              to="/login"
              className="app-navbar__btn app-navbar__btn--ghost"
              onClick={closeMobile}
            >
              <MdPerson size={16} />
              <span>Login</span>
            </Link>
            <Link
              to="/register"
              className="app-navbar__btn app-navbar__btn--primary"
              onClick={closeMobile}
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
// src/components/layout/Navbar.jsx
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { MdMenu, MdClose } from "react-icons/md";
import "./Navbar.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen((prev) => !prev);
  const closeMenu = () => setOpen(false);

  return (
    <header className="nav-root">
      <div className="nav-inner">
        {/* Left: Logo / Brand */}
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          <span className="nav-logo__text">CampusHub</span>
        </Link>

        {/* Center: Menu (desktop) */}
        <nav className="nav-menu nav-menu--desktop">
          {/* <NavLink
            to="/"
            end
            className={({ isActive }) =>
              "nav-menu__link" + (isActive ? " nav-menu__link--active" : "")
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/student/events"
            className={({ isActive }) =>
              "nav-menu__link" + (isActive ? " nav-menu__link--active" : "")
            }
          >
            Events
          </NavLink>
          <NavLink
            to="/student/complaints"
            className={({ isActive }) =>
              "nav-menu__link" + (isActive ? " nav-menu__link--active" : "")
            }
          >
            Complaints
          </NavLink>
          <NavLink
            to="/student/resources"
            className={({ isActive }) =>
              "nav-menu__link" + (isActive ? " nav-menu__link--active" : "")
            }
          >
            Resources
          </NavLink> */}
        </nav>

        {/* Right: Auth buttons (desktop) */}
        <div className="nav-actions nav-actions--desktop">
          <Link to="/login" className="nav-btn nav-btn--ghost">
            Login
          </Link>
          <Link to="/register" className="nav-btn nav-btn--primary">
            Register
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="nav-toggle"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          {open ? <MdClose size={20} /> : <MdMenu size={20} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <div className={`nav-mobile ${open ? "nav-mobile--open" : ""}`}>
        <nav className="nav-menu nav-menu--mobile">
          <NavLink
            to="/"
            end
            onClick={closeMenu}
            className={({ isActive }) =>
              "nav-mobile__link" + (isActive ? " nav-mobile__link--active" : "")
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/student/events"
            onClick={closeMenu}
            className={({ isActive }) =>
              "nav-mobile__link" + (isActive ? " nav-mobile__link--active" : "")
            }
          >
            Events
          </NavLink>
          <NavLink
            to="/student/complaints"
            onClick={closeMenu}
            className={({ isActive }) =>
              "nav-mobile__link" + (isActive ? " nav-mobile__link--active" : "")
            }
          >
            Complaints
          </NavLink>
          <NavLink
            to="/student/resources"
            onClick={closeMenu}
            className={({ isActive }) =>
              "nav-mobile__link" + (isActive ? " nav-mobile__link--active" : "")
            }
          >
            Resources
          </NavLink>
        </nav>

        <div className="nav-actions nav-actions--mobile">
          <Link to="/login" className="nav-btn nav-btn--ghost" onClick={closeMenu}>
            Login
          </Link>
          <Link
            to="/register"
            className="nav-btn nav-btn--primary"
            onClick={closeMenu}
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
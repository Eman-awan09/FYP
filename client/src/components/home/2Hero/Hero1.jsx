// import React, { useEffect, useRef } from "react";
// import { Link } from "react-router-dom";

// import gsap from "gsap";
// import "./hero1.css";

// export default function Hero({ dark }) {
//   const heroRef = useRef(null);

//   useEffect(() => {
//     // simple fade/slide animation for hero elements
//     const el = heroRef.current;
//     gsap.fromTo(
//       el.querySelectorAll(".hero-fade"),
//       { opacity: 0, y: 40 },
//       { opacity: 1, y: 0, duration: 1.2, stagger: 0.2, ease: "power3.out" }
//     );
//   }, []);

//   return (
//     <section className="hero" id="hero" ref={heroRef}>
//       {/* <div className="hero-bg">
//         <img
//           src="https://cdn.prod.website-files.com/67f510f568bf33e1f98526f9/67fabdb67642747547da3329_Hero%20Big%20Blob%20Light.svg"
//           alt=""
//           className={`hero-blob ${dark ? "hide" : ""}`}
//         />
//         <img
//           src="https://cdn.prod.website-files.com/67f510f568bf33e1f98526f9/67fabdb80276e79ad6903e73_Hero%20Big%20Blob%20Dark.svg"
//           alt=""
//           className={`hero-blob ${dark ? "hide" : ""}`}
//         />
//       </div> */}

//       <div className="container hero-content">
//         <p className="text-tag hero-fade">
//           Brand Identity · Webflow Websites
//         </p>

//         <h1 className="hero-title hero-fade">
//           Become the <br />
//           obvious choice.
//         </h1>

//         <p className="hero-sub hero-fade">
//           Sharpen your positioning, look enterprise-ready, and ship a
//           high-converting website that sells.
//         </p>

//         <div className="hero-buttons hero-fade">
//           <Link to="/signin" className="button">
//             <img
//               src="https://cdn.prod.website-files.com/67f510f568bf33e1f98526f9/682d9cd22525fd261591d5cd_Jordan%20Button.avif"
//               alt="Jordan avatar"
//               className="btn-avatar"
//             />
//             <div className="btn-text">
//               <span>Sign In</span>
//               <small>Friendly chat, no pressure</small>
//             </div>
//           </Link>
//           <Link to="/signup" className="button ghost">Sign Up</Link>
//         </div>

//         <p className="hero-note hero-fade">
//           First impressions are everything. Let’s get yours right.
//         </p>

//         <div className="hero-divider hero-fade">
//           <span></span>
//           <p>for Funded Startups + B2B Tech</p>
//           <span></span>
//         </div>
//       </div>
//     </section>
//   );
// }
// src/components/hero/Hero.jsx
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import {
  MdInfo,
  MdReportProblem,
  MdInventory2,
  MdEvent,
} from "react-icons/md";
import "./hero1.css";

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    gsap.fromTo(
      el.querySelectorAll(".hero-fade"),
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2, stagger: 0.2, ease: "power3.out" }
    );
  }, []);

  return (
    <section className="hero-landing" id="hero" ref={heroRef}>
      <div className="hero-landing__bg" />

      <div className="hero-landing__container">
        {/* LEFT: Text + CTA */}
        <div className="hero-landing__left">
          <div className="hero-landing__badge-row hero-fade">
            <span className="hero-badge">
              <MdInfo size={14} />
              <span>Campus Digital Desk</span>
            </span>
            <span className="hero-badge hero-badge--outline">
              Built for Students · Faculty · Admin
            </span>
          </div>

          <p className="hero-landing__tag hero-fade">
            Campus Information · Complaints · Resources
          </p>

          <h1 className="hero-landing__title hero-fade">
            One platform to
            <br />
            simplify campus life.
          </h1>

          <p className="hero-landing__subtitle hero-fade">
            Check campus updates, submit and track complaints, explore events
            and access department resources — all from a single, secure
            dashboard.
          </p>

          <div className="hero-landing__actions hero-fade">
            <Link to="/login" className="hero-btn hero-btn--primary">
              <div className="hero-btn__avatar">
                <span>CI</span>
              </div>
              <div className="hero-btn__text">
                <span>Login</span>
                <small>Continue to your campus dashboard</small>
              </div>
            </Link>

            <Link to="/register" className="hero-btn hero-btn--ghost">
              Create an account
            </Link>
          </div>

          <div className="hero-landing__metrics hero-fade">
            <div className="hero-metric">
              <span className="hero-metric__value">3</span>
              <span className="hero-metric__label">Core modules</span>
            </div>
            <div className="hero-metric">
              <span className="hero-metric__value">24/7</span>
              <span className="hero-metric__label">Complaint logging</span>
            </div>
            <div className="hero-metric">
              <span className="hero-metric__value">1</span>
              <span className="hero-metric__label">Unified campus desk</span>
            </div>
          </div>

          <p className="hero-landing__note hero-fade">
            Transparent communication. Faster resolutions. A smarter campus
            experience.
          </p>
        </div>

        {/* RIGHT: Feature cards */}
        <div className="hero-landing__right hero-fade">
          <div className="hero-landing__card-grid">
            <article className="hero-card">
              <div className="hero-card__icon hero-card__icon--info">
                <MdInfo size={18} />
              </div>
              <h2>Campus Info</h2>
              <p>
                Centralized announcements, academic calendar, and departmental
                notices so everyone stays aligned.
              </p>
            </article>

            <article className="hero-card">
              <div className="hero-card__icon hero-card__icon--complaints">
                <MdReportProblem size={18} />
              </div>
              <h2>Complaints</h2>
              <p>
                Submit issues for classrooms, labs, hostels &amp; IT and track
                their status from pending to resolved.
              </p>
            </article>

            <article className="hero-card">
              <div className="hero-card__icon hero-card__icon--resources">
                <MdInventory2 size={18} />
              </div>
              <h2>Resource Desk</h2>
              <p>
                Access notes, forms, previous papers and department resources in
                one organized place.
              </p>
            </article>

            <article className="hero-card">
              <div className="hero-card__icon hero-card__icon--events">
                <MdEvent size={18} />
              </div>
              <h2>Events & Assistant</h2>
              <p>
                View upcoming events and ask the academic assistant about
                schedules, enrollment, and ERP.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
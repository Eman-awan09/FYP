// import React, { useEffect, useRef } from "react";
// import {
//   FaApple,
//   FaGoogle,
//   FaMicrosoft,
//   FaAmazon,
//   FaFacebook,
//   FaTwitter,
// } from "react-icons/fa";
// import gsap from "gsap";
// import "./Iconbar.css";

// export default function IconBar() {
//   const barRef = useRef(null);

//   useEffect(() => {
//     const el = barRef.current;
//     gsap.fromTo(
//       el.querySelectorAll(".icon-item"),
//       { opacity: 0, y: 20 },
//       { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "power3.out" }
//     );
//   }, []);

//   return (
//     <section className="iconbar" ref={barRef}>
//       <div className="icon-item"><FaApple /></div>
//       <div className="divider"></div>
//       <div className="icon-item"><FaGoogle /></div>
//       <div className="divider"></div>
//       <div className="icon-item"><FaMicrosoft /></div>
//       <div className="divider"></div>
//       <div className="icon-item"><FaAmazon /></div>
//       <div className="divider"></div>
//       <div className="icon-item"><FaFacebook /></div>
//       <div className="divider"></div>
//       <div className="icon-item"><FaTwitter /></div>
//     </section>
//   );
// }

// src/components/IconBar/IconBar.jsx
import React, { useEffect, useRef } from "react";
import {
  MdSchool,
  MdReportProblem,
  MdInventory2,
  MdEventAvailable,
  MdSmartToy,
  MdSecurity,
} from "react-icons/md";
import gsap from "gsap";
import "./Iconbar.css";

export default function IconBar() {
  const barRef = useRef(null);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;

    const items = el.querySelectorAll(".iconbar__item");
    gsap.fromTo(
      items,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: "power3.out" }
    );
  }, []);

  return (
    <section className="iconbar" ref={barRef}>
      <div className="iconbar__inner">
        <p className="iconbar__label">
          A unified platform for campus services
        </p>

        <div className="iconbar__stack">
          <div className="iconbar__item iconbar__item--info">
            <MdSchool />
            <span>Campus Info</span>
          </div>

          <span className="iconbar__divider" />

          <div className="iconbar__item iconbar__item--complaints">
            <MdReportProblem />
            <span>Complaints</span>
          </div>

          <span className="iconbar__divider" />

          <div className="iconbar__item iconbar__item--resources">
            <MdInventory2 />
            <span>Resource Desk</span>
          </div>

          <span className="iconbar__divider" />

          <div className="iconbar__item iconbar__item--events">
            <MdEventAvailable />
            <span>Events</span>
          </div>

          <span className="iconbar__divider" />

          <div className="iconbar__item iconbar__item--assistant">
            <MdSmartToy />
            <span>Academic Assistant</span>
          </div>

          <span className="iconbar__divider" />

          <div className="iconbar__item iconbar__item--security">
            <MdSecurity />
            <span>Secure Access</span>
          </div>
        </div>
      </div>
    </section>
  );
}
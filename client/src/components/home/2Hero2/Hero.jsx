// // src/components/hero/Hero.jsx
// import React, { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import "./Hero.css";

// gsap.registerPlugin(ScrollTrigger);

// const Hero = () => {
//   const heroRef = useRef(null);
//   const headlineRef = useRef(null);
//   const subtextRef = useRef(null);

//   useEffect(() => {
//     const heroEl = heroRef.current;

//     // Initial fade/slide-in
//     gsap.fromTo(
//       heroEl.querySelectorAll(".hero-fade"),
//       { opacity: 1, y: 40 },
//       {
//         opacity: 0,
//         y: 0,
//         duration: 1.2,
//         stagger: 0.2,
//         ease: "power3.out",
//       }
//     );

//     // Scroll animation: upper (headline) moves left, lower (subtext) moves right
//     gsap.to(headlineRef.current, {
//       x: -80,
//       opacity: 0.7,
//       scrollTrigger: {
//         trigger: heroEl,
//         start: "top top",
//         end: "bottom top",
//         scrub: true,
//       },
//     });

//     gsap.to(subtextRef.current, {
//       x: 80,
//       opacity: 0.7,
//       scrollTrigger: {
//         trigger: heroEl,
//         start: "top top",
//         end: "bottom top",
//         scrub: true,
//       },
//     });
//   }, []);

//   return (
//     <section className="hero-shell">
//       {/* Background video/image */}
//       <div className="hero-bg">
//         {/* Replace this image with your real campus photo or background video */}
//         <img
//           src="https://images.pexels.com/photos/3861964/pexels-photo-3861964.jpeg?auto=compress&cs=tinysrgb&w=1600"
//           alt="Campus and students working"
//           className="hero-bg__image"
//         />
//         <div className="hero-bg__overlay" />
//       </div>

//       <div className="hero-content" ref={heroRef}>
//         <div className="hero-text-wrapper">
//           <h1 ref={headlineRef} className="hero-title hero-fade">
//             One platform for a smarter campus.
//           </h1>

//           <p ref={subtextRef} className="hero-sub hero-fade">
//             Access campus information, submit and track complaints, explore
//             events and resources, and use the academic assistant — all from a
//             unified CampusHub dashboard.
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;

// src/components/hero/Hero.jsx
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Hero.css";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const subtextRef = useRef(null);

  useEffect(() => {
    const heroEl = heroRef.current;

    // Initial fade/slide-in
    gsap.fromTo(
      heroEl.querySelectorAll(".hero-fade"),
      { opacity: 1, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
      }
    );

    // Scroll animation: upper (headline) moves left, lower (subtext+buttons) moves right
    gsap.to(headlineRef.current, {
      x: -90,
      opacity: 0.7,
      scrollTrigger: {
        trigger: heroEl,
        start: "top top",
        end: "bottom top",
        scrub: 3,
      },
    });

    gsap.to(subtextRef.current, {
      x: 90,
      opacity: 0.7,
      scrollTrigger: {
        trigger: heroEl,
        start: "top top",
        end: "bottom top",
        scrub: 3,
      },
    });
  }, []);

  return (
    <section className="hero-shell">
      {/* Background image/video */}
      <div className="hero-bg">
        <img
          src="herosection.png"
          alt="Students collaborating on campus"
          className="hero-bg__image"
        />
        <div className="hero-bg__overlay" />
      </div>

      <div className="hero-content" ref={heroRef}>
        <div className="hero-text-wrapper">
          <h1 ref={headlineRef} className="hero-title  hero-fade">
            Complaints Become Solutions
          </h1>
          <h1 ref={subtextRef} className="hero-title hero-fade">
            Information Becomes Action.
          </h1>

          <div className="hero-lower hero-fade">
            <p className="hero-sub">
              Access campus information, submit and track complaints, explore
              events and resources, and use the academic assistant — all from a
              unified CampusHub dashboard.
            </p>

            <div className="hero-actions">
              <Link to="/login" className="hero-btn hero-btn--primary">
                Login
              </Link>
              <Link to="/register" className="hero-btn hero-btn--ghost">
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
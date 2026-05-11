// import React, { useEffect, useRef } from "react";
// import "./TextRevealSection.css";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const TextRevealSection = () => {
//   const textRef = useRef(null);

//   useEffect(() => {
//     const letters = textRef.current.querySelectorAll(".reveal-letter");

//     gsap.fromTo(
//       letters,
//       { opacity: 0.2, filter: "blur(6px)" },
//       {
//         opacity: 1,
//         filter: "blur(0px)",
//         stagger: 0.03,
//         duration: 1,
//         scrollTrigger: {
//           trigger: textRef.current,
//           start: "top 85%",
//           end: "bottom 60%",
//           scrub: true,
//         },
//       }
//     );
//   }, []);

//   const text =
//   "A centralized digital platform for campus information, complaint management, and resource support. We connect students, faculty, and administration to ensure transparency, faster resolutions, and a smarter campus experience.";

//   return (
//     <section className="text-reveal-container">
//       {/* Light/Dark Icon */}
//       <div className="reveal-icon">
//         <img
//           src="https://cdn.prod.website-files.com/67f510f568bf33e1f98526f9/6846d159bd3193edd4487807_t-reveal-light.avif"
//           alt="Reveal Icon Light"
//           className="light-icon"
//         />
//         <img
//           src="https://cdn.prod.website-files.com/67f510f568bf33e1f98526f9/6846d15970c5ea6d8788d1ad_t-reveal-dark.avif"
//           alt="Reveal Icon Dark"
//           className="dark-icon"
//         />
//       </div>

//       {/* Tagline */}
//       {/* <div className="reveal-tagline">Your unfair advantage</div> */}
//       <div className="reveal-tagline">A smarter way to manage campus life</div>


//       {/* Animated Text */}
//       <p className="reveal-text" ref={textRef}>
//         {text.split("").map((char, index) => (
//           <span
//             key={index}
//             className={`reveal-letter ${
//               char === " " ? "space" : ""
//             }`}
//           >
//             {char}
//           </span>
//         ))}
//       </p>
//     </section>
//   );
// };

// export default TextRevealSection;
import React, { useEffect, useRef } from "react";
import "./TextRevealSection.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TextRevealSection = () => {
  const textRef = useRef(null);

  useEffect(() => {
    const letters = textRef.current.querySelectorAll(".reveal-letter");

    gsap.fromTo(
      letters,
      { opacity: 0.2, filter: "blur(6px)" },
      {
        opacity: 1,
        filter: "blur(0px)",
        stagger: 0.03,
        duration: 1,
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 85%",
          end: "bottom 60%",
          scrub: true,
        },
      }
    );
  }, []);

  const text =
    "A centralized digital platform for campus information, complaint management, and resource support. We connect students, faculty, and administration to ensure transparency, faster resolutions, and a smarter campus experience.";

  return (
    <section className="text-reveal-container">
      {/* Light/Dark Icon */}
      <div className="reveal-icon">
        <img
          src="https://cdn.prod.website-files.com/67f510f568bf33e1f98526f9/6846d159bd3193edd4487807_t-reveal-light.avif"
          alt="Reveal Icon Light"
          className="light-icon"
        />
        <img
          src="https://cdn.prod.website-files.com/67f510f568bf33e1f98526f9/6846d15970c5ea6d8788d1ad_t-reveal-dark.avif"
          alt="Reveal Icon Dark"
          className="dark-icon"
        />
      </div>

      {/* Tagline */}
      <div className="reveal-tagline">A smarter way to manage campus life</div>

      {/* Animated Text */}
      <p className="reveal-text" ref={textRef}>
        {text.split("").map((char, index) => (
          <span
            key={index}
            className={`reveal-letter ${char === " " ? "space" : ""}`}
          >
            {char}
          </span>
        ))}
      </p>
    </section>
  );
};

export default TextRevealSection;
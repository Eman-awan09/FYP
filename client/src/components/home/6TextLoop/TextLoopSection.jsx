// import React, { useEffect, useRef, useState } from "react";
// import "./TextLoopSection.css";
// import { gsap } from "gsap";

// const phrases = [
//   "Centralized system.",
//   "Student-focused design.",
//   "Admin-controlled workflow.",
//   "Transparent complaint handling.",
//   "Smart campus management."
// ];


// const TextLoopSection = () => {
//   const textRef = useRef(null);
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       // fade out
//       gsap.to(textRef.current, {
//         opacity: 0,
//         duration: 0.5,
//         ease: "power1.inOut",
//         onComplete: () => {
//           setIndex((prev) => (prev + 1) % phrases.length);
//           // fade in after text change
//           gsap.to(textRef.current, { opacity: 1, duration: 0.5, ease: "power1.inOut" });
//         },
//       });
//     }, 3000); // change every 3 seconds

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section className="textchange-section">
//       <div className="bento-icon">
//         <img
//           src="https://cdn.prod.website-files.com/67f510f568bf33e1f98526f9/68480ae500d972de944635ea_bento-light.avif"
//           alt="Bento Light"
//           className="light-icon"
//         />
//         <img
//           src="https://cdn.prod.website-files.com/67f510f568bf33e1f98526f9/68480ae55d79b0b3d6cfda79_bento-dark.avif"
//           alt="Bento Dark"
//           className="dark-icon"
//         />
//       </div>

//       {/* <p className="loop-subtitle">
//         We don’t just deliver.<br />We build like it’s our own.
//       </p> */}
//       <p className="loop-subtitle">
//         We don’t just manage data.<br />We improve campus life.
//       </p>


//       <div className="text-container">
//         <h2 ref={textRef} className="changing-text">
//           {phrases[index]}
//         </h2>

//         {/* glowing frame decoration */}
//         <div className="glow-frame">
//           <div className="corner top-left"></div>
//           <div className="corner top-right"></div>
//           <div className="corner bottom-right"></div>
//           <div className="corner bottom-left"></div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TextLoopSection;

import React, { useEffect, useRef, useState } from "react";
import "./TextLoopSection.css";
import { gsap } from "gsap";

const phrases = [
  "Centralized system.",
  "Student-focused design.",
  "Admin-controlled workflow.",
  "Transparent complaint handling.",
  "Smart campus management.",
];

const TextLoopSection = () => {
  const textRef = useRef(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // fade out
      gsap.to(textRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power1.inOut",
        onComplete: () => {
          setIndex((prev) => (prev + 1) % phrases.length);
          // fade in after text change
          gsap.to(textRef.current, {
            opacity: 1,
            duration: 0.5,
            ease: "power1.inOut",
          });
        },
      });
    }, 3000); // change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="textchange-section">
      <div className="bento-icon">
        <img
          src="https://cdn.prod.website-files.com/67f510f568bf33e1f98526f9/68480ae500d972de944635ea_bento-light.avif"
          alt="Bento Light"
          className="light-icon"
        />
        <img
          src="https://cdn.prod.website-files.com/67f510f568bf33e1f98526f9/68480ae55d79b0b3d6cfda79_bento-dark.avif"
          alt="Bento Dark"
          className="dark-icon"
        />
      </div>

      <p className="loop-subtitle">
        We don’t just manage data.
        <br />
        We improve campus life.
      </p>

      <div className="text-container">
        <h2 ref={textRef} className="changing-text">
          {phrases[index]}
        </h2>

        {/* glowing frame decoration */}
        <div className="glow-frame">
          <div className="corner top-left"></div>
          <div className="corner top-right"></div>
          <div className="corner bottom-right"></div>
          <div className="corner bottom-left"></div>
        </div>
      </div>
    </section>
  );
};

export default TextLoopSection;
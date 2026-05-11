// import React, { useEffect, useRef } from "react";
// import gsap from "gsap";
// import "./SlidePanel.css";

// export default function SlidePanel({ total = 7, active = 0, onChange }) {
//   const panelRef = useRef(null);

//   useEffect(() => {
//     const dots = panelRef.current.querySelectorAll(".slide-dot");
//     gsap.fromTo(
//       dots,
//       { opacity: 0, y: 10 },
//       { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: "power2.out" }
//     );
//   }, []);

//   return (
//     <div className="slide-panel" ref={panelRef}>
//       {Array.from({ length: total }).map((_, i) => (
//         <button
//           key={i}
//           aria-label={`Go to slide ${i + 1}`}
//           aria-current={active === i ? "true" : "false"}
//           className={`slide-dot ${active === i ? "active" : ""}`}
//           onClick={() => onChange(i)}
//         />
//       ))}
//     </div>
//   );
// }
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "./SlidePanel.css";

export default function SlidePanel({ total = 7, active = 0, onChange }) {
  const panelRef = useRef(null);

  useEffect(() => {
    const dots = panelRef.current.querySelectorAll(".slide-dot");
    gsap.fromTo(
      dots,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: "power2.out" }
    );
  }, []);

  return (
    <div className="slide-panel" ref={panelRef}>
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          aria-label={`Go to slide ${i + 1}`}
          aria-current={active === i ? "true" : "false"}
          className={`slide-dot ${active === i ? "active" : ""}`}
          onClick={() => onChange(i)}
        />
      ))}
    </div>
  );
}
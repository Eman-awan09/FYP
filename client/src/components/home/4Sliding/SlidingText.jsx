import React, { useEffect, useRef } from "react";
import "./SlidingText.css";
import { gsap } from "gsap";

// const phrases = [
//   "Stand tall",
//   "Resonate with customers",
//   "Be an ‘A’ player",
//   "Attract top talent",
//   "Secure funding",
//   "Impress investors",
//   "Earn credibility",
//   "Stand out in a crowded market",
//   "Look like a proper startup",
//   "Launch with pride",
//   "Stop Settling. Start Scaling",
//   "Go from zero to hero",
// ];

const phrases = [
  "Centralized Campus Information",
  "Report Issues Easily",
  "Track Complaint Status",
  "Connect Students & Administration",
  "Quick Issue Resolution",
  "Transparent Communication",
  "Access Campus Resources",
  "Smart Complaint Management",
  "Improved Campus Experience",
  "Efficient Resource Desk",
  "Digital Campus Support System",
  "Building a Smarter Campus",
];


const SlidingText = () => {
  const marqueeRef = useRef(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    const totalWidth = marquee.scrollWidth / 3; // total width of one track
    const duration = 30; // adjust speed (smaller = faster)

    gsap.to(marquee, {
      x: `-${totalWidth}px`,
      ease: "none",
      duration: duration,
      repeat: -1, // infinite loop
    });
  }, []);

  return (
    <div className="sliding-text-container">
      <div className="sliding-track" ref={marqueeRef}>
        {/* Duplicate text sets for seamless looping */}
        {[...Array(3)].map((_, i) => (
          <div className="sliding-group" key={i}>
            {phrases.map((text, idx) => (
              <span key={`${i}-${idx}`} className="sliding-item">
                {text}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlidingText;

import React, { useRef, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import gsap from "gsap";
import "./SlideControls.css";

export default function SlideControls({ onPrev, onNext }) {
  const controlsRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      controlsRef.current.querySelectorAll("button"),
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.15, ease: "power2.out" }
    );
  }, []);

  return (
    <div className="slide-controls" ref={controlsRef}>
      <button
        className="slide-btn prev-btn"
        aria-label="Previous slide"
        onClick={onPrev}
      >
        <FaChevronLeft />
      </button>

      <button
        className="slide-btn next-btn"
        aria-label="Next slide"
        onClick={onNext}
      >
        <FaChevronRight />
      </button>
    </div>
  );
}

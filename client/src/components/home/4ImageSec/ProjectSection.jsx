import React, { useState, useEffect } from "react";
import ProjectGallery from "./ProjectGallery";
import SlidePanel from "./SlidePanel";
import SlideControls from "./SlideControls";
import gsap from "gsap";

export default function ProjectSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = 7;

  // Handle previous / next button actions
  const handlePrev = () => {
    setActiveSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  // Animate gallery transitions with GSAP
  useEffect(() => {
    gsap.fromTo(
      ".project-card.active",
      { opacity: 0, scale: 0.95, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
  }, [activeSlide]);

  return (
    <section className="project-section-wrapper">
      <ProjectGallery active={activeSlide} />
      <SlidePanel
        total={totalSlides}
        active={activeSlide}
        onChange={setActiveSlide}
      />
      <SlideControls onPrev={handlePrev} onNext={handleNext} />
    </section>
  );
}

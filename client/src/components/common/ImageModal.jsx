// src/components/common/ImageModal.jsx
import React from "react";

/**
 * Image modal with strict viewport-based sizing.
 * - Overlay covers full viewport (100vw x 100vh)
 * - Image is constrained by max 90% width and 80% height of viewport
 * - Always fully visible, scaled with object-fit: contain
 */
const ImageModal = ({ isOpen, onClose, src, alt }) => {
  if (!isOpen || !src) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: "relative",
          // no fixed width/height here; we let the image define the size
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            right: "-8px",
            top: "-32px",
            background: "#0c0c0cff",
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "4px 8px",
            cursor: "pointer",
            fontSize: "12px",
          }}
        >
          Close
        </button>

        <img
          src={src}
          alt={alt || "Attachment"}
          style={{
            maxWidth: "90vw",  // 90% of viewport width
            maxHeight: "80vh", // 80% of viewport height (keeps some top/bottom margin)
            objectFit: "contain",
            borderRadius: "4px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
            backgroundColor: "#fff",
          }}
        />
      </div>
    </div>
  );
};

export default ImageModal;
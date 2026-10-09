import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X, ZoomIn, ZoomOut, ArrowLeft, ArrowRight, ArrowUpRight, Layers } from "lucide-react";
import { sound } from "../utils/sound";

export default function ArtworkModal({ artwork, onClose, onPrev, onNext }) {
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    setZoomLevel(1);
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && onPrev) onPrev();
      if (e.key === "ArrowRight" && onNext) onNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [artwork, onClose, onPrev, onNext]);

  if (!artwork) return null;

  const handleZoomIn = () => setZoomLevel((z) => Math.min(z + 0.35, 2.5));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(z - 0.35, 1));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(10, 10, 11, 0.92)",
        backdropFilter: "blur(10px)",
        zIndex: 1100,
        display: "flex",
        flexDirection: "column",
        color: "#F5F2EB"
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Top Bar Controls */}
      <div
        style={{
          padding: "1rem 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          backgroundColor: "rgba(13, 13, 14, 0.7)"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.45rem",
                color: "#F5F2EB",
                lineHeight: 1.2
              }}
            >
              {artwork.title}
            </h2>
            <div style={{ display: "flex", gap: "0.6rem", fontSize: "0.8rem", color: "var(--silver-graphite)" }}>
              <span>{artwork.year}</span>
              <span>•</span>
              <span>{artwork.medium}</span>
              <span>•</span>
              <span style={{ color: "var(--lavender-accent)" }}>{artwork.software}</span>
            </div>
          </div>
        </div>

        {/* Zoom & Navigation Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.25rem",
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              borderRadius: "4px",
              padding: "0.2rem 0.4rem"
            }}
          >
            <button
              onClick={handleZoomOut}
              disabled={zoomLevel <= 1}
              style={{
                background: "none",
                border: "none",
                color: zoomLevel <= 1 ? "rgba(255, 255, 255, 0.3)" : "#FFF",
                cursor: zoomLevel <= 1 ? "default" : "pointer",
                padding: "0.3rem"
              }}
              title="Zoom out"
            >
              <ZoomOut size={16} />
            </button>
            <span
              onClick={handleResetZoom}
              style={{
                fontSize: "0.75rem",
                fontFamily: "var(--font-mono)",
                padding: "0 0.3rem",
                cursor: "pointer",
                color: "var(--lavender-soft)"
              }}
              title="Click to reset zoom"
            >
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              disabled={zoomLevel >= 2.5}
              style={{
                background: "none",
                border: "none",
                color: zoomLevel >= 2.5 ? "rgba(255, 255, 255, 0.3)" : "#FFF",
                cursor: zoomLevel >= 2.5 ? "default" : "pointer",
                padding: "0.3rem"
              }}
              title="Zoom in"
            >
              <ZoomIn size={16} />
            </button>
          </div>

          <Link
            to={`/artwork/${artwork.slug}`}
            onClick={() => {
              sound.playPageTurn();
              onClose();
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.45rem 0.85rem",
              backgroundColor: "var(--lavender-accent)",
              color: "#1A1918",
              textDecoration: "none",
              borderRadius: "4px",
              fontSize: "0.82rem",
              fontWeight: 600
            }}
          >
            <span>Full Story</span>
            <ArrowUpRight size={14} />
          </Link>

          <button
            onClick={() => {
              sound.playPencilClick();
              onClose();
            }}
            style={{
              background: "none",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "#FFF",
              borderRadius: "4px",
              padding: "0.45rem",
              cursor: "pointer"
            }}
            aria-label="Close viewer"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Center Image Display Area */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "auto",
          padding: "1.5rem"
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        {/* Previous Button */}
        {onPrev && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              sound.playPageTurn();
              onPrev();
            }}
            style={{
              position: "fixed",
              left: "1.5rem",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              backgroundColor: "rgba(20, 20, 22, 0.8)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              color: "#FFF",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
            aria-label="Previous artwork"
          >
            <ArrowLeft size={20} />
          </button>
        )}

        {/* The Artwork */}
        <div
          style={{
            transform: `scale(${zoomLevel})`,
            transition: "transform 0.25s ease-out",
            transformOrigin: "center center",
            maxWidth: "92vw",
            maxHeight: "82vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <img
            src={artwork.image}
            alt={artwork.title}
            style={{
              maxWidth: "100%",
              maxHeight: "80vh",
              objectFit: "contain",
              borderRadius: "4px",
              boxShadow: "0 24px 64px rgba(0, 0, 0, 0.9)"
            }}
          />
        </div>

        {/* Next Button */}
        {onNext && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              sound.playPageTurn();
              onNext();
            }}
            style={{
              position: "fixed",
              right: "1.5rem",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              backgroundColor: "rgba(20, 20, 22, 0.8)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              color: "#FFF",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
            aria-label="Next artwork"
          >
            <ArrowRight size={20} />
          </button>
        )}
      </div>

      {/* Bottom Information Drawer */}
      <div
        style={{
          padding: "0.85rem 1.5rem",
          backgroundColor: "rgba(13, 13, 14, 0.85)",
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          fontSize: "0.82rem",
          color: "var(--silver-graphite)"
        }}
      >
        <div style={{ maxWidth: "600px", lineHeight: 1.4 }}>
          {artwork.shortDescription}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", fontFamily: "var(--font-mono)" }}>
          <span>Canvas: {artwork.dimensions}</span>
          <span>Res: {artwork.resolution}</span>
        </div>
      </div>
    </div>
  );
}

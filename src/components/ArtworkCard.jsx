import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Maximize2, ArrowUpRight, Sparkles } from "lucide-react";
import { sound } from "../utils/sound";

export default function ArtworkCard({ artwork, onQuickView }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleCardClick = () => {
    sound.playPencilClick();
  };

  return (
    <div
      style={{
        position: "relative",
        borderRadius: "6px",
        overflow: "hidden",
        backgroundColor: "var(--bg-card)",
        border: "1px solid var(--border-color)",
        boxShadow: isHovered ? "var(--card-shadow-hover)" : "var(--card-shadow)",
        transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
        transform: isHovered ? "translateY(-4px)" : "none",
        breakInside: "avoid",
        marginBottom: "1.75rem"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Corner washi tape for featured pieces */}
      {artwork.featured && (
        <div
          className="washi-tape"
          style={{
            top: "-8px",
            right: "12px",
            height: "14px",
            width: "50px",
            fontSize: "0.65rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-mono)",
            color: "var(--graphite)"
          }}
        >
          FEATURED
        </div>
      )}

      {/* Artwork Image Container - Preserving Aspect Ratio */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          backgroundColor: "var(--bg-subtle)"
        }}
      >
        <img
          src={artwork.thumbnail || artwork.image}
          alt={artwork.title}
          loading="lazy"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
            transform: isHovered ? "scale(1.025)" : "scale(1)"
          }}
        />

        {/* Hover Quick Overlay Actions */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(13, 13, 14, 0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.75rem",
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.25s ease",
            backdropFilter: "blur(2px)"
          }}
        >
          {onQuickView && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                sound.playPencilClick();
                onQuickView(artwork);
              }}
              title="Quick inspect artwork"
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                backgroundColor: "var(--bg-card)",
                border: "1px solid var(--border-color)",
                color: "var(--text-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "transform 0.2s ease"
              }}
            >
              <Maximize2 size={16} />
            </button>
          )}

          <Link
            to={`/artwork/${artwork.slug}`}
            onClick={handleCardClick}
            title="Read full story & notes"
            style={{
              height: "42px",
              padding: "0 1.1rem",
              borderRadius: "999px",
              backgroundColor: "var(--lavender-accent)",
              color: "#1A1918",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              fontSize: "0.85rem",
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            <span>Story & Details</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>

      {/* Artwork Metadata Caption */}
      <div
        style={{
          padding: "1.1rem 1.25rem 1.25rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.4rem"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "0.5rem" }}>
          <Link
            to={`/artwork/${artwork.slug}`}
            onClick={handleCardClick}
            style={{
              textDecoration: "none",
              color: "inherit"
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.28rem",
                fontWeight: 600,
                color: "var(--text-primary)",
                transition: "color 0.2s ease"
              }}
              className="pencil-underline"
            >
              {artwork.title}
            </h3>
          </Link>

          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              color: "var(--silver-graphite)",
              whiteSpace: "nowrap"
            }}
          >
            {artwork.year}
          </span>
        </div>

        <p
          style={{
            fontSize: "0.86rem",
            color: "var(--text-secondary)",
            lineHeight: 1.5,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden"
          }}
        >
          {artwork.shortDescription}
        </p>

        {/* Categories & Tool Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "0.5rem",
            paddingTop: "0.6rem",
            borderTop: "1px dashed var(--border-faint)",
            fontSize: "0.76rem"
          }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
            {artwork.categories.slice(0, 2).map((cat) => (
              <span
                key={cat}
                style={{
                  fontFamily: "var(--font-hand)",
                  fontSize: "0.95rem",
                  color: "var(--lavender-accent)"
                }}
              >
                #{cat}
              </span>
            ))}
          </div>

          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              color: "var(--text-muted)",
              letterSpacing: "0.05em"
            }}
          >
            {artwork.software}
          </span>
        </div>
      </div>
    </div>
  );
}

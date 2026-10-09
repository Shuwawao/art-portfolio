import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ARTWORKS } from "../data/artworks";
import { sound } from "../utils/sound";
import { ArrowLeft, ArrowRight, Maximize2, Sparkles, Layers, Palette, Calendar, PenTool } from "lucide-react";
import ArtworkModal from "../components/ArtworkModal";

export default function ArtworkDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  // Find artwork by id or slug
  const currentIndex = ARTWORKS.findIndex((a) => a.id === id || a.slug === id);
  const artwork = currentIndex >= 0 ? ARTWORKS[currentIndex] : ARTWORKS[0];

  const prevArtwork = ARTWORKS[(currentIndex - 1 + ARTWORKS.length) % ARTWORKS.length];
  const nextArtwork = ARTWORKS[(currentIndex + 1) % ARTWORKS.length];

  // Scroll to top on navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (!artwork) {
    return (
      <div style={{ padding: "6rem 2rem", textAlign: "center" }}>
        <h2>Artwork Not Found</h2>
        <Link to="/gallery" className="btn-primary" style={{ marginTop: "1rem" }}>
          Return to Gallery
        </Link>
      </div>
    );
  }

  return (
    <div className="artwork-detail-page" style={{ maxWidth: "1320px", margin: "0 auto", padding: "2.5rem 1.5rem 6rem" }}>
      {/* Top Breadcrumb & Next/Prev Navigation */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "2.5rem",
          paddingBottom: "1rem",
          borderBottom: "1px solid var(--border-color)"
        }}
      >
        <Link
          to="/gallery"
          onClick={() => sound.playPageTurn()}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            textDecoration: "none",
            color: "var(--text-secondary)",
            fontSize: "0.88rem",
            fontWeight: 500
          }}
          className="pencil-underline"
        >
          <ArrowLeft size={16} />
          <span>Return to Gallery Archive</span>
        </Link>

        {/* Previous / Next Switcher */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Link
            to={`/artwork/${prevArtwork.slug}`}
            onClick={() => sound.playPageTurn()}
            title={`Previous: ${prevArtwork.title}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              textDecoration: "none",
              color: "var(--text-muted)",
              fontSize: "0.82rem",
              padding: "0.35rem 0.65rem",
              borderRadius: "4px",
              border: "1px solid var(--border-color)",
              backgroundColor: "var(--bg-card)"
            }}
          >
            <ArrowLeft size={13} />
            <span style={{ display: "none" }} className="nav-label-desktop">Previous</span>
          </Link>

          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "var(--silver-graphite)" }}>
            {currentIndex + 1} of {ARTWORKS.length}
          </span>

          <Link
            to={`/artwork/${nextArtwork.slug}`}
            onClick={() => sound.playPageTurn()}
            title={`Next: ${nextArtwork.title}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              textDecoration: "none",
              color: "var(--text-muted)",
              fontSize: "0.82rem",
              padding: "0.35rem 0.65rem",
              borderRadius: "4px",
              border: "1px solid var(--border-color)",
              backgroundColor: "var(--bg-card)"
            }}
          >
            <span style={{ display: "none" }} className="nav-label-desktop">Next</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>

      {/* Main Exhibition Layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
          gap: "3.5rem",
          alignItems: "start",
          marginBottom: "5rem"
        }}
      >
        {/* Left Column: Distraction-free Large Artwork Presentation */}
        <div>
          <div
            style={{
              position: "relative",
              borderRadius: "8px",
              overflow: "hidden",
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border-color)",
              boxShadow: "var(--card-shadow-hover)",
              padding: "1rem"
            }}
          >
            {/* Washi Tape Accent */}
            <div
              className="washi-tape"
              style={{
                top: "-10px",
                right: "30px",
                width: "70px",
                height: "16px"
              }}
            />

            <div
              style={{
                position: "relative",
                backgroundColor: "var(--bg-subtle)",
                borderRadius: "4px",
                overflow: "hidden",
                cursor: "pointer"
              }}
              onClick={() => {
                sound.playPencilClick();
                setIsZoomOpen(true);
              }}
            >
              <img
                src={artwork.image}
                alt={artwork.title}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  aspectRatio: artwork.aspectRatio
                }}
              />

              {/* Zoom pill overlay */}
              <div
                style={{
                  position: "absolute",
                  bottom: "1rem",
                  right: "1rem",
                  backgroundColor: "rgba(13, 13, 14, 0.75)",
                  backdropFilter: "blur(4px)",
                  borderRadius: "4px",
                  padding: "0.4rem 0.75rem",
                  color: "#FFF",
                  fontSize: "0.78rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem"
                }}
              >
                <Maximize2 size={13} color="var(--lavender-accent)" />
                <span>Click to inspect high-res</span>
              </div>
            </div>

            {/* Subtle Marginalia Annotation under artwork */}
            <div
              style={{
                marginTop: "1rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "0.8rem",
                color: "var(--text-muted)",
                fontFamily: "var(--font-mono)"
              }}
            >
              <span>Original Canvas: {artwork.dimensions}</span>
              <span>Software: {artwork.software} ({artwork.resolution})</span>
            </div>
          </div>
        </div>

        {/* Right Column: Title, Commentary, Story & Specs */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {/* Header Title & Subtitle */}
          <div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "0.85rem" }}>
              {artwork.categories.map((cat) => (
                <span
                  key={cat}
                  style={{
                    fontSize: "0.78rem",
                    padding: "0.2rem 0.6rem",
                    borderRadius: "4px",
                    backgroundColor: "var(--bg-subtle)",
                    color: "var(--lavender-accent)",
                    fontWeight: 500
                  }}
                >
                  {cat}
                </span>
              ))}
              <span
                style={{
                  fontSize: "0.78rem",
                  padding: "0.2rem 0.6rem",
                  borderRadius: "4px",
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--border-color)",
                  color: "var(--text-muted)"
                }}
              >
                {artwork.year}
              </span>
            </div>

            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.4rem, 4vw, 3.4rem)",
                fontWeight: 600,
                lineHeight: 1.1,
                color: "var(--text-primary)",
                marginBottom: "0.4rem"
              }}
            >
              {artwork.title}
            </h1>

            <div
              className="font-hand"
              style={{
                fontSize: "1.45rem",
                color: "var(--lavender-accent)"
              }}
            >
              {artwork.subtitle}
            </div>
          </div>

          {/* Description Overview */}
          <div
            style={{
              padding: "1.5rem",
              borderRadius: "6px",
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border-color)",
              boxShadow: "var(--card-shadow)"
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.25rem",
                marginBottom: "0.6rem"
              }}
            >
              About the Piece
            </h3>
            <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
              {artwork.fullDescription || artwork.shortDescription}
            </p>
          </div>

          {/* Artist Commentary */}
          {artwork.commentary && (
            <div
              style={{
                position: "relative",
                padding: "1.5rem 1.75rem",
                backgroundColor: "var(--bg-subtle)",
                borderRadius: "6px",
                borderLeft: "3px solid var(--lavender-accent)"
              }}
            >
              <span
                className="font-hand"
                style={{
                  fontSize: "1.1rem",
                  color: "var(--lavender-accent)",
                  display: "block",
                  marginBottom: "0.25rem"
                }}
              >
                Artist Commentary
              </span>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontStyle: "italic",
                  fontSize: "0.95rem",
                  color: "var(--text-primary)",
                  lineHeight: 1.65
                }}
              >
                "{artwork.commentary}"
              </p>
            </div>
          )}

          {/* Story / Inspiration */}
          {artwork.story && (
            <div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.25rem",
                  marginBottom: "0.5rem"
                }}
              >
                Inspiration & Narrative
              </h3>
              <p style={{ fontSize: "0.92rem", color: "var(--text-secondary)", lineHeight: 1.65 }}>
                {artwork.story}
              </p>
            </div>
          )}

          {/* Technical Specifications */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "1rem",
              padding: "1.25rem",
              borderRadius: "6px",
              border: "1px dashed var(--border-color)",
              backgroundColor: "var(--bg-card)",
              fontSize: "0.85rem"
            }}
          >
            <div>
              <span style={{ color: "var(--text-muted)", display: "block", fontSize: "0.75rem" }}>SOFTWARE</span>
              <strong style={{ color: "var(--text-primary)" }}>{artwork.software}</strong>
            </div>

            <div>
              <span style={{ color: "var(--text-muted)", display: "block", fontSize: "0.75rem" }}>MEDIUM</span>
              <strong style={{ color: "var(--text-primary)" }}>{artwork.medium}</strong>
            </div>

            <div>
              <span style={{ color: "var(--text-muted)", display: "block", fontSize: "0.75rem" }}>RESOLUTION</span>
              <strong style={{ color: "var(--text-primary)" }}>{artwork.dimensions} ({artwork.resolution})</strong>
            </div>

            <div>
              <span style={{ color: "var(--text-muted)", display: "block", fontSize: "0.75rem" }}>COMPLETED</span>
              <strong style={{ color: "var(--text-primary)" }}>{artwork.year}</strong>
            </div>
          </div>

          {/* Call to Commission similar piece */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "1.25rem 1.5rem",
              borderRadius: "6px",
              backgroundColor: "var(--bg-subtle)",
              border: "1px solid var(--border-color)"
            }}
          >
            <div>
              <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>Want a piece in this style?</div>
              <div style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>Commission slots are currently open.</div>
            </div>

            <Link
              to="/commissions"
              onClick={() => sound.playPageTurn()}
              className="btn-primary"
              style={{ padding: "0.6rem 1.1rem", fontSize: "0.85rem" }}
            >
              Inquire Now
            </Link>
          </div>
        </div>
      </div>

      {/* Process Section (if available) */}
      {artwork.processImages && artwork.processImages.length > 0 && (
        <section
          style={{
            marginTop: "4rem",
            paddingTop: "3.5rem",
            borderTop: "1px solid var(--border-color)"
          }}
        >
          <div style={{ maxWidth: "680px", marginBottom: "2.5rem" }}>
            <span className="font-hand" style={{ fontSize: "1.25rem", color: "var(--lavender-accent)", display: "block" }}>
              Beneath the surface
            </span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2.2rem" }}>
              Creative Process & Studies
            </h2>
            <p style={{ fontSize: "0.92rem", color: "var(--text-secondary)", marginTop: "0.4rem" }}>
              Actual progress screenshots capturing the transition from loose anatomical lines to final chiaroscuro rendering.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "2rem"
            }}
          >
            {artwork.processImages.map((proc, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "var(--bg-card)",
                  borderRadius: "6px",
                  border: "1px solid var(--border-color)",
                  overflow: "hidden",
                  boxShadow: "var(--card-shadow)"
                }}
              >
                <img
                  src={proc.image}
                  alt={proc.stage}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "260px",
                    objectFit: "cover",
                    display: "block"
                  }}
                />
                <div style={{ padding: "1.25rem" }}>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.72rem",
                      color: "var(--lavender-accent)",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      marginBottom: "0.2rem"
                    }}
                  >
                    {proc.stage}
                  </div>
                  <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                    {proc.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Lightbox / Zoom Inspector */}
      {isZoomOpen && (
        <ArtworkModal
          artwork={artwork}
          onClose={() => setIsZoomOpen(false)}
        />
      )}

      <style>{`
        @media (min-width: 768px) {
          .nav-label-desktop {
            display: inline !important;
          }
        }
      `}</style>
    </div>
  );
}

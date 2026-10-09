import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Compass, Sparkles, Feather, Layers, Eye, Edit3 } from "lucide-react";
import { ARTWORKS } from "../data/artworks";
import { ARTIST_INFO } from "../data/artist";
import { sound } from "../utils/sound";
import ArtworkCard from "../components/ArtworkCard";
import ArtworkModal from "../components/ArtworkModal";

import { getAssetUrl } from "../utils/assets";

export default function HomePage({ onOpenSketchpad }) {
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  // Centerpiece artwork
  const heroArtwork = ARTWORKS.find((a) => a.heroCenterpiece) || ARTWORKS[0];

  // 4 Featured editorial artworks
  const featuredArtworks = ARTWORKS.filter((a) => a.featured && a.id !== heroArtwork.id).slice(0, 4);

  // Creative progression stages for "FROM FIRST MARK TO FINAL PIECE"
  const processStages = [
    {
      step: "01",
      title: "The Searching Mark",
      subtitle: "Gesture & Proportional Axis",
      image: getAssetUrl("/artworks/preview/sketch-9.jpg"),
      note: "Raw graphite lines locating anatomical landmarks. Nothing is erased here; every mistake guides the correct line.",
      badge: "Krita Pencil 2B"
    },
    {
      step: "02",
      title: "Form & Chiaroscuro",
      subtitle: "Tonal Massing & Shadow Shapes",
      image: getAssetUrl("/artworks/preview/chainsaw-man.jpg"),
      note: "Squinting to establish dark values. We carve light out of darkness, anchoring weight and focal hierarchy.",
      badge: "Textured Charcoal"
    },
    {
      step: "03",
      title: "The Final Glaze",
      subtitle: "Atmosphere, Lost Edges & Details",
      image: getAssetUrl("/artworks/preview/top.jpg"),
      note: "Delicate digital oil glazes, specular eye highlights, and atmospheric dust. The anatomy breathes.",
      badge: "Finished Illustration"
    }
  ];

  return (
    <div className="home-page" style={{ position: "relative" }}>
      {/* =========================================================================
          HERO SECTION — THE ARTIST'S FIRST PAGE
          ========================================================================= */}
      <section
        style={{
          position: "relative",
          padding: "4.5rem 1.5rem 5.5rem",
          maxWidth: "1320px",
          margin: "0 auto",
          minHeight: "86vh",
          display: "flex",
          alignItems: "center"
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "3.5rem",
            alignItems: "center",
            width: "100%"
          }}
        >
          {/* Left Column: Editorial Identity & Typography */}
          <div style={{ position: "relative", zIndex: 2 }}>
            {/* Handwritten Label */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.3rem 0.85rem",
                borderRadius: "999px",
                border: "1px dashed var(--lavender-accent)",
                backgroundColor: "var(--bg-card)",
                marginBottom: "1.5rem"
              }}
            >
              <span
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  backgroundColor: "var(--lavender-accent)"
                }}
              />
              <span
                className="font-hand"
                style={{
                  fontSize: "1.15rem",
                  color: "var(--lavender-accent)",
                  letterSpacing: "0.03em"
                }}
              >
                AN ARTIST'S NOTEBOOK
              </span>
            </div>

            {/* Artist Brand Name */}
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.8rem, 6vw, 4.8rem)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
                color: "var(--text-primary)",
                marginBottom: "0.6rem"
              }}
            >
              JUSWA
            </div>

            {/* Prominent Heading */}
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.9rem, 4vw, 2.85rem)",
                fontWeight: 400,
                fontStyle: "italic",
                lineHeight: 1.2,
                color: "var(--text-secondary)",
                marginBottom: "1.5rem"
              }}
            >
              "Every stroke leaves a story."
            </h1>

            {/* Short Introduction */}
            <p
              style={{
                fontSize: "1.1rem",
                lineHeight: 1.7,
                color: "var(--text-secondary)",
                maxWidth: "520px",
                marginBottom: "2.25rem"
              }}
            >
              I create digital portraits, character illustrations, and expressive artwork
              shaped by the tactile friction of traditional graphite drawing inside Krita.
            </p>

            {/* Primary & Secondary Call to Actions */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "1rem",
                marginBottom: "2.5rem"
              }}
            >
              <Link
                to="/gallery"
                onClick={() => sound.playPageTurn()}
                className="btn-primary"
              >
                <span>Explore My Artwork</span>
                <ArrowRight size={16} />
              </Link>

              <Link
                to="/commissions"
                onClick={() => sound.playPageTurn()}
                className="btn-secondary"
              >
                <span>Commission My Art</span>
              </Link>
            </div>

            {/* Handwritten Signature & Studio Coordinates */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1.5rem",
                paddingTop: "1.5rem",
                borderTop: "1px dashed var(--border-color)",
                fontSize: "0.85rem",
                color: "var(--text-muted)"
              }}
            >
              <div>
                <span className="font-hand" style={{ fontSize: "1.35rem", color: "var(--text-primary)" }}>
                  juswa.draws
                </span>
                <div style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono)" }}>Artist Signature</div>
              </div>

              <div style={{ width: "1px", height: "28px", backgroundColor: "var(--border-color)" }} />

              <div>
                <div style={{ color: "var(--text-secondary)", fontWeight: 500 }}>Studio: Krita 5.x</div>
                <div style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono)" }}>Digital Graphite & Ink</div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Artwork Centerpiece */}
          <div
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center"
            }}
          >
            {/* Decorative Architectural / Sketchbook Framing */}
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "520px",
                borderRadius: "8px",
                backgroundColor: "var(--bg-card)",
                padding: "1rem",
                border: "1px solid var(--border-color)",
                boxShadow: "var(--card-shadow-hover)"
              }}
            >
              {/* Top Washi Tape */}
              <div
                className="washi-tape"
                style={{
                  top: "-10px",
                  left: "30px",
                  width: "80px",
                  height: "18px"
                }}
              />

              {/* Centerpiece Image Container */}
              <div
                style={{
                  position: "relative",
                  borderRadius: "4px",
                  overflow: "hidden",
                  backgroundColor: "var(--bg-subtle)"
                }}
              >
                <img
                  src={heroArtwork.image}
                  alt={heroArtwork.title}
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                    aspectRatio: heroArtwork.aspectRatio
                  }}
                />

                {/* Annotation Tag in Artwork Corner */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "1rem",
                    right: "1rem",
                    backgroundColor: "rgba(13, 13, 14, 0.8)",
                    backdropFilter: "blur(6px)",
                    borderRadius: "4px",
                    padding: "0.35rem 0.65rem",
                    color: "#F5F2EB",
                    fontSize: "0.75rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem"
                  }}
                >
                  <Eye size={12} color="var(--lavender-accent)" />
                  <span style={{ fontFamily: "var(--font-mono)" }}>
                    {heroArtwork.dimensions} • Krita
                  </span>
                </div>
              </div>

              {/* Centerpiece Caption & Handwritten Annotation */}
              <div
                style={{
                  paddingTop: "1rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "0.5rem"
                }}
              >
                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.3rem",
                      fontWeight: 600,
                      color: "var(--text-primary)"
                    }}
                  >
                    {heroArtwork.title}
                  </h3>
                  <div style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                    {heroArtwork.subtitle} ({heroArtwork.year})
                  </div>
                </div>

                <Link
                  to={`/artwork/${heroArtwork.slug}`}
                  onClick={() => sound.playPencilClick()}
                  className="pencil-underline"
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--lavender-accent)",
                    textDecoration: "none",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3rem"
                  }}
                >
                  <span>Inspect Stroke Details</span>
                  <ArrowRight size={13} />
                </Link>
              </div>

              {/* Handwritten Note Margin */}
              <div
                className="font-hand"
                style={{
                  position: "absolute",
                  bottom: "-2.2rem",
                  left: "1rem",
                  fontSize: "1.15rem",
                  color: "var(--lavender-accent)",
                  transform: "rotate(-1.5deg)"
                }}
              >
                * Centerpiece study: graphite dust & layered lighting
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FEATURED ARTWORK SECTION — EDITORIAL ARRANGEMENT
          ========================================================================= */}
      <section
        style={{
          padding: "5rem 1.5rem",
          maxWidth: "1320px",
          margin: "0 auto",
          borderTop: "1px solid var(--border-color)"
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: "1.5rem",
            marginBottom: "3rem"
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.78rem",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "var(--lavender-accent)",
                marginBottom: "0.4rem"
              }}
            >
              Curated Selection
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
                lineHeight: 1.15
              }}
            >
              Featured Works
            </h2>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span className="font-hand" style={{ fontSize: "1.15rem", color: "var(--text-muted)" }}>
              Drawn with intention in Krita
            </span>
            <Link
              to="/gallery"
              onClick={() => sound.playPageTurn()}
              className="btn-secondary"
              style={{ padding: "0.6rem 1.25rem", fontSize: "0.85rem" }}
            >
              <span>View Full Archive ({ARTWORKS.length})</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Editorial Grid: Varied Sizes */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "2rem",
            alignItems: "start"
          }}
        >
          {featuredArtworks.map((art) => (
            <ArtworkCard
              key={art.id}
              artwork={art}
              onQuickView={(piece) => setSelectedArtwork(piece)}
            />
          ))}
        </div>
      </section>

      {/* =========================================================================
          THE ARTIST'S PROCESS — FROM FIRST MARK TO FINAL PIECE
          ========================================================================= */}
      <section
        style={{
          padding: "5.5rem 1.5rem",
          backgroundColor: "var(--bg-subtle)",
          borderTop: "1px solid var(--border-color)",
          borderBottom: "1px solid var(--border-color)",
          position: "relative"
        }}
      >
        <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
          <div style={{ maxWidth: "680px", marginBottom: "3.5rem" }}>
            <span
              className="font-hand"
              style={{
                fontSize: "1.3rem",
                color: "var(--lavender-accent)",
                display: "block",
                marginBottom: "0.3rem"
              }}
            >
              Anatomy of the creative workflow
            </span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 3.5vw, 2.85rem)",
                lineHeight: 1.15,
                marginBottom: "1rem"
              }}
            >
              FROM FIRST MARK TO FINAL PIECE
            </h2>
            <p style={{ fontSize: "1rem", color: "var(--text-secondary)", lineHeight: 1.65 }}>
              Every completed portrait begins as a fragile, searching graphite line. We do not skip
              foundations; we build form through honest anatomical landmarks before color is ever introduced.
            </p>
          </div>

          {/* 3 Step Interactive Process Progression */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "2rem"
            }}
          >
            {processStages.map((stage) => (
              <div
                key={stage.step}
                style={{
                  backgroundColor: "var(--bg-card)",
                  borderRadius: "6px",
                  border: "1px solid var(--border-color)",
                  overflow: "hidden",
                  boxShadow: "var(--card-shadow)",
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                {/* Stage Image */}
                <div style={{ position: "relative", backgroundColor: "var(--bg-main)", overflow: "hidden" }}>
                  <img
                    src={stage.image}
                    alt={stage.title}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "260px",
                      objectFit: "cover",
                      display: "block"
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "0.85rem",
                      left: "0.85rem",
                      padding: "0.25rem 0.65rem",
                      borderRadius: "4px",
                      backgroundColor: "rgba(13, 13, 14, 0.8)",
                      color: "#F5F2EB",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.75rem",
                      fontWeight: 600
                    }}
                  >
                    STAGE {stage.step}
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      bottom: "0.85rem",
                      right: "0.85rem",
                      padding: "0.25rem 0.6rem",
                      borderRadius: "4px",
                      backgroundColor: "var(--lavender-accent)",
                      color: "#1A1918",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.7rem",
                      fontWeight: 600
                    }}
                  >
                    {stage.badge}
                  </div>
                </div>

                {/* Stage Description */}
                <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column" }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.35rem",
                      fontWeight: 600,
                      marginBottom: "0.25rem"
                    }}
                  >
                    {stage.title}
                  </h3>
                  <div
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--lavender-accent)",
                      fontWeight: 500,
                      marginBottom: "0.85rem"
                    }}
                  >
                    {stage.subtitle}
                  </div>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.6,
                      marginTop: "auto"
                    }}
                  >
                    {stage.note}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SKETCHBOOK NOTES — OBSERVATIONS & MARGINALIA
          ========================================================================= */}
      <section
        style={{
          padding: "5rem 1.5rem",
          maxWidth: "1320px",
          margin: "0 auto"
        }}
      >
        <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 3rem" }}>
          <span
            className="font-hand"
            style={{ fontSize: "1.35rem", color: "var(--lavender-accent)", display: "block" }}
          >
            Marginalia & reflections
          </span>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2.4rem" }}>
            Sketchbook Notes
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", marginTop: "0.5rem" }}>
            Unfiltered thoughts, technical reminders, and studio discoveries scribbled in the margins.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.75rem"
          }}
        >
          {ARTIST_INFO.sketchbookNotes.map((note) => (
            <div
              key={note.id}
              style={{
                backgroundColor: "var(--bg-card)",
                borderRadius: "6px",
                border: "1px solid var(--border-color)",
                padding: "1.75rem",
                boxShadow: "var(--card-shadow)",
                position: "relative"
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1rem"
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    color: "var(--silver-graphite)",
                    letterSpacing: "0.08em"
                  }}
                >
                  {note.date}
                </span>
                <span
                  style={{
                    fontSize: "0.75rem",
                    padding: "0.15rem 0.5rem",
                    borderRadius: "4px",
                    backgroundColor: "var(--bg-subtle)",
                    color: "var(--lavender-accent)"
                  }}
                >
                  {note.tag}
                </span>
              </div>

              <h4
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  marginBottom: "0.6rem"
                }}
              >
                {note.topic}
              </h4>

              <p
                className="font-hand"
                style={{
                  fontSize: "1.2rem",
                  color: "var(--text-primary)",
                  lineHeight: 1.5
                }}
              >
                "{note.text}"
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          TOOLS AND MATERIALS — MY DIGITAL STUDIO (Inventory, not tech stack!)
          ========================================================================= */}
      <section
        style={{
          padding: "5rem 1.5rem",
          backgroundColor: "var(--bg-subtle)",
          borderTop: "1px solid var(--border-color)",
          borderBottom: "1px solid var(--border-color)"
        }}
      >
        <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: "1.5rem",
              marginBottom: "3rem"
            }}
          >
            <div>
              <span
                className="font-hand"
                style={{ fontSize: "1.25rem", color: "var(--lavender-accent)", display: "block" }}
              >
                Physical & digital atelier
              </span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2.4rem" }}>
                MY DIGITAL STUDIO
              </h2>
            </div>

            <p style={{ maxWidth: "460px", fontSize: "0.92rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
              A curated inventory of the instruments, canvas settings, and brush configurations
              behind every illustration. Krita remains my steadfast creative home.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "1.5rem"
            }}
          >
            {ARTIST_INFO.studioInventory.map((item, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "var(--bg-card)",
                  borderRadius: "6px",
                  border: "1px solid var(--border-color)",
                  padding: "1.5rem",
                  boxShadow: "var(--card-shadow)"
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    color: "var(--lavender-accent)",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    marginBottom: "0.4rem"
                  }}
                >
                  {item.category}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.4rem",
                    fontWeight: 600,
                    marginBottom: "0.25rem"
                  }}
                >
                  {item.item}
                </h3>
                <div
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--text-muted)",
                    fontWeight: 500,
                    marginBottom: "0.85rem"
                  }}
                >
                  {item.role}
                </div>
                <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.55 }}>
                  {item.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          FINAL CALL TO ACTION — HANDWRITTEN INVITATION
          ========================================================================= */}
      <section
        style={{
          padding: "6.5rem 1.5rem",
          maxWidth: "960px",
          margin: "0 auto",
          textAlign: "center"
        }}
      >
        <span
          className="font-hand"
          style={{
            fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
            color: "var(--lavender-accent)",
            display: "block",
            marginBottom: "1rem"
          }}
        >
          "Have a character, a face, or a story in mind?"
        </span>

        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)",
            fontWeight: 400,
            lineHeight: 1.15,
            marginBottom: "1.5rem"
          }}
        >
          Let’s bring your concept onto the canvas.
        </h2>

        <p
          style={{
            fontSize: "1.05rem",
            color: "var(--text-secondary)",
            maxWidth: "560px",
            margin: "0 auto 2.5rem",
            lineHeight: 1.65
          }}
        >
          Whether you need an expressive portrait sketch, a custom character design,
          or a collaborative visual piece, I welcome all inquiries.
        </p>

        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "1rem" }}>
          <Link
            to="/commissions"
            onClick={() => sound.playPageTurn()}
            className="btn-primary"
            style={{ padding: "1rem 2.2rem", fontSize: "1rem" }}
          >
            <span>Commission My Art</span>
            <ArrowRight size={17} />
          </Link>

          <Link
            to="/gallery"
            onClick={() => sound.playPageTurn()}
            className="btn-secondary"
            style={{ padding: "1rem 2.2rem", fontSize: "1rem" }}
          >
            <span>Browse Full Gallery</span>
          </Link>

          <button
            onClick={() => {
              sound.playPencilClick();
              if (onOpenSketchpad) onOpenSketchpad();
            }}
            className="btn-secondary"
            style={{
              padding: "1rem 1.6rem",
              fontSize: "0.95rem",
              borderStyle: "dashed"
            }}
          >
            <Edit3 size={15} color="var(--lavender-accent)" />
            <span>Try Drawing Experiment</span>
          </button>
        </div>
      </section>

      {/* Lightbox / Quickview Modal */}
      {selectedArtwork && (
        <ArtworkModal
          artwork={selectedArtwork}
          onClose={() => setSelectedArtwork(null)}
        />
      )}
    </div>
  );
}

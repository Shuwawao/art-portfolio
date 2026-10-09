import React from "react";
import { Link } from "react-router-dom";
import { ARTIST_INFO } from "../data/artist";
import { ARTWORKS } from "../data/artworks";
import { sound } from "../utils/sound";
import { ArrowRight, Sparkles, Feather, Palette, ExternalLink, Heart } from "lucide-react";

export default function AboutPage() {
  const studies = ARTWORKS.slice(0, 3);

  return (
    <div className="about-page" style={{ maxWidth: "1320px", margin: "0 auto", padding: "3.5rem 1.5rem 6rem" }}>
      {/* Top Editorial Banner */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "3.5rem",
          alignItems: "center",
          marginBottom: "5rem"
        }}
      >
        {/* Left Column: Bio Story */}
        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.25rem 0.75rem",
              borderRadius: "4px",
              backgroundColor: "var(--bg-card)",
              border: "1px dashed var(--lavender-accent)",
              marginBottom: "1rem"
            }}
          >
            <Sparkles size={13} color="var(--lavender-accent)" />
            <span className="font-hand" style={{ fontSize: "1.1rem", color: "var(--lavender-accent)" }}>
              BEHIND THE SKETCHBOOK
            </span>
          </div>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 5vw, 3.8rem)",
              lineHeight: 1.1,
              marginBottom: "1.25rem"
            }}
          >
            About JUSWA
          </h1>

          <div
            className="font-hand"
            style={{
              fontSize: "1.45rem",
              color: "var(--lavender-accent)",
              marginBottom: "1.5rem"
            }}
          >
            "A digital canvas with the heartbeat of an analog notebook."
          </div>

          <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", lineHeight: 1.75, marginBottom: "1.25rem" }}>
            {ARTIST_INFO.bioIntro}
          </p>

          <p style={{ fontSize: "1rem", color: "var(--text-secondary)", lineHeight: 1.75, marginBottom: "2rem" }}>
            My creative sanctuary is <strong>Krita</strong>. While modern digital software often encourages
            synthetic perfection—perfect gradients, spotless lineart, and clinical cleanliness—my goal is the
            exact opposite: preserving the grit, charcoal dust, hesitation, and searching marks of hand-drawn illustrations.
          </p>

          {/* Social Links Row */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center" }}>
            <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Follow my journey:</span>
            {ARTIST_INFO.socials.map((soc) => (
              <a
                key={soc.name}
                href={soc.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  padding: "0.4rem 0.8rem",
                  borderRadius: "4px",
                  border: "1px solid var(--border-color)",
                  backgroundColor: "var(--bg-card)",
                  color: "var(--text-primary)",
                  textDecoration: "none",
                  fontSize: "0.82rem",
                  transition: "all 0.2s ease"
                }}
              >
                <span>{soc.name}</span>
                <ExternalLink size={12} color="var(--lavender-accent)" />
              </a>
            ))}
          </div>
        </div>

        {/* Right Column: Artist Portrait / Avatar Presentation */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              position: "relative",
              maxWidth: "480px",
              width: "100%",
              backgroundColor: "var(--bg-card)",
              borderRadius: "8px",
              padding: "1rem",
              border: "1px solid var(--border-color)",
              boxShadow: "var(--card-shadow-hover)"
            }}
          >
            {/* Washi tape */}
            <div className="washi-tape" style={{ top: "-10px", right: "20px" }} />

            <div
              style={{
                borderRadius: "4px",
                overflow: "hidden",
                backgroundColor: "var(--bg-subtle)"
              }}
            >
              <img
                src={ARTIST_INFO.avatar}
                alt="JUSWA Artist Avatar"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block"
                }}
              />
            </div>

            <div
              style={{
                paddingTop: "0.85rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <div>
                <span style={{ fontWeight: 600, fontSize: "1rem" }}>JUSWA</span>
                <span style={{ color: "var(--text-muted)", fontSize: "0.82rem", display: "block" }}>
                  Digital Artist • Manila
                </span>
              </div>

              <div
                className="font-hand"
                style={{ fontSize: "1.2rem", color: "var(--lavender-accent)" }}
              >
                @juswa_draws
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          CREATIVE PHILOSOPHY
          ========================================================================= */}
      <section
        style={{
          padding: "4.5rem 2rem",
          backgroundColor: "var(--bg-subtle)",
          borderRadius: "8px",
          border: "1px solid var(--border-color)",
          marginBottom: "5rem",
          position: "relative"
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <span
            className="font-hand"
            style={{ fontSize: "1.35rem", color: "var(--lavender-accent)", display: "block", marginBottom: "0.5rem" }}
          >
            The Core Belief
          </span>

          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
              fontStyle: "italic",
              lineHeight: 1.25,
              marginBottom: "1.75rem"
            }}
          >
            "A finished drawing is not the absence of mistakes; it is the harmonious accumulation of intentional marks."
          </h2>

          <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", lineHeight: 1.8 }}>
            {ARTIST_INFO.bioPhilosophy}
          </p>
        </div>
      </section>

      {/* =========================================================================
          THE KRITA WORKFLOW
          ========================================================================= */}
      <section style={{ marginBottom: "5rem" }}>
        <div style={{ maxWidth: "680px", marginBottom: "2.5rem" }}>
          <span className="font-hand" style={{ fontSize: "1.25rem", color: "var(--lavender-accent)", display: "block" }}>
            Inside the digital atelier
          </span>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2.2rem" }}>
            The Digital Art Workflow in Krita
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", marginTop: "0.5rem" }}>
            How a concept progresses from blank canvas to exhibition-grade digital painting.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem"
          }}
        >
          <div
            style={{
              backgroundColor: "var(--bg-card)",
              borderRadius: "6px",
              border: "1px solid var(--border-color)",
              padding: "1.75rem"
            }}
          >
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--lavender-accent)", marginBottom: "0.4rem" }}>
              STEP A
            </div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.35rem", fontWeight: 600, marginBottom: "0.5rem" }}>
              Gesture & Anatomical Mapping
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
              Working at 20% brush opacity using custom textured pencils. Looking for the tilt of the head,
              the eye socket axis, and spinal curves before defining outlines.
            </p>
          </div>

          <div
            style={{
              backgroundColor: "var(--bg-card)",
              borderRadius: "6px",
              border: "1px solid var(--border-color)",
              padding: "1.75rem"
            }}
          >
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--lavender-accent)", marginBottom: "0.4rem" }}>
              STEP B
            </div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.35rem", fontWeight: 600, marginBottom: "0.5rem" }}>
              Value Blocking & Edge Control
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
              Separating light families from shadow families. We designate hard focal edges where maximum
              clarity is required, while letting secondary edges dissolve into atmospheric sfumato.
            </p>
          </div>

          <div
            style={{
              backgroundColor: "var(--bg-card)",
              borderRadius: "6px",
              border: "1px solid var(--border-color)",
              padding: "1.75rem"
            }}
          >
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--lavender-accent)", marginBottom: "0.4rem" }}>
              STEP C
            </div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.35rem", fontWeight: 600, marginBottom: "0.5rem" }}>
              Graphite Glazing & Color Tuning
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
              Applying subtle tonal glazes and muted lavender highlights. Finishing with subtle paper grain
              to guarantee that digital zoom preserves the physical tactility of traditional illustration.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SELECTED PERSONAL ARTWORK
          ========================================================================= */}
      <section>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "2rem"
          }}
        >
          <div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2rem" }}>
              Featured Studies
            </h2>
            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
              Recent digital portraits illustrating these principles.
            </p>
          </div>

          <Link
            to="/gallery"
            onClick={() => sound.playPageTurn()}
            className="pencil-underline"
            style={{
              color: "var(--lavender-accent)",
              textDecoration: "none",
              fontSize: "0.9rem",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "0.3rem"
            }}
          >
            <span>View All Works</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem"
          }}
        >
          {studies.map((art) => (
            <Link
              key={art.id}
              to={`/artwork/${art.slug}`}
              onClick={() => sound.playPencilClick()}
              style={{
                textDecoration: "none",
                color: "inherit",
                backgroundColor: "var(--bg-card)",
                borderRadius: "6px",
                border: "1px solid var(--border-color)",
                overflow: "hidden",
                boxShadow: "var(--card-shadow)"
              }}
            >
              <img
                src={art.image}
                alt={art.title}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "280px",
                  objectFit: "cover",
                  display: "block"
                }}
              />
              <div style={{ padding: "1.25rem" }}>
                <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 600 }}>
                  {art.title}
                </h4>
                <div style={{ fontSize: "0.82rem", color: "var(--lavender-accent)", marginTop: "0.2rem" }}>
                  {art.medium} ({art.year})
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

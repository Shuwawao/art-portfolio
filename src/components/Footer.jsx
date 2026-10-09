import React from "react";
import { Link } from "react-router-dom";
import { ARTIST_INFO } from "../data/artist";
import { sound } from "../utils/sound";
import { ArrowUpRight, Heart, Sparkles } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        borderTop: "1px solid var(--border-color)",
        backgroundColor: "var(--bg-subtle)",
        position: "relative",
        marginTop: "5rem",
        overflow: "hidden"
      }}
    >
      {/* Subtle Construction Line Pattern at top */}
      <div
        style={{
          height: "4px",
          backgroundImage: "repeating-linear-gradient(90deg, var(--lavender-accent) 0, var(--lavender-accent) 12px, transparent 12px, transparent 24px)",
          opacity: 0.7
        }}
      />

      <div
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          padding: "4rem 1.5rem 3rem"
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "3rem",
            marginBottom: "3.5rem"
          }}
        >
          {/* Column 1: Artist Identity & Mark */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.85rem" }}>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.75rem",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  color: "var(--text-primary)"
                }}
              >
                JUSWA
              </span>
              <span
                style={{
                  fontFamily: "var(--font-hand)",
                  fontSize: "1.1rem",
                  color: "var(--lavender-accent)"
                }}
              >
                — Digital Artist
              </span>
            </div>

            <p
              style={{
                fontSize: "0.92rem",
                color: "var(--text-secondary)",
                maxWidth: "340px",
                lineHeight: 1.6,
                marginBottom: "1.25rem"
              }}
            >
              "The Anatomy of a Stroke." Digital portraits, character illustrations, and graphite studies painted in Krita.
            </p>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.45rem",
                padding: "0.35rem 0.75rem",
                borderRadius: "4px",
                border: "1px dashed var(--border-color)",
                fontSize: "0.82rem",
                color: "var(--text-muted)",
                backgroundColor: "var(--bg-card)"
              }}
            >
              <Sparkles size={13} color="var(--lavender-accent)" />
              <span>Studio tool: Krita (Archival 300 DPI)</span>
            </div>
          </div>

          {/* Column 2: Sketchbook Directory */}
          <div>
            <h4
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.78rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--lavender-accent)",
                marginBottom: "1.25rem"
              }}
            >
              Portfolio Navigation
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.65rem" }}>
              {[
                { to: "/", label: "Home — First Mark" },
                { to: "/gallery", label: "Gallery — The Art Archive" },
                { to: "/commissions", label: "Commissions — Rates & Inquiry" },
                { to: "/about", label: "About — Behind The Sketchbook" },
                { to: "/contact", label: "Contact — Leave A Note" }
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    onClick={() => sound.playPageTurn()}
                    style={{
                      textDecoration: "none",
                      color: "var(--text-secondary)",
                      fontSize: "0.92rem",
                      transition: "color 0.2s ease"
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "var(--lavender-accent)")}
                    onMouseLeave={(e) => (e.target.style.color = "var(--text-secondary)")}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Social & Communities */}
          <div>
            <h4
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.78rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--lavender-accent)",
                marginBottom: "1.25rem"
              }}
            >
              Art Channels ({ARTIST_INFO.handle})
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.65rem" }}>
              {ARTIST_INFO.socials.map((soc) => (
                <li key={soc.name}>
                  <a
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      textDecoration: "none",
                      color: "var(--text-secondary)",
                      fontSize: "0.92rem",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      transition: "color 0.2s ease"
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--lavender-accent)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                  >
                    <span>{soc.name}</span>
                    <ArrowUpRight size={13} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Studio Note / Handwritten Stamp */}
          <div
            style={{
              padding: "1.5rem",
              borderRadius: "6px",
              border: "1px solid var(--border-color)",
              backgroundColor: "var(--bg-card)",
              position: "relative"
            }}
          >
            {/* Washi tape visual */}
            <div
              className="washi-tape"
              style={{ top: "-10px", right: "20px" }}
            />

            <span
              style={{
                fontFamily: "var(--font-hand)",
                fontSize: "1.45rem",
                color: "var(--lavender-accent)",
                display: "block",
                marginBottom: "0.5rem"
              }}
            >
              "Every mark carries intention."
            </span>
            <p
              style={{
                fontSize: "0.85rem",
                color: "var(--text-secondary)",
                lineHeight: 1.5,
                marginBottom: "1rem"
              }}
            >
              Open for private character portraits and personal art commissions.
            </p>
            <Link
              to="/commissions"
              onClick={() => sound.playPageTurn()}
              className="btn-primary"
              style={{
                width: "100%",
                padding: "0.65rem 1rem",
                fontSize: "0.85rem",
                textAlign: "center"
              }}
            >
              View Commission Rates
            </Link>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div
          style={{
            borderTop: "1px solid var(--border-color)",
            paddingTop: "2rem",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
            fontSize: "0.82rem",
            color: "var(--text-muted)"
          }}
        >
          <div>
            © {currentYear} <strong>JUSWA</strong>. All original illustrations, sketches, and characters belong to the artist.
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <span>Digital Painting in Krita</span>
            <span>•</span>
            <span>Manila, Philippines</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

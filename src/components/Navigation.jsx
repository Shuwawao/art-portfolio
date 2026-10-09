import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sun, Moon, Volume2, VolumeX, Edit3, Menu, X } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { sound } from "../utils/sound";

export default function Navigation({ onOpenSketchpad }) {
  const { theme, toggleTheme, isDark } = useTheme();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(sound.isEnabled());

  const navLinks = [
    { path: "/", label: "Home", tabNo: "01" },
    { path: "/gallery", label: "Gallery", tabNo: "02" },
    { path: "/commissions", label: "Commissions", tabNo: "03" },
    { path: "/about", label: "About", tabNo: "04" },
    { path: "/contact", label: "Contact", tabNo: "05" }
  ];

  const handleSoundToggle = () => {
    const next = sound.toggle();
    setSoundEnabled(next);
  };

  const handleLinkClick = () => {
    sound.playPageTurn();
    setMobileMenuOpen(false);
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 900,
        backgroundColor: "var(--bg-main)",
        borderBottom: "1px solid var(--border-color)",
        transition: "background-color 0.4s ease, border-color 0.4s ease",
        backdropFilter: "blur(12px)"
      }}
    >
      <div
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          padding: "0.85rem 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        {/* Brand / Artist Monogram */}
        <Link
          to="/"
          onClick={handleLinkClick}
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            color: "var(--text-primary)"
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "6px",
              border: "1px solid var(--border-color)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "var(--bg-card)",
              position: "relative",
              overflow: "hidden"
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "1.2rem",
                color: "var(--lavender-accent)"
              }}
            >
              J
            </span>
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "2px",
                backgroundColor: "var(--lavender-accent)"
              }}
            />
          </div>

          <div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "1.25rem",
                letterSpacing: "0.08em",
                lineHeight: 1
              }}
            >
              JUSWA
            </div>
            <div
              style={{
                fontFamily: "var(--font-hand)",
                fontSize: "0.88rem",
                color: "var(--lavender-accent)",
                lineHeight: 1,
                marginTop: "2px"
              }}
            >
              The Anatomy of a Stroke
            </div>
          </div>
        </Link>

        {/* Desktop Sketchbook Tabs */}
        <nav
          style={{
            display: "none",
            alignItems: "center",
            gap: "0.4rem"
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => {
            const isActive =
              link.path === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(link.path);

            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={handleLinkClick}
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  padding: "0.55rem 0.95rem",
                  borderRadius: "4px 4px 0 0",
                  textDecoration: "none",
                  fontSize: "0.88rem",
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? "var(--text-primary)" : "var(--text-muted)",
                  borderBottom: isActive
                    ? "2px solid var(--lavender-accent)"
                    : "2px solid transparent",
                  backgroundColor: isActive ? "var(--bg-card)" : "transparent",
                  transition: "all 0.2s ease"
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.68rem",
                    color: isActive ? "var(--lavender-accent)" : "var(--silver-graphite)",
                    letterSpacing: "0.05em"
                  }}
                >
                  {link.tabNo}
                </span>
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Action Controls & Toggles */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          {/* Sketch Experiment Button */}
          <button
            onClick={() => {
              sound.playPencilClick();
              if (onOpenSketchpad) onOpenSketchpad();
            }}
            title="Open Interactive Sketchpad"
            style={{
              display: "none",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.45rem 0.85rem",
              backgroundColor: "var(--bg-subtle)",
              border: "1px dashed var(--lavender-accent)",
              borderRadius: "4px",
              cursor: "pointer",
              color: "var(--text-primary)",
              fontSize: "0.82rem",
              fontFamily: "var(--font-body)"
            }}
            className="sketch-btn-desktop"
          >
            <Edit3 size={14} color="var(--lavender-accent)" />
            <span className="font-hand" style={{ fontSize: "1.05rem" }}>
              Sketch Pad
            </span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={handleSoundToggle}
            title={soundEnabled ? "Audio effects active (Click to mute)" : "Audio muted (Click to enable)"}
            style={{
              background: "none",
              border: "1px solid var(--border-color)",
              borderRadius: "6px",
              padding: "0.48rem",
              cursor: "pointer",
              color: soundEnabled ? "var(--lavender-accent)" : "var(--text-muted)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s ease"
            }}
            aria-label="Toggle sound"
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => {
              sound.playPencilClick();
              toggleTheme();
            }}
            title={isDark ? "Switch to Archival Paper (Light Mode)" : "Switch to Charcoal Exhibition (Dark Mode)"}
            style={{
              background: "none",
              border: "1px solid var(--border-color)",
              borderRadius: "6px",
              padding: "0.48rem",
              cursor: "pointer",
              color: isDark ? "var(--lavender-soft)" : "#4A4743",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s ease"
            }}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: "none",
              border: "1px solid var(--border-color)",
              borderRadius: "6px",
              padding: "0.48rem",
              cursor: "pointer",
              color: "var(--text-primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
            className="mobile-menu-btn"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            borderTop: "1px solid var(--border-color)",
            backgroundColor: "var(--bg-main)",
            padding: "1rem 1.5rem 1.5rem"
          }}
          className="mobile-drawer"
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {navLinks.map((link) => {
              const isActive =
                link.path === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(link.path);

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={handleLinkClick}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.75rem 1rem",
                    borderRadius: "6px",
                    textDecoration: "none",
                    backgroundColor: isActive ? "var(--bg-card)" : "transparent",
                    color: isActive ? "var(--lavender-accent)" : "var(--text-primary)",
                    border: `1px solid ${isActive ? "var(--lavender-accent)" : "var(--border-color)"}`
                  }}
                >
                  <span style={{ fontSize: "1rem", fontWeight: isActive ? 600 : 400 }}>
                    {link.label}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.75rem",
                      color: "var(--silver-graphite)"
                    }}
                  >
                    Tab {link.tabNo}
                  </span>
                </Link>
              );
            })}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenSketchpad) onOpenSketchpad();
              }}
              style={{
                marginTop: "0.5rem",
                padding: "0.85rem",
                backgroundColor: "var(--lavender-accent)",
                color: "#1A1918",
                border: "none",
                borderRadius: "6px",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                cursor: "pointer"
              }}
            >
              <Edit3 size={16} /> Open Interactive Sketchpad
            </button>
          </div>
        </div>
      )}

      {/* Media query styling for navigation */}
      <style>{`
        @media (min-width: 768px) {
          .desktop-nav {
            display: flex !important;
          }
          .sketch-btn-desktop {
            display: inline-flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
          .mobile-drawer {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}

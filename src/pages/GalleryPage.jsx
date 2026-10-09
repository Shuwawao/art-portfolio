import React, { useState, useMemo } from "react";
import { ARTWORKS, GALLERY_CATEGORIES } from "../data/artworks";
import ArtworkCard from "../components/ArtworkCard";
import ArtworkModal from "../components/ArtworkModal";
import { sound } from "../utils/sound";
import { Filter, Search, SlidersHorizontal, Sparkles } from "lucide-react";

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All Works");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [selectedIdx, setSelectedIdx] = useState(0);

  // Filter artworks based on category and search query
  const filteredArtworks = useMemo(() => {
    return ARTWORKS.filter((art) => {
      const matchesCategory =
        activeCategory === "All Works" || art.categories.includes(activeCategory);

      const matchesSearch =
        searchQuery.trim() === "" ||
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleCategoryChange = (cat) => {
    sound.playPencilClick();
    setActiveCategory(cat);
  };

  const handleOpenModal = (artwork) => {
    const idx = filteredArtworks.findIndex((a) => a.id === artwork.id);
    setSelectedIdx(idx >= 0 ? idx : 0);
    setSelectedArtwork(artwork);
  };

  const handlePrevModal = () => {
    if (filteredArtworks.length <= 1) return;
    const nextIdx = (selectedIdx - 1 + filteredArtworks.length) % filteredArtworks.length;
    setSelectedIdx(nextIdx);
    setSelectedArtwork(filteredArtworks[nextIdx]);
  };

  const handleNextModal = () => {
    if (filteredArtworks.length <= 1) return;
    const nextIdx = (selectedIdx + 1) % filteredArtworks.length;
    setSelectedIdx(nextIdx);
    setSelectedArtwork(filteredArtworks[nextIdx]);
  };

  return (
    <div className="gallery-page" style={{ maxWidth: "1320px", margin: "0 auto", padding: "3.5rem 1.5rem 6rem" }}>
      {/* Header & Editorial Title */}
      <div style={{ maxWidth: "760px", marginBottom: "3rem" }}>
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
          <span
            className="font-hand"
            style={{ fontSize: "1.1rem", color: "var(--lavender-accent)" }}
          >
            THE ART ARCHIVE
          </span>
        </div>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.5rem, 5vw, 3.8rem)",
            lineHeight: 1.1,
            marginBottom: "1rem"
          }}
        >
          Illustrations & Studies
        </h1>

        <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", lineHeight: 1.65 }}>
          An evolving repository of finished character pieces, anatomical studies, and
          digital portraits created in Krita. Each illustration retains its native aspect ratio.
        </p>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1.25rem",
          marginBottom: "2.5rem",
          paddingBottom: "1.5rem",
          borderBottom: "1px solid var(--border-color)"
        }}
      >
        {/* Category Buttons with hand-drawn marker aesthetics */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {GALLERY_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                style={{
                  position: "relative",
                  padding: "0.5rem 1.05rem",
                  borderRadius: "4px",
                  border: `1px solid ${isActive ? "var(--lavender-accent)" : "var(--border-color)"}`,
                  backgroundColor: isActive ? "var(--bg-card)" : "transparent",
                  color: isActive ? "var(--lavender-accent)" : "var(--text-secondary)",
                  cursor: "pointer",
                  fontSize: "0.86rem",
                  fontWeight: isActive ? 600 : 400,
                  transition: "all 0.2s ease"
                }}
              >
                <span>{cat}</span>
                {isActive && (
                  <span
                    style={{
                      position: "absolute",
                      bottom: "-1px",
                      left: "20%",
                      right: "20%",
                      height: "2px",
                      backgroundColor: "var(--lavender-accent)"
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div
          style={{
            position: "relative",
            minWidth: "240px"
          }}
        >
          <Search
            size={16}
            style={{
              position: "absolute",
              left: "0.85rem",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--text-muted)"
            }}
          />
          <input
            type="text"
            placeholder="Search by title, tag, or mood..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "0.55rem 1rem 0.55rem 2.4rem",
              borderRadius: "4px",
              border: "1px solid var(--border-color)",
              backgroundColor: "var(--bg-card)",
              color: "var(--text-primary)",
              fontSize: "0.86rem",
              outline: "none"
            }}
          />
        </div>
      </div>

      {/* Archive Count Summary */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
          fontSize: "0.85rem",
          color: "var(--text-muted)"
        }}
      >
        <div>
          Showing <strong>{filteredArtworks.length}</strong> of {ARTWORKS.length} artworks
        </div>

        <div className="font-hand" style={{ fontSize: "1.15rem", color: "var(--lavender-accent)" }}>
          * Click any piece for story notes or quick inspector
        </div>
      </div>

      {/* Editorial Masonry / Multi-column Layout */}
      {filteredArtworks.length > 0 ? (
        <div
          style={{
            columnCount: 1,
            columnGap: "1.75rem"
          }}
          className="gallery-masonry"
        >
          {filteredArtworks.map((artwork) => (
            <ArtworkCard
              key={artwork.id}
              artwork={artwork}
              onQuickView={() => handleOpenModal(artwork)}
            />
          ))}
        </div>
      ) : (
        <div
          style={{
            padding: "5rem 2rem",
            textAlign: "center",
            backgroundColor: "var(--bg-card)",
            borderRadius: "6px",
            border: "1px dashed var(--border-color)"
          }}
        >
          <p className="font-hand" style={{ fontSize: "1.4rem", color: "var(--text-muted)", marginBottom: "1rem" }}>
            No artworks found matching "{searchQuery}"
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setActiveCategory("All Works");
            }}
            className="btn-secondary"
            style={{ padding: "0.6rem 1.4rem" }}
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Lightbox / Zoom Inspector Modal */}
      {selectedArtwork && (
        <ArtworkModal
          artwork={selectedArtwork}
          onClose={() => setSelectedArtwork(null)}
          onPrev={handlePrevModal}
          onNext={handleNextModal}
        />
      )}

      {/* Responsive Masonry Media Queries */}
      <style>{`
        @media (min-width: 640px) {
          .gallery-masonry {
            column-count: 2 !important;
          }
        }
        @media (min-width: 1024px) {
          .gallery-masonry {
            column-count: 3 !important;
          }
        }
      `}</style>
    </div>
  );
}

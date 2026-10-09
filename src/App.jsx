import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import GraphiteCursor from "./components/GraphiteCursor";
import SketchCanvasModal from "./components/SketchCanvasModal";
import HomePage from "./pages/HomePage";
import GalleryPage from "./pages/GalleryPage";
import ArtworkDetailPage from "./pages/ArtworkDetailPage";
import CommissionsPage from "./pages/CommissionsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import { Edit3 } from "lucide-react";
import { sound } from "./utils/sound";

// Component to scroll top on route changes
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

export default function App() {
  const [sketchpadOpen, setSketchpadOpen] = useState(false);

  return (
    <div className="app-container" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <ScrollToTop />
      {/* Subtle Graphite Cursor Follower on Desktop */}
      <GraphiteCursor />

      {/* Main Sketchbook Navigation */}
      <Navigation onOpenSketchpad={() => setSketchpadOpen(true)} />

      {/* Content Viewport */}
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage onOpenSketchpad={() => setSketchpadOpen(true)} />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/artwork/:id" element={<ArtworkDetailPage />} />
          <Route path="/commissions" element={<CommissionsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>

      {/* Persistent Sketchbook Experiment FAB */}
      <button
        onClick={() => {
          sound.playPencilClick();
          setSketchpadOpen(true);
        }}
        className="sketch-fab"
        title="Open interactive drawing experiment"
        aria-label="Open Sketchpad"
      >
        <Edit3 size={16} color="var(--lavender-accent)" />
        <span className="font-hand" style={{ fontSize: "1.1rem" }}>
          Sketch Pad
        </span>
      </button>

      {/* Interactive Sketchbook Experiment Canvas Modal */}
      <SketchCanvasModal
        isOpen={sketchpadOpen}
        onClose={() => setSketchpadOpen(false)}
      />

      {/* Editorial Footer */}
      <Footer />
    </div>
  );
}

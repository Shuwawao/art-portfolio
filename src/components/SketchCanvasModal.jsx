import React, { useRef, useState, useEffect } from "react";
import { X, RotateCcw, Download, Eraser, PenTool, Volume2, VolumeX, Sparkles } from "lucide-react";
import { sound } from "../utils/sound";
import { useTheme } from "../context/ThemeContext";

export default function SketchCanvasModal({ isOpen, onClose }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState("pencil"); // 'pencil', 'charcoal', 'eraser'
  const [brushSize, setBrushSize] = useState(3);
  const [brushColor, setBrushColor] = useState("#2A2826");
  const [history, setHistory] = useState([]);
  const [soundEnabled, setSoundEnabled] = useState(sound.isEnabled());
  const { isDark } = useTheme();

  // Color options appropriate for archival paper sketchbook
  const palette = [
    { name: "Graphite 2B", value: isDark ? "#ECE7DC" : "#2A2826" },
    { name: "Deep Charcoal", value: isDark ? "#FFFFFF" : "#141312" },
    { name: "Warm Umber", value: isDark ? "#D5CFC2" : "#6E5B4B" },
    { name: "Lavender Accent", value: "#B9A3E3" },
    { name: "Silver Lead", value: isDark ? "#9A96A0" : "#8A8680" }
  ];

  // Initialize canvas
  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Match physical pixel ratio for crisp pencil lines
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Initial paper tone fill
    ctx.fillStyle = isDark ? "#141416" : "#FAF8F3";
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Save initial state to history
    saveState();
  }, [isOpen, isDark]);

  const saveState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const imageData = ctx.getImageData(0, 0, rect.width * dpr, rect.height * dpr);
    setHistory(prev => [...prev.slice(-15), imageData]);
  };

  const undo = () => {
    if (history.length <= 1) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const newHistory = [...history];
    newHistory.pop(); // Remove current
    const previous = newHistory[newHistory.length - 1];
    ctx.putImageData(previous, 0, 0);
    setHistory(newHistory);
    sound.playPencilClick();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    ctx.fillStyle = isDark ? "#141416" : "#FAF8F3";
    ctx.fillRect(0, 0, rect.width, rect.height);
    saveState();
    sound.playPageTurn();
  };

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();

    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(x, y);

    if (tool === "eraser") {
      ctx.strokeStyle = isDark ? "#141416" : "#FAF8F3";
      ctx.lineWidth = brushSize * 4;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
    } else if (tool === "charcoal") {
      ctx.strokeStyle = brushColor;
      ctx.lineWidth = brushSize * 2.5;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.shadowBlur = 1.5;
      ctx.shadowColor = brushColor;
    } else {
      // 2B Pencil
      ctx.strokeStyle = brushColor;
      ctx.lineWidth = brushSize;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.shadowBlur = 0;
    }

    sound.playPencilScratch(0.08, 0.05);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();

    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();

    // Occasional subtle audio scratch
    if (Math.random() < 0.25) {
      sound.playPencilScratch(0.06, 0.04);
    }
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    saveState();
  };

  const downloadSketch = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    sound.playPencilClick();
    const link = document.createElement("a");
    link.download = `juswa-sketchbook-study-${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const toggleSound = () => {
    const newState = sound.toggle();
    setSoundEnabled(newState);
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(13, 13, 14, 0.75)",
        backdropFilter: "blur(8px)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem"
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "960px",
          height: "85vh",
          backgroundColor: "var(--bg-card)",
          borderRadius: "8px",
          border: "1px solid var(--border-color)",
          boxShadow: "var(--card-shadow-hover)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          position: "relative"
        }}
      >
        {/* Header toolbar */}
        <div
          style={{
            padding: "0.85rem 1.25rem",
            borderBottom: "1px solid var(--border-color)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "0.75rem",
            backgroundColor: "var(--bg-subtle)"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <span style={{ fontFamily: "var(--font-hand)", fontSize: "1.35rem", color: "var(--lavender-accent)" }}>
              Interactive Sketchbook
            </span>
            <span
              style={{
                fontSize: "0.72rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                padding: "0.15rem 0.5rem",
                borderRadius: "4px",
                border: "1px solid var(--border-color)",
                color: "var(--text-muted)"
              }}
            >
              Temporary Canvas Study
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <button
              onClick={toggleSound}
              title={soundEnabled ? "Pencil Audio Active (Click to mute)" : "Pencil Audio Muted (Click to enable)"}
              style={{
                background: "none",
                border: "1px solid var(--border-color)",
                borderRadius: "4px",
                padding: "0.4rem 0.6rem",
                cursor: "pointer",
                color: soundEnabled ? "var(--lavender-accent)" : "var(--text-muted)",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                fontSize: "0.8rem"
              }}
            >
              {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
              <span className="font-hand">{soundEnabled ? "Audio On" : "Muted"}</span>
            </button>

            <button
              onClick={onClose}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--text-secondary)",
                padding: "0.4rem"
              }}
              aria-label="Close sketchbook"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Tools Sub-bar */}
        <div
          style={{
            padding: "0.6rem 1.25rem",
            borderBottom: "1px dashed var(--border-faint)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "0.75rem",
            fontSize: "0.85rem"
          }}
        >
          {/* Tool Selector */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <button
              onClick={() => { setTool("pencil"); sound.playPencilClick(); }}
              style={{
                padding: "0.3rem 0.65rem",
                borderRadius: "4px",
                border: `1px solid ${tool === "pencil" ? "var(--lavender-accent)" : "var(--border-color)"}`,
                backgroundColor: tool === "pencil" ? "var(--bg-card)" : "transparent",
                color: tool === "pencil" ? "var(--lavender-accent)" : "var(--text-secondary)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.35rem"
              }}
            >
              <PenTool size={14} /> 2B Pencil
            </button>

            <button
              onClick={() => { setTool("charcoal"); sound.playPencilClick(); }}
              style={{
                padding: "0.3rem 0.65rem",
                borderRadius: "4px",
                border: `1px solid ${tool === "charcoal" ? "var(--lavender-accent)" : "var(--border-color)"}`,
                backgroundColor: tool === "charcoal" ? "var(--bg-card)" : "transparent",
                color: tool === "charcoal" ? "var(--lavender-accent)" : "var(--text-secondary)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.35rem"
              }}
            >
              <Sparkles size={14} /> Soft Charcoal
            </button>

            <button
              onClick={() => { setTool("eraser"); sound.playPencilClick(); }}
              style={{
                padding: "0.3rem 0.65rem",
                borderRadius: "4px",
                border: `1px solid ${tool === "eraser" ? "var(--lavender-accent)" : "var(--border-color)"}`,
                backgroundColor: tool === "eraser" ? "var(--bg-card)" : "transparent",
                color: tool === "eraser" ? "var(--lavender-accent)" : "var(--text-secondary)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.35rem"
              }}
            >
              <Eraser size={14} /> Eraser
            </button>
          </div>

          {/* Color Swatches */}
          {tool !== "eraser" && (
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Tone:</span>
              {palette.map((c) => (
                <button
                  key={c.name}
                  onClick={() => { setBrushColor(c.value); sound.playPencilClick(); }}
                  title={c.name}
                  style={{
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    backgroundColor: c.value,
                    border: brushColor === c.value ? "2px solid var(--lavender-accent)" : "1px solid var(--border-color)",
                    cursor: "pointer",
                    padding: 0
                  }}
                />
              ))}
            </div>
          )}

          {/* Stroke Width Slider */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Stroke:</span>
            <input
              type="range"
              min="1"
              max="14"
              value={brushSize}
              onChange={(e) => setBrushSize(Number(e.target.value))}
              style={{ width: "70px", accentColor: "var(--lavender-accent)" }}
            />
            <span style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono)", width: "20px" }}>{brushSize}px</span>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <button
              onClick={undo}
              disabled={history.length <= 1}
              title="Undo last stroke"
              style={{
                padding: "0.3rem 0.5rem",
                borderRadius: "4px",
                border: "1px solid var(--border-color)",
                background: "none",
                cursor: history.length > 1 ? "pointer" : "not-allowed",
                opacity: history.length > 1 ? 1 : 0.4,
                color: "var(--text-primary)"
              }}
            >
              <RotateCcw size={14} />
            </button>

            <button
              onClick={clearCanvas}
              title="Clear page"
              style={{
                padding: "0.3rem 0.65rem",
                borderRadius: "4px",
                border: "1px solid var(--border-color)",
                background: "none",
                cursor: "pointer",
                color: "var(--text-secondary)",
                fontSize: "0.8rem"
              }}
            >
              Clear Page
            </button>

            <button
              onClick={downloadSketch}
              title="Save sketch to computer"
              style={{
                padding: "0.3rem 0.75rem",
                borderRadius: "4px",
                border: "1px solid var(--lavender-accent)",
                backgroundColor: "var(--lavender-accent)",
                color: "#1A1918",
                fontWeight: 500,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.35rem",
                fontSize: "0.8rem"
              }}
            >
              <Download size={13} /> Save Sketch
            </button>
          </div>
        </div>

        {/* Canvas Area */}
        <div style={{ flex: 1, position: "relative", cursor: "crosshair", overflow: "hidden" }}>
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            style={{ width: "100%", height: "100%", touchAction: "none" }}
          />

          {/* Handwritten Annotation in bottom corner */}
          <div
            style={{
              position: "absolute",
              bottom: "1rem",
              left: "1.25rem",
              pointerEvents: "none",
              fontFamily: "var(--font-hand)",
              color: "var(--text-muted)",
              fontSize: "1.1rem"
            }}
          >
            "A stroke carries intention. Make your mark." — JUSWA
          </div>
        </div>

        {/* Footer Notice */}
        <div
          style={{
            padding: "0.45rem 1.25rem",
            borderTop: "1px solid var(--border-color)",
            backgroundColor: "var(--bg-subtle)",
            fontSize: "0.75rem",
            color: "var(--text-muted)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <span>Temporary experimental sketchbook canvas. Strokes exist solely in your browser memory.</span>
          <span style={{ fontFamily: "var(--font-mono)" }}>Krita Brush Simulation</span>
        </div>
      </div>
    </div>
  );
}

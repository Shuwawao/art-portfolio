import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";

export default function GraphiteCursor() {
  const canvasRef = useRef(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    // Detect touch screens or reduced motion
    if (window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window) {
      setIsTouchDevice(true);
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPrefersReducedMotion(true);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const particles = [];
    let mouseX = -100;
    let mouseY = -100;
    let lastX = -100;
    let lastY = -100;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Calculate speed
      const dist = Math.hypot(mouseX - lastX, mouseY - lastY);
      if (dist > 3 && lastX !== -100) {
        // Spawn subtle graphite dust particle
        if (particles.length < 24) {
          particles.push({
            x: mouseX + (Math.random() - 0.5) * 4,
            y: mouseY + (Math.random() - 0.5) * 4,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4 + 0.2,
            size: Math.random() * 1.6 + 0.8,
            alpha: 0.35,
            decay: Math.random() * 0.025 + 0.015
          });
        }
      }
      lastX = mouseX;
      lastY = mouseY;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let animationFrameId;
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render subtle trailing graphite particles
      const particleColor = isDark ? "185, 163, 227" : "74, 71, 67";
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${particleColor}, ${p.alpha})`;
          ctx.fill();
        }
      }

      // Render tiny delicate pencil tip dot
      if (mouseX > 0 && mouseY > 0) {
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? "#D9CCF5" : "#4A4743";
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  if (isTouchDevice || prefersReducedMotion) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 9998
      }}
      aria-hidden="true"
    />
  );
}

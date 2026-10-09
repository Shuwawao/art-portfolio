/**
 * Web Audio API synthesized sound effects.
 * 100% self-contained: no external audio files required, zero latency, no 404s.
 * Sound is disabled by default and controlled by an obvious user toggle.
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = false;
    
    // Check localStorage preference
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("juswa_art_sound");
      this.enabled = saved === "true"; // Defaults to false
    }
  }

  init() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    if (typeof window !== "undefined") {
      localStorage.setItem("juswa_art_sound", this.enabled ? "true" : "false");
    }
    if (this.enabled) {
      this.init();
      this.playPencilClick();
    }
    return this.enabled;
  }

  isEnabled() {
    return this.enabled;
  }

  /**
   * Generates a subtle, organic pencil-scratch-on-paper friction sound.
   */
  playPencilScratch(duration = 0.12, intensity = 0.08) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const bufferSize = Math.floor(this.ctx.sampleRate * duration);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // Generate brownian/pink noise for soft paper tooth friction
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        lastOut = (lastOut + 0.02 * white) / 1.02;
        data[i] = lastOut * 3.5;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      // Bandpass filter centered around pencil graphite scratching frequency (2200Hz - 3400Hz)
      const filter = this.ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 2400 + Math.random() * 600;
      filter.Q.value = 1.8;

      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(intensity, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(now);
      noise.stop(now + duration);
    } catch {
      // Graceful fallback if Web Audio is unsupported
    }
  }

  /**
   * Delicate tap of a wooden pencil nib.
   */
  playPencilClick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = "sine";
      osc.frequency.setValueAtTime(1400, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.05);

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch {
      // Graceful ignore
    }
  }

  /**
   * Soft rustle of an archival paper sketchbook page turning.
   */
  playPageTurn() {
    if (!this.enabled) return;
    this.playPencilScratch(0.24, 0.09);
  }
}

export const sound = new SoundEngine();

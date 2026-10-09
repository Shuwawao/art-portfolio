/**
 * JUSWA — Artist Profile & Digital Studio Information
 * Central source of truth for artist bio, tools, and social links.
 */
import { getAssetUrl } from "../utils/assets";

export const ARTIST_INFO = {
  name: "JUSWA",
  title: "Digital Artist & Character Illustrator",
  tagline: "Every stroke leaves a story.",
  workingTitle: "The Anatomy of a Stroke",
  avatar: getAssetUrl("/artworks/preview/juswa-zoom-2.jpg"),
  avatarThumbnail: getAssetUrl("/artworks/thumbs/juswa-zoom-2.jpg"),
  avatarOriginal: getAssetUrl("/artworks/juswa-zoom-2.png"),
  location: "Philippines",
  primaryTool: "Krita",
  handle: "@juswa_draws",
  email: "juswa.draws@gmail.com",
  socials: [
    {
      name: "Instagram",
      handle: "@juswa_draws",
      url: "https://instagram.com/juswa_draws",
      icon: "instagram"
    },
    {
      name: "X (Twitter)",
      handle: "@juswa_draws",
      url: "https://x.com/juswa_draws",
      icon: "twitter"
    },
    {
      name: "Cara",
      handle: "@juswa_draws",
      url: "https://cara.app/juswadraws",
      icon: "palette"
    },
    {
      name: "ArtStation",
      handle: "juswa-draws",
      url: "https://artstation.com/juswadraws",
      icon: "image"
    }
  ],
  bioIntro: "I am JUSWA, a digital artist exploring human emotion, character psychology, and the tactile friction of traditional drawing tools inside a digital canvas.",
  bioPhilosophy: "I believe digital art shouldn't have to look sterile or clinical. When a pencil meets toothy paper, there is resistance, hesitation, and surprise. In my illustrations, I seek to preserve those raw construction marks—the searching lines, the graphite dust, the lost edges—turning the digital canvas into an honest, living sketchbook.",
  studioInventory: [
    {
      category: "Creative Core",
      item: "Krita",
      role: "Primary Painting Suite",
      note: "Custom brush engines configured for textured graphite, soft blending, and dry charcoal mark-making."
    },
    {
      category: "Input Device",
      item: "Pressure-Sensitive Drawing Tablet",
      role: "Direct Pen Input",
      note: "Calibrated for nuanced hand pressure, from whisper-light gesture lines to heavy chisel strokes."
    },
    {
      category: "Canvas Standard",
      item: "300 – 600 DPI High-Resolution Presets",
      role: "Archival Quality",
      note: "Every piece begins on a canvas with enough pixel density to preserve paper fiber grain for large-format print."
    },
    {
      category: "Brush Favorites",
      item: "Charcoal Soft & Rough Ink Pen",
      role: "Tactile Mark-Making",
      note: "Dual-textured nibs that simulate natural graphite drag across medium-tooth cold-press paper."
    }
  ],
  sketchbookNotes: [
    {
      id: "note-1",
      date: "Study No. 14",
      topic: "Values First",
      text: "If the values don't hold the weight in black and white, adding color won't save it. Always squint at the thumbnail before detailing.",
      tag: "#Values"
    },
    {
      id: "note-2",
      date: "Studio Log",
      topic: "The Eyes",
      text: "Never draw the eyes identical. One is always carrying more light; the other hides in the bone structure of the brow.",
      tag: "#Anatomy"
    },
    {
      id: "note-3",
      date: "Krita Setting",
      topic: "Brush Resistance",
      text: "Turn down stabilizer distance to 2. Let the natural tremor of the hand stay in the stroke. Perfection is cold.",
      tag: "#Technique"
    },
    {
      id: "note-4",
      date: "Reflection",
      topic: "Lost Edges",
      text: "Where the form meets shadow, let the edge dissolve. The human brain loves finishing the drawing itself.",
      tag: "#Sfumato"
    }
  ]
};

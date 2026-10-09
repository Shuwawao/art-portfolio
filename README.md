# JUSWA — The Anatomy of a Stroke
> Personal Digital Art Portfolio & Interactive Sketchbook

An immersive, tactile digital art portfolio for **JUSWA**, digital artist specializing in portraits, character illustrations, and expressive digital artwork created with **Krita**.

The website combines the tactile qualities of traditional graphite drawing (warm archival paper, subtle grain, graphite dust, marginalia notes, and construction marks) with contemporary editorial layout design and a charcoal exhibition dark mode.

---

## 🎨 Creative Highlights & Architecture

* **Artist-First Experience:** Built exclusively around JUSWA's original artwork, distinct from any developer portfolio.
* **Dual Environments (Theme Switcher):**
  * **Archival Paper (Light Mode):** `#F5F2EB` paper tone with graphite lettering, faint construction lines, and subtle lavender accents (`#B9A3E3`).
  * **Charcoal Exhibition (Dark Mode):** `#0D0D0E` deep charcoal background, silver graphite, and dramatic museum-style lighting.
* **Multi-Page Route Architecture:**
  1. **Home (`/`):** Hero centerpiece framed with sketchbook construction lines, curated featured works, 3-stage process (*From First Mark to Final Piece*), sketchbook reflections, and digital studio inventory.
  2. **Gallery (`/gallery`):** Responsive editorial masonry layout that preserves the natural aspect ratio of every artwork. Includes category filters (*Portraits, Character Art, Personal Artwork, Commissioned Artwork, Sketches & Studies*), live search, and a quick zoom lightbox.
  3. **Artwork Details (`/artwork/:slug`):** Deep-dive case study with high-res inspect zoom, artist commentary, story narrative, software specs, and previous/next navigation.
  4. **Commissions (`/commissions`):** Clear distinction between sketches (starting ₱150) and fully rendered pieces (starting ₱650). Includes an **Interactive Price Estimator**, a 5-step transparent workflow, terms, and a validated request form that prepares emails and copies details for social DMs.
  5. **About the Artist (`/about`):** Authentic introduction to JUSWA, artistic philosophy, Krita painting workflow, artist avatar, and social channels.
  6. **Contact (`/contact`):** Final sketchbook page ("Let's Make Something") with direct email, social channels (`@juswa_draws`), and a note form.
* **Interactive Sketchbook Canvas Experiment:** A live drawing canvas accessible via navigation or the floating action button. Visitors can test 2B pencil, charcoal, and eraser strokes, toggle stroke width, adjust graphite shades, undo, download their sketch as a PNG, and hear synthesized pencil friction.
* **Organic Web Audio Effects:** Synthesized pencil scratching and page rustle using the Web Audio API (zero external audio files needed, muted by default, with a volume toggle).
* **Graphite Cursor Trail:** Delicate desktop pencil nib with fading graphite dust particles (respects `prefers-reduced-motion` and touch devices).

---

## 🚀 Quick Start & Development

### Prerequisites
* **Node.js** (v18.0.0 or later)
* **npm** (v9.0.0 or later)

### Installation

```bash
# 1. Clone or navigate to the project directory
cd d:\art-portfolio

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
# Build optimized production bundle
npm run build

# Preview the production build locally
npm run preview
```

---

## 🖼️ How to Add or Update Artwork

Artwork metadata is centralized in a single file: **`src/data/artworks.js`**.

1. **Place your artwork image** in `public/artworks/` (or run image optimization).
2. **Open `src/data/artworks.js`** and add a new entry to the `ARTWORKS` array:

```javascript
{
  id: "my-new-portrait",
  slug: "my-new-portrait",
  title: "Title of Your Artwork",
  subtitle: "Character / Study Name",
  year: "2026",
  categories: ["Portraits", "Character Art"], // Options: Portraits, Character Art, Personal Artwork, Commissioned Artwork, Sketches and Studies
  featured: true, // Set to true to highlight on the homepage
  heroCenterpiece: false, // Set to true if you want this as the hero image
  dimensions: "3000 × 4000 px",
  resolution: "300 DPI",
  software: "Krita",
  medium: "Digital Graphite & Color Wash",
  aspectRatio: 0.75, // Width divided by Height (e.g., 3000/4000 = 0.75)
  image: "/artworks/preview/my-new-portrait.jpg",
  thumbnail: "/artworks/thumbs/my-new-portrait.jpg",
  fullResolution: "/artworks/my-new-portrait.png",
  shortDescription: "A short 1-2 sentence summary for gallery cards.",
  fullDescription: "Detailed description of the artwork for the case study page.",
  commentary: "Your personal commentary on technique, brushes, or struggles.",
  story: "Inspiration or character backstory.",
  processImages: [
    {
      stage: "Initial Sketch",
      caption: "Rough proportions and gesture lines",
      image: "/artworks/preview/sketch-9.jpg"
    }
  ],
  tags: ["Portrait", "Krita", "Original"]
}
```

---

## 💼 How to Update Commission Rates & Services

Commission pricing and offerings are managed in **`src/data/commissions.js`**:

* **`COMMISSION_TIERS`**: Update sketch starting prices (e.g. ₱150, ₱225, ₱300, ₱350, ₱450, ₱2,500).
* **`RENDERED_TIERS`**: Update fully rendered illustration prices (e.g. ₱650, ₱1,100, ₱1,800).
* **`COMMISSION_ADDONS`**: Modify background complexity fees, extra characters, and rush orders.
* **`COMMISSION_TERMS`**: Update accepted payment methods (GCash, Maya, PayPal, Bank Transfer), deposit policies, and revision rules.

---

## 👤 How to Update Artist Info & Socials

All social links and bio information are stored in **`src/data/artist.js`**:

* **`ARTIST_INFO.handle`**: Default `@juswa_draws`.
* **`ARTIST_INFO.email`**: Default `juswa.draws@gmail.com`.
* **`ARTIST_INFO.socials`**: URLs for Instagram, X, Cara, ArtStation.
* **`ARTIST_INFO.studioInventory`**: Digital studio equipment and Krita configurations.

---

## 🌐 Deployment Instructions

### Deploy to Cloudflare Pages (Recommended)

1. Push your repository to GitHub.
2. In the **Cloudflare Dashboard**, navigate to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select your repository and configure build settings:
   * **Framework preset:** `Vite`
   * **Build command:** `npm run build`
   * **Build output directory:** `dist`
4. Click **Save and Deploy**. SPA redirects are pre-configured via `public/_redirects`.

### Deploy to GitHub Pages

1. In `vite.config.js`, set `base: '/repository-name/'` if deploying to a project subpath.
2. Run `npm run build`.
3. Deploy the contents of the `dist/` directory to the `gh-pages` branch.

---

## 📜 License & Copyright

© 2026 **JUSWA**. All original artworks, character designs, and digital paintings belong to the artist.
Website template and sketchbook code built with React and Vite.

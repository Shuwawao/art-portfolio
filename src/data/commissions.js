/**
 * JUSWA — Commission Offerings, Rates & Terms
 * Central source of truth for services, pricing, and workflow.
 * All values are editable by the artist.
 */

export const COMMISSION_TIERS = [
  {
    id: "head-sketch",
    title: "Head Portrait Sketch",
    category: "Sketch",
    pricePHP: 150,
    priceLabel: "₱150",
    turnaround: "2 – 4 days",
    renderingLevel: "Clean graphite construction & tonal shading",
    deliverables: "High-res 300 DPI PNG (2500px+)",
    description: "Expressive headshot focusing on eyes, facial structure, and hair flow with tactile pencil grain.",
    idealFor: "Icons, avatar concepts, character facial studies.",
    sampleArtworkId: "sketch-study-09"
  },
  {
    id: "bust-sketch",
    title: "Bust Portrait Sketch",
    category: "Sketch",
    pricePHP: 225,
    priceLabel: "₱225",
    turnaround: "3 – 5 days",
    renderingLevel: "Detailed graphite linework, neck & collarbone rendering",
    deliverables: "High-res 300 DPI PNG (3000px+)",
    description: "Chest-up sketch capturing head tilt, shoulder posture, and garment silhouette.",
    idealFor: "Profile art, RPG character portraits, emote concepts.",
    sampleArtworkId: "character"
  },
  {
    id: "half-body-sketch",
    title: "Half-Body Sketch",
    category: "Sketch",
    pricePHP: 300,
    priceLabel: "₱300",
    turnaround: "4 – 6 days",
    renderingLevel: "Waist-up dynamic gesture and clothing folds",
    deliverables: "High-res 300 DPI PNG (3500px+)",
    description: "Waist-up character drawing with expressive arm gestures and clothing drape.",
    idealFor: "Visual novel sprites, character introductions, OC poses.",
    sampleArtworkId: "chainsaw-man"
  },
  {
    id: "knee-up-sketch",
    title: "Knee-Up Sketch",
    category: "Sketch",
    pricePHP: 350,
    priceLabel: "₱350",
    turnaround: "5 – 7 days",
    renderingLevel: "Mid-thigh up anatomy and dynamic weight balance",
    deliverables: "High-res 300 DPI PNG (3800px+)",
    description: "Three-quarters framing showcasing costume details, weapons/props, and stance.",
    idealFor: "Card art concepts, promotional sketches, dynamic action.",
    sampleArtworkId: "hyakkimaru"
  },
  {
    id: "full-body-sketch",
    title: "Full-Body Sketch",
    category: "Sketch",
    pricePHP: 450,
    priceLabel: "₱450",
    turnaround: "6 – 8 days",
    renderingLevel: "Head-to-toe proportional anatomy and footwear detail",
    deliverables: "High-res 300 DPI PNG (4200px+)",
    description: "Complete character silhouette with grounded perspective and full costume design.",
    idealFor: "Full character designs, VTuber concepts, fashion sheets.",
    sampleArtworkId: "the-anatomy-of-a-stroke"
  },
  {
    id: "character-sheet",
    title: "Full Character Design Sheet",
    category: "Specialized",
    pricePHP: 2500,
    priceLabel: "₱2,500",
    turnaround: "10 – 18 days",
    renderingLevel: "Multi-view turnaround, expression studies, palette breakdown",
    deliverables: "Layered high-res 300 DPI master file (5000px+) + individual asset exports",
    description: "Comprehensive character bible containing front/back view, 3 emotional facial expressions, key prop callouts, and official color swatches.",
    idealFor: "Original characters, game prototypes, animation pitch documents.",
    sampleArtworkId: "commission-brianna"
  }
];

export const RENDERED_TIERS = [
  {
    id: "rendered-bust",
    title: "Fully Rendered Bust",
    category: "Fully Rendered",
    pricePHP: 650,
    priceLabel: "₱650",
    turnaround: "5 – 7 days",
    renderingLevel: "Full digital color, skin subsurface scattering, cinematic lighting",
    deliverables: "Print-ready 300 DPI PNG + Transparent PNG",
    description: "Polished, painterly bust portrait with deep chiaroscuro values and soft ambient color glows."
  },
  {
    id: "rendered-half-body",
    title: "Fully Rendered Half-Body",
    category: "Fully Rendered",
    pricePHP: 1100,
    priceLabel: "₱1,100",
    turnaround: "7 – 10 days",
    renderingLevel: "Complete color glazing, material textures (cloth, leather, metal)",
    deliverables: "Print-ready 300 DPI PNG + Transparent PNG",
    description: "Immersive painted artwork with dramatic lighting, fabric folds, and nuanced color temperature."
  },
  {
    id: "rendered-full-body",
    title: "Fully Rendered Full-Body",
    category: "Fully Rendered",
    pricePHP: 1800,
    priceLabel: "₱1,800",
    turnaround: "10 – 14 days",
    renderingLevel: "Complete full-body painting with complex costume and rim lighting",
    deliverables: "Print-ready 300 DPI PNG (4000px+) + High-res PSD / Krita file upon request",
    description: "Exhibition-grade character illustration ready for print, book covers, or personal collection."
  }
];

export const COMMISSION_ADDONS = [
  {
    name: "Simple Atmospheric Background",
    price: "+₱200",
    description: "Abstract color gradients, smoke, graphite dust, or minimal shape lighting."
  },
  {
    name: "Detailed Environment / Scene",
    price: "+₱600 – ₱1,200",
    description: "Architectural elements, foliage, room interiors, or fantasy landscapes."
  },
  {
    name: "Additional Character",
    price: "+75% of base price",
    description: "Includes interaction posing and harmonized scene lighting."
  },
  {
    name: "Commercial Rights",
    price: "+100% of base price",
    description: "For merchandise, album covers, game assets, or monetized media."
  },
  {
    name: "Priority Rush Delivery",
    price: "+50% of base price",
    description: "Guaranteed turnaround within 48–72 hours (subject to artist availability)."
  }
];

export const COMMISSION_STEPS = [
  {
    step: "01",
    title: "Inquiry & References",
    subtitle: "Share your vision",
    description: "Submit the request form or DM me on social channels with your character descriptions, visual references, moodboards, and desired deadline."
  },
  {
    step: "02",
    title: "Scope & Confirmation",
    subtitle: "Transparent quote",
    description: "We discuss composition options, finalize pricing, and agree on turnaround. A 50% deposit secures your slot on the commission board."
  },
  {
    step: "03",
    title: "Sketch & Composition Review",
    subtitle: "Two major revision rounds",
    description: "I send rough gesture sketches and anatomy placement. Here you can request major changes to pose, facial expression, and proportions."
  },
  {
    step: "04",
    title: "Rendering & Detailing",
    subtitle: "Bringing the piece to life",
    description: "I proceed with values, graphite textures, color glazing, and lighting. Minor palette adjustments can be made at this stage."
  },
  {
    step: "05",
    title: "Final Delivery",
    subtitle: "Full-resolution archival files",
    description: "Upon remaining balance payment, you receive uncompressed 300 DPI master PNG files, transparent cutouts, and web-ready crops."
  }
];

export const COMMISSION_TERMS = {
  paymentMethods: ["GCash", "Maya (PayMaya)", "PayPal (International)", "BDO / Bank Transfer"],
  deposit: "50% non-refundable deposit required before work begins; remaining 50% due upon final approval before watermarks are removed.",
  revisions: "Includes 2 rounds of revisions during the sketch stage. Subsequent major redraws after linework approval incur a 20% revision fee.",
  timeline: "Standard turnaround is 5 to 14 business days. You will receive progress updates at each milestone.",
  usageRights: "Personal commissions are for personal display, social media avatars, and non-commercial printing. For commercial merchandise, branding, or monetization, commercial rights must be selected.",
  cancellation: "If the artist cancels due to unforeseen circumstances, a 100% full refund is issued immediately. If the client cancels before sketching begins, the deposit is refunded minus processing fees."
};

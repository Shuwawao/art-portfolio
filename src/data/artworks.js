/**
 * JUSWA — Artwork Database
 * Central source of truth for all digital illustrations, studies, and commissions.
 * Easy to add, modify, or reorder artwork items.
 */

export const ARTWORKS = [
  {
    id: "the-anatomy-of-a-stroke",
    slug: "the-anatomy-of-a-stroke",
    title: "The Anatomy of a Stroke",
    subtitle: "Hero Exhibition Study",
    year: "2022",
    categories: ["Personal Artwork", "Portraits", "Character Art"],
    featured: true,
    heroCenterpiece: true,
    dimensions: "3000 × 4200 px",
    resolution: "300 DPI",
    software: "Krita",
    medium: "Digital Graphite & Oil Glazing",
    aspectRatio: 0.71,
    image: "/artworks/preview/top.jpg",
    thumbnail: "/artworks/thumbs/top.jpg",
    fullResolution: "/artworks/top.png",
    shortDescription: "The signature centerpiece exploring atmospheric value gradation, dynamic chiaroscuro, and expressive digital mark-making.",
    fullDescription: "This piece marks a pivotal turning point in my personal style: embracing the tactile, imperfect quality of traditional graphite pencil within Krita's digital environment. Rather than polishing away construction lines, the underlying anatomy and searching marks remain visible, lending emotional weight and organic texture to the composition.",
    commentary: "I wanted the viewer to feel the weight of the pencil. Even when working on a high-resolution 3000×4200 canvas, digital brushes can easily feel sterile if you don't fight against digital smoothing. In Krita, I customize my brushes to simulate the friction of heavy tooth paper.",
    story: "Created over several evening sessions where the focus was strictly on the drama between deep shadow and soft highlights. The hand-drawn grain gives the portrait an archival, physical presence.",
    processImages: [
      {
        stage: "Initial Sketch & Anatomy",
        caption: "Rough graphite guidelines and gesture measurement",
        image: "/artworks/preview/sketch-9.jpg"
      },
      {
        stage: "Final Chiaroscuro Render",
        caption: "Layered digital graphite glazing and atmospheric lighting",
        image: "/artworks/preview/top.jpg"
      }
    ],
    tags: ["Portrait", "Chiaroscuro", "Krita", "Graphite Texture", "Featured"],
    palette: ["#1A1918", "#4A4743", "#D5CFC2", "#F5F2EB", "#B9A3E3"],
    annotations: [
      { x: 34, y: 28, text: "Lost-and-found edge along the jawline" },
      { x: 62, y: 18, text: "Graphite grain texture preserved from initial pass" },
      { x: 50, y: 72, text: "Loose gestural strokes fading into negative space" }
    ]
  },
  {
    id: "chainsaw-man",
    slug: "chainsaw-man",
    title: "Denji — Chainsaw Man Study",
    subtitle: "Kinetic Character Study",
    year: "2022",
    categories: ["Character Art", "Sketches and Studies"],
    featured: true,
    heroCenterpiece: false,
    dimensions: "2700 × 3000 px",
    resolution: "300 DPI",
    software: "Krita",
    medium: "Digital Charcoal & Ink Wash",
    aspectRatio: 0.9,
    image: "/artworks/preview/chainsaw-man.jpg",
    thumbnail: "/artworks/thumbs/chainsaw-man.jpg",
    fullResolution: "/artworks/chainsaw-man.png",
    shortDescription: "Expressive character interpretation capturing raw kinetic energy, desperate resolve, and visceral linework.",
    fullDescription: "A study in translating manga movement into a textured, painted portrait. The priority was capturing movement and desperation rather than clean lineart. Heavy dry-brush strokes contrast with precise anatomical focal points.",
    commentary: "Started directly from loose gesture marks. With characters as chaotic as Denji, over-refining kills the energy. I kept the strokes broad and uninhibited.",
    story: "Denji's emotional complexity is fascinating: beneath the absurd violence is someone just clinging to ordinary human desires. The expression needed to reflect both ferocity and vulnerability.",
    processImages: [
      {
        stage: "Gesture & Framework",
        caption: "Rapid proportional sketch and dynamic angles",
        image: "/artworks/preview/sketch-9.jpg"
      },
      {
        stage: "Ink Wash & Values",
        caption: "Blocking in dark tones and visceral strokes",
        image: "/artworks/preview/chainsaw-man.jpg"
      }
    ],
    tags: ["Character Study", "Anime", "Textured Ink", "Krita", "Dynamic"],
    palette: ["#141312", "#3E3B38", "#A6A6A6", "#B9A3E3"],
    annotations: [
      { x: 42, y: 35, text: "Focal intensity: high contrast around eyes" },
      { x: 70, y: 60, text: "Aggressive pencil hatch lines indicating motion" }
    ]
  },
  {
    id: "hyakkimaru",
    slug: "hyakkimaru",
    title: "Hyakkimaru — Blade and Spirit",
    subtitle: "Dororo Character Tribute",
    year: "2022",
    categories: ["Character Art", "Portraits"],
    featured: true,
    heroCenterpiece: false,
    dimensions: "2700 × 3000 px",
    resolution: "300 DPI",
    software: "Krita",
    medium: "Digital Graphite & Atmospheric Wash",
    aspectRatio: 0.9,
    image: "/artworks/preview/hyakkimaru.jpg",
    thumbnail: "/artworks/thumbs/hyakkimaru.jpg",
    fullResolution: "/artworks/hyakkimaru.png",
    shortDescription: "Intense character portrait depicting stoic resolve, prosthetic details, and atmospheric mist.",
    fullDescription: "Hyakkimaru's journey to reclaim his humanity is one of my favorite stories. In this tribute, the prosthetic arms and sword bandages are rendered with tactile wear, while the eyes remain fixed on an unseen horizon.",
    commentary: "The contrast between the wooden prosthetic limbs and organic hair strands required balancing hard and soft brush tips. Krita's wet knife and ink pens were instrumental here.",
    story: "I wanted to capture a moment of pause amidst continuous battle. The quiet stillness before another struggle.",
    processImages: [
      {
        stage: "Linework Study",
        caption: "Precision silhouette and prosthetic joint placement",
        image: "/artworks/preview/sketch-9.jpg"
      },
      {
        stage: "Completed Illustration",
        caption: "Atmospheric dust and tonal rendering",
        image: "/artworks/preview/hyakkimaru.jpg"
      }
    ],
    tags: ["Hyakkimaru", "Dororo", "Character Art", "Graphite", "Atmospheric"],
    palette: ["#111111", "#4A4743", "#8C8880", "#F5F2EB"],
    annotations: [
      { x: 30, y: 45, text: "Weathered texture on mechanical prosthetics" },
      { x: 55, y: 22, text: "Layered hair strands with subtle graphite sheen" }
    ]
  },
  {
    id: "commission-brianna",
    slug: "commission-brianna",
    title: "Brianna — Twilight Sanctuary",
    subtitle: "Custom Character Commission",
    year: "2025",
    categories: ["Commissioned Artwork", "Character Art"],
    featured: true,
    heroCenterpiece: false,
    dimensions: "5000 × 3000 px",
    resolution: "300 DPI",
    software: "Krita",
    medium: "Full Digital Color & Environmental Painting",
    aspectRatio: 1.67,
    image: "/artworks/preview/commission-brianna.jpg",
    thumbnail: "/artworks/thumbs/commission-brianna.jpg",
    fullResolution: "/artworks/commission-brianna.png",
    shortDescription: "An expansive panoramic commission featuring cinematic ambient illumination and intricate character design.",
    fullDescription: "A commissioned piece designed for a client's original character. With a wide 5000×3000 canvas, the artwork balances intimate character storytelling with ambient environmental depth.",
    commentary: "Client commissions are collaborative dialogues. We worked through multiple thumbnail iterations to pinpoint the exact emotional tone before committing to the full render.",
    story: "The client wanted a peaceful sanctuary setting reflecting the character's journey. Careful attention was paid to the soft color temperature transition from the lavender twilight into the warm foreground accents.",
    processImages: [
      {
        stage: "Thumbnail Composition",
        caption: "Establishing 16:9 panoramic values and focal point",
        image: "/artworks/preview/sketch-9.jpg"
      },
      {
        stage: "Final Commission Deliverable",
        caption: "Full resolution rendering with environmental lighting",
        image: "/artworks/preview/commission-brianna.jpg"
      }
    ],
    tags: ["Commission", "Panoramic", "Original Character", "Cinematic", "Krita"],
    palette: ["#1B1822", "#4C4656", "#B9A3E3", "#E8E3D7"],
    annotations: [
      { x: 45, y: 50, text: "Soft rim light emphasizing costume silhouette" },
      { x: 75, y: 35, text: "Ambient twilight gradient matching client's color brief" }
    ]
  },
  {
    id: "riyouchi",
    slug: "riyouchi",
    title: "Riyouchi — Modern Solitude",
    subtitle: "Contemporary Portrait Study",
    year: "2025",
    categories: ["Portraits", "Personal Artwork"],
    featured: true,
    heroCenterpiece: false,
    dimensions: "2000 × 3000 px",
    resolution: "300 DPI",
    software: "Krita",
    medium: "Digital Paint & Lavender Undertones",
    aspectRatio: 0.67,
    image: "/artworks/preview/riyouchi.jpg",
    thumbnail: "/artworks/thumbs/riyouchi.jpg",
    fullResolution: "/artworks/riyouchi.png",
    shortDescription: "An intimate, moody vertical portrait exploring expressive gaze, textured clothing, and subtle lavender undertones.",
    fullDescription: "An ongoing fascination with modern character archetypes. Riyouchi embodies the introspective calm of late-night quiet. The focus is directed towards the micro-expressions around the eyes and mouth.",
    commentary: "I limited the color palette to deep charcoals, warm skin undertones, and our signature muted lavender accents. Restraint often yields greater emotional resonance than saturated complexity.",
    story: "A personal project examining how modern fashion silhouettes translate into painterly brush strokes.",
    processImages: [
      {
        stage: "Head Construction",
        caption: "Planes of the face and skull landmark lines",
        image: "/artworks/preview/sketch-9.jpg"
      },
      {
        stage: "Final Tonal Render",
        caption: "Tender lighting with atmospheric depth",
        image: "/artworks/preview/riyouchi.jpg"
      }
    ],
    tags: ["Portrait", "Contemporary", "Lavender Accent", "Krita", "Moody"],
    palette: ["#161514", "#48443F", "#B9A3E3", "#D9CCF5", "#F5F2EB"],
    annotations: [
      { x: 48, y: 32, text: "Subtle specular highlight on the iris" },
      { x: 60, y: 65, text: "Loose textured folds in the fabric" }
    ]
  },
  {
    id: "character",
    slug: "character",
    title: "The Wanderer — Character Silhouette",
    subtitle: "Anatomical Plane Study",
    year: "2024",
    categories: ["Character Art", "Portraits"],
    featured: true,
    heroCenterpiece: false,
    dimensions: "2800 × 3500 px",
    resolution: "300 DPI",
    software: "Krita",
    medium: "Digital Graphite & Charcoal Stipple",
    aspectRatio: 0.8,
    image: "/artworks/preview/character.jpg",
    thumbnail: "/artworks/thumbs/character.jpg",
    fullResolution: "/artworks/character.png",
    shortDescription: "Stylized portrait study emphasizing silhouette clarity and sculptural facial anatomy.",
    fullDescription: "A study created to dissect the primary planes of the human face under directional top lighting. By treating the head as interlocking sculptural facets, the rendering achieves solid dimensional volume.",
    commentary: "Anatomy is never static; it is rhythmic. In this study, I let the pencil guide lines remain visible around the jaw and collarbone to remind viewers of the underlying skeleton.",
    story: "Drawn as part of a series of weekly face studies exploring different lighting angles.",
    processImages: [
      {
        stage: "Planes of the Face",
        caption: "Asaro head inspired geometric block-in",
        image: "/artworks/preview/sketch-9.jpg"
      },
      {
        stage: "Finished Study",
        caption: "Sculptural chiaroscuro rendering",
        image: "/artworks/preview/character.jpg"
      }
    ],
    tags: ["Anatomy", "Sculptural", "Character", "Graphite", "Krita"],
    palette: ["#191817", "#4D4943", "#A6A6A6", "#E8E3D7"],
    annotations: [
      { x: 50, y: 40, text: "Clear demarcation of nasal bridge and cheek planes" }
    ]
  },
  {
    id: "mist",
    slug: "mist",
    title: "Veil of Mist",
    subtitle: "Atmospheric Sfumato Study",
    year: "2022",
    categories: ["Personal Artwork", "Portraits"],
    featured: false,
    heroCenterpiece: false,
    dimensions: "2800 × 3500 px",
    resolution: "300 DPI",
    software: "Krita",
    medium: "Digital Graphite Dust & Fog Glaze",
    aspectRatio: 0.8,
    image: "/artworks/preview/mist.jpg",
    thumbnail: "/artworks/thumbs/mist.jpg",
    fullResolution: "/artworks/mist.png",
    shortDescription: "Soft atmospheric study dissolving sharp edges into ambient fog and layered digital graphite dust.",
    fullDescription: "An exploration of sfumato—Leonardo's technique of rendering without lines or borders, in the manner of smoke. The edges of the subject gently dissolve into ambient fog.",
    commentary: "In digital art, everything defaults to being unnaturally sharp. Learning to intentionally blur, dissolve, and lose edges is the secret to atmospheric immersion.",
    story: "Inspired by damp morning mist clinging to the city rooftops outside my studio window.",
    processImages: [
      {
        stage: "Rough Sketch",
        caption: "Loose proportional marks",
        image: "/artworks/preview/sketch-9.jpg"
      },
      {
        stage: "Atmospheric Dissolve",
        caption: "Layered digital fog and edge softening",
        image: "/artworks/preview/mist.jpg"
      }
    ],
    tags: ["Sfumato", "Atmospheric", "Mist", "Portrait", "Krita"],
    palette: ["#232221", "#5C5853", "#C4BFB5", "#F5F2EB"],
    annotations: [
      { x: 38, y: 55, text: "Dissolving silhouette into atmospheric grain" }
    ]
  },
  {
    id: "sketch-study-09",
    slug: "sketch-study-09",
    title: "Anatomy & Gesture Study No. 09",
    subtitle: "Foundational Mark-Making",
    year: "2022",
    categories: ["Sketches and Studies", "Personal Artwork"],
    featured: false,
    heroCenterpiece: false,
    dimensions: "2700 × 3000 px",
    resolution: "300 DPI",
    software: "Krita",
    medium: "Raw Digital Graphite & Construction Lines",
    aspectRatio: 0.9,
    image: "/artworks/preview/sketch-9.jpg",
    thumbnail: "/artworks/thumbs/sketch-9.jpg",
    fullResolution: "/artworks/sketch-9.png",
    shortDescription: "Raw graphite construction lines and gesture exploration showing the foundational mark-making stage.",
    fullDescription: "A pure sketchbook page showcasing the unfinished, searching marks of an artist finding form. Proportions, angles, center of gravity, and anatomical landmarks drawn with raw pencil pressure.",
    commentary: "Many artists hide their sketches, but I believe the sketch is where the soul lives. It contains all the curiosity and energy before rendering sets in.",
    story: "One of dozens of sketchbook pages created during daily warm-up sessions before diving into finished client pieces.",
    processImages: [
      {
        stage: "Pencil Warm-up",
        caption: "Quick 2-minute gesture lines",
        image: "/artworks/preview/sketch-9.jpg"
      }
    ],
    tags: ["Sketch", "Process", "Construction Lines", "Graphite", "Raw"],
    palette: ["#1F1E1D", "#4A4743", "#D5CFC2", "#F5F2EB"],
    annotations: [
      { x: 50, y: 30, text: "Proportional measurement guides and center axis" },
      { x: 30, y: 65, text: "Multiple searching strokes finding dynamic gesture" }
    ]
  }
];

export const GALLERY_CATEGORIES = [
  "All Works",
  "Portraits",
  "Character Art",
  "Personal Artwork",
  "Commissioned Artwork",
  "Sketches and Studies"
];

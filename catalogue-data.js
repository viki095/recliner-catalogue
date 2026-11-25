/*
 * ============================================================
 *  RECLINER CATALOGUE DATA  —  edit this file to update the site
 * ============================================================
 *  Everything on the page comes from here. No coding needed:
 *  copy an existing block, change the text and prices, save, refresh.
 *
 *  Model names are taken from each brand's website (Nov 2026).
 *  Feature notes are short summaries: check details with the brand before quoting.
 *  ⚠ ALL PRICES ARE SAMPLE FIGURES. Replace them with your real
 *    dealer prices, then set  sampleData: false  to hide the notice.
 *
 *  Prices are in rupees, numbers only (no commas, no ₹ sign).
 *
 *  How a price is worked out:
 *    seating price (from "variants")
 *    + each chosen option's "add" × number of seats
 *    + each chosen accessory's price × number of seats
 *      (or just once, for accessories marked perSeat: false)
 * ============================================================
 */
window.CATALOGUE = {
  settings: {
    companyName: "Awicontech",
    pageTitle: "The Recliner Catalogue",
    eyebrow: "Little Nap · Seatlab · Moovia",
    // WhatsApp number clients send their shortlist to: country code + number, digits only.
    whatsappNumber: "910000000000",
    email: "sales@example.com",
    currency: "INR",
    priceNote: "Prices are tentative and exclude GST, delivery and installation. Final quote on confirmation.",
    sampleData: true,

    // Room planner rules (all in inches). Change these to suit how you plan rooms.
    planner: {
      minSideGap: 24,      // warn if a row leaves less than 2 ft on either side
      minFrontSpace: 72,   // screen wall to front row's footrests (speakers + walkway)
      rowGap: 12,          // walkway behind each reclined footrest
      rearGap: 6,          // back row to back wall
      riser: 12,           // each row behind the first is raised this much
      minHeadroom: 84,     // ceiling height left above the top riser (7 ft)
      wedgeArmAdd: 8000    // extra per seat for wedged (curved-row) arms
    }
  },

  /*
   * Brands. Each brand has its own option groups (mechanism, upholstery...)
   * because every manufacturer offers different choices.
   * The first choice in each group is the default and usually adds 0.
   */
  brands: [
    {
      id: "seatlab", name: "Seatlab", origin: "India",
      tagline: "Design-led private cinema seating, assembled to the dimensions of the room.",
      website: "https://seatlab.in",
      color: "#9C7A3C",
      // Shown in the planner's Materials step. Keys match the Upholstery / Trim choice ids.
      // Colours are SAMPLE shades: replace with the brand's real swatch names.
      materialGroups: ["uph", "trim"],
      materials: {
        boucle:   { note: "Media room",          colours: [["Ivory","#EDE6D6"],["Oat","#D6C7AA"],["Pebble","#A79E90"],["Charcoal","#46423D"]] },
        mohair:   { note: "Deep pile",           colours: [["Bottle green","#2F4A3A"],["Oxblood","#6B2A2A"],["Midnight","#1F2A44"],["Camel","#B08856"]] },
        suede:    { note: "Non-reflective",      colours: [["Graphite","#3B3A38"],["Tobacco","#7A5536"],["Slate","#5E6670"]] },
        alcantara:{ note: "Acoustically open",   colours: [["Black","#1E1E1E"],["Space grey","#5A5C60"],["Cognac","#8A5A35"]] },
        nubuck:   { note: "Brushed finish",      colours: [["Sand","#C2AD8C"],["Espresso","#4A3426"],["Storm","#5F656B"]] },
        semianil: { note: "Full-grain hide",     colours: [["Cognac","#8B4F2A"],["Chestnut","#5C3A24"],["Black","#1C1B1A"],["Taupe","#8F8070"]] },
        stripe:   { note: "Paul Smith textile",  colours: [["Signature stripe","#2E3A59,#C2412F,#E3B23C,#3F7D6E,#E9E3D6"]] },
        walnut:   { note: "Turned + oiled",      colours: [["Walnut","#5B3A24"]] },
        oak:      { note: "Veneer-matched",      colours: [["Fumed oak","#6E5A45"]] },
        brass:    { note: "Trim + inlay",        colours: [["Brushed brass","#B89257"]] }
      },
      options: [
        { id: "mech", name: "Mechanism", choices: [
          { id: "relax", name: "Relax dual motorised", add: 0 },
          { id: "fixed", name: "Fixed", add: -45000 }
        ]},
        { id: "uph", name: "Upholstery", choices: [
          { id: "boucle",   name: "Bouclé",                    add: 0 },
          { id: "mohair",   name: "Mohair velvet",             add: 18000 },
          { id: "suede",    name: "Matte suede",               add: 22000 },
          { id: "alcantara",name: "Alcantara",                 add: 30000 },
          { id: "nubuck",   name: "Nubuck",                    add: 34000 },
          { id: "semianil", name: "Semi-aniline leather",      add: 42000 },
          { id: "stripe",   name: "Signature stripe textile",  add: 38000 }
        ]},
        { id: "trim", name: "Trim", choices: [
          { id: "walnut",  name: "Walnut",        add: 0 },
          { id: "oak",     name: "Fumed oak",     add: 4000 },
          { id: "brass",   name: "Brushed brass", add: 12000 }
        ]}
      ]
    },
    {
      id: "moovia", name: "Moovia", origin: "Germany",
      tagline: "German home-cinema seating and media room sofas, built from modular elements.",
      website: "https://www.moovia.de",
      color: "#4F5E73",
      materialGroups: ["uph"],
      materials: {
        fabric:  { note: "Woven textile", colours: [["Anthracite","#3A3B3D"],["Stone","#B9B1A3"],["Ivory","#E8E2D5"],["Navy","#2A3550"],["Moss","#59624A"]] },
        leather: { note: "Full-grain hide",  colours: [["Nero","#1D1C1B"],["Midnight","#232B3A"],["Cognac","#8A5430"],["Taupe","#8C7E6E"],["Cream","#E5DCC8"]] }
      },
      options: [
        { id: "mech", name: "Motorisation", choices: [
          { id: "single", name: "Single drive", add: 0 },
          { id: "dual",   name: "Dual drive",   add: 35000 },
          { id: "triple", name: "Triple drive (motorised headrest)", add: 65000 }
        ]},
        { id: "uph", name: "Upholstery", choices: [
          { id: "fabric",  name: "Kvadrat / Dekoma fabric", add: 0 },
          { id: "leather", name: "Italian leather",         add: 55000 }
        ]},
        // armW (inches) is used by the room planner to work out row width.
        { id: "arm", name: "Armrest width", choices: [
          { id: "std",  name: "Standard", add: 0, armW: 6 },
          { id: "narrow", name: "Narrow (small rooms)", add: 0, armW: 4 },
          { id: "wide", name: "Extended", add: 18000, armW: 9 }
        ]}
      ]
    },
    {
      id: "littlenap", name: "Little Nap", origin: "India",
      tagline: "Living room, home theatre and lounger recliners, customised to the last detail.",
      website: "https://www.littlenap.in",
      color: "#A4473A",
      materialGroups: ["uph"],
      materials: {
        fabric:      { note: "Soft-touch weave",  colours: [["Beige","#CDBB9E"],["Grey","#8E8D8A"],["Navy","#2D3A55"],["Maroon","#6A2730"]] },
        leatherette: { note: "Easy-clean",        colours: [["Black","#1F1E1D"],["Brown","#5A3B28"],["Tan","#A06B3E"],["Ivory","#E7DECD"]] },
        leather:     { note: "Genuine leather",   colours: [["Black","#1D1C1B"],["Oxblood","#5E2226"],["Cognac","#8A5430"],["Grey","#6D6A66"]] }
      },
      options: [
        { id: "uph", name: "Upholstery", choices: [
          { id: "fabric",      name: "Fabric",          add: 0 },
          { id: "leatherette", name: "Leatherette",     add: 4000 },
          { id: "leather",     name: "Genuine leather", add: 16000 }
        ]}
      ]
    }
  ],

  /*
   * Accessory master list. Each model lists which ones it supports.
   * Price is per seat unless perSeat: false (charged once).
   */
  accessories: {
    // Seatlab
    "sl-console":   { name: "Centre console (13\" armrest)",       price: 38000, perSeat: false },
    "sl-cup":       { name: "Cup holder",                           price: 6500 },
    "sl-usb":       { name: "USB-C charging in armrest",            price: 5500 },
    "sl-light":     { name: "Ambient floor lighting",               price: 9000 },
    "sl-headrest":  { name: "Power headrest",                       price: 24000 },
    "sl-storage":   { name: "Armrest storage",                      price: 12000 },
    "sl-swatch":    { name: "Physical material sample kit",         price: 7500,  perSeat: false },

    // Moovia
    "mv-cup":       { name: "Cup holder (oak / walnut / steel)",    price: 9000 },
    "mv-cupgold":   { name: "Cup holder, 22k gold-plated",          price: 28000 },
    "mv-cuplight":  { name: "Cup holder lighting (RGB)",            price: 7000 },
    "mv-storage":   { name: "Armrest storage compartment",          price: 16000 },
    "mv-snackbar":  { name: "Snack bar armrest (tray, drawer, cups)", price: 85000, perSeat: false },
    "mv-sidelight": { name: "Side panel lighting",                  price: 14000 },
    "mv-floorlight":{ name: "Armrest bottom lighting",              price: 9500 },
    "mv-lumbar":    { name: "Massage + trizone lumbar support",     price: 42000 },
    "mv-hvac":      { name: "Seat heating and ventilation",         price: 58000 },
    "mv-dbox":      { name: "D-BOX motion effects",                 price: 320000 },
    "mv-chaise":    { name: "Chaise longue element",                price: 95000, perSeat: false },
    "mv-smart":     { name: "Smart home / app control",             price: 22000, perSeat: false },

    // Little Nap
    "ln-cup":       { name: "Cup holder",                           price: 1500 },
    "ln-cuppremium":{ name: "Premium cup holder",                   price: 3500 },
    "ln-backlit":   { name: "Backlit switch",                       price: 2500 },
    "ln-usb":       { name: "USB charging port",                    price: 1800 },
    "ln-tray":      { name: "Swivel tray table",                    price: 4200 },
    "ln-storage":   { name: "Armrest storage",                      price: 2500 },
    "ln-led":       { name: "LED ambient lighting",                 price: 3000 },
    "ln-headrest":  { name: "Power headrest",                       price: 7500 },
    "ln-battery":   { name: "Rechargeable battery pack",            price: 9000 },
    "ln-lamp":      { name: "Side lamp",                            price: 8500,  perSeat: false },
    "ln-mushroom":  { name: "Mushroom lamp",                        price: 6500,  perSeat: false },
    "ln-console":   { name: "Centre console",                       price: 12000, perSeat: false }
  },

  /*
   * Models.
   *   brand:       one of the brand ids above
   *   collection:  used for the "collection" filter and the drawing style
   *                (use "Home theatre", "Living room", "Media room sofa", "Lounge chair", "Lounger")
   *   variants:    seating options with their base price
   *   only:        (optional) limit a brand option group to some choices, e.g. { mech: ["fixed"] }
   *   accessories: ids from the accessory list above
   *   size:        (home theatre models) inches: seat width between arms, one arm,
 *                upright depth, reclined footprint depth, back height. Used by the room planner.
 *   image:       optional, e.g. "images/atelier.jpg". Leave "" to show a line drawing.
   */
  models: [
    // ---------------- SEATLAB ----------------
    {
      id: "sl-atelier", brand: "seatlab", code: "SL-01", name: "Atelier",
      collection: "Home theatre", profile: "highback", image: "",
      size: { seatW: 23, armW: 6.5, depth: 40, reclined: 68, height: 42 },
      description: "Precision-engineered high-back seating for private residential cinemas.",
      features: ["High-back module, 23\" wide", "Dual-motorised recline", "Armrests in 6.5\" and 13\" widths"],
      variants: [
        { name: "Single seat", seats: 1, price: 285000 },
        { name: "Straight row of 3", seats: 3, price: 830000 },
        { name: "Curved row of 4", seats: 4, price: 1120000 },
        { name: "Separated, 3 chairs", seats: 3, price: 855000 }
      ],
      accessories: ["sl-console", "sl-cup", "sl-usb", "sl-light", "sl-headrest", "sl-storage", "sl-swatch"]
    },
    {
      id: "sl-continuum", brand: "seatlab", code: "SL-02", name: "Continuum",
      collection: "Home theatre", profile: "lowback", image: "",
      size: { seatW: 33, armW: 6.5, depth: 40, reclined: 66, height: 33 },
      description: "Low-profile modular lounge seating that keeps the room and the sound field uninterrupted.",
      features: ["Low-back lounge module, 39\" wide", "Same dual-motorised mechanism", "Supplied joined or as separate units"],
      variants: [
        { name: "Single lounge module", seats: 1, price: 310000 },
        { name: "Joined pair", seats: 2, price: 600000 },
        { name: "Joined row of 3", seats: 3, price: 880000 }
      ],
      accessories: ["sl-console", "sl-cup", "sl-usb", "sl-light", "sl-storage", "sl-swatch"]
    },
    {
      id: "sl-monolith", brand: "seatlab", code: "SL-03", name: "Monolith",
      collection: "Home theatre", profile: "deep", image: "",
      size: { seatW: 26, armW: 6.5, depth: 42, reclined: 72, height: 43 },
      description: "Deep seats and generous width for long screenings.",
      features: ["Deep, wide seat", "Dual-motorised recline", "Made in standard and custom widths"],
      variants: [
        { name: "Single seat", seats: 1, price: 325000 },
        { name: "Straight row of 3", seats: 3, price: 950000 },
        { name: "Curved row of 4", seats: 4, price: 1270000 }
      ],
      accessories: ["sl-console", "sl-cup", "sl-usb", "sl-light", "sl-headrest", "sl-storage", "sl-swatch"]
    },
    {
      id: "sl-muse", brand: "seatlab", code: "SL-04", name: "Muse",
      collection: "Home theatre", profile: "highback", image: "",
      size: { seatW: 23, armW: 6.5, depth: 40, reclined: 68, height: 42 },
      description: "Tailored in signature Paul Smith textiles, where bold colour meets exacting craft.",
      features: ["Paul Smith textile upholstery", "Dual-motorised recline", "Hand-finished"],
      variants: [
        { name: "Single seat", seats: 1, price: 345000 },
        { name: "Straight row of 3", seats: 3, price: 1010000 }
      ],
      only: { uph: ["stripe"] },
      accessories: ["sl-console", "sl-cup", "sl-usb", "sl-light", "sl-storage", "sl-swatch"]
    },

    // ---------------- MOOVIA : home theatre seating ----------------
    {
      id: "mv-rome", brand: "moovia", code: "MV-ROME", name: "Rome",
      collection: "Home theatre", profile: "highback", image: "images/models/mv-rome.jpg",
      size: { seatW: 24, armW: 6, depth: 41, reclined: 70, height: 43 },
      description: "Home theatre seat from the moovia® collection, built from sectional elements.",
      features: ["Modular: straight or curved rows", "Adjustable head-, back- and footrest", "Recliner or space-saving incliner"],
      variants: [
        { name: "Single seat", seats: 1, price: 420000 },
        { name: "Row of 2", seats: 2, price: 820000 },
        { name: "Row of 3", seats: 3, price: 1210000 },
        { name: "Row of 4", seats: 4, price: 1590000 }
      ],
      accessories: ["mv-cup", "mv-cupgold", "mv-cuplight", "mv-storage", "mv-snackbar", "mv-sidelight", "mv-floorlight", "mv-lumbar", "mv-hvac", "mv-dbox", "mv-smart"]
    },
    {
      id: "mv-venice", brand: "moovia", code: "MV-VENICE", name: "Venice",
      collection: "Home theatre", profile: "highback", image: "",
      size: { seatW: 24, armW: 6, depth: 41, reclined: 70, height: 43 },
      description: "Home theatre seat from the moovia® collection, built from sectional elements.",
      features: ["Modular: straight or curved rows", "Adjustable head-, back- and footrest", "Choice of armrest widths"],
      variants: [
        { name: "Single seat", seats: 1, price: 455000 },
        { name: "Row of 2", seats: 2, price: 890000 },
        { name: "Row of 3", seats: 3, price: 1310000 },
        { name: "Row of 4", seats: 4, price: 1720000 }
      ],
      accessories: ["mv-cup", "mv-cupgold", "mv-cuplight", "mv-storage", "mv-snackbar", "mv-sidelight", "mv-floorlight", "mv-lumbar", "mv-hvac", "mv-dbox", "mv-smart"]
    },
    {
      id: "mv-chesterfield", brand: "moovia", code: "MV-CHESTER", name: "Chesterfield",
      collection: "Home theatre", profile: "deep", image: "",
      size: { seatW: 25, armW: 7, depth: 42, reclined: 71, height: 40 },
      description: "Classic Chesterfield styling with modern home cinema functions.",
      features: ["Chesterfield styling", "Motorised recline", "Modular rows"],
      variants: [
        { name: "Single seat", seats: 1, price: 495000 },
        { name: "Row of 2", seats: 2, price: 970000 },
        { name: "Row of 3", seats: 3, price: 1430000 }
      ],
      accessories: ["mv-cup", "mv-cupgold", "mv-cuplight", "mv-storage", "mv-sidelight", "mv-floorlight", "mv-lumbar", "mv-hvac", "mv-smart"]
    },
    {
      id: "mv-marbella", brand: "moovia", code: "MV-MARBELLA", name: "Marbella",
      collection: "Home theatre", profile: "lowback", image: "images/models/mv-marbella.jpg",
      size: { seatW: 24, armW: 6, depth: 41, reclined: 70, height: 36 },
      description: "Offered both as home theatre seating and as a media room sofa.",
      features: ["Seat or sofa configuration", "Motorised recline", "Moodboard finishes available"],
      variants: [
        { name: "Single seat", seats: 1, price: 440000 },
        { name: "Row of 3", seats: 3, price: 1270000 }
      ],
      accessories: ["mv-cup", "mv-cuplight", "mv-storage", "mv-sidelight", "mv-floorlight", "mv-lumbar", "mv-hvac", "mv-chaise", "mv-smart"]
    },
    {
      id: "mv-dallas", brand: "moovia", code: "MV-DALLAS", name: "Dallas",
      collection: "Home theatre", profile: "highback", image: "",
      size: { seatW: 24, armW: 6, depth: 41, reclined: 70, height: 43 },
      description: "Home theatre seat from the moovia® collection, built from sectional elements.",
      features: ["Modular: straight or curved rows", "Motorised recline", "Choice of armrest widths"],
      variants: [
        { name: "Single seat", seats: 1, price: 380000 },
        { name: "Row of 3", seats: 3, price: 1100000 },
        { name: "Row of 4", seats: 4, price: 1450000 }
      ],
      accessories: ["mv-cup", "mv-cuplight", "mv-storage", "mv-snackbar", "mv-floorlight", "mv-lumbar", "mv-hvac", "mv-dbox", "mv-smart"]
    },
    {
      id: "mv-stockholm", brand: "moovia", code: "MV-STOCKHOLM", name: "Stockholm",
      collection: "Home theatre", profile: "highback", image: "",
      size: { seatW: 24, armW: 6, depth: 41, reclined: 70, height: 43 },
      description: "Home theatre seat from the moovia® collection, built from sectional elements.",
      features: ["Modular: straight or curved rows", "Motorised recline", "Ambient lighting options"],
      variants: [
        { name: "Single seat", seats: 1, price: 410000 },
        { name: "Row of 3", seats: 3, price: 1190000 },
        { name: "Row of 4", seats: 4, price: 1560000 }
      ],
      accessories: ["mv-cup", "mv-cupgold", "mv-cuplight", "mv-storage", "mv-snackbar", "mv-sidelight", "mv-floorlight", "mv-lumbar", "mv-hvac", "mv-dbox", "mv-smart"]
    },
    {
      id: "mv-ibiza", brand: "moovia", code: "MV-IBIZA", name: "Ibiza",
      collection: "Home theatre", profile: "lowback", image: "",
      size: { seatW: 24, armW: 6, depth: 41, reclined: 70, height: 36 },
      description: "Home theatre seat from the moovia® collection, built from sectional elements.",
      features: ["Modular rows", "Motorised recline", "Chaise longue option"],
      variants: [
        { name: "Single seat", seats: 1, price: 395000 },
        { name: "Row of 3", seats: 3, price: 1150000 }
      ],
      accessories: ["mv-cup", "mv-cuplight", "mv-storage", "mv-floorlight", "mv-lumbar", "mv-hvac", "mv-chaise", "mv-smart"]
    },
    {
      id: "mv-milano", brand: "moovia", code: "MV-MILANO", name: "Milano",
      collection: "Home theatre", profile: "lowback", image: "images/models/mv-milano.jpg",
      size: { seatW: 24, armW: 6, depth: 41, reclined: 70, height: 36 },
      description: "Offered both as home theatre seating and as a media room sofa.",
      features: ["Seat or sofa configuration", "Motorised recline", "Moodboard finishes available"],
      variants: [
        { name: "Single seat", seats: 1, price: 430000 },
        { name: "Row of 3", seats: 3, price: 1250000 }
      ],
      accessories: ["mv-cup", "mv-cuplight", "mv-storage", "mv-sidelight", "mv-floorlight", "mv-lumbar", "mv-hvac", "mv-chaise", "mv-smart"]
    },
    {
      id: "mv-boston", brand: "moovia", code: "MV-BOSTON", name: "Boston",
      collection: "Home theatre", profile: "highback", image: "",
      size: { seatW: 24, armW: 6, depth: 41, reclined: 70, height: 43 },
      description: "Home theatre seat from the moovia® collection, built from sectional elements.",
      features: ["Modular: straight or curved rows", "Motorised recline", "Storage and cup holder options"],
      variants: [
        { name: "Single seat", seats: 1, price: 365000 },
        { name: "Row of 3", seats: 3, price: 1060000 },
        { name: "Row of 4", seats: 4, price: 1400000 }
      ],
      accessories: ["mv-cup", "mv-cuplight", "mv-storage", "mv-snackbar", "mv-floorlight", "mv-lumbar", "mv-hvac", "mv-dbox", "mv-smart"]
    },
    {
      id: "mv-berlin", brand: "moovia", code: "MV-BERLIN", name: "Berlin",
      collection: "Home theatre", profile: "highback", image: "",
      size: { seatW: 24, armW: 6, depth: 41, reclined: 70, height: 43 },
      description: "Home theatre seat from the moovia® collection, built from sectional elements.",
      features: ["Modular: straight or curved rows", "Motorised recline", "Choice of armrest widths"],
      variants: [
        { name: "Single seat", seats: 1, price: 350000 },
        { name: "Row of 3", seats: 3, price: 1020000 },
        { name: "Row of 4", seats: 4, price: 1340000 }
      ],
      accessories: ["mv-cup", "mv-cuplight", "mv-storage", "mv-snackbar", "mv-floorlight", "mv-lumbar", "mv-hvac", "mv-dbox", "mv-smart"]
    },

    // ---------------- MOOVIA : media room sofas ----------------
    {
      id: "mv-lyon", brand: "moovia", code: "MV-LYON", name: "Lyon",
      collection: "Media room sofa", profile: "sofa", image: "",
      description: "Media room sofa combining a traditional look with motorised functions.",
      features: ["Sofa for living and media rooms", "Motorised recline seats", "Chaise longue option"],
      variants: [
        { name: "2 seater sofa", seats: 2, price: 690000 },
        { name: "3 seater sofa", seats: 3, price: 990000 }
      ],
      accessories: ["mv-cup", "mv-cuplight", "mv-storage", "mv-floorlight", "mv-lumbar", "mv-chaise", "mv-smart"]
    },
    {
      id: "mv-alpha", brand: "moovia", code: "MV-ALPHA", name: "Alpha",
      collection: "Media room sofa", profile: "sofa", image: "",
      description: "Media room sofa combining a traditional look with motorised functions.",
      features: ["Sofa for living and media rooms", "Motorised recline seats", "Chaise longue option"],
      variants: [
        { name: "2 seater sofa", seats: 2, price: 640000 },
        { name: "3 seater sofa", seats: 3, price: 920000 }
      ],
      accessories: ["mv-cup", "mv-cuplight", "mv-storage", "mv-floorlight", "mv-lumbar", "mv-chaise", "mv-smart"]
    },
    {
      id: "mv-budapest", brand: "moovia", code: "MV-BUDAPEST", name: "Budapest",
      collection: "Media room sofa", profile: "sofa", image: "",
      description: "Media room sofa combining a traditional look with motorised functions.",
      features: ["Sofa for living and media rooms", "Motorised recline seats", "Modular layout"],
      variants: [
        { name: "2 seater sofa", seats: 2, price: 610000 },
        { name: "3 seater sofa", seats: 3, price: 880000 }
      ],
      accessories: ["mv-cup", "mv-cuplight", "mv-storage", "mv-floorlight", "mv-lumbar", "mv-chaise", "mv-smart"]
    },
    {
      id: "mv-oslo", brand: "moovia", code: "MV-OSLO", name: "Oslo",
      collection: "Media room sofa", profile: "sofa", image: "",
      description: "Media room sofa combining a traditional look with motorised functions.",
      features: ["Sofa for living and media rooms", "Motorised recline seats", "Moodboard finishes available"],
      variants: [
        { name: "2 seater sofa", seats: 2, price: 660000 },
        { name: "3 seater sofa", seats: 3, price: 950000 }
      ],
      accessories: ["mv-cup", "mv-cuplight", "mv-storage", "mv-floorlight", "mv-lumbar", "mv-chaise", "mv-smart"]
    },

    // ---------------- MOOVIA : lounge chairs ----------------
    {
      id: "mv-cannes", brand: "moovia", code: "MV-CANNES", name: "Cannes",
      collection: "Lounge chair", profile: "lowback", image: "",
      description: "Media room chair for listening rooms, lobbies and lounges.",
      features: ["Stand-alone lounge chair", "For listening rooms and lounges"],
      variants: [ { name: "Chair", seats: 1, price: 290000 } ],
      only: { mech: ["single"], arm: ["std"] },
      accessories: ["mv-cup", "mv-storage", "mv-lumbar"]
    },
    {
      id: "mv-copenhagen", brand: "moovia", code: "MV-COPENHAGEN", name: "Copenhagen",
      collection: "Lounge chair", profile: "lowback", image: "",
      description: "Media room chair for listening rooms, lobbies and lounges.",
      features: ["Stand-alone lounge chair", "For listening rooms and lounges"],
      variants: [ { name: "Chair", seats: 1, price: 270000 } ],
      only: { mech: ["single"], arm: ["std"] },
      accessories: ["mv-cup", "mv-storage", "mv-lumbar"]
    },
    {
      id: "mv-monaco", brand: "moovia", code: "MV-MONACO", name: "Monaco",
      collection: "Lounge chair", profile: "highback", image: "",
      description: "Media room chair for listening rooms, lobbies and lounges.",
      features: ["Stand-alone lounge chair", "For listening rooms and lounges"],
      variants: [ { name: "Chair", seats: 1, price: 310000 } ],
      only: { mech: ["single"], arm: ["std"] },
      accessories: ["mv-cup", "mv-storage", "mv-lumbar"]
    },

    // ---------------- LITTLE NAP : living room ----------------
    {
      id: "ln-otium", brand: "littlenap", code: "LN-OTIUM", name: "Otium",
      collection: "Living room", profile: "highback", image: "",
      description: "Manual single-seater living room recliner.",
      features: ["Manual recline", "Single seater"],
      variants: [ { name: "1 seater", seats: 1, price: 32000 } ],
      accessories: ["ln-cup", "ln-storage", "ln-lamp"]
    },
    {
      id: "ln-swift", brand: "littlenap", code: "LN-SWIFT", name: "Swift",
      collection: "Living room", profile: "highback", image: "",
      description: "Manual single-seater living room recliner.",
      features: ["Manual recline", "Single seater"],
      variants: [ { name: "1 seater", seats: 1, price: 29000 } ],
      accessories: ["ln-cup", "ln-storage", "ln-lamp"]
    },
    {
      id: "ln-urbania", brand: "littlenap", code: "LN-URBANIA", name: "Urbania",
      collection: "Living room", profile: "highback", image: "",
      description: "Manual single-seater living room recliner.",
      features: ["Manual recline", "Single seater"],
      variants: [ { name: "1 seater", seats: 1, price: 34000 } ],
      accessories: ["ln-cup", "ln-storage", "ln-lamp"]
    },
    {
      id: "ln-quotium", brand: "littlenap", code: "LN-QUOTIUM", name: "Quotium",
      collection: "Living room", profile: "highback", image: "",
      description: "Manual single-seater living room recliner.",
      features: ["Manual recline", "Single seater"],
      variants: [ { name: "1 seater", seats: 1, price: 36000 } ],
      accessories: ["ln-cup", "ln-storage", "ln-lamp"]
    },
    {
      id: "ln-versatil", brand: "littlenap", code: "LN-VERSATIL", name: "Versatil",
      collection: "Living room", profile: "highback", image: "",
      description: "Motorised single-seater living room recliner.",
      features: ["Motorised recline", "Single seater"],
      variants: [ { name: "1 seater", seats: 1, price: 52000 } ],
      accessories: ["ln-cup", "ln-backlit", "ln-usb", "ln-storage", "ln-headrest", "ln-battery", "ln-lamp"]
    },
    {
      id: "ln-nirvana", brand: "littlenap", code: "LN-NIRVANA", name: "Nirvana",
      collection: "Living room", profile: "highback", image: "",
      description: "Motorised single-seater recliner with swivel and glide.",
      features: ["Motorised recline", "Swivel glider", "Single seater"],
      variants: [ { name: "1 seater", seats: 1, price: 64000 } ],
      accessories: ["ln-cup", "ln-backlit", "ln-usb", "ln-headrest", "ln-battery", "ln-lamp"]
    },
    {
      id: "ln-quies", brand: "littlenap", code: "LN-QUIES", name: "Quies",
      collection: "Living room", profile: "highback", image: "",
      description: "Single-seater recliner, available in manual and motorised versions.",
      features: ["Manual or motorised", "Single seater"],
      variants: [ { name: "1 seater, manual", seats: 1, price: 38000 }, { name: "1 seater, motorised", seats: 1, price: 56000 } ],
      accessories: ["ln-cup", "ln-backlit", "ln-usb", "ln-storage", "ln-headrest", "ln-battery", "ln-lamp"]
    },
    {
      id: "ln-helios", brand: "littlenap", code: "LN-HELIOS", name: "Helios",
      collection: "Living room", profile: "highback", image: "",
      description: "Motorised recliner, also available with pocket springs or as a swivel glider.",
      features: ["Motorised recline", "Pocket-spring and swivel glider versions"],
      variants: [ { name: "1 seater", seats: 1, price: 58000 }, { name: "1 seater, pocket spring", seats: 1, price: 64000 }, { name: "1 seater, swivel glider", seats: 1, price: 69000 } ],
      accessories: ["ln-cup", "ln-backlit", "ln-usb", "ln-storage", "ln-headrest", "ln-battery", "ln-lamp"]
    },
    {
      id: "ln-galaxy", brand: "littlenap", code: "LN-GALAXY", name: "Galaxy",
      collection: "Living room", profile: "highback", image: "",
      description: "Living room recliner.",
      features: ["Living room recliner"],
      variants: [ { name: "1 seater", seats: 1, price: 48000 } ],
      accessories: ["ln-cup", "ln-backlit", "ln-usb", "ln-storage", "ln-lamp"]
    },
    {
      id: "ln-avion", brand: "littlenap", code: "LN-AVION", name: "Avion",
      collection: "Living room", profile: "sofa", image: "",
      description: "Recliner sofa available as two- and three-seaters.",
      features: ["Manual or motorised", "2 and 3 seater sofas"],
      variants: [ { name: "1 seater", seats: 1, price: 46000 }, { name: "2 seater", seats: 2, price: 88000 }, { name: "3 seater", seats: 3, price: 126000 } ],
      accessories: ["ln-cup", "ln-backlit", "ln-usb", "ln-storage", "ln-headrest", "ln-led", "ln-console"]
    },
    {
      id: "ln-livo", brand: "littlenap", code: "LN-LIVO", name: "Livo",
      collection: "Living room", profile: "highback", image: "",
      description: "Living room recliner.",
      features: ["Living room recliner"],
      variants: [ { name: "1 seater", seats: 1, price: 44000 } ],
      accessories: ["ln-cup", "ln-usb", "ln-storage", "ln-lamp"]
    },
    {
      id: "ln-amet", brand: "littlenap", code: "LN-AMET", name: "Amet",
      collection: "Living room", profile: "highback", image: "",
      description: "Living room recliner.",
      features: ["Living room recliner"],
      variants: [ { name: "1 seater", seats: 1, price: 42000 } ],
      accessories: ["ln-cup", "ln-usb", "ln-storage", "ln-lamp"]
    },
    {
      id: "ln-adore", brand: "littlenap", code: "LN-ADORE", name: "Adore",
      collection: "Living room", profile: "highback", image: "",
      description: "Recliner chair.",
      features: ["Recliner chair"],
      variants: [ { name: "1 seater", seats: 1, price: 47000 } ],
      accessories: ["ln-cup", "ln-usb", "ln-storage", "ln-lamp"]
    },

    // ---------------- LITTLE NAP : home theatre & multiplex ----------------
    {
      id: "ln-crescent", brand: "littlenap", code: "LN-CRESCENT", name: "Crescent",
      collection: "Home theatre", profile: "highback", image: "",
      size: { seatW: 22, armW: 7, depth: 39, reclined: 66, height: 41 },
      description: "Home theatre recliner for private cinemas.",
      features: ["Home theatre seating", "Single seats or rows"],
      variants: [ { name: "1 seater", seats: 1, price: 92000 }, { name: "Row of 2", seats: 2, price: 178000 }, { name: "Row of 3", seats: 3, price: 262000 }, { name: "Row of 4", seats: 4, price: 344000 } ],
      accessories: ["ln-cuppremium", "ln-backlit", "ln-usb", "ln-tray", "ln-storage", "ln-led", "ln-headrest", "ln-console"]
    },
    {
      id: "ln-millor", brand: "littlenap", code: "LN-MILLOR", name: "Millor",
      collection: "Home theatre", profile: "highback", image: "",
      size: { seatW: 22, armW: 7, depth: 39, reclined: 66, height: 41 },
      description: "Home theatre recliner.",
      features: ["Home theatre seating", "Single seats or rows"],
      variants: [ { name: "1 seater", seats: 1, price: 98000 }, { name: "Row of 3", seats: 3, price: 282000 }, { name: "Row of 4", seats: 4, price: 370000 } ],
      accessories: ["ln-cuppremium", "ln-backlit", "ln-usb", "ln-tray", "ln-storage", "ln-led", "ln-headrest", "ln-console"]
    },
    {
      id: "ln-ritz", brand: "littlenap", code: "LN-RITZ", name: "Ritz",
      collection: "Home theatre", profile: "deep", image: "",
      size: { seatW: 24, armW: 7, depth: 41, reclined: 69, height: 41 },
      description: "Home theatre seating.",
      features: ["Home theatre seating", "Single seats or rows"],
      variants: [ { name: "1 seater", seats: 1, price: 115000 }, { name: "Row of 3", seats: 3, price: 332000 }, { name: "Row of 4", seats: 4, price: 436000 } ],
      accessories: ["ln-cuppremium", "ln-backlit", "ln-usb", "ln-tray", "ln-storage", "ln-led", "ln-headrest", "ln-console"]
    },
    {
      id: "ln-verve", brand: "littlenap", code: "LN-VERVE", name: "Verve",
      collection: "Home theatre", profile: "highback", image: "",
      size: { seatW: 22, armW: 7, depth: 39, reclined: 66, height: 41 },
      description: "Theatre recliner.",
      features: ["Home theatre seating", "Single seats or rows"],
      variants: [ { name: "1 seater", seats: 1, price: 86000 }, { name: "Row of 3", seats: 3, price: 248000 } ],
      accessories: ["ln-cuppremium", "ln-backlit", "ln-usb", "ln-tray", "ln-storage", "ln-led", "ln-console"]
    },
    {
      id: "ln-primus", brand: "littlenap", code: "LN-PRIMUS", name: "Primus",
      collection: "Home theatre", profile: "highback", image: "",
      size: { seatW: 22, armW: 7, depth: 39, reclined: 66, height: 41 },
      description: "Theatre recliner.",
      features: ["Home theatre seating", "Single seats or rows"],
      variants: [ { name: "1 seater", seats: 1, price: 104000 }, { name: "Row of 3", seats: 3, price: 300000 } ],
      accessories: ["ln-cuppremium", "ln-backlit", "ln-usb", "ln-tray", "ln-storage", "ln-led", "ln-headrest", "ln-console"]
    },
    {
      id: "ln-aderia", brand: "littlenap", code: "LN-ADERIA", name: "Aderia",
      collection: "Home theatre", profile: "lowback", image: "",
      size: { seatW: 22, armW: 7, depth: 39, reclined: 66, height: 34 },
      description: "Modern recliner.",
      features: ["Home theatre seating"],
      variants: [ { name: "1 seater", seats: 1, price: 88000 }, { name: "Row of 3", seats: 3, price: 254000 } ],
      accessories: ["ln-cuppremium", "ln-backlit", "ln-usb", "ln-tray", "ln-storage", "ln-led", "ln-console"]
    },
    {
      id: "ln-ebony", brand: "littlenap", code: "LN-EBONY", name: "Ebony",
      collection: "Home theatre", profile: "deep", image: "",
      size: { seatW: 24, armW: 7, depth: 41, reclined: 69, height: 41 },
      description: "Ultra-premium multiplex recliner, also suited to large private theatres.",
      features: ["Multiplex grade", "Home theatre seating", "Single seats or rows"],
      variants: [ { name: "1 seater", seats: 1, price: 128000 }, { name: "Row of 4", seats: 4, price: 488000 } ],
      accessories: ["ln-cuppremium", "ln-backlit", "ln-usb", "ln-tray", "ln-led", "ln-headrest", "ln-console"]
    },

    // ---------------- LITTLE NAP : loungers ----------------
    {
      id: "ln-lunar", brand: "littlenap", code: "LN-LUNAR", name: "Lunar Lounger",
      collection: "Lounger", profile: "lounger", image: "",
      description: "Premium motorised lounger.",
      features: ["Motorised", "Lounger format"],
      variants: [ { name: "Lounger", seats: 1, price: 96000 } ],
      accessories: ["ln-cuppremium", "ln-backlit", "ln-usb", "ln-battery", "ln-mushroom"]
    },
    {
      id: "ln-versatil-lounger", brand: "littlenap", code: "LN-VERSATIL-L", name: "Versatil Lounger",
      collection: "Lounger", profile: "lounger", image: "",
      description: "Lounger version of the Versatil.",
      features: ["Lounger format"],
      variants: [ { name: "Lounger", seats: 1, price: 82000 } ],
      accessories: ["ln-cup", "ln-backlit", "ln-usb", "ln-battery", "ln-mushroom"]
    }
  ]
};

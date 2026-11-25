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
    eyebrow: "Home cinema seating",
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
      // "Tap + on the recliner" in the planner. x / y place each + on the drawing (percent).
      // one: true = pick one option (or none); otherwise any number can be switched on.
      touchpoints: [
        { id: "table",   name: "Tables",        x: 69, y: 39, one: true,  items: ["ln-t-swivel", "ln-t-ipad", "ln-t-clad"] },
        { id: "switch",  name: "Controls",      x: 60, y: 52, one: true,  items: ["ln-s-4btn", "ln-s-backlit", "ln-s-metal", "ln-s-round", "ln-s-remote", "ln-s-touch", "ln-s-usb", "ln-s-dual", "ln-s-hidden"] },
        { id: "comfort", name: "Comfort",       x: 31, y: 30, one: false, items: ["ln-c-sensor", "ln-c-warmer", "ln-c-massage", "ln-c-vent"] },
        { id: "foot",    name: "Footrest",      x: 82, y: 66, one: false, items: ["ln-footlight"] },
        { id: "cup",     name: "Cup holders",   x: 44, y: 38, one: true,  items: ["ln-g-light", "ln-g-rev", "ln-g-touch", "ln-g-gun", "ln-g-chrome", "ln-g-chiller", "ln-g-dual", "ln-g-massager"] },
        { id: "usb",     name: "USB",           x: 50, y: 52, one: true,  items: ["ln-u-popup", "ln-u-silver", "ln-u-black"] },
        { id: "battery", name: "Battery",       x: 50, y: 80, one: false, items: ["ln-battery"] }
      ],
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
    },
    {
      id: "cineak", name: "Cineak", origin: "Belgium",
      tagline: "Luxury private cinema seating, found in screening rooms worldwide. Designs by Kim Hellemans.",
      website: "https://cineak.com/home-theater/models/",
      color: "#5B5550",
      materialGroups: ["uph", "stitch"],
      materials: {
        fabric:  { note: "Designer textile",  colours: [["Graphite","#3C3B3A"],["Flint","#77726B"],["Oyster","#CFC6B8"],["Ink","#252C3A"],["Bordeaux","#5A1F26"]] },
        suede:   { note: "Soft microfibre",   colours: [["Charcoal","#36342F"],["Mocha","#6A4C3A"],["Sage","#7D8571"]] },
        leather: { note: "Top-grain leather", colours: [["Black","#1A1918"],["Espresso","#3E2A20"],["Cognac","#8A532C"],["Stone","#A39A8D"],["Ivory","#E6DDCC"]] },
        std:     { note: "Tone-on-tone",      colours: [] },
        contrast:{ note: "Double, contrast",  colours: [] },
        diamond: { note: "Quilted",           colours: [] }
      },
      options: [
        { id: "mech", name: "Mechanism", choices: [
          { id: "dual",   name: "Dual-motorised Relax", add: 0 },
          { id: "triple", name: "Triple-motorised (back height + headrest)", add: 0 },
          { id: "tilt",   name: "Mechanical tilting backrest", add: 0 }
        ]},
        { id: "uph", name: "Upholstery", choices: [
          { id: "fabric",  name: "Fabric",            add: 0 },
          { id: "suede",   name: "Ultrasuede",        add: 45000 },
          { id: "leather", name: "Top-grain leather", add: 90000 }
        ]},
        { id: "stitch", name: "Stitching", choices: [
          { id: "std",      name: "Standard",          add: 0 },
          { id: "contrast", name: "Contrast stitching", add: 15000 },
          { id: "diamond",  name: "Diamond quilting",   add: 38000 }
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

    // Little Nap touchpoints (littlenap.in/home-theater-recliners, "Customize Your Comfort")
    "ln-t-swivel":  { name: "Swivel table",                      price: 6500 },
    "ln-t-ipad":    { name: "iPad table",                        price: 9500 },
    "ln-t-clad":    { name: "Swivel table with cladding",        price: 8500 },
    "ln-s-4btn":    { name: "4-button metal switch",             price: 2500 },
    "ln-s-backlit": { name: "Backlit switch",                    price: 3000 },
    "ln-s-metal":   { name: "Metal switch",                      price: 2000 },
    "ln-s-round":   { name: "Black round switch",                price: 1500 },
    "ln-s-remote":  { name: "Backlit remote",                    price: 4500 },
    "ln-s-touch":   { name: "Touch sensor",                      price: 3500 },
    "ln-s-usb":     { name: "USB backlit switch",                price: 3500 },
    "ln-s-dual":    { name: "Dual-motor backlit switch",         price: 4000 },
    "ln-s-hidden":  { name: "Hidden sensor",                     price: 4000 },
    "ln-c-sensor":  { name: "Seat sensor",                       price: 3000 },
    "ln-c-warmer":  { name: "Seat warmer",                       price: 9000 },
    "ln-c-massage": { name: "Back massage",                      price: 12000 },
    "ln-c-vent":    { name: "Ventilated seat",                   price: 14000 },
    "ln-footlight": { name: "Lighted footrest",                  price: 4500 },
    "ln-g-light":   { name: "Lighted glass holder",              price: 2500 },
    "ln-g-rev":     { name: "Reversible cup holder",             price: 2000 },
    "ln-g-touch":   { name: "Touch glass holder",                price: 3000 },
    "ln-g-gun":     { name: "Gunmetal glass holder",             price: 2500 },
    "ln-g-chrome":  { name: "Chrome glass holder",               price: 1500 },
    "ln-g-chiller": { name: "Chiller glass holder",              price: 9000 },
    "ln-g-dual":    { name: "Dual-motor glass holder",           price: 3500 },
    "ln-g-massager":{ name: "Massager glass holder",             price: 3500 },
    "ln-u-popup":   { name: "Pop-up USB port",                   price: 3500 },
    "ln-u-silver":  { name: "USB port (silver)",                 price: 1500 },
    "ln-u-black":   { name: "USB port (black)",                  price: 1500 },
    "ln-battery":   { name: "Battery backup",                       price: 9000 },
    "ln-lamp":      { name: "Side lamp",                            price: 8500,  perSeat: false },
    "ln-mushroom":  { name: "Mushroom lamp",                        price: 6500,  perSeat: false },
    "ln-console":   { name: "Centre console",                       price: 12000, perSeat: false },
    // Cineak
    "cn-cup":       { name: "Cup holder, leather-wrapped",          price: 14000 },
    "cn-tray":      { name: "Swivel tray table",                    price: 32000 },
    "cn-usb":       { name: "USB-C charging",                       price: 8000 },
    "cn-light":     { name: "LED floor lighting",                   price: 12000 },
    "cn-console":   { name: "Storage console between seats",        price: 65000, perSeat: false },
    "cn-club":      { name: "CLUB stool (low or high swivel)",      price: 120000, perSeat: false },
    "cn-bond":      { name: "BOND stool (low or high swivel)",      price: 110000, perSeat: false },
    "cn-swatch":    { name: "Leather and fabric sample kit",        price: 9000,  perSeat: false }
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
      collection: "Home theatre", profile: "highback", image: "images/models/mv-venice.jpg",
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
      collection: "Home theatre", profile: "deep", image: "images/models/mv-chesterfield.png",
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
      collection: "Home theatre", profile: "highback", image: "images/models/mv-dallas.jpg",
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
      collection: "Home theatre", profile: "highback", image: "images/models/mv-stockholm.jpg",
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
      collection: "Home theatre", profile: "lowback", image: "images/models/mv-ibiza.jpg",
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
      collection: "Home theatre", profile: "highback", image: "images/models/mv-boston.jpg",
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
      collection: "Home theatre", profile: "highback", image: "images/models/mv-berlin.jpg",
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
      accessories: ["ln-t-swivel", "ln-t-ipad", "ln-t-clad", "ln-s-4btn", "ln-s-backlit", "ln-s-metal", "ln-s-round", "ln-s-remote", "ln-s-touch", "ln-s-usb", "ln-s-dual", "ln-s-hidden", "ln-c-sensor", "ln-c-warmer", "ln-c-massage", "ln-c-vent", "ln-footlight", "ln-g-light", "ln-g-rev", "ln-g-touch", "ln-g-gun", "ln-g-chrome", "ln-g-chiller", "ln-g-dual", "ln-g-massager", "ln-u-popup", "ln-u-silver", "ln-u-black", "ln-battery", "ln-headrest", "ln-console"]
    },
    {
      id: "ln-millor", brand: "littlenap", code: "LN-MILLOR-NX", name: "Millor-NX",
      collection: "Home theatre", profile: "highback", image: "images/models/ln-millor.jpg",
      size: { seatW: 22, armW: 7, depth: 39, reclined: 66, height: 41 },
      description: "Redefines the Millor with a distinctive three-layered back, blending its timeless style with modern technology.",
      features: ["Three-layered back", "Single seats or rows"],
      variants: [ { name: "1 seater", seats: 1, price: 98000 }, { name: "Row of 3", seats: 3, price: 282000 }, { name: "Row of 4", seats: 4, price: 370000 } ],
      accessories: ["ln-t-swivel", "ln-t-ipad", "ln-t-clad", "ln-s-4btn", "ln-s-backlit", "ln-s-metal", "ln-s-round", "ln-s-remote", "ln-s-touch", "ln-s-usb", "ln-s-dual", "ln-s-hidden", "ln-c-sensor", "ln-c-warmer", "ln-c-massage", "ln-c-vent", "ln-footlight", "ln-g-light", "ln-g-rev", "ln-g-touch", "ln-g-gun", "ln-g-chrome", "ln-g-chiller", "ln-g-dual", "ln-g-massager", "ln-u-popup", "ln-u-silver", "ln-u-black", "ln-battery", "ln-headrest", "ln-console"]
    },
    {
      id: "ln-ritz", brand: "littlenap", code: "LN-RITZ", name: "Ritz",
      collection: "Home theatre", profile: "deep", image: "images/models/ln-ritz.jpg",
      size: { seatW: 24, armW: 7, depth: 41, reclined: 69, height: 41 },
      description: "Home theatre seating.",
      features: ["Home theatre seating", "Single seats or rows"],
      variants: [ { name: "1 seater", seats: 1, price: 115000 }, { name: "Row of 3", seats: 3, price: 332000 }, { name: "Row of 4", seats: 4, price: 436000 } ],
      accessories: ["ln-t-swivel", "ln-t-ipad", "ln-t-clad", "ln-s-4btn", "ln-s-backlit", "ln-s-metal", "ln-s-round", "ln-s-remote", "ln-s-touch", "ln-s-usb", "ln-s-dual", "ln-s-hidden", "ln-c-sensor", "ln-c-warmer", "ln-c-massage", "ln-c-vent", "ln-footlight", "ln-g-light", "ln-g-rev", "ln-g-touch", "ln-g-gun", "ln-g-chrome", "ln-g-chiller", "ln-g-dual", "ln-g-massager", "ln-u-popup", "ln-u-silver", "ln-u-black", "ln-battery", "ln-headrest", "ln-console"]
    },
    {
      id: "ln-verve", brand: "littlenap", code: "LN-VERVE", name: "Verve",
      collection: "Home theatre", profile: "highback", image: "images/models/ln-verve.jpg",
      size: { seatW: 22, armW: 7, depth: 39, reclined: 66, height: 41 },
      description: "Theatre recliner.",
      features: ["Home theatre seating", "Single seats or rows"],
      variants: [ { name: "1 seater", seats: 1, price: 86000 }, { name: "Row of 3", seats: 3, price: 248000 } ],
      accessories: ["ln-t-swivel", "ln-t-ipad", "ln-t-clad", "ln-s-4btn", "ln-s-backlit", "ln-s-metal", "ln-s-round", "ln-s-remote", "ln-s-touch", "ln-s-usb", "ln-s-dual", "ln-s-hidden", "ln-c-sensor", "ln-c-warmer", "ln-c-massage", "ln-c-vent", "ln-footlight", "ln-g-light", "ln-g-rev", "ln-g-touch", "ln-g-gun", "ln-g-chrome", "ln-g-chiller", "ln-g-dual", "ln-g-massager", "ln-u-popup", "ln-u-silver", "ln-u-black", "ln-battery", "ln-headrest", "ln-console"]
    },
    {
      id: "ln-primus", brand: "littlenap", code: "LN-PRIMUS", name: "Primus",
      collection: "Home theatre", profile: "highback", image: "images/models/ln-primus.jpg",
      size: { seatW: 22, armW: 7, depth: 39, reclined: 66, height: 41 },
      description: "Theatre recliner.",
      features: ["Home theatre seating", "Single seats or rows"],
      variants: [ { name: "1 seater", seats: 1, price: 104000 }, { name: "Row of 3", seats: 3, price: 300000 } ],
      accessories: ["ln-t-swivel", "ln-t-ipad", "ln-t-clad", "ln-s-4btn", "ln-s-backlit", "ln-s-metal", "ln-s-round", "ln-s-remote", "ln-s-touch", "ln-s-usb", "ln-s-dual", "ln-s-hidden", "ln-c-sensor", "ln-c-warmer", "ln-c-massage", "ln-c-vent", "ln-footlight", "ln-g-light", "ln-g-rev", "ln-g-touch", "ln-g-gun", "ln-g-chrome", "ln-g-chiller", "ln-g-dual", "ln-g-massager", "ln-u-popup", "ln-u-silver", "ln-u-black", "ln-battery", "ln-headrest", "ln-console"]
    },
    {
      id: "ln-aderia", brand: "littlenap", code: "LN-ADERIA", name: "Aderia",
      collection: "Home theatre", profile: "lowback", image: "images/models/ln-aderia.jpg",
      size: { seatW: 22, armW: 7, depth: 39, reclined: 66, height: 34 },
      description: "A bestseller: modern design, double-needle stitching, contrast piping and a double swivel table over the armrest.",
      features: ["Double-needle stitch work", "Contrast piping", "Double swivel table, touch sensor control"],
      variants: [ { name: "1 seater", seats: 1, price: 88000 }, { name: "Row of 3", seats: 3, price: 254000 } ],
      accessories: ["ln-t-swivel", "ln-t-ipad", "ln-t-clad", "ln-s-4btn", "ln-s-backlit", "ln-s-metal", "ln-s-round", "ln-s-remote", "ln-s-touch", "ln-s-usb", "ln-s-dual", "ln-s-hidden", "ln-c-sensor", "ln-c-warmer", "ln-c-massage", "ln-c-vent", "ln-footlight", "ln-g-light", "ln-g-rev", "ln-g-touch", "ln-g-gun", "ln-g-chrome", "ln-g-chiller", "ln-g-dual", "ln-g-massager", "ln-u-popup", "ln-u-silver", "ln-u-black", "ln-battery", "ln-headrest", "ln-console"]
    },
    {
      id: "ln-ebony", brand: "littlenap", code: "LN-EBONY", name: "Ebony",
      collection: "Home theatre", profile: "deep", image: "images/models/ln-ebony.jpg",
      size: { seatW: 24, armW: 7, depth: 41, reclined: 69, height: 41 },
      description: "Ultra-premium non-chaise recliner with straight lines and elegant aesthetics.",
      features: ["Multiplex grade", "Home theatre seating", "Single seats or rows"],
      variants: [ { name: "1 seater", seats: 1, price: 128000 }, { name: "Row of 4", seats: 4, price: 488000 } ],
      accessories: ["ln-t-swivel", "ln-t-ipad", "ln-t-clad", "ln-s-4btn", "ln-s-backlit", "ln-s-metal", "ln-s-round", "ln-s-remote", "ln-s-touch", "ln-s-usb", "ln-s-dual", "ln-s-hidden", "ln-c-sensor", "ln-c-warmer", "ln-c-massage", "ln-c-vent", "ln-footlight", "ln-g-light", "ln-g-rev", "ln-g-touch", "ln-g-gun", "ln-g-chrome", "ln-g-chiller", "ln-g-dual", "ln-g-massager", "ln-u-popup", "ln-u-silver", "ln-u-black", "ln-battery", "ln-headrest", "ln-console"]
    },
    {
      id: "ln-trident", brand: "littlenap", code: "LN-TRIDENT", name: "Trident",
      collection: "Home theatre", profile: "highback", image: "images/models/ln-trident.jpg",
      size: { seatW: 22, armW: 7, depth: 39, reclined: 66, height: 42 },
      description: "Best-in-class recliner inspired by premium automobile seats, with a bucket seat in PU foam.",
      features: ["Automobile-inspired bucket seat", "Made entirely of PU foam", "Premium range"],
      variants: [ { name: "1 seater", seats: 1, price: 135000 }, { name: "Row of 3", seats: 3, price: 392000 }, { name: "Row of 4", seats: 4, price: 513000 } ],
      accessories: ["ln-t-swivel", "ln-t-ipad", "ln-t-clad", "ln-s-4btn", "ln-s-backlit", "ln-s-metal", "ln-s-round", "ln-s-remote", "ln-s-touch", "ln-s-usb", "ln-s-dual", "ln-s-hidden", "ln-c-sensor", "ln-c-warmer", "ln-c-massage", "ln-c-vent", "ln-footlight", "ln-g-light", "ln-g-rev", "ln-g-touch", "ln-g-gun", "ln-g-chrome", "ln-g-chiller", "ln-g-dual", "ln-g-massager", "ln-u-popup", "ln-u-silver", "ln-u-black", "ln-battery", "ln-headrest", "ln-console"]
    },
    {
      id: "ln-zenith", brand: "littlenap", code: "LN-ZENITH", name: "Zenith",
      collection: "Home theatre", profile: "highback", image: "images/models/ln-zenith.jpg",
      size: { seatW: 22, armW: 7, depth: 39, reclined: 66, height: 42 },
      description: "Inspired by premium automobile seats, made entirely of PU foam with a bucket seat.",
      features: ["Automobile-inspired bucket seat", "Made entirely of PU foam", "Premium range"],
      variants: [ { name: "1 seater", seats: 1, price: 128000 }, { name: "Row of 3", seats: 3, price: 371000 }, { name: "Row of 4", seats: 4, price: 486000 } ],
      accessories: ["ln-t-swivel", "ln-t-ipad", "ln-t-clad", "ln-s-4btn", "ln-s-backlit", "ln-s-metal", "ln-s-round", "ln-s-remote", "ln-s-touch", "ln-s-usb", "ln-s-dual", "ln-s-hidden", "ln-c-sensor", "ln-c-warmer", "ln-c-massage", "ln-c-vent", "ln-footlight", "ln-g-light", "ln-g-rev", "ln-g-touch", "ln-g-gun", "ln-g-chrome", "ln-g-chiller", "ln-g-dual", "ln-g-massager", "ln-u-popup", "ln-u-silver", "ln-u-black", "ln-battery", "ln-headrest", "ln-console"]
    },
    {
      id: "ln-gatsby", brand: "littlenap", code: "LN-GATSBY", name: "Gatsby",
      collection: "Home theatre", profile: "highback", image: "images/models/ln-gatsby.jpg",
      size: { seatW: 22, armW: 7, depth: 39, reclined: 66, height: 41 },
      description: "Exclusive design with technology-driven features.",
      features: ["Exclusive design", "Technology-driven features"],
      variants: [ { name: "1 seater", seats: 1, price: 112000 }, { name: "Row of 3", seats: 3, price: 325000 }, { name: "Row of 4", seats: 4, price: 426000 } ],
      accessories: ["ln-t-swivel", "ln-t-ipad", "ln-t-clad", "ln-s-4btn", "ln-s-backlit", "ln-s-metal", "ln-s-round", "ln-s-remote", "ln-s-touch", "ln-s-usb", "ln-s-dual", "ln-s-hidden", "ln-c-sensor", "ln-c-warmer", "ln-c-massage", "ln-c-vent", "ln-footlight", "ln-g-light", "ln-g-rev", "ln-g-touch", "ln-g-gun", "ln-g-chrome", "ln-g-chiller", "ln-g-dual", "ln-g-massager", "ln-u-popup", "ln-u-silver", "ln-u-black", "ln-battery", "ln-headrest", "ln-console"]
    },
    {
      id: "ln-fortuna", brand: "littlenap", code: "LN-FORTUNA", name: "Fortuna",
      collection: "Home theatre", profile: "deep", image: "images/models/ln-fortuna.jpg",
      size: { seatW: 24, armW: 7, depth: 41, reclined: 69, height: 41 },
      description: "Exclusive design with technology-driven features.",
      features: ["Exclusive design", "Technology-driven features"],
      variants: [ { name: "1 seater", seats: 1, price: 118000 }, { name: "Row of 3", seats: 3, price: 342000 }, { name: "Row of 4", seats: 4, price: 448000 } ],
      accessories: ["ln-t-swivel", "ln-t-ipad", "ln-t-clad", "ln-s-4btn", "ln-s-backlit", "ln-s-metal", "ln-s-round", "ln-s-remote", "ln-s-touch", "ln-s-usb", "ln-s-dual", "ln-s-hidden", "ln-c-sensor", "ln-c-warmer", "ln-c-massage", "ln-c-vent", "ln-footlight", "ln-g-light", "ln-g-rev", "ln-g-touch", "ln-g-gun", "ln-g-chrome", "ln-g-chiller", "ln-g-dual", "ln-g-massager", "ln-u-popup", "ln-u-silver", "ln-u-black", "ln-battery", "ln-headrest", "ln-console"]
    },
    {
      id: "ln-nuvo", brand: "littlenap", code: "LN-NUVO", name: "Nuvo",
      collection: "Home theatre", profile: "highback", image: "images/models/ln-nuvo.jpg",
      size: { seatW: 22, armW: 7, depth: 39, reclined: 66, height: 41 },
      description: "Inspired by premium automobile seats and made in PU foam.",
      features: ["Automobile-inspired design", "PU foam construction"],
      variants: [ { name: "1 seater", seats: 1, price: 105000 }, { name: "Row of 3", seats: 3, price: 304000 }, { name: "Row of 4", seats: 4, price: 399000 } ],
      accessories: ["ln-t-swivel", "ln-t-ipad", "ln-t-clad", "ln-s-4btn", "ln-s-backlit", "ln-s-metal", "ln-s-round", "ln-s-remote", "ln-s-touch", "ln-s-usb", "ln-s-dual", "ln-s-hidden", "ln-c-sensor", "ln-c-warmer", "ln-c-massage", "ln-c-vent", "ln-footlight", "ln-g-light", "ln-g-rev", "ln-g-touch", "ln-g-gun", "ln-g-chrome", "ln-g-chiller", "ln-g-dual", "ln-g-massager", "ln-u-popup", "ln-u-silver", "ln-u-black", "ln-battery", "ln-headrest", "ln-console"]
    },

    // ---------------- LITTLE NAP : loungers ----------------
    {
      id: "ln-lunar", brand: "littlenap", code: "LN-LUNAR", name: "Lunar Lounger",
      collection: "Lounger", profile: "lounger", image: "images/models/ln-lunar.jpg",
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
    },

    // ---------------- CINEAK (cineak.com/home-theater/models) ----------------
    {
      id: "cn-chess", brand: "cineak", code: "CN-CHESS", name: "Chess",
      collection: "Home theatre", profile: "highback", image: "images/models/cn-chess.png",
      size: { seatW: 23, armW: 9, depth: 41, reclined: 68, height: 42 },
      description: "Inspired by the private clubs of old: rich materials and tailored detail.",
      features: ["Club-style design", "Motorised recline", "Bespoke upholstery"],
      variants: [ { name: "Single seat", seats: 1, price: 560000 }, { name: "Row of 2", seats: 2, price: 1086000 }, { name: "Row of 3", seats: 3, price: 1613000 }, { name: "Row of 4", seats: 4, price: 2128000 } ],
      only: { mech: ["dual"] },
      accessories: ["cn-cup", "cn-tray", "cn-usb", "cn-light", "cn-console", "cn-club", "cn-bond", "cn-swatch"]
    },
    {
      id: "cn-harv", brand: "cineak", code: "CN-HARV", name: "Harv",
      collection: "Home theatre", profile: "highback", image: "images/models/cn-harv.png",
      size: { seatW: 24, armW: 7, depth: 41, reclined: 69, height: 42 },
      description: "A modern take on a vintage classic, with soft quilted upholstery.",
      features: ["Quilted upholstery", "Three-way motorised adjustment", "Modular layouts"],
      variants: [ { name: "Single seat", seats: 1, price: 580000 }, { name: "Row of 2", seats: 2, price: 1125000 }, { name: "Row of 3", seats: 3, price: 1670000 }, { name: "Row of 4", seats: 4, price: 2204000 } ],
      only: { mech: ["triple"] },
      accessories: ["cn-cup", "cn-tray", "cn-usb", "cn-light", "cn-console", "cn-club", "cn-bond", "cn-swatch"]
    },
    {
      id: "cn-ollie", brand: "cineak", code: "CN-OLLIE", name: "Ollie",
      collection: "Home theatre", profile: "lowback", image: "images/models/cn-ollie.png",
      size: { seatW: 26, armW: 8, depth: 42, reclined: 70, height: 32 },
      description: "Fully motorised entertainment sofa that rises from low-back sofa to high-back chair.",
      features: ["Patented triple-motorised mechanism", "Backrest rises to high-back", "Footrest and headrest adjust"],
      variants: [ { name: "Single seat", seats: 1, price: 620000 }, { name: "Row of 2", seats: 2, price: 1203000 }, { name: "Row of 3", seats: 3, price: 1786000 }, { name: "Row of 4", seats: 4, price: 2356000 } ],
      only: { mech: ["triple"] },
      accessories: ["cn-cup", "cn-tray", "cn-usb", "cn-light", "cn-console", "cn-club", "cn-bond", "cn-swatch"]
    },
    {
      id: "cn-largo", brand: "cineak", code: "CN-LARGO", name: "Largo",
      collection: "Home theatre", profile: "lowback", image: "images/models/cn-largo.png",
      size: { seatW: 26, armW: 8, depth: 42, reclined: 70, height: 32 },
      description: "Design-driven, fully motorised entertainment sofa.",
      features: ["Patented triple-motorised mechanism", "Low-back to high-back", "Modular sofa layouts"],
      variants: [ { name: "Single seat", seats: 1, price: 640000 }, { name: "Row of 2", seats: 2, price: 1242000 }, { name: "Row of 3", seats: 3, price: 1843000 }, { name: "Row of 4", seats: 4, price: 2432000 } ],
      only: { mech: ["triple"] },
      accessories: ["cn-cup", "cn-tray", "cn-usb", "cn-light", "cn-console", "cn-club", "cn-bond", "cn-swatch"]
    },
    {
      id: "cn-mondrian", brand: "cineak", code: "CN-MONDRIAN", name: "Mondrian",
      collection: "Home theatre", profile: "lowback", image: "images/models/cn-mondrian.png",
      size: { seatW: 26, armW: 9, depth: 42, reclined: 70, height: 33 },
      description: "Bold geometric lines with a plush, deconstructed look.",
      features: ["Dual-motorised Relax", "Backrest and footrest move independently", "Design by Kim Hellemans"],
      variants: [ { name: "Single seat", seats: 1, price: 600000 }, { name: "Row of 2", seats: 2, price: 1164000 }, { name: "Row of 3", seats: 3, price: 1728000 }, { name: "Row of 4", seats: 4, price: 2280000 } ],
      only: { mech: ["dual"] },
      accessories: ["cn-cup", "cn-tray", "cn-usb", "cn-light", "cn-console", "cn-club", "cn-bond", "cn-swatch"]
    },
    {
      id: "cn-gramercy", brand: "cineak", code: "CN-GRAMERCY", name: "Gramercy",
      collection: "Home theatre", profile: "lowback", image: "images/models/cn-gramercy.png",
      size: { seatW: 25, armW: 8, depth: 41, reclined: 69, height: 33 },
      description: "Sleek, contemporary multi-purpose seating with deep comfort.",
      features: ["Clean contemporary lines", "Dual-motorised Relax", "Cinema or media room"],
      variants: [ { name: "Single seat", seats: 1, price: 590000 }, { name: "Row of 2", seats: 2, price: 1145000 }, { name: "Row of 3", seats: 3, price: 1699000 }, { name: "Row of 4", seats: 4, price: 2242000 } ],
      only: { mech: ["dual"] },
      accessories: ["cn-cup", "cn-tray", "cn-usb", "cn-light", "cn-console", "cn-club", "cn-bond", "cn-swatch"]
    },
    {
      id: "cn-trevia", brand: "cineak", code: "CN-TREVIA", name: "Trevia",
      collection: "Home theatre", profile: "lounger", image: "images/models/cn-trevia.jpg",
      size: { seatW: 32, armW: 6, depth: 44, reclined: 74, height: 34 },
      description: "Fully motorised chaise lounge with generous width and depth.",
      features: ["Chaise lounge format", "Fully motorised", "Extra-wide seat"],
      variants: [ { name: "Single seat", seats: 1, price: 690000 }, { name: "Row of 2", seats: 2, price: 1339000 }, { name: "Row of 3", seats: 3, price: 1987000 }, { name: "Row of 4", seats: 4, price: 2622000 } ],
      only: { mech: ["dual"] },
      accessories: ["cn-cup", "cn-tray", "cn-usb", "cn-light", "cn-console", "cn-club", "cn-bond", "cn-swatch"]
    },
    {
      id: "cn-strato", brand: "cineak", code: "CN-STRATO", name: "Strato",
      collection: "Home theatre", profile: "lowback", image: "images/models/cn-strato.png",
      size: { seatW: 25, armW: 8, depth: 41, reclined: 69, height: 34 },
      description: "Abstract, modular design that hides full theatre-seat function.",
      features: ["Sofa comfort, high-back performance", "Dual-motorised Relax", "Truly modular"],
      variants: [ { name: "Single seat", seats: 1, price: 610000 }, { name: "Row of 2", seats: 2, price: 1183000 }, { name: "Row of 3", seats: 3, price: 1757000 }, { name: "Row of 4", seats: 4, price: 2318000 } ],
      only: { mech: ["dual"] },
      accessories: ["cn-cup", "cn-tray", "cn-usb", "cn-light", "cn-console", "cn-club", "cn-bond", "cn-swatch"]
    },
    {
      id: "cn-ferrier", brand: "cineak", code: "CN-FERRIER", name: "Ferrier",
      collection: "Home theatre", profile: "highback", image: "images/models/cn-ferrier.png",
      size: { seatW: 24, armW: 7, depth: 41, reclined: 69, height: 42 },
      description: "Diamond stitching for a refined, luxurious look.",
      features: ["Diamond stitching", "Dual-motorised Relax", "Steel frame"],
      variants: [ { name: "Single seat", seats: 1, price: 570000 }, { name: "Row of 2", seats: 2, price: 1106000 }, { name: "Row of 3", seats: 3, price: 1642000 }, { name: "Row of 4", seats: 4, price: 2166000 } ],
      only: { mech: ["dual"], stitch: ["diamond", "std"] },
      accessories: ["cn-cup", "cn-tray", "cn-usb", "cn-light", "cn-console", "cn-club", "cn-bond", "cn-swatch"]
    },
    {
      id: "cn-fortuny", brand: "cineak", code: "CN-FORTUNY", name: "Fortuny",
      collection: "Home theatre", profile: "highback", image: "images/models/cn-fortuny.png",
      size: { seatW: 24, armW: 7, depth: 41, reclined: 69, height: 43 },
      description: "Cineak's first chair, made for the world's most luxurious private cinemas.",
      features: ["Signature theatre chair", "Finest leather or fabric", "Dual-motorised Relax"],
      variants: [ { name: "Single seat", seats: 1, price: 650000 }, { name: "Row of 2", seats: 2, price: 1261000 }, { name: "Row of 3", seats: 3, price: 1872000 }, { name: "Row of 4", seats: 4, price: 2470000 } ],
      only: { mech: ["dual"] },
      accessories: ["cn-cup", "cn-tray", "cn-usb", "cn-light", "cn-console", "cn-club", "cn-bond", "cn-swatch"]
    },
    {
      id: "cn-nero", brand: "cineak", code: "CN-NERO", name: "Nero",
      collection: "Home theatre", profile: "highback", image: "images/models/cn-nero.png",
      size: { seatW: 24, armW: 7, depth: 41, reclined: 69, height: 43 },
      description: "Following Fortuny: ergonomic contours with multiple stitching finishes.",
      features: ["Multiple stitching finishes", "Ergonomic contours", "Dual-motorised Relax"],
      variants: [ { name: "Single seat", seats: 1, price: 590000 }, { name: "Row of 2", seats: 2, price: 1145000 }, { name: "Row of 3", seats: 3, price: 1699000 }, { name: "Row of 4", seats: 4, price: 2242000 } ],
      only: { mech: ["dual"] },
      accessories: ["cn-cup", "cn-tray", "cn-usb", "cn-light", "cn-console", "cn-club", "cn-bond", "cn-swatch"]
    },
    {
      id: "cn-hughes", brand: "cineak", code: "CN-HUGHES", name: "Hughes",
      collection: "Home theatre", profile: "highback", image: "images/models/cn-hughes.jpg",
      size: { seatW: 23, armW: 6, depth: 36, reclined: 52, height: 41 },
      description: "Compact theatre seat for rooms with limited space or riser depth.",
      features: ["Compact footprint", "Mechanically tilting backrest", "Ideal for shallow risers"],
      variants: [ { name: "Single seat", seats: 1, price: 380000 }, { name: "Row of 2", seats: 2, price: 737000 }, { name: "Row of 3", seats: 3, price: 1094000 }, { name: "Row of 4", seats: 4, price: 1444000 } ],
      only: { mech: ["tilt"] },
      accessories: ["cn-cup", "cn-tray", "cn-usb", "cn-light", "cn-console", "cn-club", "cn-bond", "cn-swatch"]
    }
  ]
};

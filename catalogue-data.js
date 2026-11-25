/*
 * ============================================================
 *  RECLINER CATALOGUE DATA  —  edit this file to update the site
 * ============================================================
 *  Everything shown on the page comes from here. No coding needed:
 *  copy an existing block, change the text and prices, save, refresh.
 *
 *  ⚠ The models below are SAMPLE placeholders, not real brand data.
 *    Replace them with models and prices from your brand PDFs,
 *    then set  sampleData: false  so the "sample data" notice disappears.
 *
 *  Prices are in rupees, numbers only (no commas, no ₹ sign).
 * ============================================================
 */
window.CATALOGUE = {
  settings: {
    companyName: "Awicontech",
    pageTitle: "Recliner Catalogue",
    // WhatsApp number clients send their shortlist to: country code + number, digits only.
    whatsappNumber: "910000000000",
    email: "sales@example.com",
    currency: "INR",
    priceNote: "Prices are tentative and exclude GST, delivery and installation. Final quote on confirmation.",
    sampleData: true
  },

  brands: [
    { id: "littlenap", name: "Little Nap", tagline: "Comfort recliners for home theatres and living rooms", color: "#B4532A" },
    { id: "seatlab",   name: "Seatlab",    tagline: "Theatre and lounge seating",                           color: "#2F5D62" },
    { id: "moovia",    name: "Moovia",     tagline: "Motorised and smart recliners",                       color: "#5B4B8A" }
  ],

  // Upholstery choices. "add" is the extra cost over the base price, per seat.
  upholstery: [
    { id: "fabric",      name: "Fabric",          add: 0 },
    { id: "leatherette", name: "Leatherette",     add: 4000 },
    { id: "leather",     name: "Genuine leather", add: 15000 }
  ],

  // Accessory master list. Each model lists which of these it supports.
  // Price is charged per seat (e.g. 3 cup holders on a 3 seater) unless perSeat: false.
  accessories: {
    cupholder:   { name: "Cup holder",                 price: 1200 },
    cupcooled:   { name: "Cooled cup holder",          price: 4500 },
    usb:         { name: "USB charging port",          price: 1800 },
    wireless:    { name: "Wireless phone charger",     price: 3500 },
    tray:        { name: "Swivel tray table",          price: 3800 },
    storage:     { name: "Armrest storage",            price: 2200 },
    led:         { name: "LED ambient base lighting",  price: 2800 },
    headrest:    { name: "Power headrest",             price: 6500 },
    lumbar:      { name: "Power lumbar support",       price: 7000 },
    massage:     { name: "Massage and heat",           price: 9500 },
    battery:     { name: "Rechargeable battery pack",  price: 8500 },
    console:     { name: "Centre console with storage", price: 9000, perSeat: false },
    footstool:   { name: "Matching footstool",         price: 5500, perSeat: false }
  },

  /*
   * Models.
   *   brand:       one of the brand ids above
   *   type:        Manual, Motorised, Rocker-Swivel, Lift-Chair, Sofa set ... (used for the filter)
   *   variants:    seating options with their base price (fabric)
   *   accessories: ids from the accessory list above
   *   image:       optional, e.g. "images/ln-s1.jpg". Leave "" to show a drawing.
   */
  models: [
    // ---------- Little Nap (SAMPLE) ----------
    {
      id: "ln-s1", brand: "littlenap", code: "LN-S1", name: "Sample Manual Single",
      type: "Manual", image: "",
      description: "Lever-operated single recliner with a deep seat and padded arms.",
      features: ["3 recline positions", "High-density foam", "Wall-hugger design"],
      variants: [ { name: "1 seater", price: 24000 } ],
      accessories: ["cupholder", "storage", "footstool"]
    },
    {
      id: "ln-m2", brand: "littlenap", code: "LN-M2", name: "Sample Motorised Lounger",
      type: "Motorised", image: "",
      description: "Single-motor recliner with soft-touch controls.",
      features: ["Infinite recline positions", "Soft-touch switch", "Pocket-spring seat"],
      variants: [ { name: "1 seater", price: 38000 }, { name: "2 seater", price: 72000 }, { name: "3 seater", price: 104000 } ],
      accessories: ["cupholder", "usb", "storage", "headrest", "battery", "led"]
    },
    {
      id: "ln-r3", brand: "littlenap", code: "LN-R3", name: "Sample Rocker Swivel",
      type: "Rocker-Swivel", image: "",
      description: "360° swivel with a gentle rock, ideal for nurseries and bedrooms.",
      features: ["360° swivel", "Rocking base", "Compact footprint"],
      variants: [ { name: "1 seater", price: 32000 } ],
      accessories: ["cupholder", "usb", "massage", "footstool"]
    },

    // ---------- Seatlab (SAMPLE) ----------
    {
      id: "sl-t1", brand: "seatlab", code: "SL-T1", name: "Sample Theatre Row",
      type: "Motorised", image: "",
      description: "Home-theatre recliner sold by the seat or as a connected row.",
      features: ["Dual-motor recline", "Zero-wall clearance", "Connectable rows"],
      variants: [ { name: "1 seater", price: 46000 }, { name: "2 seater row", price: 90000 }, { name: "3 seater row", price: 132000 }, { name: "4 seater row", price: 172000 } ],
      accessories: ["cupholder", "cupcooled", "usb", "tray", "led", "headrest", "lumbar", "console"]
    },
    {
      id: "sl-c2", brand: "seatlab", code: "SL-C2", name: "Sample Club Recliner",
      type: "Manual", image: "",
      description: "Push-back recliner with a tailored club silhouette.",
      features: ["Push-back mechanism", "Solid wood frame", "Slim arms"],
      variants: [ { name: "1 seater", price: 28000 } ],
      accessories: ["cupholder", "storage", "footstool"]
    },
    {
      id: "sl-l3", brand: "seatlab", code: "SL-L3", name: "Sample Lounge Sectional",
      type: "Sofa set", image: "",
      description: "Modular sectional with recliners at both ends.",
      features: ["Modular pieces", "2 motorised ends", "Chaise option"],
      variants: [ { name: "3 seater", price: 118000 }, { name: "L-shape 5 seater", price: 196000 } ],
      accessories: ["cupholder", "usb", "wireless", "storage", "led", "headrest", "console"]
    },

    // ---------- Moovia (SAMPLE) ----------
    {
      id: "mv-x1", brand: "moovia", code: "MV-X1", name: "Sample Smart Recliner",
      type: "Motorised", image: "",
      description: "Triple-motor recliner with memory positions.",
      features: ["Triple motor", "2 memory presets", "Zero-gravity position"],
      variants: [ { name: "1 seater", price: 64000 }, { name: "2 seater", price: 124000 } ],
      accessories: ["cupcooled", "usb", "wireless", "tray", "led", "headrest", "lumbar", "massage", "battery"]
    },
    {
      id: "mv-l2", brand: "moovia", code: "MV-L2", name: "Sample Lift Chair",
      type: "Lift-Chair", image: "",
      description: "Lift-and-recline chair that helps the user stand up.",
      features: ["Power lift", "Battery backup", "Large hand control"],
      variants: [ { name: "1 seater", price: 58000 } ],
      accessories: ["usb", "storage", "massage", "battery"]
    },
    {
      id: "mv-s3", brand: "moovia", code: "MV-S3", name: "Sample Slim Motion",
      type: "Motorised", image: "",
      description: "Space-saving motorised recliner for apartments.",
      features: ["Slim profile", "Single motor", "USB-C port"],
      variants: [ { name: "1 seater", price: 42000 }, { name: "3 seater", price: 118000 } ],
      accessories: ["cupholder", "usb", "headrest", "led", "battery"]
    }
  ]
};

/* Shared line drawings (catalogue + planner). */
window.Drawings = (function () {
  "use strict";
  document.body.insertAdjacentHTML("afterbegin",
    `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
      <pattern id="hatch" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="5" stroke="currentColor" stroke-width=".5" opacity=".45"/></pattern></defs></svg>`);

  function sideProfile(profile) {
    const P = {
      highback: { base: [78, 98, 86, 30], seat: [74, 82, 96, 16], arm: [90, 64, 78, 18],
        back: "M80 84 L62 22 Q60 14 68 13 L82 12 Q90 12 92 20 L106 72", head: "M66 30 L88 27",
        recl: "M80 84 L42 36 Q37 29 44 26 L55 21 Q62 18 66 25 L100 74", foot: "M168 92 L214 102 L212 111 L166 101 Z", h: [12, 128] },
      lowback: { base: [78, 98, 86, 30], seat: [74, 82, 96, 16], arm: [90, 66, 78, 16],
        back: "M80 84 L70 50 Q68 42 76 41 L90 40 Q97 40 98 47 L106 72", head: "",
        recl: "M80 84 L54 58 Q49 52 56 49 L68 44 Q75 42 78 48 L100 74", foot: "M168 92 L214 102 L212 111 L166 101 Z", h: [40, 128] },
      deep: { base: [70, 96, 102, 32], seat: [66, 78, 110, 18], arm: [84, 58, 92, 22],
        back: "M72 80 L54 20 Q52 12 60 11 L78 10 Q87 10 89 18 L102 66", head: "M58 30 L86 26",
        recl: "M72 80 L34 34 Q29 27 36 24 L48 19 Q56 16 60 23 L96 70", foot: "M176 90 L222 100 L220 110 L174 100 Z", h: [10, 128] },
      lounger: { base: [70, 104, 128, 24], seat: [56, 92, 156, 12], arm: null,
        back: "M60 94 L46 46 Q44 38 52 37 L66 36 Q73 36 74 43 L86 92", head: "",
        recl: "M60 94 L34 60 Q30 54 37 51 L48 47 Q55 45 58 51 L80 92", foot: "", h: [36, 128] }
    }[profile] || null;
    const p = P || {};
    if (!P) return sideProfile("highback");
    const r = (a, cls, rx = 4) => a ? `<rect class="${cls}" x="${a[0]}" y="${a[1]}" width="${a[2]}" height="${a[3]}" rx="${rx}"/>` : "";
    return `<svg class="draw" viewBox="0 0 240 150" aria-hidden="true">
      <line class="floor" x1="14" y1="132" x2="230" y2="132"/>
      <line class="dim" x1="24" y1="${p.h[0]}" x2="24" y2="${p.h[1]}"/>
      <line class="dim" x1="20" y1="${p.h[0]}" x2="28" y2="${p.h[0]}"/><line class="dim" x1="20" y1="${p.h[1]}" x2="28" y2="${p.h[1]}"/>
      ${p.recl ? `<path class="dash" d="${p.recl}"/>` : ""}${p.foot ? `<path class="dash" d="${p.foot}"/>` : ""}
      ${r(p.base, "hatch", 2)}
      <path class="stroke" d="${p.back}"/>
      ${r(p.seat, "stroke", 5)}
      ${r(p.arm, "stroke", 6)}
      ${p.head ? `<path class="gold" d="${p.head}"/>` : ""}
      <line class="stroke" x1="${p.base[0] + 6}" y1="${p.base[1] + p.base[3]}" x2="${p.base[0] + 6}" y2="132"/>
      <line class="stroke" x1="${p.base[0] + p.base[2] - 6}" y1="${p.base[1] + p.base[3]}" x2="${p.base[0] + p.base[2] - 6}" y2="132"/>
    </svg>`;
  }

  function rowElevation(seats, profile) {
    const seatW = profile === "deep" ? 64 : 56, armW = 12, low = profile === "lowback" || profile === "lounger";
    const top = low ? 40 : profile === "sofa" ? 30 : 14;
    const W = seats * seatW + (seats + 1) * armW;
    let x = 0, out = "";
    for (let i = 0; i <= seats; i++) {
      out += `<rect class="stroke" x="${x}" y="58" width="${armW}" height="44" rx="4"/>`;
      x += armW;
      if (i < seats) {
        out += `<rect class="stroke" x="${x + 2}" y="${top}" width="${seatW - 4}" height="${64 - top}" rx="6"/>`;
        if (!low) out += `<line class="gold" x1="${x + 10}" y1="${top + 12}" x2="${x + seatW - 10}" y2="${top + 12}"/>`;
        out += `<rect class="stroke" x="${x + 1}" y="66" width="${seatW - 2}" height="16" rx="5"/>`;
        out += `<rect class="hatch" x="${x}" y="82" width="${seatW}" height="20" rx="1"/>`;
        x += seatW;
      }
    }
    const pad = 16;
    return `<svg class="draw" viewBox="${-pad} 0 ${W + pad * 2} 124" aria-hidden="true">
      <line class="floor" x1="${-pad}" y1="106" x2="${W + pad}" y2="106"/>
      ${out}
      <line class="dim" x1="0" y1="116" x2="${W}" y2="116"/>
      <line class="dim" x1="0" y1="112" x2="0" y2="120"/><line class="dim" x1="${W}" y1="112" x2="${W}" y2="120"/>
    </svg>`;
  }
  return { sideProfile, rowElevation };
})();

/* Home theatre planner: room → rows → seats → collection → materials → extras → summary.
   All lengths are kept in inches. Data comes from catalogue-data.js. */
(function () {
  "use strict";

  const C = window.CATALOGUE;
  const S = C.settings;
  const P = Object.assign({ minSideGap: 24, minFrontSpace: 72, rowGap: 12, rearGap: 6, riser: 12, minHeadroom: 84, wedgeArmAdd: 8000 }, S.planner || {});
  const $ = (id) => document.getElementById(id);
  const brandById = Object.fromEntries(C.brands.map((b) => [b.id, b]));
  const theatre = C.models.filter((m) => m.collection === "Home theatre" && m.size);
  const modelById = Object.fromEntries(theatre.map((m) => [m.id, m]));
  const fmt = new Intl.NumberFormat("en-IN", { style: "currency", currency: S.currency || "INR", maximumFractionDigits: 0 });
  const money = (n) => fmt.format(n);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const GENERIC = { seatW: 23, armW: 6.5, depth: 40, reclined: 68, height: 42 };
  const WEDGE_R = 180; // radius of a curved row, inches (about 15 ft)
  const STEPS = ["Room", "Rows", "Seats", "Collection", "Materials", "Extras", "Summary"];
  const KEY = "theatre-plan-v1";

  /* ---------- state ---------- */
  const fresh = () => ({
    step: 1, reached: 1, unit: "ft",
    room: { w: 168, d: 240, h: 120 },
    rows: [{ seats: 4, arm: "straight", model: null }, { seats: 4, arm: "straight", model: null }],
    target: "all", brand: "all", custom: {}
  });
  let st = load();

  function load() {
    try {
      const h = location.hash.match(/plan=([^&]+)/);
      const raw = h ? decodeURIComponent(h[1]) : localStorage.getItem(KEY);
      if (raw) {
        const o = Object.assign(fresh(), JSON.parse(raw));
        o.rows = (o.rows || []).filter((r) => r && r.seats > 0).slice(0, 6);
        o.rows.forEach((r) => { if (r.model && !modelById[r.model]) r.model = null; });
        if (!o.rows.length) o.rows = fresh().rows;
        return o;
      }
    } catch (e) { /* bad link or no storage */ }
    return fresh();
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) { /* storage unavailable */ }
  }
  function planLink() {
    const { step, reached, target, brand, ...keep } = st;
    return location.href.split("#")[0] + "#plan=" + encodeURIComponent(JSON.stringify({ ...keep, step: 7, reached: 7 }));
  }

  /* ---------- units ---------- */
  const toIn = (v) => (st.unit === "m" ? v / 0.0254 : v * 12);
  const fromIn = (i) => (st.unit === "m" ? +(i * 0.0254).toFixed(2) : +(i / 12).toFixed(1));
  function len(i) {
    const neg = i < 0; i = Math.abs(i);
    let ft = Math.floor(i / 12), inch = Math.round(i - ft * 12);
    if (inch === 12) { ft++; inch = 0; }
    const s = ft ? `${ft}′${inch ? " " + inch + "″" : ""}` : `${inch}″`;
    return (neg ? "−" : "") + s;
  }
  const metres = (i) => (i * 0.0254).toFixed(2) + " m";

  /* ---------- model helpers ---------- */
  function seatsOf(v) { return v.seats || parseInt(String(v.name).match(/\d+/) || [1], 10); }
  function groupsFor(m) {
    const only = m.only || {};
    return (brandById[m.brand].options || []).map((g) => ({
      ...g, choices: only[g.id] ? g.choices.filter((c) => only[g.id].includes(c.id)) : g.choices
    })).filter((g) => g.choices.length);
  }
  function custom(mid) {
    const m = modelById[mid];
    if (!st.custom[mid]) st.custom[mid] = { opt: {}, colour: {}, acc: {} };
    const c = st.custom[mid];
    groupsFor(m).forEach((g) => {
      if (!g.choices.some((ch) => ch.id === c.opt[g.id])) c.opt[g.id] = g.choices[0].id;
    });
    return c;
  }
  const choice = (m, gid) => { const g = groupsFor(m).find((x) => x.id === gid); return g && g.choices.find((ch) => ch.id === custom(m.id).opt[gid]); };
  const isMaterialGroup = (m, gid) => (brandById[m.brand].materialGroups || []).includes(gid);
  function sizeOf(row) {
    const m = row.model && modelById[row.model];
    const s = Object.assign({}, m ? m.size : GENERIC);
    if (m) groupsFor(m).forEach((g) => { const ch = choice(m, g.id); if (ch && ch.armW) s.armW = ch.armW; });
    return s;
  }
  // Price of n joined seats: an exact catalogue variant if there is one, else the row rate per seat.
  function basePrice(m, n) {
    const vs = m.variants.filter((v) => !/separat/i.test(v.name));
    const exact = vs.find((v) => seatsOf(v) === n);
    if (exact) return exact.price;
    const multi = vs.filter((v) => seatsOf(v) > 1).sort((a, b) => seatsOf(b) - seatsOf(a))[0];
    const rate = multi ? multi.price / seatsOf(multi) : vs[0].price / seatsOf(vs[0]);
    return Math.round((rate * n) / 100) * 100;
  }
  const perSeatFrom = (m) => Math.min(...m.variants.map((v) => v.price / seatsOf(v)));

  /* ---------- geometry ---------- */
  // Lay out one row in local coordinates: seats face up (towards the screen, −y).
  function rowGeom(row) {
    const s = sizeOf(row), n = row.seats, curved = row.arm === "wedged";
    const parts = [];
    for (let i = 0; i <= n; i++) { parts.push({ kind: "arm", w: s.armW }); if (i < n) parts.push({ kind: "seat", w: s.seatW }); }
    const total = parts.reduce((a, p) => a + p.w, 0);
    let pos = 0;
    const els = parts.map((p) => {
      const c = pos + p.w / 2 - total / 2; pos += p.w;
      if (!curved) return { ...p, wf: p.w, x: c, y: 0, rot: 0 };
      // Wedged: widths hold at the back edge and taper towards the front.
      const phi = c / (WEDGE_R + s.depth);
      return { ...p, wf: (p.w * WEDGE_R) / (WEDGE_R + s.depth), x: WEDGE_R * Math.sin(phi), y: WEDGE_R * Math.cos(phi) - WEDGE_R, rot: (-phi * 180) / Math.PI };
    });
    els.forEach((e) => { if (!e.wf) e.wf = e.w; });
    const foot = s.reclined - s.depth;
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity, footY = Infinity;
    els.forEach((e) => {
      const t = (-e.rot * Math.PI) / 180, co = Math.cos(t), si = Math.sin(t);
      const pt = (lx, ly) => [e.x + lx * co + ly * si, e.y - lx * si + ly * co];
      [[-e.wf / 2, 0], [e.wf / 2, 0], [-e.w / 2, s.depth], [e.w / 2, s.depth]].forEach(([lx, ly]) => {
        const [x, y] = pt(lx, ly);
        minX = Math.min(minX, x); maxX = Math.max(maxX, x); minY = Math.min(minY, y); maxY = Math.max(maxY, y);
      });
      if (e.kind === "seat") [[-e.wf / 2, -foot], [e.wf / 2, -foot]].forEach(([lx, ly]) => { footY = Math.min(footY, pt(lx, ly)[1]); });
    });
    return { els, s, foot, width: maxX - minX, cx: (minX + maxX) / 2, minY, maxY, footY: Math.min(footY, minY) };
  }

  // Place every row from the back wall forwards and run the fit checks.
  function layout() {
    const R = st.room, rows = st.rows.map((r) => ({ row: r, g: rowGeom(r) }));
    let back = R.d - P.rearGap;
    for (let i = rows.length - 1; i >= 0; i--) {
      const r = rows[i];
      r.oy = back - r.g.maxY;
      r.ox = R.w / 2 - r.g.cx;
      r.front = r.oy + r.g.footY;
      r.side = (R.w - r.g.width) / 2;
      back = r.front - P.rowGap;
    }
    const frontSpace = rows.length ? rows[0].front : R.d;
    const topRiser = (rows.length - 1) * P.riser;
    const checks = [];
    rows.forEach((r, i) => {
      const name = `Row ${i + 1}`;
      if (r.side < 0) checks.push({ bad: true, text: `${name} is ${len(r.g.width)} wide and does not fit the ${len(R.w)} room.` });
      else if (r.side < P.minSideGap) checks.push({ bad: true, text: `${name} leaves only ${len(r.side)} on each side. Keep at least ${len(P.minSideGap)} on either side.` });
    });
    if (rows.length && rows.every((r) => r.side >= P.minSideGap)) {
      const tight = Math.min(...rows.map((r) => r.side));
      checks.push({ ok: true, text: `Side clearance: at least ${len(tight)} on each side.` });
    }
    if (frontSpace < 0) checks.push({ bad: true, text: `The rows need ${len(-frontSpace)} more depth than the room has.` });
    else if (frontSpace < P.minFrontSpace) checks.push({ bad: true, text: `Only ${len(frontSpace)} between the screen wall and the front row's footrests. Aim for ${len(P.minFrontSpace)}.` });
    else checks.push({ ok: true, text: `${len(frontSpace)} from the screen wall to the front row's footrests.` });
    if (rows.length > 1) {
      const head = R.h - topRiser;
      if (head < P.minHeadroom) checks.push({ bad: true, text: `On the ${len(topRiser)} top riser the ceiling is only ${len(head)} above the floor. Aim for ${len(P.minHeadroom)}.` });
      else checks.push({ ok: true, text: `Risers of ${len(P.riser)} per row leave ${len(head)} headroom at the back.` });
    }
    return { rows, frontSpace, topRiser, checks };
  }

  /* ---------- plan drawing ---------- */
  function planSVG(L, big) {
    const R = st.room, pad = Math.max(R.w, R.d) * 0.09;
    const fs = Math.max(R.w, R.d) / 34;
    let out = `<rect class="room" x="0" y="0" width="${R.w}" height="${R.d}"/>`;
    out += `<line class="screen" x1="${R.w * 0.14}" y1="${fs * 0.5}" x2="${R.w * 0.86}" y2="${fs * 0.5}"/>`;
    out += `<text class="lbl" x="${R.w / 2}" y="${fs * 2}" text-anchor="middle" font-size="${fs * 0.8}">SCREEN</text>`;
    L.rows.forEach((r, i) => {
      const riser = i > 0;
      const g = r.g, s = g.s;
      let body = "";
      if (riser) body += `<rect class="riser" x="${-R.w}" y="${r.oy + g.footY - r.oy - P.rowGap / 2}" width="${R.w * 3}" height="${g.maxY - g.footY + P.rowGap / 2 + (i === L.rows.length - 1 ? P.rearGap : P.rowGap / 2)}"/>`;
      g.els.forEach((e) => {
        const tf = `transform="translate(${e.x.toFixed(2)} ${e.y.toFixed(2)}) rotate(${e.rot.toFixed(2)})"`;
        const trap = (inset, y0, y1) => {
          const a = e.wf / 2 - inset, b = e.w / 2 - inset, k = (y) => a + ((b - a) * y) / s.depth;
          return `points="${-k(y0)},${y0} ${k(y0)},${y0} ${k(y1)},${y1} ${-k(y1)},${y1}"`;
        };
        if (e.kind === "seat") {
          body += `<rect class="foot" ${tf} x="${-e.wf / 2 + 1}" y="${-g.foot}" width="${e.wf - 2}" height="${g.foot}"/>`;
          body += `<polygon class="seat" ${tf} ${trap(0.5, 2, s.depth)}/>`;
          body += `<polygon class="back" ${tf} ${trap(2, s.depth - 9, s.depth - 2)}/>`;
        } else {
          body += `<polygon class="arm" ${tf} ${trap(0, 0, s.depth)}/>`;
        }
      });
      out += `<g clip-path="url(#roomClip)"><g transform="translate(${r.ox.toFixed(2)} ${r.oy.toFixed(2)})">${body}</g></g>`;
      // side clearance dimension on the left
      const y = r.oy + g.maxY - s.depth / 2, bad = r.side < P.minSideGap;
      if (r.side > 0) {
        out += `<line class="${bad ? "dimbad" : "dimln"}" x1="0" y1="${y}" x2="${r.side}" y2="${y}"/>`;
        out += `<text class="${bad ? "lblbad" : "lbl"}" x="${r.side / 2}" y="${y - fs * 0.4}" text-anchor="middle" font-size="${fs * 0.7}">${len(r.side)}</text>`;
      }
      out += `<text class="rowlbl" x="${R.w - fs * 0.5}" y="${y + fs * 0.3}" text-anchor="end" font-size="${fs * 0.7}">R${i + 1}${riser ? " +" + len(P.riser * i) : ""}</text>`;
    });
    if (L.rows.length && L.frontSpace > fs * 3) {
      const yF = L.rows[0].front, x = R.w * 0.08;
      out += `<line class="dimln" x1="${x}" y1="${fs}" x2="${x}" y2="${yF}"/>`;
      out += `<text class="lbl" x="${x + fs * 0.4}" y="${(fs + yF) / 2}" font-size="${fs * 0.7}">${len(L.frontSpace)}</text>`;
    }
    // overall dims
    out += `<text class="lbl" x="${R.w / 2}" y="${-pad * 0.35}" text-anchor="middle" font-size="${fs * 0.8}">W ${len(R.w)}</text>`;
    out += `<text class="lbl" transform="translate(${-pad * 0.35} ${R.d / 2}) rotate(-90)" text-anchor="middle" font-size="${fs * 0.8}">D ${len(R.d)}</text>`;
    return `<svg class="plan-svg${big ? " big" : ""}" viewBox="${-pad} ${-pad} ${R.w + pad * 2} ${R.d + pad * 2}" role="img" aria-label="Room plan, ${len(R.w)} by ${len(R.d)}, ${L.rows.length} rows">
      <defs><clipPath id="roomClip"><rect x="0" y="0" width="${R.w}" height="${R.d}"/></clipPath></defs>${out}</svg>`;
  }

  /* ---------- pricing ---------- */
  function rowPrice(row) {
    const m = row.model && modelById[row.model];
    if (!m) return null;
    const c = custom(m.id), n = row.seats;
    let p = basePrice(m, n);
    if (row.arm === "wedged") p += P.wedgeArmAdd * n;
    groupsFor(m).forEach((g) => { const ch = choice(m, g.id); if (ch) p += ch.add * n; });
    Object.entries(c.acc).forEach(([id, q]) => {
      const a = C.accessories[id];
      if (a && q && a.perSeat !== false) p += a.price * n;
    });
    return p;
  }
  function onceItems() {
    const out = [];
    usedModels().forEach((m) => {
      Object.entries(custom(m.id).acc).forEach(([id, q]) => {
        const a = C.accessories[id];
        if (a && a.perSeat === false && q > 0) out.push({ m, id, a, q, total: a.price * q });
      });
    });
    return out;
  }
  function total() {
    const rp = st.rows.map(rowPrice);
    if (rp.some((p) => p === null)) return null;
    return rp.reduce((a, b) => a + b, 0) + onceItems().reduce((a, o) => a + o.total, 0);
  }
  function usedModels() {
    const seen = [];
    st.rows.forEach((r) => { if (r.model && !seen.includes(r.model)) seen.push(r.model); });
    return seen.map((id) => modelById[id]);
  }
  const rowsUsing = (mid) => st.rows.map((r, i) => (r.model === mid ? i : -1)).filter((i) => i >= 0);
  const seatsUsing = (mid) => rowsUsing(mid).reduce((a, i) => a + st.rows[i].seats, 0);
  const rowNames = (idx) => (idx.length === 1 ? `Row ${idx[0] + 1}` : `Rows ${idx.map((i) => i + 1).join(", ")}`);

  /* ---------- media ---------- */
  function media(m) {
    if (m.image) return `<img src="${esc(m.image)}" alt="${esc(brandById[m.brand].name + " " + m.name)}" loading="lazy">`;
    return window.Drawings.sideProfile(m.profile);
  }
  function swatchStyle(hex) {
    const cs = hex.split(",");
    if (cs.length === 1) return `background:${cs[0]}`;
    const w = 100 / cs.length;
    return `background:repeating-linear-gradient(90deg,${cs.map((c, i) => `${c} ${i * w}% ${(i + 1) * w}%`).join(",")})`;
  }

  /* ---------- steps ---------- */
  function renderStepper() {
    $("stepper").innerHTML = STEPS.map((name, i) => {
      const n = i + 1, cur = n === st.step, can = n <= st.reached;
      return `<li><button type="button" data-go="${n}" ${cur ? 'aria-current="step"' : ""} ${can ? "" : "disabled"}>
        <span class="num">${n < st.step || (can && !cur) ? "✓" : n}</span><span class="nm">${name}</span></button></li>`;
    }).join("");
  }

  function renderStep() {
    document.querySelectorAll(".step").forEach((s) => { s.hidden = +s.dataset.step !== st.step; });
    document.body.dataset.at = st.step;
    $("backBtn").style.visibility = st.step > 1 ? "visible" : "hidden";
    $("nextBtn").hidden = st.step === 7;
    $("nextBtn").textContent = st.step === 6 ? "See summary" : "Next";
    ({ 1: renderRoom, 2: renderRowsStep, 3: renderSeats, 4: renderCollection, 5: renderMaterials, 6: renderCustoms, 7: renderSummary })[st.step]();
    renderStepper();
  }

  // 1 Room
  function renderRoom() {
    document.querySelectorAll('input[name="unit"]').forEach((r) => { r.checked = r.value === st.unit; });
    document.querySelectorAll(".unit-lbl").forEach((e) => { e.textContent = st.unit === "m" ? "m" : "ft"; });
    if (document.activeElement && document.activeElement.closest(".dims")) return roomHint();
    $("roomW").value = fromIn(st.room.w); $("roomD").value = fromIn(st.room.d); $("roomH").value = fromIn(st.room.h);
    roomHint();
  }
  function roomHint() {
    const r = st.room;
    $("roomHint").textContent = `${len(r.w)} wide × ${len(r.d)} deep × ${len(r.h)} high  (${metres(r.w)} × ${metres(r.d)} × ${metres(r.h)})`;
  }
  function roomValid() { const r = st.room; return r.w >= 60 && r.d >= 72 && r.h >= 72; }

  // 2 Rows
  function suggestRows() {
    const g = GENERIC, pitch = g.reclined + P.rowGap;
    const n = Math.floor((st.room.d - P.rearGap - P.minFrontSpace + P.rowGap) / pitch);
    const byHeight = Math.floor((st.room.h - P.minHeadroom) / P.riser) + 1;
    return Math.max(0, Math.min(n, byHeight));
  }
  function renderRowsStep() {
    const sug = suggestRows();
    $("rowChoice").innerHTML = [1, 2, 3, 4].map((n) =>
      `<label><input type="radio" name="rows" value="${n}" ${st.rows.length === n ? "checked" : ""}>
        <span><b>${n}</b><small>${n === 1 ? "row" : "rows"}${n === sug ? " · fits best" : n > sug ? " · tight" : ""}</small></span></label>`).join("");
    $("rowHint").textContent = sug
      ? `With typical recliners (about ${len(GENERIC.reclined)} deep when reclined), a ${len(st.room.d)} deep, ${len(st.room.h)} high room fits up to ${sug} row${sug > 1 ? "s" : ""}.`
      : `This room is shallow for reclining rows. One row may still work with compact seats; we'll check on site.`;
  }
  function setRows(n) {
    while (st.rows.length < n) { const last = st.rows[st.rows.length - 1]; st.rows.push({ ...last }); }
    st.rows.length = n;
    if (st.target !== "all" && +st.target >= n) st.target = "all";
  }

  // 3 Seats
  const armIcon = (curved) => curved
    ? `<svg viewBox="0 0 60 24" aria-hidden="true"><path d="M4 6 Q30 22 56 6" class="ic"/><path d="M4 12 Q30 28 56 12" class="ic"/></svg>`
    : `<svg viewBox="0 0 60 24" aria-hidden="true"><line x1="4" y1="8" x2="56" y2="8" class="ic"/><line x1="4" y1="16" x2="56" y2="16" class="ic"/></svg>`;
  function stepper(id, val, min, max, label) {
    return `<div class="qty" role="group" aria-label="${esc(label)}">
      <button type="button" data-dec="${id}" ${val <= min ? "disabled" : ""} aria-label="Fewer">−</button>
      <output>${val}</output>
      <button type="button" data-inc="${id}" ${val >= max ? "disabled" : ""} aria-label="More">+</button></div>`;
  }
  function renderSeats() {
    const L = layout();
    $("rowCards").innerHTML = st.rows.map((r, i) => {
      const lr = L.rows[i], bad = lr.side < P.minSideGap;
      return `<div class="row-card">
        <div class="rc-head"><p class="eyebrow">Row ${i + 1}${i === 0 ? " · front" : i === st.rows.length - 1 ? " · back" : ""}</p>
          <span class="${bad ? "warn-txt" : "muted"} small">${len(lr.g.width)} wide · ${lr.side >= 0 ? len(lr.side) + " each side" : "too wide"}</span></div>
        <div class="rc-body">
          <div><span class="lbl-sm">Seats</span>${stepper("seats:" + i, r.seats, 1, 10, `Seats in row ${i + 1}`)}</div>
          <div class="arm-pick" role="radiogroup" aria-label="Arm style for row ${i + 1}">
            <span class="lbl-sm">Arms</span>
            <label><input type="radio" name="arm${i}" value="straight" data-row="${i}" ${r.arm !== "wedged" ? "checked" : ""}><span>${armIcon(false)}Straight</span></label>
            <label><input type="radio" name="arm${i}" value="wedged" data-row="${i}" ${r.arm === "wedged" ? "checked" : ""}><span>${armIcon(true)}Wedged</span></label>
          </div>
        </div></div>`;
    }).join("") + `<p class="hint">Widths use typical seat sizes until you choose a collection in the next step.</p>`;
  }

  // 4 Collection
  function renderCollection() {
    const n = st.rows.length;
    $("assignTarget").innerHTML = `<span class="lbl-sm">Choose for</span>` + ["all", ...st.rows.map((_, i) => String(i))].map((t) =>
      `<label><input type="radio" name="target" value="${t}" ${st.target === t ? "checked" : ""}><span>${t === "all" ? (n > 1 ? "All rows" : "Row 1") : "Row " + (+t + 1)}</span></label>`
    ).slice(0, n > 1 ? n + 1 : 1).join("");
    const brands = C.brands.filter((b) => theatre.some((m) => m.brand === b.id));
    $("pBrandTabs").innerHTML = [{ id: "all", name: "All brands" }, ...brands].map((b) =>
      `<button type="button" role="tab" data-brand="${b.id}" aria-selected="${st.brand === b.id}">${esc(b.name)}<sup>${b.id === "all" ? theatre.length : theatre.filter((m) => m.brand === b.id).length}</sup></button>`).join("");
    const targetRows = st.target === "all" ? st.rows.map((_, i) => i) : [+st.target];
    const list = theatre.filter((m) => st.brand === "all" || m.brand === st.brand);
    $("collections").innerHTML = list.map((m) => {
      const sel = targetRows.every((i) => st.rows[i].model === m.id);
      // would it fit the chosen rows?
      const tooWide = targetRows.filter((i) => {
        const g = rowGeom({ ...st.rows[i], model: m.id });
        return (st.room.w - g.width) / 2 < P.minSideGap;
      });
      return `<button type="button" class="coll${sel ? " sel" : ""}" data-model="${m.id}" aria-pressed="${sel}">
        <span class="coll-media${m.image ? " photo" : ""}">${media(m)}</span>
        <span class="coll-name">${esc(m.name)}</span>
        <span class="coll-meta">${esc(brandById[m.brand].name)} · from ${money(perSeatFrom(m))} / seat</span>
        ${tooWide.length ? `<span class="coll-warn">Tight for ${rowNames(tooWide).toLowerCase()}</span>` : ""}
      </button>`;
    }).join("");
    renderQtyRows();
  }
  function renderQtyRows() {
    const L = layout();
    $("qtyRows").innerHTML = st.rows.map((r, i) => {
      const m = r.model && modelById[r.model], lr = L.rows[i], bad = lr.side < P.minSideGap;
      return `<div class="qty-row${bad ? " bad" : ""}">
        <div class="qr-name"><p class="eyebrow">Row ${i + 1}</p>
          <strong>${m ? esc(brandById[m.brand].name + " " + m.name) : '<span class="muted">Choose a collection</span>'}</strong>
          <small class="muted">${r.arm === "wedged" ? "Wedged arms, curved row" : "Straight arms"}</small></div>
        ${stepper("seats:" + i, r.seats, 1, 10, `Quantity in row ${i + 1}`)}
        <div class="qr-fit">${len(lr.g.width)} wide<br><span class="${bad ? "warn-txt" : "ok-txt"}">${lr.side >= 0 ? len(lr.side) + " each side" : "does not fit"}</span></div>
        ${bad ? `<p class="qr-warn">Leaves less than ${len(P.minSideGap)} on either side. Try fewer seats${m && m.brand === "moovia" ? ", narrow armrests" : ""} or a narrower collection.</p>` : ""}
      </div>`;
    }).join("");
  }

  // 5 Materials
  function renderMaterials() {
    const used = usedModels();
    if (!used.length) { $("materials").innerHTML = `<p class="muted">Choose a collection first.</p>`; return; }
    $("materials").innerHTML = used.map((m) => {
      const b = brandById[m.brand], c = custom(m.id), idx = rowsUsing(m.id);
      const groups = groupsFor(m).filter((g) => isMaterialGroup(m, g.id));
      return `<section class="mat-model">
        <header><p class="eyebrow">${esc(b.name)} · ${rowNames(idx)} · ${seatsUsing(m.id)} seats</p><h3>${esc(m.name)}</h3></header>
        ${groups.map((g) => `<fieldset><legend>${esc(g.name)}</legend><div class="mat-grid">
          ${g.choices.map((ch) => {
            const info = (b.materials || {})[ch.id] || { colours: [] }, on = c.opt[g.id] === ch.id;
            const curCol = on ? c.colour[g.id] : null;
            return `<div class="mat${on ? " on" : ""}">
              <button type="button" class="mat-pick" data-mat="${m.id}|${g.id}|${ch.id}" aria-pressed="${on}">
                <span class="mat-name">${esc(ch.name)}</span>
                ${info.note ? `<span class="mat-note">${esc(info.note)}</span>` : ""}
                <span class="mat-add">${ch.add ? (ch.add > 0 ? "+" : "−") + money(Math.abs(ch.add)) + " / seat" : "Included"}</span>
              </button>
              ${info.colours.length ? `<div class="swatches">${info.colours.map(([nm, hex]) =>
                `<button type="button" class="sw${curCol === nm ? " on" : ""}" style="${swatchStyle(hex)}" title="${esc(nm)}" aria-label="${esc(ch.name + ", " + nm)}" aria-pressed="${curCol === nm}" data-col="${m.id}|${g.id}|${ch.id}|${esc(nm)}"></button>`).join("")}</div>
                <span class="sw-name">${on && curCol ? esc(curCol) : on ? (info.colours.length === 1 ? esc(info.colours[0][0]) : "Pick a colour") : ""}</span>` : ""}
            </div>`;
          }).join("")}</div></fieldset>`).join("")}
      </section>`;
    }).join("") + `<p class="hint">Colours shown are sample shades. Ask us for the physical sample kit.</p>`;
  }

  // 6 Customise
  function renderCustoms() {
    const used = usedModels();
    if (!used.length) { $("customs").innerHTML = `<p class="muted">Choose a collection first.</p>`; return; }
    $("customs").innerHTML = used.map((m) => {
      const b = brandById[m.brand], c = custom(m.id), idx = rowsUsing(m.id), n = seatsUsing(m.id);
      const groups = groupsFor(m).filter((g) => !isMaterialGroup(m, g.id));
      return `<section class="mat-model">
        <header><p class="eyebrow">${esc(b.name)} · ${rowNames(idx)} · ${n} seats</p><h3>${esc(m.name)}</h3></header>
        ${groups.map((g) => `<fieldset><legend>${esc(g.name)}</legend><div class="chips">
          ${g.choices.map((ch) => `<label><input type="radio" name="o-${m.id}-${g.id}" data-opt="${m.id}|${g.id}" value="${ch.id}" ${c.opt[g.id] === ch.id ? "checked" : ""}>
            <span>${esc(ch.name)}<small>${ch.add ? (ch.add > 0 ? "+" : "−") + money(Math.abs(ch.add)) + " / seat" : "Included"}</small></span></label>`).join("")}
        </div></fieldset>`).join("")}
        ${touchpointsHtml(m, n)}
        <fieldset><legend>${b.touchpoints ? "More accessories" : "Accessories"}</legend><div class="acc-list">
          ${m.accessories.filter((id) => C.accessories[id] && !tpItems(m).includes(id)).map((id) => {
            const a = C.accessories[id], q = c.acc[id] || 0;
            if (a.perSeat === false) return `<div class="acc-once"><span class="acc-name">${esc(a.name)}<small>${money(a.price)} each</small></span>${stepper("acc:" + m.id + ":" + id, q, 0, 20, a.name)}</div>`;
            return `<label><input type="checkbox" data-acc="${m.id}|${id}" ${q ? "checked" : ""}>
              <span class="acc-name">${esc(a.name)}<small>${money(a.price)} / seat × ${n}</small></span>
              <span class="acc-price">${money(a.price * n)}</span></label>`;
          }).join("")}
        </div></fieldset>
      </section>`;
    }).join("");
  }


  // "Tap + on the recliner": brands with touchpoints get a drawing with + hotspots.
  const tpItems = (m) => (brandById[m.brand].touchpoints || []).flatMap((t) => t.items);
  const tpOpen = {};
  function touchpointsHtml(m, n) {
    const tps = (brandById[m.brand].touchpoints || []).map((t) => ({ ...t, items: t.items.filter((id) => m.accessories.includes(id) && C.accessories[id]) })).filter((t) => t.items.length);
    if (!tps.length) return "";
    const c = custom(m.id), open = tps.find((t) => t.id === tpOpen[m.id]) || null;
    const on = (t) => t.items.filter((id) => c.acc[id]);
    const dots = tps.map((t, i) => {
      const k = on(t).length;
      return `<button type="button" class="tp-dot${k ? " has" : ""}${open && open.id === t.id ? " open" : ""}" style="left:${t.x}%;top:${t.y}%" data-tp="${m.id}|${t.id}" aria-label="${esc(t.name)}${k ? ", " + k + " chosen" : ""}" aria-expanded="${!!(open && open.id === t.id)}"><span>${k ? "✓" : "+"}</span></button>`;
    }).join("");
    const panel = open ? `<div class="tp-panel">
        <div class="tp-head"><p class="eyebrow">${esc(open.name)}</p><span class="muted small">${open.one ? "Choose one" : "Choose any"} · price per seat × ${n}</span></div>
        <div class="tp-opts">
          ${open.one ? `<button type="button" class="tp-opt${on(open).length ? "" : " on"}" data-tpitem="${m.id}|${open.id}|"><span>Standard</span><small>Included</small></button>` : ""}
          ${open.items.map((id) => { const a = C.accessories[id]; return `<button type="button" class="tp-opt${c.acc[id] ? " on" : ""}" data-tpitem="${m.id}|${open.id}|${id}" aria-pressed="${!!c.acc[id]}"><span>${esc(a.name)}</span><small>+${money(a.price)} / seat</small></button>`; }).join("")}
        </div></div>` : `<p class="hint tp-hint">Tap a + on the recliner to customise it.</p>`;
    const chosenList = tps.flatMap((t) => on(t).map((id) => C.accessories[id].name));
    return `<fieldset class="tp"><legend>Customise your comfort</legend>
      <div class="tp-wrap"><div class="tp-stage">${window.Drawings.sideProfile(m.profile === "lounger" ? "lounger" : "highback")}${dots}</div>
      <div class="tp-side">${panel}
        <p class="tp-chosen">${chosenList.length ? "Chosen: " + esc(chosenList.join(", ")) : "Nothing added yet."}</p></div></div>
    </fieldset>`;
  }

  // 7 Summary
  function describeModel(m) {
    const c = custom(m.id), b = brandById[m.brand];
    const mats = groupsFor(m).filter((g) => isMaterialGroup(m, g.id)).map((g) => {
      const ch = choice(m, g.id), info = (b.materials || {})[ch.id], many = info && info.colours.length > 1;
      return `${g.name}: ${ch.name}${c.colour[g.id] ? " (" + c.colour[g.id] + ")" : many ? " (colour to confirm)" : ""}`;
    });
    const opts = groupsFor(m).filter((g) => !isMaterialGroup(m, g.id)).map((g) => `${g.name}: ${choice(m, g.id).name}`);
    const acc = Object.entries(c.acc).filter(([id, q]) => q && C.accessories[id] && C.accessories[id].perSeat !== false).map(([id]) => C.accessories[id].name);
    return { b, mats, opts, acc };
  }
  function renderSummary() {
    const L = layout(), t = total();
    const rowsHtml = st.rows.map((r, i) => {
      const m = modelById[r.model];
      return `<tr><td>Row ${i + 1}</td><td>${m ? esc(brandById[m.brand].name + " " + m.name) : "—"}<small>${r.seats} seats · ${r.arm === "wedged" ? "wedged arms (curved)" : "straight arms"} · ${len(L.rows[i].g.width)} wide</small></td><td class="num">${rowPrice(r) != null ? money(rowPrice(r)) : "—"}</td></tr>`;
    }).join("");
    const once = onceItems().map((o) => `<tr><td></td><td>${esc(o.a.name)}<small>${esc(o.m.name)} · ${o.q} × ${money(o.a.price)}</small></td><td class="num">${money(o.total)}</td></tr>`).join("");
    const spec = usedModels().map((m) => {
      const d = describeModel(m);
      return `<div class="spec"><p class="eyebrow">${esc(d.b.name)} ${esc(m.name)} · ${rowNames(rowsUsing(m.id))}</p>
        <ul>${[...d.mats, ...d.opts].map((x) => `<li>${esc(x)}</li>`).join("")}${d.acc.length ? `<li>Accessories: ${esc(d.acc.join(", "))}</li>` : ""}</ul></div>`;
    }).join("");
    $("summary").innerHTML = `
      <div class="sum-grid">
        <div class="sum-plan">${planSVG(L, true)}</div>
        <div>
          <p class="sum-room">Room ${len(st.room.w)} × ${len(st.room.d)} × ${len(st.room.h)} <span class="muted">(W × D × H)</span></p>
          <ul class="checks">${checksHtml(L)}</ul>
          ${spec}
        </div>
      </div>
      <table class="sum-table"><tbody>${rowsHtml}${once}</tbody>
        <tfoot><tr><td></td><td>Estimated total <small>${esc(S.priceNote || "")}</small></td><td class="num">${t != null ? money(t) : "—"}</td></tr></tfoot></table>`;
    $("sendWhatsapp").href = `https://wa.me/${S.whatsappNumber}?text=${encodeURIComponent(quoteText())}`;
  }
  function quoteText() {
    const L = layout(), t = total();
    const lines = [`Home theatre plan (${S.companyName})`, `Room: ${len(st.room.w)} W × ${len(st.room.d)} D × ${len(st.room.h)} H`, ""];
    st.rows.forEach((r, i) => {
      const m = modelById[r.model];
      lines.push(`Row ${i + 1}: ${r.seats} × ${m ? brandById[m.brand].name + " " + m.name : "(not chosen)"}, ${r.arm === "wedged" ? "wedged arms" : "straight arms"}, ${len(L.rows[i].g.width)} wide${rowPrice(r) != null ? " — " + money(rowPrice(r)) : ""}`);
    });
    usedModels().forEach((m) => {
      const d = describeModel(m);
      lines.push("", `${d.b.name} ${m.name}:`, ...[...d.mats, ...d.opts].map((x) => "  " + x));
      if (d.acc.length) lines.push("  Accessories: " + d.acc.join(", "));
    });
    const once = onceItems();
    if (once.length) lines.push("", ...once.map((o) => `${o.q} × ${o.a.name} (${o.m.name}) — ${money(o.total)}`));
    const warn = L.checks.filter((c) => c.bad);
    if (warn.length) lines.push("", "To check:", ...warn.map((c) => "  " + c.text));
    lines.push("", `Estimated total: ${t != null ? money(t) : "—"}`, S.priceNote || "", "", planLink());
    return lines.join("\n");
  }

  /* ---------- side panel ---------- */
  function checksHtml(L) {
    return L.checks.map((c) => `<li class="${c.bad ? "bad" : "ok"}"><span aria-hidden="true">${c.bad ? "!" : "✓"}</span>${esc(c.text)}</li>`).join("");
  }
  function renderSide() {
    const L = layout(), t = total();
    $("planDims").textContent = `${len(st.room.w)} × ${len(st.room.d)} × ${len(st.room.h)}`;
    $("plan").innerHTML = planSVG(L);
    $("checks").innerHTML = checksHtml(L);
    const seats = st.rows.reduce((a, r) => a + r.seats, 0);
    $("sideTotal").textContent = t != null ? money(t) : "—";
    $("sideSeats").textContent = `${seats} seats in ${st.rows.length} row${st.rows.length > 1 ? "s" : ""}${t == null ? " · choose a collection to see a price" : ""}`;
    save();
  }
  function render() { renderStep(); renderSide(); }

  function go(n) {
    if (n > 1 && !roomValid()) { toast("Enter the room size first"); n = 1; }
    if (n > 4 && st.rows.some((r) => !r.model)) { toast("Choose a collection for every row"); n = 4; }
    st.step = n; st.reached = Math.max(st.reached, n);
    render();
    document.querySelector(".stepper").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  /* ---------- utilities ---------- */
  function toast(msg) {
    const t = $("toast"); t.textContent = msg; t.classList.add("show");
    clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove("show"), 2400);
  }
  async function copyText(text) {
    try { await navigator.clipboard.writeText(text); return true; } catch (e) {
      const ta = document.createElement("textarea"); ta.value = text; document.body.appendChild(ta); ta.select();
      let ok = false; try { ok = document.execCommand("copy"); } catch (e2) { /* ignore */ }
      ta.remove(); return ok;
    }
  }

  /* ---------- events ---------- */
  document.addEventListener("click", (e) => {
    const t = e.target.closest("button, [data-go]");
    if (!t) return;
    if (t.dataset.go) return go(+t.dataset.go);
    const step = t.dataset.inc || t.dataset.dec;
    if (step) {
      const d = t.dataset.inc ? 1 : -1, [kind, a, b] = step.split(":");
      if (kind === "seats") st.rows[+a].seats = Math.min(10, Math.max(1, st.rows[+a].seats + d));
      if (kind === "acc") { const c = custom(a); c.acc[b] = Math.max(0, (c.acc[b] || 0) + d); }
      return render();
    }
    if (t.dataset.brand) { st.brand = t.dataset.brand; return renderCollection(); }
    if (t.dataset.model) {
      const rows = st.target === "all" ? st.rows : [st.rows[+st.target]];
      rows.forEach((r) => { r.model = t.dataset.model; });
      custom(t.dataset.model);
      return render();
    }
    if (t.dataset.tp) {
      const [mid, tid] = t.dataset.tp.split("|");
      tpOpen[mid] = tpOpen[mid] === tid ? null : tid;
      return renderCustoms();
    }
    if (t.dataset.tpitem != null) {
      const [mid, tid, id] = t.dataset.tpitem.split("|"), c = custom(mid);
      const tp = brandById[modelById[mid].brand].touchpoints.find((x) => x.id === tid);
      if (tp.one) { tp.items.forEach((x) => { c.acc[x] = 0; }); if (id) c.acc[id] = 1; }
      else if (id) c.acc[id] = c.acc[id] ? 0 : 1;
      return render();
    }
    if (t.dataset.mat) {
      const [mid, gid, cid] = t.dataset.mat.split("|"), c = custom(mid);
      if (c.opt[gid] !== cid) { c.opt[gid] = cid; delete c.colour[gid]; }
      return render();
    }
    if (t.dataset.col) {
      const [mid, gid, cid, nm] = t.dataset.col.split("|"), c = custom(mid);
      c.opt[gid] = cid; c.colour[gid] = nm;
      return render();
    }
  });
  document.addEventListener("change", (e) => {
    const t = e.target;
    if (t.name === "unit") { st.unit = t.value; return render(); }
    if (t.name === "rows") { setRows(+t.value); return render(); }
    if (t.name === "target") { st.target = t.value; return renderCollection(); }
    if (t.dataset.row != null && t.name.startsWith("arm")) { st.rows[+t.dataset.row].arm = t.value; return render(); }
    if (t.dataset.opt) { const [mid, gid] = t.dataset.opt.split("|"); custom(mid).opt[gid] = t.value; return render(); }
    if (t.dataset.acc) { const [mid, id] = t.dataset.acc.split("|"); custom(mid).acc[id] = t.checked ? 1 : 0; return render(); }
  });
  ["roomW", "roomD", "roomH"].forEach((id) => $(id).addEventListener("input", (e) => {
    const v = parseFloat(e.target.value);
    if (!(v > 0)) return;
    st.room[{ roomW: "w", roomD: "d", roomH: "h" }[id]] = Math.round(toIn(v) * 10) / 10;
    roomHint(); renderSide();
  }));
  $("nextBtn").addEventListener("click", () => go(Math.min(7, st.step + 1)));
  $("backBtn").addEventListener("click", () => go(Math.max(1, st.step - 1)));
  $("copyQuote").addEventListener("click", async () => toast((await copyText(quoteText())) ? "Quote copied" : "Could not copy"));
  $("copyLink").addEventListener("click", async () => toast((await copyText(planLink())) ? "Link copied: anyone can open this plan" : "Could not copy"));
  $("printQuote").addEventListener("click", () => window.print());
  $("startOver").addEventListener("click", () => {
    if (!confirm("Clear this plan and start again?")) return;
    st = fresh(); history.replaceState(null, "", location.pathname); go(1);
  });

  /* ---------- boot ---------- */
  $("sampleNotice").hidden = !S.sampleData;
  $("priceNote").textContent = S.priceNote || "";
  $("contactLine").textContent = `Questions? WhatsApp +${S.whatsappNumber} · ${S.email}`;
  if (location.hash.includes("plan=")) history.replaceState(null, "", location.pathname);
  render();
})();

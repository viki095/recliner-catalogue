(function () {
  "use strict";

  const C = window.CATALOGUE;
  const S = C.settings;
  const $ = (id) => document.getElementById(id);
  const brandById = Object.fromEntries(C.brands.map((b) => [b.id, b]));
  const modelById = Object.fromEntries(C.models.map((m) => [m.id, m]));
  const fmt = new Intl.NumberFormat("en-IN", { style: "currency", currency: S.currency || "INR", maximumFractionDigits: 0 });
  const money = (n) => fmt.format(n);
  const signed = (n) => (n < 0 ? "−" + money(-n) : "+" + money(n));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const state = { brand: "all", collection: "all", q: "", sort: "brand", shortlist: loadShortlist() };

  /* ---------- pricing ---------- */
  function seatsOf(v) {
    if (v.seats) return v.seats;
    const m = String(v.name).match(/(\d+)/);
    return m ? parseInt(m[1], 10) : 1;
  }
  function minPrice(m) { return Math.min(...m.variants.map((v) => v.price)); }
  function accPrice(id, seats) {
    const a = C.accessories[id];
    return a.perSeat === false ? a.price : a.price * seats;
  }
  // Option groups for a model: brand groups, narrowed by model.only
  function groupsFor(m) {
    const only = m.only || {};
    return (brandById[m.brand].options || []).map((g) => ({
      ...g,
      choices: only[g.id] ? g.choices.filter((c) => only[g.id].includes(c.id)) : g.choices
    })).filter((g) => g.choices.length);
  }
  function defaultOptions(m) {
    return Object.fromEntries(groupsFor(m).map((g) => [g.id, g.choices[0].id]));
  }
  function chosen(m, opts) {
    return groupsFor(m).map((g) => ({ group: g, choice: g.choices.find((c) => c.id === opts[g.id]) || g.choices[0] }));
  }
  function configPrice(cfg) {
    const m = modelById[cfg.modelId];
    if (!m) return 0;
    const v = m.variants[cfg.variant] || m.variants[0];
    const seats = seatsOf(v);
    const opt = chosen(m, cfg.options).reduce((s, o) => s + o.choice.add * seats, 0);
    const acc = cfg.accessories.reduce((s, id) => s + (C.accessories[id] ? accPrice(id, seats) : 0), 0);
    return v.price + opt + acc;
  }

  /* ---------- line drawings ---------- */
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

  function cardMedia(m) {
    if (m.image) return `<img src="${esc(m.image)}" alt="${esc(brandById[m.brand].name + " " + m.name)}" loading="lazy">`;
    if (m.profile === "sofa") return rowElevation(Math.min(3, Math.max(...m.variants.map(seatsOf))), "sofa");
    return sideProfile(m.profile);
  }

  /* ---------- small utilities ---------- */
  function toast(msg) {
    const t = $("toast");
    t.textContent = msg; t.classList.add("show");
    clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove("show"), 2200);
  }
  function loadShortlist() {
    try {
      return JSON.parse(localStorage.getItem("recliner-shortlist-v2") || "[]")
        .filter((i) => modelById[i.modelId] && i.options && Array.isArray(i.accessories));
    } catch (e) { return []; }
  }
  function saveShortlist() {
    try { localStorage.setItem("recliner-shortlist-v2", JSON.stringify(state.shortlist)); } catch (e) { /* storage unavailable */ }
    renderShortlistCount();
  }
  async function copyText(text) {
    try { await navigator.clipboard.writeText(text); return true; }
    catch (e) {
      const ta = document.createElement("textarea");
      ta.value = text; document.body.appendChild(ta); ta.select();
      const ok = document.execCommand("copy"); ta.remove(); return ok;
    }
  }

  /* ---------- static text ---------- */
  document.title = `${S.pageTitle} | ${S.companyName}`;
  $("logo").textContent = S.companyName;
  $("eyebrow").textContent = S.eyebrow || "";
  $("heroTitle").textContent = S.pageTitle;
  $("sampleNotice").hidden = !S.sampleData;
  $("priceNote").textContent = S.priceNote;
  $("drawerNote").textContent = S.priceNote;
  $("contactLine").innerHTML = `Questions? WhatsApp <a href="https://wa.me/${esc(S.whatsappNumber)}">+${esc(S.whatsappNumber)}</a> or email <a href="mailto:${esc(S.email)}">${esc(S.email)}</a>.`;

  /* ---------- filters ---------- */
  function renderTabs() {
    const all = [{ id: "all", name: "All brands" }, ...C.brands];
    $("brandTabs").innerHTML = all.map((b) => {
      const n = b.id === "all" ? C.models.length : C.models.filter((m) => m.brand === b.id).length;
      return `<button type="button" role="tab" data-brand="${b.id}" aria-selected="${state.brand === b.id}">${esc(b.name)}<sup>${n}</sup></button>`;
    }).join("");
  }
  $("brandTabs").addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-brand]");
    if (!btn) return;
    state.brand = btn.dataset.brand;
    renderTabs(); renderGrid();
  });
  const collections = [...new Set(C.models.map((m) => m.collection))];
  $("typeFilter").innerHTML = `<option value="all">All collections</option>` + collections.map((t) => `<option>${esc(t)}</option>`).join("");
  $("typeFilter").addEventListener("change", (e) => { state.collection = e.target.value; renderGrid(); });
  $("sort").addEventListener("change", (e) => { state.sort = e.target.value; renderGrid(); });
  $("search").addEventListener("input", (e) => { state.q = e.target.value.trim().toLowerCase(); renderGrid(); });

  /* ---------- grid ---------- */
  function filtered() {
    const order = Object.fromEntries(C.brands.map((b, i) => [b.id, i]));
    const list = C.models.filter((m) => {
      if (state.brand !== "all" && m.brand !== state.brand) return false;
      if (state.collection !== "all" && m.collection !== state.collection) return false;
      if (state.q) {
        const hay = [m.name, m.code, m.collection, m.description, brandById[m.brand].name, ...m.features,
          ...m.accessories.map((a) => (C.accessories[a] ? C.accessories[a].name : ""))].join(" ").toLowerCase();
        if (!hay.includes(state.q)) return false;
      }
      return true;
    });
    const by = {
      brand: (a, b) => order[a.brand] - order[b.brand],
      "price-asc": (a, b) => minPrice(a) - minPrice(b),
      "price-desc": (a, b) => minPrice(b) - minPrice(a),
      name: (a, b) => a.name.localeCompare(b.name)
    }[state.sort];
    return list.sort(by); // stable: keeps file order within a brand
  }
  function card(m, i) {
    const sizes = m.variants.length > 1 ? `${m.variants.length} configurations` : esc(m.variants[0].name);
    return `<button type="button" class="card" data-id="${m.id}">
      <div class="media">${cardMedia(m)}</div>
      <div class="card-top"><span class="eyebrow">${esc(brandById[m.brand].name)} · ${esc(m.collection)}</span><span class="idx">${String(i + 1).padStart(2, "0")}</span></div>
      <h3>${esc(m.name)}</h3>
      <span class="meta">${sizes} · ${m.accessories.length} accessories</span>
      <div class="price"><span><span class="from">From</span><strong>${money(minPrice(m))}</strong></span><span class="view">Configure</span></div>
    </button>`;
  }
  function renderGrid() {
    const list = filtered();
    $("resultCount").textContent = `${list.length} model${list.length === 1 ? "" : "s"}`;
    if (!list.length) {
      $("grid").innerHTML = `<p class="empty">No models match. Try another brand or collection, or clear the search.</p>`;
      return;
    }
    if (state.sort === "brand") {
      $("grid").innerHTML = C.brands.map((b) => {
        const items = list.filter((m) => m.brand === b.id);
        if (!items.length) return "";
        return `<section class="brand-section">
          <div class="brand-head">
            <div><p class="eyebrow">${esc(b.origin || "")}</p><h2>${esc(b.name)}</h2></div>
            <div><p>${esc(b.tagline || "")}</p>${b.website ? `<p style="margin-top:10px"><a class="site" href="${esc(b.website)}" target="_blank" rel="noopener">Brand website ↗</a></p>` : ""}</div>
          </div>
          <div class="grid">${items.map(card).join("")}</div>
        </section>`;
      }).join("");
    } else {
      $("grid").innerHTML = `<div class="grid" style="margin-top:24px;border-top:1px solid var(--line)">${list.map(card).join("")}</div>`;
    }
  }
  $("grid").addEventListener("click", (e) => {
    const c = e.target.closest(".card");
    if (c) openModel(c.dataset.id);
  });

  /* ---------- configurator ---------- */
  let current = null; // { modelId, variant, options: {}, accessories: [] }

  function openModel(id, push = true) {
    const m = modelById[id];
    if (!m) return;
    const b = brandById[m.brand];
    current = { modelId: id, variant: 0, options: defaultOptions(m), accessories: [] };

    $("mMedia").innerHTML = m.image ? `<img src="${esc(m.image)}" alt="${esc(b.name + " " + m.name)}">` : sideProfile(m.profile === "sofa" ? "lowback" : m.profile);
    $("mCaption1").hidden = !!m.image;
    $("mBrand").textContent = `${b.name} · ${m.collection} · ${m.code}`;
    $("mTitle").textContent = m.name;
    $("mDesc").textContent = m.description || "";
    $("mFeatures").innerHTML = m.features.map((f) => `<li>${esc(f)}</li>`).join("");

    $("mVariants").innerHTML = m.variants.map((v, i) => `
      <label><input type="radio" name="variant" value="${i}" ${i === 0 ? "checked" : ""}>
        <span>${esc(v.name)}<small>${money(v.price)}</small></span></label>`).join("");

    $("mOptions").innerHTML = groupsFor(m).map((g) => `
      <fieldset><legend>${esc(g.name)}</legend><div class="chips">
        ${g.choices.map((c, i) => `<label><input type="radio" name="opt-${g.id}" data-group="${g.id}" value="${c.id}" ${i === 0 ? "checked" : ""}>
          <span>${esc(c.name)}<small>${c.add ? signed(c.add) + " / seat" : "Included"}</small></span></label>`).join("")}
      </div></fieldset>`).join("");

    renderAccessories(); renderRow(); updateTotal();
    if (push) history.replaceState(null, "", "#model=" + id);
    if (!$("modelDialog").open) $("modelDialog").showModal();
    $("modelDialog").querySelector(".m-body").scrollTop = 0;
  }
  function renderRow() {
    const m = modelById[current.modelId];
    const v = m.variants[current.variant];
    const n = seatsOf(v);
    $("mRow").innerHTML = rowElevation(n, m.profile);
    $("mCaption2").textContent = `Front elevation · ${v.name}`;
  }
  function renderAccessories() {
    const m = modelById[current.modelId];
    const seats = seatsOf(m.variants[current.variant]);
    $("mAccessories").innerHTML = m.accessories.filter((id) => C.accessories[id]).map((id) => {
      const a = C.accessories[id];
      const per = a.perSeat === false ? "<small>Per set</small>" : seats > 1 ? `<small>${money(a.price)} × ${seats} seats</small>` : "";
      return `<label><input type="checkbox" value="${id}" ${current.accessories.includes(id) ? "checked" : ""}>
        <span class="acc-name">${esc(a.name)}${per}</span><span class="acc-price">+${money(accPrice(id, seats))}</span></label>`;
    }).join("") || `<p class="muted">No accessories listed for this model.</p>`;
  }
  function updateTotal() {
    const m = modelById[current.modelId];
    const v = m.variants[current.variant];
    const seats = seatsOf(v);
    const parts = [`Base ${money(v.price)}`];
    chosen(m, current.options).forEach((o) => { if (o.choice.add) parts.push(`${o.choice.name} ${signed(o.choice.add * seats)}`); });
    const accTotal = current.accessories.reduce((s, id) => s + accPrice(id, seats), 0);
    if (accTotal) parts.push(`${current.accessories.length} accessor${current.accessories.length === 1 ? "y" : "ies"} +${money(accTotal)}`);
    $("mTotal").textContent = money(configPrice(current));
    $("mBreakdown").textContent = parts.join(" · ");
  }
  $("modelForm").addEventListener("change", (e) => {
    if (!current) return;
    const t = e.target;
    if (t.name === "variant") { current.variant = +t.value; renderAccessories(); renderRow(); }
    else if (t.dataset.group) current.options[t.dataset.group] = t.value;
    else if (t.type === "checkbox") current.accessories = [...$("mAccessories").querySelectorAll("input:checked")].map((i) => i.value);
    updateTotal();
  });
  $("mAdd").addEventListener("click", () => {
    state.shortlist.push({ ...current, options: { ...current.options }, accessories: [...current.accessories], qty: 1 });
    saveShortlist();
    $("modelDialog").close();
    toast("Added to shortlist");
  });
  $("mShare").addEventListener("click", async () => {
    const url = location.href.split("#")[0] + "#model=" + current.modelId;
    toast((await copyText(url)) ? "Link copied" : url);
  });
  $("modelDialog").addEventListener("close", () => {
    if (location.hash.startsWith("#model=")) history.replaceState(null, "", location.pathname + location.search);
  });
  [$("modelDialog"), $("shortlistDialog")].forEach((d) => d.addEventListener("click", (e) => { if (e.target === d) d.close(); }));

  /* ---------- shortlist ---------- */
  function renderShortlistCount() { $("shortlistCount").textContent = state.shortlist.reduce((s, i) => s + i.qty, 0); }
  function describe(item) {
    const m = modelById[item.modelId];
    const v = m.variants[item.variant] || m.variants[0];
    const opts = chosen(m, item.options).map((o) => o.choice.name);
    const acc = item.accessories.map((id) => C.accessories[id] && C.accessories[id].name).filter(Boolean);
    return { m, b: brandById[m.brand], v, opts, acc, unit: configPrice(item) };
  }
  function grandTotal() { return state.shortlist.reduce((s, i) => s + configPrice(i) * i.qty, 0); }
  function renderShortlist() {
    const box = $("shortlistItems");
    box.innerHTML = state.shortlist.length ? state.shortlist.map((item, i) => {
      const d = describe(item);
      return `<div class="s-item" data-i="${i}">
        <h4><small>${esc(d.b.name)}</small>${esc(d.m.name)}</h4>
        <span class="line-total">${money(d.unit * item.qty)}</span>
        <span class="meta">${esc(d.v.name)} · ${d.opts.map(esc).join(" · ")}${d.acc.length ? "<br>+ " + d.acc.map(esc).join(", ") : ""}</span>
        <span class="qty"><button type="button" data-act="dec" aria-label="Fewer">−</button> Qty ${item.qty} <button type="button" data-act="inc" aria-label="More">+</button></span>
        <button type="button" class="remove" data-act="remove">Remove</button>
      </div>`;
    }).join("") : `<p class="drawer-empty">Nothing here yet. Open a model and choose “Add to shortlist”.</p>`;
    $("grandTotal").textContent = money(grandTotal());
    $("sendWhatsapp").href = `https://wa.me/${S.whatsappNumber}?text=${encodeURIComponent(quoteText())}`;
    const empty = !state.shortlist.length;
    ["sendWhatsapp", "copyQuote", "printQuote", "clearShortlist"].forEach((id) => {
      $(id).toggleAttribute("aria-disabled", empty);
      $(id).style.pointerEvents = empty ? "none" : "";
      $(id).style.opacity = empty ? ".4" : "";
    });
  }
  function quoteText() {
    const lines = [`Recliner shortlist (${S.companyName})`, ""];
    state.shortlist.forEach((item, i) => {
      const d = describe(item);
      lines.push(`${i + 1}. ${d.b.name} ${d.m.name} (${d.m.code})`);
      lines.push(`   ${d.v.name}; ${d.opts.join("; ")}${item.qty > 1 ? `; qty ${item.qty}` : ""}`);
      if (d.acc.length) lines.push(`   Accessories: ${d.acc.join(", ")}`);
      lines.push(`   Tentative: ${money(d.unit * item.qty)}`);
    });
    lines.push("", `Estimated total: ${money(grandTotal())}`, S.priceNote);
    return lines.join("\n");
  }
  $("shortlistItems").addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-act]");
    if (!btn) return;
    const i = +btn.closest(".s-item").dataset.i;
    const item = state.shortlist[i];
    if (btn.dataset.act === "inc") item.qty++;
    if (btn.dataset.act === "dec") item.qty = Math.max(1, item.qty - 1);
    if (btn.dataset.act === "remove") state.shortlist.splice(i, 1);
    saveShortlist(); renderShortlist();
  });
  $("openShortlist").addEventListener("click", () => { renderShortlist(); $("shortlistDialog").showModal(); });
  $("closeShortlist").addEventListener("click", () => $("shortlistDialog").close());
  $("copyQuote").addEventListener("click", async () => toast((await copyText(quoteText())) ? "Shortlist copied" : "Could not copy"));
  $("printQuote").addEventListener("click", () => window.print());
  $("clearShortlist").addEventListener("click", () => {
    if (!confirm("Remove everything from the shortlist?")) return;
    state.shortlist = []; saveShortlist(); renderShortlist();
  });

  /* ---------- boot ---------- */
  renderTabs(); renderGrid(); renderShortlistCount();
  const deep = location.hash.match(/^#model=([\w-]+)/);
  if (deep) openModel(deep[1], false);
})();

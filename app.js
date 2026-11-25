(function () {
  "use strict";

  const C = window.CATALOGUE;
  const S = C.settings;
  const $ = (id) => document.getElementById(id);
  const brandById = Object.fromEntries(C.brands.map((b) => [b.id, b]));
  const modelById = Object.fromEntries(C.models.map((m) => [m.id, m]));
  const fmt = new Intl.NumberFormat("en-IN", { style: "currency", currency: S.currency || "INR", maximumFractionDigits: 0 });
  const money = (n) => fmt.format(n);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const state = { brand: "all", type: "all", q: "", sort: "brand", shortlist: loadShortlist() };

  /* ---------- helpers ---------- */
  function seatsOf(variant) {
    if (variant.seats) return variant.seats;
    const m = String(variant.name).match(/(\d+)/);
    return m ? parseInt(m[1], 10) : 1;
  }
  function minPrice(model) { return Math.min(...model.variants.map((v) => v.price)); }
  function accPrice(accId, seats) {
    const a = C.accessories[accId];
    return a.perSeat === false ? a.price : a.price * seats;
  }
  function configPrice(cfg) {
    const m = modelById[cfg.modelId];
    if (!m) return 0;
    const v = m.variants[cfg.variant] || m.variants[0];
    const seats = seatsOf(v);
    const uph = C.upholstery.find((u) => u.id === cfg.upholstery) || C.upholstery[0];
    const acc = cfg.accessories.reduce((sum, id) => sum + (C.accessories[id] ? accPrice(id, seats) : 0), 0);
    return v.price + uph.add * seats + acc;
  }
  function placeholderSvg(color, type) {
    const lift = type === "Lift-Chair";
    const rows = /row|Sofa/.test(type) ? 1 : 0;
    return `<svg viewBox="0 0 240 170" aria-hidden="true">
      <ellipse cx="120" cy="156" rx="${rows ? 104 : 86}" ry="8" fill="currentColor" opacity=".08"/>
      <g fill="${color}">
        <rect x="56" y="${lift ? 22 : 30}" width="100" height="78" rx="20" transform="rotate(-12 106 70)" opacity=".92"/>
        <rect x="58" y="86" width="118" height="34" rx="12"/>
        <rect x="40" y="70" width="28" height="62" rx="12" opacity=".85"/>
        <rect x="166" y="70" width="28" height="62" rx="12" opacity=".85"/>
        <rect x="150" y="112" width="70" height="20" rx="10" transform="rotate(14 150 122)" opacity=".75"/>
      </g>
      <rect x="62" y="132" width="110" height="8" rx="4" fill="currentColor" opacity=".25"/>
    </svg>`;
  }
  function media(m) {
    const b = brandById[m.brand];
    return m.image
      ? `<img src="${esc(m.image)}" alt="${esc(b.name + " " + m.name)}" loading="lazy">`
      : placeholderSvg(b.color, m.type);
  }
  function toast(msg) {
    const t = $("toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => t.classList.remove("show"), 2200);
  }
  function loadShortlist() {
    try { return JSON.parse(localStorage.getItem("recliner-shortlist") || "[]").filter((i) => modelById[i.modelId]); }
    catch (e) { return []; }
  }
  function saveShortlist() {
    try { localStorage.setItem("recliner-shortlist", JSON.stringify(state.shortlist)); } catch (e) { /* storage unavailable */ }
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

  /* ---------- static bits ---------- */
  document.title = `${S.pageTitle} | ${S.companyName}`;
  $("logo").textContent = S.companyName;
  $("heroTitle").textContent = S.pageTitle;
  $("sampleNotice").hidden = !S.sampleData;
  $("priceNote").textContent = S.priceNote;
  $("drawerNote").textContent = S.priceNote;
  $("contactLine").innerHTML = `Questions? WhatsApp <a href="https://wa.me/${esc(S.whatsappNumber)}">+${esc(S.whatsappNumber)}</a> or email <a href="mailto:${esc(S.email)}">${esc(S.email)}</a>`;

  /* ---------- filters ---------- */
  function renderTabs() {
    const all = [{ id: "all", name: "All brands", color: "" }, ...C.brands];
    $("brandTabs").innerHTML = all.map((b) => {
      const n = b.id === "all" ? C.models.length : C.models.filter((m) => m.brand === b.id).length;
      return `<button type="button" role="tab" data-brand="${b.id}" aria-selected="${state.brand === b.id}">
        ${b.color ? `<span class="dot" style="background:${b.color}"></span>` : ""}${esc(b.name)} <span class="muted">${n}</span></button>`;
    }).join("");
  }
  $("brandTabs").addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-brand]");
    if (!btn) return;
    state.brand = btn.dataset.brand;
    renderTabs(); renderGrid();
  });

  const types = [...new Set(C.models.map((m) => m.type))].sort();
  $("typeFilter").innerHTML = `<option value="all">All types</option>` + types.map((t) => `<option>${esc(t)}</option>`).join("");
  $("typeFilter").addEventListener("change", (e) => { state.type = e.target.value; renderGrid(); });
  $("sort").addEventListener("change", (e) => { state.sort = e.target.value; renderGrid(); });
  $("search").addEventListener("input", (e) => { state.q = e.target.value.trim().toLowerCase(); renderGrid(); });

  /* ---------- grid ---------- */
  function filtered() {
    const brandOrder = Object.fromEntries(C.brands.map((b, i) => [b.id, i]));
    let list = C.models.filter((m) => {
      if (state.brand !== "all" && m.brand !== state.brand) return false;
      if (state.type !== "all" && m.type !== state.type) return false;
      if (state.q) {
        const hay = [m.name, m.code, m.type, m.description, brandById[m.brand].name, ...m.features,
          ...m.accessories.map((a) => C.accessories[a] ? C.accessories[a].name : "")].join(" ").toLowerCase();
        if (!hay.includes(state.q)) return false;
      }
      return true;
    });
    const by = {
      brand: (a, b) => brandOrder[a.brand] - brandOrder[b.brand] || minPrice(a) - minPrice(b),
      "price-asc": (a, b) => minPrice(a) - minPrice(b),
      "price-desc": (a, b) => minPrice(b) - minPrice(a),
      name: (a, b) => a.name.localeCompare(b.name)
    }[state.sort];
    return list.sort(by);
  }
  function renderGrid() {
    const list = filtered();
    $("resultCount").textContent = `${list.length} model${list.length === 1 ? "" : "s"}`;
    if (!list.length) {
      $("grid").innerHTML = `<p class="empty">No models match. Try another brand or clear the search.</p>`;
      return;
    }
    $("grid").innerHTML = list.map((m) => {
      const b = brandById[m.brand];
      const sizes = m.variants.length > 1 ? `${m.variants.length} sizes · ` : "";
      return `<button type="button" class="card" data-id="${m.id}">
        <div class="media">${media(m)}</div>
        <div class="card-body">
          <div class="card-top">
            <span class="brand-pill"><span class="dot" style="background:${b.color}"></span>${esc(b.name)}</span>
            <span class="type">${esc(m.type)}</span>
          </div>
          <h3>${esc(m.name)}</h3>
          <span class="code">${esc(m.code)}</span>
          <span class="acc-count">${sizes}${m.accessories.length} accessories available</span>
          <div class="price"><span><span class="muted small">From </span><strong>${money(minPrice(m))}</strong></span><span class="view">Configure →</span></div>
        </div>
      </button>`;
    }).join("");
  }
  $("grid").addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    if (card) openModel(card.dataset.id);
  });

  /* ---------- model configurator ---------- */
  let current = null; // { modelId, variant, upholstery, accessories: [] }

  function openModel(id, push = true) {
    const m = modelById[id];
    if (!m) return;
    const b = brandById[m.brand];
    current = { modelId: id, variant: 0, upholstery: C.upholstery[0].id, accessories: [] };

    $("mMedia").innerHTML = media(m);
    $("mBrand").innerHTML = `<span style="color:${b.color}">${esc(b.name)}</span> <span class="muted">· ${esc(m.code)} · ${esc(m.type)}</span>`;
    $("mTitle").textContent = m.name;
    $("mDesc").textContent = m.description || "";
    $("mFeatures").innerHTML = m.features.map((f) => `<li>${esc(f)}</li>`).join("");

    $("mVariants").innerHTML = m.variants.map((v, i) => `
      <label><input type="radio" name="variant" value="${i}" ${i === 0 ? "checked" : ""}>
        <span>${esc(v.name)}<small>${money(v.price)}</small></span></label>`).join("");
    $("mUpholstery").innerHTML = C.upholstery.map((u, i) => `
      <label><input type="radio" name="uph" value="${u.id}" ${i === 0 ? "checked" : ""}>
        <span>${esc(u.name)}<small>${u.add ? "+" + money(u.add) + " / seat" : "Included"}</small></span></label>`).join("");
    renderAccessories();
    updateTotal();

    if (push) history.replaceState(null, "", "#model=" + id);
    if (!$("modelDialog").open) $("modelDialog").showModal();
    $("modelDialog").querySelector(".m-body").scrollTop = 0;
  }
  function renderAccessories() {
    const m = modelById[current.modelId];
    const seats = seatsOf(m.variants[current.variant]);
    $("mAccessories").innerHTML = m.accessories.filter((id) => C.accessories[id]).map((id) => {
      const a = C.accessories[id];
      const per = a.perSeat === false || seats === 1 ? "" : `<small>${money(a.price)} × ${seats} seats</small>`;
      return `<label><input type="checkbox" value="${id}" ${current.accessories.includes(id) ? "checked" : ""}>
        <span class="acc-name">${esc(a.name)}${per}</span><span class="acc-price">+${money(accPrice(id, seats))}</span></label>`;
    }).join("") || `<p class="muted">No accessories for this model.</p>`;
  }
  function updateTotal() {
    const m = modelById[current.modelId];
    const v = m.variants[current.variant];
    const seats = seatsOf(v);
    const uph = C.upholstery.find((u) => u.id === current.upholstery);
    const accTotal = current.accessories.reduce((s, id) => s + accPrice(id, seats), 0);
    $("mTotal").textContent = money(configPrice(current));
    const parts = [`Base ${money(v.price)}`];
    if (uph.add) parts.push(`${uph.name} +${money(uph.add * seats)}`);
    if (accTotal) parts.push(`${current.accessories.length} accessor${current.accessories.length === 1 ? "y" : "ies"} +${money(accTotal)}`);
    $("mBreakdown").textContent = parts.join(" · ");
  }
  $("modelForm").addEventListener("change", (e) => {
    if (!current) return;
    if (e.target.name === "variant") { current.variant = +e.target.value; renderAccessories(); }
    else if (e.target.name === "uph") current.upholstery = e.target.value;
    else if (e.target.type === "checkbox") {
      current.accessories = [...$("mAccessories").querySelectorAll("input:checked")].map((i) => i.value);
    }
    updateTotal();
  });
  $("mAdd").addEventListener("click", () => {
    state.shortlist.push({ ...current, accessories: [...current.accessories], qty: 1 });
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
  // Close when clicking the backdrop
  [$("modelDialog"), $("shortlistDialog")].forEach((d) => d.addEventListener("click", (e) => { if (e.target === d) d.close(); }));

  /* ---------- shortlist ---------- */
  function renderShortlistCount() { $("shortlistCount").textContent = state.shortlist.reduce((s, i) => s + i.qty, 0); }
  function describe(item) {
    const m = modelById[item.modelId];
    const v = m.variants[item.variant] || m.variants[0];
    const uph = C.upholstery.find((u) => u.id === item.upholstery) || C.upholstery[0];
    const acc = item.accessories.map((id) => C.accessories[id] && C.accessories[id].name).filter(Boolean);
    return { m, b: brandById[m.brand], v, uph, acc, unit: configPrice(item) };
  }
  function grandTotal() { return state.shortlist.reduce((s, i) => s + configPrice(i) * i.qty, 0); }
  function renderShortlist() {
    const box = $("shortlistItems");
    if (!state.shortlist.length) {
      box.innerHTML = `<p class="drawer-empty">Nothing here yet. Open a model and choose “Add to shortlist”.</p>`;
    } else {
      box.innerHTML = state.shortlist.map((item, i) => {
        const d = describe(item);
        return `<div class="s-item" data-i="${i}">
          <h4>${esc(d.b.name)} ${esc(d.m.name)}</h4>
          <span class="line-total">${money(d.unit * item.qty)}</span>
          <span class="meta">${esc(d.m.code)} · ${esc(d.v.name)} · ${esc(d.uph.name)}${d.acc.length ? "<br>+ " + d.acc.map(esc).join(", ") : ""}</span>
          <span class="qty"><button type="button" data-act="dec" aria-label="Fewer">−</button> Qty ${item.qty} <button type="button" data-act="inc" aria-label="More">+</button></span>
          <button type="button" class="remove" data-act="remove">Remove</button>
        </div>`;
      }).join("");
    }
    $("grandTotal").textContent = money(grandTotal());
    $("sendWhatsapp").href = `https://wa.me/${S.whatsappNumber}?text=${encodeURIComponent(quoteText())}`;
    const empty = !state.shortlist.length;
    ["sendWhatsapp", "copyQuote", "printQuote", "clearShortlist"].forEach((id) => {
      $(id).toggleAttribute("aria-disabled", empty);
      $(id).style.pointerEvents = empty ? "none" : "";
      $(id).style.opacity = empty ? ".45" : "";
    });
  }
  function quoteText() {
    const lines = [`Recliner shortlist (${S.companyName})`, ""];
    state.shortlist.forEach((item, i) => {
      const d = describe(item);
      lines.push(`${i + 1}. ${d.b.name} ${d.m.name} (${d.m.code})`);
      lines.push(`   ${d.v.name}, ${d.uph.name}${item.qty > 1 ? `, qty ${item.qty}` : ""}`);
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
  renderTabs();
  renderGrid();
  renderShortlistCount();
  const deep = location.hash.match(/^#model=([\w-]+)/);
  if (deep) openModel(deep[1], false);
})();

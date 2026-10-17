// Vykreslení itineráře, karet atrakcí, mapy a rozpočtu.

const fmt = n => Math.round(n).toLocaleString("cs-CZ") + " Kč";
const mapUrl = (a) => `https://www.google.com/maps/search/?api=1&query=${a.lat},${a.lng}`;

function photoUrl(path) {
  const file = path.split("/").pop();
  return `https://upload.wikimedia.org/wikipedia/commons/thumb/${path}/1280px-${file}`;
}
function photoPage(path) {
  return "https://commons.wikimedia.org/wiki/File:" + path.split("/").pop();
}

const STATUS = {
  good: ["good", "Otevřeno"],
  ok: ["", ""],
  warn: ["warn", "Pozor"],
  closed: ["closed", "Zavřeno"]
};

// ---------- Atrakce ----------
function card(a) {
  const [cls, label] = STATUS[a.status] || STATUS.ok;
  const photos = a.photos.map((p, i) => `
    <a class="ph${i ? " extra" : ""}" href="${photoPage(p)}" target="_blank" rel="noopener" title="Zdroj: Wikimedia Commons">
      <img loading="lazy" src="${photoUrl(p)}" alt="${a.name}">
    </a>`).join("");
  const more = a.photos.length > 1
    ? `<button class="morephotos" type="button">+${a.photos.length - 1} foto</button>` : "";
  return `
  <article class="card attraction ${cls}" id="a-${a.id}">
    <div class="gallery">${photos}${more}
      ${label ? `<span class="badge ${cls}">${label}</span>` : ""}
    </div>
    <div class="pad">
      <p class="when">${a.day}</p>
      <h3>${a.name}</h3>
      ${a.note ? `<p class="note ${cls}">${a.note}</p>` : ""}
      <p>${a.desc}</p>
      <ul class="kv">
        <li><span>Adresa</span>${a.addr}</li>
        <li><span>Doprava</span>${a.transit}</li>
        <li><span>Otevřeno</span>${a.hours}</li>
        <li><span>Vstupné</span>${a.price}</li>
        <li><span>Délka</span>${a.duration}</li>
      </ul>
      <p class="links">
        <a class="btn" href="${mapUrl(a)}" target="_blank" rel="noopener">Mapa</a>
        <a class="btn ghost" href="${a.web}" target="_blank" rel="noopener">Web</a>
        ${a.web2 ? `<a class="btn ghost" href="${a.web2[1]}" target="_blank" rel="noopener">${a.web2[0]}</a>` : ""}
      </p>
      ${a.photoNote ? `<p class="small muted">${a.photoNote}</p>` : ""}
    </div>
  </article>`;
}

document.getElementById("must").innerHTML = MUST.map(card).join("");
document.getElementById("optional").innerHTML = OPTIONAL.map(card).join("");

// Přepínání fotek v galerii
document.addEventListener("click", e => {
  const btn = e.target.closest(".morephotos");
  if (!btn) return;
  const g = btn.parentElement;
  const imgs = [...g.querySelectorAll(".ph")];
  const cur = imgs.findIndex(x => !x.classList.contains("extra"));
  imgs[cur].classList.add("extra");
  imgs[(cur + 1) % imgs.length].classList.remove("extra");
});

// ---------- Itinerář ----------
let variant = "A";

function renderDays() {
  document.getElementById("days").innerHTML = DAYS
    .filter(d => d.variant.includes(variant))
    .map(d => `
    <div class="card day">
      <div class="dayhead"><span>${d.date}</span><h3>${d.title}</h3></div>
      <ol class="timeline">
        ${d.items.map(([t, txt]) => `<li><time>${t}</time><span>${txt}</span></li>`).join("")}
      </ol>
      ${d.alt ? `<p class="alt">${d.alt}</p>` : ""}
    </div>`).join("") +
    `<p class="small muted">Itinerář zobrazuje variantu ${variant === "A" ? "A (návrat v pondělí)" : "B (návrat v úterý)"}. Přepnout ji můžete v sekci <a href="#rozpocet">Rozpočet</a>.</p>`;
}

// ---------- Mapa ----------
function renderMap() {
  if (!window.L) return;
  const map = L.map("map", { scrollWheelZoom: false }).setView([55.672, 12.585], 12);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18, attribution: "© OpenStreetMap"
  }).addTo(map);
  const dot = (color) => L.divIcon({ className: "", html: `<span class="pin ${color}"></span>`, iconSize: [16, 16], iconAnchor: [8, 8] });
  const add = (list, color) => list.forEach(a => {
    L.marker([a.lat, a.lng], { icon: dot(color) }).addTo(map)
      .bindPopup(`<strong>${a.name}</strong>${a.day ? "<br>" + a.day : ""}${a.id ? `<br><a href="#a-${a.id}">detail</a>` : ""}`);
  });
  add(MUST, "red");
  add(OPTIONAL, "blue");
  add(PLACES, "dark");
}

// ---------- Rozpočet ----------
const PEOPLE = [["a1", "Dospělý 1"], ["a2", "Dospělý 2"], ["k1", "Dítě 1"], ["k2", "Dítě 2"]];
const chosen = new Set();

function perPerson(row) {
  const r = Object.assign({}, row, variant === "B" && row.B ? row.B : {});
  const rate = r.cur === "DKK" ? DKK : 1;
  const out = { a1: 0, a2: 0, k1: 0, k2: 0 };
  if (r.shared3) { out.a1 += r.shared3 / 3; out.k1 += r.shared3 / 3; out.k2 += r.shared3 / 3; }
  if (r.shared4) PEOPLE.forEach(([p]) => out[p] += r.shared4 / 4);
  out.a1 += r.a1 || 0; out.a2 += r.a2 || 0; out.k1 += r.k || 0; out.k2 += r.k || 0;
  for (const p in out) out[p] *= rate;
  return { label: r.label, out, est: r.est };
}

function renderOpts() {
  document.getElementById("opts").innerHTML = "<span class='small'>Přidat volitelné:</span>" +
    BUDGET.filter(r => r.opt && (!r.only || r.only === variant)).map(r =>
      `<label class="chip"><input type="checkbox" data-opt="${r.id}" ${chosen.has(r.id) ? "checked" : ""}> ${r.label}</label>`
    ).join("");
}

function renderBudget() {
  const rows = [];
  const total = { a1: 0, a2: 0, k1: 0, k2: 0 };
  for (const row of BUDGET) {
    if (row.only && row.only !== variant) continue;
    if (row.opt && !chosen.has(row.id)) continue;
    if (row.group) { rows.push({ group: row.group }); continue; }
    const r = perPerson(row);
    PEOPLE.forEach(([p]) => total[p] += r.out[p]);
    rows.push(r);
  }
  // odstranit prázdné skupiny
  const clean = rows.filter((r, i) => !r.group || (rows[i + 1] && !rows[i + 1].group));
  const reserve = {}; PEOPLE.forEach(([p]) => reserve[p] = total[p] * RESERVE);
  const grand = {}; PEOPLE.forEach(([p]) => grand[p] = total[p] + reserve[p]);
  const sum = o => PEOPLE.reduce((s, [p]) => s + o[p], 0);
  const cells = o => PEOPLE.map(([p]) => `<td>${o[p] ? fmt(o[p]) : "–"}</td>`).join("") + `<td class="tot">${fmt(sum(o))}</td>`;

  document.getElementById("budget").innerHTML = `
    <thead><tr><th>Položka</th>${PEOPLE.map(([, n]) => `<th>${n}</th>`).join("")}<th>Celkem</th></tr></thead>
    <tbody>
      ${clean.map(r => r.group
        ? `<tr class="grp"><td colspan="6">${r.group}</td></tr>`
        : `<tr><td>${r.label}${r.est ? ' <span class="est" title="odhad">≈</span>' : ""}</td>${cells(r.out)}</tr>`).join("")}
      <tr class="sub"><td>Mezisoučet</td>${cells(total)}</tr>
      <tr><td>Rezerva 10 %</td>${cells(reserve)}</tr>
    </tbody>
    <tfoot><tr><td>Celkem</td>${cells(grand)}</tr></tfoot>`;

  const g = sum(grand);
  const group3 = grand.a1 + grand.k1 + grand.k2;
  document.getElementById("summary").innerHTML = `
    <div class="fact big"><span class="lbl">Celkem za výlet</span><strong>${fmt(g)}</strong><span>≈ ${Math.round(g / DKK).toLocaleString("cs-CZ")} DKK · ${fmt(g / 4)} na osobu průměrně</span></div>
    <div class="fact"><span class="lbl">Dospělý 1 + 2 děti (z ČR)</span><strong>${fmt(group3)}</strong><span>letenky, parkování a 3/4 společných nákladů</span></div>
    <div class="fact"><span class="lbl">Dospělý 2 (v Kodani)</span><strong>${fmt(grand.a2)}</strong><span>bez cesty do Kodaně</span></div>
    <div class="fact"><span class="lbl">Na jedno dítě</span><strong>${fmt(grand.k1)}</strong><span>dospělý 1 sám: ${fmt(grand.a1)}</span></div>`;
  if (variant === "A" && chosen.size === 0) document.getElementById("factTotal").textContent = "≈ " + fmt(Math.round(g / 1000) * 1000);
}

document.querySelector(".seg").addEventListener("click", e => {
  const b = e.target.closest("button"); if (!b) return;
  variant = b.dataset.variant;
  document.querySelectorAll(".seg button").forEach(x => x.classList.toggle("on", x === b));
  renderOpts(); renderBudget(); renderDays();
});
document.getElementById("opts").addEventListener("change", e => {
  const id = e.target.dataset.opt; if (!id) return;
  e.target.checked ? chosen.add(id) : chosen.delete(id);
  renderBudget();
});

// Zaškrtávací seznam si pamatuje stav v prohlížeči
const todo = [...document.querySelectorAll(".todo input")];
try {
  const saved = JSON.parse(localStorage.getItem("cph26-todo") || "[]");
  todo.forEach((c, i) => c.checked = !!saved[i]);
} catch (e) {}
todo.forEach(c => c.addEventListener("change", () => {
  try { localStorage.setItem("cph26-todo", JSON.stringify(todo.map(x => x.checked))); } catch (e) {}
}));

renderDays(); renderOpts(); renderBudget(); renderMap();

const sizeLabels = {
  slow: "Slow",
  s: "S",
  m: "M",
  l: "L",
  gog: "Go",
  mini: "Mini",
  meg: "Meg",
  d: "D",
  x: "X"
};

const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const label = size => sizeLabels[size] ?? size;

let menu = null;
let onItemAdd = () => {};
let onGrillBlocked = () => {};
let grassyParkSelected = () => true;

export function initMenu(data, hooks) {
  menu = data;
  onItemAdd = hooks.onItemAdd;
  onGrillBlocked = hooks.onGrillBlocked;
  grassyParkSelected = hooks.grassyParkSelected;
}

function itemHTML(item, sizes) {
  const prices = sizes
    .map(s => {
      const p = item.prices.find(pp => pp.size === s);
      return p
        ? `<span class="mn-price-cell" data-item="${item.id}" data-size="${s}" data-price="${p.price}">${p.price}</span>`
        : `<span class="mn-price-cell mn-empty">&mdash;</span>`;
    })
    .join("");
  const inote = item.note ? ` <span class="mn-item-note">&mdash; ${esc(item.note)}</span>` : "";
  const body = `<div class="mn-item-name">${esc(item.name)}</div>
            <div class="mn-item-desc"><span class="highlight">${esc(item.description)}</span>${inote}</div>
            <div class="mn-prices">${prices}</div>`;
  if (item.visual) {
    return `<div class="mn-item mn-item-visual" data-id="${item.id}">
            <div class="mn-slider">
              <div class="mn-slide" style="background-image:url('${esc(item.visual)}')">${body}</div>
            </div>
          </div>`;
  }
  return `<div class="mn-item" data-id="${item.id}">${body}</div>`;
}

function categoryOf(item) {
  return menu.categories.find(c => c.items.some(i => i.id === item.id));
}

function isGrillsItem(item) {
  const cat = categoryOf(item);
  return cat && cat.grillsOnly;
}

function addFromItem(item, size, price) {
  if (isGrillsItem(item) && !grassyParkSelected()) {
    onGrillBlocked();
    return;
  }
  onItemAdd(item, size, price);
}

export function renderTextMenu() {
  const root = document.querySelector("#menu .mn-menu");
  if (!root) return;
  root.innerHTML = menu.categories
    .map(c => {
      const sizes = [...new Set(c.items.flatMap(i => i.prices.map(p => p.size)))];
      const legend = sizes.map(s => `<span>${esc(label(s))}</span>`).join("");
      const note = c.note
        ? `<div class="mn-item" style="padding-top:0;border-top:none;"><div class="mn-item-desc mn-item-note" style="grid-column:1/-1;">${esc(c.note)}</div></div>`
        : "";
      const grills = c.grillsOnly ? `<div class="notes grills-note">Grills <b>only</b> available at ${window.__siteConfig?.stores?.find(s => s.grillsOnly)?.name ?? "Grassy Park"}</div>` : "";
      const items = c.items.map(item => itemHTML(item, sizes)).join("");
      return `<div class="mn-section" ${c.grillsOnly ? 'id="grills"' : ""}>
        <div class="mn-category-header">
          <h2 class="mn-category-name">${esc(c.name)}</h2>
          <div class="mn-size-legend">${legend}</div>
        </div>
        ${grills}
        ${note}
        ${items}
      </div>`;
    })
    .join("");
  root.addEventListener("click", e => {
    const cell = e.target.closest(".mn-price-cell");
    if (!cell || cell.classList.contains("mn-empty")) return;
    const item = menu.categories.flatMap(c => c.items).find(i => i.id === cell.dataset.item);
    if (item) addFromItem(item, cell.dataset.size, Number(cell.dataset.price));
  });
}

import { writeFileSync, readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const csvPath = join(root, "data", "menu.csv");
const jsonPath = join(root, "data", "menu.json");

const csvCols = [
  "Category", "Category Note", "Item", "Item Note", "Description",
  "Visual", "Slow", "S", "M", "L", "Go", "Mini", "Meg", "D", "X"
];
const sizeKeys = { Slow: "slow", S: "s", M: "m", L: "l", Go: "gog", Mini: "mini", Meg: "meg", D: "d", X: "x" };

function parseCsv(text) {
  const rows = [];
  let row = [], cell = "", inQ = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQ) {
      if (c === '"') {
        if (text[i + 1] === '"') { cell += '"'; i++; }
        else inQ = false;
      } else cell += c;
    } else if (c === '"') inQ = true;
    else if (c === ",") { row.push(cell); cell = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(cell); cell = "";
      if (row.some(v => v !== "")) rows.push(row);
      row = [];
    } else cell += c;
  }
  if (cell !== "" || row.length) { row.push(cell); if (row.some(v => v !== "")) rows.push(row); }
  return rows;
}

function menuFromCsv(path) {
  const rows = parseCsv(readFileSync(path, "utf8"));
  let currency = "R";
  const stores = [];
  const categories = [];
  let currentCat = null;
  let headerIdx = -1;

  for (const r of rows) {
    if (r[0] === "currency") { currency = r[1] || "R"; continue; }
    if (r[0] === "store") {
      stores.push({ id: r[1], name: r[2], phone: r[3] });
      continue;
    }
    if (r[0] === "Category" && r[2] === "Item") { headerIdx = rows.indexOf(r); continue; }
    if (headerIdx < 0 || r.length < 6 || !r[0].trim()) continue;
    const item = { id: r[2].toLowerCase().replace(/[^a-z0-9]+/g, "-") };
    const prices = [];
    for (let ci = 6; ci <= 14; ci++) {
      const colName = csvCols[ci];
      const val = (r[ci] || "").trim();
      if (val) {
        const num = parseFloat(val.replace(/[^0-9.]/g, ""));
        if (num > 0) prices.push({ size: sizeKeys[colName], price: num });
      }
    }
    if (!prices.length) continue;
    item.name = r[2];
    if (r[4]?.trim()) item.description = r[4].trim();
    if (r[5]?.trim()) item.visual = r[5].trim();
    item.prices = prices;
    if (!currentCat || currentCat.name !== r[0]) {
      currentCat = { id: r[0].toLowerCase().replace(/[^a-z0-9]+/g, "-"), name: r[0] };
      if (r[1]?.trim()) currentCat.note = r[1].trim();
      currentCat.items = [];
      categories.push(currentCat);
    }
    currentCat.items.push(item);
  }
  return { currency, stores, categories };
}

function csvFromMenu(menu) {
  const esc = v => {
    if (v === "" || v == null) return "";
    const s = String(v);
    return s.includes(",") || s.includes('"') ? '"' + s.replaceAll('"', '""') + '"' : s;
  };
  const rows = [
    ["currency", menu.currency],
    ...menu.stores.map(s => ["store", s.id, s.name, s.phone]),
    [],
    csvCols
  ];
  for (const cat of menu.categories) {
    for (const item of cat.items) {
      const row = Object.fromEntries(item.prices.map(p => [p.size, p.price]));
      rows.push([
        cat.name, cat.note ?? "", item.name, item.note ?? "",
        item.description, item.visual ?? "",
        row.slow ?? "", row.s ?? "", row.m ?? "", row.l ?? "",
        row.gog ?? "", row.mini ?? "", row.meg ?? "", row.d ?? "", row.x ?? ""
      ]);
    }
  }
  return rows.map(r => r.map(esc).join(",")).join("\n") + "\n";
}

function validate(menu) {
  const issues = [];
  const ids = new Set();
  for (const cat of menu.categories) {
    if (!cat.id) issues.push(`category missing id: ${cat.name}`);
    for (const item of cat.items) {
      if (ids.has(item.id)) issues.push(`duplicate id: ${item.id}`);
      ids.add(item.id);
      if (!item.visual && !(cat.id === "extras" || cat.id === "sides")) issues.push(`no visual: ${item.id}`);
      for (const p of item.prices) {
        if (!(p.price > 0)) issues.push(`bad price: ${item.id} ${p.size}`);
      }
    }
  }
  return issues;
}

const inputCsv = process.argv[2];
let menu;

if (inputCsv) {
  if (!existsSync(inputCsv)) {
    console.error(`input CSV not found: ${inputCsv}`);
    process.exit(1);
  }
  menu = menuFromCsv(inputCsv);
  console.log(`parsed ${inputCsv}: ${menu.categories.reduce((n, c) => n + c.items.length, 0)} items, ${menu.categories.length} categories`);
} else {
  const { menu: existing } = await import("./menu-data.mjs");
  menu = existing;
  console.log("using menu-data.mjs (no CSV input given)");
}

const csv = csvFromMenu(menu);
writeFileSync(csvPath, csv);
const json = JSON.stringify(menu, null, 2) + "\n";
writeFileSync(jsonPath, json);

const issues = validate(menu);
const roundtrip = JSON.parse(readFileSync(jsonPath, "utf8"));
if (JSON.stringify(roundtrip) !== JSON.stringify(menu)) issues.push("json roundtrip mismatch");

console.log(`data/menu.csv  ${csv.length} bytes`);
console.log(`data/menu.json ${json.length} bytes`);
console.log(`${menu.categories.reduce((n, c) => n + c.items.length, 0)} items, ${menu.categories.length} categories`);
if (issues.length) {
  console.log("\nwarnings:");
  for (const i of issues) console.log("  " + i);
} else console.log("ok");

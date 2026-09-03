import { writeFileSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { menu } from "./menu-data.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const csvPath = join(root, "data", "menu.csv");
const jsonPath = join(root, "data", "menu.json");

const csvCols = [
  "Category",
  "Category Note",
  "Item",
  "Item Note",
  "Description",
  "Visual",
  "Slow",
  "S",
  "M",
  "L",
  "Go",
  "Mini",
  "Meg",
  "D",
  "X"
];
const esc = v => {
  if (v === "" || v == null) return "";
  const s = String(v);
  return s.includes(",") || s.includes('"') ? '"' + s.replaceAll('"', '""') + '"' : s;
};

const csvRows = [
  ["currency", menu.currency],
  ["store", "grassy-park", "Grassy Park", "27628859986"],
  ["store", "rondebosch-east", "Rondebosch East", "27616202816"],
  [],
  csvCols
];
for (const cat of menu.categories) {
  for (const item of cat.items) {
    const row = Object.fromEntries(item.prices.map(p => [p.size, p.price]));
    csvRows.push([
      cat.name,
      cat.note ?? "",
      item.name,
      item.note ?? "",
      item.description,
      item.visual ?? "",
      row.slow ?? "",
      row.s ?? "",
      row.m ?? "",
      row.l ?? "",
      row.gog ?? "",
      row.mini ?? "",
      row.meg ?? "",
      row.d ?? "",
      row.x ?? ""
    ]);
  }
}

const csv = csvRows.map(r => r.map(esc).join(",")).join("\n") + "\n";
writeFileSync(csvPath, csv);

const json = JSON.stringify(menu, null, 2) + "\n";
writeFileSync(jsonPath, json);

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
const roundtrip = JSON.parse(readFileSync(jsonPath, "utf8"));
if (JSON.stringify(roundtrip) !== JSON.stringify(menu)) issues.push("json roundtrip mismatch");

console.log(`data/menu.csv  ${csv.length} bytes`);
console.log(`data/menu.json ${json.length} bytes`);
console.log(`${menu.categories.reduce((n, c) => n + c.items.length, 0)} items, ${menu.categories.length} categories`);
if (issues.length) {
  console.log("\nwarnings:");
  for (const i of issues) console.log("  " + i);
  process.exit(0);
}
console.log("ok");

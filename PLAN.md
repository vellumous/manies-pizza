# Manies — Production Clean-up Plan

Goal: one menu, one codebase, zero frameworks, installable, offline-ready.
The site becomes a template: swap data + images, ship a new business.

## Where we are

| Asset | State |
|---|---|
| `fragments/menu.html` | Text menu — **authoritative**, up to date |
| `data/menu.csv` | Stale, different schema, wrong prices |
| `manies.csv` | Stale, duplicate of data/menu.csv |
| `services.js` | `menuData` + `megData` hardcoded — stale, 3rd/4th copy |
| `img/` | 208 files, 59 MB — 153 never referenced (~40 MB dead) |
| `manifest.json` | Broken — icon files don't exist, no service worker |
| Remote deps | GSAP 3.12 (cdnjs), Google Fonts — breaks offline |
| Version control | git initialized, baseline `abca4d2` |

## 1. Single source of truth — `data/menu.json`

The menu is data, not code. One JSON file drives **both** the visual menu
(item cards) and the text menu (price grid), plus the cart.

```
Google Spreadsheet (owners edit)
   └─> gen/menu.mjs  (node, run locally)
          ├─ data/menu.json     shipped to site
          └─ check output       flags items missing visuals, etc.
```

`menu.json` shape — one row per price point, so no size-column gymnastics:

```json
{
  "currency": "R",
  "stores": [
    { "id": "grassy-park", "name": "Grassy Park", "phone": "27628859986" },
    { "id": "rondebosch-east", "name": "Rondebosch East", "phone": "27616202816" }
  ],
  "categories": [
    {
      "id": "steak",
      "name": "Steak",
      "note": "All Meg sizes include nachos",
      "items": [
        {
          "id": "bokaap",
          "name": "Bokaap",
          "description": "Gheema steak, coriander & green pepper",
          "note": null,
          "visual": "img/pizza_bokaap.webp",
          "prices": [
            { "size": "slow", "label": "Slow", "price": 85 },
            { "size": "s", "price": 145 },
            { "size": "m", "price": 165 },
            { "size": "l", "price": 195 },
            { "size": "gog", "price": 145 },
            { "size": "mini", "price": 255 },
            { "size": "meg", "price": 305 }
          ]
        }
      ]
    }
  ]
}
```

Rules:
- `visual` is optional. Missing → the visual menu renders an imageless tile
  (name + description + prices). Nothing is hidden.
- Size labels are per-category (the text menu's legends become data).
- The gen script is the **only** thing allowed to write `menu.json`.
  Owners' spreadsheet is the only thing allowed to change the menu.
- The two stale CSVs are deleted. `menu.html`'s hand-written rows are
  deleted — the fragment becomes a shell the JS fills.

## 2. Code structure — four files, each one domain

```
index.html          one page: views, nav, cart chrome, no styling, no logic
css/site.css        all styles, sectioned: tokens / chrome / menu / services / cart
js/app.js           views, tab pill, fragment loading, service worker
js/menu.js          renders text + visual menus from menu.json
js/cart.js          cart state, WhatsApp order, store rules (grills → Grassy Park)
data/menu.json      the menu
gen/menu.mjs        spreadsheet → menu.json (node, run locally)
fragments/home.html
fragments/about.html
```

- `index.html` keeps all markup that is **chrome** (nav, cart, views shell).
- Fragments keep markup that is **content** (home/about copy).
- Menu markup is generated — never hand-written again.
- Global functions (`toggleCart`, `addToCart`, `selectPrice`) become module
  state + `addEventListener` inside their file. No more `onclick` soup.
- Inline `<style>` blocks in fragments move to `site.css`.

## 3. The strip pass

- Dead CSS: rules with no matching element (`.pill`, `.dim`, `.cover`,
  `.wa-via-text`, `.grills` margins, commented-out blocks, `@media` inside
  `.overflow` — which is invalid and never applied).
- Dead JS: `destroyServices`, `scrollToOptimalPosition`'s mystery `222`,
  commented-out Grills rows, `// handleCategoriesScrollEnd()` ghosts.
- Duplicated CSS: `:root` tokens defined 3× (home/menu/about fragments) → once.
- Names: `items-container` → `menuItems`, `mn-empty` → keep only where
  earning its keep, `scrollListenerAttached` → module-scope `let`.
- Zero comments. The code is the commentary.

## 4. Offline + installable

- Localize: `vendor/gsap.min.js` (3.12), `vendor/fonts/` (Playfair Display,
  DM Sans — self-hosted woff2, latin subset, `font-display: swap`).
- `manifest.json` fixed: generate `img/icon-192.png`, `icon-512.png`,
  `icon-maskable-512.png` (and an apple-touch-icon).
- `js/sw.js`: cache the app shell (html, css, js, vendor, data/menu.json,
  fonts, icons) at install; cache-first for shell, network-first + cache
  fallback for `data/menu.json` (stale prices acceptable offline),
  cache-first + background revalidate for images.
- Net effect: load once → fully offline → homescreen-installable.

## 5. Template readiness (last, cheap once 1–4 land)

- Store names, phones, theme tokens, logo paths live in `data/menu.json`
  + `:root` — a new business is a data swap, not a code swap.
- `img/` pruned to only referenced files (~19 MB → ~2 MB after image
  optimization pass, optional).
- `digital-displays/` is a sibling product — keep out of the template,
  or fold into `gen/` as a second render target.

## Order of execution

1. **git** ✅ done (baseline committed)
2. **menu.json** + `gen/menu.mjs`, delete the 3 stale copies
3. **restructure** → `index.html` + `site.css` + `js/*.js`
4. **strip pass** (dead code, names, comments)
5. **offline + PWA** (local fonts/GSAP, icons, service worker)
6. **image prune** (153 dead files + .DS_Store)
7. **template polish**

Each step is its own commit. Roll back anytime.

# Manies Pizza — Digital Menu System

## Overview

This project delivers web-based digital menu boards for a two-store pizza operation with six screens. Menus are managed through a standard Google Spreadsheet, removing recurring SaaS subscriptions, third-party dashboards, and vendor lock-in.

The owners can update prices and items in a familiar interface. Changes propagate to all in-store screens within 60 seconds. The system relies on core web technologies to stay fast, maintainable, and portable.

## Architecture

A lightweight, serverless data pipeline with no databases, build tools, or frameworks.

```text
Google Spreadsheet
  ↓
Google Apps Script
  ↓
Vanilla JS fetch()
  ↓
DOM rendering
  ↓
GSAP animations
  ↓
localStorage caching
```

### Store and Screen Map

- Suburb Branch (Grassy Park): 3 screens (SUB-S1 to SUB-S3)

## Project Scope and Timeline

### Phase 1 — Data Pipeline & Foundation (6 hours)

Extending the validated proof of concept into a robust, production-ready backend.

- Finalize spreadsheet columns and input all products
- Assign screen IDs and layout tags
- Implement nested grouping, subsections, split layouts, and stable item ID mapping
- Handle blank rows, missing images, and malformed pricing to prevent frontend breakage

### Phase 2 — Design System & Templates (11 hours)

Establishing the visual language and building modular layout templates optimized for 1080p TV viewing at a 2-meter distance.

- Create typography, color palette, spacing, and card standards
- Build Template A (4-column grid) for standard pizza listings
- Build Template B (3-column feature) for signature or premium items
- Build Template C (split layout) for side-by-side sections
- Build Template D (full-width hero) for promotions and specials

### Phase 3 — Screen Assembly (6 hours)

Applying the templates to the requirements of all six in-store screens using live data.

- TV screens 1–3: 6 hours

### Phase 4 — Resilience & Polish (8 hours)

Ensuring the system feels premium and operates unattended without failure.

- Add animations (GSAP) such as staggered load-ins and subtle price-update pulses
- Improve offline resilience with cache-first rendering and connectivity indicators
- Harden edge cases with CSS truncation, image fallbacks, and empty-section handling

### Phase 5 — Deployment & Handoff (8 hours)

Handling hardware configuration and client enablement.

- Configure fullscreen browser behavior and auto-launch on boot
- Run on-device QA for readability, timing, and network conditions
- Prepare plain-English documentation for spreadsheet editing and troubleshooting
- Deliver a client walkthrough to confirm independent updates

## Investment

| Metric                | Value         |
| ---                   | ---:          |
| Total Hours           | 39.5 hours    |
| Hourly Rate           | R650.00/hr    |
| Project Total         | R25,675.00    |
| Monthly Ongoing Cost  | R0.00         |

## ROI Context

- Industry-standard SaaS pricing for custom digital menus is about R1,900/month (roughly R22,800/year)
- Client break-even point: about 13.5 months
- After 14 months, the system generates a net positive return compared with SaaS while remaining custom-built to the client’s exact brand

## File Structure

```text
digital-displays/
├── README.md
├── suburb/
│   ├── screen-1.html
│   ├── screen-2.html
│   ├── screen-3.html
│   └── screen-4.html
├── city/
│   ├── screen-1.html
│   └── screen-2.html
├── css/
│   └── menu.css
├── js/
│   ├── menu-engine.js
│   └── animations.js
└── assets/
    └── images/
```

## Operational Notes

- Endpoint: The Google Apps Script URL is a public, read-only JSON endpoint and requires no API keys or authentication.

``` Endpoint URL
https://script.google.com/macros/s/AKfycbz5x09euHblxsHFZ1Fj51m0zRLzBdy1tm8RQUL1oC6WB2oU3ADnSmcCQmmNiUdZx2WO/exec
```
- Development: The HTML files are static and can be served with VS Code Live Server, Nginx, or opened directly via the file protocol for testing.

- Asset Management: Product images are stored locally in the assets folder and referenced by filename from the spreadsheet. Image swaps are handled manually by the developer for quality control.

- Fault Tolerance: If the store internet drops, the screens continue displaying the last successfully cached menu and show a small connectivity indicator.
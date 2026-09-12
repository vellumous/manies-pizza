import { initMenu, renderTextMenu } from "./menu.js";
import { initCart, addItem, feedback, sendOrder, grassyParkSelected, cartVisibleFlag } from "./cart.js";

const tabs = document.querySelectorAll(".tab");
const pill = document.getElementById("pill");
const dim = document.getElementById("dim");
const views = document.querySelectorAll(".view");

function updatePill(node) {
  const r = node.getBoundingClientRect();
  pill.style.width = r.width + "px";
  pill.style.left = r.left + "px";
}

async function showView(name, tabNode) {
  if (tabNode) {
    tabs.forEach(t => t.classList.remove("active"));
    tabNode.classList.add("active");
    updatePill(tabNode);
  } else {
    tabs.forEach(t => t.classList.remove("active"));
    pill.style.width = "0px";
  }

  if (name === "menu") {
    const view = document.getElementById("menu");
    if (view && !view.hasAttribute("data-ready")) {
      view.setAttribute("data-ready", "");
      view.innerHTML = `<div class="mn-cats" id="mn-cats"></div><div class="mn-menu"></div><footer data-eol><p>end of the line</p></footer>`;
      renderTextMenu();
      wireCategories(view);
    }
  } else {
    const view = document.getElementById(name);
    if (view && !view.hasAttribute("data-ready")) {
      view.setAttribute("data-ready", "");
      const eol = document.createElement("footer");
      eol.setAttribute("data-eol", "");
      eol.innerHTML = "<p>end of the line</p>";
      view.innerHTML = "";
      view.appendChild(eol);
      loadFragment(name, eol);
    }
  }

  if (!splashDone) {
    const splash = document.getElementById("splash");
    if (splash && gsap) gsap.killTweensOf([splash, "#splash-logo", ".splash-meta", "#splash-fill"]);
    splash?.remove();
    splashDone = true;
  }

  const current = [...views].find(v => v.style.display !== "none");
  if (current && current.id === name) return;

  // Synchronous, ticker-independent display swap (robust even if GSAP is asleep).
  views.forEach(v => (v.style.display = v.id === name ? "block" : "none"));

  // Reset the incoming view to the top so it never opens on a leftover scroll position.
  views.find(v => v.id === name).scrollTop = 0;

  // Cosmetic entrance/exit (purely visual; safe to no-op if ticker is asleep).
  if (gsap) {
    views.forEach(v => gsap.killTweensOf(v));
    gsap.killTweensOf(dim);
    const incoming = views.find(v => v.id === name);
    gsap.fromTo(incoming, { y: "100%" }, { y: "0%", duration: 0.5, ease: "power2.out" });
    gsap.fromTo(dim, { opacity: 1 }, { opacity: 0, duration: 0.8, ease: "power1.out" });
    if (tabNode) gsap.fromTo(tabNode, { scale: 0.9 }, { scale: 1, duration: 0.3, delay: 0.5, ease: "power2.out" });
  } else {
    dim.style.opacity = 0;
  }
}

let appMenu = null;

async function loadFragment(viewId, keepFooter) {
  const res = await fetch(`fragments/${viewId}.html?v=${location.search}`, { cache: "no-store" });
  const html = await res.text();
  const view = document.getElementById(viewId);
  if (keepFooter) {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    while (tmp.firstChild) view.insertBefore(tmp.firstChild, keepFooter);
  } else {
    view.innerHTML = html;
  }
  if (viewId === "home") wireHome();
}

function centerActiveButton(btn, container) {
  const c = container.getBoundingClientRect();
  const b = btn.getBoundingClientRect();
  container.scrollBy({ left: (b.left + b.width / 2) - (c.left + c.width / 2), behavior: "smooth" });
}

function setActiveCategory(name, scrollBtns) {
  const bar = document.getElementById("mn-cats");
  if (!bar) return;
  bar.querySelectorAll(".category-btn").forEach(btn => {
    const on = btn.dataset.category === name;
    btn.classList.toggle("active", on);
    if (on && scrollBtns) centerActiveButton(btn, bar);
  });
  const active = bar.querySelector(".category-btn.active");
  if (active) active.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
}

function wireCategories(view) {
  const bar = document.getElementById("mn-cats");
  const sections = [...view.querySelectorAll(".mn-section")];
  bar.innerHTML = sections.map(s => {
    const c = appMenu.categories.find(cc => cc.name === s.querySelector(".mn-category-name")?.textContent);
    return `<button class="category-btn" data-category="${c?.name ?? ""}">${c?.name ?? ""}</button>`;
  }).join("");

  bar.addEventListener("click", e => {
    const btn = e.target.closest(".category-btn");
    if (!btn) return;
    const sec = sections.find(s => s.querySelector(".mn-category-name")?.textContent === btn.dataset.category);
    if (!sec) return;
    setActiveCategory(btn.dataset.category, true);
    suppressSpy = Date.now() + 1500;
    sec.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  let suppressSpy = 0;
  const barBottom = () => bar.getBoundingClientRect().bottom;
  const spy = new IntersectionObserver(entries => {
    if (Date.now() < suppressSpy) return;
    const visible = entries.filter(e => e.isIntersecting && e.boundingClientRect.top >= barBottom() - 2)
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
    if (!visible.length) return;
    const name = visible[0].target.querySelector(".mn-category-name")?.textContent;
    if (name && name !== bar.querySelector(".category-btn.active")?.dataset.category) setActiveCategory(name, true);
  }, { rootMargin: "-10% 0px -70% 0px" });
  sections.forEach(s => spy.observe(s));

  setActiveCategory(sections[0]?.querySelector(".mn-category-name")?.textContent, false);
}

function wireHome() {
  const day = new Date().getDay();
  const map = [6, 0, 1, 2, 3, 4, 5];
  document.querySelectorAll(".mn-hours").forEach(t => {
    const rows = t.querySelectorAll("tr");
    if (rows[map[day]]) rows[map[day]].classList.add("mn-today");
  });
}

async function boot() {
  const [menuRes, configRes] = await Promise.all([
    fetch("data/menu.json"),
    fetch("config.json")
  ]);
  appMenu = await menuRes.json();
  const config = await configRes.json();
  window.__siteConfig = config;
  appMenu.categories.forEach(c => c.items.forEach(i => (i._grill = !!c.grillsOnly)));

  const hooks = {
    onItemAdd: (item, size, price) => {
      addItem(item, size, price);
      feedback("Added to cart!");
    },
    onGrillBlocked: () => {
      const grillsStore = config.stores?.find(s => s.grillsOnly);
      feedback(`Grills only available at ${grillsStore?.name ?? "Grassy Park"}`, "block");
    },
    grassyParkSelected,
    grillBlocked: msg => feedback(msg, "block")
  };

  initMenu(appMenu, hooks);
  initCart(appMenu, hooks, config);
  document.getElementById("whatsapp-btn").addEventListener("click", sendOrder);
}

let splashDone = false;

function playSplash() {
  const splash = document.getElementById("splash");
  if (!splash) { splashDone = true; return; }

  if (!gsap) {
    splash.remove();
    splashDone = true;
    return;
  }

  const logo = document.getElementById("splash-logo");
  const fill = document.getElementById("splash-fill");
  const meta = splash.querySelector(".splash-meta");
  const tl = gsap.timeline({ onComplete: () => { splash.remove(); splashDone = true; } });

  tl.to(logo, { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }, 0);
  tl.fromTo(meta, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0.2);
  tl.to(fill, { width: "100%", duration: 4.0, ease: "none" }, 0.3);
  tl.to(splash, { y: "-100%", duration: 0.6, ease: "power2.inOut" }, 4.7);

  splash.addEventListener("click", () => {
    tl.kill();
    splash.remove();
    splashDone = true;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  playSplash();
  boot().then(() => {
    ["home", "about", "menu"].forEach(loadFragment);
    tabs.forEach(tab => tab.addEventListener("click", () => showView(tab.dataset.view, tab)));
    document.getElementById("thumb-logo").addEventListener("click", () => showView("about", null));
    const syncPill = () => {
      const active = document.querySelector(".tab.active");
      if (active) updatePill(active);
    };
    syncPill();
    window.addEventListener("load", syncPill);
    window.addEventListener("resize", syncPill);
    setTimeout(syncPill, 300);
  });
});

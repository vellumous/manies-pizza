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
      view.innerHTML = `<div class="notes guide">select any amount to add to cart</div><div class="mn-menu"></div>`;
      renderTextMenu();
    }
  }

  gsap.to(dim, { opacity: 1, duration: 0.3 });
  setTimeout(() => {
    views.forEach(v => {
      if (v.id === name) {
        v.style.display = "block";
        gsap.fromTo(v, { y: "100%" }, { y: "0%", duration: 0.5, ease: "power2.out" });
      } else {
        gsap.to(v, { y: "100%", duration: 0.5, ease: "power2.in", onComplete: () => (v.style.display = "none") });
      }
    });
    gsap.to(dim, { opacity: 0, duration: 0.3, delay: 0.5 });
    if (tabNode) gsap.to(tabNode, { scale: 1, duration: 0.3, delay: 0.5 });
  }, 300);
}

let appMenu = null;

async function loadFragment(viewId) {
  const res = await fetch(`fragments/${viewId}.html`);
  const html = await res.text();
  document.getElementById(viewId).innerHTML = html;
  if (viewId === "home") wireHome();
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

function playSplash() {
  const splash = document.getElementById("splash");
  const logo = document.getElementById("splash-logo");
  const fill = document.getElementById("splash-fill");
  const meta = splash.querySelector(".splash-meta");
  if (!splash) return;

  if (!gsap) {
    splash.remove();
    return;
  }

  const tl = gsap.timeline({ onComplete: () => splash.remove() });

  tl.to(logo, { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }, 0);
  tl.fromTo(meta, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0.2);
  tl.to(fill, { width: "100%", duration: 4.0, ease: "none" }, 0.3);
  tl.to(splash, { y: "-100%", duration: 0.6, ease: "power2.inOut" }, 4.7);
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
    setTimeout(syncPill, 500);
  });
});

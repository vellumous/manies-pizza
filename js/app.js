import { initMenu, renderTextMenu, renderVisualMenu, bindVisualMenu, updateConnectors } from "./menu.js";
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

  if (name === "menu" || name === "services") {
    const view = document.getElementById(name);
    if (view && !view.hasAttribute("data-ready")) {
      view.setAttribute("data-ready", "");
      if (name === "menu") {
        view.innerHTML = `<div class="notes guide">select any amount to add to cart</div><div class="mn-menu"></div>`;
        renderTextMenu();
      }
      if (name === "services") await loadServices();
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

async function loadServices() {
  const view = document.getElementById("services");
  const res = await fetch("fragments/services.html");
  view.innerHTML = await res.text();
  wireServices();
}

function wireServices() {
  const view = document.getElementById("services");
  const sticky = document.getElementById("sticky-header");
  const section = document.getElementById("menu-section");
  view.addEventListener("scroll", () => {
    const on = view.scrollTop > 200;
    sticky.classList.toggle("visible", on);
    section.classList.toggle("sticky-active", on);
  });
  window.addEventListener("resize", updateConnectors);
  renderVisualMenu();
  bindVisualMenu();
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
  const res = await fetch("data/menu.json");
  appMenu = await res.json();
  appMenu.categories.forEach(c => c.items.forEach(i => (i._grill = !!c.grillsOnly)));

  const hooks = {
    onItemAdd: (item, size, price) => {
      addItem(item, size, price);
      feedback("Added to cart!");
    },
    onGrillBlocked: () => feedback("Grills only available at Grassy Park", "block"),
    grassyParkSelected,
    grillBlocked: msg => feedback(msg, "block")
  };

  initMenu(appMenu, hooks);
  initCart(appMenu, hooks);
  document.getElementById("whatsapp-btn").addEventListener("click", sendOrder);
}

function playSplash() {
  const splash = document.getElementById("splash");
  const logo = document.getElementById("splash-logo");
  const fill = document.getElementById("splash-fill");
  const meta = splash.querySelector(".splash-meta");
  if (!splash || !gsap) return;

  const tl = gsap.timeline({ onComplete: () => splash.remove() });

  tl.to(logo, { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }, 0);
  tl.fromTo(meta, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0.2);
  tl.to(fill, { width: "100%", duration: 1.9, ease: "power1.inOut" }, 0.3);
  tl.to([meta, fill.parentElement], { opacity: 0, duration: 0.3 }, 1.9);

  const thumb = document.getElementById("thumb-logo");
  if (thumb) {
    const target = () => {
      const r = thumb.getBoundingClientRect();
      const lr = logo.getBoundingClientRect();
      return {
        x: r.left + r.width / 2 - (lr.left + lr.width / 2) - window.scrollX,
        y: r.top + r.height / 2 - (lr.top + lr.height / 2) - window.scrollY,
        w: Math.min(r.width, 90)
      };
    };
    const t0 = target();
    tl.set(logo, { position: "absolute", left: "auto", right: "auto" });
    tl.to(logo, {
      x: t0.x,
      y: t0.y,
      width: t0.w,
      onUpdate() {
        const t = target();
        gsap.set(logo, { x: t.x, y: t.y, width: t.w });
      },
      duration: 0.8,
      ease: "power2.inOut"
    }, 2.0);
    tl.to(splash, { opacity: 0, duration: 0.4, ease: "power2.in" }, 2.6);
  } else {
    tl.to(splash, { opacity: 0, duration: 0.6 }, 2.2);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  playSplash();
  boot().then(() => {
    ["home", "about", "services", "menu"].forEach(loadFragment);
    tabs.forEach(tab => tab.addEventListener("click", () => showView(tab.dataset.view, tab)));
    document.getElementById("thumb-logo").addEventListener("click", () => showView("about", null));
    window.addEventListener("load", () => {
      const active = document.querySelector(".tab.active");
      if (active) updatePill(active);
    });
    window.addEventListener("resize", () => {
      const active = document.querySelector(".tab.active");
      if (active) updatePill(active);
    });
  });
});

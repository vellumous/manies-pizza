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

document.addEventListener("DOMContentLoaded", () => {
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

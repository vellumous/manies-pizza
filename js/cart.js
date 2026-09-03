let cart = [];
let currency = "R";
let cartVisible = false;

const el = {
  cart: () => document.getElementById("cart"),
  items: () => document.getElementById("cart-items"),
  count: () => document.getElementById("cart-count"),
  total: () => document.getElementById("total-amount"),
  bottom: () => document.getElementById("cart-bottom"),
  store: () => document.querySelector(".cart-store"),
  toggle: () => document.getElementById("cart-toggle")
};

export function initCart(data, hooks) {
  currency = data.currency;
  el.toggle()?.addEventListener("click", toggleCart);
  document.querySelectorAll("input[name=store]").forEach(r => r.addEventListener("change", () => {
    if (hooks.grassyParkSelected() || !cart.some(i => i.isGrill)) return;
    for (let i = cart.length - 1; i >= 0; i--) if (cart[i].isGrill) cart.splice(i, 1);
    updateCart();
    hooks.grillBlocked("Grill removed — only available at Grassy Park");
  }));
  el.items()?.addEventListener("click", e => {
    const btn = e.target.closest("button[data-remove]");
    if (btn) removeFromCart(Number(btn.dataset.remove));
  });
}

export function cartCount() {
  return cart.reduce((n, i) => n + i.count, 0);
}

export function cartEmpty() {
  return cart.length === 0;
}

export function cartVisibleFlag() {
  return cartVisible;
}

function findStore() {
  const r = document.querySelector("input[name=store]:checked");
  return { phone: r.value, name: r.nextElementSibling.textContent };
}

export function grassyParkSelected() {
  const r = document.querySelector("input[name=store]:checked");
  return !!r && r.value === "27628859986";
}

function addToCart(item, size, price) {
  const isGrill = item._grill;
  const existing = cart.find(i => i.id === item.id && i.size === size);
  if (existing) existing.count++;
  else cart.push({ id: item.id, name: item.name, size, price, count: 1, isGrill });
  updateCart();
}

export function addItem(item, size, price) {
  addToCart(item, size, price);
}

function removeFromCart(index) {
  cart[index].count--;
  if (cart[index].count <= 0) cart.splice(index, 1);
  updateCart();
}

export function toggleCart() {
  cartVisible = !cartVisible;
  const cartEl = el.cart();
  if (!cartEl) return;
  cartEl.classList.toggle("show-items", cartVisible);
  el.store().style.display = cartVisible ? "block" : "none";
  el.bottom().style.display = cartVisible && cart.length ? "flex" : "none";
}

function updateCart() {
  const cartEl = el.cart();
  const items = el.items();
  const count = el.count();
  const total = el.total();
  if (!cartEl || !items || !count || !total) return;

  if (!cart.length) {
    cartEl.classList.remove("has-items");
    items.innerHTML = `<div class="empty-cart">Your cart is empty</div>`;
    el.bottom().style.display = "none";
    el.store().style.display = "none";
    cartVisible = false;
    return;
  }

  cartEl.classList.add("has-items");
  cartEl.classList.add("show-items");
  el.store().style.display = "block";
  cartVisible = true;
  count.textContent = cartCount();
  total.textContent = cart.reduce((n, i) => n + i.price * i.count, 0);
  items.innerHTML = cart
    .map(
      (i, idx) => `<div class="cart-item">
      <span>${i.name} (${i.size}) x${i.count}</span>
      <span>${currency}${i.price * i.count} <button data-remove="${idx}">×</button></span>
    </div>`
    )
    .join("");
  el.bottom().style.display = "flex";
}

export function sendOrder() {
  if (!cart.length) return;
  const store = findStore();
  const lines = cart
    .map(i => `${i.name} (${i.size}) x${i.count} - ${currency}${i.price * i.count}`)
    .join("\n");
  const total = cart.reduce((n, i) => n + i.price * i.count, 0);
  const msg = `Hi Manies Pizza! I'd like to place an order for *${store.name}*:\n\n${lines}\n\nTotal: ${currency}${total}\n\nFor delivery add an address or share your location with us. For pick-up just bring a smile!`;
  window.open(`https://wa.me/${store.phone}?text=${encodeURIComponent(msg)}`, "_blank");
}

export function feedback(message, tone = "ok") {
  const box = document.createElement("div");
  box.className = "cart-added-feedback";
  if (tone !== "ok") box.style.background = "#e74c3c";
  box.textContent = message;
  document.body.appendChild(box);
  setTimeout(() => box.classList.add("show"), 100);
  setTimeout(() => {
    box.classList.remove("show");
    setTimeout(() => box.remove(), 300);
  }, 1500);
}

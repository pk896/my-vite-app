/* src/main.js */
import dayjs from "dayjs";
import { formatCurrency } from "./utils/vite-money.js";
import { cart } from "./data/vite-cart-class.js";

// -----------------------
// DOM Elements
// -----------------------
const gridContainer = document.querySelector(".js-grid-products-container");
const cartToggle = document.querySelector(".js-cart-toggle");
const cartDropdown = document.querySelector(".js-cart-dropdown");
const cartItemsContainer = document.querySelector(".js-cart-items");
const cartTotalContainer = document.querySelector(".js-cart-total");
const cartClearBtn = document.querySelector(".js-cart-clear");
const cartBadge = document.querySelector(".js-cart-quantity");

const API_BASE = "https://my-express-server-rq4a.onrender.com";

// -----------------------
// Fetch Products from Backend
// -----------------------
async function fetchProducts() {
  try {
    const res = await fetch(`${API_BASE}/api/products`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Error fetching products:", err);
    return [];
  }
}

// -----------------------
// Render Products
// -----------------------
async function renderProducts() {
  if (!gridContainer) return;

  const products = await fetchProducts();

  if (products.length === 0) {
    gridContainer.innerHTML = "<p>No products available.</p>";
    return;
  }

  gridContainer.innerHTML = products
    .map(
      (product) =>   
        `
      <div class="product-card" data-id="${product.id}">
        <img src="${API_BASE}${product.image}" alt="${product.name}" class="product-img" />
        <div><strong>Product:</strong> ${product.name}</div>
        <div><strong>Color:</strong> ${product.color}</div>
        <div><strong>Size:</strong> ${product.size}</div>
        <div><strong>Price:</strong> R${formatCurrency(product.price)}</div>
        <button class="js-add-to-cart" data-id="${product.id}">Add to Cart</button>
      </div>
    `
    )
    .join("");
}

// -----------------------
// Render Mini-Cart & Badge
// -----------------------
function updateMiniCart() {
  if (!cartItemsContainer || !cartTotalContainer) return;

  const items = cart.getItems();

  if (items.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    cartTotalContainer.textContent = "";
    if (cartBadge) cartBadge.textContent = "0";
    return;
  }

  cartItemsContainer.innerHTML = items
    .map(
      (item) => `
      <div class="mini-cart-item" data-id="${item.id}">
        <span>${item.name} x ${item.quantity}</span>
        <span>R${formatCurrency(item.price * item.quantity)}</span>
        <button class="js-cart-decrease" data-id="${item.id}">-</button>
        <button class="js-cart-remove" data-id="${item.id}">×</button>
      </div>
    `
    )
    .join("");

  cartTotalContainer.textContent = `Total: R${formatCurrency(cart.getTotalPrice())}`;

  if (cartBadge) cartBadge.textContent = `${cart.getTotalQuantity()}`;

  // Bind decrease buttons
  cartItemsContainer.querySelectorAll(".js-cart-decrease").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const currentQty = cart.getItems().find((i) => i.id === id)?.quantity || 0;
      cart.updateQuantity(id, currentQty - 1);
      updateMiniCart();
    });
  });

  // Bind remove buttons
  cartItemsContainer.querySelectorAll(".js-cart-remove").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      cart.removeItem(id);
      updateMiniCart();
    });
  });
}

// -----------------------
// Event Delegation: Add to Cart
// -----------------------
if (gridContainer) {
  gridContainer.addEventListener("click", async (e) => {
    if (!e.target.classList.contains("js-add-to-cart")) return;

    const id = e.target.dataset.id;
    const products = await fetchProducts();
    const product = products.find((p) => p.id === id);

    if (!product) {
      console.error("Product not found for id:", id);
      return;
    }

    cart.addItem(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      },
      1
    );

    updateMiniCart();
  });
}

// -----------------------
// Clear Cart
// -----------------------
if (cartClearBtn) {
  cartClearBtn.addEventListener("click", () => {
    cart.clear();
    updateMiniCart();
  });
}

// -----------------------
// Initialize
// -----------------------
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  updateMiniCart();
});
















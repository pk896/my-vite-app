/* src/main.js */
import dayjs from "dayjs";
import { formatCurrency } from "./utils/vite-money.js";
import { cart } from "./data/vite-cart-class.js";

// -----------------------
// Constants
// -----------------------
const API_BASE = "https://my-express-server-rq4a.onrender.com";

// -----------------------
// DOM Elements
// -----------------------
const gridContainer = document.querySelector(".js-grid-products-container");
const cartItemsContainer = document.querySelector(".js-cart-items");
const cartTotalContainer = document.querySelector(".js-cart-total");
const cartClearBtn = document.querySelector(".js-cart-clear");
const cartBadge = document.querySelector(".js-cart-quantity");
const sliderTrack = document.querySelector(".js-slider-track");

// -----------------------
// Fetch Products from Backend
// -----------------------
async function fetchProducts() {
  try {
    const res = await fetch(`${API_BASE}/api/products`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("❌ Error fetching products:", err);
    return [];
  }
}

// -----------------------
// Render Products
// -----------------------
function renderProducts(products) {
  if (!gridContainer) return;

  if (!products.length) {
    gridContainer.innerHTML = "<p>No products available.</p>";
    return;
  }

  gridContainer.innerHTML = products
    .map(
      (p) => `
        <div class="product-card" data-id="${p._id}">
          <img src="${API_BASE}${p.image}" alt="${p.name}" class="product-img" />

          <div class="product-info">
            <strong>${p.name}</strong>
            <p class="price">R${formatCurrency(p.price)}</p>
            <div class="product-details">
              <p>Color: ${p.color || "N/A"}</p>
              <p>Size: ${p.size || "N/A"}</p>
            </div>
          </div>

          <button class="js-add-to-cart add-to-btn" data-id="${p._id}">
            Add to Cart
          </button>
        </div>
      `
    )
    .join("");

  bindAddToCart(gridContainer, products);
}

// -----------------------
// Render Slider (advert line)
// -----------------------
function renderSlider(products) {
  if (!sliderTrack) return;

  const sliderProducts = [...products, ...products]; // duplicate for looping

  sliderTrack.innerHTML = sliderProducts
    .map(
      (p) => `
        <div class="slider-item">
          <img src="${API_BASE}${p.image}" alt="${p.name}" />
          <span>${p.name}</span>
          <span class="price">R${formatCurrency(p.price)}</span>
          <button class="js-add-to-cart btn btn-primary" data-id="${p._id}">
            Add to Cart
          </button>
        </div>
      `
    )
    .join("");

  bindAddToCart(sliderTrack, products);

  // Pause animation on hover
  sliderTrack.style.animationPlayState = "running";
  sliderTrack.addEventListener("mouseenter", () => {
    sliderTrack.style.animationPlayState = "paused";
  });
  sliderTrack.addEventListener("mouseleave", () => {
    sliderTrack.style.animationPlayState = "running";
  });
}

// -----------------------
// Bind Add-to-Cart Buttons
// -----------------------
function bindAddToCart(container, products) {
  container.querySelectorAll(".js-add-to-cart").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;
      const product = products.find((p) => p._id === id);
      if (!product) return;

      await cart.addItem(product._id, 1);
      await updateMiniCart();
    });
  });
}

// -----------------------
// Render Mini-Cart
// -----------------------
async function updateMiniCart() {
  if (!cartItemsContainer || !cartTotalContainer) return;

  await cart.fetchCart();
  const items = cart.getItems();

  if (!items.length) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    cartTotalContainer.textContent = "";
    if (cartBadge) cartBadge.textContent = "0";
    return;
  }

  cartItemsContainer.innerHTML = items
    .map(
      (item) => `
        <div class="mini-cart-item" data-id="${item.productId}">
          <span>${item.name} × ${item.quantity}</span>
          <span>R${formatCurrency(item.price * item.quantity)}</span>
          <button class="js-cart-decrease" data-id="${item.productId}">−</button>
          <button class="js-cart-remove" data-id="${item.productId}">×</button>
        </div>
      `
    )
    .join("");

  // Totals
  cartTotalContainer.textContent = `Total: R${formatCurrency(cart.getTotalPrice())}`;
  if (cartBadge) cartBadge.textContent = cart.getTotalQuantity();

  bindCartActions();
}

// -----------------------
// Bind Cart Buttons
// -----------------------
function bindCartActions() {
  // Decrease quantity
  cartItemsContainer.querySelectorAll(".js-cart-decrease").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;
      await cart.decrease(id);
      await updateMiniCart();
    });
  });

  // Remove item
  cartItemsContainer.querySelectorAll(".js-cart-remove").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;
      await cart.removeItem(id);
      await updateMiniCart();
    });
  });

  // Clear cart
  if (cartClearBtn) {
    cartClearBtn.onclick = async () => {
      await cart.clear();
      await updateMiniCart();
    };
  }
}

// -----------------------
// Init App
// -----------------------
async function init() {
  const products = await fetchProducts();
  renderProducts(products);
  renderSlider(products);
  await updateMiniCart();
}

document.addEventListener("DOMContentLoaded", init);






















/* src/main.js */
/*import dayjs from "dayjs";
import { formatCurrency } from "./utils/vite-money.js";
import { cart } from "./data/vite-cart-class.js";

// -----------------------
// Constants
// -----------------------
const API_BASE = "https://my-express-server-rq4a.onrender.com";

// -----------------------
// DOM Elements
// -----------------------
const gridContainer = document.querySelector(".js-grid-products-container");
const cartItemsContainer = document.querySelector(".js-cart-items");
const cartTotalContainer = document.querySelector(".js-cart-total");
const cartClearBtn = document.querySelector(".js-cart-clear");
const cartBadge = document.querySelector(".js-cart-quantity");
const sliderTrack = document.querySelector(".js-slider-track");

// -----------------------
// Fetch Products from Backend
// -----------------------
async function fetchProducts() {
  try {
    const res = await fetch(`${API_BASE}/api/products`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("❌ Error fetching products:", err);
    return [];
  }
}

// -----------------------
// Render Products
// -----------------------
function renderProducts(products) {
  if (!gridContainer) return;

  if (!products.length) {
    gridContainer.innerHTML = "<p>No products available.</p>";
    return;
  }

  gridContainer.innerHTML = products
    .map(
      (p) => `
        <div class="product-card" data-id="${p.id}">
          <img src="${API_BASE}${p.image}" alt="${p.name}" class="product-img" />

          <div class="product-info">
            <strong>${p.name}</strong>
            <p class="price">R${formatCurrency(p.price)}</p>
            <div class="product-details">
              <p>Color: ${p.color || "N/A"}</p>
              <p>Size: ${p.size || "N/A"}</p>
            </div>
          </div>

          <button class="js-add-to-cart add-to-btn" data-id="${p.id}">
            Add to Cart
          </button>
        </div>
      `
    )
    .join("");

  bindAddToCart(gridContainer, products);
}

// -----------------------
// Render Slider (advert line)
// -----------------------
function renderSlider(products) {
  if (!sliderTrack) return;

  const sliderProducts = [...products, ...products]; // duplicate for looping

  sliderTrack.innerHTML = sliderProducts
    .map(
      (p) => `
        <div class="slider-item">
          <img src="${API_BASE}${p.image}" alt="${p.name}" />
          <span>${p.name}</span>
          <span class="price">R${formatCurrency(p.price)}</span>
          <button class="js-add-to-cart btn btn-primary" data-id="${p.id}">
            Add to Cart
          </button>
        </div>
      `
    )
    .join("");

  bindAddToCart(sliderTrack, products);

  // Pause animation on hover
  sliderTrack.style.animationPlayState = "running";
  sliderTrack.addEventListener("mouseenter", () => {
    sliderTrack.style.animationPlayState = "paused";
  });
  sliderTrack.addEventListener("mouseleave", () => {
    sliderTrack.style.animationPlayState = "running";
  });
}

// -----------------------
// Bind Add-to-Cart Buttons
// -----------------------
function bindAddToCart(container, products) {
  container.querySelectorAll(".js-add-to-cart").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const product = products.find((p) => p.id === id);
      if (!product) return;

      cart.addItem(
        { id: product.id, name: product.name, price: product.price, image: product.image },
        1
      );

      updateMiniCart();
    });
  });
}

// -----------------------
// Render Mini-Cart
// -----------------------
function updateMiniCart() {
  if (!cartItemsContainer || !cartTotalContainer) return;

  const items = cart.getItems();

  if (!items.length) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    cartTotalContainer.textContent = "";
    if (cartBadge) cartBadge.textContent = "0";
    return;
  }

  cartItemsContainer.innerHTML = items
    .map(
      (item) => `
        <div class="mini-cart-item" data-id="${item.id}">
          <span>${item.name} × ${item.quantity}</span>
          <span>R${formatCurrency(item.price * item.quantity)}</span>
          <button class="js-cart-decrease" data-id="${item.id}">−</button>
          <button class="js-cart-remove" data-id="${item.id}">×</button>
        </div>
      `
    )
    .join("");

  // Totals
  cartTotalContainer.textContent = `Total: R${formatCurrency(cart.getTotalPrice())}`;
  if (cartBadge) cartBadge.textContent = cart.getTotalQuantity();

  bindCartActions();
}

// -----------------------
// Bind Cart Buttons
// -----------------------
function bindCartActions() {
  // Decrease quantity
  cartItemsContainer.querySelectorAll(".js-cart-decrease").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const currentQty = cart.getItems().find((i) => i.id === id)?.quantity || 0;
      cart.updateQuantity(id, currentQty - 1);
      updateMiniCart();
    });
  });

  // Remove item
  cartItemsContainer.querySelectorAll(".js-cart-remove").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      cart.removeItem(id);
      updateMiniCart();
    });
  });

  // Clear cart
  if (cartClearBtn) {
    cartClearBtn.onclick = () => {
      cart.clear();
      updateMiniCart();
    };
  }
}

// -----------------------
// Init App
// -----------------------
async function init() {
  const products = await fetchProducts();
  renderProducts(products);
  renderSlider(products);
  updateMiniCart();
}

document.addEventListener("DOMContentLoaded", init);
*/



/* src/main.js */
/*import dayjs from "dayjs";
import { formatCurrency } from "./utils/vite-money.js";
import { cart } from "./data/vite-cart-class.js";

// -----------------------
// DOM Elements
// -----------------------
const gridContainer = document.querySelector(".js-grid-products-container");
const cartItemsContainer = document.querySelector(".js-cart-items");
const cartTotalContainer = document.querySelector(".js-cart-total");
const cartClearBtn = document.querySelector(".js-cart-clear");
const cartBadge = document.querySelector(".js-cart-quantity");
const sliderTrack = document.querySelector(".js-slider-track");

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
// Render Products Grid
// -----------------------
function renderProducts(products) {
  if (!gridContainer) return;

  if (products.length === 0) {
    gridContainer.innerHTML = "<p>No products available.</p>";
    return;
  }

  gridContainer.innerHTML = products
    .map(
      (product) => `
      <div class="product-card" data-id="${product.id}">
        <img src="${API_BASE}${product.image}" alt="${product.name}" class="product-img" />
        
        <div class="product-info">
          <strong>${product.name}</strong>
          <p class="price">R${formatCurrency(product.price)}</p>
          
          <div class="product-details">
            <p>Color: ${product.color}</p>
            <p>Size: ${product.size}</p>
          </div>
        </div>

        <button class="js-add-to-cart add-to-btn" data-id="${product.id}">Add to Cart</button>
      </div>

    `
    )
    .join("");

  // Bind Add-to-Cart buttons
  gridContainer.querySelectorAll(".js-add-to-cart").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const product = products.find((p) => p.id === id);
      if (!product) return;
      cart.addItem(
        { id: product.id, name: product.name, price: product.price, image: product.image },
        1
      );
      updateMiniCart();
    });
  });
}

// -----------------------
// Render Slider (advertisement line)
// -----------------------
function renderSlider(products) {
  if (!sliderTrack) return;

  const sliderProducts = [...products, ...products]; // duplicate for infinite loop

  sliderTrack.innerHTML = sliderProducts
    .map(
      (p) => `
      <div class="slider-item">
        <img src="${API_BASE}${p.image}" alt="${p.name}" />
        <span>${p.name}</span>
        <span class="price">R${formatCurrency(p.price)}</span>
        <button class="js-add-to-cart btn btn-primary" data-id="${p.id}">Add to cart</button>
      </div>
    `
    )
    .join("");

  // Bind Add-to-Cart buttons inside slider
  sliderTrack.querySelectorAll(".js-add-to-cart").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const product = products.find((p) => p.id === id);
      if (!product) return;
      cart.addItem(
        { id: product.id, name: product.name, price: product.price, image: product.image },
        1
      );
      updateMiniCart();
    });
  });

  // ------------------------
  // Hover pause logic
  // ------------------------
  let paused = false;
  sliderTrack.addEventListener("mouseenter", () => paused = true);
  sliderTrack.addEventListener("mouseleave", () => paused = false);

  // If you already have the infinite scrolling logic elsewhere (e.g., CSS animation or JS),
  // just wrap the movement step inside `if (!paused) { ... }`.
  // For example, if you use CSS animation, you can do:
  sliderTrack.style.animationPlayState = 'running';
  sliderTrack.addEventListener('mouseenter', () => sliderTrack.style.animationPlayState = 'paused');
  sliderTrack.addEventListener('mouseleave', () => sliderTrack.style.animationPlayState = 'running');
}

// -----------------------
// Update Mini-Cart
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
// Initialize
// -----------------------
document.addEventListener("DOMContentLoaded", async () => {
  const products = await fetchProducts();
  renderProducts(products);
  renderSlider(products);
  updateMiniCart();
});

// -----------------------
// Clear Cart
// -----------------------
if (cartClearBtn) {
  cartClearBtn.addEventListener("click", () => {
    cart.clear();
    updateMiniCart();
  });
}*/























/* src/main.js */
/*import dayjs from "dayjs";
import { formatCurrency } from "./utils/vite-money.js";
import { cart } from "./data/vite-cart-class.js";

const gridContainer = document.querySelector(".js-grid-products-container");
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
      (product) => `
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
// Render Slider (advertisement line)
// -----------------------
function renderSlider(products) {
  const sliderTrack = document.querySelector(".js-slider-track");
  if (!sliderTrack) return;

  // Duplicate products for seamless loop
  const sliderProducts = [...products, ...products];

  sliderTrack.innerHTML = sliderProducts
    .map(
      (p) => `
    <div class="slider-item">
      <img src="${API_BASE}${p.image}" alt="${p.name}" />
      <span>${p.name}</span>
      <span class="price">R${formatCurrency(p.price)}</span>
      <button class="js-add-to-cart" data-id="${p.id}">Add to Cart</button>
    </div>
  `
    )
    .join("");

  // Add-to-cart buttons in slider
  sliderTrack.querySelectorAll(".js-add-to-cart").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const product = products.find((p) => p.id === id);
      if (!product) return;
      cart.addItem(
        { id: product.id, name: product.name, price: product.price, image: product.image },
        1
      );
      updateMiniCart();
      alert(`${product.name} added to cart!`);
    });
  });
}

// -----------------------
// Update Mini-Cart
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
// Initialize
// -----------------------
document.addEventListener("DOMContentLoaded", async () => {
  const products = await fetchProducts();

  renderProducts();
  renderSlider(products);
  updateMiniCart();
});

// -----------------------
// Clear Cart
// -----------------------
if (cartClearBtn) {
  cartClearBtn.addEventListener("click", () => {
    cart.clear();
    updateMiniCart();
  });
}*/
















/* src/main.js */
/*import dayjs from "dayjs";
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
});*/






























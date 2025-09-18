// src/checkout/order-summary.js

const API_BASE = "https://my-express-server-rq4a.onrender.com/api/cart";
const BACKEND_URL = "https://my-express-server-rq4a.onrender.com";

/**
 * Fetch cart from backend
 */
async function fetchCart() {
  try {
    const res = await fetch(API_BASE, { credentials: "include" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.items || [];
  } catch (err) {
    console.error("❌ Failed to fetch cart:", err);
    return [];
  }
}

/**
 * Update cart on backend
 */
async function updateCart(endpoint, body = {}) {
  try {
    const res = await fetch(`${API_BASE}/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body),
    });
    return await res.json();
  } catch (err) {
    console.error(`❌ Failed to ${endpoint}:`, err);
    return null;
  }
}

/**
 * Render the checkout summary
 */
export async function renderCheckout() {
  const summaryContainer = document.getElementById("order-summary");
  if (!summaryContainer) return;

  const cartItems = await fetchCart();

  // Handle empty cart
  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    summaryContainer.innerHTML = `
      <div class="empty-cart">
        <p>Your cart is empty.</p>
      </div>
    `;
    updateTotals([]);
    return;
  }

  // Render cart items
  summaryContainer.innerHTML = `
    ${cartItems
      .map(
        (item) => `
        <div class="checkout-item" data-id="${item.productId}">
          ${item.image ? `<img src="${BACKEND_URL}${item.image}" alt="${item.name}" class="item-img" />` : ""}
          <div class="item-details">
            <span class="item-name">${item.name}</span>
            <span class="item-qty">Qty: ${item.quantity}</span>
          </div>
          <div class="item-actions">
            <button class="js-increase">+</button>
            <button class="js-decrease">−</button>
            <button class="js-remove">×</button>
          </div>
          <span class="item-price">R${(item.price * item.quantity).toFixed(2)}</span>
        </div>
      `
      )
      .join("")}

    <!-- ✅ Only show clear button when cart has items -->
    <div class="checkout-actions">
      <button id="clear-cart-btn" class="clear-cart">Clear Cart</button>
    </div>
  `;

  // Totals
  updateTotals(cartItems);

  // Bind buttons
  bindCheckoutActions();
}

/**
 * Update total amount
 */
function updateTotals(cartItems) {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalElement = document.getElementById("total-amount");

  if (totalElement) {
    totalElement.textContent = `R${total.toFixed(2)}`;
  }
}

/**
 * Bind increase/decrease/remove/clear buttons
 */
function bindCheckoutActions() {
  const summaryContainer = document.getElementById("order-summary");

  summaryContainer.querySelectorAll(".js-increase").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const productId = btn.closest(".checkout-item").dataset.id;
      await updateCart("increase", { productId });
      renderCheckout(); // refresh
    });
  });

  summaryContainer.querySelectorAll(".js-decrease").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const productId = btn.closest(".checkout-item").dataset.id;
      await updateCart("decrease", { productId });
      renderCheckout(); // refresh
    });
  });

  summaryContainer.querySelectorAll(".js-remove").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const productId = btn.closest(".checkout-item").dataset.id;
      await updateCart("remove", { productId });
      renderCheckout(); // refresh
    });
  });

  // ✅ Clear Cart only if items exist
  const clearBtn = document.getElementById("clear-cart-btn");
  if (clearBtn) {
    clearBtn.addEventListener("click", async () => {
      await updateCart("clear");
      renderCheckout(); // refresh
    });
  }
}





















// src/checkout/order-summary.js

/*const API_BASE = "https://my-express-server-rq4a.onrender.com/api/cart";

/**
 * Fetch cart from backend
 */
/*async function fetchCart() {
  try {
    const res = await fetch(API_BASE, { credentials: "include" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.items || [];
  } catch (err) {
    console.error("❌ Failed to fetch cart:", err);
    return [];
  }
}

/**
 * Update cart on backend
 */
/*async function updateCart(endpoint, body = {}) {
  try {
    const res = await fetch(`${API_BASE}/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body),
    });
    return await res.json();
  } catch (err) {
    console.error(`❌ Failed to ${endpoint}:`, err);
    return null;
  }
}

/**
 * Render the checkout summary
 */
/*export async function renderCheckout() {
  const summaryContainer = document.getElementById("order-summary");
  if (!summaryContainer) return;

  const cartItems = await fetchCart();

  // Handle empty cart
  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    summaryContainer.innerHTML = `
      <div class="empty-cart">
        <p>Your cart is empty.</p>
      </div>
    `;
    updateTotals([]);
    return;
  }

  // Render cart items
  summaryContainer.innerHTML = `
    ${cartItems
      .map(
        (item) => `
        <div class="checkout-item" data-id="${item.productId}">
          ${item.image ? `<img src="${item.image}" alt="${item.name}" class="item-img" />` : ""}
          <div class="item-details">
            <span class="item-name">${item.name}</span>
            <span class="item-qty">Qty: ${item.quantity}</span>
          </div>
          <div class="item-actions">
            <button class="js-increase">+</button>
            <button class="js-decrease">−</button>
            <button class="js-remove">×</button>
          </div>
          <span class="item-price">R${(item.price * item.quantity).toFixed(2)}</span>
        </div>
      `
      )
      .join("")}

    <!-- Clear cart button -->
    <div class="checkout-actions">
      <button id="clear-cart-btn" class="clear-cart">Clear Cart</button>
    </div>
  `;

  // Totals
  updateTotals(cartItems);

  // Bind buttons
  bindCheckoutActions();
}

/**
 * Update total amount
 */
/*function updateTotals(cartItems) {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalElement = document.getElementById("total-amount");

  if (totalElement) {
    totalElement.textContent = `R${total.toFixed(2)}`;
  }
}

/**
 * Bind increase/decrease/remove/clear buttons
 */
/*function bindCheckoutActions() {
  const summaryContainer = document.getElementById("order-summary");

  summaryContainer.querySelectorAll(".js-increase").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const productId = btn.closest(".checkout-item").dataset.id;
      await updateCart("increase", { productId });
      renderCheckout(); // refresh
    });
  });

  summaryContainer.querySelectorAll(".js-decrease").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const productId = btn.closest(".checkout-item").dataset.id;
      await updateCart("decrease", { productId });
      renderCheckout(); // refresh
    });
  });

  summaryContainer.querySelectorAll(".js-remove").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const productId = btn.closest(".checkout-item").dataset.id;
      await updateCart("remove", { productId });
      renderCheckout(); // refresh
    });
  });

  // ✅ Clear Cart
  const clearBtn = document.getElementById("clear-cart-btn");
  if (clearBtn) {
    clearBtn.addEventListener("click", async () => {
      await updateCart("clear");
      renderCheckout(); // refresh
    });
  }
}*/
















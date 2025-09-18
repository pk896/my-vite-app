// src/checkout/payment-summary.js

/**
 * Render PayPal Checkout buttons
 * @param {Array} cartItems - Array of { productId, name, price, quantity }
 */
export function renderPayPalButtons(cartItems = []) {
  const container = document.getElementById("paypal-buttons-container");

  if (!container) {
    console.error("❌ PayPal buttons container not found.");
    return;
  }
  if (!window.paypal) {
    console.error("❌ PayPal SDK not loaded yet.");
    return;
  }

  // Reset container
  container.innerHTML = "";

  // Calculate total (frontend only, backend should verify)
  const total = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  const API_BASE = "https://my-express-server-rq4a.onrender.com"; // <-- Replace with your Render backend URL

  paypal
    .Buttons({
      style: {
        layout: "vertical",
        color: "blue",
        shape: "rect",
        label: "paypal",
      },

      // ✅ Create PayPal order (via backend)
      createOrder: async () => {
        try {
          const res = await fetch(`${API_BASE}/payment/create-order`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ amount: total }),
          });

          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const data = await res.json();
          return data.id; // PayPal order ID
        } catch (err) {
          console.error("❌ Create Order error:", err);
          alert("Failed to start PayPal checkout. Please try again.");
          throw err;
        }
      },

      // ✅ Capture PayPal order (via backend)
      onApprove: async (data) => {
        try {
          const res = await fetch(`${API_BASE}/payment/capture-order`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ orderID: data.orderID }),
          });

          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const details = await res.json();

          alert(`🎉 Payment successful! Thank you, ${details.payer?.name?.given_name || "customer"}.`);

          // ✅ Clear the cart in backend session
          await fetch(`${API_BASE}/api/cart/clear`, { method: "POST", credentials: "include" });

          // Optionally clear frontend display too
          const summaryContainer = document.getElementById("order-summary");
          if (summaryContainer) summaryContainer.innerHTML = "<p>Your cart is empty.</p>";

          const totalElement = document.getElementById("total-amount");
          if (totalElement) totalElement.textContent = "0.00";

        } catch (err) {
          console.error("❌ Capture Order error:", err);
          alert("Something went wrong capturing the PayPal order.");
        }
      },

      onError: (err) => {
        console.error("❌ PayPal Checkout error:", err);
        alert("Something went wrong with PayPal checkout. Please try again.");
      },
    })
    .render(container);
}













// src/checkout/payment-summary.js
/*
/**
 * Render PayPal Checkout buttons
 * @param {Array} cartItems - Array of { id, name, price, quantity }
 */
/*export function renderPayPalButtons(cartItems = []) {
  const container = document.getElementById("paypal-buttons-container");

  if (!container) {
    console.error("❌ PayPal buttons container not found.");
    return;
  }
  if (!window.paypal) {
    console.error("❌ PayPal SDK not loaded yet.");
    return;
  }

  // Reset container
  container.innerHTML = "";

  // Calculate total amount on frontend (for display) — backend will verify
  const total = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  paypal
    .Buttons({
      style: {
        layout: "vertical",
        color: "blue",
        shape: "rect",
        label: "paypal",
      },

      // ✅ Create PayPal order (via backend)
      createOrder: async () => {
        try {
          const res = await fetch("/payment/create-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: total }),
          });

          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const data = await res.json();

          return data.id; // PayPal order ID
        } catch (err) {
          console.error("❌ Create Order error:", err);
          alert("Failed to start PayPal checkout. Please try again.");
          throw err;
        }
      },

      // ✅ Capture PayPal order (via backend)
      onApprove: async (data) => {
        try {
          const res = await fetch("/payment/capture-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderID: data.orderID }),
          });

          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const details = await res.json();

          alert(`🎉 Payment successful! Thank you, ${details.payer?.name?.given_name || "customer"}.`);

          // TODO: call backend to clear session cart
          // e.g. await fetch("/cart/clear", { method: "POST" });

        } catch (err) {
          console.error("❌ Capture Order error:", err);
          alert("Something went wrong capturing the PayPal order.");
        }
      },

      onError: (err) => {
        console.error("❌ PayPal Checkout error:", err);
        alert("Something went wrong with PayPal checkout. Please try again.");
      },
    })
    .render(container);
}
*/




















// src/checkout/payment-summary.js

/*export function renderPayPalButtons(cartItems = []) {
  // Ensure PayPal SDK is loaded
  if (!window.paypal) {
    console.error("PayPal SDK not loaded yet.");
    return;
  }

  // Calculate total amount from cart items
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  // Clear any existing buttons
  const container = document.getElementById("paypal-buttons-container");
  if (!container) {
    console.error("PayPal buttons container not found.");
    return;
  }
  container.innerHTML = "";

  // Render PayPal Buttons
  paypal.Buttons({
    style: {
      layout: "vertical",
      color: "blue",
      shape: "rect",
      label: "paypal",
    },
    createOrder: function (data, actions) {
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: total, // total amount for PayPal checkout
          },
        }],
      });
    },
    onApprove: function (data, actions) {
      return actions.order.capture().then(function (details) {
        alert(`Transaction completed by ${details.payer.name.given_name}!`);
        // TODO: Call your backend to finalize order and clear cart
      });
    },
    onError: function (err) {
      console.error("PayPal Checkout error:", err);
      alert("Something went wrong with PayPal checkout. Please try again.");
    },
  }).render(container);
}
*/















// src/checkout/payment-summary.js
/*import { cart } from "../data/vite-cart-class.js";
import { formatCurrency } from "../utils/vite-money.js";

const API_BASE = "https://my-express-server-rq4a.onrender.com";

let paypalScriptLoaded = false;

// --- Load PayPal SDK once ---
async function loadPayPalSdk() {
  if (paypalScriptLoaded) return;
  const res = await fetch(`${API_BASE}/payment/config`);
  const { clientId } = await res.json();

  await new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`;
    script.onload = () => { paypalScriptLoaded = true; resolve(); };
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

// --- Render PayPal buttons dynamically ---
function renderPayPalButtons(grandTotal) {
  const paypalContainer = document.querySelector("#paypal-button-container");
  if (!paypalContainer || typeof paypal === "undefined") return;

  paypalContainer.innerHTML = ""; // clear old buttons

  paypal.Buttons({
    style: {
      layout: "vertical",
      color: "blue",
      shape: "rect",
      label: "paypal",
    },
    createOrder: async () => {
      const res = await fetch(`${API_BASE}/payment/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: grandTotal.toFixed(2) }),
      });
      const order = await res.json();
      return order.id;
    },
    onApprove: async (data) => {
      const res = await fetch(`${API_BASE}/payment/capture-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderID: data.orderID }),
      });
      const details = await res.json();

      alert(`✅ Transaction completed by ${details.payer.name.given_name}`);
      cart.clear();
      updatePayments(); // re-render summary + PayPal
    },
    onError: (err) => {
      console.error("PayPal Error:", err);
      alert("❌ Payment could not be processed. Please try again.");
    },
  }).render("#paypal-button-container");
}

// --- Update payment summary ---
export async function updatePayments() {
  const container = document.querySelector("#payment-summary");
  const paypalContainer = document.querySelector("#paypal-button-container");
  if (!container || !paypalContainer) return;

  const items = cart.getItems();

  if (items.length === 0) {
    container.innerHTML = `<p>No payment needed. Cart is empty.</p>`;
    paypalContainer.innerHTML = "";
    return;
  }

  // --- Calculate totals ---
  let subtotal = 0;
  items.forEach(item => subtotal += item.price * item.quantity);
  const tax = subtotal * 0.15;
  const shipping = subtotal > 300 ? 0 : 50;
  const grandTotal = subtotal + tax + shipping;

  // --- Render summary ---
  container.innerHTML = `
    <div class="payment-summary">
      <h3>Payment Summary</h3>
      <p>Items in Cart: ${cart.getTotalQuantity()}</p>
      <p>Unique Items: ${cart.getUniqueItemsCount()}</p>
      <p>Subtotal: R${formatCurrency(subtotal)}</p>
      <p>Tax (15%): R${formatCurrency(tax)}</p>
      <p>Shipping: R${formatCurrency(shipping)}</p>
      <hr>
      <p><b>Grand Total: R${formatCurrency(grandTotal)}</b></p>
    </div>
  `;

  await loadPayPalSdk();
  renderPayPalButtons(grandTotal); // always render PayPal after summary
}*/

















// src/checkout/payment-summary.js
/*import { cart } from "../data/vite-cart-class.js";
import { formatCurrency } from "../utils/vite-money.js";

const API_BASE = "https://my-express-server-rq4a.onrender.com";

let paypalScriptLoaded = false;
let paypalButtonsRendered = false;
let productsCache = [];

// --- Fetch products from backend ---
async function fetchProducts() {
  if (productsCache.length) return productsCache;

  const res = await fetch(`${API_BASE}/api/products`);
  productsCache = await res.json();

  // Fix product image paths
  productsCache.forEach((p) => {
    if (p.Image) p.Image = `${API_BASE}/${p.Image}`;
  });

  return productsCache;
}

// --- Load PayPal SDK dynamically ---
async function loadPayPalSdk() {
  if (paypalScriptLoaded) return;

  const res = await fetch(`${API_BASE}/payment/config`);
  const { clientId } = await res.json();

  await new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`; 
    script.onload = () => {
      paypalScriptLoaded = true;
      resolve();
    };
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

// --- Update payment summary + PayPal buttons ---
export async function updatePayments() {
  const container = document.querySelector("#payment-summary");
  const paypalContainer = document.querySelector("#paypal-button-container");

  if (!container || !paypalContainer) return;

  const items = cart.getItems();

  // Empty cart case
  if (items.length === 0) {
    container.innerHTML = `<p>No payment needed. Cart is empty.</p>`;
    paypalContainer.innerHTML = "";
    paypalButtonsRendered = false;
    return;
  }

  await fetchProducts();

  // --- Calculate totals ---
  let subtotal = 0;
  items.forEach((item) => {
    const product = productsCache.find((f) => f.id === item.id);
    const price = Number(product?.price || item.price);
    subtotal += item.quantity * price;
  });

  const taxRate = 0.15;
  const shipping = subtotal > 300 ? 0 : 50;
  const tax = subtotal * taxRate;
  const grandTotal = subtotal + tax + shipping;

  // --- Render summary ---
  container.innerHTML = `
    <div class="payment-summary">
      <h3>Payment Summary</h3>
      <p>Items in Cart: ${cart.getTotalQuantity()}</p>
      <p>Unique Items: ${cart.getUniqueItemsCount()}</p>
      <p>Subtotal: R${formatCurrency(subtotal)}</p>
      <p>Tax (15%): R${formatCurrency(tax)}</p>
      <p>Shipping: R${formatCurrency(shipping)}</p>
      <hr>
      <p><b>Grand Total: R${formatCurrency(grandTotal)}</b></p>
     </div>
  `;

  paypalContainer.innerHTML = "";

  // --- Ensure SDK is loaded ---
  await loadPayPalSdk();

  // --- Render PayPal Buttons ---
  if (!paypalButtonsRendered && typeof paypal !== "undefined") {
    paypal.Buttons({
      style: {
        layout: "vertical",
        color: "blue",
        shape: "rect",
        label: "paypal",
      },

      // ✅ Create order via backend
      createOrder: async () => {
        const res = await fetch(`${API_BASE}/payment/create-order`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: grandTotal.toFixed(2) }),
        });
        const order = await res.json();
        return order.id;
      },

      // ✅ Capture order via backend
      onApprove: async (data) => {
        const res = await fetch(`${API_BASE}/payment/capture-order`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderID: data.orderID }),
        });
        const details = await res.json();

        alert(`✅ Transaction completed by ${details.payer.name.given_name}`);

        // Clear cart + re-render summary
        cart.clear();
        paypalButtonsRendered = false;
        updatePayments();
      },

      onError: (err) => {
        console.error("PayPal Error:", err);
        alert("❌ Payment could not be processed. Please try again.");
      },
    }).render("#paypal-button-container");

    paypalButtonsRendered = true;
  }
}*/


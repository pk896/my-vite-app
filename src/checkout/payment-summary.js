// src/checkout/payment-summary.js
import { cart } from "../data/vite-cart-class.js";
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
    <h3>Payment Summary</h3>
    <p>Items in Cart: ${cart.getTotalQuantity()}</p>
    <p>Unique Items: ${cart.getUniqueItemsCount()}</p>
    <p>Subtotal: R${formatCurrency(subtotal)}</p>
    <p>Tax (15%): R${formatCurrency(tax)}</p>
    <p>Shipping: R${formatCurrency(shipping)}</p>
    <hr>
    <p><b>Grand Total: R${formatCurrency(grandTotal)}</b></p>
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
}



















// src/checkout/payment-summary.js
/*import { cart } from "../data/vite-cart-class.js";
import { formatCurrency } from "../utils/vite-money.js";

const API_BASE = "https://my-express-server-rq4a.onrender.com";

let paypalLoaded = false;
let paypalButtonsRendered = false;

// Load PayPal SDK dynamically
async function loadPayPalSdk() {
  if (paypalLoaded) return;

  try {
    const res = await fetch(`${API_BASE}/payment/config`);
    const { clientId } = await res.json();

    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`;
      script.onload = () => {
        paypalLoaded = true;
        resolve();
      };
      document.body.appendChild(script);
    });
  } catch (err) {
    console.error("❌ Could not load PayPal SDK:", err);
  }
}

// Update payment summary and render PayPal buttons
export async function updatePayments() {
  const container = document.querySelector("#payment-summary");
  const paypalContainer = document.querySelector("#paypal-button-container");
  if (!container || !paypalContainer) return;

  const items = cart.getItems();

  if (items.length === 0) {
    container.innerHTML = `<p>No payment needed. Cart is empty.</p>`;
    paypalContainer.innerHTML = "";
    paypalButtonsRendered = false;
    return;
  }

  // Calculate totals
  let subtotal = 0;
  const cartItemsForOrder = items.map((item) => {
    const product = fruidsData.find((f) => f.id === item.id);
    const price = Number(product?.price || item.price);
    subtotal += item.quantity * price;
    return {
      id: item.id,
      name: product?.name || "Unknown",
      quantity: item.quantity,
      price,
    };
  });

  const taxRate = 0.15;
  const shipping = subtotal > 300 ? 0 : 50;
  const tax = subtotal * taxRate;
  const grandTotal = subtotal + tax + shipping;

  // Render summary
  container.innerHTML = `
    <h3>Payment Summary</h3>
    <p>Items in Cart: ${cart.getTotalQuantity()}</p>
    <p>Unique Items: ${cart.getUniqueItemsCount()}</p>
    <p>Subtotal: R${formatCurrency(subtotal)}</p>
    <p>Tax (15%): R${formatCurrency(tax)}</p>
    <p>Shipping: R${formatCurrency(shipping)}</p>
    <hr>
    <p><b>Grand Total: R${formatCurrency(grandTotal)}</b></p>
  `;

  paypalContainer.innerHTML = ""; // clear previous buttons
  await loadPayPalSdk();

  if (!paypalButtonsRendered && typeof paypal !== "undefined") {
    paypal.Buttons({
      style: { layout: "vertical", color: "blue", shape: "rect", label: "paypal" },

      createOrder: async () => {
        const res = await fetch(`${API_BASE}/payment/create-order`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: grandTotal.toFixed(2), items: cartItemsForOrder }),
        });
        const order = await res.json();
        return order.id;
      },

      onApprove: async (data) => {
        const res = await fetch(`${API_BASE}/payment/capture-order/${data.orderID}`, { method: "POST" });
        const details = await res.json();

        alert(`✅ Transaction completed by ${details.payer.name.given_name}`);

        cart.clear();
        paypalButtonsRendered = false;
        updatePayments();
      },

      onError: (err) => {
        console.error("PayPal Error:", err);
        alert("❌ Payment could not be processed. Try again.");
      },
    }).render("#paypal-button-container");

    paypalButtonsRendered = true;
  }
}
*/
















// src/checkout/payment-summary.js
/*import { cart } from "../data/vite-cart-class.js";
import { fruidsData } from "../data/vite-fruidsData.js";
import { formatCurrency } from "../utils/vite-money.js";

const API_BASE = "https://my-express-server-rq4a.onrender.com";

// Track if PayPal SDK is loaded and buttons rendered
let paypalLoaded = false;
let paypalButtonsRendered = false;

// Load PayPal SDK dynamically
async function loadPayPalSdk() {
  if (paypalLoaded) return;

  const res = await fetch(`${API_BASE}/config`);
  const { clientId } = await res.json();

  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.id = "paypal-sdk";
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`; // change USD to ZAR if needed
    script.onload = () => {
      paypalLoaded = true;
      resolve();
    };
    document.body.appendChild(script);
  });
}

// Update payment summary and render PayPal buttons
export async function updatePayments() {
  const container = document.querySelector("#payment-summary");
  const paypalContainer = document.querySelector("#paypal-button-container");
  if (!container || !paypalContainer) return;

  const items = cart.getItems();

  if (items.length === 0) {
    container.innerHTML = `<p>No payment needed. Cart is empty.</p>`;
    paypalContainer.innerHTML = "";
    paypalButtonsRendered = false;
    return;
  }

  // Calculate totals
  let subtotal = 0;
  const cartItemsForOrder = items.map((item) => {
    const product = fruidsData.find((f) => f.id === item.id);
    const price = Number(product?.price || item.price);
    subtotal += item.quantity * price;
    return {
      id: item.id,
      name: product?.name || "Unknown",
      quantity: item.quantity,
      price,
    };
  });

  const taxRate = 0.15;
  const shipping = subtotal > 300 ? 0 : 50;
  const tax = subtotal * taxRate;
  const grandTotal = subtotal + tax + shipping;

  // Render summary
  container.innerHTML = `
    <h3>Payment Summary</h3>
    <p>Items in Cart: ${cart.getTotalQuantity()}</p>
    <p>Unique Items: ${cart.getUniqueItemsCount()}</p>
    <p>Subtotal: R${formatCurrency(subtotal)}</p>
    <p>Tax (15%): R${formatCurrency(tax)}</p>
    <p>Shipping: R${formatCurrency(shipping)}</p>
    <hr>
    <p><b>Grand Total: R${formatCurrency(grandTotal)}</b></p>
  `;

  paypalContainer.innerHTML = ""; // clear previous buttons

  await loadPayPalSdk();

  // Render PayPal buttons only once
  if (!paypalButtonsRendered && typeof paypal !== "undefined") {
    paypal.Buttons({
      style: { layout: "vertical", color: "blue", shape: "rect", label: "paypal" },

      createOrder: async () => {
        const res = await fetch(`${API_BASE}/create-order`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: grandTotal.toFixed(2), items: cartItemsForOrder }),
        });
        const order = await res.json();
        return order.id;
      },

      onApprove: async (data) => {
        const res = await fetch(`${API_BASE}/capture-order`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderID: data.orderID }),
        });
        const details = await res.json();

        alert(`✅ Transaction completed by ${details.payer.name.given_name}`);

        cart.clear();
        paypalButtonsRendered = false;
        updatePayments();
      },

      onError: (err) => {
        console.error("PayPal Error:", err);
        alert("❌ Payment could not be processed. Try again.");
      },
    }).render("#paypal-button-container");

    paypalButtonsRendered = true;
  }
}*/

// src/vite-checkout.js
import { renderCheckout } from "./order-summary.js";
import { renderPayPalButtons } from "./payment-summary.js";

const API_BASE = "https://my-express-server-rq4a.onrender.com"; // <-- Replace with your Render URL

/**
 * Fetch cart items from backend
 */
async function getCartItems() {
  try {
    const res = await fetch(`${API_BASE}/api/cart`, { credentials: "include" });
    if (!res.ok) throw new Error(`Failed to fetch cart: ${res.status}`);
    const cart = await res.json();
    return cart.items || [];
  } catch (err) {
    console.error("Error fetching cart items:", err);
    return [];
  }
}

/**
 * Dynamically load PayPal SDK
 */
async function loadPayPalSdk() {
  try {
    const res = await fetch(`${API_BASE}/payment/config`, { credentials: "include" });
    if (!res.ok) throw new Error("Failed to fetch PayPal config");

    const { clientId } = await res.json();
    if (!clientId) throw new Error("Missing PayPal clientId");

    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`;
      script.onload = resolve;
      script.onerror = () => reject(new Error("Failed to load PayPal SDK"));
      document.head.appendChild(script);
    });
  } catch (err) {
    console.error("Error loading PayPal SDK:", err);
  }
}

/**
 * Initialize checkout page
 */
document.addEventListener("DOMContentLoaded", async () => {
  try {
    // 1️⃣ Fetch cart items
    const cartItems = await getCartItems();

    // 2️⃣ Render checkout summary
    renderCheckout(cartItems);

    // 3️⃣ Load PayPal SDK
    await loadPayPalSdk();

    // 4️⃣ Render PayPal buttons
    renderPayPalButtons(cartItems);

    // 5️⃣ Optional: Weather widget
    const weatherContainer = document.querySelector(".js-weather");
    if (weatherContainer) {
      fetch("https://api.open-meteo.com/v1/forecast?latitude=46.9481&longitude=7.4474&current_weather=true")
        .then(res => res.json())
        .then(data => {
          const current = data.current_weather;
          weatherContainer.innerHTML = `
            <h2>Weather in Bern</h2>
            <p><b>Temperature:</b> ${current.temperature}°C</p>
            <p><b>Wind:</b> ${current.windspeed} km/h</p>
            <p><b>Weather Code:</b> ${current.weathercode}</p>
            <p><b>Time:</b> ${current.time}</p>
          `;
        })
        .catch(err => console.error("Error fetching weather:", err));
    }

  } catch (err) {
    console.error("Checkout initialization failed:", err);
  }
});














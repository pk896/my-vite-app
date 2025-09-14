// src/vite-checkout.js
import { renderCheckout } from "./checkout/order-summary.js";
import { updatePayments } from "./checkout/payment-summary.js";

// Function to dynamically load PayPal SDK
async function loadPayPalSdk() {
  const res = await fetch("/payment/config"); // your backend endpoint
  const { clientId } = await res.json();

  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`;
    script.onload = resolve;
    document.head.appendChild(script);
  });
}

// Initialize checkout and payment summary on page load
document.addEventListener("DOMContentLoaded", async () => {
  renderCheckout();

  // Load PayPal SDK before initializing buttons
  await loadPayPalSdk();

  // Now update payment summary including PayPal buttons
  updatePayments();

  // Optional: Live weather display
  const weatherContainer = document.querySelector(".js-weather");
  if (weatherContainer) {
    fetch("https://api.open-meteo.com/v1/forecast?latitude=46.9481&longitude=7.4474&current_weather=true")
      .then((res) => res.json())
      .then((data) => {
        const current = data.current_weather;
        weatherContainer.innerHTML = `
          <h2>Weather in Bern</h2>
          <p><b>Temperature:</b> ${current.temperature}°C</p>
          <p><b>Wind:</b> ${current.windspeed} km/h</p>
          <p><b>Weather Code:</b> ${current.weathercode}</p>
          <p><b>Time:</b> ${current.time}</p>
        `;
      })
      .catch((err) => console.error("Error fetching weather:", err));
  }
});












/* src/vite-checkout.js */
/*import { renderCheckout } from "./checkout/order-summary.js";
import { updatePayments } from "./checkout/payment-summary.js";
import { cart } from "./data/vite-cart-class.js";

// Initialize checkout, payments, weather, and PayPal
document.addEventListener("DOMContentLoaded", () => {
    // 1️⃣ Render checkout & payments
    renderCheckout(cart.items);
    updatePayments();

    // 2️⃣ Fetch weather data (Bern example)
    fetch("https://api.open-meteo.com/v1/forecast?latitude=46.9481&longitude=7.4474&current_weather=true")
        .then(response => response.json())
        .then(data => {
            const weatherContainer = document.querySelector(".js-weather");
            if (!weatherContainer) return;

            const current = data.current_weather;
            weatherContainer.innerHTML = `
                <h2>Weather in Bern</h2>
                <p><b>Temperature:</b> ${current.temperature}°C</p>
                <p><b>Wind:</b> ${current.windspeed} km/h</p>
                <p><b>Weather Code:</b> ${current.weathercode}</p>
                <p><b>Time:</b> ${current.time}</p>
            `;
        })
        .catch(err => console.error("Error fetching weather data:", err));

    // 3️⃣ Load PayPal SDK dynamically from backend
    async function loadPayPal() {
        try {
            const res = await fetch("/config/paypal"); // your backend endpoint
            const data = await res.json();
            const clientId = data.clientId;

            // Inject PayPal script
            const script = document.createElement("script");
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`;
            script.onload = () => {
                renderPayPalButton();
            };
            document.body.appendChild(script);
        } catch (err) {
            console.error("Error loading PayPal SDK:", err);
        }
    }

    function renderPayPalButton() {
        if (!window.paypal) return;

        paypal.Buttons({
            createOrder: (data, actions) => {
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: cart.getTotal().toFixed(2)
                        }
                    }]
                });
            },
            onApprove: (data, actions) => {
                return actions.order.capture().then(details => {
                    alert(`Transaction completed by ${details.payer.name.given_name}`);
                });
            }
        }).render("#paypal-button-container"); // make sure this exists in HTML
    }

    loadPayPal();
});
*/















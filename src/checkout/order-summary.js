// src/checkout/order-summary.js
import { cart } from "../data/vite-cart-class.js";
import { updatePayments } from "./payment-summary.js";
import { formatCurrency } from "../utils/vite-money.js";

const API_BASE = "https://my-express-server-rq4a.onrender.com";

// Render Checkout Items (only)
export function renderCheckout() {
  const container = document.querySelector("#order-summary");
  if (!container) return;

  const items = cart.getItems();

  if (items.length === 0) {
    container.innerHTML = `<p>Your cart is empty.</p>`;
    updatePayments();
    return;
  }

  let total = 0;

  const itemsHTML = items
    .map(item => {
      const subtotal = item.price * item.quantity;
      total += subtotal;
      return `
        <div class="checkout-item" data-id="${item.id}">
          <img src="${API_BASE}${item.image}" alt="${item.name}" class="checkout-img" />
          <div class="checkout-details">
            <span><b>Product:</b> ${item.name}</span>
            <span><b>Price:</b> R${formatCurrency(item.price)}</span>
            <div class="checkout-quantity">
              <button class="js-decrease" data-id="${item.id}">−</button>
              <input type="number" class="js-qty-input" min="1" value="${item.quantity}" data-id="${item.id}" />
              <button class="js-increase" data-id="${item.id}">+</button>
            </div>
            <span><b>Subtotal:</b> R<span class="js-subtotal">${formatCurrency(subtotal)}</span></span>
          </div>
          <div class="checkout-actions">
            <button class="js-remove-item" data-id="${item.id}">Remove</button>
          </div>
        </div>
      `;
    })
    .join("");

  container.innerHTML = `
    ${itemsHTML}
    <div class="checkout-total">
      <strong>Grand Total: R<span class="js-grand-total">${formatCurrency(total)}</span></strong>
    </div>
  `;

  // Event listeners for quantity and remove
  container.querySelectorAll(".js-increase").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      cart.changeQuantity(id, 1);
      renderCheckout();
      updatePayments();
      renderPayPalButtons(); // re-render PayPal after changes
    });
  });

  container.querySelectorAll(".js-decrease").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      cart.changeQuantity(id, -1);
      renderCheckout();
      updatePayments();
      renderPayPalButtons();
    });
  });

  container.querySelectorAll(".js-qty-input").forEach(input => {
    input.addEventListener("change", () => {
      const id = input.dataset.id;
      const newQty = Number(input.value) || 1;
      cart.setQuantity(id, newQty);
      renderCheckout();
      updatePayments();
      renderPayPalButtons();
    });
  });

  container.querySelectorAll(".js-remove-item").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      cart.removeItem(id);
      renderCheckout();
      updatePayments();
      renderPayPalButtons();
    });
  });

  updatePayments();
}
















// src/checkout/payment-summary.js
/*export function renderPayPalButtons() {
  const container = document.getElementById("paypal-button-container");
  if (!container) return;

  // Clear existing buttons
  container.innerHTML = "";

  // Render new PayPal buttons
  if (typeof paypal === "undefined") return;
  paypal.Buttons({
    createOrder: function (data, actions) {
      const total = cart.getTotal();
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: total.toFixed(2)
          }
        }]
      });
    },
    onApprove: function (data, actions) {
      return actions.order.capture().then(function (details) {
        alert("Transaction completed by " + details.payer.name.given_name);
        cart.clear();
        renderCheckout();
        updatePayments();
      });
    }
  }).render(container);
}*/






// src/data/vite-cart-class.js

const API_BASE = "https://my-express-server-rq4a.onrender.com/api/cart";

/**
 * Cart API Client
 * Handles all cart actions via backend endpoints (session-based).
 */
export class CartAPI {
  constructor() {
    this.items = [];
    this.total = 0;
  }

  /**
   * Fetch latest cart from backend
   */
  async fetchCart() {
    try {
      const res = await fetch(API_BASE, { credentials: "include" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      this.items = data.items || [];
      this.total = data.total || 0;
      return this;
    } catch (err) {
      console.error("❌ Failed to fetch cart:", err);
      return this;
    }
  }

  /**
   * Add item to cart
   */
  async addItem(productId, quantity = 1) {
    try {
      const res = await fetch(`${API_BASE}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ productId, quantity }),
      });
      const data = await res.json();
      await this.fetchCart(); // refresh items
      return data;
    } catch (err) {
      console.error("❌ Failed to add item:", err);
    }
  }

  /**
   * Increase quantity
   */
  async increase(productId) {
    try {
      await fetch(`${API_BASE}/increase`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ productId }),
      });
      await this.fetchCart();
    } catch (err) {
      console.error("❌ Failed to increase quantity:", err);
    }
  }

  /**
   * Decrease quantity
   */
  async decrease(productId) {
    try {
      await fetch(`${API_BASE}/decrease`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ productId }),
      });
      await this.fetchCart();
    } catch (err) {
      console.error("❌ Failed to decrease quantity:", err);
    }
  }

  /**
   * Remove item
   */
  async removeItem(productId) {
    try {
      await fetch(`${API_BASE}/remove`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ productId }),
      });
      await this.fetchCart();
    } catch (err) {
      console.error("❌ Failed to remove item:", err);
    }
  }

  /**
   * Clear cart
   */
  async clear() {
    try {
      await fetch(`${API_BASE}/clear`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      await this.fetchCart();
    } catch (err) {
      console.error("❌ Failed to clear cart:", err);
    }
  }

  // Helpers
  getItems() {
    return this.items;
  }

  getTotalPrice() {
    return this.total;
  }

  getTotalQuantity() {
    return this.items.reduce((sum, i) => sum + i.quantity, 0);
  }
}

// Export a singleton instance
export const cart = new CartAPI();



















/**
 * CartItem represents one item in the cart
 */
/*export class CartItem {
  constructor(id, name, price, quantity = 1, image = null, deliveryId = null) {
    this.id = id;               // unique product ID
    this.name = name;           // product name
    this.price = Number(price); // ensure price is numeric
    this.quantity = Number(quantity);
    this.image = image || null;
    this.deliveryId = deliveryId; // optional delivery option ID
  }

  // ✅ Subtotal for this item
  get total() {
    return this.price * this.quantity;
  }
}

/**
 * Cart manages all items
 */
/*export class Cart {
  constructor(name = "mainCart") {
    this.name = name;
    this.items = this.load();
  }

  // ✅ Add item or increase quantity
  addItem(product, quantity = 1) {
    if (!product?.id || !product?.name || !product?.price) return;

    const existing = this.items.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push(
        new CartItem(
          product.id,
          product.name,
          product.price,
          quantity,
          product.image || null
        )
      );
    }
    this.save();
  }

  // ✅ Increase/decrease quantity by n
  changeQuantity(productId, delta) {
    const item = this.items.find(i => i.id === productId);
    if (!item) return;
    item.quantity += delta;
    if (item.quantity <= 0) this.removeItem(productId);
    this.save();
  }

  // ✅ Set quantity directly
  setQuantity(productId, quantity) {
    const item = this.items.find(i => i.id === productId);
    if (!item) return;
    if (quantity <= 0) this.removeItem(productId);
    else item.quantity = Number(quantity);
    this.save();
  }

  // ✅ Remove item completely
  removeItem(productId) {
    this.items = this.items.filter(item => item.id !== productId);
    this.save();
  }

  // ✅ Update delivery option
  updateDeliveryOption(productId, deliveryId) {
    const item = this.items.find(i => i.id === productId);
    if (!item) return;
    item.deliveryId = deliveryId;
    this.save();
  }

  // ✅ Get all items
  getItems() {
    return this.items;
  }

  // ✅ Clear entire cart
  clear() {
    this.items = [];
    this.save();
  }

  // ✅ Totals
  getTotalQuantity() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  getUniqueItemsCount() {
    return this.items.length;
  }

  getTotalPrice() {
    return this.items.reduce((sum, item) => sum + item.total, 0);
  }

  // ✅ Persistence
  save() {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem(this.name, JSON.stringify(this.items));
    }
  }

  load() {
    if (typeof window !== "undefined" && window.localStorage) {
      try {
        const data = localStorage.getItem(this.name);
        return data ? JSON.parse(data) : [];
      } catch (e) {
        console.error("Error loading cart:", e);
        return [];
      }
    }
    return [];
  }
}

// ✅ Single shared instance
export const cart = new Cart("mainCart");*/





















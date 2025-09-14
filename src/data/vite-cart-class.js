/**
 * CartItem represents one item in the cart
 */
export class CartItem {
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
export class Cart {
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
export const cart = new Cart("mainCart");





















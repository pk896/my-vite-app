/* data/vite-delivery-options.js */

// Define all delivery options with consistent naming
export const deliveryOptions = [
    { id: '1', name: 'Standard', deliveryDays: 7, priceCents: 1000 },
    { id: '2', name: 'Express', deliveryDays: 3, priceCents: 500 },
    { id: '3', name: 'Next Day', deliveryDays: 1, priceCents: 0 }
];

// Get a delivery option by its id
export function getDeliveryOptionById(id) {
    return deliveryOptions.find(option => option.id === id) || null;
}



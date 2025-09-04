import { updatePayments } from "../checkout/payment-summary";

export const deliveryOptions = [{
    deliveryDays: 7,
    prizeCents: 1000,
    deliveryOptionsId: '1' 
}, {
    deliveryDays: 3,
    prizeCents: 500,
    deliveryOptionsId: '2'
}, {
    deliveryDays: 1,
    prizeCents: 0,
    deliveryOptionsId: '3'
}];
export function getDeliveryOptionById(deliveryId) {
    let matchingItem = '';
    deliveryOptions.forEach((option) => {
        if (option.deliveryOptionsId === deliveryId) {
            matchingItem = option;
        }
    });
    return matchingItem;
};


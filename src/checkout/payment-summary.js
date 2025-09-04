import { cart } from "../data/vite-cart.js";
import { deliveryOptions, getDeliveryOptionById } from "../data/vite-delivery-options.js";
import { getFruidsById } from "../data/vite-fruidsData.js";
import { formatCurrency } from "../utils/vite-money.js";
import '../data/vite-cart.js'



export function renderPaymentSummary() {
// This function is intended to render the payment summary.
    let fruidsPrizeCents = 0;
    let shippingPrizeCents = 0;
    let cartQuantity = 0;
    let paymentSummaryHTML = '';

    cart.forEach((cartItem) => {
        const deliveryId = cartItem.deliveryId;
        cartQuantity += cartItem.quantity


        const fruid = getFruidsById(cartItem.fruidsId);


         fruidsPrizeCents += fruid.prize * cartItem.quantity;

        console.log(cartItem.quantity);

        console.log(fruidsPrizeCents);

         const deliveryOptions = getDeliveryOptionById(deliveryId);
         shippingPrizeCents += deliveryOptions.prizeCents * cartItem.quantity 
    });
    const totalBeforeTaxCents = fruidsPrizeCents + shippingPrizeCents;
    const taxCents = totalBeforeTaxCents * 0.1;
    const totalCents = totalBeforeTaxCents + taxCents;
    


    paymentSummaryHTML += `<div>
        <div>items: ${cartQuantity}.<span> sum prize:
         R${formatCurrency(fruidsPrizeCents)}</span></div>
        <div>shipping: <span>R${formatCurrency(shippingPrizeCents)}</span></div>
        <div>total before tax: <span>R${formatCurrency(totalBeforeTaxCents)}
        </span></div>
        <div>tax:<span>10%</span></div>
        <div>TOTAL: <span>R${formatCurrency(totalCents)}</span></div>
    </div>`;

    return paymentSummaryHTML;
};
export function updatePayments() {
     document.querySelector('.js-payment-summary')
      .innerHTML = renderPaymentSummary(); // ADD THIS LINE
}



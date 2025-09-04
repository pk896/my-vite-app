import { cart, removeFromCart, auditTheCart } from "../data/vite-cart.js";
import { fruidsData, getFruidsById } from "../data/vite-fruidsData.js";
import {deliveryOptions, getDeliveryOptionById} from '../data/vite-delivery-options.js'
import { formatCurrency } from "../utils/vite-money.js";
import dayjs from "dayjs";
import { renderPaymentSummary } from "./payment-summary.js";
import { updatePayments } from "./payment-summary.js";


// This script generates a summary of items in the cart,
//  including delivery options for each item.

export function renderCheckout() {


let cartSummaryHTML = '';

cart.forEach((cartItem) => {
    const fruidsId = cartItem.fruidsId;

   // const matchingItem = _.find(fruidsData, { id: fruidsId });

    let matchingItem = getFruidsById(fruidsId);

    const deliveryId = cartItem.deliveryId;
    // Find the delivery option that matches the deliveryId in the cartItem

    let deliveryOption = getDeliveryOptionById(deliveryId);

        /*deliveryOptions.forEach((option) => {

            if (option.deliveryOptionsId === deliveryId) {
                deliveryOption = option;
            }
        });*/
        
    const deliveryDays = deliveryOption.deliveryDays;

    const deliveryDateString = dayjs().add(deliveryDays, 'day')
    .format('dddd, MMMM D');


    cartSummaryHTML +=  `
    <div class="js-main-container-${matchingItem.id}">
        <div>
            ${deliveryOptionsHTML(matchingItem, cartItem)}  
        </div>
            <img src="${matchingItem.Image}" alt="nice apple image" 
            style="width : 150px;">
            <div>delivery day is: ${deliveryDateString}</div>
            <div>product ${matchingItem.name}</div>

            <div>color ${matchingItem.color}</div>

            <div>size ${matchingItem.size}</div>

            <div>prize R${formatCurrency(matchingItem.prize)}</div>
            <span>
             quantity: <span>${cartItem.quantity}</span>
            </span>
            <span class="update-span">
             update <span class="delete-link js-delete-link" 
             data-fruids-id="${matchingItem.id}">delete</span>
        </div>
    </div>
     `;
});

// Function to update delivery options for each item in the cart
// This function generates HTML for delivery options based on the cart and delivery options data

function deliveryOptionsHTML(matchingItem, cartItem) {
    let deliveryOptionsHTML = '';


    deliveryOptions.forEach((option) => {
        const deliveryDays = option.deliveryDays;
        const deliveryDateString = dayjs().add(deliveryDays, 'day').format('dddd, MMMM D');
        const prizeCents = option.prizeCents;
        const formatedPrizeCents = formatCurrency(prizeCents);
        const prizeCentsString = option.prizeCents === 0 ? '-FREE' : formatedPrizeCents
        // Generate HTML for each delivery option
        // This includes a radio button for selecting the delivery option
        // and a label displaying the delivery date and price
        // The radio button is grouped by the item's ID to ensure each item has its own set
        // of delivery options.
        // The label displays the delivery date and price in a user-friendly format.
        const ischecked = option.deliveryOptionsId === cartItem.deliveryId;

        /*console.log(typeof option.deliveryOptionsId, option.deliveryOptionsId);
        console.log(typeof cartItem.deliveryId, cartItem.deliveryId);*/

        deliveryOptionsHTML += `
            <div class="delivery-option js-delivery-option" data-fruids-id="${matchingItem.id}" 
            data-option-delivery-option-id="${option.deliveryOptionsId}" >
                <input type="radio" ${ischecked ? 'checked' : ''}  name="delivery-${matchingItem.id}" 
                value="${option.id}" id="delivery-${matchingItem.id}-${option.id}">
                <label for="delivery-${matchingItem.id}-${option.id}">
                    ${matchingItem.name} - ${deliveryDateString} - R${prizeCentsString}
                </label>
            </div>
        `;

    });
    return `
        <div class="class="js-main-container-${matchingItem.id}">
            <h3>Delivery Options for ${matchingItem.name}</h3>
            <div>Choose a delivery option:</div>
            ${deliveryOptionsHTML}
        </div>
    `;
}



document.querySelector('.js-cart-summary').innerHTML = cartSummaryHTML;

document.querySelectorAll('.js-delete-link')
        .forEach((link) => {
            link.addEventListener('click', () => {
                const fruidsId = link.dataset.fruidsId;
                removeFromCart(fruidsId);
                renderPaymentSummary();
               const container = document.querySelector(`.js-main-container-${fruidsId}`);
               container.remove();
               updatePayments();
            })
        });

const a = document.querySelectorAll('.js-delivery-option')
        a.forEach((option) => {
            option.addEventListener('click', () => {
                console.log('clicked delivery option');
                const fruidsId = option.dataset.fruidsId;
                const selectedDeliveryOptionId = option.dataset.optionDeliveryOptionId;
                console.log(fruidsId);
                console.log(selectedDeliveryOptionId);
                auditTheCart(fruidsId, selectedDeliveryOptionId);
                renderCheckout();
                updatePayments();
            });
        });
};
renderCheckout();


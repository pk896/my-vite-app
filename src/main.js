import dayjs from "dayjs";
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { fruidsData } from "./data/vite-fruidsData";
import { formatCurrency } from "./utils/vite-money";
import { cart, addToCart, getcartQuantity } from "./data/vite-cart";



let fruidsDataHTML ='';

fruidsData.forEach((fruids) => {
    fruidsDataHTML += `
        <div>
            <img src="${fruids.Image}" alt="nice apple image" 
            style="width : 150px;">
            <div>product ${fruids.name}</div>

            <div>color ${fruids.color}</div>

            <div>size ${fruids.size}</div>

            <div>prize R${formatCurrency(fruids.prize)}</div>
            <button class="js-add-to-cart add-to-cart" data-fruids-id="${fruids.id}"
            >add to cart</button>
        </div>
     `;
});


document.querySelector('.js-grid-products-container')
    .innerHTML = fruidsDataHTML;

function displayCartQuantity() {

    //const cartQuantity = _.sumBy(cart, 'quantity');
     let cartQuantity = getcartQuantity();

   /* cart.forEach((item) => {
        cartQuantity += item.quantity;
    });*/

    document.querySelector('.js-cart-quantity').innerHTML = `[${cartQuantity}]`;            
};

document.querySelector('.js-cart').addEventListener('click', () => {
    console.log('hello')
})

document.querySelectorAll('.js-add-to-cart').forEach((button) => {
        button.addEventListener('click', () =>{
            const fruidsId = button.dataset.fruidsId;
            addToCart(fruidsId);
            displayCartQuantity();
            });   
        });

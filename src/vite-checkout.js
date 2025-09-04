import { renderCheckout } from './checkout/order-sumary.js';
import { updatePayments } from './checkout/payment-summary.js';

renderCheckout();
updatePayments();





fetch('https://api.open-meteo.com/v1/forecast?latitude=46.9481&longitude=7.4474&current=temperature_2m,relative_humidity_2m,rain,weather_code')
        .then((response) => response.json())
        .then((data) => {                       
                console.log(data);
           document.querySelector('.js-weather').innerHTML = `
           <h2>Weather in Bern</h2>
           <p>Temperature: ${data.current.temperature_2m}°C</p>
           <p>Humidity: ${data.current.relative_humidity_2m}%</p>
           <p>Rain: ${data.current.rain}mm</p>
           <p>${data.current.time}</p>`
        });
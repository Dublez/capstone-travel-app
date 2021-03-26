import './styles/base.scss';
import './styles/header.scss';
import './styles/facts.scss';
import './styles/image.scss';
import './styles/hourly-carousel.scss';
import './styles/nav.scss';
import './styles/daily-carousel.scss';
import {onSubmit, onClick, onLoad} from './js/app.js';


function importAll(r) {
    return r.keys().map(r);
}
const images = importAll(require.context('./media/', false, /\.(png|gif|jpe?g|svg)$/));

// Event listeners to add function to existing HTML DOM elements
document.querySelector('#submitButton').addEventListener('click',onSubmit);
document.querySelectorAll('.forecast_day').forEach(item => item.addEventListener('click', onClick));
window.addEventListener('load', onLoad);

// Adding limits to datePicker
let dtElem = document.getElementById('date');
let minDate = new Date();
let maxDate = new Date();
maxDate.setDate(minDate.getDate() + 14);

dtElem.min = formatDate(minDate);
dtElem.max = formatDate(maxDate);

function formatDate(date) {
  let dd = String(date.getDate()).padStart(2, '0');
  let mm = String(date.getMonth() + 1).padStart(2, '0');
  let yyyy = date.getFullYear();
  return `${yyyy}-${mm}-${dd}`;
}

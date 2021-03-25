import './styles/base.scss';
import './styles/header.scss';
import './styles/facts.scss';
import './styles/image.scss';
import './styles/hourly-carousel.scss';
import './styles/nav.scss';
import './styles/daily-carousel.scss';
import {time_offset, onSubmit} from './js/app.js';
import {Carousel} from './js/carousel.js';

function importAll(r) {
    return r.keys().map(r);
}
const images = importAll(require.context('./media/', false, /\.(png|gif|jpe?g|svg)$/));

// Event listener to add function to existing HTML DOM element
document.querySelector('#submitButton').addEventListener('click',onSubmit);

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

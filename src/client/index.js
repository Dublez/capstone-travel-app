import './styles/styles.css';
import {onGenerate} from './js/app.js';

// Event listener to add function to existing HTML DOM element
document.querySelector('#generate').addEventListener('click',onGenerate);
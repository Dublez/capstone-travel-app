import './styles/styles.scss';
import {onGenerate} from './js/app.js';
// import './media/termometr.png';
function importAll(r) {
    return r.keys().map(r);
}
const images = importAll(require.context('./media/', false, /\.(png|gif|jpe?g|svg)$/));

// Event listener to add function to existing HTML DOM element
document.querySelector('#generate').addEventListener('click',onGenerate);
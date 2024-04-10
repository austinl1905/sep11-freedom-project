import { Atom, QuantumAtomManager, BohrAtomManager } from './src/Components.js';
import { App } from './src/App.js';

let triviaText = document.getElementById('triviaText');
let triviaPool = ['In reality, over 99.9% of an atom is empty space!', 'Fluorine is the most electronegative atom!', "Francium has the largest atomic radius of any element!", 'The most recently discovered atom is Tennessine!'];
triviaText.innerHTML = triviaPool[ Math.floor(Math.random() * triviaPool.length) ];

let manager = new BohrAtomManager( new Atom('Helium', 2, 4, '1s2 2s2', true) );

let app = new App( manager );
app.initScene();

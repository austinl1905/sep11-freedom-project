import { Atom, QuantumAtomManager, BohrAtomManager } from './src/Components.js';
import { App } from './src/App.js';

let triviaText = document.getElementById('triviaText');
let triviaPool = ['In reality, over 99.9% of an atom is empty space!', 'Fluorine is the most electronegative atom!', "Francium has the largest atomic radius of any element!", 'The most recently discovered atom is Tennessine!'];
triviaText.innerHTML = triviaPool[ Math.floor(Math.random() * triviaPool.length) ];

// let manager = new BohrAtomManager( new Atom('Helium', 2, 4, '1s2 2s2', true) );
let manager = new BohrAtomManager( new Atom( 'Uranium', 118, 294, '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14 6d10 7p6', true ) );

let app = new App( manager );
app.initScene();

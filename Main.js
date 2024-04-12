import { Atom, QuantumAtomManager, BohrAtomManager } from './src/Components.js';
import { App } from './src/App.js';

let triviaText = document.getElementById('triviaText');
let triviaPool = ['Iron is the most abundant metal in the universe!', 'Nonmetals in the third period and below can have an expanded octet!', 'Bismuth has the longest half-life of any radioactive element!', 'Manganese has 7 oxidation states!', 'Lead is the heaviest stable element!', "Hydrogen with a single neutron is called Deuterium!", 'In reality, over 99.9% of an atom is empty space!', 'Fluorine is the most electronegative atom!', "Francium has the largest atomic radius of any element!", 'The most recently discovered atom is Tennessine!'];
triviaText.innerHTML = triviaPool[ Math.floor(Math.random() * triviaPool.length) ];

let manager = new BohrAtomManager( new Atom( 'Helium', 2, 4, '1s2 2s2', true, true ) );

let app = new App( manager );
app.initScene();

export { triviaText, triviaPool };
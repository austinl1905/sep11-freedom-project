import { Atom, QuantumAtomManager, BohrAtomManager } from './src/Components.js';
import { App } from './src/App.js';

let manager = new BohrAtomManager( new Atom( 'Helium', 2, 4, 'He', '1s2 2s2', true, true ) );

let app = new App( manager );
app.initScene();
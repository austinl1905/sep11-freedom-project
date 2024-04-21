import * as CANNON from 'cannon-es';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Atom, QuantumAtomManager, BohrAtomManager } from './Components.js';
import { ATOMS } from './Info.js';
import Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';

let triviaText = document.getElementById('triviaText');
let triviaPool = ['Iron is the most abundant metal in the universe!', 'Nonmetals in the third period and below can have an expanded octet!', 'Bismuth has the longest half-life of any radioactive element!', 'Manganese has 7 oxidation states!', 'Lead is the heaviest stable element!', "Hydrogen with a single neutron is called Deuterium!", 'In reality, over 99.9% of an atom is empty space!', 'Fluorine is the most electronegative atom!', "Francium has the largest atomic radius of any element!", 'The most recently discovered atom is Tennessine!'];
triviaText.innerHTML = triviaPool[ Math.floor(Math.random() * triviaPool.length ) ];

let atomDiv = document.createElement( 'div' );
let atomNumDiv = document.createElement( 'div' );
let atomMassDiv = document.createElement( 'div' );
let labels = [ atomDiv, atomNumDiv, atomMassDiv ];

for (let i = 0; i < labels.length; i++)
{   labels[i].classList.add('label');
    labels[i].classList.add('noDisplay');
    if ( i > 0 )
    {   labels[i].style.fontSize = '18px';   }
}

class App
{   constructor( manager )
    {   this.scene = new THREE.Scene();
        this.root = new THREE.Group();
        this.world = new CANNON.World( 0, 0, 0 );
        this.renderer = new THREE.WebGLRenderer( { antialias: true } );
        this.labelRenderer = new CSS2DRenderer();
        this.camera = new THREE.PerspectiveCamera
        (   45, window.innerWidth / window.innerHeight, 1, 1000   );
        this.controls = new OrbitControls( this.camera, this.labelRenderer.domElement );
        this.pointer = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();
        this.onWindowResize = this.onWindowResize.bind( this );
        this.animate = this.animate.bind( this );
        this.onPointerMove = this.onPointerMove.bind( this );
        this.manager = manager;
        this.intersectedObject;
        this.stats = new Stats();
    }

    onPointerMove( event )
    {   this.pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        this.pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

        this.raycaster.setFromCamera( this.pointer, this.camera );
        let intersects = this.raycaster.intersectObject(this.scene, true);

        // Highlights intersected objects

        if (this.intersectedObject) { // Check if value of intersectedObject is not null
            this.intersectedObject.material = this.intersectedObject.originalMaterial;
            this.intersectedObject = null;
        }

        if (intersects.length > 0)
        {   let intersectedObject = intersects[0].object;
            intersectedObject.originalMaterial = intersectedObject.material.clone();
            intersectedObject.material = new THREE.MeshBasicMaterial
            (   {   opacity: 0.7,
                    transparent: true,
                    color: 0xffffff
                }
            );
            this.intersectedObject = intersectedObject;
        }
    }

    onWindowResize()
    {   this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.labelRenderer.setSize(window.innerWidth, window.innerHeight );
    }

    animate()
    {   requestAnimationFrame( this.animate );
        this.stats.begin();
        if (this.manager.allBodiesStatic == true) // Display loading screen if the model is not static
        {   document.querySelector('#loadingScreen').style.display = 'none';
            for (let i = 0; i < labels.length; i++)
            {   labels[i].classList.remove('noDisplay');   }
        }
        else
        {   document.querySelector('#loadingScreen').style.display = 'flex';
            for (let i = 0; i < labels.length; i++)
            {   labels[i].classList.add('noDisplay');   }
        }
        this.renderer.render( this.scene, this.camera );
        this.labelRenderer.render( this.scene, this.camera );
        this.manager.controlElectronMovement();
        this.manager.controlNucleonMovement();
        this.world.step( 1 / 60 );
        this.controls.update;
        this.stats.end();
    }

    initScene()
    {   this.scene.add( this.root );

        this.camera.position.z = this.manager.atom.bohrElectronShells[this.manager.atom.bohrElectronShells.length - 1].radius + 30;
        this.camera.position.y = 10;
        this.camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );

        atomDiv.textContent = `${this.manager.atom.name} (${this.manager.atom.atomicSymbol})`;
        atomNumDiv.textContent = `Atomic Number: ${this.manager.atom.atomicNum}`;
        atomMassDiv.textContent = `Isotope: ${this.manager.atom.atomicSymbol}-${this.manager.atom.atomicMass}`;

        let atomLabel = new CSS2DObject( atomDiv );
        let atomNumLabel = new CSS2DObject( atomNumDiv );
        let atomMassLabel = new CSS2DObject( atomMassDiv );

        atomLabel.position.set( 0, this.manager.atom.bohrElectronShells[0].radius + this.manager.atom.atomicNum / 20, 0 );
        atomNumLabel.position.set( 0, this.manager.atom.bohrElectronShells[0].radius + ( this.manager.atom.atomicNum / 20 ) - 3, 0 );
        atomMassLabel.position.set( 0, this.manager.atom.bohrElectronShells[0].radius + ( this.manager.atom.atomicNum / 20 ) - 6, 0 );

        this.root.add( atomLabel );
        this.root.add( atomNumLabel );
        this.root.add( atomMassLabel );

        atomLabel.layers.set( 0 );
        atomNumLabel.layers.set( 0 );
        atomMassLabel.layers.set( 0 );

        this.controls.minDistance = 15;
        this.controls.maxDistance = this.manager.atom.bohrElectronShells[this.manager.atom.bohrElectronShells.length - 1].radius + 75;
        this.controls.enablePan = false;

        this.renderer.setSize( window.innerWidth, window.innerHeight );

        let container = document.getElementById('canvas');
        document.body.appendChild( container );
        container.appendChild( this.renderer.domElement );
        window.addEventListener( 'resize', this.onWindowResize, false );
        window.addEventListener( 'pointermove', this.onPointerMove );

        this.labelRenderer.setSize(window.innerWidth, window.innerHeight );
        this.labelRenderer.domElement.style.position = 'absolute';
        this.labelRenderer.domElement.style.top = '0px';
        document.body.appendChild( this.labelRenderer.domElement );

	    document.body.appendChild( this.stats.dom );

        const ambientLight = new THREE.AmbientLight( 0xffffff , 0.2 );
		this.root.add( ambientLight );

        const spotLight = new THREE.SpotLight( 0xffffff,  1500 );
        spotLight.position.set( 10, 25, 0 );
        spotLight.angle = Math.PI * Math.pow( 10, -1 );
        spotLight.penumbra = 1;
        spotLight.decay = 2;
	    spotLight.distance = 0;
        this.root.add( spotLight );

        // const spotLightHelper = new THREE.SpotLightHelper( spotLight );
        // this.scene.add( spotLightHelper );

        this.scene.background = new THREE.Color( 0x111111 );

        // Temporary GUI
        let gui = new GUI();

        // Default selection for atom model on page load
        let selection =
        {   atom: 'Helium',
            rotate: true
        };

        let atomFolder = gui.addFolder('Atom');
        atomFolder.add( selection, 'atom');
        let rotateFolder = gui.addFolder('Rotate');
        rotateFolder.add( selection, 'rotate', [true, false] );
        atomFolder.open();

        atomFolder.onFinishChange
        (   ( target ) =>
            {   let targetValue = target.value.toLowerCase();
                let processedValue = targetValue.charAt(0).toUpperCase() + targetValue.slice(1);
                this.manager.resetAtom
                (   this.root,
                    this.world,
                    new Atom
                    (
                        ATOMS[processedValue].name, // Element Name
                        ATOMS[processedValue].atomicNum, // Atomic Number
                        ATOMS[processedValue].atomicMass, // Atomic Mass
                        ATOMS[processedValue].atomicSymbol, // Atomic Symbol
                        ATOMS[processedValue].electronConfig, // Electron Configuration
                        rotateFolder.controllers[0].object.rotate // Rotate boolean
                    )
                )

                this.camera.position.z = this.manager.atom.bohrElectronShells[this.manager.atom.bohrElectronShells.length - 1].radius + 30;
                this.controls.maxDistance = this.manager.atom.bohrElectronShells[this.manager.atom.bohrElectronShells.length - 1].radius + 75;
                this.camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );

                atomDiv.textContent = `${this.manager.atom.name} (${this.manager.atom.atomicSymbol})`;
                atomNumDiv.textContent = `Atomic Number: ${this.manager.atom.atomicNum}`;
                atomMassDiv.textContent = `Isotope: ${this.manager.atom.atomicSymbol}-${this.manager.atom.atomicMass}`;

                atomLabel.position.set( 0, this.manager.atom.bohrElectronShells[0].radius + this.manager.atom.atomicNum / 20, 0 );
                atomNumLabel.position.set( 0, this.manager.atom.bohrElectronShells[0].radius + ( this.manager.atom.atomicNum / 20 ) - 3, 0 );
                atomMassLabel.position.set( 0, this.manager.atom.bohrElectronShells[0].radius + ( this.manager.atom.atomicNum / 20 ) - 6, 0 );

                triviaText.innerHTML = triviaPool[ Math.floor(Math.random() * triviaPool.length) ];
            }
        )

        rotateFolder.onChange
        (   ( target ) =>
            {   this.manager.atom.rotateEnabled = target.value;   }
        )

        this.manager.createNucleus( this.root, this.world );
        this.manager.createElectrons( this.root, this.world );

        this.animate();
    }
}

export { App };
import * as CANNON from 'cannon-es';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Atom, QuantumAtomManager, BohrAtomManager } from './Components.js';
import Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { triviaText, triviaPool } from './../Main.js';

class App
{   constructor( manager )
    {   this.scene = new THREE.Scene();
        this.world = new CANNON.World( 0, 0, 0 );
        this.renderer = new THREE.WebGLRenderer( { antialias: true } );
        this.camera = new THREE.PerspectiveCamera
        (   45, window.innerWidth / window.innerHeight, 1, 1000   );
        this.controls = new OrbitControls( this.camera, this.renderer.domElement );
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
    }

    animate()
    {   requestAnimationFrame( this.animate );
        this.stats.begin();
        if (this.manager.allBodiesStatic == true)
        {   document.querySelector('#loadingScreen').style.display = 'none';   }
        else
        {   document.querySelector('#loadingScreen').style.display = 'flex';   }
        this.renderer.render( this.scene, this.camera );
        this.manager.controlElectronMovement();
        this.manager.controlNucleonMovement();
        this.world.step( 1 / 60 );
        this.controls.update;
        this.stats.end();
    }

    initScene()
    {   this.camera.position.z = this.manager.atom.bohrElectronShells[this.manager.atom.bohrElectronShells.length - 1].radius + 30;
        this.camera.position.y = 10;
        this.camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );

        // const axesHelper = new THREE.AxesHelper( 12 );
        // this.scene.add( axesHelper );

        this.controls.minDistance = 15;
        this.controls.maxDistance = this.manager.atom.bohrElectronShells[this.manager.atom.bohrElectronShells.length - 1].radius + 75;
        this.controls.enablePan = false;

        this.renderer.setSize( window.innerWidth, window.innerHeight );
        let container = document.getElementById('canvas');
        document.body.appendChild( container );
        container.appendChild( this.renderer.domElement );
        window.addEventListener( 'resize', this.onWindowResize, false );
        window.addEventListener( 'pointermove', this.onPointerMove );

	    document.body.appendChild( this.stats.dom );

        const ambientLight = new THREE.AmbientLight( 0xffffff , 0.2 );
		this.scene.add( ambientLight );

        const spotLight = new THREE.SpotLight( 0xffffff,  1500 );
        spotLight.position.set( 10, 25, 0 );
        spotLight.angle = Math.PI * Math.pow( 10, -1 );
        spotLight.penumbra = 1;
        spotLight.decay = 2;
	    spotLight.distance = 0;
        this.scene.add( spotLight );

        // const spotLightHelper = new THREE.SpotLightHelper( spotLight );
        // this.scene.add( spotLightHelper );

        this.scene.background = new THREE.Color( 0x111111 );

        // Temporary GUI
        let gui = new GUI();

        let selection =
        {   atom: 'Helium',
            rotate: true
        };

        let atomFolder = gui.addFolder('Atom');
        atomFolder.add( selection, 'atom', ['Helium', 'Copper', 'Iodine', 'Uranium', 'Oganesson'] );
        let rotateFolder = gui.addFolder('Rotate');
        rotateFolder.add( selection, 'rotate', [true, false] );
        atomFolder.open();

        atomFolder.onChange
        (   ( target ) =>
            {   if ( target.value == 'Helium' )
                {   this.manager.resetAtom( this.scene, this.world, new Atom('Helium', 2, 4, '1s2 2s2', rotateFolder.controllers[0].object.rotate ) );   }
                else if ( target.value == 'Copper' )
                {   this.manager.resetAtom( this.scene, this.world, new Atom('Copper', 29, 64, '1s2 2s2 2p6 3s2 3p6 4s1 3d10', rotateFolder.controllers[0].object.rotate ) );   }
                else if ( target.value == 'Iodine' )
                {   this.manager.resetAtom( this.scene, this.world, new Atom('Iodine', 53, 127, '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p5', rotateFolder.controllers[0].object.rotate ) );   }
                else if ( target.value == 'Uranium' )
                {   this.manager.resetAtom( this.scene, this.world, new Atom('Uranium', 92, 238, '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f3 6d1', rotateFolder.controllers[0].object.rotate ) );   }
                else if ( target.value == 'Oganesson' )
                {   this.manager.resetAtom( this.scene, this.world, new Atom('Oganesson', 118, 294, '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14 6d10 7p6', rotateFolder.controllers[0].object.rotate ) );   }

                this.camera.position.z = this.manager.atom.bohrElectronShells[this.manager.atom.bohrElectronShells.length - 1].radius + 30;
                this.controls.maxDistance = this.manager.atom.bohrElectronShells[this.manager.atom.bohrElectronShells.length - 1].radius + 75;
                this.camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );
                triviaText.innerHTML = triviaPool[ Math.floor(Math.random() * triviaPool.length) ];
            }
        )

        rotateFolder.onChange
        (   ( target ) =>
            {   this.manager.atom.rotateEnabled = target.value;   }
        )

        this.manager.createNucleus( this.scene, this.world );
        this.manager.createElectrons( this.scene, this.world );

        this.animate();
    }
}

export { App };
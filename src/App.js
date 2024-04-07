import * as CANNON from 'cannon-es';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Atom, QuantumAtomManager, BohrAtomManager } from './Components.js'

// let manager = new AtomManager( new Atom('Helium', 2, 4, '1s2 2s2') );
let manager = new BohrAtomManager( new Atom( 'Uranium', 92, 238, '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f3 6d1', true ) );

class App
{   constructor()
    {   this.scene = new THREE.Scene();
        this.world = new CANNON.World( 0, 0, 0 );
        this.renderer = new THREE.WebGLRenderer();
        this.camera =
        new THREE.PerspectiveCamera
        (   45, window.innerWidth / window.innerHeight, 1, 1000   );
        this.controls = new OrbitControls( this.camera, this.renderer.domElement );
        this.onWindowResize = this.onWindowResize.bind( this );
        this.animate = this.animate.bind( this );
    }

    onWindowResize()
    {   this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
    }

    animate()
    {   requestAnimationFrame( this.animate );
        this.renderer.render( this.scene, this.camera );
        if (manager.atom.rotate == true)
        {   manager.initiateBohrElectronRotation();   }
        manager.copyNucleons();
        manager.pullOrigin();
        this.world.step( 1 / 60 );
        this.controls.update;
    }

    init()
    {   this.camera.position.z = manager.atom.bohrElectronShells[manager.atom.bohrElectronShells.length - 1].radius + 30;
        this.camera.position.y = 10;
        this.camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );

        // const axesHelper = new THREE.AxesHelper( 12 );
        // this.scene.add( axesHelper );
        this.controls.minDistance = 15;
        this.controls.maxDistance = manager.atom.bohrElectronShells[manager.atom.bohrElectronShells.length - 1].radius + 75;
        this.controls.enablePan = false;
        // console.log(this.controls);

        this.renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( this.renderer.domElement );
        window.addEventListener( 'resize', this.onWindowResize, false );

        const ambientLight = new THREE.AmbientLight( 0xffffff , 0.05 );
		this.scene.add( ambientLight );

        const spotLight = new THREE.SpotLight( 0xffffff,  500 );
        spotLight.position.set( 10, 20, 15 );
        spotLight.angle = Math.PI * Math.pow( 10, -1 );
        spotLight.penumbra = 1;
        spotLight.decay = 2;
	    spotLight.distance = 0;
        this.scene.add( spotLight );

        // const spotLightHelper = new THREE.SpotLightHelper( spotLight );
        // this.scene.add( spotLightHelper );

        this.scene.background = new THREE.Color( 0x333333 );
        // this.scene.background = new THREE.Color( 0xffffff );
        // this.scene.background = new THREE.Color( 0x000000 );

        manager.createNucleus( this.scene, this.world );
        manager.createBohrElectrons( this.scene, this.world );

        this.animate();
    }
}

let app = new App();
app.init();

javascript:
(   function()
    {   var script = document.createElement('script');
        script.onload = function()
            {   var stats = new Stats();
                document.body.appendChild(stats.dom);
                requestAnimationFrame
                (   function loop()
                    {   stats.update();
                        requestAnimationFrame(loop)
                    }
                );
            };
        script.src='https://mrdoob.github.io/stats.js/build/stats.min.js';
        document.head.appendChild(script);
    }
)()
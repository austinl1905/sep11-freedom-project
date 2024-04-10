import * as CANNON from 'cannon-es';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Atom, QuantumAtomManager, BohrAtomManager } from './Components.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { SobelOperatorShader } from 'three/addons/shaders/SobelOperatorShader.js';

// let manager = new BohrAtomManager( new Atom('Helium', 2, 4, '1s2 2s2') );
let manager = new BohrAtomManager( new Atom( 'Uranium', 92, 238, '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f3 6d1', true ) );

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
        if (this.manager.frameCount > 60)
        {   document.querySelector('#loadingScreen').style.display = 'none';   }
        this.renderer.render( this.scene, this.camera );
        this.manager.controlElectronMovement();
        this.manager.controlNucleonMovement();
        this.world.step( 1 / 60 );
        this.controls.update;
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

        this.manager.createNucleus( this.scene, this.world );
        this.manager.createElectrons( this.scene, this.world );

        this.animate();
    }
}

let app = new App( manager );
app.initScene();

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
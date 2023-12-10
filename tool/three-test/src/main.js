import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

class App
{
    constructor()
    {
        this.camera = new THREE.PerspectiveCamera(
             45, window.innerWidth / window.innerHeight, 1, 1000
        );
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer();
        this.onWindowResize = this.onWindowResize.bind(this);
    }

    init()
    {
        this.camera.position.z = 10;

        this.renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( this.renderer.domElement );

        const geometry = new THREE.SphereGeometry(1, 64, 64);
        const material = new THREE.MeshPhongMaterial
        (
            {color: 0xff0032},
			{emissive: 0x072534},
			{side: THREE.DoubleSide},
			{flatShading: false},
        );
        const sphere = new THREE.Mesh( geometry, material );
        this.scene.add( sphere );
        this.scene.background = new THREE.Color( 0x333333 );

        window.addEventListener( 'resize', this.onWindowResize, false );

        const controls = new OrbitControls( this.camera, this.renderer.domElement );

        this.initLight();
        animate();
    }

    initLight()
	{
		// const lights = [];

		// for (let i = 0; i < 3; i ++)
		// {
		// 	lights.push( new THREE.DirectionalLight( 0xffffff, 0.75 ) );
		// }
		// 	lights[ 0 ].position.set( 0, 200, 0 );
		// 	lights[ 1 ].position.set( 100, 200, 100 );
		// 	lights[ 2 ].position.set( - 100, - 200, - 100 );

		// for (let i = 0; i < lights.length; i++)
		// {
		// 	this.scene.add(lights[i]);
		// }

        const spotLight = new THREE.SpotLight( 0xffffff, 10, 0, Math.pi);
        spotLight.position.set(2, 3.5, 0)
        this.scene.add(spotLight);

		const ambientLight = new THREE.AmbientLight( 0xffffff , 0.75 );
		this.scene.add( ambientLight );
	}

    onWindowResize()
    {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

function animate()
{

	requestAnimationFrame( animate );
	app.renderer.render( app.scene, app.camera );
}

const app = new App();
app.init();
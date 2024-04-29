import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

class App
{
    constructor()
    {
        this.camera = new THREE.PerspectiveCamera
        (
             45, window.innerWidth / window.innerHeight, 1, 1000
        );
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer();
        this.onWindowResize = this.onWindowResize.bind(this);
        this.animate = this.animate.bind(this);
    }

    init()
    {
        this.camera.position.z = 25;
        this.camera.position.y = 5;
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));

        this.renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( this.renderer.domElement );

        this.scene.background = new THREE.Color( 0x333333 );

        let placeholderGeometry = new THREE.SphereGeometry( 5, 32, 32 );
        let placeholderMaterial = new THREE.MeshBasicMaterial
        (   {   color: 0xff0000,
                side: THREE.DoubleSide,
                wireframe: true,
            }
        )
        let placeholderMesh = new THREE.Mesh( placeholderGeometry, placeholderMaterial );

        this.scene.add( placeholderMesh );

        window.addEventListener( 'resize', this.onWindowResize, false );

        const controls = new OrbitControls( this.camera, this.renderer.domElement );

        this.initLight();
        this.animate();
    }

    initLight()
	{   const spotLight = new THREE.SpotLight( 0xffffff, 15, 0, Math.PI);
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

    animate() {

        requestAnimationFrame(this.animate);
        this.renderer.render(this.scene, this.camera);
    }
}

const app = new App();
app.init();
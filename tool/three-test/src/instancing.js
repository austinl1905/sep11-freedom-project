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

    getSphericalCoordinates(radius, polar, azimuthal)
    {
        const x = radius * Math.sin(polar) * Math.cos(azimuthal);
        const y = radius * Math.sin(polar) * Math.sin(azimuthal);
        const z = radius * Math.cos(polar);
        return new THREE.Vector3(x, y, z);
    }

    init()
    {
        this.camera.position.z = 25;
        this.camera.position.y = 5;
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));

        this.renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( this.renderer.domElement );

        this.scene.background = new THREE.Color( 0x333333 );

        const material = new THREE.MeshLambertMaterial
        (
			{side: THREE.DoubleSide},
			{flatShading: false},
        )

        const radius = 5;
        const smallSphereRadius = 1;
        const numSpheres = 20;

        const geometry = new THREE.SphereGeometry(radius, 64, 64);
        const instancedGeometry = new THREE.SphereGeometry(smallSphereRadius, 64, 64);

        const instancedMesh = new THREE.InstancedMesh(instancedGeometry, material, numSpheres);

        this.scene.add(instancedMesh);


        window.addEventListener( 'resize', this.onWindowResize, false );

        const controls = new OrbitControls( this.camera, this.renderer.domElement );

        this.initLight();
        this.animate();
    }

    initLight()
	{

        // const spotLight = new THREE.SpotLight( 0xffffff, 15, 0, Math.PI);
        // spotLight.position.set(2, 3.5, 0)
        // this.scene.add(spotLight);

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

javascript:(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='https://mrdoob.github.io/stats.js/build/stats.min.js';document.head.appendChild(script);})()
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as CANNON from 'cannon-es';

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
        this.torusRadii = new Map
        (
            [
                ['sub1', 10],
                ['sub2', 15],
                ['sub3', 20]
            ]
        );
        this.particleSizes = new Map
        (
            [
                ['electron', 0.075],
                ['nucleon', 1]
            ]
        );
        this.particleSpeeds = new Map
        (
            [
                ['electron', 0.5],
            ]
        );

        this.electrons1
        this.electrons2;

    }

    init()
    {
        this.camera.position.z = 25;
        this.camera.position.y = 5;
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));

        this.renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( this.renderer.domElement );

        const nucleonGeometry = new THREE.SphereGeometry(this.particleSizes.get('nucleon'), 64, 64);
        const electronGeometry = new THREE.SphereGeometry(this.particleSizes.get('electron'), 64, 64);
        const protonMaterial = new THREE.MeshLambertMaterial
        (
            {color: 0xff0032},
			{emissive: 0x072534},
			{side: THREE.DoubleSide},
			{flatShading: false},
        );
        const neutronMaterial = new THREE.MeshLambertMaterial
        (
            {color: 0x0032ff},
            {emissive: 0x072534},
			{side: THREE.DoubleSide},
			{flatShading: false},
        )
        const electronMaterial = new THREE.MeshBasicMaterial
        (
            {color: 0x37ff37}
        );
        const proton1 = new THREE.Mesh( nucleonGeometry, protonMaterial );
        const neutron1 = new THREE.Mesh( nucleonGeometry, neutronMaterial );

        const shell1Geometry = new THREE.TorusGeometry(
            this.torusRadii.get('sub1'),
            0.025,
        )
        const shell2Geometry = new THREE.TorusGeometry(
            this.torusRadii.get('sub2'),
            0.025
        )
        const shellMaterial = new THREE.MeshBasicMaterial();
        const torus1 = new THREE.Mesh( shell1Geometry, shellMaterial );
        const torus2 = new THREE.Mesh( shell2Geometry, shellMaterial );

        this.electrons1 = new THREE.Group();
        for (let i = 0; i < 2; i++)
        {
            const electron = new THREE.Mesh( electronGeometry, electronMaterial);
            // Calculate the angle for the electron's position in polar coordinates
            let angle = (i / 2) * Math.PI * 2;
            // Calculate the X and Z coordinates for the electron's position based on the angle
            let orbitX = Math.cos(angle) * this.torusRadii.get('sub1');
            let orbitZ = Math.sin(angle) * this.torusRadii.get('sub1');
            // Set the position of the electron in 3D space
            electron.position.set(orbitX, 0, orbitZ);
            this.electrons1.add(electron);
        }

        const shell1 = new THREE.Group();
        shell1.add(torus1, this.electrons1);
        this.electrons1.rotation.x += Math.PI / 2
        shell1.rotation.x += Math.PI / 2;

        this.electrons2 = new THREE.Group();
        for (let i = 0; i < 8; i++)
        {
            const electron = new THREE.Mesh( electronGeometry, electronMaterial);
            let angle = (i / 8) * Math.PI * 2;
            let orbitX = Math.cos(angle) * this.torusRadii.get('sub2');
            let orbitZ = Math.sin(angle) * this.torusRadii.get('sub2');
            electron.position.set(orbitX, 0, orbitZ);
            this.electrons2.add(electron);
        }

        const shell2 = new THREE.Group();
        shell2.add(torus2, this.electrons2);
        this.electrons2.rotation.x += Math.PI / 2;
        shell2.rotation.x += Math.PI / 2;

        const nucleus = new THREE.Group();
        nucleus.add(proton1);
        nucleus.add(neutron1);

        proton1.position.x -= 0.75;
        neutron1.position.x += 0.75;

        const atom = new THREE.Group();
        atom.add(nucleus, shell1, shell2);

        this.scene.add(atom);
        this.scene.background = new THREE.Color( 0x333333 );

        window.addEventListener( 'resize', this.onWindowResize, false );

        const controls = new OrbitControls( this.camera, this.renderer.domElement );

        this.initLight();
        this.animate();
    }

    initLight()
	{

        const spotLight = new THREE.SpotLight( 0xffffff, 15, 0, Math.PI);
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

        let time = Date.now() * 0.001;

        requestAnimationFrame(this.animate);
        this.renderer.render(this.scene, this.camera);

        this.electrons2.children.forEach((object, index) => {
            let angle = (index / 8) * Math.PI * 2;
            let orbitX = Math.cos(time * this.particleSpeeds.get('electron') + angle) * this.torusRadii.get('sub2');
            let orbitZ = Math.sin(time * this.particleSpeeds.get('electron') + angle) * this.torusRadii.get('sub2');

            object.position.set(orbitX, 0, orbitZ);
        });
        this.electrons1.children.forEach((object, index) => {
            let angle = (index / 2) * Math.PI * 2;
            let orbitX = Math.cos(time * this.particleSpeeds.get('electron') + angle) * this.torusRadii.get('sub1');
            let orbitZ = Math.sin(time * this.particleSpeeds.get('electron') + angle) * this.torusRadii.get('sub1');

            object.position.set(orbitX, 0, orbitZ);
        });

    }
}

const app = new App();
app.init();



import * as CANNON from 'cannon-es';
import * as THREE from 'three';
import CannonDebugger from 'cannon-es-debugger';
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
        this.pullOrigin = this.pullOrigin.bind(this);
        this.world = new CANNON.World
        (
            {
                gravity: new CANNON.Vec3(0, -9.82, 0), // m/s²
            }
        )
        this.sphereMesh;
        this.groundBody = new CANNON.Body
        (
            {
                type: CANNON.Body.STATIC,
                shape: new CANNON.Plane()
            }
        );
        this.sphereBody = new CANNON.Body
        (
            {
                mass: 5,
                shape: new CANNON.Sphere(1)
            }
        );
        this.cannonDebugger = new CannonDebugger(this.scene, this.world, {color:0xff0000})
    }

    pullOrigin(body){
        body.force.set(
            -body.position.x,
            -body.position.y,
            -body.position.z
        );
    }

    init()
    {

        this.camera.position.z = 25;
        this.camera.position.y = 5;
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));

        const axesHelper = new THREE.AxesHelper( 5 );
        this.scene.add( axesHelper );

        this.renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( this.renderer.domElement );

        this.scene.background = new THREE.Color( 0x333333 );

        window.addEventListener( 'resize', this.onWindowResize, false );

        const controls = new OrbitControls( this.camera, this.renderer.domElement );

        const radius = 1;
        const geometry = new THREE.SphereGeometry(radius);
        const material = new THREE.MeshNormalMaterial({color: 0xffffff, side: THREE.DoubleSide});
        this.sphereMesh = new THREE.Mesh(geometry, material);
        this.scene.add(this.sphereMesh);

        const planeGeometry = new THREE.PlaneGeometry(30, 30);
        const planeMesh = new THREE.Mesh(planeGeometry, material);
        planeMesh.rotation.x = Math.PI / 2;
        planeMesh.position.y -= 10;
        this.scene.add(planeMesh);

        this.groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
        this.groundBody.position.set(0, -10, 0)
        this.world.addBody(this.groundBody);

        this.world.addBody(this.sphereBody);

        this.initLight();
        this.animate();

        console.log(this.world.bodies);
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

        this.pullOrigin(this.sphereBody);
        this.sphereMesh.position.copy(this.sphereBody.position);
        this.sphereMesh.quaternion.copy(this.sphereBody.quaternion);
        requestAnimationFrame(this.animate);
        this.renderer.render(this.scene, this.camera);
        this.world.fixedStep();
        this.cannonDebugger.update();

    }
}

const app = new App();
app.init();
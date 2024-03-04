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
        this.world = new CANNON.World
        (
            {
                gravity: new CANNON.Vec3(0, 0, 0), // m/s²
            }
        )
        this.anchorProtonMesh;
        this.groundBody = new CANNON.Body
        (
            {
                type: CANNON.Body.STATIC,
                shape: new CANNON.Plane()
            }
        );
        this.anchorProtonBody = new CANNON.Body
        (
            {
                mass: 5,
                type: CANNON.Body.STATIC,
                shape: new CANNON.Sphere(1)
            }
        );
        // this.cannonDebugger = new CannonDebugger(this.scene, this.world, {color:0xff0000});
        this.sphereMeshes = [];
        this.sphereBodies = [];
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

        // const neutronTexture = new THREE.TextureLoader().load( "../img/ca39.png" );
        // const protonTexture = new THREE.TextureLoader().load( "../img/ca40.png" );
        // neutronTexture.wrapS = THREE.RepeatWrapping;
        // protonTexture.wrapS = THREE.RepeatWrapping;
        // neutronTexture.wrapT = THREE.RepeatWrapping;
        // protonTexture.wrapT = THREE.RepeatWrapping;
        // neutronTexture.repeat.set( 2, 1 );
        // protonTexture.repeat.set( 2, 1 );

        // const radius = 1;
        // const geometry = new THREE.SphereGeometry(radius);
        const material = new THREE.MeshNormalMaterial({color: 0xffffff, side: THREE.DoubleSide});
        const neutronMaterial = new THREE.MeshPhongMaterial({color: 0x0000ff, side: THREE.DoubleSide, shininess: 3, specular: 0xffffff, wireframe: true});
        // neutronMaterial.shininess = 100;
        // neutronMaterial.specular = 0xffffff;
        const protonMaterial = new THREE.MeshPhongMaterial({color: 0xff0000, side: THREE.DoubleSide, shininess: 3, specular: 0xffffff, wireframe: true});
        // protonMaterial.shininess = 100;
        // protonMaterial.specular = 0xffffff;
        // this.sphereMesh = new THREE.Mesh(geometry, material);
        // this.scene.add(this.sphereMesh);

        const planeGeometry = new THREE.PlaneGeometry(30, 30);
        const planeMesh = new THREE.Mesh(planeGeometry, material);
        planeMesh.rotation.x = Math.PI / 2;
        planeMesh.position.y -= 10;
        this.scene.add(planeMesh);

        this.anchorProtonMesh = new THREE.Mesh(new THREE.SphereGeometry(1), protonMaterial);
        this.scene.add(this.anchorProtonMesh);
        this.world.addBody(this.anchorProtonBody);

        this.groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
        this.groundBody.position.set(0, -10, 0)
        this.world.addBody(this.groundBody);

        // this.world.addBody(this.sphereBody);

        let nNucleons = 40;
        let nNeutrons = 22;

        for (let i = 0; i < nNucleons - 1; i++)
        {
            const sphereBody = new CANNON.Body
            (
                {
                    mass: 5,
                    shape: new CANNON.Sphere(1),
                    position: new CANNON.Vec3(Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5),
                    // position: new CANNON.Vec3(0, 0, 0)
                }
            );

            // sphereBody.addEventListener
            // ("collide", function()
            //     {
            //         sphereBody.type = CANNON.Body.STATIC;
            //     }
            // )

            let sphereMesh;

            if (i < nNeutrons)
            {
                sphereMesh = new THREE.Mesh(new THREE.SphereGeometry(1), neutronMaterial);
            }
            else
            {
                sphereMesh = new THREE.Mesh(new THREE.SphereGeometry(1), protonMaterial);
            }

            this.scene.add(sphereMesh);
            this.world.addBody(sphereBody);

            this.sphereMeshes.push(sphereMesh);
            this.sphereBodies.push(sphereBody);
        }

        this.initLight();
        this.animate();

    }

    initLight()
	{
		const ambientLight = new THREE.AmbientLight( 0xffffff , 0.05 );
		this.scene.add( ambientLight );

        const spotLight = new THREE.SpotLight(0xffffff,  500);
        spotLight.position.set( 10, 20, 15 );
        spotLight.angle = Math.PI * Math.pow(10, -1);
        spotLight.penumbra = 1;
        spotLight.decay = 2;
	    spotLight.distance = 0;
        this.scene.add( spotLight );

        const spotLightHelper = new THREE.SpotLightHelper( spotLight );
        this.scene.add( spotLightHelper );
        // console.log(Math.PI * Math.pow(10, -1));
	}

    onWindowResize()
    {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate()
    {
        this.anchorProtonMesh.position.copy(this.anchorProtonBody.position);
        this.anchorProtonMesh.quaternion.copy(this.anchorProtonBody.quaternion);

        for (let i = 0; i < this.sphereBodies.length; i++)
        {
            this.sphereMeshes[i].position.copy(this.sphereBodies[i].position);
            this.sphereMeshes[i].quaternion.copy(this.sphereBodies[i].quaternion);
            pullOrigin(this.sphereBodies[i]);
        }

        requestAnimationFrame(this.animate);
        this.renderer.render(this.scene, this.camera);
        this.world.fixedStep();
        // this.cannonDebugger.update();

    }
}

const app = new App();
app.init();

function pullOrigin(body)
{
    body.force.set
    (
        -body.position.x * 100,
        -body.position.y * 100,
        -body.position.z * 100
    );
}

javascript:(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='https://mrdoob.github.io/stats.js/build/stats.min.js';document.head.appendChild(script);})()
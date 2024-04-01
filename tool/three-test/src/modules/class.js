import * as CANNON from 'cannon-es';
import * as THREE from 'three';
import CannonDebugger from 'cannon-es-debugger';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// stupid debug function i got from chat gpt lollllllll
// function getMeshesByColor(color, scene) {
//     var meshes = [];
//     scene.traverse(function(node) {
//         if (node instanceof THREE.Mesh) {
//             if (node.material instanceof THREE.MeshBasicMaterial && node.material.color.equals(color)) {
//                 meshes.push(node);
//             }
//         }
//     });
//     return meshes;
// }

class Proton
{   constructor()
    {   this.mesh = new THREE.Mesh
        (   new THREE.SphereGeometry( 1, 32, 32 ),
            new THREE.MeshPhongMaterial
            (   {   color: 0xff0000,
                    side: THREE.DoubleSide,
                    shininess: 3,
                    specular: 0xffffff,
                    // wireframe: true
                }
            )
        );

        this.body = new CANNON.Body
        (   {   mass: 1,
                shape: new CANNON.Sphere( 1 ),
                position: new CANNON.Vec3( Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5 )
		    }
        );
        this.mesh.name = 'protonMesh';
        this.body.name = 'protonBody';
    }
}

class Neutron
{   constructor()
    {   this.mesh = new THREE.Mesh
        (   new THREE.SphereGeometry( 1, 32, 32 ),
            new THREE.MeshPhongMaterial
            (   {   color:  0x0000ff,
                    side: THREE.DoubleSide,
                    shininess: 3,
                    specular: 0xffffff,
                    // wireframe: true
                }
            ),
        );

        this.body = new CANNON.Body
        (   {   mass: 1,
                shape: new CANNON.Sphere( 1 ),
                position: new CANNON.Vec3( Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5 )
		    }
        );
        this.mesh.name = 'neutronMesh';
        this.body.name = 'neutronBody';
    }
}

class Electron
{   constructor()
    {   this.mesh = new THREE.Mesh
        (   new THREE.SphereGeometry( 0.2, 32, 32 ),
            new THREE.MeshBasicMaterial
            (   {   color: 0x37ff37   }   )
        )
    }
}

class ElectronShell
{   constructor(radius)
    {   this.radius = radius;
        this.mesh = new THREE.Mesh
        (   new THREE.TorusGeometry(this.radius, 0.05),
            new THREE.MeshBasicMaterial()
        )
    }
}

class Atom
{   constructor( name, atomicNum, atomicMass, electronConfigurationExtended )
    {   this.atomicNum = atomicNum;
        this.atomicMass = atomicMass;
        this.electronConfigurationExtended = electronConfigurationExtended; // Ex: '1s2 2s2 2p4'
        this.nucleons = this.initNucleus();
        this.electrons = this.initElectrons()[1];
        this.electronShells = this.initShells();
    }

    initNucleus()
    {   let nucleons = [];
        for ( let i = 0; i < this.atomicMass; i++ )
        {   if ( i < this.atomicMass - this.atomicNum )
            {   nucleons.push( new Neutron() )   }
            else
            {   nucleons.push( new Proton() );   }
        }
        return nucleons;
    }

    initShells()
    {   let electronShells = [];
        for (let i = 0; i < this.electrons.length; i++)
        {   electronShells.push( new ElectronShell( 12 + (i * 5) ) );   }
        return electronShells;
    }

    initElectrons() // This code is atrocious and I'm sorry
    {   const orbitals = this.electronConfigurationExtended.split(' ');
        let electronNums = [];
        let electronShellData = [];
        let totalElectrons = 0;

        orbitals.forEach
        (   (orbital) =>
            {   const [shell, count] = orbital.match(/\d+/g);
                const electronCount = parseInt(count);
                totalElectrons += electronCount;

                // Update electron shell data
                if ( electronShellData[shell] )
                {   electronShellData[shell].push(...Array.from( { length: electronCount }, () => new Electron() ) );   }
                else
                {   electronShellData[shell] = Array.from( { length: electronCount }, () => new Electron() );   }
            }
        );

        // return
        // {   totalElectrons: totalElectrons, // Dunno why I have this here but it might be useful later
        //     electrons: electronShellData.slice(1) // This is so hacky but i dont want to fix it rn
        // };

        return [totalElectrons, electronShellData.slice(1)];
    }
}
/*
    - Adds nucleons, electrons, and electron shells to the nucleus when respective methods are called in the App init method
    - Handles the quaternion and position copying in the animation loop
    - Handles the electron rotation in the animation loop
    * Handles the physics for the nucleons in the animation loop
*/
class AtomManager
{   constructor( atom )
    {   this.atom = atom;   }

    // Initiation function
    createNucleus( scene, world )
    {   for ( let i = 0; i < this.atom.nucleons.length; i++ ) // Iterate through the nucleons and add them to the scene and world
        {   scene.add( this.atom.nucleons[i].mesh );
            world.addBody( this.atom.nucleons[i].body );

            // Damping to avoid perpetual motion of bodies
            this.atom.nucleons[i].body.linearDamping = 0.99;
            this.atom.nucleons[i].body.angularDamping = 0.99;
        }
    }

    // Initiation function
    createElectrons( scene )
    {   for (let i = 0; i < this.atom.electronShells.length; i++)
        {   this.atom.electronShells[i].mesh.rotation.x += Math.PI / 2; // Set rotation to 90 degrees
            scene.add(this.atom.electronShells[i].mesh);
        }

        for (let i = 0; i < this.atom.electrons.length; i++) // Iterate through multi-dimensional electron array and add them to the scene
        {   for (let j = 0; j < this.atom.electrons[i].length; j++)
            {   scene.add(this.atom.electrons[i][j].mesh);   }
        }
    }

    // Animation function
    copyNucleons()
    {   for ( let i = 0; i < this.atom.nucleons.length; i++ )
        {   this.atom.nucleons[i].mesh.position.copy( this.atom.nucleons[i].body.position );
            this.atom.nucleons[i].mesh.quaternion.copy( this.atom.nucleons[i].body.quaternion );
        }
    }

    // Animation function
    pullOrigin()
    {   for ( let i = 0; i < this.atom.nucleons.length; i++ ) // Iterate through all nucleons and pull them towards the origin
        {   this.atom.nucleons[i].body.force.set
            (   -this.atom.nucleons[i].body.position.x * 10,
                -this.atom.nucleons[i].body.position.y * 10,
                -this.atom.nucleons[i].body.position.z * 10,
            )
        }
    }

    // Animation function
    initiateElectronRotation()
    {   let time = Date.now() * 0.001;
        for (let i = 0; i < this.atom.electrons.length; i++)
        {   for (let j = 0; j < this.atom.electrons[i].length; j++)
            {   let angle = (j / this.atom.electrons[i].length) * Math.PI * 2;
                let orbitX = Math.cos(time * 0.5 + angle) * (12 + (i * 5));
                let orbitZ = Math.sin(time * 0.5 + angle) * (12 + (i * 5));
                this.atom.electrons[i][j].mesh.position.set(orbitX, 0, orbitZ);
            }
        }
    }
}

let manager = new AtomManager( new Atom('Iodine', 53, 127, '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6') );

class App
{   constructor()
    {   this.scene = new THREE.Scene();
        this.world = new CANNON.World();
        this.world.gravity.set( 0, 0, 0 );
        this.renderer = new THREE.WebGLRenderer();
        this.camera = new THREE.PerspectiveCamera
        (   45, window.innerWidth / window.innerHeight, 1, 1000   );
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
        manager.initiateElectronRotation();
        manager.copyNucleons();
        manager.pullOrigin();
        this.world.step( 1 / 60 );
    }

    init()
    {   this.camera.position.z = 25;
        this.camera.position.y = 5;
        this.camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );

        // const axesHelper = new THREE.AxesHelper( 12 );
        // this.scene.add( axesHelper );

        const controls = new OrbitControls( this.camera, this.renderer.domElement );
        controls.minDistance = 15;
        controls.maxDistance = 150;

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

        manager.createNucleus( this.scene, this.world );
        manager.createElectrons( this.scene, this.world );

        // var greenMeshes = getMeshesByColor(new THREE.Color(0x37ff37), this.scene);
        // console.log(greenMeshes);

        this.animate();
    }
}

let app = new App();
app.init();

javascript:(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='https://mrdoob.github.io/stats.js/build/stats.min.js';document.head.appendChild(script);})()
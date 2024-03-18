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
        (   new THREE.SphereGeometry( 0.15, 32, 32 ),
            new THREE.MeshBasicMaterial
            (   {   color: 0x37ff37   }   )
        )
    }
}

class ElectronShellP1
{   constructor()
    {   this.mesh = new THREE.Mesh
        (   new THREE.TorusGeometry(12, 0.025),
            new THREE.MeshBasicMaterial()
        )
    }
}

class ElectronShellP2
{   constructor()
    {   this.mesh = new THREE.Mesh
        (   new THREE.TorusGeometry(17, 0.025),
            new THREE.MeshBasicMaterial()
        )
    }
}

class ElectronShellP3
{   constructor()
    {   this.mesh = new THREE.Mesh
        (   new THREE.TorusGeometry(22, 0.025),
            new THREE.MeshBasicMaterial()
        )
    }
}

class ElectronShellP4
{   constructor()
    {   this.mesh = new THREE.Mesh
        (   new THREE.TorusGeometry(27, 0.025),
            new THREE.MeshBasicMaterial()
        )
    }
}

class ElectronShellP5
{   constructor()
    {   this.mesh = new THREE.Mesh
        (   new THREE.TorusGeometry(32, 0.025),
            new THREE.MeshBasicMaterial()
        )
    }
}

class ElectronShellP6
{   constructor()
    {   this.mesh = new THREE.Mesh
        (   new THREE.TorusGeometry(37, 0.025),
            new THREE.MeshBasicMaterial()
        )
    }
}

class ElectronShellP7
{   constructor()
    {   this.mesh = new THREE.Mesh
        (   new THREE.TorusGeometry(42, 0.025),
            new THREE.MeshBasicMaterial()
        )
    }
}

class AbstractAtom
{   constructor( name, atomicNum, atomicMass, valenceElectrons )
    {   this.atomicNum = atomicNum;
        this.atomicMass = atomicMass;
        this.valenceElectrons = valenceElectrons;
        this.nucleons = this.initNucleus();
    }

    initNucleus()
    {   let nucleons = [];
        for ( let i = 0; i < this.atomicMass; i++ )
        {
            if ( i < this.atomicMass - this.atomicNum )
            {   nucleons.push( new Neutron() )   }
            else
            {   nucleons.push( new Proton() );   }
        }
        return nucleons;
    }

    initElectrons()
    {   throw new Error( 'createElectrons not implemented in base class.' );  }
}

class ConcreteAtomP1 extends AbstractAtom
{   constructor( name, atomicNum, atomicMass, valenceElectrons )
    {   super( name, atomicNum, atomicMass, valenceElectrons );
        this.electronShell = new ElectronShellP1().mesh;
        this.electrons = this.initElectrons();
    }

    initElectrons()
    {   let electrons = [];
        for (let i = 0; i < this.valenceElectrons; i++)
        {   electrons.push( new Electron() );
            let angle = (i / this.valenceElectrons)  * Math.PI * this.valenceElectrons;
            let orbitX = Math.cos(angle) * 12;
            let orbitZ = Math.sin(angle) * 12;
            electrons[i].mesh.position.set(orbitX, 0, orbitZ);
        }
        return electrons;
    }
}

class ConcreteAtomP2 extends AbstractAtom
{   constructor( name, atomicNum, atomicMass, valenceElectrons )
    {   super( name, atomicNum, atomicMass, valenceElectrons );
        this.electronShells = this.initShells();
        this.electrons = this.initElectrons();
    }

    initShells()
    {   let electronShells = [new ElectronShellP1().mesh, new ElectronShellP2().mesh];
        return electronShells;
    }

    initElectrons()
    {   let P1Electrons = [];
        P1ElectronLoop: for (let i = 0; i < 2; i++)
        {   P1Electrons.push( new Electron() );
            let angle = (i / 2)  * Math.PI * 2;
            let orbitX = Math.cos(angle) * 12;
            let orbitZ = Math.sin(angle) * 12;
            P1Electrons[i].mesh.position.set(orbitX, 0, orbitZ);
        }

        let P2Electrons = [];
        P2ElectronLoop: for ( let i = 0; i < this.valenceElectrons; i++)
        {   P2Electrons.push( new Electron() );
            let angle = (i / this.valenceElectrons) * Math.PI * 2;
            let orbitX = Math.cos(angle) * 17;
            let orbitZ = Math.sin(angle) * 17;
            P2Electrons[i].mesh.position.set(orbitX, 0, orbitZ);
        }
        return [P1Electrons, P2Electrons];
    }
}

class ConcreteAtomP3 extends AbstractAtom
{   constructor( name, atomicNum, atomicMass, valenceElectrons )
    {   super( name, atomicNum, atomicMass, valenceElectrons );
        this.electronShells = this.initShells();
        this.electrons = this.initElectrons();
    }

    initShells()
    {   let electronShells = [new ElectronShellP1().mesh, new ElectronShellP2().mesh, new ElectronShellP3().mesh];
        return electronShells;
    }

    initElectrons()
    {   let P1Electrons = [];
        P1ElectronLoop: for (let i = 0; i < 2; i++)
        {   P1Electrons.push( new Electron() );
            let angle = (i / 2) * Math.PI * 2;
            let orbitX = Math.cos(angle) * 12;
            let orbitZ = Math.sin(angle) * 12;
            P1Electrons[i].mesh.position.set(orbitX, 0, orbitZ);
        }

        let P2Electrons = [];
        P2ElectronLoop: for ( let i = 0; i < 8; i++)
        {   P2Electrons.push( new Electron() );
            let angle = (i / 8) * Math.PI * 2;
            let orbitX = Math.cos(angle) * 17;
            let orbitZ = Math.sin(angle) * 17;
            P2Electrons[i].mesh.position.set(orbitX, 0, orbitZ);
        }

        let P3Electrons = [];
        P3ElectronLoop: for ( let i = 0; i < this.valenceElectrons; i++)
        {   P3Electrons.push(new Electron() );
            let angle = (i / this.valenceElectrons) * Math.PI * 2;
            let orbitX = Math.cos(angle) * 22;
            let orbitZ = Math.sin(angle) * 22;
            P3Electrons[i].mesh.position.set(orbitX, 0, orbitZ);
        }
        return [P1Electrons, P2Electrons, P3Electrons];
    }
}

class ConcreteAtomP4 extends AbstractAtom
{

}

class ConcreteAtomP5 extends AbstractAtom
{

}

class ConcreteAtomP6 extends AbstractAtom
{

}

class ConcreteAtomP7 extends AbstractAtom
{

}

class AbstractAtomManager
{   constructor( atom )
    {   this.atom = atom;   }

    createNucleus( scene, world )
    {   for ( let i = 0; i < this.atom.nucleons.length; i++ )
        {   scene.add( this.atom.nucleons[i].mesh );
            world.addBody( this.atom.nucleons[i].body );

            this.atom.nucleons[i].body.linearDamping = 0.99;
            this.atom.nucleons[i].body.angularDamping = 0.99;
        }
    }

    createElectrons( scene )
    {    throw new Error( 'createElectrons not implemented in base class.' );   }

    copy()
    {   for ( let i = 0; i < this.atom.nucleons.length; i++ )
        {   this.atom.nucleons[i].mesh.position.copy( this.atom.nucleons[i].body.position );
            this.atom.nucleons[i].mesh.quaternion.copy( this.atom.nucleons[i].body.quaternion );
        }
    }

    pullOrigin()
    {   for ( let i = 0; i < this.atom.nucleons.length; i++ )
        {   this.atom.nucleons[i].body.force.set
            (   -this.atom.nucleons[i].body.position.x * 10,
                -this.atom.nucleons[i].body.position.y * 10,
                -this.atom.nucleons[i].body.position.z * 10,
            )
        }
    }

    initiateElectronRotation()
    {   throw new Error( 'initiateElectronRotation not implemented in base class.' );    }
}

class ConcreteAtomP1Manager extends AbstractAtomManager
{   createElectrons( scene )
    {   this.atom.electronShell.rotation.x += Math.PI / 2;
        scene.add(this.atom.electronShell);
        for (let i = 0; i < this.atom.electrons.length; i++)
        {   scene.add(this.atom.electrons[i].mesh);   }
    }

    initiateElectronRotation()
    {   let time = Date.now() * 0.001;
        for (let i = 0; i < this.atom.electrons.length; i++)
        {   let angle = (i / this.atom.electrons.length) * Math.PI * this.atom.electrons.length;
            let orbitX = Math.cos(time * 0.5 + angle) * 12;
            let orbitZ = Math.sin(time * 0.5 + angle) * 12;
            this.atom.electrons[i].mesh.position.set(orbitX, 0, orbitZ);
        }
    }
}

class ConcreteAtomP2Manager extends AbstractAtomManager
{   createElectrons( scene )
    {   for (let i = 0; i < this.atom.electronShells.length; i++)
        {   this.atom.electronShells[i].rotation.x += Math.PI / 2;
            scene.add(this.atom.electronShells[i]);
        }

        for (let i = 0; i < this.atom.electrons.length; i++)
        {   for (let j = 0; j < this.atom.electrons[i].length; j++)
            {   scene.add(this.atom.electrons[i][j].mesh);  }
        }
    }

    initiateElectronRotation()
    {   let time = Date.now() * 0.001;
        rotateP1Electrons: for (let i = 0; i < 2; i++)
        {   let angle = (i / 2) * Math.PI * 2;
            let orbitX = Math.cos(time * 0.5 + angle) * 12;
            let orbitZ = Math.sin(time * 0.5 + angle) * 12;
            this.atom.electrons[0][i].mesh.position.set(orbitX, 0, orbitZ);
        }

        rotateP2Electrons: for (let i = 0; i < this.atom.electrons[1].length; i++)
        {   let angle = (i / this.atom.electrons[1].length) * Math.PI * 2;
            let orbitX = Math.cos(time * 0.5 + angle) * 17;
            let orbitZ = Math.sin(time * 0.5 + angle) * 17;
            this.atom.electrons[1][i].mesh.position.set(orbitX, 0, orbitZ);
        }
    }
}

class ConcreteAtomP3Manager extends AbstractAtomManager
{   createElectrons( scene )
    {   for (let i = 0; i < this.atom.electronShells.length; i++)
        {   this.atom.electronShells[i].rotation.x += Math.PI / 2;
            scene.add(this.atom.electronShells[i]);
        }

        for (let i = 0; i < this.atom.electrons.length; i++)
        {   for (let j = 0; j < this.atom.electrons[i].length; j++)
            {   scene.add(this.atom.electrons[i][j].mesh);  }
        }
    }

    initiateElectronRotation()
    {   let time = Date.now() * 0.001;
        rotateP1Electrons: for (let i = 0; i < 2; i++)
        {   let angle = (i / 2) * Math.PI * 2;
            let orbitX = Math.cos(time * 0.5 + angle) * 12;
            let orbitZ = Math.sin(time * 0.5 + angle) * 12;
            this.atom.electrons[0][i].mesh.position.set(orbitX, 0, orbitZ);
        }

        rotateP2Electrons: for (let i = 0; i < 8; i++)
        {   let angle = (i / 8) * Math.PI * 2;
            let orbitX = Math.cos(time * 0.5 + angle) * 17;
            let orbitZ = Math.sin(time * 0.5 + angle) * 17;
            this.atom.electrons[1][i].mesh.position.set(orbitX, 0, orbitZ);
        }

        rotateP3Electrons: for (let i = 0; i < this.atom.electrons[2].length; i++)
        {   let angle = (i / this.atom.electrons[2].length) * Math.PI * 2;
            let orbitX = Math.cos(time * 0.5 + angle) * 22;
            let orbitZ = Math.sin(time * 0.5 + angle) * 22;
            this.atom.electrons[2][i].mesh.position.set(orbitX, 0, orbitZ);
        }
    }
}

class ConcreteAtomP4Manager extends AbstractAtomManager
{

}

class ConcreteAtomP5Manager extends AbstractAtomManager
{

}

class ConcreteAtomP6Manager extends AbstractAtomManager
{

}

class ConcreteAtomP7Manager extends AbstractAtomManager
{

}

// let manager = new ConcreteAtomP1Manager( new ConcreteAtomP1( 'Helium', 2, 4, 2 ) );
// let manager = new ConcreteAtomP2Manager( new ConcreteAtomP2( 'Lithium', 3, 7, 1 ) );
let manager = new ConcreteAtomP3Manager( new ConcreteAtomP3( 'Silicon', 14, 28, 4 ) );
// let manager = new ConcreteAtomP2Manager( new ConcreteAtomP2('Boron', 5, 11, 3) );
// let manager = new ConcreteAtomP2Manager( new ConcreteAtomP2( 'Fluorine', 9, 19, 7 ) );
// manager = new ConcreteAtomP5Manager( new ConcreteAtomP5( 'Iodine', 53, 127 ) );
// manager = new ConcreteAtomP7Manager( new ConcreteAtomP7( 'Oganesson', 118, 294) );

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
        manager.copy();
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
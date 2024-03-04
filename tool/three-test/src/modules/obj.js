import * as CANNON from 'cannon-es';
import * as THREE from 'three';
import CannonDebugger from 'cannon-es-debugger';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

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
        (   new THREE.SphereGeometry( 0.075, 32, 32 ),
            new THREE.MeshBasicMaterial
            (   {   color: 0x37ff37   }   )
        )
    }
}

class AbstractElectronShell
{   constructor(valence)
    {   this.electrons = initElectrons();   }

    initElectrons()
    {   let electrons = [];
        for (let i = 1; i <= valence; i++)
        {   electrons.push( new Electron() )   }
        return electrons;
    }
}

class ElectronShellP1 extends AbstractElectronShell
{   constructor(valence)
    {   this.mesh = new THREE.Mesh
        (   new THREE.TorusGeometry(),

        )
    }
}

class ElectronShellP2 extends AbstractElectronShell
{
}

class ElectronShellP3 extends AbstractElectronShell
{
}

class ElectronShellP4 extends AbstractElectronShell
{
}

class ElectronShellP5 extends AbstractElectronShell
{
}

class ElectronShellP6 extends AbstractElectronShell
{
}

class ElectronShellP7 extends AbstractElectronShell
{
}

class AbstractElectronShellManager
{   constructor()
    {

    }
}

class ElectronShellP1Manager extends AbstractElectronShellManager
{

}

class ElectronShellP2Manager extends AbstractElectronShellManager
{

}

class ElectronShellP3Manager extends AbstractElectronShellManager
{

}

class ElectronShellP4Manager extends AbstractElectronShellManager
{

}

class ElectronShellP5Manager extends AbstractElectronShellManager
{

}

class ElectronShellP6Manager extends AbstractElectronShellManager
{

}

class ElectronShellP7Manager extends AbstractElectronShellManager
{

}

class AbstractAtom
{   constructor( name, atomicNum, atomicMass, valenceElectrons)
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
{
    initElectrons()
    {   let electronShellP1 = new ElectronShellP1(this.valenceElectrons);
    }
}

class ConcreteAtomP2 extends AbstractAtom
{

}

class ConcreteAtomP3 extends AbstractAtom
{

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

    createElectronShell( scene, world )
    {

    }

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
}

class ConcreteAtomP1Manager extends AbstractAtomManager
{

}

class ConcreteAtomP2Manager extends AbstractAtomManager
{

}

class ConcreteAtomP3Manager extends AbstractAtomManager
{

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

let manager = new ConcreteAtomP1Manager( new ConcreteAtomP1( 'Helium', 2, 4, 2 ) );
manager = new ConcreteAtomP2Manager( new ConcreteAtomP2( 'Lithium', 3, 7, 1) );
manager = new ConcreteAtomP5Manager( new ConcreteAtomP5( 'Iodine', 53, 127 ) );
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
        manager.copy();
        manager.pullOrigin();
        this.world.step( 1 / 60 );
    }

    init()
    {   console.log( manager.atom );

        this.camera.position.z = 25;
        this.camera.position.y = 5;
        this.camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );

        const axesHelper = new THREE.AxesHelper( 12 );
        this.scene.add( axesHelper );

        const controls = new OrbitControls( this.camera, this.renderer.domElement );

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

        const spotLightHelper = new THREE.SpotLightHelper( spotLight );
        this.scene.add( spotLightHelper );

        this.scene.background = new THREE.Color( 0x333333 );

        manager.createNucleus( this.scene, this.world );

        this.animate();
    }
}

let app = new App();
app.init();

javascript:(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='https://mrdoob.github.io/stats.js/build/stats.min.js';document.head.appendChild(script);})()
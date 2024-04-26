import * as CANNON from 'cannon-es';
import * as THREE from 'three';

class Proton
{   constructor()
    {   this.mesh = new THREE.Mesh
        (   new THREE.SphereGeometry( 1, 32, 32 ),
            new THREE.MeshPhongMaterial
            (   {   color: 0xff0000,
                    side: THREE.DoubleSide,
                    shininess: 3,
                    specular: 0xffffff,
                    name: 'protonMesh',
                    opacity: 0.8,
                    transparent: true
                }
            )
        );
        this.name = 'Proton';
        this.body = new CANNON.Body
        (   {   mass: 1,
                shape: new CANNON.Sphere( 1 ),
                position: new CANNON.Vec3( Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5 ),
                name: 'protonBody',
                linearDamping: 0.99,
                angularDamping: 0.99
		    }
        );
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
                    name: 'neutronMesh',
                    opacity: 0.8,
                    transparent: true
                }
            ),
        );
        this.name = 'Neutron';
        this.body = new CANNON.Body
        (   {   mass: 1,
                shape: new CANNON.Sphere( 1 ),
                position: new CANNON.Vec3( Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5 ),
                name: 'neutronBody',
                linearDamping: 0.99,
                angularDamping: 0.99
		    }
        );
    }
}

class Electron
{   constructor( color = 0x37ff37, orbital )
    {   this.color = color;
        this.name = `Electron ${orbital}`;
        this.mesh = new THREE.Mesh
        (   new THREE.SphereGeometry( 0.4, 32, 32 ),
            new THREE.MeshBasicMaterial
            (   {   color: this.color,
                    opacity: 0.7,
                    transparent: true
                }
            )
        )
    }
}

class ElectronShell
{   constructor( radius = 12 )
    {   this.radius = radius;
        this.name = `Electron Shell ${((this.radius - 12) / 5) + 1 }`;
        this.mesh = new THREE.Mesh
        (   new THREE.TorusGeometry( this.radius, 0.05 ),
            new THREE.MeshBasicMaterial(),
        );
        this.mesh.rotation.set( Math.PI / 2, 0, 0 );
    }
}

class ElectronOrbitalFactory
{   constructor( atom )
    {   this.atom = atom;   }

    generateOrbitals()
    {   let pauliElectronSpins = this.atom.electrons;
        for (let i = 0; i < arr.length; i++)
        {   let subArray = pauliElectronSpins[i];
            if (subArray.length > 2)
            {   let modifiedSubArray = [];
                for (let j = 0; j < subArray.length; j += 2)
                {   modifiedSubArray.push( subArray.slice( j, j + 2 ) );   }
                pauliElectronSpins[i] = modifiedSubArray;
            }
        }
    }
}

export { Proton, Neutron, Electron, ElectronShell };
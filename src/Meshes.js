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
        (   new THREE.SphereGeometry( 0.4, 32, 32 ),
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

export { Proton, Neutron, Electron, ElectronShell };
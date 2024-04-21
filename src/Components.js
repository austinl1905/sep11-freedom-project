import { Proton, Neutron, Electron, ElectronShell } from './Meshes.js';
import * as CANNON from 'cannon-es';
import * as THREE from 'three';

class Atom
{   constructor( name, atomicNum, atomicMass, atomicSymbol, electronConfigurationExtended, rotateEnabled = true, colorsEnabled = true, extendedColorsEnabled = false )
    {   if (colorsEnabled)
        {   this.colorsBasic = Object.entries
            (   {   _1s: 0x37ff30,
                    _2s: 0xff3037,
                    _2p: 0xff3037,
                    _3s: 0x3037ff,
                    _3p: 0x3037ff,
                    _4s: 0xff9030,
                    _3d: 0x3037ff,
                    _4p: 0xff9030,
                    _5s: 0xf830ff,
                    _4d: 0xff9030,
                    _5p: 0xf830ff,
                    _6s: 0x30fff8,
                    _4f: 0xff9030,
                    _5d: 0xf830ff,
                    _6p: 0x30fff8,
                    _7s: 0xffffff,
                    _5f: 0xf830ff,
                    _6d: 0x30fff8,
                    _7p: 0xffffff
                }
            )
        }
        this.name = name;
        this.atomicNum = atomicNum;
        this.atomicMass = atomicMass;
        this.atomicSymbol = atomicSymbol;
        this.electronConfigurationExtended = electronConfigurationExtended; // Ex: '1s2 2s2 2p4'
        this.nucleons = this.initNucleus();
        this.electrons = this.initElectrons();
        this.bohrElectronShells = this.initBohrShells();
        this.rotateEnabled = rotateEnabled;
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

    // The BohrAtomManager will actually add these shells to the scene. In the QuantumAtomManager, the radius of the shells are merely used as a reference for the camera/controls distance.
    initBohrShells()
    {   let electronShells = [];
        for (let i = 0; i < this.electrons.length; i++)
        {   electronShells.push( new ElectronShell( 12 + (i * 5) ) );   }
        return electronShells;
    }

     // This code is atrocious and I'm sorry
    initElectrons()
    {   const orbitals = this.electronConfigurationExtended.split(' ');
        let electronShellData = [];

        for ( let i = 0; i < orbitals.length; i++ ) // hey hey check out my crappy variable naming
        {   const orbital = orbitals[i];
            const [ shell, count ] = orbital.match(/\d+/g);
            const [ principal, num ] = orbital.match(/\d+|\D+/g);
            const electronCount = parseInt( count );

            if ( electronShellData[shell] )
            {   for ( let j = 0; j < electronCount; j++ )
                {   electronShellData[ shell ].push(new Electron(this.colorsBasic[i][1], `${principal}${orbital}` ) );   }
            } else {
                electronShellData[shell] = [];
                for ( let j = 0; j < electronCount; j++ )
                {   electronShellData[ shell ].push(new Electron(this.colorsBasic[i][1], `${principal}${orbital}` ) );   }
            }
        }

        return electronShellData.slice(1);
    }
}

/*
    - Adds nucleons, electrons, and electron shells to the nucleus when respective methods are called in the App init method
    - Handles the quaternion and position copying in the animation loop
    - Handles the physics for the nucleons in the animation loop
*/
class AbstractAtomManager
{   constructor( atom )
    {   this.atom = atom;
        this.minVelocitySquared = 0.1;
        this.minAngularVelocitySquared = 0.1;
        this.frameCount = 0;
        this.allBodiesStatic = false;
    }

    // Initialization function
    createElectrons( scene )
    {   throw new Error('createElectrons not defined in base class');   }

    // Animation function
    controlElectronMovement( scene )
    {   throw new Error('controlElectronMovement not defined in base class');   }

    // Initiation function
    createNucleus( scene, world )
    {   for ( let i = 0; i < this.atom.nucleons.length; i++ )
        {   scene.add( this.atom.nucleons[i].mesh );
            world.addBody( this.atom.nucleons[i].body );
        }
    }

    // Animation function
    controlNucleonMovement()
    {   this.frameCount++; // Because for some odd reason it takes a few frames for the nucleons to move

        for ( let i = 0; i < this.atom.nucleons.length; i++ )
        {   this.atom.nucleons[i].body.force.set
            (   -this.atom.nucleons[i].body.position.x * 100,
                -this.atom.nucleons[i].body.position.y * 100,
                -this.atom.nucleons[i].body.position.z * 100,
            )

            if (this.frameCount > 60)
            {   if (this.atom.nucleons[i].body.velocity.lengthSquared() < this.minVelocitySquared || this.atom.nucleons[i].body.angularVelocity.lengthSquared() < this.minAngularVelocitySquared)
                {   this.atom.nucleons[i].body.type = CANNON.Body.STATIC;   }
            }

            this.atom.nucleons[i].mesh.position.copy( this.atom.nucleons[i].body.position );
            this.atom.nucleons[i].mesh.quaternion.copy( this.atom.nucleons[i].body.quaternion );
        }

        if ( this.atom.nucleons.every( (nucleon) => nucleon.body.type == CANNON.Body.STATIC ) )
        {   this.allBodiesStatic = true;   }
    }

    resetAtom( scene, world, atom = null)
    {   for (let i = 0; i < this.atom.bohrElectronShells.length; i++)
        {   scene.remove(this.atom.bohrElectronShells[i].mesh);   }

        for (let i = 0; i < this.atom.electrons.length; i++)
        {   for (let j = 0; j < this.atom.electrons[i].length; j++)
            {   scene.remove(this.atom.electrons[i][j].mesh);   }
        }

        for ( let i = 0; i < this.atom.nucleons.length; i++ )
        {   scene.remove( this.atom.nucleons[i].mesh );
            world.removeBody( this.atom.nucleons[i].body );
        }

        if (atom)
        {   this.atom = atom;
            this.frameCount = 0; // :skull:
            this.allBodiesStatic = false;

            this.createNucleus( scene, world );
            this.createElectrons( scene );
        }
    }
}

/*
    - Concrete manager for wave mechanical atomic model
*/
class QuantumAtomManager extends AbstractAtomManager
{   // Initiation Function
    createElectrons( scene )
    {

    }

    // Animation function
    controlElectronMovement( scene )
    {

    }

}

/*
    - Concrete manager for Bohr atomic model
*/
class BohrAtomManager extends AbstractAtomManager
{   // Initiation function
    createElectrons( scene )
    {   for (let i = 0; i < this.atom.bohrElectronShells.length; i++)
        {   scene.add(this.atom.bohrElectronShells[i].mesh);   }

        for ( let i = 0; i < this.atom.electrons.length; i++ ) // Iterate through multi-dimensional electron array and add them to the scene while setting their positions
        {   for ( let j = 0; j < this.atom.electrons[i].length; j++ )
            {   scene.add(this.atom.electrons[i][j].mesh);
                let angle = ( j / this.atom.electrons[i].length ) * Math.PI * 2;
                let orbitX = Math.cos( 0.5 + angle ) * ( 12 + ( i * 5 ));
                let orbitZ = Math.sin( 0.5 + angle ) * ( 12 + ( i * 5 ));
                this.atom.electrons[i][j].mesh.position.set( orbitX, 0, orbitZ );
            }
        }
    }

    // Animation function
    controlElectronMovement()
    {   if (this.atom.rotateEnabled == true)
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
}


export { Atom, QuantumAtomManager, BohrAtomManager };
import { Proton, Neutron, Electron, ElectronShell } from './Meshes.js';

class Atom
{   constructor( name, atomicNum, atomicMass, electronConfigurationExtended, rotate = true )
    {   this.atomicNum = atomicNum;
        this.atomicMass = atomicMass;
        this.electronConfigurationExtended = electronConfigurationExtended; // Ex: '1s2 2s2 2p4'
        this.nucleons = this.initNucleus();
        this.electrons = this.initElectrons();
        this.bohrElectronShells = this.initBohrShells();
        this.rotate = rotate;
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

    // The BohrAtomManager will actually add these shells to the scene. In the QuantumAtomManager, the radius of the shells are merely used as a reference for the camera distance.
    initBohrShells()
    {   let electronShells = [];
        for (let i = 0; i < this.electrons.length; i++)
        {   electronShells.push( new ElectronShell( 12 + (i * 5) ) );   }
        return electronShells;
    }

    initElectrons() // This code is atrocious and I'm sorry
    {   const orbitals = this.electronConfigurationExtended.split(' ');
        let electronNums = [];
        let electronShellData = [];
        // let totalElectrons = 0;

        orbitals.forEach
        (   (orbital) =>
            {   const [shell, count] = orbital.match(/\d+/g);
                const electronCount = parseInt(count);
                // totalElectrons += electronCount;

                // Update electron shell data
                if ( electronShellData[shell] )
                {   electronShellData[shell].push(...Array.from( { length: electronCount }, () => new Electron() ) );   } // Don't ask me to explain this... Because I can't
                else
                {   electronShellData[shell] = Array.from( { length: electronCount }, () => new Electron() );   }
            }
        );

        return electronShellData.slice(1); // This is so hacky but i dont want to fix it rn
    }
}

/*
    - Adds nucleons, electrons, and electron shells to the nucleus when respective methods are called in the App init method
    - Handles the quaternion and position copying in the animation loop
    - Handles the physics for the nucleons in the animation loop
*/
class AbstractAtomManager
{   constructor( atom )
    {   this.atom = atom;   }

    // Initiation function
    createNucleus( scene, world )
    {   for ( let i = 0; i < this.atom.nucleons.length; i++ )
        {   scene.add( this.atom.nucleons[i].mesh );
            world.addBody( this.atom.nucleons[i].body );

            // Damping to avoid perpetual motion of bodies
            this.atom.nucleons[i].body.linearDamping = 0.99;
            this.atom.nucleons[i].body.angularDamping = 0.99;
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
}

/*
    - Concrete manager for wave mechanical atomic model
*/
class QuantumAtomManager extends AbstractAtomManager
{   // Initiation Function
    createQuantumElectrons( scene )
    {

    }

    // Animation function
    initiateQuantumElectronMovement( scene )
    {

    }

}

/*
    - Concrete manager for Bohr atomic model
*/
class BohrAtomManager extends AbstractAtomManager
{   // Initiation function
    createBohrElectrons( scene )
    {   for (let i = 0; i < this.atom.bohrElectronShells.length; i++)
        {   this.atom.bohrElectronShells[i].mesh.rotation.x += Math.PI / 2; // Set rotation to 90 degrees
            scene.add(this.atom.bohrElectronShells[i].mesh);
        }

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
    initiateBohrElectronRotation()
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

export { Atom, QuantumAtomManager, BohrAtomManager };
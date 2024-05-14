import { Proton, Neutron, Electron, ElectronShell } from './Meshes.js';
import * as CANNON from 'cannon-es';
import * as THREE from 'three';

class Atom
{   constructor( name, atomicNum, atomicMass, atomicSymbol, electronConfigurationExtended, rotateEnabled = true, colorsMode = 'energy-level')
    {   this.colorsMode = colorsMode;
        this.colorsExtended = Object.entries
        (   {   _1s: 0x37ff30,
                _2s: 0x37ff30,
                _2p: 0xff3037,
                _3s: 0x37ff30,
                _3p: 0xff3037,
                _4s: 0x37ff30,
                _3d: 0x3037ff,
                _4p: 0xff3037,
                _5s: 0x37ff30,
                _4d: 0x3037ff,
                _5p: 0xff3037,
                _6s: 0x37ff30,
                _4f: 0xff9030,
                _5d: 0x3037ff,
                _6p: 0xff3037,
                _7s: 0x37ff30,
                _5f: 0xff9030,
                _6d: 0x3037ff,
                _7p: 0xff3037
            }
        );
        this.colorsBasic = Object.entries // This is really stupid but it's the only way I was able to get this to work
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
        );
        this.name = name;
        this.atomicNum = atomicNum;
        this.atomicMass = atomicMass;
        this.atomicSymbol = atomicSymbol;
        this.electronConfigurationExtended = electronConfigurationExtended; // Ex: '1s2 2s2 2p4'
        this.electrons = this.initElectrons();
        this.totalElectronsPerShell = this.getElectronData();
        this.nucleons = this.initNucleus();
        this.bohrElectronShells = this.initBohrShells();
        this.rotateEnabled = rotateEnabled;
    }

    initNucleus()
    {   let nucleons = [];
        for ( let i = 0; i < this.atomicMass; i++ )
        {   if ( i < this.atomicMass - this.atomicNum )
            {   nucleons.push( new Neutron() );   }
            else
            {   nucleons.push( new Proton() );   }
        }

        return nucleons;
    }

    // The BohrAtomManager will actually add these shells to the scene. In the QuantumAtomManager, the radius of the shells are merely used as a reference for the camera/controls distance.
    initBohrShells()
    {   let electronShells = [];
        for (let i = 0; i < this.electrons.length; i++)
        {   electronShells.push( new ElectronShell( 12 + ( i * 5 ) ) );   }
        return electronShells;
    }

     // This code is atrocious and I'm sorry
    initElectrons()
    {   let orbitals = this.electronConfigurationExtended.split(' ');
        let electrons = [];
        let subshells =
        {   's': 0,
            'p': 1,
            'd': 2,
            'f': 3
        }
        let subshellCount = 0;

        if (this.colorsMode == 'energy-level')
        {   for ( let i = 0; i < orbitals.length; i++ )
            {   let [ shell, subshell, count ] = orbitals[ i ].match( /\d+|[spdf]/gi );
                count = parseInt( count );
                if ( electrons[ shell - 1 ] )
                {   if ( electrons[ shell - 1 ][ subshells[ subshell ] ] )
                    {   for ( let j = 0; j < count; j++ )
                        {   electrons[ shell - 1 ][ subshells[ subshell ] ].push( new Electron( this.colorsBasic[ i ][ 1 ], `${ shell }${ subshell }` ) );   }
                    }
                    else
                    {   electrons[ shell - 1 ][ subshells[ subshell ]] = [];
                        for ( let j = 0; j < count; j++ )
                        {   electrons[ shell - 1 ][ subshells[ subshell ] ].push( new Electron( this.colorsBasic[ i ][ 1 ], `${ shell }${ subshell }` ) );   }
                    }
                }
                else
                {   electrons[ shell - 1 ] = [];
                    electrons[ shell - 1 ][ subshells[ subshell ] ] = [];
                    for ( let j = 0; j < count; j++ )
                    {   electrons[ shell - 1 ][ subshells[ subshell ] ].push( new Electron( this.colorsBasic[ i ][ 1 ] ) );   }
                }
            }
        }
        else if (this.colorsMode == 'energy-sublevel')
        {   for ( let i = 0; i < orbitals.length; i++ )
            {   let [ shell, subshell, count ] = orbitals[ i ].match( /\d+|[spdf]/gi );
                count = parseInt( count );
                if ( electrons[ shell - 1 ] )
                {   if ( electrons[ shell - 1 ][ subshells[ subshell ] ] )
                    {   for ( let j = 0; j < count; j++ )
                        {   electrons[ shell - 1 ][ subshells[ subshell ] ].push( new Electron( this.colorsExtended[ i ][ 1 ], `${ shell }${ subshell }` ) );   }
                    }
                    else
                    {   electrons[ shell - 1 ][ subshells[ subshell ]] = [];
                        for ( let j = 0; j < count; j++ )
                        {   electrons[ shell - 1 ][ subshells[ subshell ] ].push( new Electron( this.colorsExtended[ i ][ 1 ], `${ shell }${ subshell }` ) );   }
                    }
                }
                else
                {   electrons[ shell - 1 ] = [];
                    electrons[ shell - 1 ][ subshells[ subshell ] ] = [];
                    for ( let j = 0; j < count; j++ )
                    {   electrons[ shell - 1 ][ subshells[ subshell ] ].push( new Electron( this.colorsExtended[ i ][ 1 ] ) );   }
                }
            }
        }
        else
        {   for ( let i = 0; i < orbitals.length; i++ )
            {   let [ shell, subshell, count ] = orbitals[ i ].match( /\d+|[spdf]/gi );
                count = parseInt( count );
                if ( electrons[ shell - 1 ] )
                {   if ( electrons[ shell - 1 ][ subshells[ subshell ] ] )
                    {   for ( let j = 0; j < count; j++ )
                        {   electrons[ shell - 1 ][ subshells[ subshell ] ].push( new Electron( 0x37ff37, `${ shell }${ subshell }` ) );   }
                    }
                    else
                    {   electrons[ shell - 1 ][ subshells[ subshell ]] = [];
                        for ( let j = 0; j < count; j++ )
                        {   electrons[ shell - 1 ][ subshells[ subshell ] ].push( new Electron( 0x37ff37, `${ shell }${ subshell }` ) );   }
                    }
                }
                else
                {   electrons[ shell - 1 ] = [];
                    electrons[ shell - 1 ][ subshells[ subshell ] ] = [];
                    for ( let j = 0; j < count; j++ )
                    {   electrons[ shell - 1 ][ subshells[ subshell ] ].push( new Electron( 0x37ff37 ) );   }
                }
            }
        }

        return electrons;
    }

    getElectronData()
    {   let totalElectronsPerShell = [];
        getTotalElectronsPerShell: for ( let i = 0; i < this.electrons.length; i++ )
        {   let electronsPerShell = 0;
            for ( let j = 0; j < this.electrons[ i ].length; j++ )
            {   electronsPerShell += this.electrons[ i ][ j ].length;   }
            totalElectronsPerShell.push( electronsPerShell )
        }

        return totalElectronsPerShell;
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
    {   throw new Error('createElectrons is not defined in the base class');   }

    // Animation function
    controlElectronMovement()
    {   throw new Error('controlElectronMovement is not defined in the base class');   }

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

        // Bring protons and neutrons to the origin
        for ( let i = 0; i < this.atom.nucleons.length; i++ )
        {   this.atom.nucleons[i].body.force.set
            (   -this.atom.nucleons[i].body.position.x * 100,
                -this.atom.nucleons[i].body.position.y * 100,
                -this.atom.nucleons[i].body.position.z * 100,
            )

            // Stop moving the nucleus model if their movement is below a threshold
            if (this.frameCount > 60)
            {   if (this.atom.nucleons[i].body.velocity.lengthSquared() < this.minVelocitySquared || this.atom.nucleons[i].body.angularVelocity.lengthSquared() < this.minAngularVelocitySquared)
                {   this.atom.nucleons[i].body.type = CANNON.Body.STATIC;   }
            }

            this.atom.nucleons[i].mesh.position.copy( this.atom.nucleons[i].body.position );
            this.atom.nucleons[i].mesh.quaternion.copy( this.atom.nucleons[i].body.quaternion );
        }

        // Enable boolean in order to remove the loading screen
        if ( this.atom.nucleons.every( (nucleon) => nucleon.body.type == CANNON.Body.STATIC ) )
        {   this.allBodiesStatic = true;   }
    }

    resetAtom( scene, world, atom = null)
    {   for (let i = 0; i < this.atom.bohrElectronShells.length; i++)
        {   scene.remove(this.atom.bohrElectronShells[i].mesh);   }

        for (let i = 0; i < this.atom.electrons.length; i++)
        {   for (let j = 0; j < this.atom.electrons[i].length; j++)
            {   for (let k = 0; k < this.atom.electrons[i][j].length; k++)
                {   scene.remove(this.atom.electrons[i][j][k].mesh);   }
            }
        }

        for ( let i = 0; i < this.atom.nucleons.length; i++ )
        {   scene.remove( this.atom.nucleons[i].mesh );
            world.removeBody( this.atom.nucleons[i].body );
        }

        if (atom)
        {   this.atom = atom;
            // Reset framerate and enable loading screen
            this.frameCount = 0;
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
    controlElectronMovement()
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
        {   scene.add( this.atom.bohrElectronShells[i].mesh );   }

        /* Iterate through multi-dimensional electron array and add them to the scene while setting their positions
           - The angle (in radians) is obtained by dividing the iterator by the length of the shell and multiplying it by the angle of a circle.
             By doing this, the electrons will be evenly distributed on each shell.
            - Ex: Nitrogen has 5 electrons in the second shell. The first electron is 1. 1/5 = 0.2, multiplied by 2PI is 0.4PI, the angle the electron will be positioned.
                  The second electron is 2. 2/5 = 0.4, multiplied by 2PI is 0.8PI, and so on
           - The x-coordinate is determined by taking the cosine of the radius of the shell multiplied by the adjusted angle ( to be more aesthetically pleasing )
              The z-coordinate ( technically the y-coordinate because the function plots electrons on a 2D plane) is determined in the same way but with using the sine function.
            - For each iteration of i (each shell), the electrons in that shell gets plotted on the circumference of the circle (the circle radius being determined by the i)
             - So, for the first shell, the radius will be 12 (i = 0). In the second shell, the radius is 17 (i = 0). And so on.
        */
        iterateShells: for ( let i = 0; i < this.atom.electrons.length; i++ )
        {   let electronShellIterator = 0;
            iterateSubshells: for ( let j = 0; j < this.atom.electrons[i].length; j++ )
            {   iterateElectrons: for (let k = 0; k < this.atom.electrons[i][j].length; k++)
                {   electronShellIterator++;
                    scene.add( this.atom.electrons[i][j][k].mesh );
                    let angle = ( electronShellIterator / this.atom.totalElectronsPerShell[i] ) * Math.PI * 2;
                    let orbitX = Math.cos( 0.5 + angle ) * ( 12 + ( i * 5 ));
                    let orbitZ = Math.sin( 0.5 + angle ) * ( 12 + ( i * 5 ));
                    this.atom.electrons[i][j][k].mesh.position.set( orbitX, 0, orbitZ );
                }
            }
        }
    }

    // Animation function
    controlElectronMovement() // This is essentially the same code used when creating electrons except that time is used as well ( to repeatedly reposition the electrons in each animation call)
    {   if ( this.atom.rotateEnabled )
        {   let time = Date.now() * 0.001;
            iterateShells: for ( let i = 0; i < this.atom.electrons.length; i++ )
            {   let electronShellIterator = 0;
                iterateSubshells: for ( let j = 0; j < this.atom.electrons[i].length; j++ )
                {   iterateElectrons: for ( let k = 0; k < this.atom.electrons[ i ][ j ].length; k++ )
                    {   electronShellIterator++;
                        let angle = ( electronShellIterator / this.atom.totalElectronsPerShell[ i ] ) * Math.PI * 2;
                        let orbitX = Math.cos( time * 0.5 + angle ) * (12 + ( i * 5 ));
                        let orbitZ = Math.sin( time * 0.5 + angle ) * (12 + ( i * 5 ));
                        this.atom.electrons[ i ][ j ][ k ].mesh.position.set( orbitX, 0, orbitZ );
                    }
                }
            }
        }
    }
}


export { Atom, BohrAtomManager };
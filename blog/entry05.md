# Entry 5
##### 5/1/24

Disregard pretty much everything that I said in the previous blog. As it turns out, there was no way I could manage to get that code to work and still consider the project to be worthy of MVP status. They're mutually exclusive. That being said, I've done some major improvements and managed to figure out a much better way to create my dynamic model system. Not that my previous method was dynamic to begin with. It was more like an insult to OOP.

Oh, and for each excerpt of code I provide here I have a link to the actual file so you can see how it works in the context of the rest of my project.

Chemistry is full of rules. And those rules have exceptions. Take electron subshells for example. It's a fair assumption that orbitals in lower shells, n, will be filled first. And this is true for n < 3. Comparing the energies of each subshell, we see that 1s < 2s < 2p < 3s < 3p. This trend ends in the third period, however. For reasons that I won't get into because this is a blog, not a lecture on atomic structure, the 4s subshell is actually **lower** in energy than 3d, therefore its orbital gets filled first. This immediately wrecks the assumption that an atom in any given period, p, above 3, has every single orbital in n < p filled.

If you weren't able to comprehend that, there's actually more exceptions to this rule. Sometimes, orbitals in higher level orbitals actually get filled before lower levels. For example, the shorthand electron configuration for Copper is [Ar] 4s1 3d10. This becomes another problem because the number of electrons in each shell is unable to be predicted. And it won't be viable at all to hard code these specific elements either. The one solution to this is to dynamically generate the electron model of an atom based on its electron coniguration. Notice how the electron configuration tells you exactly how many electrons are in each shell and subshell (almost as if that's what its purpose is). While the structure of the electrons can't be predicted (for the most part) merely from its position in the periodic table, it becomes very simple with an electron configuration. And better yet, I can still use the previous approach of creating a multi-dimensional array with sub-arrays that correspond to the shells and subshells. Here's the [algorithm](https://github.com/austinl1905/sep11-freedom-project/blob/main/src/Components.js#L73) that I used to do this:
```js
initElectrons() // I think I could have done this using recursion. But I'm not going to bother myself about it
{   let orbitals = this.electronConfigurationExtended.split(' ');
    let electrons = [];
    let subshells =
    {   's': 0,
        'p': 1,
        'd': 2,
        'f': 3
    }

    for ( let i = 0; i < orbitals.length; i++ )
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

    return electrons;
}
```
Here's a basic rundown.`this.electronConfigurationExtended` is a property belonging to the parent class of this method, `Atom`. To make the process of generating the electron object array easier, I split the electron configuration into an array of subshells and iterate through them. For every iteration, I use regex to return an array of matches: the shell number, the subshell letter, and the number of electrons in that subshell. From there, I simply use conditionals to populate the array with instances of the `Electron` class.

That was pretty much most of the work I had to do to make this project work. From there, I pass the `Atom` instance into the manager class and dynamically [add](https://github.com/austinl1905/sep11-freedom-project/blob/main/src/Components.js#L238) the electrons to the three.js scene:
```js
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
```
There's also a lot of other helper methods and functions that I use for different features of my MVP. But it's like 800 lines of code and I don't really feel like explaining all of it.

For example, here's the method that I'm using to allow the user to [select](https://github.com/austinl1905/sep11-freedom-project/blob/main/src/App.js#L211) an atom:
```js
atomFolder.onFinishChange
(   ( target ) =>
    {   let targetValue = target.value.toLowerCase();
        let processedValue = targetValue.charAt(0).toUpperCase() + targetValue.slice(1);
        this.manager.resetAtom
        (   this.root,
            this.world,
            new Atom
            (
                ATOMS[processedValue].name, // Element Name
                ATOMS[processedValue].atomicNum, // Atomic Number
                ATOMS[processedValue].atomicMass, // Atomic Mass
                ATOMS[processedValue].atomicSymbol, // Atomic Symbol
                ATOMS[processedValue].electronConfig, // Electron Configuration
                rotateFolder.controllers[0].object.rotate, // Rotate boolean
                colorFolder.controllers[0].object.basic, // Colors boolean
            )
        )

        this.camera.position.z = this.manager.atom.bohrElectronShells[this.manager.atom.bohrElectronShells.length - 1].radius + 30;
        this.controls.maxDistance = this.manager.atom.bohrElectronShells[this.manager.atom.bohrElectronShells.length - 1].radius + 75;
        this.camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );

        atomDiv.textContent = `${this.manager.atom.name} (${this.manager.atom.atomicSymbol})`;
        atomNumDiv.textContent = `Atomic Number: ${this.manager.atom.atomicNum}`;
        atomMassDiv.textContent = `Isotope: ${this.manager.atom.atomicSymbol}-${this.manager.atom.atomicMass}`;

        atomLabel.position.set( 0, this.manager.atom.bohrElectronShells[0].radius + this.manager.atom.atomicNum / 20, 0 );
        atomNumLabel.position.set( 0, this.manager.atom.bohrElectronShells[0].radius + ( this.manager.atom.atomicNum / 20 ) - 3, 0 );
        atomMassLabel.position.set( 0, this.manager.atom.bohrElectronShells[0].radius + ( this.manager.atom.atomicNum / 20 ) - 6, 0 );

        triviaText.innerHTML = triviaPool[ Math.floor(Math.random() * triviaPool.length) ];
    }
)
```
Here, I have a method defined in the manager class called [`resetAtom`](https://github.com/austinl1905/sep11-freedom-project/blob/main/src/Components.js#L183) which takes in an instance of the atom class as a parameter. The user directly types in the name of the atom into the experimental GUI and that is accepted as an argument for the method. If the argument exists, then the method basically replaces the current atomic model with the one passed, otherwise, the manager just removes the entire atom. What I'm doing here is directly creating an instance of the atom class from an object, `ATOMS`, that has all of the data for each element. After that, I just reset some other parts of the model, like the labels and camera position.

That's more or less all of the important stuff. I don't think anyone really cares how I made a functioning loading screen (with no dependencies!!).

I'm currently at stage 7 of the Engineering Designing Process. By now I've made a fully functional MVP and I'm only adding features that aren't totally necessary for the project to work but just make it look a bit nicer.

I'm working on the skills organization and problem decomposition. As expected with such a large amount of code my project is becoming increasingly more difficult to maintain and I've been trying to figure out ways to organize it through modules, classes, and functions. I'm also working on problem decomposition. My project has a ton of parts in it and obviously I wouldn't have been able to make it this far if I tried to work on all of them at once.
[Previous](entry04.md) | [Next](entry06.md)

[Home](../README.md)
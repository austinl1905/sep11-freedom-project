# Tool Learning Log

Tool: **X**

Project: **X**

---

10/28/23:
* Necessary components for a three.js app:
    * Camera
    * Renderer
    * Scene
        * I'm not really sure what each of these do. But I'll figure it out soon enough

10/29/23:
* Attempted to refactor my code by organizing my constructors in functions. Did not end well so I will just have them all in function `init()` for now.
* Constructors look like this:
 ```js
const material = new THREE.MeshPhongMaterial(
			{color: 0x0032ff},
			{emissive: 0x072534},
			{side: THREE.DoubleSide},
			{flatShading: true }
		);
```
* Good thing I'm already used to OOP
* Subatomic particles in diagrams are usually represented as spheres. So I'll have to use the Sphere Geometry constructor.
* Different elements have different amounts of neutrons, protons, and electrons. I'll probably use recursion at some point to add all of my meshes in to make the code DRY.

10/13/23:

Lighting
- Directional light is self explanatory. Combine with ambient light for some nice textures

11/20/23

Shapes

- Spheres to represent neutrons and protons
- Torus to represent electron shells

Challenges:

- Figure out how to add lots of particles without a ton of code
- camera focuses on one particle only

11/26/23

Groups:
- Removes (most) of the headache that is adding lots of meshes
- Basically add meshes to the group which are added to the scene
- Objects are affected in the same way in the group
	- Ex: `group.position.x` will set the position for all meshes in that group
- https://www.youtube.com/watch?v=jVW-jvuZIFQ cool tutorial

12/3/23

- I got distracted watching cat videos but I did do some refactoring with the OOP knowledge I learned
- How the heck are you supposed to use OOP with a library

12/10/23

- Spot Light: Sort of like directional light but better. Takes in color and intensity as arguments just like other lights
- Torus Geometry: donuts are toruses apparently. Will be useful when I make my electron shell representations

12/17/23

- Figured out how to make stuff rotate about a point
- Figured out how to use loops to make multiple objects and rotate them
Next steps:
- clean up the code (seriously i can barely read this but i barely have any time to refactor it right now)
- Figure out how to efficiently add "protons" and "electrons" to my "nucleus"

<!--
* Links you used today (websites, videos, etc)
* Things you tried, progress you made, etc
* Challenges, a-ha moments, etc
* Questions you still have
* What you're going to try next
-->

12/31/23

So at this point Im kinda at a roadblock. bc I figured out how to make the orbits for electrons work and all that cool stuff buuuut theres still the nucleus. which is the hardest part. because theres lots of stuff that goes into it. How big the nucleus is, how im going to position the spheres inside the nucleus. Ive tried stuff like using instanced meshes and I have the basic idea of using a dummy mesh to position each sphere but the problem is how im going to position it, and how I can make it dynamic enough to adjust the size of the dummy for each different element.

1/7/24

POTENTIAL SOLUTION!!!!:
https://stackoverflow.com/questions/36317734/calculating-individual-spheres-position-to-create-a-sphere-made-of-spheres

Using cannon js (which is a lightweight physics engine) to position my spheres and stuff

1/15/24
wdjdawJV VNJMASDJK WE 89

ok

so as it turns out its like realllll difficult do that funny sphere stuff without a physics engine. LUCKILYT for me!! i can use cannon js

so heres a rundown of all the cool stuff you can do

- three and cannon can be used in conjuction if you copy the quaternions (???) and position of the physics body to the rendering mesh. GOOD STUFF!
- gravity is going to be real important in order to figure out how to shove all those spheres in one place

im sure theres more. cant find any tutorials though

and some things to figure out

- i have no idea if cannon-es (the one thats actually being updated) and cannon (the og) are compatible with each other. i guess ill hve to figuire it out the hard way
- making instanced meshes work with physics

and mueller i promise as soon as I get this stupid thing to work itll be smooth sailing with the css and stuff

1/28/24

physics adds like a whole new layer of complication I hate this

- i learned how to add multiple meshes copied to sphere bodies. You have to combine loops with recursion. It's kinda weird

Now, using this function and calling it on the sphere bodies in my animate function:

```function pullOrigin(body)
{
    body.force.set
    (
        -body.position.x,
        -body.position.y,
        -body.position.z
    );
}
```

I kind of got it to work. The spheres are kinda getting pulled to the center. It's not like super perfect or anything but iots progress

because heres the thing: the spheres kinda hover around for a bit and never fully stabilize near the origin (also its not really forming a big sphere at this point, more like just a plane)

and yeah even if i use a scaling factor to increase the gravitational force by like 10 trillion this effect still persists. why? i dont know becauase i never took physics

2/1/24

k it looks a little more like a sphere I just had to randomize the y position of the balls woohooooo

2/4/24

using a for loop I can use a conditional to make my meshes either "protons" or "neutrons". the problem is that this isn't very dynamic so it wil only work as a temporary solution.

atoms look alright as long as they have a lot of spheres in them but when you get to smaller atoms it gets wonkier because of the magnitutde of the force pulling them everywhere.

<video src="three-test/large_atom_demonstration.mp4" controls title="Large Atom"></video>

like look at this. atom for iodine. ok its a bit wobbly but it doesnt really move that much

<video src="three-test/small_atom_demonstration.mp4" controls title="Small Atom"></video>

then theres this. oxygen. you can clearly see it getting tossed around alot. not good

on the bright side... i figured out how to adjust the shininess of my meshes.... so they look a bit better at least...

soooo i guess from here it would be the most sensible thing to decide how to put the different things i've learned into a single coherent and functional project (after i fix the physics arghh)

2/5/24

tried adding an "anchor" proton to try to fix the bouncing around ... it kinda works but theres still a lot of spheres moving around the anchor itself

tried this event listener that would change the body type of the spheres to "Static" on collision, stopping them from moving around after they form the nucleus. this doesn't really work because if spheres collide on the way to the center they stop moving, creating a figure that doesn't resemble a sphere at all

```
sphereBody.addEventListener
("collide", function()
    {
        sphereBody.type = CANNON.Body.STATIC;
    }
)
```

3/3/24

YOU NEED DAMPING TO FIX THE PERPETUAL MOTION

its not my fault i never learned physics ;(

no more dumb anchor bodies i suppose

also.... Refactored a LOT of my code with classes (see src/modules/obj.js). Everything you could possibly think of is a class now. Protons, electrons, neutrons, managers, managers for managers, apps, you get the idea

still working on a way to dynamically add electrons - there are things called valence shells so you can assume that shells below the valence shells are always completle filled with electrons - which will be a VERY helpful assumptiomn when it comes around to doing that

though my refactored code is up to 358 lines of code and im not even done yet ... I better modularize this before it turns into a big mess

3/10/24

worked on trying to add the methods and properties and stuff fo rthe electrons now that im donw with the nuclei

successfully added support for the FIRST ELECTRON SHELL!!!! 6 MORE TO GO!!!!

there hasn't been much 'learning' done recently .... just 'doing'... sooo dunno what to put here. refer to obj.js in the modules folder

3/24/24

THIS ISNT WORKINGGG!!!!!!!!!

SEEING AS I ALREADY HAVE MY MVP DONE. ILL JUST BE DOING A LITTLE BIT OF REFACTORING BC FRANKLY WHAT I HAVE RN IS 600 LINES OF NONSENSE THAT ONLY WORKS BECAUSE I HAVENT TRIED ADDING ANYTHING STUPID YET

for example I dont need a bunch of managers. with a little bit more math I made one manager that is compatible with every atom class
```js
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
```

and I also made another realization. in terms of its 3d model, just how much does an atom really change? maybe I could have a single base class that takes in many arguments and uses those to make the atom. And i could get those arguments from an API for each element

and i didnt really need a class for each electron shell either! just take in its radius as an argument too:

```js
class ElectronShell
{   constructor(radius)
    {   this.radius = radius;
        this.mesh = new THREE.Mesh
        (   new THREE.TorusGeometry(this.radius, 0.05),
            new THREE.MeshBasicMaterial()
        )
    }
}
```

4/1/24

mr mueller. i dont know why the last learning log entry didnt push but i swear i did it.

anywaysy. I finally figured out a more dynamic way to add my electrons. saves a ton of code and it's way more efficient. check class.js in the modules folder
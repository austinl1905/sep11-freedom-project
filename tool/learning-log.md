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

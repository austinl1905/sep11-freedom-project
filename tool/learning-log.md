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


<!--
* Links you used today (websites, videos, etc)
* Things you tried, progress you made, etc
* Challenges, a-ha moments, etc
* Questions you still have
* What you're going to try next
-->

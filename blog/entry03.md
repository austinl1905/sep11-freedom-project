# Entry 3
##### 2/11/24

In the previous blog entry, I mentioned how I was able to use trigonometry in order to position different meshes to mimic electron shells. What I didn't realize at the time, however, was that this would be one of the easier tasks for my project. While merely creating, positioning, and animating these "electrons" was actually pretty easy, dealing with the nucleus of my atom would be much harder. These were my following requirements for creating something that at least resemble one:

- Cannot be hollow. Because frankly, that really wouldn't make much sense.
- Has to kinda look like a sphere
- Contain two different colored sphere meshes together

Based on these requirements, there was pretty much no hope of using math to make this thing. I mean, there might be some obscure hacky algorithm some bored programmer came up with in the depths of the World Wide Web, but I've already done my own searching for something like that. According to Bradford's law, information related to this topic is disproportionately high in a relatively small number of sources. After you move away from these sources, the chances of finding something that's actually relevant decreases exponentially.

IN CONCLUSION.... it was pretty much pointless to try to find a solution that used pure math and Three.js.

However... I was convinced that if there were such simulations that were able to achieve this sort of thing, then it of course HAD to be possible. I just had to change how I was going about this problem. 

No. Just kidding. I just refined my search and found exactly what I needed on a <a href="https://stackoverflow.com/questions/36317734/calculating-individual-spheres-position-to-create-a-sphere-made-of-spheres">Stack Overflow thread</a>. lol

In order to achieve the effect of spheres getting pulled into to create a nucleus, the easiest way would be to install a physics engine. I used <a href="https://schteppe.github.io/cannon.js/">Cannon.js</a> since it's lightweight and was actually written in JS instead of being ported from CPP or something. Figured it would be easier to work with. 

Of course, I'm not naive enough to just copy and paste whatever I found on that thread into my code. I did actually learn the basics of cannon first.

Cannon and Three are supposed to work together. Three provides the rendering while Cannon handles the physics, of course. In order to connect them, you have to copy the position and quaternions of the Cannon "bodies" to the Three "meshes" in the animation loop. What are quaternions, exactly? To be honest, I don't really know. But they're prominent in 3D modeling, apparently. Here's an example:

```js
animate()
{
  mesh.position.copy(body.position);
  mesh.quaternion.copy(body.quaternion);
}
```
It took some work to get my code to work at first, but I'll explain it thoroughly. I had to use a function that would apply a negative force to the item it was called on, bringing it to the center: 

```js
function pullOrigin(body)
{
    body.force.set
    (
        -body.position.x * 100,
        -body.position.y * 100,
        -body.position.z * 100
    );
}
```

And then include it in my animation loop. Recall that I also need to call this function on many bodies (as each body represents a proton or neutron). The easiest way to do this would be to make an array of bodies and meshes, and iterate through it while calling this function on each one. 

The initial position of the bodies were also important. Since the force exerted on each axis was equal, I had to randomly position each body on the x, y, and z axis so that they did not end up creating a "plane" and instead accumulated at (0, 0, 0), creating a shape that looked like a proper sphere:

```js
const sphereBody = new CANNON.Body
(
    {
        mass: 5,
        shape: new CANNON.Sphere(1),
        position: new CANNON.Vec3(Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5),
        // position: new CANNON.Vec3(0, 0, 0)
    }
);
```

From here I can make a loop in my `init()` method so I have an array of spheres ready to get pulled to the center:

```js
// # of nucleons and neutrons for Iodine
let nNucleons = 127
let nNeutrons = 74;

for (let i = 0; i < nNucleons; i++)
{
    // Body to be used for protons and electrons
    const sphereBody = new CANNON.Body
    (
        {
            mass: 5,
            shape: new CANNON.Sphere(1),
            position: new CANNON.Vec3(Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5),
        }
    );

    let sphereMesh;

    if (i < nNeutrons)
    {
        sphereMesh = new THREE.Mesh(new THREE.SphereGeometry(1), neutronMaterial); // Neutron Material
    }
    else
    {
        sphereMesh = new THREE.Mesh(new THREE.SphereGeometry(1), protonMaterial); // Proton Material
    }

    this.scene.add(sphereMesh);
    this.world.addBody(sphereBody);

    this.sphereMeshes.push(sphereMesh); // Sphere mesh array
    this.sphereBodies.push(sphereBody); // Sphere body array
}
```

Then use this following code in my animation loop:

```js
for (let i = 0; i < this.sphereBodies.length; i++)
{
    this.sphereMeshes[i].position.copy(this.sphereBodies[i].position);
    this.sphereMeshes[i].quaternion.copy(this.sphereBodies[i].quaternion);
    pullOrigin(this.sphereBodies[i]);
}
```

Which achieves this:

https://github.com/austinl1905/sep11-freedom-project/assets/114597547/cffda81f-4615-4cf3-aaa9-d2a622fbccf3

https://github.com/austinl1905/sep11-freedom-project/assets/114597547/e5a7c559-6815-461b-a35b-3f8a38fe2857

At this point I want to learn more ways to optimize my code and integrate what I have just learned with the rest of the knowledge about my tool. I feel that I'm getting pretty close to being able to make an actual prototype for my project. From here on I don't think theres much to learn apart from some extra features of my tools that I want to implement if I manage to finish my MVP.

Based on that, I think I'm at step 5 of the engineering design process: creating a prototype with my plan and all of the knowledge of the two tools I'm using.

I'm also working on the skills problem decomposition and how to google. I had to refine my searches by alot in order to find what I needed. I'm also taking the approach of breaking down my learning into different parts and then combining what I've learned from each of them in order to make something coherent.

[Previous](entry02.md) | [Next](entry04.md)

[Home](../README.md)

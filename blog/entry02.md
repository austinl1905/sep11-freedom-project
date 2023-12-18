# Entry 2
##### 12/17/23

Since the last blog, I've done some learning. Mostly within the span of a week, because to be honest I was kind of just sitting around for a month doing pretty much nothing. But I've redeemed myself. Because at this point I don't think I need to learn much more before I can start on my actual MVP. I've also swapped out my directional lights for spot lights, and I'm pretty satisfied with how the lighting looks now.

First off. That mess in the three-test subdirectory? I'll get around to fixing it ASAP so it becomes actually readable. But there's one thing I've learned that is important for my project - which is manipulating the rotation and so called "orbit" of objects.

Anyone could just write this kind of code within 5 minutes of learning three:
```js
function animate() {
	requestAnimationFrame( animate );

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	renderer.render( scene, camera );
}
```

But that's not the kind of animate I mean. Here's the primary problem that I was facing:

- How can I position my electrons in a way that they can "orbit" around my nucleus model?

To start, I created a few maps in my constructor, so if I decide I don't like something and want to change it, I won't have to change like 29 lines of code manually. I'll use them later.

```js
this.torusRadii = new Map
(
    [
        ['sub1', 10],
        ['sub2', 15],
        ['sub3', 20]
    ]
);
this.particleSizes = new Map
(
    [
        ['electron', 0.075],
        ['nucleon', 1]
    ]
);
this.particleSpeeds = new Map
(
    [
        ['electron', 0.5],
    ]
);
```

I'm not going for a totally accurate atomic model just yet. Just the one that most people are familiar with. Pretty much just a nucleus with electrons that appear to be "orbiting" it(I'm not going to explain the quantum mechanics behind why this isn't actually what atoms are like. It's very interesting though, so research it if you have the time).

The most common representation of these "shells" are with rings (tori). Luckily, this is a default type of [Geometry](https://threejs.org/docs/#api/en/geometries/TorusGeometry) in three, so it's simple to add:

```js
const shell1Geometry = new THREE.TorusGeometry(
    this.torusRadii.get('sub1'),
    0.025,
)
const shell2Geometry = new THREE.TorusGeometry(
    this.torusRadii.get('sub2'),
    0.025
)
const shellMaterial = new THREE.MeshBasicMaterial
(
    {color: 0xffffff}
)
const torus1 = new THREE.Mesh( shell1Geometry, shellMaterial );
const torus2 = new THREE.Mesh( shell2Geometry, shellMaterial );
```

There's probably a better way to do this for lots of shells. But right now I need to focus on actually learning my tool.

Now for the electrons. Besides creating the basic geometry and material for them, I also needed to figure out how to add a lot of them efficiently. Right now the hierarchy currently looks something like this:

- App
    - Atom
        - Nucleus
            - Proton
            - Neutron
        - Shell 1
            - Torus 1
        - Shell 2
            - Torus 2

Inside of each shell I could create a group that would be the parent of all of my electrons. Then I could use a loop to add all of those electrons:

```js
this.electrons1 = new THREE.Group();
for (let i = 0; i < 2; i++)
{
    const electron = new THREE.Mesh( electronGeometry, electronMaterial);
    this.electrons1.add(electron);
}
```

This alone doesn't work though. I want the electrons to be equidistant from each other as well, and be aligned with the torus. This is where the `torusRadii` map comes in, because that's how I'm going to position the electrons.

For this part, I needed some math. I needed to recall the arguments for setting an object's position is `obj.position.set(x, y, z)`.

Y is always going to be zero because I'm placing the electrons on a plane. X and Z, however, always have to change based on the given radius and angle of the electron.

Since I'm dealing with circles, I needed to do position my electrons based on polar coordinates. I'm not a math person. This [article](https://www.khanacademy.org/computing/computer-programming/programming-natural-simulations/programming-angular-movement/a/polar-coordinates) helped me to get the basic idea of it though. Therefore, I can represent x and z with:

$$
x = r * cos(θ)
$$

$$
z = r * sin(θ)
$$

Since I want each electron to be equally distanced from each other, the angle is dependent on the number of objects that I want to add multiplied by tau:

`let angle = (i / 2) * Math.PI * 2;`

I have to substitute y for z here. The radius is going to be the same as the radius of the torus, so that's covered. I can just access it from the map I created earlier.

After that, I can add the rest of my code to the loop:
```js
this.electrons1 = new THREE.Group();
for (let i = 0; i < 2; i++)
{
    const electron = new THREE.Mesh( electronGeometry, electronMaterial);
    // Calculate the angle for the electron's position in polar coordinates
    let angle = (i / 2) * Math.PI * 2;
    // Calculate the X and Z coordinates for the electron's position based on the angle
    let orbitX = Math.cos(angle) * this.torusRadii.get('sub1');
    let orbitZ = Math.sin(angle) * this.torusRadii.get('sub1');
    // Set the position of the electron in 3D space
    electron.position.set(orbitX, 0, orbitZ);
    this.electrons1.add(electron);
}
```

I'm not done yet though, because I still have to animate them orbiting.

It's mostly the same idea. Iterate through the children of the group with electrons, update the angle so that they are equidistant, and rotate it based on the current time, updated angle, and a given speed.

```js
this.electrons1.children.forEach((object, index) =>
{
    let angle = (index / 2) * Math.PI * 2;
    let orbitX = Math.cos(time * this.particleSpeeds.get('electron') + angle) * this.torusRadii.get('sub1');
    let orbitZ = Math.sin(time * this.particleSpeeds.get('electron') + angle) * this.torusRadii.get('sub1');

    object.position.set(orbitX, 0, orbitZ);
});
```

Hopefully that's the most trig I'll ever have to do for this project.

I'm kind of between step 4 and 5 right now. I'm working on a basic prototype for my project while still learning my tool (In this case I can do both at the same time). Worst case scenario, my project is going to be some lame model of a single atom. But it's not going to come to that. Hopefully.

I'm working on the skills time management and organization. My primary issues from now are optimizing and organizing my code so that it's both readable and efficient. I also need a better system for learning and working on my project so I'm not scrambling to learn so much in a short period of time. 

[Previous](entry01.md) | [Next](entry03.md)

[Home](../README.md)
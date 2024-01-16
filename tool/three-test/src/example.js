import * as THREE from 'three';
import * as CANNON from 'cannon';

let scene = new THREE.Scene();
let world = new CANNON.World();
world.broadphase = new CANNON.NaiveBroadphase();
world.solver.iterations = 5;

let camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

let renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

function Proton(){
	let radius = 1;

	return {
		// Cannon
		body: new CANNON.Body({
			mass: 1, // kg
			position: randomPosition(6),
			shape: new CANNON.Sphere(radius)
		}),
		// THREE
		mesh: new THREE.Mesh(
			new THREE.SphereGeometry( radius, 32, 32 ),
			new THREE.MeshPhongMaterial( { color: 0xdd5555, specular: 0x999999, shininess: 13} )
		)
	}
}

function Neutron(){
	let radius = 1;

	return {
		// Cannon
		body: new CANNON.Body({
			mass: 1, // kg
			position: randomPosition(6),
			shape: new CANNON.Sphere(radius)
		}),
		// THREE
		mesh: new THREE.Mesh(
			new THREE.SphereGeometry( radius, 32, 32 ),
			new THREE.MeshPhongMaterial( { color: 0x55dddd, specular: 0x999999, shininess: 13} )
		)
	}
}

function Electron(){
	let radius = 0.2;

	return {
		// Cannon
		body: new CANNON.Body({
			mass: 0.5, // kg
			position: randomPosition(10),
			shape: new CANNON.Sphere(radius)
		}),
		// THREE
		mesh: new THREE.Mesh(
			new THREE.SphereGeometry( radius, 32, 32 ),
			new THREE.MeshPhongMaterial( { color: 0xdddd55, specular: 0x999999, shininess: 13} )
		)
	}
}

function randomPosition(outerRadius){
	let x = (2 * Math.random() - 1 ) * outerRadius,
		y = (2 * Math.random() - 1 ) * outerRadius,
		z = (2 * Math.random() - 1 ) * outerRadius
	return new CANNON.Vec3(x, y, z);
}

function addToWorld(object){
	world.add(object.body);
	scene.add(object.mesh);
}

// create our Atom
let protons = Array(5).fill(0).map( () => Proton() );
let neutrons = Array(5).fill(0).map( () => Neutron() );
let electrons = Array(15).fill(0).map( () => Electron() );

protons.forEach(addToWorld);
neutrons.forEach(addToWorld);
electrons.forEach(addToWorld);


let light = new THREE.AmbientLight( 0x202020 ); // soft white light
scene.add( light );

let directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
directionalLight.position.set( -1, 1, 1 );
scene.add( directionalLight );

camera.position.z = 18;

const timeStep = 1/60;

//Small impulse on the electrons to get them moving in the start
electrons.forEach((electron) => {
	let centerDir = electron.body.position.vsub(new CANNON.Vec3(0, 0, 0));
	centerDir.normalize();
	let impulse = centerDir.cross(new CANNON.Vec3(0, 0, 1));
	impulse.scale(2, impulse);
	electron.body.applyLocalImpulse(impulse, new CANNON.Vec3(0, 0, 0));
});

function render () {
	requestAnimationFrame( render );

	// all particles pull towards the center
	protons.forEach(pullOrigin);
	neutrons.forEach(pullOrigin);
	electrons.forEach(pullOrigin);

	// electrons should also be pushed by protons and neutrons
	electrons.forEach( (electron) => {
		let pushForce = new CANNON.Vec3(0, 0, 0 );

		protons.forEach((proton) => {
			let f = electron.body.position.vsub(proton.body.position);
			pushForce.vadd(f, pushForce);
		});

		neutrons.forEach((neutron) => {
			let f = electron.body.position.vsub(neutron.body.position);
			pushForce.vadd(f, pushForce);
		});

		pushForce.scale(0.07, pushForce);
		electron.body.force.vadd(pushForce, electron.body.force);
	})

	// protons and neutrons slows down (like wind resistance)
	neutrons.forEach((neutron) => resistance(neutron, 0.95));
	protons.forEach((proton) => resistance(proton, 0.95));

	// Electrons have a max velocity
	electrons.forEach((electron) => {maxVelocity(electron, 5)});

	// Step the physics world
	world.step(timeStep);
	// Copy coordinates from Cannon.js to Three.js
	protons.forEach(updateMeshState);
	neutrons.forEach(updateMeshState);
	electrons.forEach(updateMeshState);

	renderer.render(scene, camera);
};

function updateMeshState(object){
	object.mesh.position.copy(object.body.position);
	object.mesh.quaternion.copy(object.body.quaternion);
}

function pullOrigin(object){
	object.body.force.set(
		-object.body.position.x,
		-object.body.position.y,
		-object.body.position.z
	);
}

function maxVelocity(object, vel){
	if(object.body.velocity.length() > vel)
		object.body.force.set(0, 0, 0);
}

function resistance(object, val) {
	if(object.body.velocity.length() > 0)
		object.body.velocity.scale(val, object.body.velocity);
}
render();
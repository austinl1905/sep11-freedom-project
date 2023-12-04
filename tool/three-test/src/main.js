import * as THREE from 'three'

class App
{
    constructor()
    {
        this.camera;
        this.scene;
        this.renderer;
    }

    init()
    {
        this.camera = new THREE.PerspectiveCamera
		(
			70, window.innerWidth / window.innerHeight, 0.01, 20
		);
        this.camera.position.z = 10;

        this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color( 0x333333 );

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( this.renderer.domElement );

        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        const cube = new THREE.Mesh( geometry, material );
        this.scene.add( cube );

        this.animate();
    }

    animate()
    {
        requestAnimationFrame(  );
	    this.renderer.render( this.scene, this.camera );
    }
}

const app = new App();
app.init();
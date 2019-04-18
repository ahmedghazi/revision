import React, { Component } from 'react';
import * as THREE from "three";
const OrbitControls = require("three-orbit-controls")(THREE);

class Obj3d extends Component {
    constructor(props) {
        super(props);
        this.animate = this.animate.bind(this);
        this.addCube = this.addCube.bind(this);
        this.initializeCamera = this.initializeCamera.bind(this);
        this.initializeOrbits = this.initializeOrbits.bind(this);
    }

    componentDidMount() {
        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha:true });
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.renderer.setSize(width, height);
        this.mount.appendChild(this.renderer.domElement);
        this.initializeOrbits();
        this.initializeCamera();
        
        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        const material = new THREE.MeshBasicMaterial( { color: 0xf0000ff } );
        this.cube = new THREE.Mesh( geometry, material );
        this.scene.add( this.cube );
        this.animate();
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.frameId);
        this.mount.removeChild(this.renderer.domElement);
    }

    initializeOrbits() {
        this.controls.rotateSpeed = 1.0;
        this.controls.zoomSpeed = 1.2;
        this.controls.panSpeed = 0.8;
    }

    initializeCamera() {
        this.camera.position.x = 0;
        this.camera.position.y = 0;
        this.camera.position.z = 4;
    }

    animate() {
        this.frameId = window.requestAnimationFrame(this.animate);
        this.renderer.render(this.scene, this.camera);

        this.cube.rotation.x += 0.01;     
        this.cube.rotation.y += 0.01;
    }

    addCube(cube) {
        this.scene.add(cube);
    }

    render() {
        return (
            <div>
                <div
                    id="boardCanvas"
                    style={{ width: "30vw", height: "30vh" }}
                    ref={mount => {
                        this.mount = mount;
                    }}
                    />
            </div>
        );
    }
}

export default Obj3d;
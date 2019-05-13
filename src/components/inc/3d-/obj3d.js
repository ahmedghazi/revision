import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import * as THREE from "three";
const OrbitControls = require("three-orbit-controls")(THREE);

class Obj3d extends Component {
    constructor(props) {
        super(props);
        this.animate = this.animate.bind(this);
        //this.addCube = this.addCube.bind(this);
        this.initializeCamera = this.initializeCamera.bind(this);
        this.initializeOrbits = this.initializeOrbits.bind(this);

        this._onClick = this._onClick.bind(this)
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
        
        // const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        // const material = new THREE.MeshBasicMaterial( { color: 0xf0000ff } );
        // this.cube = new THREE.Mesh( geometry, material );
        // this.scene.add( this.cube );

        const geometry = new THREE.SphereGeometry(1, 12, 12, 0, Math.PI * 2, 0, Math.PI * 2);
        const material = new THREE.MeshNormalMaterial({
            color: 0xF3A2B0,
            wireframe: true
        });

        this.cube = new THREE.Mesh(geometry, material);
        this.scene.add(this.cube);

        // const _geometry = new THREE.SphereGeometry( 5, 32, 32 );
        // const _material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
        // this.sphere = new THREE.Mesh( _geometry, _material );
        // this.scene.add( this.sphere );
        // console.log(this.sphere)
   
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

    // addCube(sphere) {
    //     this.scene.add(sphere);
    // }

    _onClick(){
        PubSub.publish('MENU_OPEN', {})
    }

    render() {
        return (
            <div id="obj3d">
                <div
                    id="boardCanvas"
                    style={{ width: "20vw", height: "20vw" }}
                    onClick={() => this._onClick()}
                    ref={mount => {
                        this.mount = mount;
                    }}
                    />
            </div>
        );
    }
}

export default Obj3d;
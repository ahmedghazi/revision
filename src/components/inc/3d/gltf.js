import React, { Component } from 'react';
import * as THREE from 'three';
//import GLTFLoader from 'three-gltf-loader';
import GLTFLoader from './react-3d-viewer/loader'

import PubSub from 'pubsub-js';

class Gltf extends Component {
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
        //this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.renderer.setSize(width, height);
        this.mount.appendChild(this.renderer.domElement);
        //this.initializeOrbits();
        this.initializeCamera();
        
        // const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        // const material = new THREE.MeshBasicMaterial( { color: 0xf0000ff } );
        // this.cube = new THREE.Mesh( geometry, material );
        // this.scene.add( this.cube );

        // const geometry = new THREE.SphereGeometry(1, 12, 12, 0, Math.PI * 2, 0, Math.PI * 2);
        // const material = new THREE.MeshNormalMaterial({
        //     color: 0xF3A2B0,
        //     wireframe: true
        // });

        // this.cube = new THREE.Mesh(geometry, material);
        // this.scene.add(this.cube);

        // const _geometry = new THREE.SphereGeometry( 5, 32, 32 );
        // const _material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
        // this.sphere = new THREE.Mesh( _geometry, _material );
        // this.scene.add( this.sphere );
        // console.log(this.sphere)
        this._loadGltf()
        //this.animate();
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.frameId);
        this.mount.removeChild(this.renderer.domElement);
    }

    _loadGltf(){
        const {src, texture} = this.props
        // manager
        // var manager = new THREE.LoadingManager(  );
        
        // // matcap
        // var TextureLoader = new THREE.GLTFLoader( manager );
        // var matcap = TextureLoader.load( texture, function () {
        //     matcap.encoding = THREE.sRGBEncoding;
        // } );
        
        // model
        const self = this
        var loader = new THREE.GLTFLoader();
        //manager.itemStart( 'foo' );
        loader.load(src, (gltf) => {
            //manager.itemEnd( 'foo' );
            //console.log(gltf.scene);
            // var mesh = gltf.scene.children[ 0 ];
            // mesh.material = new THREE.MeshMatcapMaterial( {
            //     color: '0xffff00',
            //     matcap: matcap
            // } );
            // self.scene.add( mesh );
            self.scene.add( gltf.scene );

            PubSub.publish('3D_LOADED')
        }, undefined, (e) => console.error(e));

        // loader.load( src, function ( gltf ) {

        //     var mesh = gltf.scene.children[ 0 ];
        //     //console.log(matcap)
        //     mesh.material = new THREE.MeshMatcapMaterial( {
        //         color: '0xffff00',
        //         matcap: matcap
        //     } );

        //     self.scene.add( gltf.scene );
        //     PubSub.publish('3D_LOADED')
        // } );
    //     const loader = new GLTFLoader();
    //     loader.load(
    //         src,
    //         ( gltf ) => {
    //             console.log(gltf)
    //             // called when the resource is loaded
    //             const mesh = gltf.scene.children[ 0 ];
    //             mesh.material = new THREE.MeshMatcapMaterial( {
    //                 color: '0xffffff',
    //                 matcap: matcap

    //             } );

    //             this.scene.add( mesh );
    //             PubSub.publish('3D_LOADED')
    //         },
    //         ( xhr ) => {
    //             // called while loading is progressing
    //             console.log( `${( xhr.loaded / xhr.total * 100 )}% loaded` );
    //         },
    //         ( error ) => {
    //             // called when loading has errors
    //             console.error( 'An error happened', error );
    //         },
    //     );
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

        // this.cube.rotation.x += 0.01;     
        // this.cube.rotation.y += 0.01;
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
                    style={{ width: "300", height: "300" }}
                    onClick={() => this._onClick()}
                    ref={mount => {
                        this.mount = mount;
                    }}
                    />
            </div>
        );
    }
}

export default Gltf;
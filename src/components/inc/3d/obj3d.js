import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import * as THREE from "three";
import {MTLLoader,OBJLoader} from './react-3d-viewer/loader';
//const OrbitControls = require("three-orbit-controls")(THREE);

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
        //this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.renderer.setSize(width, height);
        this.mount.appendChild(this.renderer.domElement);
        //this.initializeOrbits();
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
        //this.scene.add(this.cube);

        // const _geometry = new THREE.SphereGeometry( 5, 32, 32 );
        // const _material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
        // this.sphere = new THREE.Mesh( _geometry, _material );
        // this.scene.add( this.sphere );
        // console.log(this.sphere)
        this.load3dModel()
        this.animate();
        if(this.obj3d){
        
            if(!this.group.children.length){
              this.group.add(this.obj3d)
            }

            this.group.rotation.x += 0.001;     
            this.obj3d.rotation.y += 0.005;
        }

    }

    componentWillUnmount() {
        cancelAnimationFrame(this.frameId);
        this.mount.removeChild(this.renderer.domElement);
    }

    loadObj(){
        var {src,mtl,texPath} = this.props;
 console.log(src, mtl)
        if(!src || !mtl) return false
    
        var mtl_loader =  new THREE.MTLLoader()
        var obj_loader = new THREE.OBJLoader()
    
        mtl_loader.setTexturePath(texPath)
    
        mtl_loader.load(mtl, materials => {
            materials.preload();
        
            obj_loader.setMaterials( materials )
            .load(src, obj3d =>{
                var bound_box = this.computeBoundingBox(obj3d);
                // debugger
                var front = bound_box.max;
                var cz = bound_box.max.z - bound_box.min.z;
        
                this.camera.position.set(0, 0, front.z + cz*1.5);
        
                //this.listen()
                //this.initControl()
                this.scene.add(obj3d);
                this.obj3d = obj3d;
                PubSub.publish('3D_LOADED')
                //this.props.onLoad && this.props.onLoad()
            }, (xhr)=>{
                //this.props.onProgress && this.props.onProgress(xhr)
            });
    
        });
    }

    load3dModel(){

        var {src,texPath} = this.props;
        console.log(src)
        if(!src) return false
    
        // model
        var loader = new THREE.GLTFLoader();
        // debugger
        loader.load(src, data => {
    
          this.obj3d = data.scene;
          // debugger
          // Add the objects to the scene 
          //this.scene.add(data.scene);
          // debugger
          // Look for a camera and lighting
          var result = {};
          data.scene.traverse( n=> { 
            // traverseScene(n, result);
            if (n instanceof THREE.Camera) {
              if (!result.cameras)
                result.cameras = [];
              
              result.cameras.push(n);
            }
            // Look for lights
            if (n instanceof THREE.Light) {
              if (!result.lights)
                result.lights = [];
              
              result.lights.push(n);
            }
    
          });
    
          if (result.cameras && result.cameras.length){
            this.camera = result.cameras[0];
            this.camera.position.copy( 
              this.camera.position.clone().add(new THREE.Vector3(0,0,.01))
            )
    
          }else {
            // Find a good camera position based on the size of the scene
            
            let boundingBox = this.computeBoundingBox(data.scene);
            let front = boundingBox.max;
            let cz = boundingBox.max.z - boundingBox.min.z;
            // debugger
            this.camera.position.set(front.x, front.y, front.z+cz*0.6);
            
          }
          
          if (result.lights && result.lights.length) {
          }
          else{ }
          
          this.initControl()
    
    
          this.props.onLoad && this.props.onLoad()
          // gltf.animations; // Array<THREE.AnimationClip>
          // gltf.scene; // THREE.Scene
          // gltf.scenes; // Array<THREE.Scene>
          // gltf.cameras; // Array<THREE.Camera>
          // gltf.asset; // Object
    
        }
        ,(xhr)=>{
          this.props.onProgress && this.props.onProgress(xhr)
          // console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        }
        ,()=>{
          console.log( 'An error happened' );
        }
      );
    }
    // Compute the bounding box of an object or hierarchy of objects
    computeBoundingBox(obj) {
	if (obj instanceof THREE.Mesh) {
		var geometry = obj.geometry;
		if (geometry) {
			if (!geometry.boundingBox) {
				geometry.computeBoundingBox();
			}
			
			var geometryBBox = geometry.boundingBox;
			obj.updateMatrix();
			geometryBBox.applyMatrix4(obj.matrix);
			return geometryBBox;
		}
		else {
			return new THREE.Box3(new THREE.Vector3, new THREE.Vector3);
		}
	}
	else {
		var i, len = obj.children.length;
		var boundingBox = new THREE.Box3(new THREE.Vector3, new THREE.Vector3);
		
		for (i = 0; i < len; i++) {
			var bbox = this.computeBoundingBox(obj.children[i]);
			if ( bbox.min.x < boundingBox.min.x ) {
				boundingBox.min.x = bbox.min.x;
			}
			
			if ( bbox.max.x > boundingBox.max.x ) {
				boundingBox.max.x = bbox.max.x;
			}
			if ( bbox.min.y < boundingBox.min.y ) {
				boundingBox.min.y = bbox.min.y;
			}
			
			if ( bbox.max.y > boundingBox.max.y ) {
				boundingBox.max.y = bbox.max.y;
			}
			if ( bbox.min.z < boundingBox.min.z ) {
				boundingBox.min.z = bbox.min.z;
			}
			
			if ( bbox.max.z > boundingBox.max.z ) {
				boundingBox.max.z = bbox.max.z;
			}
		}
		obj.updateMatrix();
		boundingBox.applyMatrix4(obj.matrix);
		return boundingBox;
	}
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

import React from 'react';
import * as THREE from 'three';
import {DirectionLight as directionligth, AmbientLight as ambientlight} from './light'
import {MTLLoader,OBJLoader} from './loader';
// directionligth;
// ambientlight;
// debugger

import Tick from './tick'
// Tick('model')

var GlEment = {
  directionligth:{
    create({color,position,castShadow}={}){

     
      var direction_light = new THREE.DirectionalLight( new THREE.Color(color), .95 );
     
      direction_light.position.set( position.x,position.y,position.z );
      //direction_light.position.set( -30,30,30 );
     // debugger;

      direction_light.castShadow = castShadow;
      //console.log(color);


      return direction_light;

      
    }
  }
  ,ambientlight:{
    create({color}={}){
      var ambient_light = new THREE.AmbientLight(new THREE.Color(color));
      //debugger;
      return ambient_light;
    }
  }
  ,spotlight:{
    create(...args){

    }
  }
}

// Compute the bounding box of an object or hierarchy of objects
var computeBoundingBox = function(obj) {
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
			var bbox = computeBoundingBox(obj.children[i]);
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

//debugger
class Model extends React.Component{
  static defaultProps = {
    width:500
    ,height:500
    ,antialias:true
    ,loader: ''
    ,baseUrl:''
    ,texPath:''
    ,position: {x:0, y: 0, z: 0}
    ,scale: {x:1, y:1, z: 1}
    ,rotation: {x:0, y: 0, z: 0}
    ,background:'rgb(255,255,255)'
    // enableKeys,enableRotate,enableZoom,enabled
    ,enableKeys: true
    ,enableRotate: true
    ,enableZoom: true
    ,enabled: true
  }

  constructor(props){
    //debugger
    super(props);

    //<Model/>
    //React.cloneElement(props.children)
    //React.createElement(<DirectionLight/>)
    //this.obj3d;
    //this.src;
    this.state = {
      lights:[]
    }
    this.lights = [];

    this.group = new THREE.Group()

   // debugger
  }
 
  render(){
    var {lights} = this.state;
    return (
      <div  ref={node=>this.$container=node} data-loader={this.props.loader} 
        style={this.style()}
      >
        {
          
        }
      </div>

    )
  }
  get array_children(){
    //debugger;

    if(!this.props.children) return [];
    if(!(this.props.children instanceof Array)) return [this.props.children];
    return this.props.children;

  }
  get need_children_lights(){

    if(
      this.array_children.filter((o)=>{
        return /directionligth|ambientlight|spotlight/.test(o.props.__constructor)
      }).length
    ){
      return true;
    }

    return false;
  }

 
  componentDidUpdate(){
    //console.log(this.props)
    if(!this.obj3d) return false

    var {src,background,width,height} = this.props;
  
    // console.log(this.props.position);

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize( width, height );

    const {enableKeys,enableRotate,enableZoom,enabled} = this.props;
    
    // Object.assign(this.orbit_controls,{
    //   enableKeys
    //   ,enablePan : true
    //   ,enableRotate
    //   ,enableZoom
    //   ,enabled
    // })

    
    if(typeof this.src!='undefined' && this.src!=src){
      
      this.src = src
      this.remove3dModel();
      this.load3dModel();

    }

    this.lights.forEach((light)=> this.scene.remove(light));
    this.lights = [];

    // console.log()
    
    this.addLight('ambientlight',ambientlight.defaultProps);

    if(this.need_children_lights){
      

      this.addChildrenLights();

      // console.log(this.lights);
    }else{

      this.addLight('directionligth',directionligth.defaultProps);
      
    }

   
    // console.log(this.lights.length)
    // console.log('didupdate!',this.props)

  }
  componentWillUnmount(){
    this.tick.animate = false

  }

  

  componentDidMount(){
    // debugger
    // return

    var {width,height,antialias,background} = this.props;

    this.scene = new THREE.Scene();
    //this.camera = new THREE.PerspectiveCamera(45,width/height,.1,8888);
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({
      antialias,
      alpha: true
    });

    //console.log(background);
    //this.renderer.setClearColor(new THREE.Color(background));
    this.renderer.setSize(width,height);

    this.$container.appendChild(this.renderer.domElement);

    this.scene.add(this.group)
    //this.camera.position.set(0,0,.1)

    this.camera.position.set( 0, 0, .1 );

    this.createDefaultLight();


    let {position, rotation, scale} = this.props;

    this.group.position.copy( 
      new THREE.Vector3(position.x, position.y, position.z) 
    )
    this.group.rotation.set(rotation.x,rotation.y,rotation.z)
    this.group.scale.set(scale.x,scale.y,scale.z)


    this.load3dModel();

    this.tick = Tick(()=>{

      this.renderer.render(this.scene,this.camera);

      if(this.obj3d){
        
        if(!this.group.children.length){
          this.group.add(this.obj3d)
        }
        // console.log(this.group.children.length)

        // let {position, rotation, scale} = this.props;
        // // console.log(position)
        // this.group.position.copy( 
        //   new THREE.Vector3(position.x, position.y, position.z) 
        // )

        // this.group.rotation.set(rotation.x,rotation.y,rotation.z)

        // this.group.scale.set(scale.x,scale.y,scale.z)
        //console.log("here")
        if(window.innerWidth >= 768){
          this.group.rotation.x += 0.03;     
          this.obj3d.rotation.y += 0.05;
        }
        
      }

    })

  }

  

  // initControl(){

  //   const {enableKeys,enableRotate,enableZoom,enabled} = this.props;

  //   this.orbit_controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);

  //   Object.assign(this.orbit_controls,{
  //     enableKeys
  //     ,enablePan : true
  //     ,enableRotate
  //     ,enableZoom
  //     ,enabled
  //   })

  //   //debugger;
  //   this.orbit_controls.update();
    
  //   //debugger


  // }
  remove3dModel(){

    if(this.obj3d){
      this.scene.remove(this.obj3d);

    }
    
  }

  load3dModel(){
    var {src,mtl,texPath} = this.props;
 
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
        // this.scene.add(obj3d);
        this.obj3d = obj3d;

        this.props.onLoad && this.props.onLoad()
      }, (xhr)=>{
        this.props.onProgress && this.props.onProgress(xhr)
      });

    });

  }

  listen(){
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    document.addEventListener('mousemove', (event) => {
      event.preventDefault();
 
//       mouse.x = (event.clientX / this.renderer.domElement.clientWidth) * 2 - 1;
//       mouse.y =  - (event.clientY / this.renderer.domElement.clientHeight) * 2 + 1;
// console.log(mouse)
      mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
      mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
      
      raycaster.setFromCamera(mouse, this.camera);

      //meshObjects = [this.obj3d]; // three.js objects with click handlers we are interested in
       
      var intersects = raycaster.intersectObjects(this.obj3d);
//console.log(this.obj3d)
      if (intersects.length > 0) {
        //intersects[0].object.callback();
        console.log(intersects)
      }

    }, false);
  }

  // load3dModel(){
  //   var {src,texPath} = this.props;

  //   if(!src) return false
  //   // instantiate a loader
  //   // load a resource
  //   var obj_loader = new THREE.OBJLoader()
  //   obj_loader.load(
  //     // resource URL
  //     src,
  //     // called when resource is loaded
  //     obj3d => {

  //       var bound_box = this.computeBoundingBox(obj3d);
  //       // debugger
  //       var front = bound_box.max;

  //       //debugger

  //       var cz = bound_box.max.z - bound_box.min.z;

  //       this.camera.position.set(0, 0, front.z+cz*1.5);

  //       //this.initControl();
    
  //       //this.scene.add(obj3d);
  //       this.obj3d = obj3d;

  //       this.props.onLoad && this.props.onLoad()
  //       //this.animate();
  //     },
  //     // called when loading is in progresses
  //     xhr =>{
  //       this.props.onProgress && this.props.onProgress(xhr)
  //       // console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
  //     } 
  //   );
  // }
  style(){
    var {width,height} = this.props;
    return Object.assign({},{width:width+'px',height:height+'px'});
  }



  computeBoundingBox(obj){
    if (obj instanceof THREE.Mesh) {
      var geometry = obj.geometry;
      if (geometry) {
        if (!geometry.boundingBox) {
          geometry.computeBoundingBox();
        }
        
        let geometryBBox = geometry.boundingBox;
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
        let bbox = computeBoundingBox(obj.children[i]);
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
  traverseScene(){

  }

  createEnvironment(){

  }
  
  
  addLight(__constructor,props){

    if( !( /directionligth|ambientlight|spotlight/.test(__constructor)) ) return;
    var o = GlEment[__constructor].create(props);
    
    this.scene.add(o);

    this.lights.push(o);

    return o;
  }
  addChildrenLights(){

    this.lights.forEach((light)=>{
      this.scene.remove(light);
    });
    this.lights = [];

    this.array_children.map(o=>{

      var {props} = o;

      // console.log(props)
      var {__constructor} = props;
      // console.log(props.position)
      this.addLight(__constructor,props);

    });

  }
  createDefaultLight(){

    
    // ambientlight
    // console.log(ambientlight)
    // debugger;
    this.addLight('ambientlight', ambientlight.defaultProps);

    if(this.need_children_lights){
      
      //debugger;

      this.addChildrenLights();
    }else{

      this.addLight('directionligth',directionligth.defaultProps);
      
    }
  }

}

export default Model

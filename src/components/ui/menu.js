import React, { Component } from 'react';
import Obj3d from './obj3d'
//import {OBJModel} from 'react-3d-viewer'
//import {OBJViewer, STLViewer} from 'react-stl-obj-viewer';


class Menu extends Component {
    render() {
        return (
            <div className="menu">
                <Obj3d />
                {/* <OBJViewer 
                    url='./static/3d/bb8.obj'
                    backgroundColor='0xff0000'
                    className="obj"
                    sceneClassName="test"
                    modelColor="#fff000"
                /> */}
                {/* <OBJModel 
                    width="400" height="400"  
                    position={{x:0,y:-100,z:0}} 
                    //texPath="./static/3d/earth"
                    src="./static/3d/bb8.obj"
                    background="green"
                    onLoad={()=>{
                    //...
                    }}
                    onProgress={xhr=>{
                    //...
                    }}
                /> */}
            </div>
        );
    }
}

export default Menu;
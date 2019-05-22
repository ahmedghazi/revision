import React, { Component } from 'react';
import Model from './react-3d-viewer/model' 
import PubSub from 'pubsub-js';
//import MediaQuery from "react-responsive";

class ThreeWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //playState: 'initial',
            //active: false,
            width: '150',
            height: '150'
        }
    }

    componentDidMount(){
        if(window.innerWidth <= 768){
            this.setState({
                width: '150',
                height: '150'
            })
        }else{
            const w = (15 * window.innerHeight) / 100
            const h = (15 * window.innerHeight) / 100
            this.setState({
                width: w,
                height: h
            })
        }
    }
    _onClick(){
        if(window.innerWidth <= 768){
            if(this.props.menuClass === "active"){
                PubSub.publish('MENU', {open: false})
            }else{
                PubSub.publish('MENU', {open: true})
            }
        }else{
            PubSub.publish('MENU', {open: true})
        }
        
    }

    _onLoad(){
        PubSub.publish('3D_LOADED')
    }

    render() {
        const {width, height} = this.state
        //console.log(width, height)
        const {src, mtl, texPath} = this.props
        return (
            <div id="obj3d">
                <Model 
                    width={width} height={height}
                    // position={{x:1.5,y:0,z:0}} 
                    // scale={{x:1.5, y:1.5, z: 1.5}}
                    background="transparent"
                    src={src} 
                    mtl={mtl}
                    texPath={texPath}
                    onLoad={this._onLoad} />
                <div 
                className="obj3d-btn"
                onClick={() => this._onClick()}></div>
            </div>
        );
    }
}

export default ThreeWrapper;
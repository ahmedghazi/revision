import React, { Component } from 'react';
import Model from './react-3d-viewer/model' 
import PubSub from 'pubsub-js';

class ThreeWrapper extends Component {
    constructor(props) {
        super(props);
        
    }

    componentDidMount() {
        
    }

    _onClick(){
        PubSub.publish('MENU_OPEN', {})
    }

    render() {
        const {src} = this.props
        return (
            <div id="obj3d"
            onClick={() => this._onClick()}>
                <Model 
                width="300" height="300"  
                position={{x:0,y:-50,z:-100}} 
                background="transparent"
                src={src} texPath=""/>
            </div>
        );
    }
}

export default ThreeWrapper;
import React, { Component } from 'react';
import Model from './react-3d-viewer/model' 
import PubSub from 'pubsub-js';

class ThreeWrapper extends Component {
    constructor(props) {
        super(props);
        this._handleScroll = this._handleScroll.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this._handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this._handleScroll);
    }

    _handleScroll() {
        // this.setState({
        //     compteur:
        // })
    }

    _onClick(){
        //PubSub.publish('MENU', {open: true})
        PubSub.publish('OPEN_STUDIO')
    }

    render() {
        const {src, mtl, texPath} = this.props
        return (
            <div id="obj3d"
            onClick={() => this._onClick()}>
                <Model 
                width="300" height="300"  
                // position={{x:1.5,y:0,z:0}} 
                // scale={{x:1.5, y:1.5, z: 1.5}}
                background="transparent"
                src={src} 
                mtl={mtl}
                texPath={texPath} />
            </div>
        );
    }
}

export default ThreeWrapper;
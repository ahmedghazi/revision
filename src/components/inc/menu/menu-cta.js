import React, { Component } from 'react';
import PubSub from 'pubsub-js';

class MenuCta extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: true
        }
    }
    componentDidMount(){
        PubSub.subscribe("MENU", (e,d) => {
            this.setState({
                active: d.open
            })
        })
    }
    _onClick(){
        PubSub.publish('MENU', {open: !this.state.active})
    }

    render() {
        return (
            <div 
            onClick={() => this._onClick()}
            className="menu-cta xs-only fxs">
                MENU
            </div>
        );
    }
}

export default MenuCta;
import React, { Component } from 'react';
import PubSub from 'pubsub-js';

class MenuCta extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            label: "MENU"
        }
    }
    componentDidMount(){
        if('ontouchstart' in window && window.innerWidth > 768){
            this.setState({
                active: true,
                label: 'X'
            })
        }
        PubSub.subscribe("MENU", (e,d) => {
            //console.log(d)
            this.setState({
                active: d.open,
                label: d.open ? 'X' : 'MENU'
            })
        })
    }
    _onClick(){
        PubSub.publish('MENU', {open: !this.state.active})
    }

    render() {
        const {active,label} = this.state
        const _className = active ? "active" : ""
        return (
            <div 
            onClick={() => this._onClick()}
            className={"menu-cta xs-only fxs "+_className}>
                {label}
            </div>
        );
    }
}

export default MenuCta;
import React, { Component } from 'react';
import PubSub from 'pubsub-js';

class MenuCta extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: true,
            label: "x"
        }
    }
    componentDidMount(){
        
        if('ontouchstart' in window && window.innerWidth > 768){
            this.setState({
                active: true,
                label: 'X'
            })
        }
        if('ontouchstart' in window && window.innerWidth < 1023){
            this.setState({
                active: false,
                label: 'MENU'
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
        console.log(label)
        const _className = active ? "active" : ""
        return (
            <div 
            onClick={() => this._onClick()}
            className={"menu-cta fxs "+_className}>
                {label}
            </div>
        );
    }
}

export default MenuCta;
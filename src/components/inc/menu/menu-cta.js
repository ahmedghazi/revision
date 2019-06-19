import React, { Component } from 'react';
import PubSub from 'pubsub-js';

class MenuCta extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: true,
            label: "X"
        }
    }
    componentDidMount(){
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
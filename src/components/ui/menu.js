import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import Obj3d from './obj3d'
import MenuMiniMap from './menu-mini-map'
//import Header from './header'
import MenuIndex from './menu-index'
//import {OBJModel} from 'react-3d-viewer'
//import {OBJViewer, STLViewer} from 'react-stl-obj-viewer';


class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuClass: '',
        }
        this._menuClick = this._menuClick.bind(this)
    }

    componentDidMount(){
        PubSub.subscribe("MENU_OPEN", (e,d) => {
            this.setState({
                menuClass: 'active'
            })
        })

        PubSub.subscribe("MENU_CLOSE", (e,d) => {
            this.setState({
                menuClass: ''
            })
        })
    }

    _menuClick(e){
        e.preventDefault();
        const tileId = e.target.getAttribute("href").replace("#", "")
        const tile = document.getElementById(tileId)
        console.log(e.target.getAttribute("href"))
        console.log(tile)
        PubSub.publish('TILE', {tile: tile})

        PubSub.publish('MENU_CLOSE', {})
    }

    render() {
        const {menuClass} = this.state
        const {
            landing,
            data, 
            tiles
        } = this.props
        console.log(data)
        return (
            <div className={"menu-wrap "+menuClass}>
                <div className={"menu"}>
                    <div className="row">
                        <div className="hidden-xs col-md-4">
                            <div className="naviguation">
                                <div className="nav-top">
                                    <div className="header fm">
                                        <h1 className="fm">{landing.title}</h1>
                                        <div className="date" dangerouslySetInnerHTML={{ __html: landing.date.childMarkdownRemark.html }} />
                                    </div>
                                    <nav className="main-nav">
                                        <ul>
                                            {data.nav.map((li,key) => {
                                                {if(li.slug){
                                                    return(
                                                    
                                                        <li key={key}>
                                                            <a href={"#"+li.slug}
                                                            onClick={(e)=> this._menuClick(e)}>{li.title}</a>
                                                        </li>
                                                    )
                                                }}
                                                
                                            })}
                                        </ul>
                                    </nav>
                                </div>
                                
                                <nav className="links">
                                    <ul>
                                        {data.links.map((li,key) => {
                                            return(
                                                <li key={key}>
                                                    <a 
                                                    href={"#"+li.url}
                                                    target="_blank"
                                                    >{li.label}</a>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </nav>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-4">
                            <MenuMiniMap data={tiles} menuClass={menuClass} />
                        </div>
                        <div className="hidden-xs col-md-4">
                            <div className="text-right">
                                <MenuIndex data={tiles} />
                            </div>
                        </div>
                    </div>
                </div>
                <Obj3d />
                
            </div>
        );
    }
}

export default Menu;
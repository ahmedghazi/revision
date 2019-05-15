import React, { Component } from 'react';
import PubSub from 'pubsub-js';
//import Obj3d from './obj3d'
import ThreeWrapper from '../3d/ThreeWrapper'
import MenuMiniMap from './menu-mini-map'
import MenuIndex from './menu-index'


class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuClass: '',
        }
        this._menuClick = this._menuClick.bind(this)
    }

    componentDidMount(){
        PubSub.subscribe("MENU", (e,d) => {
            const menuClass = d.open ? 'active' : ''
  
            this.setState({
                menuClass: menuClass
            })
        })

        document.addEventListener('keyup', e => {
            const key = e.key || e.keyCode;
            //console.log(key)
            switch(key){
                case "Escape":
                    this.setState({
                        menuClass: ''
                    })
                    PubSub.publish('MENU', {open: false})
                break;

                default:
                break;
            }
            
        })
    }

    _menuClick(e){
        e.preventDefault();
        const tileId = e.target.getAttribute("href").replace("#", "")
        const tile = document.getElementById(tileId)
        // console.log(e.target.getAttribute("href"))
        // console.log(tile)
        PubSub.publish('TILE', {tile: tile})

        PubSub.publish('MENU', {open: false})
    }

    render() {
        const {menuClass} = this.state
        const {
            options,
            menu, 
            tiles
        } = this.props
//console.log(menu)
        return (
            <div className={"menu-wrap "+menuClass}>
                <div className={"menu"}>
                    <div className="row">
                        <div className="col-xs-6 col-md-4">
                            <div className="naviguation">
                                <div className="nav-top">
                                    <div className="header fm">
                                        <div className="h1 fm">{options.title}</div>
                                        <div className="date" dangerouslySetInnerHTML={{ __html: options.date.childMarkdownRemark.html }} />
                                    </div>
                                    <nav className="main-nav fm">
                                        <ul>
                                            {menu.nav.map((li,key) => {
                                                {if(li.slug){
                                                    return(
                                                    
                                                        <li key={key}>
                                                            <a 
                                                            href={"#"+li.slug}
                                                            rel="noopener noreferrer"
                                                            onClick={(e)=> this._menuClick(e)}>{li.title}</a>
                                                        </li>
                                                    )
                                                }}
                                                
                                            })}
                                        </ul>
                                    </nav>
                                </div>
                                
                                <ul className="links small fxs">
                                    {menu.links.map((li,key) => {
                                        return(
                                            <li key={key}>
                                                <a 
                                                href={li.url}
                                                rel="noopener noreferrer"
                                                target="_blank"
                                                >{li.label}</a>
                                            </li>
                                        )
                                    })}
                                </ul>

                                <ul className="bottom social small fs">
                                    {menu.social.map((li,key) => {
                                        return(
                                            <li key={key}>
                                                <a 
                                                href={li.url}
                                                rel="noopener noreferrer"
                                                target="_blank"
                                                title={li.label}
                                                >
                                                <strike>{li.label}</strike>
                                                <div className={"icon icon-notion "+li.service}></div>
                                                </a>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                        <div className="hidden-xs col-md-4"></div>
                        <div className="col-xs-6 col-md-4">
                            <MenuIndex data={tiles} />
                        </div>
                    </div>
                </div>
                <MenuMiniMap data={tiles} menuClass={menuClass} />
                <ThreeWrapper 
                src={'3d/v3/pill.obj'}
                mtl={'3d/v3/pill.mtl'}
                texPath="3d/v3/" 
                />
                
            </div>
        );
    }
}

export default Menu;
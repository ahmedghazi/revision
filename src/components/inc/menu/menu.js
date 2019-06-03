import React, { Component } from 'react';
import PubSub from 'pubsub-js';
//import Obj3d from '../3d/obj3d'
import ThreeWrapper from '../3d/ThreeWrapper'
import MenuCta from './menu-cta'
//import Gltf from '../3d/gltf'
import MenuMiniMap from './menu-mini-map'
import MenuIndex from './menu-index'


class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuClass: 'active',
            isMobile: false
        }
        this._menuClick = this._menuClick.bind(this)
    }

    componentDidMount(){
        if(window.innerWidth <= 1023){
            this.setState({
                menuClass: '',
                isMobile: true
            })
        }
        this._filterByViewPort();

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

        PubSub.subscribe("MENU_HOVER_OUT", (e,d) => {
            const items = document.querySelectorAll(".main-nav a")
            items.forEach(element => {
                element.classList.remove("inactive")
            })
        })

        PubSub.subscribe("MENU_HOVER_IN", (e,d) => {
            const slug = d.slug
            const items = document.querySelectorAll(".main-nav a")
            items.forEach(element => {
                element.classList.add("inactive")
            })
            if(document.querySelector(".main-nav a[data-slug="+slug+"]"))
                document.querySelector(".main-nav a[data-slug="+slug+"]").classList.remove("inactive")
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

    _menuMouseEnter(slug){
        PubSub.publish('MENU_HOVER_IN', {slug: slug})
    }

    _menuMouseLeave(){
        PubSub.publish('MENU_HOVER_OUT')
    }

    _filterByViewPort(){
        //const isMobile = window.innerWidth <= 768
        const {isMobile} = this.state
        const tiles = document.querySelectorAll(".main-nav li")
        tiles.forEach((tile,idx) => {
            //console.log(tiles)
            if(isMobile){
                if(tile.classList.contains("md-only")){
                    tile.parentNode.removeChild(tile);
                }
            }else{
                if(tile.classList.contains("xs-only")){
                    tile.parentNode.removeChild(tile);
                }
            }
        })
    }

    _renderClassName(node){
        const xsOnly = node.display == "Mobile" ? "xs-only" : ""
        const mdOnly = node.display == "Desktop" ? "md-only" : ""

        return xsOnly+' '+mdOnly;
    }

    render() {
        const {menuClass,isMobile} = this.state
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
                        <div className="col-xs-12 col-md-4">
                            <div className="naviguation">
                                <div className="nav-top">
                                    <div className="header fm">
                                        <div className="h1 fm">{options.title}</div>
                                        {options.date &&
                                            <div className="date" dangerouslySetInnerHTML={{ __html: options.date.childMarkdownRemark.html }} />
                                        }
                                    </div>
                                    <nav className="main-nav fm">
                                        <ul>
                                            {menu.nav.map((li,key) => {
                                                {if(li.slug){
                                                    return(
                                                        <li 
                                                        key={key}
                                                        className={this._renderClassName(li)}
                                                        >
                                                            <a 
                                                            onMouseEnter={() => this._menuMouseEnter(li.slug)}
                                                            onMouseLeave={() => this._menuMouseLeave()}
                                                            data-slug={li.slug}
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
                                                <div className={"icon icon-"+li.service}></div>
                                                </a>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                        <div className="hidden-xs col-md-4"></div>
                        <div className="col-xs-12 col-md-4">
                            <MenuIndex data={tiles} />
                        </div>
                    </div>
                </div>
                <MenuMiniMap data={tiles} menuClass={menuClass} />

                <ThreeWrapper 
                    src={'3d/v4/Pill_001.obj'}
                    mtl={'3d/v4/Pill_001.mtl'}
                    texPath="3d/v4/" 
                    menuClass={menuClass}
                />
                <MenuCta />
          
            </div>
        );
    }
}

export default Menu;
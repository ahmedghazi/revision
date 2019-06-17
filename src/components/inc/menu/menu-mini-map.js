import React, { Component } from 'react';
import {spiral} from '../../../utils/tiles-builder'
import PubSub from 'pubsub-js';

class MenuMiniMap extends Component {
    constructor(props) {
        super(props);

        this._onResize = this._onResize.bind(this)
        this._onClick = this._onClick.bind(this)
    }

    componentDidMount(){
        this._filterTilesByViewPort()
        this._onResize()
        window.addEventListener("resize", this._onResize)       
  
        PubSub.subscribe("SCROLL_END", (e,d) => {
            const {scrollLeft, scrollTop} = d
            
            //const doc = document.querySelector(".tiles").getBoundingClientRect()
            //console.log(document.body.scrollWidth)
            const {scrollWidth, scrollHeight} = document.body
            // const percentX = (scrollWidth / scrollLeft)
            // const percentY = (scrollHeight / scrollTop)

            var scrollPercentX = (scrollLeft) / (scrollWidth - 0) * 100;
            var scrollPercentY = (scrollTop) / (scrollHeight - 0) * 100;
            const x = scrollPercentX * this.mapWidth / 100
            const y = scrollPercentY * this.mapHeight / 100
//console.log(this.refs.here)
            this.refs.here.style.left = x+"px"
            this.refs.here.style.top = y+"px"
            this.refs.here.style.transform = 'translate('+(this.itemWidth/2)+'px, '+(this.itemHeight/2)+'px)'
            this.refs.here.style.webkitTransform = 'translate('+(this.itemWidth/2)+'px, '+(this.itemHeight/2)+'px)'
            this.refs.here.style.opacity = 1
        })

        PubSub.subscribe("MENU_HOVER_OUT", (e,d) => {
            const items = document.querySelectorAll(".mini-map .item")
            items.forEach(element => {
                element.classList.remove("inactive")
            })
        })

        PubSub.subscribe("MENU_HOVER_IN", (e,d) => {
            const slug = d.slug
            const items = document.querySelectorAll(".mini-map .item")
            items.forEach(element => {
                element.classList.add("inactive")
            })
            if(document.querySelector(".mini-map .item[data-slug="+slug+"]"))
                document.querySelector(".mini-map .item[data-slug="+slug+"]").classList.remove("inactive")
        })
    }

    _onResize(){
        this._renderSpiral()
        this._handleHereIAm()
    }

    _filterTilesByViewPort(){
        const isMobile = window.innerWidth <= 768
        const tiles = document.querySelectorAll(".mini-map .item")
        tiles.forEach((tile,idx) => {
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

    _renderSpiral(){
        console.log("_renderSpiral")
        const tilesWrap = document.querySelector(".mini-map")
        const tiles = document.querySelectorAll(".mini-map .item")
        if(!tiles)return

        //this.mapWidth = document.querySelector(".mini-map").getBoundingClientRect().width
        this.mapWidth = window.innerWidth/3
        const windowRatio = window.innerWidth/window.innerHeight
        const sqrt = Math.round(Math.sqrt(tiles.length))
        this.itemWidth = Math.round(this.mapWidth / sqrt)
        this.itemHeight = Math.round(this.itemWidth / windowRatio)

        this.mapHeight = this.itemHeight *  sqrt
        
        this.translateX = 0
        this.translateY = 0

        tiles.forEach((tile,idx) => {
            const pos = spiral(idx)
            const left =  this.itemWidth * pos[0]
            const top =  this.itemHeight * pos[1]

            if(left < 0 && this.translateX !== left){
                const _left = Math.abs(left)
                this.translateX = _left
            }

            if(top < 0 && this.translateY !== top){
                const _top = Math.abs(top)
                this.translateY = _top
            }
     
            tile.style.width = this.itemWidth+"px"
            tile.style.height = this.itemHeight+"px"
            tile.style.transform = 'translate('+left+'px, '+top+'px)'
            tile.style.webkitTransform = 'translate('+left+'px, '+top+'px)'
        })
        
        tilesWrap.style.transform = 'translate('+this.translateX+'px, '+this.translateY+'px)'
        tilesWrap.style.webkitTransform = 'translate('+this.translateX+'px, '+this.translateY+'px)'
        tilesWrap.style.width = (this.itemWidth * sqrt)+"px"
        tilesWrap.style.height = (this.itemHeight * sqrt)+"px"
        
    }

    _handleHereIAm(){
        
    }

    _onClick(slug){
        if(slug){
            const tile = document.getElementById(slug)
            PubSub.publish('TILE', {tile: tile})
         
            PubSub.publish('MENU', {open: false})
        }
    }

    _menuMouseEnter(slug){
        PubSub.publish('MENU_HOVER_IN', {slug: slug})
    }

    _menuMouseLeave(){
        PubSub.publish('MENU_HOVER_OUT')
    }

    _renderClassName(node){
        //console.log(node.display)
        const xsOnly = node.display === "Mobile" ? "xs-only" : ""
        const mdOnly = node.display === "Desktop" ? "md-only" : ""

        return xsOnly+' '+mdOnly;
    }

    render() {
        const {data} = this.props
    
        return (
            <div className="mini-map-wrap">
                <div className="mini-map">
           
                    {data.map(({node},key) => (
                        <div 
                        className={"item "+this._renderClassName(node)}
                        key={key} 
                        index={key} 
                        data-slug={node.slug}
                        onClick={() => this._onClick(node.slug)}
                        onMouseEnter={() => this._menuMouseEnter(node.slug)}
                        onMouseLeave={() => this._menuMouseLeave()}

                        />
                    ))}

                    
                </div>
                <div ref="here" className="here"></div>
            </div>
        );
    }
}

export default MenuMiniMap;
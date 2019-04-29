import React, { Component } from 'react';
import {spiral} from '../../utils/tiles-builder'
import PubSub from 'pubsub-js';

class MenuMiniMap extends Component {
    constructor(props) {
        super(props);

        this._onResize = this._onResize.bind(this)
        this._onClick = this._onClick.bind(this)
    }

    componentDidMount(){
        this._onResize()
        document.addEventListener("resize", this._onResize)            
    }

    _onResize(){
        this._renderSpiral()
        this._handleHereIAm()
    }

    _renderSpiral(){
        const tilesWrap = document.querySelector(".mini-map")
        const tiles = document.querySelectorAll(".mini-map .item")
        if(!tiles)return

        const mapWidth = document.querySelector(".mini-map").getBoundingClientRect().width
        const windowRatio = window.innerWidth/window.innerHeight
        const sqrt = Math.round(Math.sqrt(tiles.length))
        const itemWidth = Math.round(mapWidth / sqrt)
        const itemHeight = Math.round(itemWidth / windowRatio)
        let translateX = 0
        let translateY = 0

        tiles.forEach((tile,idx) => {
            const pos = spiral(idx)
            const left =  itemWidth * pos[0]
            const top =  itemHeight * pos[1]

            if(left < 0 && translateX !== left){
                const _left = Math.abs(left)
                translateX = _left
            }

            if(top < 0 && translateY !== top){
                const _top = Math.abs(top)
                translateY = _top
            }
     
            tile.style.width = itemWidth+"px"
            tile.style.height = itemHeight+"px"
            tile.style.transform = 'translate('+left+'px, '+top+'px)'
        })

        tilesWrap.style.transform = 'translate('+translateX+'px, '+translateY+'px)'
        
    }

    _handleHereIAm(){
        const {scrollLeft, scrollTop} = document.body
        console.log("scrollLeft",scrollLeft)
        console.log("scrollTop",scrollTop)
    }

    _onClick(slug){
        if(slug){
            console.log(slug)
            console.log(document.getElementById(slug))
            document.getElementById(slug).scrollIntoView({ 
                behavior: 'smooth',
                block: "start"
            });

            

            PubSub.publish('MENU_CLOSE', {})
        }
    }

    render() {
        const {data} = this.props
        return (
            <div className="wrap">
                <div className="mini-map">
                    <div 
                        className="item"
                        key={0} 
                        index={0} 
                        onClick={() => this._onClick("landing")}
                        />
                 

                    {data.map(({node},key) => (
                        <div 
                        className="item"
                        key={key + 1} 
                        index={key + 1} 
                        onClick={() => this._onClick(node.slug)}
                        />
                    ))}

                    <div className="here-i-am"></div>
                </div>
            </div>
        );
    }
}

export default MenuMiniMap;
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
  
        PubSub.subscribe("SCROLL_END", (e,d) => {
            const {scrollLeft, scrollTop} = d
            //console.log(scrollLeft, scrollTop)
            const {mapWidth, mapHeight, itemWidth, itemHeight} = this.state
            //console.log(mapWidth, itemWidth, itemHeight)
            const x = (scrollLeft * mapWidth/2) / window.innerWidth
            const y = (scrollTop * mapHeight/2) / window.innerHeight
            // console.log(x, y)
            // console.log(x, y)
            this.refs.here.style.left = x+"px"
            this.refs.here.style.top = y+"px"
            this.refs.here.style.transform = 'translate(-'+(itemWidth/2)+'px, -'+(itemHeight/2)+'px)'
        })
    }

    _onResize(){
        this.setState({
            //mapWidth: 
        })
        this._renderSpiral()
        this._handleHereIAm()
    }

    _renderSpiral(){
        const tilesWrap = document.querySelector(".mini-map")
        const tiles = document.querySelectorAll(".mini-map .item")
        if(!tiles)return

        const mapWidth = document.querySelector(".mini-map").getBoundingClientRect().width
        const mapHeight = document.querySelector(".mini-map").getBoundingClientRect().height
        const windowRatio = window.innerWidth/window.innerHeight
        const sqrt = Math.round(Math.sqrt(tiles.length))
        const itemWidth = Math.round(mapWidth / sqrt)
        const itemHeight = Math.round(itemWidth / windowRatio)

        this.setState({
            mapWidth: sqrt * itemWidth,
            mapHeight: sqrt * itemHeight,
            itemWidth: itemWidth,
            itemHeight: itemHeight
        })
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
        
    }

    _onClick(slug){
        if(slug){
            const tile = document.getElementById(slug)
            PubSub.publish('TILE', {tile: tile})
            // document.getElementById(slug).scrollIntoView({ 
            //     behavior: 'smooth',
            //     block: "start"
            // });
       

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

                    
                </div>
                <div ref="here" className="here"></div>
            </div>
        );
    }
}

export default MenuMiniMap;
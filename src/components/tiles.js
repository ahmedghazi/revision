import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import {spiral} from '../utils/tiles-builder'
import {debounce} from 'throttle-debounce';
//import {range} from '../utils'

import Tile from "./tile"

class Tiles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            docWidth: 0,
            docHeight: 0,
            winWidth: 0,
            winHeight: 0,
            //inertia: 10,
            bounding: null,
            tilesClass: ''
        }       
        
        //this._onResize = this._onResize.bind(this)
        this._onScroll = this._onScroll.bind(this)
        this._onResize = debounce(250, this._onResize.bind(this));
    }

    componentWillUnmount(){
        window.removeEventListener("resize", this._onResize)      
        document.body.removeEventListener("scroll", this._onScroll)   
    }

    componentDidMount(){
        this._filterTilesByViewPort()
        this._onResize()

        window.addEventListener("resize", this._onResize)

        document.body.addEventListener("scroll", this._onScroll)          
        
        PubSub.subscribe("TILE", (e,d) => {
            console.log(d)
            if(!d.tile)return;

            const {
                winWidth,
                winHeight
            } = this.state;

            const {x,y} = d.tile.dataset
            let left,top;
            //console.log(x,y)

            if('ontouchstart' in window && winWidth <= 768){
                window.removeEventListener("resize", this._onResize)  
                //console.log(d.tile.getBoundingClientRect().top)
                d.tile.scrollIntoView()
            }else{
                const wrapTranslate = this._getComputedTranslateY()

                left = (x*winWidth) + parseFloat(wrapTranslate[4])
                top = (y*winHeight) + parseFloat(wrapTranslate[5])

                setTimeout(() => {
                    document.body.scrollTo(left, top)
                    // if('ontouchstart' in window){
                    //     console.log(left,top)
                    //     const scroller = document.scrollingElement || document.documentElement
                    //     console.log(scroller)
                    //     scroller.scrollTo(left, top)
                    // }
                }, 600)
            }  
        })
    }

    _getComputedTranslateY(){
        const tilesWrap = document.getElementById("tiles")
        const transform = window
                            .getComputedStyle(tilesWrap)
                            .getPropertyValue('transform')
                            .match(/(-?[0-9\.]+)/g)
        return transform
    }

    _onScroll(){
        //console.log("scroll")
        window.clearTimeout( this.isScrolling );

        //this._scrollBoundaries()

        // Set a timeout to run after scrolling ends
        this.isScrolling = setTimeout(function() {
            const {scrollLeft, scrollTop} = document.body

            PubSub.publish('SCROLL_END', {
                scrollLeft: scrollLeft,
                scrollTop: scrollTop
            })
        }, 66);
    }
    
    _scrollBoundaries(){
        const {scrollLeft, scrollTop, offsetWidth, scrollWidth, offsetHeight, scrollHeight} = document.body
        //console.log(scrollLeft, offsetWidth + scrollLeft, scrollWidth)
        document.querySelectorAll(".arrow").forEach(el => {
            el.style.display = "none"
        })
        if ((offsetHeight + scrollTop) >= scrollHeight) {
            console.log("is bottom")
            document.querySelector(".arrow.arrow-s").style.display = "none"
            document.querySelector(".arrow.arrow-n").style.display = "block"
        }
        if(scrollTop == 0){
            console.log("is top")
            document.querySelector(".arrow.arrow-n").style.display = "none"
            document.querySelector(".arrow.arrow-s").style.display = "block"
        }
        if((offsetWidth + scrollLeft) >= scrollWidth){
            console.log("is right")
            document.querySelector(".arrow.arrow-e").style.display = "none"
            document.querySelector(".arrow.arrow-w").style.display = "block"
        }
        if(scrollLeft == 0){
            console.log("is left")
            document.querySelector(".arrow.arrow-w").style.display = "none"
            document.querySelector(".arrow.arrow-e").style.display = "block"
        }
    }

    _onResize(){
        const winWidth = window.innerWidth <= 768 ? window.innerWidth*2 : window.innerWidth
        this.setState({
            docWidth: document.innerWidth,
            docHeight: document.innerHeight,
            winWidth: winWidth,
            winHeight: window.innerHeight
        }, () => this._renderSpiral())
    }

    _filterTilesByViewPort(){
        const isMobile = window.innerWidth <= 768
        const tiles = document.querySelectorAll(".tile")
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
        //console.log("_renderSpiral")
        if(window.innerWidth <= 1024)return
        const {
            winWidth,
            winHeight
        } = this.state;
        //const isMobile = winWidth <= 768

        const tilesWrap = document.querySelector(".tiles")
        const tiles = document.querySelectorAll(".tile")
        
        let first = ''

        let translateX = 0
        let translateY = 0

        tiles.forEach((tile,idx) => {
            if(idx === 0)first = tile
//console.log(tile)
            //if(isMobile)
            const pos = spiral(idx)
            const left = pos[0] * (winWidth/1)
            const top = pos[1] * (winHeight/1)
            tile.style.transform = 'translate('+left+'px, '+top+'px)'
            tile.dataset.x = pos[0]
            tile.dataset.y = pos[1]
            
            if(left < 0 && translateX !== left){
                const _left = Math.abs(left)
                translateX = _left
            }

            if(top < 0 && translateY !== top){
                const _top = Math.abs(top)
                translateY = _top
            }
        })
        tilesWrap.style.transform = 'translate('+translateX+'px, '+translateY+'px)'
        tilesWrap.style.webkitTransform = 'translate('+translateX+'px, '+translateY+'px)'
        tilesWrap.style.opacity = 1
        //console.log(document.body.scrollWidth, document.body.scrollHeight)

        setTimeout(() => {
            if(!window.location.hash){
                var pos = first.getBoundingClientRect()
                //const scroller = document.scrollingElement || document.documentElement
                //console.log(pos)
                //scroller.scrollTo(pos.left, pos.top)
                document.body.scrollTo(pos.left, pos.top)
                // document.documentElement.scrollTop = pos.top
                // document.documentElement.scrollLeft = pos.left
            }
            
            this.setState({
                docWidth: document.body.scrollWidth,
                docHeight: document.body.scrollHeight,
                bounding: tilesWrap.getBoundingClientRect()
            })
            
            if('ontouchstart' in window && winWidth > 768){
                window.removeEventListener("resize", this._onResize)   
            }   
        }, 150)
    }

    

    render() {
        const {data} = this.props;
        const {tilesClass} = this.state;
        // const style = {
        //     //transform:'translate('+this.x+'px,'+this.y+'px)'
        // }
        // console.log(data)
        const arrows = ["e", "ne", "n", "nw", "w", "sw", "s", "se"]
        return (
            <>
            <div id="tiles" className={'tiles '+tilesClass} >
                {data.map(({node},key) => (
                    <Tile 
                    key={key} 
                    index={key} 
                    data={node} />
                ))}
            </div>
            {arrows.map((el,i) => (
                <div key={i} className={"arrow arrow-"+el}></div>
            ))}
            </>
        );
    }
}

export default Tiles;
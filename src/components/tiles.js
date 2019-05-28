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
            //console.log(d)
            if(!d.tile)return;

            const {
                winWidth,
                winHeight
            } = this.state;

            const {x,y} = d.tile.dataset
            let left,top;

            if(winWidth <= 768){
                //console.log(d.tile.getBoundingClientRect().top)
                //d.tile.scrollIntoView()
                left = 0
                top = d.tile.getBoundingClientRect().top
                document.body.scrollTo(left, top)
            }else{
                const wrapTranslate = this._getComputedTranslateY()
            
                left = (x*winWidth) + parseFloat(wrapTranslate[4])
                top = (y*winHeight) + parseFloat(wrapTranslate[5])
                setTimeout(() => {
                    //document.body.scrollTo(left, top)
                    //const scroller = document.scrollingElement || document.documentElement
                    //console.log(left, top)
                    //const scroller = document.scrollingElement || document.documentElement
                    //scroller.scrollTo(left, top)
                    document.body.scrollTo(left, top)
                    //scroller.scrollTop += 10;
                    //document.body.scrollTop = top
                    //document.body.scrollLeft = left
                }, 600)
            }
            

            
        })

        
        //document.addEventListener("mousemove", this._onMouseMove)  

        //https://codepen.io/anon/pen/VNxyzG
        // window.requestAnimationFrame = window.requestAnimationFrame
        //     || window.mozRequestAnimationFrame
        //     || window.webkitRequestAnimationFrame
        //     || window.msRequestAnimationFrame
        //     || function(f){return setTimeout(f, 1000/10)}

        //requestAnimationFrame(this._update);
        // a.ui.win.on('deviceorientation', function(e){
        //     a.nav.clientX = ((e.originalEvent.gamma+90)/180) * a.sizes.winWidth;
        //     a.nav.clientY = ((e.originalEvent.beta+90)/180) * a.sizes.winHeight;
        // });
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
        window.clearTimeout( this.isScrolling );

        // Set a timeout to run after scrolling ends
        this.isScrolling = setTimeout(function() {
            const scroller = document.scrollingElement || document.documentElement
            const {scrollLeft, scrollTop} = document.body
            //console.log("SCROLL_END", scrollLeft, scrollTop)
            PubSub.publish('SCROLL_END', {
                scrollLeft: scrollLeft,
                scrollTop: scrollTop
            })
        }, 66);
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
        console.log("_renderSpiral")
        if(window.innerWidth <= 768)return
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
        
        }, 150)
    }

    

    render() {
        const {data} = this.props;
        const {tilesClass} = this.state;
        
        // const style = {
        //     //transform:'translate('+this.x+'px,'+this.y+'px)'
        // }
        // console.log(data)
        return (
            
            <div id="tiles" className={'tiles '+tilesClass} >
     
                {data.map(({node},key) => (
                    <Tile 
                    key={key} 
                    index={key} 
                    data={node} />
                ))}
        
            </div>
            
        );
    }
}

export default Tiles;
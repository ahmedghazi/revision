import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import {spiral} from '../utils/tiles-builder'
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
        
        this._onResize = this._onResize.bind(this)
        this._onScroll = this._onScroll.bind(this)

    }

    componentDidMount(){
        this._onResize()
        //document.addEventListener("resize", this._onResize)      
        document.body.addEventListener("scroll", this._onScroll)    
        
        PubSub.subscribe("TILE", (e,d) => {
            //console.log(d)
            if(!d.tile)return;

            const {
                winWidth,
                winHeight
            } = this.state;

            const {x,y} = d.tile.dataset
            
            const wrapTranslate = this._getComputedTranslateY()
            
            const left = (x*winWidth) + parseFloat(wrapTranslate[4])
            const top = (y*winHeight) + parseFloat(wrapTranslate[5])

            document.body.scrollTo(left, top)
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
            const {scrollLeft, scrollTop} = document.body
            
            PubSub.publish('SCROLL_END', {
                scrollLeft: scrollLeft,
                scrollTop: scrollTop
            })
        }, 66);
    }

    _onResize(){
        this.setState({
            docWidth: document.innerWidth,
            docHeight: document.innerHeight,
            winWidth: window.innerWidth,
            winHeight: window.innerHeight
        }, () => this._renderSpiral())
    }

    _renderSpiral(){
        const {
            winWidth,
            winHeight
        } = this.state;

        const tilesWrap = document.querySelector(".tiles")
        const tiles = document.querySelectorAll(".tile")
        let first = ''

        let translateX = 0
        let translateY = 0

        tiles.forEach((tile,idx) => {
            
            if(idx === 0)first = tile

            const pos = spiral(idx)
            const left = pos[0] * (winWidth/1)
            const top = pos[1] * (winHeight/1)
            tile.style.transform = 'translate('+left+'px, '+top+'px)'
            tile.dataset.x = pos[0]
            tile.dataset.y = pos[1]
            // if(left < 0){
            //     const _left = Math.abs(left)
            //     tilesWrap.style.transform = 'translateX('+_left+'px)'
            // }

            // if(top < 0){
            //     const _top = Math.abs(top)
            //     tilesWrap.style.transform = 'translateY('+_top+'px)'
            // }
            // if(left < 0 && top < 0){
            //     const _left = Math.abs(left)
            //     const _top = Math.abs(top)
            //     tilesWrap.style.transform = 'translate('+_left+'px, '+_top+'px)'
            // }
            
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
        //console.log(document.body.scrollWidth, document.body.scrollHeight)
        

        setTimeout(() => {
            var pos = first.getBoundingClientRect()
            document.body.scrollTo(pos.left, pos.top)

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
        
        const style = {
            //transform:'translate('+this.x+'px,'+this.y+'px)'
        }
        console.log(data)
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
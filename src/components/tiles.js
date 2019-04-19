import React, { Component } from 'react';
import {spiral} from '../utils/tiles-builder'
//import {range} from '../utils'

import Tile from "./tile"

class Tiles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            docWidth: document.innerWidth,
            docHeight: document.innerHeight,
            winWidth: window.innerWidth,
            winHeight: window.innerHeight,
            inertia: 10,
            bounding: null
        }       
        
        this._update = this._update.bind(this)
        this._onResize = this._onResize.bind(this)
        this._onMouseMove = this._onMouseMove.bind(this)

        this.x = 0
        this.y = 0
    }

    componentDidMount(){
        this._onResize()
        document.addEventListener("resize", this._onResize)        
        //document.addEventListener("mousemove", this._onMouseMove)  

        //https://codepen.io/anon/pen/VNxyzG
        window.requestAnimationFrame = window.requestAnimationFrame
            || window.mozRequestAnimationFrame
            || window.webkitRequestAnimationFrame
            || window.msRequestAnimationFrame
            || function(f){return setTimeout(f, 1000/10)} // simulate calling code 60 

        //requestAnimationFrame(this._update);
        // a.ui.win.on('deviceorientation', function(e){
        //     a.nav.clientX = ((e.originalEvent.gamma+90)/180) * a.sizes.winWidth;
        //     a.nav.clientY = ((e.originalEvent.beta+90)/180) * a.sizes.winHeight;
        // });
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
        
        tiles.forEach((tile,idx) => {
            
            //if(idx === 0)first = tile
            const pos = spiral(idx)
            const left = pos[0] * (winWidth/1)
            const top = pos[1] * (winHeight/1)
            
            if(left < 0){
                const _left = Math.abs(left)
                tilesWrap.style.transform = 'translateX('+_left+'px)'
            }

            if(top < 0){
                const _top = Math.abs(top)
                tilesWrap.style.transform = 'translateY('+_top+'px)'
            }
            if(left < 0 && top < 0){
                const _left = Math.abs(left)
                const _top = Math.abs(top)
                tilesWrap.style.transform = 'translate('+_left+'px, '+_top+'px)'
            }
            
            // tile.style.left = left+"px"
            // tile.style.top = top+"px"
            tile.style.transform = 'translate('+left+'px, '+top+'px)'
        })
        //console.log(document.body.scrollWidth, document.body.scrollHeight)
        
        setTimeout(() => {
            this.setState({
                docWidth: document.body.scrollWidth,
                docHeight: document.body.scrollHeight,
                bounding: tilesWrap.getBoundingClientRect()
            })
            document.getElementById("tile-0").scrollIntoView({ 
                behavior: 'smooth',
                block: "start"
            });
        }, 400)
    }

    _onMouseMove(e){
        const {
            winWidth,
            winHeight,
            docWidth,
            docHeight,         
        } = this.state;

        var decay = 0.11;
        var percentX = e.clientX / winWidth;
        var percentY = e.clientY / winHeight;
        // get the old scroll value
        var scrollX = document.body.scrollLeft;
        var scrollY = document.body.scrollTop;
        var scrollAmountX = (docWidth - winWidth) * percentX;
        var scrollAmountY = (docHeight - winHeight) * percentY;
        // the new scroll value is the destination value minus how far we've currently scrolled, multiplied by an easing number
        scrollX += parseFloat((scrollAmountX - scrollX) * decay);
        scrollY += parseFloat((scrollAmountY - scrollY) * decay);

        this.setState({
            scrollX: scrollX,
            scrollY: scrollY
        })

        // document.body.scrollLeft = xpX;
        // document.body.scrollTop = xpY;
    }

    _update(){
        const {
            scrollX, scrollY, inertia
        } = this.state;

        if(scrollX){
            const x = (document.body.scrollLeft - scrollX) / inertia
            const y = (document.body.scrollTop - scrollY) / inertia
      //console.log(x, y)
            document.body.scrollLeft = scrollX;
            document.body.scrollTop = scrollY;
        }
        
        requestAnimationFrame(this._update);
    }

    render() {
        const {landing,data} = this.props;

        const style = {
            //transform:'translate('+this.x+'px,'+this.y+'px)'
        }
        //console.log(style)
        return (
            
            <div className="tiles" style={style}>
                <Tile 
                    key={0} 
                    index={0} 
                    data={landing} />
                {/*[...range(0, 24)]*/}
                {data.map(({node},key) => (
                    <Tile 
                    key={key + 1} 
                    index={key + 1} 
                    data={node} />
                ))}
        
            </div>
            
        );
    }
}

export default Tiles;
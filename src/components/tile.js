import React, { Component } from 'react';

import Landing from "./ui/landing"
import Headline from "./ui/headline"
import Media from "./ui/media"
import Texte from "./ui/texte"
import Link from "./ui/link"
import LinkTexte from "./ui/link-texte"
import Event from "./ui/event"
import Ads from "./ui/ads"

class Tile extends Component {
    _normaliseSize(size){
        switch(size){
            case '1/4': return 'tile-quarter'
            case '1/2': return 'tile-half'
            case '1': return 'tile-full'
            default: return 'tile-full'
        } 

    }

    _renderTile(tile){
        switch(tile.__typename){
            case "ContentfulHeadline": return (
                <Headline data={tile} />
            )

            case "ContentfulMedia": return (
                <Media data={tile} />
            )

            case "ContentfulTexte": return (
                <Texte data={tile} />
            )

            case "ContentfulLink": return (
                <Link data={tile} />
            )

            case "ContentfulLinkText": return (
                <LinkTexte data={tile} />
            )

            case "ContentfulEvent": return (
                <Event data={tile} />
            )

            case "ContentfulAds": return (
                <Ads data={tile} />
            )

            default:
            
            break;
        }
    }
    
    _padding(tile){
        if(tile.__typename === "ContentfulAds" || tile.__typename === "ContentfulMedia"){
            return 'nopad'
        }else{
            return ''
        }
    }

    render() {
        const {
            data,
            index
        } = this.props
        console.log(index)
        if(index === 0){
            return(
                <Landing data={data} index={index} />
            )
        }else{
            return (
                <div data-id={data.title} id={"tile-"+index} className={"tile tile-"+data.postTiles.length}>
                    {data.postTiles.map((tile, key) => (
                        <div key={key} className={"tile-item "+this._normaliseSize(tile.size)+" "+this._padding(tile)}>
                            {this._renderTile(tile)}
                        </div>
                    ))}
                </div>
               
            );
        }
        
    }
}

export default Tile;
import React, { Component } from 'react';

//import Landing from "./ui/landing"
import Headline from "./ui/ui-headline"
import Media from "./ui/ui-media"
import Texte from "./ui/ui-texte"
import Link from "./ui/ui-link"
import LinkTexte from "./ui/ui-link-texte"
import Event from "./ui/ui-event"
import Ads from "./ui/ui-ads"
import Repeater from "./ui/ui-repeater"

class Tile extends Component {
    _normaliseSize(size){
        //console.log(size)
        switch(size){
            case '1/4': return 'tile-quarter'
            case '1/2': return 'tile-half'
            case '1': return 'tile-full'
            default: return 'tile-quarter'
        } 

    }

    _renderTile(tile){
        // console.log(tile.__typename)
        //console.log(tile.title)
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

            case "ContentfulRepeater": return (
                <Repeater data={tile} />
            )

            default:
                return (<div>Test</div>)
            break;
        }
    }
    
    _padding(tile){
        if(
            tile.__typename === "ContentfulAds" 
            || tile.__typename === "ContentfulMedia"
            
            ){
            return 'nopad'
        }else if(tile.__typename === "ContentfulRepeater"){
            return 'nopad-tb'
        }
        else{
            return ''
        }
    }

    render() {
        const {
            data
        } = this.props
        //console.log(data.subtitle)
        return (
            <div 
            id={data.slug} 
            className={"tile tile-"+data.postTiles.length}
            data-title={data.title} 
            data-subtitle={data.subtitle}>
                {data.postTiles.map((tile, key) => (
                    <div 
                    key={key} 
                    className={"tile-item "+this._normaliseSize(tile.size)+" "+this._padding(tile)}>
                        {
                            this._renderTile(tile)
                        }
                    </div>
                ))}
            </div>
           
        );
        
    }
}

export default Tile;
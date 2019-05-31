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
    _className(tile){
        const size = this._size(tile.size)
        const padded = this._padded(tile.__typename)
        const type = this._type(tile.__typename)
        return type+" "+size+" "+padded
    }
    
    _type(__typename){
        const type = __typename.replace("Contentful", "tile-").toLowerCase()
        return type
    }

    _size(size){
        //console.log(size)
        switch(size){
            case '1/4': return 'tile-quarter'
            case '1/2': return 'tile-half'
            case '1': return 'tile-full'
            default: return 'tile-quarter'
        } 
    }

    _padded(__typename){
        if(__typename === "ContentfulAds" 
        || __typename === "ContentfulMedia"){
            return 'nopad'
        }else if(__typename === "ContentfulRepeater"){
            return 'nopad-tb'
        }
        else{
            return ''
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
            //break;
        }
    }
    
    

    render() {
        const {
            data
        } = this.props
        //console.log(data.subtitle)
        const xsOnly = data.display === "Mobile" ? "xs-only" : ""
        const mdOnly = data.display === "Desktop" ? "md-only" : ""
        
        if(data.slug == "quote"){
            console.log(data.postTiles)
        }
        return (
            <div 
            id={data.slug} 
            className={"tile tile-"+data.postTiles.length+" "+mdOnly+" "+xsOnly}
            data-title={data.title} 
            data-subtitle={data.subtitle}>
                {data.postTiles.map((tile, key) => (
                    <div 
                    key={key} 
                    className={"tile-item "+this._className(tile)}>
                        {this._renderTile(tile)}
                    </div>
                ))}
            </div>
           
        );
        
    }
}

export default Tile;
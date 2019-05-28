import React, { Component } from 'react';
//import { Link } from 'gatsby'
import Btn from './btn'

class Link extends Component {
    render() {
        const {
            title,
            url,
            service
        } = this.props.data

        //console.log(title, url)
        return (
            <div className="ui-link">
                <Btn 
                    label={title}
                    url={url}
                    size="large" />

                <div className="url">
                    <a target="_blank" href={url}>
                        <div className="anon fxs gradient-texte">{url}</div>
                        <div className={"icon icon-"+service}></div>
                    </a>
                    
                </div>
                
            </div>
        );
    }
}

export default Link;
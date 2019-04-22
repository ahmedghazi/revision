import React, { Component } from 'react';
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
                    <div className=" fxs gradient-texte">{url}</div>
                    <div className={"icon icon-"+service}></div>
                </div>
                
            </div>
        );
    }
}

export default Link;
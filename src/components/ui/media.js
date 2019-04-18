import React, { Component } from 'react';
import Figure from './figure';

class Media extends Component {
    render() {
        const {data} = this.props
        //console.log(data)
        return (
            <div className="ui-media">
                
                <div 
                className="cover"
                style={{backgroundImage: 'url('+data.image.fluid.src+')'}}></div>
                
                <div className="bottom fs gradient-overlay">
                    {data.title !== "" &&
                    <   div className="title">{data.title}</div>
                    }
                </div>
            </div>
        );
    }
}

export default Media;
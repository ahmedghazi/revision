import React, { Component } from 'react';
import Sponsor from './sponsor'

class Ads extends Component {
    render() {
        const {data} = this.props
        
        return (
            <div className="ui-advertisement">    
                <div 
                className="cover"
                style={{backgroundImage: 'url('+data.image.fluid.src+')'}}></div>
                
                <div className="bottom fs gradient-overlay">
                    {data.title !== "" &&
                        <div className="title">{data.title}</div>
                    }
                    {data.sponsor !== "" &&
                        <Sponsor data={data.sponsor} />
                    }
                </div>
            </div>
        );
    }
}

export default Ads;
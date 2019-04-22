import React, { Component } from 'react';
import Btn from './btn'

class LinkTexte extends Component {
    render() {
        const {data} = this.props
        return (
            <div className="ui-link-texte">
                <div className="texte" dangerouslySetInnerHTML={{ __html: data.texte.childMarkdownRemark.html }} />
                <div className="bottom">
                    
                    {data.linkUrl !== "" &&
                        <div className="inner">
                            <div className="url">
                                <div className=" fxs gradient-texte">{data.linkUrl}</div>
                                <div className={"icon icon-"+data.service}></div>
                            </div>
                            <Btn 
                            label={data.linkLabel} 
                            url={data.linkUrl} 
                            size="small" />
                        </div>
                    }     
                    
                </div>
            </div>
        );
    }
}

export default LinkTexte;
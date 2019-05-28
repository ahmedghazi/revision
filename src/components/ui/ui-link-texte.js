import React, { Component } from 'react';
import Btn from './btn'
import Truncate from 'react-clamp'

class LinkTexte extends Component {
    render() {
        const {data} = this.props
        return (
            <div className="ui-link-texte">
                {data.texte !== "" &&
                    <Truncate 
                    className="texte" 
                    clamp={4}>
                        <div  dangerouslySetInnerHTML={{ __html: data.texte.childMarkdownRemark.html }} />
                    </Truncate>
                }    

                <div className="bottom">
                    
                    {data.linkUrl !== "" &&
                        <div className="inner">
                            <div className="url">
                                <a target="_blank" href={data.linkUrl}>
                                    <div className="anon fxs gradient-texte">{data.linkUrl}</div>
                                    <div className={"icon icon-"+data.service}></div>
                                </a>
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
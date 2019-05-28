import React, { Component } from 'react';
import Btn from './btn'
//import Truncate from 'react-truncate';
import Truncate from 'react-clamp'

class LinkTexte extends Component {
    render() {
        const {data} = this.props
        return (
            <div className="ui-link-texte">
                {/* <div className="texte" dangerouslySetInnerHTML={{ __html: data.texte.childMarkdownRemark.html }} /> */}
                {data.texte !== "" &&
                    <Truncate className="texte" 
                    lines={4}>
                        <div  dangerouslySetInnerHTML={{ __html: data.texte.childMarkdownRemark.html }} />
                    </Truncate>
                }    

                <div className="bottom">
                    
                    {data.linkUrl !== "" &&
                        <div className="inner">
                            <div className="url">
                                <div className="anon fxs gradient-texte">{data.linkUrl}</div>
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
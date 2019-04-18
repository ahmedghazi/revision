import React, { Component } from 'react';
import Btn from './btn'

class LinkTexte extends Component {
    render() {
        return (
            <div className="ui-link-texte">
                Link Texte
                <div className="bottom">
                    <div className="inner">
                        <div className="url fxs gradient-texte">https://revision-community.slack.com/messages/CJ0L7HPQW/</div>
                        <Btn 
                        label="button" 
                        url="https://revision-community.slack.com/messages/CJ0L7HPQW/" 
                        size="small" />
                    </div>
                </div>
            </div>
        );
    }
}

export default LinkTexte;
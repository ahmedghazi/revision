import React, { Component } from 'react';

class Social extends Component {
    render() {
        const {data} = this.props
        return (
            <div className="social">
                <ul className="connectors">
                    {data.contentfulFooter.links.map((li,key) => (
                        <li key={key} >
                            <a 
                            href={li.url} 
                            target="_blank"
                            rel="noopener noreferrer">{li.label}</a>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Social;
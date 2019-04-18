import React, { Component } from 'react';

class Header extends Component {
    render() {
        const {data} = this.props
        return (
            <header>
                <div className="top fm">
                    <h1 className="fm">{data.title}</h1>
                    <div className="date" dangerouslySetInnerHTML={{ __html: data.date.childMarkdownRemark.html }} />
                </div>
                <div className="bottom">
                    <ul className="nav small">
                        {data.nav.map((li,key) => (
                            <li key={key} style={{paddingLeft: 0+'em'}}>
                                <a 
                                href={li.url} 
                                target="_blank"
                                rel="noopener noreferrer">{li.label}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </header>
        );
    }
}

export default Header;
import React, { Component } from 'react';

class Btn extends Component {
    render() {
        const {
            label,
            url,
            size
        } = this.props;

        return (
            <a 
            target="_blank"
            href={url}
            className={"btn btn-"+size}
            rel="noopener noreferrer">
                <span>{label}</span>
            </a>
        );
    }
}

export default Btn;


import React, { Component } from 'react';

class Cta extends Component {
    render() {
        const {data} = this.props
        return (
            <a 
            target="_blank" 
            href={data.tickets} 
            className="btn btn-large"
            rel="noopener noreferrer">
                <div>BUY TICKETS</div>
            </a>
        );
    }
}

export default Cta;
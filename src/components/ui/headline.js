import React, { Component } from 'react';

class Headline extends Component {
    render() {
        const {data} = this.props
        //console.log(data)
        return (
            <div className="ui-headline">
                {/* <iframe src={data.url} frameBorder="0"></iframe> */}
                <h2>{data.title}</h2>
                <div className="subheadline">{data.subheadline}</div>
                links here
            </div>
        );
    }
}

export default Headline;
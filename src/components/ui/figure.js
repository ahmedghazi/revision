import React, { Component } from 'react';

class Figure extends Component {
    render() {
        const {
            src,
            srcSet,
            sizes,
            fileName
        } = this.props;

        return (
            <figure>
                <img 
                    src={src}
                    srcSet={srcSet}
                    sizes={sizes}  
                    alt={fileName} />
            </figure>
        );
    }
}

export default Figure;
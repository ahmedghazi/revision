import React, { Component } from 'react';
import People from "./people"
import Truncate from 'react-truncate';

class Texte extends Component {
    render() {
        const {
            data
        } = this.props
//console.log(data)
        const numLines = data.size === '1/4' ? 6 : 9
        return (
            <div className="ui-texte">
                {data.texte !== "" &&
                    // <Truncate className="texte" 
                    // lines={numLines}
                    // trimWhitespace={true}
                    // ellipsis={<span>...</span>}>
                        
                    // </Truncate>
                    <div 
                    className="texte" 
                    dangerouslySetInnerHTML={{ __html: data.texte.childMarkdownRemark.html }} />
                }   
                {data.people !== null &&
                    <People data={data.people} />
                }
            </div>
        );
    }
}

export default Texte;
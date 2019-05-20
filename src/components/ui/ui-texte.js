import React, { Component } from 'react';
import People from "./people"
//import Truncate from 'react-truncate';
import Truncate from 'react-clamp'

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
                    <Truncate clamp={numLines} className="texte">
                        <div 
                        dangerouslySetInnerHTML={{ __html: data.texte.childMarkdownRemark.html }} />
                    </Truncate>

                    
                }   
                {data.people !== null &&
                    <People data={data.people} />
                }
            </div>
        );
    }
}

export default Texte;
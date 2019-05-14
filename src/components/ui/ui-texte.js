import React, { Component } from 'react';
import People from "./people"
import Truncate from 'react-truncate';

class Texte extends Component {
    render() {
        const {
            data
        } = this.props
//console.log(data.texte.childMarkdownRemark.html)
        return (
            <div className="ui-texte">
                {data.texte !== "" &&
                    <Truncate className="texte" 
                    lines={9}
                    trimWhitespace={true}
                    ellipsis={<span>...</span>}>
                        <div  dangerouslySetInnerHTML={{ __html: data.texte.childMarkdownRemark.html }} />
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
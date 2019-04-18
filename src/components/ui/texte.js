import React, { Component } from 'react';
import People from "./people"

class Texte extends Component {
    render() {
        const {
            data
        } = this.props

        return (
            <div className="ui-texte">
                {data.texte !== "" &&
                    <div className="texte" dangerouslySetInnerHTML={{ __html: data.texte.childMarkdownRemark.html }} />
                }           
                {data.people !== "" &&
                    <People data={data.people} />
                }
            </div>
        );
    }
}

export default Texte;
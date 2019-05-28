import React, { Component } from 'react';
import People from "./people"
//import Truncate from 'react-truncate';
import Truncate from 'react-clamp'

class Texte extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numLines: 6
        }        
    }

    componentDidMount(){
        const {
            data
        } = this.props
        console.log(data.size)

        let numLines = 0
        if('ontouchstart' in window){
            numLines = data.size === '1/4' ? 5 : 9
        }else{
            numLines = data.size === '1/4' ? 6 : 9
        }

        this.setState({
            numLines: numLines
        })
    }
    render() {
        const {
            numLines
        } = this.state
        
        const {
            data
        } = this.props
//console.log(data)
        //const numLines = data.size === '1/4' ? 6 : 9
        return (
            <div className="ui-texte" data-lines={numLines+" "+data.size}>
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
import React, { Component } from 'react';
//import {StaticQuery, graphql} from 'gatsby';
import Dotdotdot from 'react-clamp'

class Headline extends Component {
    render() {
        const {data} = this.props
        //console.log(data)
        const numLines = 5

        return (
            <div className="ui-headline">
            
                <div className="top fm">
                    <h2 className="fl" dangerouslySetInnerHTML={{ __html: data.title }} />
                    {data.texte !== null &&
                        <div className="texte fl" dangerouslySetInnerHTML={{ __html: data.texte.childMarkdownRemark.html }} />
                        // <Dotdotdot clamp={numLines} className="texte fl">
                        //     <div dangerouslySetInnerHTML={{ __html: data.texte.childMarkdownRemark.html }} />
                        // </Dotdotdot>
                    }  
                </div>
                <div className="bottom">
                {data.links !== null &&
                    <ul className="nav small">
                        {data.links.map((li,key) => (
                            <li key={key} style={{paddingLeft: 0+'em'}}>
                                <a 
                                href={li.url} 
                                target="_blank"
                                rel="noopener noreferrer">{li.label}</a>
                            </li>
                        ))}
                    </ul>
                }
                </div>

            </div>
        );
    }
}

export default Headline;

// export default (props) => (
//     <StaticQuery
//         query={graphql`
//             query  {
//                 prismicInfos {
//                     data {
//                       title {
//                         text
//                       }
//                       texte {
//                         html
//                       }
//                       contacts{
//                         title1 {text}
//                         contact{html}
//                       }
//                       team{
//                         html
//                       }
//                       awards{
//                         year {text}
//                           award{text}
//                       }
//                     }
//                   }
//             }
//         `}
//         render={data => (
//             <Headline 
//             data={data.prismicInfos.data} />
//         )}
//     />
// )
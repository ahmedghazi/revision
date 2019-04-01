import React from 'react';
import {graphql} from 'gatsby';
import Helmet from "react-helmet";
//import PubSub from 'pubsub-js';

import Repeater from "../components/repeater"


require('../styles/index.scss')

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mainClass: 'landing-page',
        }

    }


    componentDidMount() {
        // PubSub.subscribe('IS_CAROUSEL', (e, d) => {
        //     const mainClass = d.status ? "is-carousel" : ""
        //     this.setState({
        //         mainClass: mainClass
        //     })
        // })
    }
    render() {
        const {mainClass} = this.state
        const {data} = this.props
        console.log(data)
        return (
            <main className={mainClass}>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>{data.contentfulLandingPage.title}</title>
                    <meta name="description" content={data.contentfulLandingPage.description} />
                    <meta property="og:url" content="" />
                    <meta property="og:title" content={data.contentfulLandingPage.title} />
                    <meta property="og:description" content={data.contentfulLandingPage.description} />
                    <meta property="og:image" content="" />

                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:site" content="@Revision_HQ" />
                    <meta name="twitter:creator" content="@Revision_HQ" />
                    <meta property="og:url" content="" />
                    <meta property="og:title" content={data.contentfulLandingPage.title} />
                    <meta property="og:description" content={data.contentfulLandingPage.description} />
                    <meta property="og:image" content="" />
                </Helmet>

                <div className="tiles">
                    <div className="tile headline">
                        <div className="tile-quarter">
                            <div className="top">
                                <h1>{data.contentfulLandingPage.title}</h1>
                                <div className="date">{data.contentfulLandingPage.date}</div>
                            </div>
                            <div className="bottom">
                                <ul className="nav small">
                                    {data.contentfulLandingPage.nav.map((li,key) => (
                                        <li key={key} style={{paddingLeft: 0+'em'}}>
                                            <a 
                                            href={li.url} 
                                            target="_blank"
                                            rel="noopener noreferrer">{li.label}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="tile-quarter no-pad-v">
                            <Repeater title={data.contentfulLandingPage.baseline} />
                        </div>
                        <div className="tile-quarter">
                            <a 
                            target="_blank" 
                            href={data.contentfulLandingPage.tickets} 
                            className="btn btn-large"
                            rel="noopener noreferrer">
                                <div>BUY TICKETS</div>
                            </a>
                        </div>
                        <div className="tile-quarter">
                            <div>{data.contentfulLandingPage.description}</div>
                        </div>

                        
                    </div>
                    <div className="tile tile-hauto footer">
                        <div className="tile-quarter ">
                            <ul className="connectors">
                                {data.contentfulFooter.links.map((li,key) => (
                                    <li key={key} style={{paddingLeft: 0+'em'}}>
                                        <a 
                                        href={li.url} 
                                        target="_blank"
                                        rel="noopener noreferrer">↗ {li.label}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="tile-quarter">
                            <div className="small">
                                <ul className="legals small">
                                    <li>
                                        <a 
                                            href="https://www.notion.so/revisionio/LEGAL-DISCLOSURE-6a2e89e5b0ff494ca40ef250871530de?fbclid=IwAR0Vt9QjfSkqW0wlpOupuupHNRLXEOy9krvFG2ump32uU_ZlWB-rXZhVJOE"
                                            target="_blank"
                                            rel="noopener noreferrer">LEGAL</a>
                                    </li>
                                    <li>
                                        <a 
                                            href="https://www.notion.so/revisionio/PRIVACY-POLICY-b24ee8d7bd4e477e9750a67833fcf9a1?fbclid=IwAR1jXGSLXQnrEaT5_aoQP_Lo9DY2HY8q9Mk8i-UvXpEZn4xJyKh8j3btRXE"
                                            target="_blank"
                                            rel="noopener noreferrer">Privacy policy</a>
                                    </li>
                                </ul>
                                <div className="copy">
                                ©2019 Revision.io
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}

export default Index

export const query = graphql `
    query{
        contentfulLandingPage {
            title
            baseline
            description
            date
            tickets
            nav{
                label
                url
            }
        }
        contentfulFooter {
            links {
                label
                url
            }
        }
    }
`
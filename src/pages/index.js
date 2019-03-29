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
        //console.log(data)
        return (
            <main className={mainClass}>
                {/* <Helmet>
                    <meta charSet="utf-8" />
                    <title>{data.contentfulHeader.subtitle}</title>
                    <meta name="description" content={data.contentfulHeader.subtitle} />
                    <meta property="og:url" content="" />
                    <meta property="og:title" content={data.contentfulHeader.subtitle} />
                    <meta property="og:description" content={data.contentfulHeader.subtitle} />
                    <meta property="og:image" content={data.contentfulHeader.image.file.url} />

                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:site" content="@saw" />
                    <meta name="twitter:creator" content="@saw" />
                    <meta property="og:url" content="" />
                    <meta property="og:title" content={data.contentfulHeader.subtitle} />
                    <meta property="og:description" content={data.contentfulHeader.subtitle} />
                    <meta property="og:image" content={data.contentfulHeader.image.file.url} />
                </Helmet> */}

                <div className="tiles">
                    <div className="tile headline">
                        <div className="tile-quarter">
                            <h1>{data.contentfulLandingPage.title}</h1>
                            <div className="date">{data.contentfulLandingPage.date}</div>
                        </div>
                        <div className="tile-quarter no-pad-v">
                            <Repeater title={data.contentfulLandingPage.baseline} />
                        </div>
                        <div className="tile-quarter">
                            <a target="_blank" href={data.contentfulLandingPage.tickets} className="btn btn-large">
                                <div>BUY TICKETS</div>
                            </a>
                        </div>
                        <div className="tile-quarter">
                            <div>{data.contentfulLandingPage.description}</div>
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
    }
}
`
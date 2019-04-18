import React from 'react';
import {graphql} from 'gatsby';
import Helmet from "react-helmet";
//import PubSub from 'pubsub-js';

import Header from "../components/ui/header"
import Footer from "../components/ui/footer"
import Social from "../components/ui/social"
import Repeater from "../components/ui/repeater"
import Cta from "../components/ui/cta"

import favicon from '../images/favicon.png';

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

                    <link rel='shortcut icon' type="image/png" href={favicon} />

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
                    <div className="tile tile-4 headline">
                        <div className="tile-quarter">
                            <Header data={data} />
                        </div>
                        <div className="tile-quarter no-pad-v">
                            <Repeater title={data.contentfulLandingPage.baseline} />
                        </div>
                        <div className="tile-quarter">
                            <Cta data={data} />
                        </div>
                        <div className="tile-quarter">
                            <div>{data.contentfulLandingPage.description}</div>
                        </div>
                    </div>
                    <div className="tile tile-2 tile-h-auto">
                        <div className="tile-half ">
                            <Social data={data} />
                        </div>
                        <div className="tile-half">
                            <Footer data={data} />
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
            date{
                childMarkdownRemark{
                    html
                }
            }
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
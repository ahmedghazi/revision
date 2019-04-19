import React from 'react';
import {graphql} from 'gatsby';
import Helmet from "react-helmet";
//import PubSub from 'pubsub-js';

import Tiles from "../components/tiles"
import Menu from "../components/ui/menu"

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
        // PubSub.subscribe('EVT', (e, d) => {
        // })
    }
    render() {
        const {mainClass} = this.state
        const {data} = this.props
        //console.log(data)
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

                <Tiles 
                landing={data.contentfulLandingPage} 
                data={data.allContentfulTile.edges} />

                <Menu />
            </main>
        )
    }
}

export default Index

export const query = graphql `
    query {
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
      allContentfulTile(sort: {fields: hierarchy}) {
        edges {
          node {
            title
            hierarchy
            postTiles {
              __typename
              ... on ContentfulLinkText {
                size
                title
                subheadline
                linkUrl
                linkLabel
                people {
                  name
                  info
                  image {
                    file {
                      contentType
                      fileName
                      url
                    }
                    fluid(maxWidth: 1440) {
                      sizes
                      src
                      srcSet
                    }
                  }
                }
                texte {
                  childMarkdownRemark {
                    html
                  }
                }
              }
              ... on ContentfulAds {
                id
                size
                title
                video
                image {
                  file {
                    contentType
                    fileName
                    url
                  }
                  fluid(maxWidth: 1440) {
                    sizes
                    src
                    srcSet
                  }
                }
                sponsor {
                  title
                  url
                  image {
                    file {
                      contentType
                      fileName
                      url
                    }
                    fluid(maxWidth: 1440) {
                      sizes
                      src
                      srcSet
                    }
                  }
                }
              }
              ... on ContentfulEvent {
                size
                title
                date
                subheadline
                eventType
                peoples {
                  name
                  info
                  image {
                    file {
                      contentType
                      fileName
                      url
                    }
                    fluid(maxWidth: 1440) {
                      sizes
                      src
                      srcSet
                    }
                  }
                }
                sponsor{
                  title
                  url
                  image {
                    file {
                      contentType
                      fileName
                      url
                    }
                    fluid(maxWidth: 1440) {
                      sizes
                      src
                      srcSet
                    }
                  }
                }
              }
              ... on ContentfulLink {
                size
                title
                url
              }
              ... on ContentfulHeadline {
                size
                title
                subheadline
              }
              ... on ContentfulTexte {
                size
                title
                people {
                  name
                  info
                  image {
                    file {
                      contentType
                      fileName
                      url
                    }
                    fluid(maxWidth: 1440) {
                      sizes
                      src
                      srcSet
                    }
                  }
                }
                texte {
                  childMarkdownRemark {
                    html
                  }
                }
              }
              ... on ContentfulMedia {
                size
                title
                video
                image {
                  file {
                    contentType
                    fileName
                    url
                  }
                  fluid(maxWidth: 1440) {
                    sizes
                    src
                    srcSet
                  }
                }
              }
            }
          }
        }
      }
    }
    
`   
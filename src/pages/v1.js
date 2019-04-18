import React from 'react';
import {graphql} from 'gatsby';

import Tiles from "../components/tiles"

require('../styles/index.scss')

class v1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mainClass: 'landing-page',
        }

    }

    render() {
        const {mainClass} = this.state
        const {data} = this.props
        console.log(data)
        return (
            <main className={mainClass}>
                {/* <Tiles data={data.allContentfulTilePost.edges} /> */}
                <Tiles landing={data.contentfulLandingPage} data={data.allContentfulTile.edges} />
            </main>
        );
    }
}

export default v1;


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
                subheadline
                eventType
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
import React from 'react';
import {graphql} from 'gatsby';
import Helmet from "react-helmet";
import PubSub from 'pubsub-js';

import Tiles from "../components/tiles"
import Menu from "../components/inc/menu/menu"
import Modal from "../components/inc/modal"

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
        PubSub.subscribe("MENU", (e,d) => {
          const tilesClass = d.open ? 'is-menu' : ''
          this.setState({
            mainClass: tilesClass
          })

      })
    }

    render() {
        const {mainClass} = this.state
        const {
          contentfulOptions,
          contentfulMenu,
          allContentfulTile
        } = this.props.data
        //console.log(data)
        
        return (
          <main className={mainClass}>
              <Helmet>
                  <meta charSet="utf-8" />

                  <link rel='shortcut icon' type="image/png" href={favicon} />

                  <title>{contentfulOptions.title}</title>
                  <meta name="description" content={contentfulOptions.description} />
                  <meta property="og:url" content="" />
                  <meta property="og:title" content={contentfulOptions.title} />
                  <meta property="og:description" content={contentfulOptions.description} />
                  <meta property="og:image" content="" />

                  <meta name="twitter:card" content="summary_large_image" />
                  <meta name="twitter:site" content="@Revision_HQ" />
                  <meta name="twitter:creator" content="@Revision_HQ" />
                  <meta property="og:url" content="" />
                  <meta property="og:title" content={contentfulOptions.title} />
                  <meta property="og:description" content={contentfulOptions.description} />
                  <meta property="og:image" content="" />
              </Helmet>

              <div className="tiles-wrap">
                <Tiles 
                data={allContentfulTile.edges} />
              </div>
              

              <Menu 
                menu={contentfulMenu}
                options={contentfulOptions}
                tiles={allContentfulTile.edges} />

              <Modal />
          </main>
        )
    }
}

export default Index

export const query = graphql `
    query {
      contentfulOptions{
        title
        description{
          childMarkdownRemark{
            html
          }
        }
        date{
          childMarkdownRemark{
            html
          }
        }
        objFile{
          file {
            url
          }
        }
      }
      contentfulMenu {
        title
        nav {
          title
          slug
          subtitle
        }
        links{
          label
          url
        }
      }
      
      allContentfulTile(sort: {fields: hierarchy}) {
        edges {
          node {
            title
            slug
            hierarchy
            postTiles {
              __typename
              ... on ContentfulLinkText {
                size
                title
                subheadline
                linkUrl
                linkLabel
                service
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
                service
              }
              ... on ContentfulHeadline {
                size
                title
                texte{
                  childMarkdownRemark{
                    html
                  }
                }
                links{
                  label
                  url
                }
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
              ... on ContentfulRepeater{
                title
              }
            }
          }
        }
      }
    }
    
`   
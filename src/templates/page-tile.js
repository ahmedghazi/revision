import React, { Component } from 'react';
import Helmet from "react-helmet";
import Tile from '../components/tile'
import favicon from '../images/favicon.png';

require('../styles/index.scss')

class PageTile extends Component {
    render() {
        const {
          options,
          contentfulTile
        } = this.props.data
        const seoTitle = contentfulTile.title + " - " + options.title
        
        return (
            <div className="page-tile">
              <Helmet>
                <meta charSet="utf-8" />

                <link rel='shortcut icon' type="image/png" href={favicon} />

                <title>{seoTitle}</title>
                <meta name="description" content={options.description.childMarkdownRemark.rawMarkdownBody} />
                <meta property="og:url" content="" />
                <meta property="og:title" content={seoTitle} />
                <meta property="og:description" content={contentfulTile.subtitle} />
                <meta property="og:image" content={options.image.file.url} />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@Revision_HQ" />
                <meta name="twitter:creator" content="@Revision_HQ" />
                <meta property="og:url" content="" />
                <meta property="og:title" content={seoTitle} />
                <meta property="og:description" content={contentfulTile.subtitle} />
                <meta property="og:image" content={options.image.file.url} />

                
              </Helmet>

              <Tile data={contentfulTile} />
            </div>
        );
    }
}

export default PageTile;

export const pageQuery = graphql `
  query TileBySlug($slug: String!) {
    options: contentfulOptions{
      title
      description{
        childMarkdownRemark{
          html
          rawMarkdownBody
        }
      }
      
      image{
        file {
          url
        }
      }
    }

    contentfulTile(slug: {eq: $slug}) {
        title
        subtitle
        slug
        hierarchy
        display
        postTiles {
          __typename
          ... on Node {
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
                  fluid(maxWidth: 1440, quality: 80) {
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
                fluid(maxWidth: 1440, quality: 80) {
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
            ... on ContentfulLink {
              size
              title
              url
              service
            }
            ... on ContentfulHeadline {
              size
              title
              texte {
                childMarkdownRemark {
                  html
                }
              }
              links {
                label
                url
              }
            }
            ... on ContentfulTexte {
              size
              title
              capLines
              people {
                name
                info
                image {
                  file {
                    contentType
                    fileName
                    url
                  }
                  fluid(maxWidth: 1440, quality: 80) {
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
                fluid(maxWidth: 1440, quality: 80) {
                  sizes
                  src
                  srcSet
                }
              }
            }
            ... on ContentfulRepeater {
              title
              size
            }
          }
        }
      }
  }
`
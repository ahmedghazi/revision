import React, { Component } from 'react';
import Helmet from "react-helmet";
//import Tile from '../components/tile'
import favicon from '../images/favicon.png';

require('../styles/index.scss')

class PageArticle extends Component {
    render() {
        const {
          options,
          article
        } = this.props.data
        const seoTitle = article.title + " - " + options.title
        console.log(article)
        return (
            <div className="page-article">
              <Helmet>
                <meta charSet="utf-8" />

                <link rel='shortcut icon' type="image/png" href={favicon} />

                <title>{seoTitle}</title>
                <meta name="description" content={article.texte.childMarkdownRemark.rawMarkdownBody} />
                <meta property="og:url" content="" />
                <meta property="og:title" content={seoTitle} />
                <meta property="og:description" content={article.texte.childMarkdownRemark.rawMarkdownBody} />
                <meta property="og:image" content={options.image.file.url} />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@Revision_HQ" />
                <meta name="twitter:creator" content="@Revision_HQ" />
                <meta property="og:url" content="" />
                <meta property="og:title" content={seoTitle} />
                <meta property="og:description" content={article.texte.childMarkdownRemark.rawMarkdownBody} />
                <meta property="og:image" content={options.image.file.url} />

                
              </Helmet>

              <article>
                <h1>{article.title}</h1>
              </article>
            </div>
        );
    }
}

export default PageArticle;

export const pageQuery = graphql `
  query Tile($slug: String!) {
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

    article: contentfulArticle(slug: {eq: $slug}) {
      title
      texte {
        childMarkdownRemark{
          html
          rawMarkdownBody
        }
      }
      hero{
        fluid {
          base64
          tracedSVG
          aspectRatio
          src
          srcSet
          srcWebp
          srcSetWebp
          sizes
        }
      }
    }
  }
`
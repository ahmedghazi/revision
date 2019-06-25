import React, { Component } from 'react';
import Helmet from "react-helmet";
//import Tile from '../components/tile'
import {Link} from 'gatsby'
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

                <script async src="//cdn.embedly.com/widgets/platform.js" charset="UTF-8"></script>
              </Helmet>
              <header>
                <div className="sitename">
                  <Link to="/">{options.title}</Link>
                </div>
              </header>
              <article>
                <div className="wrapper">
                <h1 className="fl">{article.title}</h1>
                </div>
                {article.hero &&
                  <div className="hero">
                    <figure>
                      <img 
                      src={article.hero.fluid.src} 
                      srcSet={article.hero.fluid.srcset}
                      sizes={article.hero.fluid.sizes}
                      alt="" />
                    </figure>
                  </div>
                }
                <div className="wrapper">
                  <div className="texte " dangerouslySetInnerHTML={{ __html: article.texte.childMarkdownRemark.html }} />
                </div>
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
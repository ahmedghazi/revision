import React, { Component } from 'react';
import { Link } from "gatsby"
import Helmet from "react-helmet";
import favicon from '../images/favicon.png';

require('../styles/index.scss')

class Page404 extends Component {
    render() {
        const {
            options,
            articles
          } = this.props.data
          console.log(options)
        return (
            <div className="page-404">
                 <Helmet>
                    <meta charSet="utf-8" />
                    <link rel='shortcut icon' type="image/png" href={favicon} />

                    <title>{options.title}</title>
                    <meta name="description" content={options.description.childMarkdownRemark.rawMarkdownBody} />
                    <meta property="og:url" content="" />
                    <meta property="og:title" content={options.title} />
                    <meta property="og:description" content={options.description.childMarkdownRemark.rawMarkdownBody} />
                    <meta property="og:image" content={options.image.file.url} />

                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:site" content="@Revision_HQ" />
                    <meta name="twitter:creator" content="@Revision_HQ" />
                    <meta property="og:url" content="" />
                    <meta property="og:title" content={options.title} />
                    <meta property="og:description" content={options.description.childMarkdownRemark.rawMarkdownBody} />
                    <meta property="og:image" content={options.image.file.url} />
              </Helmet>

                <header>
                    <div className="sitename">
                    <Link to="/">{options.title}</Link>
                    </div>
                </header>

                <article>
                    <h1>404 Page Not Found</h1>
                    <p>Oops, we couldn't find this page!</p>

                    <ul className="articles">
                        <li>
                            <Link to="/">Home page</Link>
                        </li>

                        {articles.edges.map(({node},i) => (
                            <li key={i}>
                                <Link to={"/"+node.slug}>{node.title}</Link>
                            </li>
                        ))}
                    </ul>
                </article>
            </div>
        );
    }
}

export default Page404;

export const query = graphql `
  query {
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

    articles: allContentfulArticle {
        edges {
          node {
            title
            slug
          }
        }
      }
  }
`
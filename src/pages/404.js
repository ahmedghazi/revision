import React, { Component } from 'react';
import { Link } from "gatsby"


class Page404 extends Component {
    render() {
        const {
            options,
            articles
          } = this.props.data
        return (
            <div className="page-404">
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

export const pageQuery = graphql `
  query Page404 {
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
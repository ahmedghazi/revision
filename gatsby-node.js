const path = require("path")
// const locales = require('./config/i18n')
// const {
//     replaceTrailing,
//     localizedSlug,
//     replaceBoth,
//     wrapper
// } = require('./src/core/gatsby-node-helpers')


exports.createPages = async ({
    graphql,
    actions
}) => {
    const {
        createPage
    } = actions

    // const home = await graphql(`{
    //     contentfulHomePage{
    //         title
    //     }
    // }`)

    

    //////////////////////////////////
    const tiles = await graphql(`
    {
        allContentfulTile {
            edges {
              node {
                slug
              }
            }
          }
    }
    `)
    const templateTile = path.resolve("src/templates/page-tile.js")
    tiles.data.allContentfulTile.edges.forEach(edge => {
        const path = `/tile/${edge.node.slug}`

        createPage({
            path: path,
            component: templateTile,
            context: {
                slug: edge.node.slug,
                //template: 'project'
            },
        })
    })

    //////////////////////////////////
    // const articles = await graphql(`
    // {
    //     allContentfulArticle{
    //         edges{
    //           node{
    //             slug
    //           }
    //         }
    //     }
    // }
    // `)
    // const templateArticle = path.resolve("src/templates/page-article.js")
    // articles.data.allContentfulArticle.edges.forEach(edge => {
    //     const path = `/article/${edge.node.slug}`
    //     console.log(path)
    //     createPage({
    //         path: path,
    //         component: templateArticle,
    //         context: {
    //             slug: edge.node.slug,
    //             //template: 'project'
    //         },
    //     })
    // })

}

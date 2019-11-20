const path = require(`path`)
const { allMarkdownPosts } = require(`../utils/node-queries`)

module.exports.createRedirects = ({ actions }) => {
    const { createRedirect } = actions

    // The /concepts page doesn't exist, we need to redirect to
    // the first post of this section
    createRedirect({
        fromPath: `/biodynamo`,
        isPermanent: true,
        redirectInBrowser: true,
        toPath: `/docs/userguide/`,
    })
}

module.exports.createMarkdownPages = async ({ graphql, actions }) => {
    const { createPage } = actions
    const queryPromises = []

    queryPromises.push(new Promise((resolve, reject) => {
        graphql(allMarkdownPosts())
            .then((result) => {
                if (result.errors) {
                    return reject(result.errors)
                }

                return result.data.allMarkdownRemark.edges.forEach(({ node }) => {
                    const DocTemplate = path.resolve(`./src/templates/markdown/post.js`)

                    createPage({
                        path: node.fields.slug,
                        component: DocTemplate,
                        context: {
                            // Data passed to context is available
                            // in page queries as GraphQL variables.
                            slug: node.fields.slug,
                            section: node.fields.section,
                        },
                    })
                    return resolve()
                })
            })
    }))

    return Promise.all(queryPromises)
}

module.exports.createNewsIndexPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const queryPromises = []

  queryPromises.push(new Promise((resolve, reject) => {
      graphql(
        `
          {
            allMarkdownRemark(
              filter: {fields: {slug: {regex: "/blog/"}}}
              sort: { fields: [frontmatter___date], order: DESC }
              limit: 1000
            ) {
              edges {
                node {
                  fields {
                    slug
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          reject(result.errors)
        }

        // Create blog-list pages
        const posts = result.data.allMarkdownRemark.edges
        const postsPerPage = 10
        const numPages = Math.ceil(posts.length / postsPerPage)
        Array.from({ length: numPages }).forEach((_, i) => {
          createPage({
            path: i === 0 ? `/blog` : `/blog/${i + 1}`,
            component: path.resolve("./src/templates/blog-list-template.js"),
            context: {
              limit: postsPerPage,
              skip: i * postsPerPage,
              numPages,
              currentPage: i + 1,
            },
          })
          return resolve()
        })
      })
  }))
  return Promise.all(queryPromises)
}

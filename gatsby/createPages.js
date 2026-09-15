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
    const result = await graphql(allMarkdownPosts())
    if (result.errors) {
        throw result.errors
    }

    const DocTemplate = path.resolve(`./src/templates/markdown/post.js`)
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
            path: node.fields.slug,
            component: DocTemplate,
            context: {
                // Data passed to context is available in page queries.
                slug: node.fields.slug,
                section: node.fields.section,
            },
        })
    })
}

module.exports.createNewsIndexPages = async ({ graphql, actions }) => {
    const { createPage } = actions
    const result = await graphql(`
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
    `)
    if (result.errors) {
        throw result.errors
    }

    const posts = result.data.allMarkdownRemark.edges
    const postsPerPage = 10
    const numPages = Math.ceil(posts.length / postsPerPage)
    Array.from({ length: numPages }).forEach((_, i) => {
        createPage({
            path: i === 0 ? `/blog` : `/blog/${i + 1}`,
            component: path.resolve(`./src/templates/blog-list-template.js`),
            context: {
                limit: postsPerPage,
                skip: i * postsPerPage,
                numPages,
                currentPage: i + 1,
            },
        })
    })
}

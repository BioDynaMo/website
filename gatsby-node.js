const createPages = require(`./gatsby/createPages`)
const onCreateNode = require(`./gatsby/onCreateNode`)

exports.createPages = ({ graphql, actions }) => Promise.all([
    createPages.createRedirects({ actions }),
    createPages.createMarkdownPages({ graphql, actions }),
    createPages.createNewsIndexPages({ graphql, actions })
])

exports.onCreateNode = async ({ node, getNode, actions }) => await onCreateNode.createMarkdownNodeFields(({ node, getNode, actions }))

const express = require(`express`)

// Enable development support for serving HTML from `./static` folder
exports.onCreateDevServer = ({ app }) => {
  app.use(express.static(`public`))
}

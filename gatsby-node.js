const createPages = require(`./gatsby/createPages`)
const onCreateNode = require(`./gatsby/onCreateNode`)

exports.createPages = ({ graphql, actions }) => Promise.all([
    createPages.createRedirects({ actions }),
    
    createPages.createMarkdownPages({ graphql, actions }),
    createPages.createNewsIndexPages({ graphql, actions }),
    createPages.createJupyterTutorialPages({ graphql, actions }),
    
])

exports.onCreateNode = async ({ node, getNode, actions, loadNodeContent }) => {
  await onCreateNode.createMarkdownNodeFields(({ node, getNode, actions }));
  await onCreateNode.createJupyterNoteBookNodes(({ node, getNode, actions, loadNodeContent }));
 
}


const express = require(`express`)

// Enable development support for serving HTML from `./static` folder
exports.onCreateDevServer = ({ app }) => {
  app.use(express.static(`public`))
}

exports.onCreateWebpackConfig = ({ actions, stage, plugins }) => {
  actions.setWebpackConfig({
    resolve: {
       alias: {
          path: require.resolve("path-browserify")
       },
       fallback: {
         fs: false,
       }
    }
  })
  if (stage === 'build-javascript' || stage === 'develop') {
    actions.setWebpackConfig({
      plugins: [
        plugins.provide({ process: 'process/browser' })
      ]
    })
  }
}


const _ = require(`lodash`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const urlUtils = require(`../utils/urls`)
const { markdownQueryConfig, defaultMarkdownSection } = require(`../utils/query-config`)
const knownSections = _.map(markdownQueryConfig, `section`)

module.exports.createMarkdownNodeFields = async ({ node, getNode, actions }) => {
    const { createNodeField } = actions

    if (node.internal.type === `MarkdownRemark`) {
        let slug = urlUtils.urlForMarkdown(node, createFilePath({ node, getNode, basePath: `pages` }))
        // Section is the first part of the path
        let section = slug.match(/^\/(.*?)\//)[1]
        section = _.includes(knownSections, section) ? section : defaultMarkdownSection

        createNodeField({
            node,
            name: `slug`,
            value: slug,
        })

        createNodeField({
            node,
            name: `section`,
            value: section,
        })
    }
}

const crypto = require(`crypto`);

module.exports.createJupyterNoteBookNodes = async({
  node,
  loadNodeContent,
  actions
}
// , pluginOptions // eslint-disable-line no-unused-vars
)=> {
  const {
    createNode,
    createParentChildLink,
    createNodeField
  } = actions; // Filter out non-ipynb content by file extension and checkpoint notebooks

  if (node.extension !== `ipynb` || String(node.absolutePath).includes(`.ipynb_checkpoints`)) {
    return;
  } // see: http://jupyter.readthedocs.io/en/latest/reference/mimetype.html
  // if (node.internal.mediaType !== `application/x-ipynb+json`) {
  //   return
  // }


  const content = await loadNodeContent(node);
  const jupyterNode = {
    id: `${node.id} >>> JupyterNotebook`,
    children: [],
    parent: node.id,
    internal: {
      content,
      type: `JupyterNotebook`
    }
  };
  jupyterNode.json = JSON.parse(content);
  jupyterNode.metadata = jupyterNode.json.metadata; // render statically html with @nteract/notebook-render element


  if (node.internal.type === `File`) {
    // jupyterNode.fileAbsolutePath = node.absolutePath;
    jupyterNode.fileRelativePath = node.relativePath;
  }

  jupyterNode.internal.contentDigest = crypto.createHash(`md5`).update(JSON.stringify(jupyterNode)).digest(`hex`);
  try {
    createNode(jupyterNode);    
  } catch (error) {
      console.log("HELLO", error)
  }
  
  
  createParentChildLink({
    parent: node,
    child: jupyterNode
  });
};

import React from 'react'
import { Link } from 'gatsby'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import { Layout } from '../components/common/layout'
import { Spirit } from '../styles/spirit-styles'
import { SidebarNav } from '../components/common/sidebar'
import { MetaData, getMetaImageUrls } from '../components/common/meta'


import { TOC } from '../components/common'
const NotebookRender = require(`@nteract/notebook-render`).default;
const JupyterNotebookPage = ({ data, location }) => {
    const title = `Tutorials`
    const description = `This is the tutorials page.`
    const imageUrl = getMetaImageUrls()


    const sideBarLayout = {}

    console.log(sideBarLayout);
    
    let ipynb = data.allJupyterNotebook.edges[0].node.json
    ipynb.metadata = {};
    ipynb.cells = ipynb.cells.map(cell => ({...cell, outputs:[]}))
    // console.log(ipynb);
    let Notebook = React.createElement(NotebookRender, {
        notebook:  ipynb ,
        ...({})
      }, null); 

    return (
        <>
            <MetaData
                data={data}
                location={location}
                title={title}
                type="website"
                description={description}
                image={imageUrl}
            />
            <Layout mainClass="bg-whitegrey-l2 pb-vw3" bodyClass="bg-white">

                <div className="bg-concepts">
                    <div className={`${Spirit.page.xl} pt12 pb4 pt-vw1-ns pb-vw1-ns white pl10 pl0-ns`}>
                        <h1 className={`${Spirit.sectionHeading} gh-integration-header-shadow`}> <Link to="/tutorials/" className="link dim white">{title}</Link></h1>
                        <p className={Spirit.sectionSubHeading}>
                            This is a gallery of basic example <strong><Link to="/docs/userguide/notebook" className="link dim white">BioDynaMo notebooks:</Link></strong> click on the images to inspect the underlying document.
                        </p>
                    </div>
                </div>

                {/* <div className={`${Spirit.page.xl} mt-vw3`}> */}
                <div className={`${Spirit.page.xl} flex flex-column flex-row-ns ${sideBarLayout.justification} relative`}>
                    
                    <div>
                        <div className={`w-100 mw-content bg-white shadow-2 br4`}>
                            <article className="flex-auto pa5 pa8-m pa15-l pt10-ns pb10-ns pt10-l pb10-l relative">
                                {/* <section className="post-content grid-1 gutter-row-20 gutter-20-ns gutter-36-l"> */}
                                <NotebookRender notebook={ipynb}/>
                                
                                {/* </section> */}
                            </article>
                        </div>
                    </div>
                    
                </div>

            </Layout>
        </>
    )
}

JupyterNotebookPage.propTypes = {
    data: PropTypes.shape({
        site: PropTypes.shape({
            siteMetadata: PropTypes.shape({
                siteUrl: PropTypes.string.isRequired,
                title: PropTypes.string.isRequired,
                description: PropTypes.string.isRequired,
            }).isRequired,
        }).isRequired,
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
}


export default JupyterNotebookPage


export const JupyterNotebookPageQuery = graphql`
query($slug: String!) {
    site {
        ...SiteMetaFields
    }
    allJupyterNotebook(filter: {fileRelativePath: {eq: $slug}}) 
    {
      
      edges {
        node {
          fileRelativePath
          json {
              nbformat_minor
              cells {
              cell_type
              id
              source
              }
              nbformat
            }
            metadata {
              ipub {
                titlepage {
                  author
                  email
                  tagline
                  subtitle
                  title
                }
              }
              kernelspec {
                display_name
                language
                name
              }
              language_info {
                codemirror_mode
                file_extension
                mimetype
                name
              }
            }
        }
      }
    }

}

`
// allFile(filter: {relativePath: {eq: $slug}, extension: {eq: "ipynb"}, relativeDirectory: {eq: "biodynamo/notebook"}}) 
// {
  
//   edges {
//     node {
//       relativePath
//       relativeDirectory
//       name
//       internal {
//         content
//       }

    
//     }
//   }
// }

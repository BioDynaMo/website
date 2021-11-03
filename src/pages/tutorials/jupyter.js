
import React from 'react'
import { Link } from 'gatsby'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import { Layout } from '../../components/common/layout'
import { Spirit } from '../../styles/spirit-styles'
import { SidebarNav } from '../../components/common/sidebar'
import { MetaData, getMetaImageUrls } from '../../components/common/meta'

import { TOC } from '../../components/common'

const Tutorials = ({ data, location }) => {
    const title = `Tutorials`
    const description = `This is the tutorials page.`
    const imageUrl = getMetaImageUrls()
    console.log(data);
    const sideBarLayout = {}

    const sidebar = 'tutorial'
    const toc = true

    if (sidebar && toc) {
        // Layout #1: navigation left and right: sidebar and TOC
        console.log("sidebar && toc")
        sideBarLayout.leftSidebar = <SidebarNav location={location} sidebar={sidebar} />
        sideBarLayout.rightSidebar = <div className="nr3 sticky top-25"><TOC className="pr4" listClasses="mt2" /></div>
        sideBarLayout.justification = `justify-between`
    } else if (sidebar || toc) {
        // Layout #2: navigation left only, either TOC or sidebar

        sideBarLayout.leftSidebar = sidebar ?
            <SidebarNav location={location} sidebar={sidebar} /> :
            <div className="nr3 sticky top-25"><TOC listClasses="lefty" className="mt5 mb5 mt10-ns mb0-ns" showHeading={true} /></div>
        sideBarLayout.justification = `justify-start`
    } else {
        // Layout #3: no sidebar navigation
        sideBarLayout.justification = `justify-center`
    }
    console.log(sideBarLayout);

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
                            This is a gallery of basic example <strong><Link to="/docs/userguide/notebook" className="link dim white">BioDynaMo Interpreted Jupyter notebooks:</Link></strong>
                        </p>
                    </div>
                </div>

                {/* <div className={`${Spirit.page.xl} mt-vw3`}> */}
                <div className={`${Spirit.page.xl} flex flex-column flex-row-ns ${sideBarLayout.justification} relative`}>
                    {sideBarLayout.leftSidebar ?
                        <div className={`${(false ? `mobile-nav-open` : ``)} w-100 w-sidebar-ns pr10 pl5 pl0-ns flex-shrink-0-l relative left-sidebar`}>
                            {sideBarLayout.leftSidebar}
                        </div>
                        : null
                    }
                    <div>
                        <div className={`w-100 mw-content bg-white shadow-2 br4`}>
                            <article className="flex-auto pa5 pa8-m pa15-l pt10-ns pb10-ns pt10-l pb10-l relative">
                                <section className="post-content external-scripts">
                                    {
                                        data.allJupyterNotebook.nodes.map(node => {
                                            console.log(node)
                                            let staticPath = node.fileRelativePath.split("biodynamo/")[1]
                                            let name = node.fileRelativePath.split("/")[2];
                                            let json = node.json;
                                            let title = name.charAt(0).toUpperCase() + name.slice(1).replace("-", " ")
                                            let html = "/" + staticPath.replace(".ipynb", ".html")
                                            let binder = "https://mybinder.org/v2/gh/BioDynaMo/binder-demo/master?filepath=notebook/notebook/" + name
                                            const cleaned_first_cell = json['cells'][0]['source'].reduce((acc, text) => acc + text.replace("#", "")).replace("#", "").split("**");
                                            let notebookTitle = cleaned_first_cell[0].trim();
                                            let Author = cleaned_first_cell[1].trim();
                                            let text = cleaned_first_cell[2];
                                            let githubNotebookLink= "https://github.com/BioDynaMo/biodynamo/blob/master/notebook/" + name;

                                            return (
                                                <>
                                                    <h2 id={notebookTitle} className={`darkgrey`} >{notebookTitle}</h2>
                                                    <div style={{ paddingLeft: "2rem" }}>
                                                        <p>{Author}, Filename: <a target="_blank" href={githubNotebookLink}> {title} </a> </p>
                                                        <p style={{marginTop: 0}} dangerouslySetInnerHTML={{ __html: text }}></p>
                                                        <div style={{ display: "flex", justifyContent: "center", }}>
                                                            <br />
                                                            <a style={{ boxShadow: 'none', }} href={html} target="_blank" > <button className={`${Spirit.greybutton}`}><b>View now</b></button></a>
                                                            <br />
                                                            <a style={{ boxShadow: 'none', }} href={binder} target="_blank" > <button className={`${Spirit.greenbutton}`}><b>Run now</b></button></a>
                                                        </div>

                                                    </div>
                                                    <hr style={{ borderTop: "8px solid #bbb", }} />

                                                </>
                                            )
                                        })
                                    }
                                </section>
                            </article>
                        </div>
                    </div>
                    {sideBarLayout.rightSidebar ?
                        <div className="order-3 w-sidebar flex-shrink-0 dn db-l pt10 pl7">
                            {/* {sideBarLayout.rightSidebar} */}
                            <div className="f4 measure--0-2 middarkgrey ma0 mb2 pa0 fw4 nudge-bottom--2" style={{ position: 'sticky', top: '6vh' }}><h3> On this page</h3>
                                <div className="toc-list-container mt2 ">
                                    <ol className="toc-list ">
                                        {data.allJupyterNotebook.nodes.map(node => {
                                            let name = node.fileRelativePath.split("/")[1];
                                            let json = node.json;
                                            let title = name.charAt(0).toUpperCase() + name.slice(1).replace("-", " ");
                                            const cleaned_first_cell = json['cells'][0]['source'].reduce((acc, text) => acc + text.replace("#", "")).replace("#", "").split("**");
                                            let notebookTitle = cleaned_first_cell[0].trim();
                                            let Author = cleaned_first_cell[1];
                                            let text = cleaned_first_cell[2];
                                            return (
                                                <li className="toc-list-item">
                                                    <a href={"#" + notebookTitle} className="toc-link node-name--H2 ">
                                                        {notebookTitle}
                                                    </a>
                                                </li>)
                                        })}
                                    </ol></div>
                            </div>
                        </div>
                        : null
                    }
                </div>

            </Layout>
        </>
    )
}

Tutorials.propTypes = {
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

export default Tutorials

export const tutorialsQuery = graphql`
    query {
        site {
            ...SiteMetaFields
        }
      
        
        allJupyterNotebook(filter: {fileRelativePath: {regex: "/biodynamo/notebooks/"}}
        sort: {order: ASC, fields: fileRelativePath}) {
            nodes {
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
`

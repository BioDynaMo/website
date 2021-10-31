import React from 'react'
import { Link } from 'gatsby'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import { Layout } from '../../components/common/layout'
import { Spirit } from '../../styles/spirit-styles'
import { SidebarNav } from '../../components/common/sidebar'
import { MetaData, getMetaImageUrls } from '../../components/common/meta'
import { TutorialBox, JupyterTutorialBox } from '../../components/tutorials'
import { TOC } from '../../components/common'

const Tutorials = ({ data, location }) => {
    const title = `Tutorials`
    const description = `This is the tutorials page.`
    const imageUrl = getMetaImageUrls()

  
    console.log(data)
    const sideBarLayout = {}

    const sidebar  = 'tutorial'
    const toc =  true

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
            <div className="nr3 sticky top-25"><TOC listClasses="lefty" className="mt5 mb5 mt10-ns mb0-ns" showHeading={false} /></div>
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
                            This is a gallery of basic example <strong><Link to="/docs/userguide/notebook" className="link dim white">BioDynaMo notebooks:</Link></strong> click on the images to inspect the underlying document.
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
                    <section className="grid-12 gutter-row-20 gutter-20-ns gutter-36-l">

                        {
                            data.compiled_folders.edges.map(edge => (
                                <TutorialBox
                                    html={"/notebooks/" + edge.node.relativePath}
                                    title={edge.node.relativePath}
                                    src={"/images/notebooks/" + edge.node.name + ".png"}
                                    binder={"https://mybinder.org/v2/gh/BioDynaMo/binder-demo/dockerfile?filepath=%2F" + edge.node.name + "%2F" + edge.node.name + ".ipynb"}>
                                </TutorialBox>
                            ))
                        }

                    </section>
                    {sideBarLayout.rightSidebar ?
                            <div className="order-3 w-sidebar flex-shrink-0 dn db-l pt10 pl7">
                                {sideBarLayout.rightSidebar}
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
        compiled_folders :allDirectory(
            filter: { sourceInstanceName: {eq: "compiled_notebooks"},relativeDirectory: {eq: ""}}
          ) {
            edges {
              node {
                id
                relativePath
                dir
                relativeDirectory
                sourceInstanceName
              }
            }
          }
        
    }
`

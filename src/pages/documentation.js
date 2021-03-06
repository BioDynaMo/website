import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import { Spirit } from '../styles/spirit-styles'
import { Layout } from '../components/common/layout'
import { SetupBox } from '../components/setup'
import { MetaData, getMetaImageUrls } from '../components/common/meta'

const DocPage = ({ data, location }) => {
    // Add meta title and description for this page here to overwrite the site meta data as set in the config
    const title = `Documentation`
    const description = `Path to all documentation.`
    const imageUrl = getMetaImageUrls()

    return (
        <>
            <MetaData
                data={data}
                location={location}
                type="website"
                title={title || data.site.siteMetadata.title}
                description={description || data.site.siteMetadata.description}
                image={imageUrl}
            />
            <Layout mainClass="bg-whitegrey-l2 pb-vw3" bodyClass="bg-white">
                <section className="bg-setup">
                    <div className={`${Spirit.page.xl} tc-ns pt-vw6 pt-vw5-ns pb-vw5 white`}>
                        <h1 className={`${Spirit.sectionHeading} gh-integration-header-shadow`}>Documentation</h1>
                    </div>
                </section>

                <div className={`${Spirit.page.xl} mt-vw3`}>

                    <section className="grid-12 gutter-row-20 gutter-20-ns gutter-36-l">
                        <SetupBox to="/docs/userguide/" title="User Guide" icon="presentation-code" iconClass="w9 h9" headingClass="mt2">
                            <p className={`${Spirit.small} mw70`}>
                                Learn the fundamentals of BioDynaMo and how to get started.
                            </p>
                        </SetupBox>

                        <SetupBox to="/docs/devguide/" title="Developer Guide" icon="terminal" iconClass="w9 h9" headingClass="mt2">
                            <p className={`${Spirit.small} mw70`}>
                                Learn how to build and contribute to the BioDynaMo project.
                            </p>
                        </SetupBox>

                        <SetupBox href="/api" title="API Reference" icon="network" iconClass="w9 h9" headingClass="mt2">
                            <p className={`${Spirit.small} mw70`}>
                                Learn the technical details to apply BioDynaMo to your own use case.
                            </p>
                        </SetupBox>

                    </section>
                </div>
            </Layout>
        </>
    )
}

DocPage.propTypes = {
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

export default DocPage

export const pageQuery = graphql`
    query {
        site {
            ...SiteMetaFields
        }
    }
`

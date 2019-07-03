import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import { Spirit } from '../styles/spirit-styles'
import { Layout } from '../components/common/layout'
import { SetupBox } from '../components/setup'
import { MetaData, getMetaImageUrls } from '../components/common/meta'

const UserGuide = ({ data, location }) => {
    // Add meta title and description for this page here to overwrite the site meta data as set in the config
    const title = `BioDynaMo User Guide`
    const description = `Get familiar with BioDynaMo - the open source biology dynamics modeller.  Install guides, tutorials, API docs and FAQs.`
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
                <section className="gh-bg-home">
                    <div className={`left white`}>
                        <h1 className={`${Spirit.thinheadline} gh-integration-header-shadow`}>User Guide</h1>
                        <p className={Spirit.h5}>
                            {description}
                        </p>
                    </div>
                </section> 
                
            </Layout>
        </>
    )
}

UserGuide.propTypes = {
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

export default UserGuide

export const pageQuery = graphql`
    query {
        site {
            ...SiteMetaFields
        }
    }
`

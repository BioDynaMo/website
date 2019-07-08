import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import { MetaData, getMetaImageUrls } from '../components/common/meta'
import { Layout } from '../components/common/layout'

const AboutPage = ({data,location}) => {
	const title = `About BioDynaMo`
	const description = `Short description of what BioDynaMo is.`

	return (
		<>
			<MetaData 
				data={data}
				location={location}
				type="website"
				title={title}
				description={description}
			/>
			<Layout>
	    	
	    	</Layout>
	    </>
	)
}

AboutPage.propTypes = {
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

export default AboutPage

export const pageQuery = graphql`
    query {
        site {
            ...SiteMetaFields
        }
    }
`


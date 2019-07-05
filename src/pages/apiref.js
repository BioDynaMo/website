import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import { MetaData, getMetaImageUrls } from '../components/common/meta'
import { Layout } from '../components/common/layout'

const ApiDocPage = ({data,location}) => {
	const title = `API Reference`
	const description = `API documentation page.`

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
	    	<iframe src="/apiguide/" width="100%" height="1500"></iframe>
	    	</Layout>
	    </>
	)
}

ApiDocPage.propTypes = {
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

export default ApiDocPage

export const pageQuery = graphql`
    query {
        site {
            ...SiteMetaFields
        }
    }
`


import React from 'react'
import { Link } from 'gatsby'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'

import { Icon, Box } from '../components/common'
import { Layout } from '../components/common/layout'
import { Spirit } from '../styles/spirit-styles'
import { MetaData, getMetaImageUrls } from '../components/common/meta'
import { SetupBox } from '../components/setup'
//import {TeamPics} from '../components/common/team/TeamPics'


const TeamPage = ({data, location}) => {

	const title = `Our Team`
	const description = `This page shows the list of team mebers for the BioDynaMo project`
	const imageUrl = getMetaImageUrls()

	return(
		<>
			<MetaData
				data={data}
				location={location}
				type="website"
				description={description}
				image={imageUrl}
			/>
			<Layout mainClass="bg-whitegrey-l2 pb-vw3" bodyClass="bg-white">
			<section className="bg-setup">
                    <div className={`${Spirit.page.xl} tc-ns pt-vw6 pt-vw5-ns pb-vw5 white`}>
                        <h1 className={`${Spirit.sectionHeading} gh-integration-header-shadow`}>Our Team</h1>
                    </div>
                </section>
                <div className={`${Spirit.page.xl} mt-vw3`}>
                    <section className="grid-12 gutter-row-20 gutter-20-ns gutter-36-l">
						<SetupBox title="Test" to="/" icon="download-solid"/>
						
					</section>
					<img style="teampic" src="/favicon.png" />
				</div>
			</Layout>
		</>
	)
}

TeamPage.propTypes = {
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

export default TeamPage

export const pageQuery = graphql`
    query {
        site {
            ...SiteMetaFields
        }
    }
`

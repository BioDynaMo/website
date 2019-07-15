import React from 'react'
import { Link } from 'gatsby'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import { PostHeader} from '../components/common'

import { Icon, Box } from '../components/common'
import { Layout } from '../components/common/layout'
import { Spirit } from '../styles/spirit-styles'
import { MetaData, getMetaImageUrls } from '../components/common/meta'
import { GalleryBox } from '../components/gallery'

const GalleryPage = ({data, location}) => {

	const title = `Gallery`
	const description = `This is the gallery and demo page.`
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
	    	
                <PostHeader location={location}/>

                <div className={`${Spirit.page.xl} mt-vw3`}>

                    <section className="grid-16 gutter-row-20 gutter-20-ns gutter-36-l">

                        <GalleryBox to="/biodynamo/doc/user_guide/docs/" title="Demo 1" src="/test.png" headingClass="mt2">
                            <p className={`${Spirit.small} mw70`}>
                                Description here!
                            </p>
                        </GalleryBox>

                        <GalleryBox to="/biodynamo/doc/user_guide/docs/" title="Demo 2" src="/test.png" headingClass="mt2">
                            <p className={`${Spirit.small} mw70`}>
                                Description here!
                            </p>
                        </GalleryBox>

                        <GalleryBox to="/biodynamo/doc/user_guide/docs/" title="Demo 3" src="/test.png" headingClass="mt2">
                            <p className={`${Spirit.small} mw70`}>
                                Description here!
                            </p>
                        </GalleryBox>

                        <GalleryBox to="/biodynamo/doc/user_guide/docs/" title="Demo 4" src="/test.png" headingClass="mt2">
                            <p className={`${Spirit.small} mw70`}>
                                Description here!
                            </p>
                        </GalleryBox>

                        <GalleryBox to="/biodynamo/doc/user_guide/docs/" title="Demo 5" src="/test.png" headingClass="mt2">
                            <p className={`${Spirit.small} mw70`}>
                                Description here!
                            </p>
                        </GalleryBox>

                        <GalleryBox to="/biodynamo/doc/user_guide/docs/" title="Demo 6" src="/test.png" headingClass="mt2">
                            <p className={`${Spirit.small} mw70`}>
                                Description here!
                            </p>
                        </GalleryBox>

                        <GalleryBox to="/biodynamo/doc/user_guide/docs/" title="Demo 7" src="/test.png" headingClass="mt2">
                            <p className={`${Spirit.small} mw70`}>
                                Description here!
                            </p>
                        </GalleryBox>

                        <GalleryBox to="/biodynamo/doc/user_guide/docs/" title="Demo 8" src="/test.png" headingClass="mt2">
                            <p className={`${Spirit.small} mw70`}>
                                Description here!
                            </p>
                        </GalleryBox>

                    </section>

                </div>
            
			</Layout>
		</>
	)
}

GalleryPage.propTypes = {
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

export default GalleryPage

export const pageQuery = graphql`
    query {
        site {
            ...SiteMetaFields
        }
    }
`

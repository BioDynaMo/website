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
				title={title}
				type="website"
				description={description}
				image={imageUrl}
			/>
			<Layout mainClass="bg-whitegrey-l2 pb-vw3" bodyClass="bg-white">

                <div className="bg-concepts">
                    <div className={`${Spirit.page.xl} pt12 pb4 pt-vw1-ns pb-vw1-ns white pl10 pl0-ns`}>
                        <h1 className={`${Spirit.h4} gh-integration-header-shadow`}>
                            <Link to="/about/" className="link dim white">{title}</Link>
                        </h1>
                    </div>
                </div>

                <div className={`${Spirit.page.xl} mt-vw3`}>

                    <section className="grid-12 gutter-row-20 gutter-20-ns gutter-36-l">

                        <GalleryBox href="/docs/userguide/" title="Demo 1" src="/paraview7-4.png">
                            <p className={`${Spirit.p} mw70`}>
                                Description here!
                            </p>
                        </GalleryBox>

                        <GalleryBox to="/docs/userguide/" title="Demo 2" src="/paraview7-4.png">
                            <p className={`${Spirit.p} mw70`}>
                                Description here!
                            </p>
                        </GalleryBox>

                        <GalleryBox to="/docs/userguide/" title="Demo 3" src="/paraview7-4.png">
                            <p className={`${Spirit.p} mw70`}>
                                Description here!
                            </p>
                        </GalleryBox>

                        <GalleryBox to="/docs/userguide/" title="Demo 4" src="/paraview7-4.png">
                            <p className={`${Spirit.p} mw70`}>
                                Description here!
                            </p>
                        </GalleryBox>

                        <GalleryBox to="/docs/userguide/" title="Demo 5" src="/paraview7-4.png">
                            <p className={`${Spirit.p} mw70`}>
                                Description here!
                            </p>
                        </GalleryBox>

                        <GalleryBox to="/docs/userguide/" title="Demo 6" src="/paraview7-4.png">
                            <p className={`${Spirit.p} mw70`}>
                                Description here!
                            </p>
                        </GalleryBox>

                        <GalleryBox to="/docs/userguide/" title="Demo 7" src="/paraview7-4.png">
                            <p className={`${Spirit.p} mw70`}>
                                Description here!
                            </p>
                        </GalleryBox>

                        <GalleryBox to="/docs/userguide/" title="Demo 8" src="/paraview7-4.png">
                            <p className={`${Spirit.p} mw70`}>
                                Description here!
                            </p>
                        </GalleryBox>

                        <GalleryBox to="/docs/userguide/" title="Demo 8" src="/paraview7-4.png">
                            <p className={`${Spirit.p} mw70`}>
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
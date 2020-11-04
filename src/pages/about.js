import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import { Spirit } from '../styles/spirit-styles'
import { MemberBox } from '../components/common/team'
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
			<Layout mainClass="bg-whitegrey-l2 pb-vw3" bodyClass="bg-white">

                <div className="bg-concepts">
                    <div className={`${Spirit.page.xl} pt12 pb4 pt-vw1-ns pb-vw1-ns white pl10 pl0-ns`}>
                        <h1 className={`${Spirit.h4} gh-integration-header-shadow`}>
                            <Link to="/about/" className="link dim white">{title}</Link>
                        </h1>
                    </div>
                </div>

                <div className={`${Spirit.page.xl} pb-vw4 pb-vw3-ns pt-vw4 pt-vw3-ns`}>

                    <h2 className={`${Spirit.h2} pt20 nt20`}>
                    Project
                    </h2>

                    <p className={`${Spirit.excerpt} midgrey-l2 mt2`}>
                    This is what we do...
                    </p>

                    <div className="mt3"/>

                    <h2 className={`${Spirit.h2} pt20 nt20`}>
                    Team
                    </h2>

                    <div className="mt5"/>

                    <section className="grid-16 gutter-row-20 gutter-20-ns gutter-36-l">

                        <MemberBox
                            name="Lukas Breitwieser"
                            imgsrc="/images/team/lukas-breitwieser.jpg"
                            description="Lead Developer">
                        </MemberBox>

                        <MemberBox
                            name="Test Member"
                            imgsrc="/images/team/placeholder.png"
                            description="TBD">
                        </MemberBox>

                        <MemberBox
                            name="Test Member"
                            imgsrc="/images/team/placeholder.png"
                            description="TBD">
                        </MemberBox>

                        <MemberBox
                            name="Test Member"
                            imgsrc="/images/team/placeholder.png"
                            description="TBD">
                        </MemberBox>

                        <MemberBox
                            name="Test Member"
                            imgsrc="/images/team/placeholder.png"
                            description="TBD">
                        </MemberBox>

                        <MemberBox
                            name="Test Member"
                            imgsrc="/images/team/placeholder.png"
                            description="TBD">
                        </MemberBox>

                        <MemberBox
                            name="Test Member"
                            imgsrc="/images/team/placeholder.png"
                            description="TBD">
                        </MemberBox>

                    </section>

                    <div className="mt5"/>

                    <h2 className={`${Spirit.h2} pt20 nt20`}>
                    Leadership Team
                    </h2>

                    <div className="mt5"/>

                    <section className="grid-16 gutter-row-28 gutter-20-ns gutter-36-l">

                        <MemberBox
                            name="Test Alumni"
                            imgsrc="/images/team/placeholder.png"
                            description="TBD">
                        </MemberBox>

                        <MemberBox
                            name="Test Alumni"
                            imgsrc="/images/team/placeholder.png"
                            description="TBD">
                        </MemberBox>

                        <MemberBox
                            name="Test Alumni"
                            imgsrc="/images/team/placeholder.png"
                            description="TBD">
                        </MemberBox>

                        <MemberBox
                            name="Test Alumni"
                            imgsrc="/images/team/placeholder.png"
                            description="Co-Founder and Chairman of the Board of Directors at SCimPulse Foundation">
                        </MemberBox>

                    </section>

                    <div className="mt5"/>

                    <h2 className={`${Spirit.h2} pt20 nt20`}>
                    Our Alumni
                    </h2>

                    <div className="mt5"/>

                    <section className="grid-16 gutter-row-28 gutter-20-ns gutter-36-l">

                        <MemberBox
                            name="Test Alumni"
                            imgsrc="/images/team/placeholder.png"
                            description="TBD">
                        </MemberBox>

                        <MemberBox
                            name="Test Alumni"
                            imgsrc="/images/team/placeholder.png"
                            description="TBD">
                        </MemberBox>

                        <MemberBox
                            name="Test Alumni"
                            imgsrc="/images/team/placeholder.png"
                            description="TBD">
                        </MemberBox>

                        <MemberBox
                            name="Test Alumni"
                            imgsrc="/images/team/placeholder.png"
                            description="TBD">
                        </MemberBox>

                    </section>

                </div>

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

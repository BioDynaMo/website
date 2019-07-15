import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { PostHeader} from '../components/common'

import { Spirit } from '../styles/spirit-styles'
import { SetupBox } from '../components/setup'
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
	    	
                <PostHeader location={location}/>

                <div className={`${Spirit.page.l} pb-vw4 pb-vw3-ns pt-vw4 pt-vw3-ns`}>

                    <h2 className={`${Spirit.h3} pt20 nt20`}>
                    The Project
                    </h2>

                    <p className={`${Spirit.small} midgrey-l2 mt2`}>
                    This is what we do!
                    </p>

                    <div className="mt3"/>

                    <h2 className={`${Spirit.h3} pt20 nt20`}>
                    The Team
                    </h2>

                    <div className="mt5"/>

                    <section className="grid-12 gutter-row-20 gutter-20-ns gutter-36-l">

                        <MemberBox href="/" name="Test Member" src="/test.png" headingClass="mt2">
                            
                            <p className={`${Spirit.small} mw70`}>
                                Position 
                            </p>

                        </MemberBox>

                        <MemberBox href="/" name="Test Member" src="/test.png" headingClass="mt2">
                            
                            <p className={`${Spirit.small} mw70`}>
                                Position 
                            </p>

                        </MemberBox>

                        <MemberBox href="/" name="Test Member" src="/test.png" headingClass="mt2">
                            
                            <p className={`${Spirit.small} mw70`}>
                                Position
                            </p>

                        </MemberBox>

                    </section>

                    <div className="mt5"/>

                    <h2 className={`${Spirit.h3} pt20 nt20`}>
                    The Alumni
                    </h2>

                    <div className="mt5"/>

                    <section className="grid-12 gutter-row-20 gutter-20-ns gutter-36-l">

                        <MemberBox href="/" name="Test Alumni" src="/test.png" headingClass="mt2">
                            
                            <p className={`${Spirit.small} mw70`}>
                                Position 
                            </p>

                        </MemberBox>

                        <MemberBox href="/" name="Test Alumni" src="/test.png" headingClass="mt2">
                            
                            <p className={`${Spirit.small} mw70`}>
                                Position 
                            </p>

                        </MemberBox>

                        <MemberBox href="/" name="Test Alumni" src="/test.png" headingClass="mt2">
                            
                            <p className={`${Spirit.small} mw70`}>
                                Position
                            </p>

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


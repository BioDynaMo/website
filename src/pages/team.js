import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import { Spirit } from '../styles/spirit-styles'
import { MemberBox } from '../components/common/team'
import { MetaData, getMetaImageUrls } from '../components/common/meta'
import { Layout } from '../components/common/layout'

const AboutPage = ({data,location}) => {
	const title = `BioDynaMo Team`
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
                            <Link to="/team/" className="link dim white">{title}</Link>
                        </h1>
                    </div>
                </div>

                <div className={`${Spirit.page.xl} pb-vw4 pb-vw3-ns pt-vw4 pt-vw3-ns`}>

                    <div className="mt3"/>

                    <h2 className={`${Spirit.h2} pt20 nt20`}>
                    Technical Team
                    </h2>

                    <div className="mt5"/>

                    <section className="grid-16 gutter-row-20 gutter-20-ns gutter-36-l">

                        <MemberBox
                            name="Lukas Breitwieser"
                            imgsrc="/images/team/lukas-breitwieser.jpg"
                            description="Lead Developer (CERN, ETH Zurich)">
                        </MemberBox>

                        <MemberBox
                            name="Ahmad Hesam"
                            imgsrc="/images/team/ahmad-hesam.jpg"
                            description="Core Developer (CERN, TU Delft)">
                        </MemberBox>

                        <MemberBox
                            name="Jean de Montigny"
                            imgsrc="/images/team/jdm.png"
                            description="TBD (CERN)">
                        </MemberBox>

                        <MemberBox
                            name="Jack Jennings"
                            imgsrc="/images/team/placeholder.png"
                            description="TBD (Newcastle University)">
                        </MemberBox>

                        <MemberBox
                            name="Dorukhan Arslan"
                            imgsrc="/images/team/placeholder.png"
                            description="TBD">
                        </MemberBox>

                        <MemberBox
                            name="Robert Harakaly"
                            imgsrc="/images/team/robert-harakaly.jpg"
                            description="Trainee (CERN)">
                        </MemberBox>

                        <MemberBox
                            name="Nicolò Cogno"
                            imgsrc="/images/team/nicolo-cogno.jpg"
                            description="TBD (TU Darmstadt)">
                        </MemberBox>

                    </section>

                    <div className="mt5"/>

                    <h2 className={`${Spirit.h2} pt20 nt20`}>
                    Leadership Team
                    </h2>

                    <div className="mt5"/>

                    <section className="grid-16 gutter-row-28 gutter-20-ns gutter-36-l">

                        <MemberBox
                            name="Roman Bauer"
                            imgsrc="/images/team/roman-bauer.jpg"
                            description="BioDynaMo Collarboration Spokesperson and Lecturer at University of Surrey">
                        </MemberBox>

                        <MemberBox
                            name="Marco Durante"
                            imgsrc="/images/team/marco-durante.jpg"
                            description="Scientific Head of Biophysics Department at GSI">
                        </MemberBox>

                        <MemberBox
                            name="Alberto Di Meglio"
                            imgsrc="/images/team/alberto-di-meglio.jpg"
                            description="CERN openlab Head">
                        </MemberBox>

                        <MemberBox
                            name="Marcus Kaiser"
                            imgsrc="/images/team/marcus-kaiser.jpg"
                            description="Professor of Neuroinformatics in the School of Computing at Newcastle University">
                        </MemberBox>

                        <MemberBox
                            name="Olivia Keiser"
                            imgsrc="/images/team/olivia-keiser.jpg"
                            description="Head of division of Infectious Diseases and Mathematical Modelling (University of Geneva)">
                        </MemberBox>

                        <MemberBox
                            name="Marco Manca"
                            imgsrc="/images/team/marco-manca.jpg"
                            description="Co-Founder and Chairman of the Board of Directors at SCimPulse Foundation">
                        </MemberBox>

                        <MemberBox
                            name="Omri Matalon"
                            imgsrc="/images/team/placeholder.png"
                            description="TBD (ImmunoBrain Checkpoint)">
                        </MemberBox>

                        <MemberBox
                            name="Fons Rademakers"
                            imgsrc="/images/team/fons-rademakers.jpg"
                            description="CERN openlab Chief Research Officer">
                        </MemberBox>

                        <MemberBox
                            name="Alessandro Raimondo"
                            imgsrc="/images/team/alessandro-raimondo.jpg"
                            description="CERN Knowledge Transfer Officer for Medical Applications">
                        </MemberBox>

                        <MemberBox
                            name="Vasileios Vavourakis"
                            imgsrc="/images/team/vasileios-vavourakis.jpg"
                            description="Assistant Professor, University of Cyprus; Honorary Senior Lecturer, UCL">
                        </MemberBox>

                    </section>

                    <div className="mt5"/>

                    <h2 className={`${Spirit.h2} pt20 nt20`}>
                    Alumni
                    </h2>

                    <div className="mt5"/>

                    <section className="grid-16 gutter-row-28 gutter-20-ns gutter-36-l">

                        <MemberBox
                            name="Berina Bandić"
                            imgsrc="/images/team/berina-bandic.jpg"
                            description="CERN openlab online summer intern 2020">
                        </MemberBox>

                        <MemberBox
                            name="Giovanni De Toni"
                            imgsrc="/images/team/giovanni-de-toni.jpg"
                            description="CERN openlab summer student 2019">
                        </MemberBox>

                        <MemberBox
                            name="Martin Litre"
                            imgsrc="/images/team/placeholder.png"
                            description="TBD">
                        </MemberBox>

                        <MemberBox
                            name="Nam Nguyen"
                            imgsrc="/images/team/placeholder.png"
                            description="CERN openlab summer student 2018">
                        </MemberBox>

                        <MemberBox
                            name="Konstantinos Kanellis"
                            imgsrc="/images/team/konstantinos-kanellis.jpg"
                            description="CERN openlab summer student 2017">
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

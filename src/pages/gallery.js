// import React from 'react'
// import { Link } from 'gatsby'
// import { graphql } from 'gatsby'
// import PropTypes from 'prop-types'

// import { Icon, Box } from '../components/common'
// import { Layout } from '../components/common/layout'
// import { Spirit } from '../styles/spirit-styles'
// import { MetaData, getMetaImageUrls } from '../components/common/meta'
// import { SetupBox } from '../components/setup'
// import {TeamPics } from '../components/common/team'

// const TeamPage = ({data, location}) => {

// 	const title = `Our Team`
// 	const description = `This page shows the list of team mebers for the BioDynaMo project`
// 	const imageUrl = getMetaImageUrls()

// 	return(
// 		<>
// 			<MetaData
// 				data={data}
// 				location={location}
// 				type="website"
// 				description={description}
// 				image={imageUrl}
// 			/>
// 			<Layout>

//             <div class="grid-container">

//                 <div class="grid-header">
//                     <h1 > BioDynaMo's Team</h1>
//                 </div>

//                 <div class="grid-team-1">
//                     <h2 >Team Number 1</h2>
//                 </div>

//                 <div class="grid-team-2">
//                     <h2 >Team Number 2</h2>
//                 </div>

//                 <TeamPics to="/test.png" name="Member Name" position="Position"/>

//                 <TeamPics to="/test.png" name="Member Name" position="Position"/>

//                 <TeamPics to="/test.png" name="Member Name" position="Position"/>

//                 <TeamPics to="/test.png" name="Member Name" position="Position"/>

//                 <TeamPics to="/test.png" name="Member Name" position="Position"/>

//                 <TeamPics to="/test.png" name="Member Name" position="Position"/>

//             </div>
// 			</Layout>
// 		</>
// 	)
// }

// TeamPage.propTypes = {
//     data: PropTypes.shape({
//         site: PropTypes.shape({
//             siteMetadata: PropTypes.shape({
//                 siteUrl: PropTypes.string.isRequired,
//                 title: PropTypes.string.isRequired,
//                 description: PropTypes.string.isRequired,
//             }).isRequired,
//         }).isRequired,
//     }).isRequired,
//     location: PropTypes.shape({
//         pathname: PropTypes.string.isRequired,
//     }).isRequired,
// }

// export default TeamPage

// export const pageQuery = graphql`
//     query {
//         site {
//             ...SiteMetaFields
//         }
//     }
// `

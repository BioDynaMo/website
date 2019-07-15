// import React from "react"
// import { StaticQuery, graphql, Link } from "gatsby"
// import PostLink from "./post-link"
// import PropTypes from 'prop-types'

// const BlogList = ({ data }) => (

//     <h1>{data.allMarkdownRemark.frontmatter.title}</h1>

// )

// // class BlogList extends React.Component {
// // 	constructor(props) {
// // 		super(props)
// // 	}
   
// // 	render() {

// // 	    return (
// // 		    {this.allMarkdownRemark.map(post => (
		 
// // 		    	<Link 
// // 		    		key={post.node.id}
// // 		    		href={post.node.frontmatter.path}>
// // 		    		{post.node.frontmatter.title}
// // 		    	</Link>
				
// // 		    ))}
// // 		)
// // 	}
// // }

// export default props => (
//   <StaticQuery
//     query={graphql`
//       query {
//           allMarkdownRemark(sort: {order: DESC, fields: frontmatter___date}, filter: {frontmatter: {path: {regex: "/biodynamo/doc/"}}}, limit: 4) {
//           nodes {
//           	id
//             frontmatter {
//               date
//               title
//               path
//               meta_description
//             }
//           }
//         }
//       }
//     `}
//     render={data => (
//             <div>
//                 {data.allMarkdownRemark.map(({ node }) => (
//                     <div key={node.id}>
//                         <div>
//                             <h2>{node.frontmatter.title}
//                                 <span>{node.frontmatter.date}</span>
//                             </h2>
//                             <p>Trial text</p>
//                             <Link to="/" >
//                                 See this project
                                
//                             </Link>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         )}
//     />
// )

// export default BlogList


// // import React from 'react'
// // import PropTypes from 'prop-types'
// // import { Link, StaticQuery, graphql } from 'gatsby'

// // import { Spirit } from '../../styles/spirit-styles'

// // const HomeFAQLink = ({ to, title, children }) => (
// //     <Link to={to} className="midgrey home-faq-question link dib pt1 pb5">
// //         <h4 className={`${Spirit.h5} blue dib`}>{title} &raquo;</h4>
// //         <p className={`${Spirit.small} mt0`}>{children}</p>
// //     </Link>

// //     <Link to={to} className="midgrey home-faq-question link dib pt1 pb5">
// //         <h4 className={`${Spirit.h5} blue dib`}>{title} &raquo;</h4>
// //         <p className={`${Spirit.small} mt0`}>{children}</p>
// //     </Link>

// //     <Link to={to} className="midgrey home-faq-question link dib pt1 pb5">
// //         <h4 className={`${Spirit.h5} blue dib`}>{title} &raquo;</h4>
// //         <p className={`${Spirit.small} mt0`}>{children}</p>
// //     </Link>
// // )

// // HomeFAQLink.propTypes = {
// //     to: PropTypes.string.isRequired,
// //     title: PropTypes.string.isRequired,
// //     children: PropTypes.node.isRequired,
// // }

// // export default HomeFAQLink

// // export const pageQuery = graphql`
// //   query {
// //     allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
// //       edges {
// //         node {
// //           id
// //           excerpt(pruneLength: 250)
// //           frontmatter {
// //             date(formatString: "YYYY-MM-DD")
// //             path
// //             title
// //           }
// //         }
// //       }
// //     }
// //   }
// // `

import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { Spirit } from '../../styles/spirit-styles'

const BlogList = ({limit}) => {
  const  data  = useStaticQuery(
    graphql`
      query {
        allMarkdownRemark(sort: {order: DESC, fields: frontmatter___date}, filter: {frontmatter: {path: {regex: "/biodynamo/doc/"}}}, limit: 8) {
          nodes {
            id
            frontmatter {
              date(formatString: "YYYY-MM-DD")
              title
              path
              meta_description
            }
          }
        }
      }
    `
  )

  return data.allMarkdownRemark.nodes.map(nodes => (
  	<span key ={nodes.id}>
	  	<Link to={nodes.frontmatter.path} className="midgrey home-faq-question link dib pt1 pb5">
	        <h4 className={`${Spirit.h5} blue dib`}>{nodes.frontmatter.title} &raquo;</h4>
	        <h5 className={`${Spirit.h6} `}>{nodes.frontmatter.date} </h5>
	        <p className={`${Spirit.small} mt0`}>{nodes.frontmatter.meta_description}</p>
	    </Link>
	    <br/>
    </span>
  	)).slice(0,limit)
}

export default BlogList
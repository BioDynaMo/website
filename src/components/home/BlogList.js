import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { Spirit } from '../../styles/spirit-styles'

const BlogList = ({limit}) => {
  const  data  = useStaticQuery(
    graphql`
      query {
        allMarkdownRemark(sort: {order: DESC, fields: frontmatter___date}, filter: {fields: {slug: {regex: "/biodynamo/doc/"}}}) {
          nodes {
            id
            excerpt(pruneLength: 75)
            frontmatter {
              date(formatString: "DD-MM-YYYY")
              title
              path
              meta_description
            }
            fields {
              slug
            }
          }
        }
      }
    `
  )

  return data.allMarkdownRemark.nodes.map(nodes => (
  	<span key ={nodes.id}>
	  	<Link to={nodes.fields.slug} className="midgrey home-faq-question link dib pt1 pb5">
	        <h4 className={`${Spirit.h5} blue dib`}>{nodes.frontmatter.title} &raquo;</h4>
	        <h5 className={`${Spirit.h6} `}>{nodes.frontmatter.date} </h5>
	        <p className={`${Spirit.small} mt0`}>{nodes.excerpt}</p>
	    </Link>
	    <br/>
    </span>
  	)).slice(0,limit)
}

export default BlogList
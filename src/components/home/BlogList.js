import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { HomeBlogBox } from '.'

const BlogList = ({limit}) => {
  const  data  = useStaticQuery(
    graphql`
      query {
        allMarkdownRemark(sort: {order: DESC, fields: frontmatter___date}, filter: {fields: {slug: {regex: "/blog/"}}}) {
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
        <HomeBlogBox
          href={nodes.fields.slug}
          title={nodes.frontmatter.title}
          date={nodes.frontmatter.date}>
            {nodes.excerpt}
        </HomeBlogBox>
    </span>
  	)).slice(0,limit)
}

export default BlogList

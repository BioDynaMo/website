import React from "react"
import { Link, graphql } from "gatsby"
import { Layout } from "../components/common/layout"
import { Spirit } from '../styles/spirit-styles'

export default class TrialBlogList extends React.Component {
  
  render() {
    const posts = this.props.data.allMarkdownRemark.edges
    return (
      <Layout mainClass="bg-whitegrey-l2 pb-vw3" bodyClass="bg-white">
        
        <div className="bg-concepts">
            <div className={`${Spirit.page.xl} pt12 pb4 pt-vw1-ns pb-vw1-ns white pl10 pl0-ns`}>
                <h1 className={`${Spirit.h4} gh-integration-header-shadow`}>
                    <Link to="/news/" className="link dim white">News</Link>
                </h1>
            </div>
        </div>

        <div className={`${Spirit.page.xl} mt-vw3`}>
          {posts.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug
            return (
              <span key ={node.id}>
                <Link to={node.fields.slug} className="midgrey home-faq-question link dib pt1 pb5">
                    <h4 className={`${Spirit.h5} blue dib`}>{title} &raquo;</h4>
                    <h5 className={`${Spirit.h6} `}>{node.frontmatter.date} </h5>
                    <p className={`${Spirit.small} mt0`}>{node.frontmatter.meta_description}</p>
                </Link>
                <br/>
              </span>
              )
          })}
        </div>

      </Layout>
    )
  }
}

export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      filter: {fields: {slug: {regex: "/biodynamo/doc/"}}}
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            date
            path
            meta_description
          }
        }
      }
    }
  }
`
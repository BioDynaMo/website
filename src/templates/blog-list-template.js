import React from "react"
import { Link, graphql } from "gatsby"
import { Layout } from "../components/common/layout"
import { Spirit } from '../styles/spirit-styles'
import { Box } from "../components/common"

export default class NewsIndexPage extends React.Component {
  
  render() {
    const posts = this.props.data.allMarkdownRemark.edges
    const { currentPage, numPages } = this.props.pageContext
    const isFirst = currentPage === 1
    const isLast = currentPage === numPages
    const prevPage = currentPage - 1 === 1 ? "/news/" : ("/news/" + (currentPage - 1)).toString()
    const nextPage = ("/news/" + (currentPage + 1)).toString()

    return (
      <Layout mainClass="bg-whitegrey-l2 pb-vw3" bodyClass="bg-white">
        
        <div className="bg-concepts">
            <div className={`${Spirit.page.l} pt12 pb4 pt-vw1-ns pb-vw1-ns white pl10 pl0-ns`}>
                <h1 className={`${Spirit.h4} gh-integration-header-shadow`}>
                    <Link to="/news/" className="link dim white">News</Link>
                </h1>
            </div>
        </div>

        <div className={`${Spirit.page.l} mt-vw3`}>
          {posts.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug
            return (
              <span key ={node.id}>
                <Box radius="4" className="news-box">
                  <Link to={node.fields.slug} className="midgrey home-faq-question link dib pt1 pb5">
                      <h3 className={`${Spirit.h4} blue dib`}>{title} &raquo;</h3>
                      <h5 className={`${Spirit.h5} `}>{node.frontmatter.date} </h5>
                      <p className={`${Spirit.small} mt0`}>{node.excerpt}</p>
                  </Link>
                  <br/>
                </Box>
                <br/>
              </span>
              )
          })}

          <div className="mt5"/>
          <section className="news-grid">
            
            <div>
              {!isFirst && (
                <Box radius="4" className="news-grid-box-left">
                  <Link className="blue home-faq-question link dib" to={prevPage} rel="prev">
                    <h4 className={`${Spirit.h5} blue dib`}>&laquo; Previous Page</h4>
                  </Link>
                </Box>
                )}
            </div>
            
            <Box radius="4" className="news-grid-box-center">
              {Array.from({ length: numPages }, (_, i) => (
                <Link className="blue home-faq-question link dib" key={`pagination-number${i + 1}`} to={`/news/${i === 0 ? "" : i + 1}`}>
                  <h4 className={`${Spirit.h5} blue dib`}>{(i + 1)}{(i+1)==numPages ? "" : "-"}</h4>
                </Link>
              ))}
            </Box>

            <div>
              {!isLast && (
                <Box radius="4" className="news-grid-box-right">
                  <Link className="blue home-faq-question link dib" to={nextPage} rel="next">
                    <h4 className={`${Spirit.h5} blue dib`}>Next Page &raquo;</h4>
                  </Link>
                </Box>
              )}
            </div>

          </section>

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
          excerpt(pruneLength: 75)
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "DD-MM-YYYY")
            path
            meta_description
          }
        }
      }
    }
  }
`
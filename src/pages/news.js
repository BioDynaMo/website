import React from 'react'
import { Link } from 'gatsby'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'

import { Icon, Box } from '../components/common'
import { Layout } from '../components/common/layout'
import { Carousel, HomeHeader, HomeAPIBox, BlogList } from '../components/home'
import { Spirit } from '../styles/spirit-styles'
import { MetaData, getMetaImageUrls } from '../components/common/meta'


const NewsIndexPage = ({ data, location }) => {
    // Add meta title and description for this page here to overwrite the site meta data as set in the config
    const title = `News`
    const description = `Find all the news related to the BioDynaMo project.`
    const imageUrl = getMetaImageUrls()

    return (
        <>
            <MetaData
                data={data}
                location={location}
                type="website"
                title={title}
                description={description}
                image={imageUrl}
            />
            <Layout mainClass="bg-whitegrey-l2 pb-vw3" bodyClass="bg-white">
                        
                <div className="bg-concepts">
                    <div className={`${Spirit.page.l} pt12 pb4 pt-vw1-ns pb-vw1-ns white pl10 pl0-ns`}>
                        <h1 className={`${Spirit.h4} gh-integration-header-shadow`}>
                            <Link to="/news/" className="link dim white">{title}</Link>
                        </h1>
                    </div>
                </div>

                <div className={`${Spirit.page.l} mt-vw3`}>

                   {data.allMarkdownRemark.nodes.map(nodes => (
                        <span key ={nodes.id}>
                            <Link to={nodes.fields.slug} className="midgrey home-faq-question link dib pt1 pb5">
                                <h4 className={`${Spirit.h5} blue dib`}>{nodes.frontmatter.title} &raquo;</h4>
                                <h5 className={`${Spirit.h6} `}>{nodes.frontmatter.date} </h5>
                                <p className={`${Spirit.small} mt0`}>{nodes.frontmatter.meta_description}</p>
                            </Link>
                            <br/>
                        </span>
                        ))}

                </div>
            
            </Layout>
        </>
    )
}

NewsIndexPage.propTypes = {
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

export const pageQuery = graphql`
    query {
        site {
            ...SiteMetaFields
        }
        allMarkdownRemark(sort: {order: DESC, fields: frontmatter___date}, filter: {fields: {slug: {regex: "/biodynamo/doc/"}}}) {
          nodes {
            id
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

export default NewsIndexPage



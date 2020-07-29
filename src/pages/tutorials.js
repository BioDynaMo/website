import React from 'react'
import { Link } from 'gatsby'
import { StaticQuery, graphql } from 'gatsby'
import PropTypes from 'prop-types'
import { PostHeader, Icon, Box } from '../components/common'
import { Layout } from '../components/common/layout'
import { Spirit } from '../styles/spirit-styles'
import { MetaData, getMetaImageUrls } from '../components/common/meta'
import { TutorialBox } from '../components/tutorials'

const Tutorials = ({ data, location }) => {
    console.log(data)
    const title = `Tutorials`
    const description = `This is the tutorials page.`
    const imageUrl = getMetaImageUrls()

    return (
		<>
			<MetaData
			    data={data}
			    location={location}
			    title={title}
			    type="website"
			    description={description}
			    image={imageUrl}
			/>
			<Layout mainClass="bg-whitegrey-l2 pb-vw3" bodyClass="bg-white">

			    <div className="bg-concepts">
			        <div className={`${Spirit.page.xl} pt12 pb4 pt-vw1-ns pb-vw1-ns white pl10 pl0-ns`}>
			            <h1 className={`${Spirit.h4} gh-integration-header-shadow`}>
			                <Link to="/tutorials/" className="link dim white">{title}</Link>
			            </h1>
			        </div>
			    </div>

			    <div className={`${Spirit.page.xl} mt-vw3`}>

			        <section className="grid-12 gutter-row-20 gutter-20-ns gutter-36-l">

			            {
			                data.notebooks.edges.map(edge => (
                                <TutorialBox to={"/notebooks/"+edge.node.relativePath}  title={edge.node.name.charAt(0).toUpperCase()+edge.node.name.slice(1).replace("_", " ")} src="/images/paraview7-4.png">
			                    </TutorialBox>
			                ))
			            }
			        </section>

			    </div>

			</Layout>
		</>
    )
}

Tutorials.propTypes = {
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

export default Tutorials

export const tutorialsQuery = graphql`
    query {
        site {
            ...SiteMetaFields
        }
        notebooks: allFile(filter: {sourceInstanceName: {eq: "notebooks"}}) {
            edges {
                node {
                    name
                    relativePath
                }
            }
        }
    }
`
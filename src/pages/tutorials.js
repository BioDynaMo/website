import React from 'react'
import { Link } from 'gatsby'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import { Layout } from '../components/common/layout'
import { Spirit } from '../styles/spirit-styles'
import { MetaData, getMetaImageUrls } from '../components/common/meta'
import { TutorialBox } from '../components/tutorials'
import 'bootstrap/dist/css/bootstrap.min.css';

const Tutorials = ({ data, location }) => {
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
                    <h1 className={`${Spirit.sectionHeading} gh-integration-header-shadow`}> <Link to="/tutorials/" className="link dim white">{title}</Link></h1>              
                        <p className={Spirit.sectionSubHeading}>
                    This is a gallery of basic example <strong><Link to="/docs/userguide/notebook" className="link dim white">BioDynaMo notebooks:</Link></strong> click on the images to inspect the underlying document.
                        </p>
			        </div>
			    </div>

			    <div className={`${Spirit.page.xl} mt-vw3`}>

			        <section className="grid-12 gutter-row-20 gutter-20-ns gutter-36-l">

			            {
			                data.notebooks.edges.map(edge => (
                                <TutorialBox 
                                html={"/notebooks/"+edge.node.relativePath}
                                title={edge.node.name.charAt(0).toUpperCase()+edge.node.name.slice(1).replace("_", " ")} 
                                src={"/images/notebooks/"+edge.node.name+".png"}
                                binder={"https://mybinder.org/v2/gh/BioDynaMo/binder-demo/dockerfile?filepath=%2F"+edge.node.name+"%2F"+edge.node.name+".ipynb"}>
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
        notebooks: allFile(filter: {sourceInstanceName: {eq: "notebooks"}, extension: {eq:"html"}}) {
            edges {
                node {
                    name
                    relativePath
                }
            }
        }
    }
`

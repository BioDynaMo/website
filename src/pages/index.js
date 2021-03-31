import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'

import { Box } from '../components/common'
import { Layout } from '../components/common/layout'
import { Carousel, HomeHeader, InfoBoxes, BlogList } from '../components/home'
import { Spirit } from '../styles/spirit-styles'
import { MetaData, getMetaImageUrls } from '../components/common/meta'

const HomePage = ({ data, location }) => {
  // Add meta title and description for this page here to overwrite the site meta data as set in the config
  const title = `BioDynaMo`
  const description = `Get familiar with BioDynaMo - the open source biology dynamics modeller.  Install guides, tutorials, API docs and FAQs.`
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
      <Layout
        headerDividerStyle="shadow"
        bodyClass="bg-white"
        mainClass="bg-whitegrey-l2 pb-vw6 pb-vw3-ns"
        header={<HomeHeader />}
      >

      <div className="pt-vw3 middle-section home-main-box-padding-ns">
        <div className='middle-section-wrapper'>
          <div className={`mw-m pl5 pr5 pl10-l pr10-l carousel-div`}>
            <Carousel />
          </div>
          <div className={`${Spirit.page.s} bloglist-div`}>
            <Box>
              <div className="flex-auto pa7 news">
                <h2 className={`${Spirit.h2} darkgrey mt2 mt0-l`}>{"Latest News"}</h2>
              </div>
              <BlogList limit="3"/>
            </Box>
          </div>
        </div>
      </div>

      <div className={`${Spirit.page.xl} flex-auto pa7`}>
        <InfoBoxes />
      </div>

        {/* { <div className={`${Spirit.page.xl} grid-12 gutter-row-20 gutter-40-ns`}>

                    <section className="col-12 col-6-ns flex flex-column justify-between mt4 mt0-ns">
                        <a className="twitter-timeline" href="https://twitter.com/CERNopenlab?ref_src=twsrc%5Etfw">Tweets by CERNopenlab</a> <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
                        <a href="https://twitter.com/intent/tweet?button_hashtag=biodynamo&ref_src=twsrc%5Etfw" className="twitter-hashtag-button" data-show-count="false">Tweet #biodynamo</a><script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>

                        {//This is where we want the twitter feed
                          // These are the boxes
                          <Box className="mt5 tdn flex-auto flex flex-column items-stretch" elevation="1">
                            <HomeAPIBox
                                href="/api/#frontend-sdk"
                                title="Post 1"
                                icon="sdks"
                            >
                                Frameworks for working with the Ghost API to build a publication website
                            </HomeAPIBox>
                            <HomeAPIBox
                                href="/api/#rest-api"
                                title="Post 2"
                                icon="rest-api"
                            >
                                A full reference of API Endpoints
                            </HomeAPIBox>
                            <HomeAPIBox
                                href="/api/#tools"
                                title="Post 3"
                                icon="tools"
                            >
                                Utilities to help build and manage Ghost
                            </HomeAPIBox>
                        </Box>}
                    </section>

                    <section className="col-12 col-6-ns mt0-ns bt bn-ns b--whitegrey nl5 nr5 nl0-ns nr0-ns ml0-ns mr0-ns pl5 pr5 pl0-ns pr0-ns pt5 pt0-ns ">

                        <div className="mt3 mt7-ns">

                            <BlogList limit="5"/>

                            <a href="/news/" className={`${Spirit.p} midgrey fw5 link hover-blue`}>More news...</a>

                        </div>
                    </section>
                </div>} */}

        {// this is the integrations section, leaving for template
                  /*<section className={`${Spirit.page.xl} col-12 mt8 mt-vw3-ns bt bn-ns b--whitegrey pt5 pt0-ns`}>
                    <a href="https://ghost.org/integrations/" className={`${Spirit.h3} link darkgrey hover-midgrey`}>Integrations</a>
                    <p className={`${Spirit.p} mt2 midgrey flex flex-column flex-row-ns justify-between items-center-ns`}>
                        All your favourite apps and tools, integrated with Ghost.
                        <a to="https://ghost.org/integrations/" className="blue link din nb1 mt2 mt0-ns hover-underline-blue">
                            <span className="flex items-center fw5">Browse all integrations <Icon name="arrow-right" className="w3 h3 ml1 fill-blue" /></span>
                        </a>
                    </p>
                    <div className="grid-integrations-index mt4 mt6-l f8">
                        <Box href="https://ghost.org/integrations/zapier/" className="flex flex-column justify-between items-center middarkgrey pa2 pt5 pb5 tdn tc" elevation="2" radius="4">
                            <img className="w10 mb1" src="https://res.cloudinary.com/tryghost/image/fetch/w_120,h_100,c_fit,f_auto/https://docs.ghost.io/content/images/2018/09/zapier.png" alt="Zapier" />
                            Zapier
                        </Box>
                        <Box href="https://ghost.org/integrations/disqus/" className="flex flex-column justify-between items-center middarkgrey pa2 pt5 pb5 tdn tc" elevation="2" radius="4">
                            <img className="w10 mb1" src="https://res.cloudinary.com/tryghost/image/fetch/w_120,h_100,c_fit,f_auto/https://docs.ghost.io/content/images/2018/09/disqus.svg" alt="Disqus" />
                            Disqus
                        </Box>
                        <Box href="https://ghost.org/integrations/slack/" className="flex flex-column justify-between items-center middarkgrey pa2 pt5 pb5 tdn tc" elevation="2" radius="4">
                            <img className="w10 mb1" src="https://res.cloudinary.com/tryghost/image/fetch/w_120,h_100,c_fit,f_auto/https://docs.ghost.io/content/images/2018/09/slack.png" alt="Slack" />
                            Slack
                        </Box>
                        <Box href="https://ghost.org/integrations/unsplash/" className="flex flex-column justify-between items-center middarkgrey pa2 pt5 pb5 tdn tc" elevation="2" radius="4">
                            <img className="w10 mb1" src="https://res.cloudinary.com/tryghost/image/fetch/w_120,h_100,c_fit,f_auto/https://docs.ghost.io/content/images/2018/09/unsplash.svg" alt="Unsplash" />
                            Unsplash
                        </Box>
                        <Box href="https://ghost.org/integrations/google/" className="flex flex-column justify-between items-center middarkgrey pa2 pt5 pb5 tdn tc" elevation="2" radius="4">
                            <img className="w10 mb1" src="https://res.cloudinary.com/tryghost/image/fetch/w_120,h_100,c_fit,f_auto/https://docs.ghost.io/content/images/2018/09/google-analytics-1.png" alt="Google Analytics" />
                            Google Analytics
                        </Box>
                        <Box href="https://ghost.org/integrations/mailchimp/" className="flex flex-column justify-between items-center middarkgrey pa2 pt5 pb5 tdn tc" elevation="2" radius="4">
                            <img className="w10 mb1" src="https://res.cloudinary.com/tryghost/image/fetch/w_120,h_100,c_fit,f_auto/https://docs.ghost.io/content/images/2018/09/mailchimp.png" alt="Mailchimp" />
                            Mailchimp
                        </Box>
                        <Box href="https://ghost.org/integrations/google-amp/" className="flex flex-column justify-between items-center middarkgrey pa2 pt5 pb5 tdn tc" elevation="2" radius="4">
                            <img className="w10 mb1" src="https://res.cloudinary.com/tryghost/image/fetch/w_120,h_100,c_fit,f_auto/https://docs.ghost.io/content/images/2018/09/amp.jpg" alt="Google AMP" />
                            Google AMP
                        </Box>
                        <Box href="https://ghost.org/integrations/" className="flex flex-column justify-between items-center middarkgrey pa2 pt5 pb5 tdn" elevation="2" radius="4">
                            <Icon name="more" className="w8 nudge-top--6" />
                            See More
                        </Box>
                    </div>
                </section> */}

      </Layout>
    </>
  )
}

HomePage.propTypes = {
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

export default HomePage

export const pageQuery = graphql`
    query {
        site {
            ...SiteMetaFields
        }
    }
`

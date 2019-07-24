const postcssCustomMedia = require(`postcss-custom-media`)
const autoprefixer = require(`autoprefixer`)
const cssVariables = require(`postcss-css-variables`)
const colorModFunction = require(`postcss-color-mod-function`)
const cssNano = require(`cssnano`)
const customProperties = require(`postcss-custom-properties`)
const easyImport = require(`postcss-easy-import`)
const path = require(`path`)
const { isNil } = require('lodash')

require(`dotenv`).config({
    path: `.env.${process.env.NODE_ENV}`,
})

const myAddedPlugin = (lunr) => (builder) => {

  // removing stemmer
  builder.pipeline.remove(lunr.stemmer)
  builder.searchPipeline.remove(lunr.stemmer)

  builder.metadataWhitelist = ['position']
  // similarity tuning
  builder.k1(0.75)
  builder.b(0.5)
}

const SERVICE_WORKER_KILL_SWITCH = (process.env.SERVICE_WORKER_KILL_SWITCH === `true`) || false

const plugins = [
    /**
     *  Content Plugins
     */
    {
        resolve: `gatsby-source-filesystem`,
        options: {
            path: path.join(__dirname, `content`),
            name: `markdown-pages`,
        },
    },
    {
        resolve: `gatsby-source-filesystem`,
        options: {
            path: path.join(__dirname, `src`, `images`),
            name: `images`,
        },
    },
    {
        resolve: `gatsby-source-filesystem`,
        options: {
            path: path.join(__dirname, `public`),
            name: `public`,
        },
    },

    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
        resolve: `gatsby-transformer-remark`,
        options: {
            plugins: [
                {
                    resolve: `gatsby-remark-images`,
                    options: {
                        withWebp: true,
                    },
                },
                `gatsby-remark-autolink-headers`,
                `gatsby-remark-code-titles`,
                `gatsby-remark-prismjs`,
                `gatsby-remark-external-links`,
                `gatsby-remark-responsive-iframe`,
            ],
        },
    },
    `gatsby-transformer-yaml`,
    `gatsby-plugin-catch-links`,

    /**
     *  Utility Plugins
     */
    {
        resolve: `gatsby-plugin-manifest`,
        options: {
            name: `BioDynaMO`,
            short_name: `bdm`,
            start_url: `/`,
            background_color: `#343f44`,
            theme_color: `#343f44`,
            display: `minimal-ui`,
            icon: `static/bdm_logo.png`,
        },
    },
    `gatsby-plugin-react-helmet`,
    {
        resolve: `gatsby-plugin-advanced-sitemap`,
        options: {
            query: `
                {
                allMarkdownRemark{
                    edges {
                        node {
                            id
                            frontmatter {
                                published_at: date
                                feature_image: image
                            }
                            fields {
                                slug
                            }
                        }
                    }
                }
            }`,
            mapping: {
                allMarkdownRemark: {
                    sitemap: `pages`,
                },
            },
            exclude: [
                `/dev-404-page`,
                `/404`,
                `/404.html`,
                `/offline-plugin-app-shell-fallback`,
                `/data-schema`,
                `/data-schema-2`,
                `/v0.11/README`,
                `/README`,
                /(\/)?hash-\S*/, // exclude internal tags
            ],
        },
    },
    `gatsby-plugin-force-trailing-slashes`,
    `gatsby-transformer-remark`,
    `gatsby-transformer-remark-plaintext`,
    /**
     *  Display Plugins
     */
    {
        resolve: `gatsby-plugin-postcss`,
        options: {
            postCssPlugins: [
                autoprefixer(),
                easyImport(),
                cssVariables(),
                colorModFunction(),
                customProperties({ preserve: false }),
                postcssCustomMedia(),
                cssNano({ zindex: false }),
            ],
        },
    },
    {
        resolve: `gatsby-plugin-react-svg`,
        options: {
            rule: {
                include: /icons/,
            },
        },
    },
    /**
     *  Search Plugin
     */
    {
            resolve: `gatsby-plugin-lunr`,
            options: {
                languages: [
                    {
                        // ISO 639-1 language codes. See https://lunrjs.com/guides/language_support.html for details
                        name: 'en',
                        // A function for filtering nodes. () => true by default
                        // filterNodes: node => node.frontmatter.lang === 'en',
                        // Add to index custom entries, that are not actually extracted from gatsby nodes
                        // customEntries: [{ title: 'Pictures', content: 'awesome pictures', url: '/pictures' }],
                        filterNodes: (node) => !isNil(node.frontmatter),
                        plugins: [myAddedPlugin]
                    }
                ],
                // Fields to index. If store === true value will be stored in index file.
                // Attributes for custom indexing logic. See https://lunrjs.com/docs/lunr.Builder.html for details
                fields: [
                    { name: 'title', store: true, attributes: { boost: 20 } },
                    { name: 'content', store: true },
                    { name: 'path', store: true },
                    { name: 'sidebar', store: true },
                    { name: 'headings' },
                ],
                // How to resolve each field's value for a supported node type
                resolvers: {
                    // For any node of type MarkdownRemark, list how to resolve the fields' values
                    MarkdownRemark: {
                        title: node => node.frontmatter.title,
                        description: node => node.frontmatter.meta_description,
                        content: node => node.rawMarkdownBody,
                        path: node => node.fields.slug,
                        sidebar: node => node.frontmatter.sidebar,
                        headings: node => node.headings,
                    },
                },
                //custom index file name, default is search_index.json
                filename: 'search_index.json',
                //custom options on fetch api call for search_ındex.json
                // fetchOptions: {
                //     credentials: 'same-origin'
                // },
            },
        },
]


// Global switch to either use or remove service worker
if (SERVICE_WORKER_KILL_SWITCH) {
    console.log(`Remove service worker plugin`)
    plugins.push(`gatsby-plugin-remove-serviceworker`)
} else {
    console.log(`Install service worker plugin`)
    plugins.push(`gatsby-plugin-offline`)
}

module.exports = {
    siteMetadata: {
        title: `BioDynaMO Website`,
        siteUrl: process.env.SITE_URL || `/`,
        description: `Everything you need to know about biology simulations.`,
    },
    plugins: plugins,
}

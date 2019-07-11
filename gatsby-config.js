const postcssCustomMedia = require(`postcss-custom-media`)
const autoprefixer = require(`autoprefixer`)
const cssVariables = require(`postcss-css-variables`)
const colorModFunction = require(`postcss-color-mod-function`)
const cssNano = require(`cssnano`)
const customProperties = require(`postcss-custom-properties`)
const easyImport = require(`postcss-easy-import`)
// const algoliaQueries = require(`./utils/algolia-queries`)
const path = require(`path`)

require(`dotenv`).config({
    path: `.env.${process.env.NODE_ENV}`,
})

// if (!process.env.GHOST_API_URL || !process.env.GHOST_API_KEY) {
//     throw new Error(
//         `GHOST_API_URL and GHOST_API_KEY are required to build. Check the CONTRIBUTING guide.`
//     )
// }

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
                // {
                //     resolve: `gatsby-remark-snippets`,
                //     options: {
                //         // Example code links are relative to this dir.
                //         // eg examples/path/to/file.js
                //         directory: `${__dirname}/content/.examples/`,
                //     },
                // },
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
    // {
    //     resolve: `gatsby-plugin-manifest`,
    //     options: {
    //         name: `Ghost Docs`,
    //         short_name: `Ghost`,
    //         start_url: `/`,
    //         background_color: `#343f44`,
    //         theme_color: `#343f44`,
    //         display: `minimal-ui`,
    //         icon: `static/favicon.png`,
    //     },
    // },
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
    {
            resolve: `gatsby-plugin-lunr`,
            options: {
                languages: [
                    {
                        // ISO 639-1 language codes. See https://lunrjs.com/guides/language_support.html for details
                        name: 'en',
                        // A function for filtering nodes. () => true by default
                        filterNodes: node => node.frontmatter.lang === 'en',
                        // Add to index custom entries, that are not actually extracted from gatsby nodes
                        // customEntries: [{ title: 'Pictures', content: 'awesome pictures', url: '/pictures' }],
                    },
                    // {
                    //     name: 'fr',
                    //     filterNodes: node => node.frontmatter.lang === 'fr',
                    // },
                ],
                // Fields to index. If store === true value will be stored in index file.
                // Attributes for custom indexing logic. See https://lunrjs.com/docs/lunr.Builder.html for details
                fields: [
                    { name: 'title', store: true, attributes: { boost: 50 } },
                    { name: 'description', store: true, attributes: { boost: 15 } },
                    { name: 'content' },
                    { name: 'url', store: true },
                ],
                // How to resolve each field's value for a supported node type
                resolvers: {
                    // For any node of type MarkdownRemark, list how to resolve the fields' values
                    MarkdownRemark: {
                        title: node => node.frontmatter.title,
                        content: node => node.rawMarkdownBody,
                        url: node => node.fields.url,
                    },
                },
                //custom index file name, default is search_index.json
                filename: 'search_index.json',
                //custom options on fetch api call for search_ındex.json
                fetchOptions: {
                    credentials: 'same-origin'
                },
            },
        },
]

module.exports = {
    plugins: [
        {
            resolve: `gatsby-plugin-lunr`,
            options: {
                languages: [
                    {
                        // ISO 639-1 language codes. See https://lunrjs.com/guides/language_support.html for details
                        name: 'en',
                        // A function for filtering nodes. () => true by default
                        filterNodes: node => node.frontmatter.lang === 'en',
                        // Add to index custom entries, that are not actually extracted from gatsby nodes
                        // customEntries: [{ title: 'Pictures', content: 'awesome pictures', url: '/pictures' }],
                    },
                    // {
                    //     name: 'fr',
                    //     filterNodes: node => node.frontmatter.lang === 'fr',
                    // },
                ],
                // Fields to index. If store === true value will be stored in index file.
                // Attributes for custom indexing logic. See https://lunrjs.com/docs/lunr.Builder.html for details
                fields: [
                    { name: 'title', store: true, attributes: { boost: 20 } },
                    { name: 'content' },
                    { name: 'url', store: true },
                ],
                // A function for filtering nodes. () => true by default
                filterNodes: (node) => !isNil(node.frontmatter),
                // How to resolve each field's value for a supported node type
                resolvers: {
                    // For any node of type MarkdownRemark, list how to resolve the fields' values
                    MarkdownRemark: {
                        title: node => node.frontmatter.title,
                        content: node => node.rawMarkdownBody,
                        url: node => node.fields.url,
                    },
                },
                //custom index file name, default is search_index.json
                filename: 'search_index.json',
                //custom options on fetch api call for search_ındex.json
                fetchOptions: {
                    credentials: 'same-origin'
                },
            },
        },
    ],
}

// const runAlgoliaBuild = () => (process.env.INCOMING_HOOK_TITLE && process.env.INCOMING_HOOK_TITLE === `Algolia`) || process.env.ALGOLIA
// const hasAlgoliaKey = () => process.env.ALGOLIA_ADMIN_KEY && !process.env.ALGOLIA_ADMIN_KEY.match(/<key>/)
//
// if (runAlgoliaBuild() && hasAlgoliaKey()) {
//     plugins.push({
//         resolve: `gatsby-plugin-algolia`,
//         options: {
//             appId: `6RCFK5TOI5`,
//             apiKey: `${process.env.ALGOLIA_ADMIN_KEY}`,
//             queries: algoliaQueries,
//             chunkSize: 10000, // default: 1000
//         },
//     })
// }

const myPlugin = (lunr) => (builder) => {
  // removing stemmer
  builder.pipeline.remove(lunr.stemmer)
  builder.searchPipeline.remove(lunr.stemmer)
  // or similarity tuning
  builder.k1(1.3)
  builder.b(0)
}

// const runAlgoliaBuild = () => (process.env.INCOMING_HOOK_TITLE && process.env.INCOMING_HOOK_TITLE === `Algolia`) || process.env.ALGOLIA
// const hasAlgoliaKey = () => process.env.ALGOLIA_ADMIN_KEY && !process.env.ALGOLIA_ADMIN_KEY.match(/<key>/)

// if (runAlgoliaBuild() && hasAlgoliaKey()) {
//     plugins.push({
//         resolve: `gatsby-plugin-algolia`,
//         options: {
//             appId: `6RCFK5TOI5`,
//             apiKey: `${process.env.ALGOLIA_ADMIN_KEY}`,
//             queries: algoliaQueries,
//             chunkSize: 10000, // default: 1000
//         },
//     })
// }

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

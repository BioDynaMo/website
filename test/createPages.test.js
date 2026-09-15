const assert = require(`assert`)
const { createMarkdownPages, createNewsIndexPages } = require(`../gatsby/createPages`)

const resultWith = edges => ({ data: { allMarkdownRemark: { edges } } })

describe(`page generation`, function () {
    this.timeout(1000)

    for (const generate of [createMarkdownPages, createNewsIndexPages]) {
        describe(generate.name || `generator`, function () {
            it(`finishes when no content matches`, async function () {
                await generate({
                    graphql: async () => resultWith([]),
                    actions: { createPage: () => assert.fail(`Unexpected page`) },
                })
            })

            it(`propagates GraphQL errors without reading data`, async function () {
                const errors = [new Error(`Query failed`)]
                await assert.rejects(generate({
                    graphql: async () => ({ errors }),
                    actions: {},
                }), error => error === errors)
            })

            it(`propagates rejected queries`, async function () {
                await assert.rejects(generate({
                    graphql: async () => { throw new Error(`Query rejected`) },
                    actions: {},
                }), /Query rejected/)
            })

            it(`propagates page creation failures`, async function () {
                await assert.rejects(generate({
                    graphql: async () => resultWith([{ node: { fields: { slug: `/blog/example/` } } }]),
                    actions: { createPage: () => { throw new Error(`Page failed`) } },
                }), /Page failed/)
            })
        })
    }

    it(`preserves Markdown page URLs and context`, async function () {
        const pages = []
        const fields = { slug: `/team/example/`, section: `team` }
        await createMarkdownPages({
            graphql: async () => resultWith([{ node: { fields } }]),
            actions: { createPage: page => pages.push(page) },
        })
        assert.strictEqual(pages.length, 1)
        assert.strictEqual(pages[0].path, fields.slug)
        assert.deepStrictEqual(pages[0].context, fields)
    })

    it(`paginates eleven news entries into two pages`, async function () {
        const pages = []
        await createNewsIndexPages({
            graphql: async () => resultWith(Array.from({ length: 11 }, () => ({}))),
            actions: { createPage: page => pages.push(page) },
        })
        assert.deepStrictEqual(pages.map(page => page.path), [`/blog`, `/blog/2`])
        assert.deepStrictEqual(pages.map(page => page.context), [
            { limit: 10, skip: 0, numPages: 2, currentPage: 1 },
            { limit: 10, skip: 10, numPages: 2, currentPage: 2 },
        ])
    })
})

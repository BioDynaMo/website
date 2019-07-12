const markdownQueryConfig = [
    {
        section: `userguide`,
        indexName: `userguide`,
        niceName: `User Guide`,
    },
    {
        section: `devguide`,
        indexName: `devguide`,
        niceName: `Dev Guide`,
    },
    {
        section: `bioapi`,
        indexName: `bioapi`,
        niceName: `API`,
    },
]

module.exports = {
    defaultMarkdownSection: `userguide`,
    markdownQueryConfig,
    searchConfig: markdownQueryConfig
        .reduce((acc, { indexName, niceName }) => {
            acc[indexName] = niceName
            return acc
        }, {}),
}

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
        section: `apidoc`,
        indexName: `apidoc`,
        niceName: `API Documentation`,
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

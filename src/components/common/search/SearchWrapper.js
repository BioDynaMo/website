import React from "react"
import PropTypes from 'prop-types'
import {
    InstantSearch,
    Configure,
} from 'react-instantsearch-dom'
import './dummy.json'

const SearchWrapper = ({ children }) => (
    <InstantSearch
        appId="GKTDL3T2PT"
        apiKey="d74e5e7d3beff8df95195da245c2d829"
        indexName="bio"
    >
        <Configure attributesToSnippet="html" />
        {children}
    </InstantSearch>
)

SearchWrapper.propTypes = {
    children: PropTypes.node.isRequired,
}

export default SearchWrapper

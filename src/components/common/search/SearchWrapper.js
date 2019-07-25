import React from "react"
import PropTypes from 'prop-types'

const SearchWrapper = ({ children }) => {

    return ( <> {children} </> )
}

SearchWrapper.propTypes = {
    children: PropTypes.node.isRequired,
}

export default SearchWrapper

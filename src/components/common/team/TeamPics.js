import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

const TeamPics = ({}) => {

	const elevationNum
}

TeamPics.defaultProps = {
    elevation: `2`,
    radius: `3`,
    onWhite: false,
}

TeamPics.propTypes = {
    children: PropTypes.node.isRequired,
    to: PropTypes.string,
    href: PropTypes.string,
    elevation: PropTypes.string,
    radius: PropTypes.string,
    onWhite: PropTypes.bool,
    className: PropTypes.string,
}

export default TeamPics

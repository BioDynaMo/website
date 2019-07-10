import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'gatsby'
import { Spirit } from '../../../styles/spirit-styles'

const TeamPics = ({to,name,position}) => (

	<div class="grid-item">
        <img src={to} className="teampic"/>
        <h4>{name}</h4>
        <p>{position}</p>
    </div>

)

TeamPics.defaultProps = {
    name: `N/A`,
    to: `../../../images/user-circle-solid.svg`,
    position: `N/A`,
}

TeamPics.propTypes = {
    to: PropTypes.string,
    name: PropTypes.string,
    position: PropTypes.string,
}

export default TeamPics

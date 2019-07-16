import React from 'react'
import PropTypes from 'prop-types'

import { Spirit } from '../../../styles/spirit-styles'
import { Box } from '../'

const MemberBox = ({ src, to, href, headingClass, name, position }) => (
    <Box
        to={to}
        href={href}
        className="col-12 col-6-ns col-4-l pa8 tdn middarkgrey setup-box-min-height  team-box-max-width setup-box-max-height"
        radius="4"
    >
        <div className="img-container">
            <img src={src} className="teampic"/>
            <h5 className={`${Spirit.h5} ${headingClass} img-overlay-1`}><span>{name}</span></h5>        
            <h5 className={`${Spirit.h5} ${headingClass} img-overlay-2`}>{position}</h5>
        </div>
    </Box>
)

MemberBox.propTypes = {
    position: PropTypes.node,
    name: PropTypes.string.isRequired,
    to: PropTypes.string,
    href: PropTypes.string,
    headingClass: PropTypes.string,
}

export default MemberBox

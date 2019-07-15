import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'gatsby'
import { Spirit } from '../../../styles/spirit-styles'
import { Box } from '../'

const MemberBox = ({ src, to, href, headingClass, name, children }) => (
    <Box
        to={to}
        href={href}
        className="col-12 col-6-ns col-4-l pa8 tdn middarkgrey setup-box-min-height"
        radius="4"
    >
        <img src={src} className="teampic"/>
        <h4 className={`${Spirit.h4} darkgrey ${headingClass}`}>{name}</h4>
        <div className={`${Spirit.small} mt1 midgrey`}>{children}</div>
    </Box>
)

MemberBox.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    to: PropTypes.string,
    href: PropTypes.string,
    headingClass: PropTypes.string,
}

export default MemberBox

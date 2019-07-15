import React from 'react'
import PropTypes from 'prop-types'

import { Box, Icon } from '../common'
import { Spirit } from '../../styles/spirit-styles'

const GalleryBox = ({ src, to, href, headingClass, title, children }) => (
    <Box
        to={to}
        href={href}
        className="col-12 col-6-ns col-4-l pa8 tdn middarkgrey gallery-box-min-height gallery-box-max-height"
        radius="4"
    >
        <img src={src} className="galleryimg"/>
        <h4 className={`${Spirit.h4} darkgrey ${headingClass}`}>{title}</h4>
        <div className={`${Spirit.small} mt1 midgrey`}>{children}</div>
    </Box>
)

GalleryBox.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    to: PropTypes.string,
    href: PropTypes.string,
    headingClass: PropTypes.string,
}

export default GalleryBox

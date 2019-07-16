import React from 'react'
import PropTypes from 'prop-types'

import { Box} from '../common'
import { Spirit } from '../../styles/spirit-styles'

const GalleryBox = ({ src, to, href, headingClass, title, children }) => (
    <Box
        to={to}
        href={href}
        className="col-12 col-6-ns col-4-l pa8 tdn middarkgrey gallery-box-min-height gallery-box-max-height"
        radius="4"
    >
        <h2 className={`${Spirit.h2} darkgrey ${headingClass}`}>{title}</h2>
        <img src={src} className="gallery-img mt2"/>
        <div className={`${Spirit.p} mt2 midgrey`}>{children}</div>
    </Box>
)

GalleryBox.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    to: PropTypes.string,
    href: PropTypes.string,
}

export default GalleryBox

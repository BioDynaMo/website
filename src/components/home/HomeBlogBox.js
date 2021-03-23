import React from 'react'
import PropTypes from 'prop-types'

import { Spirit } from '../../styles/spirit-styles'

const HomeBlogBox = ({ href, title, date, children }) => (
    <a href={href} target = "_blank" className="flex items-start pa4 pa7-ns tdn bb b--whitegrey justify-between mih-10 flex-auto api-box">
        <div className="flex-auto">
            <h4 className={`${Spirit.h5} darkgrey mt2 mt0-l`}>{title}</h4>
            <h5 className={`${Spirit.h6} midgrey`}>{date}</h5>
            <p className={`${Spirit.small} midgrey`}>{children}</p>
        </div>
    </a>
)

HomeBlogBox.propTypes = {
    href: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
}

export default HomeBlogBox

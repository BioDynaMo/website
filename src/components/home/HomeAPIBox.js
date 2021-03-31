import React from 'react'
import PropTypes from 'prop-types'

import { Spirit } from '../../styles/spirit-styles'
import { Icon } from '../common'

const HomeAPIBox = ({ href, icon, title, children }) => (
    <a href={href} target = "_blank" className="flex items-start pa4 pa7-ns tdn bb b--whitegrey justify-between mih-10 flex-auto api-box">
        <span className="dib mr3 mt3 miw10 tc"><Icon name={icon} className="stroke-middarkgrey-l2" /></span>
        <div className="flex-auto">
            <h4 className={`${Spirit.h5} darkgrey mt2 mt0-l`}>{title}</h4>
            <p className={`${Spirit.small} midgrey`}>{children}</p>
        </div>
    </a>
)

HomeAPIBox.propTypes = {
    href: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
}

export default HomeAPIBox

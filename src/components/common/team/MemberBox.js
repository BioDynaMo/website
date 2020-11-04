import React from 'react'
import PropTypes from 'prop-types'

import { Spirit } from '../../../styles/spirit-styles'

const MemberBox = ({ imgsrc, name, description }) => (
    <div className="col-10 col-4-ns pa5 pa8-ns pa10-l pt8-l flex flex-column-ns items-start tdn content-stretch home-main-box-shadow db br4 bg-white teambox-padding">
        <div className="img-container">
            <img src={imgsrc} className="teampic"/>
            <h2 className={`${Spirit.h4} mt0 mt2-ns darkgrey flex-shrink-1 teambox-text-center`}>{name}</h2>
            <p className={`${Spirit.small} midgrey teambox-text-center`}>{description}</p>
        </div>
    </div>
)

MemberBox.propTypes = {
    imgsrc: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
}

export default MemberBox

import React from 'react'
import PropTypes from 'prop-types'

const Logo = ({ height, theme }) => {
    const fillColor = theme === `light` ? `#FFFFFF` : `#2D3134` //#FFFFFF #2D3134

    return <img src="/bdm_logo.png" style={{ height: `${height}px`, width: `auto`, backgroundColor: `#00000000`}} />
}

Logo.defaultProps = {
    height: 25,
    theme: `dark`,
}

Logo.propTypes = {
    height: PropTypes.number,
    theme: PropTypes.string,
}

export default Logo

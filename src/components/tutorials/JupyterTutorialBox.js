import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '../common'
import { Spirit } from '../../styles/spirit-styles'
const JupyterTutorialBox = ({ to, href, headingClass, title, children, binder, html }) => (
    <Box
        to={to}
        href={href}
        className="col-12 col-6-ns col-4-l pa8 tdn middarkgrey gallery-box-min-height gallery-box-max-height"
        radius="4"
    >
        <h2 className={`${Spirit.h2} darkgrey ${headingClass}`}>{title}</h2>
       
        <div className={`${Spirit.p} mt2 midgrey`}>{children}</div>
        <div align='center'>
            <br/>
            <a href={html} target="_blank" > <button className={`${Spirit.greybutton}`}><b>View now</b></button></a>
            <br/>
            <a href={binder} target="_blank" > <button className={`${Spirit.greenbutton}`}><b>Run now</b></button></a>
      </div>
    </Box>
)

JupyterTutorialBox.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    binder: PropTypes.string,
    to: PropTypes.string,
    href: PropTypes.string,
}

export default JupyterTutorialBox

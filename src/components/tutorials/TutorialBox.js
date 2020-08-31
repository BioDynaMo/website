import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '../common'
import 'semantic-ui-css/semantic.min.css';
import { Button, Divider } from 'semantic-ui-react'
import { Spirit } from '../../styles/spirit-styles'
const TutorialBox = ({ src, to, href, headingClass, title, children, binder, html }) => (
    <Box
        to={to}
        href={href}
        className="col-12 col-6-ns col-4-l pa8 tdn middarkgrey gallery-box-min-height gallery-box-max-height"
        radius="4"
    >
        <h2 className={`${Spirit.h2} darkgrey ${headingClass}`}>{title}</h2>
        <Divider horizontal/>
        <img src={src} className="gallery-img mt2"/>
        <div className={`${Spirit.p} mt2 midgrey`}>{children}</div>
            <Divider hidden/>
            <Button size="big" color="grey" target="_blank" href={html} fluid><b>View now</b></Button>
            <Divider fitted/>
            <Divider fitted/>
            <Button size="big" color="green" target="_blank" href={binder} fluid><b>Run now</b></Button>
    </Box>
)

TutorialBox.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    binder: PropTypes.string,
    to: PropTypes.string,
    href: PropTypes.string,
}

export default TutorialBox

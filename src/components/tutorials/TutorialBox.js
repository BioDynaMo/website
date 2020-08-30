import React from 'react'
import PropTypes from 'prop-types'
import { Container, Row, Button, ButtonGroup } from 'react-bootstrap'
import { Box} from '../common'
import { Spirit } from '../../styles/spirit-styles'
const TutorialBox = ({ src, to, href, headingClass, title, children, binder, html }) => (
    <Box
        to={to}
        href={href}
        className="col-12 col-6-ns col-4-l pa8 tdn middarkgrey gallery-box-min-height gallery-box-max-height"
        radius="4"
    >
        <h2 className={`${Spirit.h2} darkgrey ${headingClass}`}>{title}</h2>
        <img src={src} className="gallery-img mt2"/>
        <div className={`${Spirit.p} mt2 midgrey`}>{children}</div>
        <Container>
            <br/>
            <Button variant="secondary" size="lg" target="_blank" href={html} block><b>View now</b></Button>
            <Button variant="success" size="lg" target="_blank" href={binder} block><b>Run now</b></Button>
      </Container>
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

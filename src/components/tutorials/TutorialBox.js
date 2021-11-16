import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '../common'
import { Spirit } from '../../styles/spirit-styles'
const TutorialBox = ({ src, to, href, headingClass, title, children, link, html }) => (
    <Box
        to={to}
        href={href}
        className=" col-12 col-6-ns col-4-l pa8 tdn middarkgrey gallery-box-min-height gallery-box-max-height"
        radius="4"
        style={{ width: "fit-content", display: "inline-grid", justifyContent: "center", alignItems: "center" }}
    >
        <div style={{minHeight: '15rem'}}>
            <h2  id={title} style={{margin:"0 0 0 0", textTransform: "capitalize"}} className={`${Spirit.h2} darkgrey ${headingClass}`}>{title}</h2>
        </div>
        <div style={{height: '20rem', width:'20rem', textAlign:'center', display:'block'}}>
            <img style={{maxHeight: '200px', maxWidth:'200px', alignContent:"center"}} src={src} className="tutorial-img mt2"/>    
        </div>
        
        <div className={`${Spirit.p} mt2 midgrey`}>{children}</div>
        <div style={{margin: "0 0 0 0"}} align='center'>
            {/* <a href={html} target="_blank" > <button className={`${Spirit.greybutton}`}><b>View now</b></button></a> */}
            <a  href={link} target="_blank" > <button className={`${Spirit.greenbutton}`}><b>Try Now</b></button></a>
      </div>
    </Box>
)

TutorialBox.propTypes = {
    children: PropTypes.node,
    title: PropTypes.string.isRequired,
    link: PropTypes.string,
    to: PropTypes.string,
    href: PropTypes.string,
}

export default TutorialBox

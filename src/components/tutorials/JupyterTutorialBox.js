import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '../common'
import { Spirit } from '../../styles/spirit-styles'
import { readFileSync } from 'fs'



const JupyterTutorialBox = ({ src, to, href, headingClass, title, children, binder, html, json }) => { 
    console.log(src, to, href, headingClass, title, children, binder, html, json);
    
    // var data=fs.readFileSync(src, 'utf8');
    // console.log(data, 'the json obj');
    return (
    <Box
        to={to}
        href={href}
        className="col-12 col-6-ns col-4-l pa8 tdn middarkgrey gallery-box-min-height gallery-box-max-height"
        radius="4"
    >
        <h2 className={`post-content ${Spirit.h2} darkgrey ${headingClass}`}>{title}</h2>
       <p>{json['cells'][0]['source'].reduce((acc,text)=> acc+text.replace("#", ""))}</p>
        <div className={`${Spirit.p} mt2 midgrey`}>{children}</div>
        <div align='center'>
            <br/>
            <a href={html} target="_blank" > <button className={`${Spirit.greybutton}`}><b>View now</b></button></a>
            <br/>
            <a href={binder} target="_blank" > <button className={`${Spirit.greenbutton}`}><b>Run now</b></button></a>
      </div>
    </Box>
)}

JupyterTutorialBox.propTypes = {
    children: PropTypes.node,
    title: PropTypes.string.isRequired,
    binder: PropTypes.string,
    to: PropTypes.string,
    href: PropTypes.string,
}

export default JupyterTutorialBox

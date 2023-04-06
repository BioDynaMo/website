import React from 'react'
import { Spirit } from '../../../styles/spirit-styles'
import { Link } from 'gatsby'
import { Icon, Logo } from '../.'

const listItemClass = `mb2 lh-1-65` // TODO: Probably should go to spirit-styles.js
const linkClass = `link pa2 midgrey hover-blue dib mr5 f8`

const Footer = () => (
    <footer className="pt10 pt-vw3-ns pb-vw3 bt b--whitegrey">

            <div className='consortium-footer-wrapper'>
                <a className='consortium-logo cern-logo ' href="https://home.cern/" target="_blank"><img src="/images/consortium_logos/cern.png"/></a>
                <a className='consortium-logo' href="https://openlab.cern/" target="_blank"><img src="/images/consortium_logos/cern-openlab.png"/></a>
                <a className='consortium-logo' href="https://www.ncl.ac.uk/" target="_blank"><img src="/images/consortium_logos/newcastle.png"/></a>
                <a className='consortium-logo' href="https://www.surrey.ac.uk/" target="_blank"><img src="/images/consortium_logos/surrey.jpg"/></a>
                <a className='consortium-logo' href="https://www.unige.ch/medecine/isg/en/" target="_blank"><img src="/images/consortium_logos/unige-igh.jpg"/></a>
                <a className='consortium-logo' href="https://www.gsi.de/en/start/news.htm" target="_blank"><img src="/images/consortium_logos/gsi.png"/></a>
                <a className='consortium-logo' href="https://www.ucy.ac.cy/en/" target="_blank"><img src="/images/consortium_logos/cyprus.png"/></a>
                <a className='consortium-logo' href="https://www.scimpulse.org/" target="_blank"><img src="/images/consortium_logos/scimpulse.png"/></a>
            </div>

        
    </footer>
)

export default Footer

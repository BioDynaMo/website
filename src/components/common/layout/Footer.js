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
                <a className='consortium-logo' href="https://www.sheffield.ac.uk/" target="_blank"><img src="/images/consortium_logos/sheffield.jpg"/></a>
                <a className='consortium-logo' href="https://www.gsi.de/en/start/news.htm" target="_blank"><img src="/images/consortium_logos/gsi.png"/></a>
                <a className='consortium-logo' href="https://immunobrain.com/" target="_blank"><img src="/images/consortium_logos/ibc.png"/></a>
                <a className='consortium-logo' href="https://www.ucy.ac.cy/en/" target="_blank"><img src="/images/consortium_logos/cyprus.png"/></a>
                <a className='consortium-logo' href="https://www.scimpulse.org/" target="_blank"><img src="/images/consortium_logos/scimpulse.png"/></a>
            </div>

        <section className={`${Spirit.page.xl} m1 mt-vw3-ns`}>
            <div className="bt b--whitegrey flex justify-between items-center pt4">
                <ul className="flex list pa0 ma0 items-center">
                    <li className={listItemClass}><a href="/" className="dib pt2 mr6"><Logo /></a></li>
                    <li className={`${listItemClass} dn db-l`}><a href="/documentation/" className={linkClass}>Documentation</a></li>
                    <li className={`${listItemClass} dn db-l`}><a href="http://forum.biodynamo.org/" className={linkClass}>Forum</a></li>
                    <li className={`${listItemClass} dn db-l`}><a href="/blog/" className={linkClass}>Blogs</a></li>
                    <li className={`${listItemClass} dn db-l`}><a href="/docs/devguide/contribute/" className={linkClass}>Contribute</a></li>
                    <li className={`${listItemClass} dn db-l`}><a href="/docs/userguide/contact/" className={linkClass}>Contact</a></li>                    
                    <li className={`${listItemClass} dn db-l`}><a href="/team/" className={linkClass}>About Us</a></li>
                </ul>
            </div>

        </section>
    </footer>
)

export default Footer

import React from 'react'
import { Spirit } from '../../../styles/spirit-styles'
import { Link } from 'gatsby'
import { Icon, Logo } from '../.'

const listItemClass = `mb2 lh-1-65` // TODO: Probably should go to spirit-styles.js
const linkClass = `link pa2 midgrey hover-blue dib mr5 f8`

const Footer = () => (
    <footer className="pt10 pt-vw3-ns pb-vw3 bt b--whitegrey">

            <div className='consortium-footer-wrapper'>
                
                <a href="https://home.cern/" target="_blank"><img className='consortium-logo' src="/images/consortium_logos/cern.png"/></a>
                <a href="https://openlab.cern/" target="_blank"><img className='consortium-logo' src="/images/consortium_logos/cern-openlab.png"/></a>
                <a href="https://www.ncl.ac.uk/" target="_blank"><img className='consortium-logo' src="/images/consortium_logos/newcastle.png"/></a>
                <a href="https://www.sheffield.ac.uk/" target="_blank"><img className='consortium-logo' src="/images/consortium_logos/sheffield.jpg"/></a>
                <a href="https://www.gsi.de/en/start/news.htm" target="_blank"><img className='consortium-logo' src="/images/consortium_logos/gsi.png"/></a>
                <a href="https://immunobrain.com/" target="_blank"><img className='consortium-logo' src="/images/consortium_logos/ibc.png"/></a>
                <a href="https://www.ucy.ac.cy/en/" target="_blank"><img className='consortium-logo' src="/images/consortium_logos/cyprus.png"/></a>
                <a href="https://www.scimpulse.org/" target="_blank"><img className='consortium-logo' src="/images/consortium_logos/scimpulse.png"/></a>
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

// <a href="/biodynamo/doc/user_guide/docs/" className="db col-12 col-6-ns pr2 pr20-ns pt12 pt7-ns pb7 pl2 pl30-ns relative tdn bn br-ns b--whitegrey dark-h4-hover">
//     <Icon name="cloud-upload" className="absolute top-0 top-10-ns left-2 left-10-ns w10 w13-ns h-auto fill-green" />
//     <h4 className={`${Spirit.h4} darkgrey`}>Ready to upgrade to the best?</h4>
//     <p className={`${Spirit.small} midgrey mt1`}>
//         Spend less time running and optimizing your simulations. <strong className="blue">BioDynaMo</strong> has got you covered.
//     </p>
// </a>

// <a href="/biodynamo/doc/user_guide/docs/installation/" className="db col-12 col-6-ns pr2 pr20-ns pt18 pt7-ns pb7 pl2 pl30-ns bt b--whitegrey bn-ns relative tdn dark-h4-hover">
//     <Icon name="chat-double-bubble" className="absolute top-6 top-10-ns left-2 left-10-ns w10 w13-ns h-auto fill-purple" />
//     <h4 className={`${Spirit.h4} darkgrey`}>Looking for help or advice?</h4>
//     <p className={`${Spirit.small} midgrey mt1`}>Join the <strong>BioDynaMo community</strong>  and meet thousands of other professional users now.</p>
// </a>

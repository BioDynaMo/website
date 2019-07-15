import React from 'react'
import PropTypes from 'prop-types'
import { Link } from "gatsby"

import { Spirit } from '../../styles/spirit-styles'
import { Logo } from "."
import { SearchModal } from './search'

const NavBar = ({ theme }) => {
    // Theme definitions
    const themeClasses = {
        dark: {
            menuItem: `middarkgrey-l1 link hover-blue nowrap`,
            logoTheme: `dark`,
            docsTitleClass: `blue`,
            searchBox: `bg-darkgrey-searchbar middarkgrey dark-placeholder`,
            icon: `fill-midlightgrey`,
        },
        light: {
            menuItem: Spirit.link.white,
            logoTheme: `light`,
            docsTitleClass: `white`,
            searchBox: `bg-white-10 white white-placeholder`,
            icon: `fill-white`,
        },
    }

    return (
        <nav className={`${Spirit.page.xl} flex flex-auto flex-nowrap items-center justify-between pt2 pb2`} data-cy="header-navigation">
            <div className="flex items-start pt3 pb1 nudge-bottom--2  pr8">
                <a href="/" className="nudge-top--3"> 
                    <Logo/>
                </a>                
            </div>
            {/* navbar-container wrapper element and bottom padding is needed to hide the horizontal scrollbar on smaller screensizes */}
            <div className="navbar-container">
                <div className="dn flex-ns flex-auto items-center overflow-x-auto mr12 mr0-l ml5 ml0-l pb20">
            {/* Create nav bar links and choose their names */}
                    <Link to="/gallery/" className={`${themeClasses[theme].menuItem} nowrap f8 pa3 mr1 mr3-l nl3`}>Gallery</Link>
                    <a href="/documentation/" className={`${themeClasses[theme].menuItem} nowrap f8 pa3 mr1 mr3-l`}>Documentation</a>
                    <a href="/biodynamo/doc/user_guide/docs/hello_world/" className={`${themeClasses[theme].menuItem} nowrap f8 pa3 mr1 mr3-l`}>Tutorials</a>
                    <a href="/about/" className={`${themeClasses[theme].menuItem} nowrap f8 pa3 mr1 mr3-l`}>About Us</a>                      
                </div>
            </div>
            <div className="relative pl3">
                <SearchModal theme={themeClasses[theme]} />
            </div>
        </nav>
    )
}

NavBar.defaultProps = {
    theme: `dark`,
}

NavBar.propTypes = {
    theme: PropTypes.oneOf([`dark`, `light`]),
}

export default NavBar

//<a href="/" className={`${themeClasses[theme].docsTitleClass} gh-nav-logo-suffix relative ma0 ml4 pa0 pl4 f6 lh-1-5 fw4 link nudge-top--1`}>Home</a>
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
            <div className="flex items-center pt3 pb3 nudge-bottom--2 w-sidebar-l pr8">
                <a href="/" className="nudge-top--3"> 
                {/* This is where you set the logo "ghost icon" link */} 
                    <Logo theme={theme} />
                </a>
                <a href="/" className={`${themeClasses[theme].docsTitleClass} gh-nav-logo-suffix relative ma0 ml4 pa0 pl4 f6 lh-1-5 fw4 link nudge-top--1`}>Home</a>
            </div>
            {/* navbar-container wrapper element and bottom padding is needed to hide the horizontal scrollbar on smaller screensizes */}
            <div className="navbar-container">
                <div className="dn flex-ns flex-auto items-center overflow-x-auto mr12 mr0-l ml5 ml0-l pb20">
            {/* Create nav bar links and choose their names */}
                    <Link to="/biodynamo/doc/user_guide/docs/installation/" className={`${themeClasses[theme].menuItem} nowrap f8 pa3 mr1 mr3-l`}>Installation</Link>
                    <Link to="/biodynamo/doc/user_guide/docs/" className={`${themeClasses[theme].menuItem} nowrap f8 pa3 mr1 mr3-l nl3`}>User Guide</Link>
                    <a href="/src/pages/404/" className={`${themeClasses[theme].menuItem} nowrap f8 pa3 mr1 mr3-l`}>Dev Guide</a>
                    <Link to="/biodynamo/doc/user_guide/docs/hello_world/" className={`${themeClasses[theme].menuItem} nowrap f8 pa3 mr1 mr3-l`}>Tutorials</Link>
                    <a href="/src/pages/404/" className={`${themeClasses[theme].menuItem} nowrap f8 pa3 mr1 mr3-l`}>FAQ</a>
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

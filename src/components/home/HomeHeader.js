import React from 'react'

import { SearchModal } from '../common/search'
import { NavBar } from '../common'
import { Spirit } from '../../styles/spirit-styles'
import HomeHeaderBox from './HomeHeaderBox'

// Custom headings must be React components. You should include the <NavBar /> component
// somewhere in it. You can optionally set the theme of the navbar to `dark` or `light`.
// ptXX-l is the height of the header words
// mtXX-ns is the height of the cutoff white background and headerbox
const HomeHeader = () => (
    <div className="gh-bg-home bb b--whitegrey">
        <header className="top-0 left-0 right-0 z-9999">
            <NavBar theme="light" />
        </header>
        <div className={`${Spirit.page.xl} pb5 pt10 pt15-ns pt10-l pb10-ns pb15-l flex flex-column items-center bt bn-ns b--white-10`}>
            <img src="images/bdm_logo_large.png" className="pb2 " width="75" style={{marginTop : -40}}/>
            <h1 className="ma0 pa0 f2 f1-ns f-headline-l white header-heading-shadow">BioDynaMo</h1>
            <h2 className="white header-heading-shadow">The Open-Source Biology Dynamics Modeller.</h2>

            <section className="grid-12 gutter-row-20 gutter-36-ns mt10 mt8-ns mt20 miw-100 miw-auto-ns home-main-box-margin-ns z-999">

                <HomeHeaderBox
                    to="/docs/userguide/hello_world/"
                    title="Tutorials"
                    icon="typing"
                    // color="tutorial-green"
                > Browse tutorials and learn how to use BioDynaMo.
                </HomeHeaderBox>

                <HomeHeaderBox
                    to="/docs/userguide/installation/"
                    title="Installation Guide"
                    icon="rocket"
                    // color="tutorial-green"
                > Install BioDynaMo on your own system.
                </HomeHeaderBox>

                <HomeHeaderBox
                    to="https://github.com/BioDynaMo/biodynamo"
                    title="Github"
                    icon="github"
                    color="tutorial-green"
                    target="_blank"
                > Find the source code for BioDynaMo on Github.
                </HomeHeaderBox>

            </section>
        </div>
    </div>
)

export default HomeHeader

import PropTypes from 'prop-types'

export const getPostHeaderConfig = ({ pathname }) => {
    const postHeaderConfig = {
        bgClass: `bg-api-reference`,
    }

    // This is an example with subtitles
    // Setup
    // if (pathname.match(/^\/setup\//i) || pathname.match(/^\/install\//i)) {
    //     postHeaderConfig.title = `Setup Guide`
    //     postHeaderConfig.mainLink = `/setup/`
    //     postHeaderConfig.bgClass = `bg-setup`
    //     if (pathname.match(/\/ghost-pro\//i)) {
    //         postHeaderConfig.subtitle = `Ghost(Pro)`
    //         postHeaderConfig.subLink = `/setup/ghost-pro/`
    //     }
    //     if (pathname.match(/\/ubuntu\//i)) {
    //         postHeaderConfig.subtitle = `Ubuntu`
    //         postHeaderConfig.subLink = `/install/ubuntu/`
    //     }
    //     if (pathname.match(/\/docker\//i)) {
    //         postHeaderConfig.subtitle = `Docker`
    //         postHeaderConfig.subLink = `/install/docker/`
    //     }
    //     if (pathname.match(/\/local\//i)) {
    //         postHeaderConfig.subtitle = `Local`
    //         postHeaderConfig.subLink = `/install/local/`
    //     }
    //     if (pathname.match(/\/source\//i)) {
    //         postHeaderConfig.subtitle = `From Source`
    //         postHeaderConfig.subLink = `/install/source/`
    //     }
    // }

    // User Guide
    if (pathname.match(/^\/docs\/userguide\//i)) {
        postHeaderConfig.title = `User Guide`
        postHeaderConfig.mainLink = `/docs/userguide/`
        postHeaderConfig.bgClass = `bg-concepts`
    }

    // Dev Guide
    if (pathname.match(/^\/docs\/devguide\//i)) {
        postHeaderConfig.title = `Dev Guide`
        postHeaderConfig.mainLink = `/docs/devguide/`
        postHeaderConfig.bgClass = `bg-concepts`
    }

    return postHeaderConfig
}

getPostHeaderConfig.proptypes = {
    pathname: PropTypes.string.isRequired,
}

export default getPostHeaderConfig

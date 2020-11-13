import PropTypes from 'prop-types'

const getSidebarFile = (sidebar) => {
    try {
    	if (sidebar == "userguide" || sidebar == "devguide")
    		var [sidebarfile] = require(`../../../../content/biodynamo/doc/sidebars/${sidebar}.yaml`)
        // declare as var here, so it's accessible outside of the try scope
        else if (sidebar == "team")
            var [sidebarfile] = require(`../../../../content/team/${sidebar}.yaml`)       
        else
	        var [sidebarfile] = require(`../../../data/sidebars/${sidebar}.yaml`)
    } catch (e) {
        // TODO: make clear error handling here
        throw e
    }

    return sidebarfile
}

getSidebarFile.propTypes = {
    sidebar: PropTypes.string.isRequired,
}

export default getSidebarFile

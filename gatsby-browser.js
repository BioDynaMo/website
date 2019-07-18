const onRouteUpdate = require(`./gatsby/onRouteUpdate`)
const onPreRouteUpdate = require(`./gatsby/onPreRouteUpdate`)
require("./src/styles/prism.css")

exports.onRouteUpdate = () => onRouteUpdate.trustAllScripts()

exports.onPreRouteUpdate = () => onPreRouteUpdate.killServiceWorker()

//import "./src/styles/global.css"
require("./src/styles/global.css")
require("./src/styles/collapsible.css")
const React = require("react")
const LeftSideBar = require("./src/components/left/left-sidebar").default

// This keeps te left sidebar persistent:
exports.wrapPageElement = ({ element, props }) => {
  // props provide same data to Layout as Page element will get
  // including location, data, etc - you don't need to pass it
  return <><LeftSideBar {...props}/>{element}</>
}
import React from "react"
import { Link } from "gatsby"
import Search from "./search"
import { MODULE_PATH_PREFIX } from "../../util/util"

export default () => {

  return (
    <div className="top-bar">
    <div className="sidecontainer">
      <div className="project-title">
        {process.env.GATSBY_PROJECT_NAME}
      </div>
      <div className="bottom">
        <Link to="/">Module list</Link>
        {"  |  "}
        <Link to={MODULE_PATH_PREFIX}>Directory tree</Link>
      </div>
    </div>
      <Search/>
    </div>
  )
}
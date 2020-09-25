import React from "react"
import { Link } from "gatsby"
import Search from "./search"
import Image from "../../general//image"
import { MODULE_PATH_PREFIX } from "../../../util/util"

export default () => {
  let logoData = {
    text:("src:logo.*; alt:logo")
  }

  return (
    <div className="top-bar">
    <Link to="/" className="main-logo">
        <Image data={logoData}/>
    </Link>
    <div className="bottom">
    <Link to="/">Module list</Link>
    &nbsp;|&nbsp;
    <Link to={MODULE_PATH_PREFIX}>Directory tree</Link>
    </div>
      <Search/>
    </div>
  )
}
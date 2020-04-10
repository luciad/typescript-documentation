import React from 'react'
import logo from "../images/logo.png"
import { Link } from "gatsby"
import ClassList from "./class-list"
import DirectoryList from "./directory-list"

export default () => {
  return (
  <div className="leftsidenav">
    <Link to="/overview">
      <img src={logo} alt="Company Logo" className="center"/>
    </Link>

    <DirectoryList/>
    <ClassList/>
    
  </div>
  )
}
import React from 'react'
import logo from "../images/logo.png"
import { Link } from "gatsby"
import ClassList from "./class-list"

export default () => {
  return (
  <div className="leftsidenav">
    <Link to="/overview">
      <img src={logo} alt="Company Logo" class="center"/>
    </Link>

    <h3>Directories</h3>
    <ul className="directories">
      <li>directory0</li>
      <li>directory0.directory1</li>
      <li>something.example</li>
    </ul>
    <ClassList/>
    
  </div>
  )
}
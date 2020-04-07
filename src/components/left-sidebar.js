import React from 'react'
import logo from "../images/logo.png"
import { Link } from "gatsby"

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
    
    <h3>All Classes</h3>
    <ul className="classes">
      <li>class-1</li>
      <li>class-2</li>
    </ul>
  </div>
  )
}
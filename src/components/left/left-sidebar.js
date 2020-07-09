import React from 'react'
import { Link } from "gatsby"
import ClassList from "./class-list"
import DirectoryList from "./directory-list"
import Image from "../general/image"

export default () => {
  let logoData = {
    text:("src:logo.*; alt:logo")
  }

  return (
  <div className="leftsidenav">
    <Link to="/overview">
      <Image data={logoData}/>
    </Link>
    <DirectoryList/>
    <ClassList/>

  </div>
  )
}
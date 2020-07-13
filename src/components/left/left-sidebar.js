import React from 'react'
import { Link } from "gatsby"
import FilterList from "./filter-list"
import DirectoryList from "./directory-list"
import Image from "../general/image"

export default () => {
  let logoData = {
    text:("src:logo.*; alt:logo")
  }

  return (
  <div className="leftsidenav">
    <Link to="/overview">
      <div className="mainlogo">
        <Image data={logoData}/>
      </div>
    </Link>
    <DirectoryList/>
    <FilterList/>

  </div>
  )
}
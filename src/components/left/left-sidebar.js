import React from 'react'
import { Link } from "gatsby"
import FilterList from "./filter-list"
import Image from "../general/image"

export default () => {
  let logoData = {
    text:("src:logo.*; alt:logo")
  }

  return (
  <div className="left-sidebar">
    <Link to="/">
      <div className="main-logo">
        <Image data={logoData}/>
      </div>
    </Link>
    <FilterList/>
  </div>
  )
}
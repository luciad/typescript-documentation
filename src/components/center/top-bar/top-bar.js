import React from "react"
import { Link } from "gatsby"
import Search from "./search"
import Image from "../../general//image"

export default () => {
  let logoData = {
    text:("src:logo.*; alt:logo")
  }

  return (
    <div className="top-bar">
    <Link to="/" className="main-logo">
        <Image data={logoData}/>
    </Link>
      <Search/>
    </div>
  )
}
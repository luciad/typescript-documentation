import React from "react"
import TopBar from "./top-bar/top-bar"
import Highlight from "./general/highlight"

export default (props) => {
  if(!props) return null

  return (
    <div>
      <Highlight/>
      <div className="main">
        <TopBar/>
        <div className="item-box">
          {props.children}
        </div>
      </div>
    </div>
  )
}
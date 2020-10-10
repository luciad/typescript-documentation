import React from "react"
import TopBar from "./center/top-bar/top-bar"
import ItemBox from "./general/item-box"
import Highlight from "./general/highlight"

export default (props) => {
  if(!props) return null

  return (
    <div>
      <Highlight/>
      <div className="main">
        <TopBar/>
        <ItemBox>
          {props.children}
        </ItemBox>
      </div>
    </div>
  )
}
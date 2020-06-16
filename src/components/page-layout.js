import React from "react"
import LeftSidebar from "./left/left-sidebar"
import RightSidebar from "./right/right-sidebar"
import TopBar from "./center/top-bar/top-bar"
import ItemBox from "./general/item-box"
import Highlight from "./general/highlight"

export default (props) => {
  if(!props) return null
  return (
    <div>
      <Highlight/>
      <LeftSidebar/>
      <div className="main">
        <TopBar/>
        <ItemBox>
          {props.children}
        </ItemBox>
      </div>
      <RightSidebar/>
    </div>
  )
}
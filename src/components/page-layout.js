import React from "react"
import LeftSidebar from "./left-sidebar"
import RightSidebar from "./right-sidebar"
import TopBar from "./top-bar"
import ItemBox from "./item-box"
import Highlight from "./highlight"

export default (props) => {
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
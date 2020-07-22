import React from "react"

export default (props) => {
  if(!props) return null

  return (
    <div className="item-box">
      {props.children}
    </div>
  )
}
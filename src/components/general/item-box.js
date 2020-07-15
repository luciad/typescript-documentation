import React from "react"

export default (props) => {
  if(!props) return null
  
  return (
    <div className="itembox">
      {props.children}
    </div>
  )
}
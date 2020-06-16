import React from 'react'
import Icon from "./icon"

export default ({type}) => {
  if(!type) return null
  return (
      <li key={type}>
        <div className="sidecontainer">
        <Icon kindString={type}/>
          {type}
        </div>
      </li>
  )
}

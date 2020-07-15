import React from 'react'
import Icon from "../general/icon"

export default ({type}) => {
  if(!type) return null
  
  return (
      <li key={type + "_legend_item_entry"}>
        <div className="sidecontainer">
        <Icon kindString={type}/>
          {type}
        </div>
      </li>
  )
}

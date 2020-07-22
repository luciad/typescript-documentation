import React from 'react'
import Icon from "../general/icon"

export default ({type}) => {
  if(!type) return null

  return (
      <li key={type + "_legend_item_entry"} className="legend-item">
        <div className="sidecontainer">
        <Icon kindString={type}/>
          {type}
        </div>
      </li>
  )
}

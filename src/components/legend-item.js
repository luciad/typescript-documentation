import React from 'react'
import Icon from "../templates/icon"

export default ({type}) => {
  return (
      <li>
        <div className="sidecontainer"> 
        <Icon kindString={type}/>
          {type}
        </div>
      </li>
  )
}

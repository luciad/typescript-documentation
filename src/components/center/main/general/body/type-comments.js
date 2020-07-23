import React, { Component } from "react"
import { getComments } from "../../../../../util/util"
import Text from "../text"
import Tags from "./tags"

export default class TypeComments extends Component {
  render(){
    const data = this.props.data
    const path = this.props.path
    if(!data) return null
    return (
      <ul className="type-comments">
      {getTypeItems(data).map(ti => {
        const tiComments = getComments(ti)
        if(!tiComments.text && !tiComments.shortText
            && tiComments.tags.length === 0) return null
        return (
        <li>
          {ti.name}
          <Text data={tiComments.shortText} path={path}/>
          <Text data={tiComments.text} path={path}/>
          <Tags tags={tiComments.tags}/>
        </li>)
      })}
    </ul>
    )
  }
}

function getTypeItems(data){
  let typeItems = []
  if(!data.type) return typeItems
  if(data.type.declaration && data.type.declaration.children){
    typeItems = typeItems.concat(data.type.declaration.children)
  }
  return typeItems
}

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

  // DECLARATION
  if(data.type.declaration){
    const d = data.type.declaration
    // DECLARATION CHILDREN
    if(d.children){
    typeItems = typeItems.concat(d.children)
    }
    // DECLARATION SIGNATURES
    if(d.signatures){
      for(let sig of d.signatures){
        if(sig.parameters){
          typeItems = typeItems.concat(sig.parameters)
        }
      }
    }
    // DECLARATION INDEXSIGNATURES
    if(d.indexSignature){
      for(let is of d.indexSignature){
        if(is.parameters){
          typeItems = typeItems.concat(is.parameters)
        }
      }
    }
  }

  return typeItems
}

import React, { Component } from "react"
import { getComments } from "../../../../../../util/util"
import Text from "../../text"
import Type from "../type/type"
import Tags from "../tags"

export default class Parameter extends Component {
  render(){
    const parameter = this.props.data
    const path = this.props.path

    return (
      <li key={parameter.name + "_" + parameter.type + "_parameter_entry"}>
      {parameter.flags && parameter.flags.isRest &&
      <>...</>}
      <b>{parameter.name}</b>
      <i>
        <Type data={parameter} delimiter={parameter.kindString === "Type parameter" ? <>&nbsp;extends </> : <>&nbsp;: </>}/>
      </i>
      <Text data={getComments(parameter).shortText} path={path}/>
      <Text data={getComments(parameter).text} path={path}/>
      <ul>
        {getTypeItems(parameter).map(ti => {
          const tiComments = getComments(ti)
          if(!tiComments.text && !tiComments.shortText
              && tiComments.tags.length === 0) return null
          return (
          <>
          {ti.name}
          <Text data={tiComments.shortText} path={path}/>
          <Text data={tiComments.text} path={path}/>
          <Tags tags={tiComments.tags}/>
          </>)
        })}
      </ul>
    </li>
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

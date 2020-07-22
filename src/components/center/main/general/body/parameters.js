import React, { Component } from "react"
import { getComments } from "../../../../../util/util"
import Text from "../text"
import Type from "./type/type"
import Tags from "./tags"

/**
 * Parameters of an object
 * Contains:
 * - List of parameters with their name, type, shortText and text
 */
export default ({ data, path }) => {
  if(!data || !path ||!data.parameters) return null
  const parameters = data.parameters
  return (
    <div className="parameters">
    {parameters.length !== 0 &&
        <div className="subsubtitle">Parameters</div>}
      <ul className="tab">
        {parameters.map(p =>
          <Parameter data={p} path={path}/>
        )}
      </ul>
  </div>
  )
}

class Parameter extends Component {
  render(){
    const parameter = this.props.data
    const path = this.props.path

    return (
      <li key={parameter.name + "_" + parameter.type + "_parameter_entry"}>
      {parameter.flags && parameter.flags.isRest &&
      <>...</>}
      <b>{parameter.name}</b>
      <i><Type data={parameter} colon={true}/></i>
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

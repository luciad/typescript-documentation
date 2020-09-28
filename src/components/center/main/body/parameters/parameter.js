import React, { Component } from "react"
import { getComments } from "../../../../../util/util"
import Text from "../general/text"
import Type from "../type/type"
import TypeComments from "../type-comments"

/**
 * Renders parameter given by data
 */
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
      {parameter.defaultValue &&
      <> = {parameter.defaultValue}</>}
      <Text data={getComments(parameter).shortText} path={path}/>
      <Text data={getComments(parameter).text} path={path}/>
      <TypeComments data={parameter} path={path}/>
    </li>
    )
  }
}
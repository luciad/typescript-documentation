import React from "react"
import { getComments } from "../../../../../util/util"
import Text from "../text"
import Type from "./type"
/**
 * Parameters of an object
 * Contains:
 * - List of parameters with their name, type, shortText and text
 */
export default ({ data, path }) => {
  if(!data || !path ||!data.parameters) return null
  const parameters = data.parameters
  return (
    <div>
    {parameters.length !== 0 &&
        <div className="subsubtitle">Parameters</div>}
      <ul className="tab">
        {parameters.map(parameter => (
          <li key={parameter.name + "_" + parameter.type + "_parameter_entry"}>
            <b>{parameter.name}</b>
            <i><Type data={parameter} colon={true}/></i>
            <Text data={getComments(parameter).shortText} path={path}/>
            <Text data={getComments(parameter).text} path={path}/>
          </li>
        ))}
      </ul>
  </div>
  )
}
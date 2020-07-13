import React from "react"
import { getParameters } from "../../../../../util/util"
import Text from "../text"

/**
 * Parameters of an object
 * Contains:
 * - List of parameters with their name, type, shortText and text
 */
export default ({ data, path }) => {
  if(!data || !path) return null
  const parameters = getParameters(data)
  return (
    <div>
    {parameters.length !== 0 &&
        <div className="subsubtitle">Parameters</div>}
      <ul style={{paddingLeft: "1em"}}>
        {parameters.map(parameter => (
          <li key={parameter.name + "_" + parameter.type + "_parameter_entry"}>
            <b>{parameter.name}</b>:<i>{parameter.type}</i>
            <Text data={parameter.comments.shortText} path={path}/>
            <Text data={parameter.comments.text} path={path}/>
          </li>
        ))}
      </ul>
  </div>
  );
};
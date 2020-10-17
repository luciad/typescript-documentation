import React from "react"
import Parameter from "./parameter"

/**
 * Parameters of an object
 * Contains:
 * - List of parameters with their name, type, shortText and text
 * see parameter.js
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
          <Parameter data={p} path={path} key={p.id + "_param"}/>
        )}
      </ul>
  </div>
  )
}

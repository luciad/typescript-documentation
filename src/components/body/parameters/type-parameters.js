import React from "react"
import Parameter from "./parameter"

/**
 * Renders parameters from types
 */
export default ({ data, path }) => {
  if(!data || !data.typeParameter) return null

  return (
    <div className="type-parameter">
      <div className="subsubtitle">Type parameters</div>
      <ul>
        {data.typeParameter.map((tp, i) =>
          <Parameter data={tp} path={path} key={"key_" + path + i + "_type_param"}/>
        )}
      </ul>
    </div>
  )
}
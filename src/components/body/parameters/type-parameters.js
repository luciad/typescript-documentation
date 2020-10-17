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
        {data.typeParameter.map(tp =>
          <Parameter data={tp} path={path} key={path.id + "_type_param"}/>
        )}
      </ul>
    </div>
  )
}
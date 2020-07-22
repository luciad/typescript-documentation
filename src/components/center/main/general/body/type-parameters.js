import React from "react"
import { getComments } from "../../../../../util/util"
import Text from "../text"
import Type from "./type/type"

export default ({ data, path }) => {
  if(!data || !data.typeParameter) return null

  return (
    <div className="type-parameter">
      <div className="subsubtitle">Type parameters</div>
      <ul>
        {data.typeParameter.map(tp =>
        <li key={tp.id + "_" + tp.name + "_" + path}>
          {tp.name}
          <Type data={tp} colon={true}/>
          <Text data={getComments(tp).shortText} path={path}/>
          <Text data={getComments(tp).text} path={path}/>
        </li>
        )}
      </ul>
    </div>
  )
}
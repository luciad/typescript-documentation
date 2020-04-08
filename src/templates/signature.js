import React from "react";
import { getComments, getParameters } from "../util/util"

export default ({ data }) => {
  const signature = data
  const comments = getComments(signature)
  const parameters = getParameters(signature)

  return (
    <div className="signature">
      <div className="title">{signature.name}</div>
      <div className="subsubtitle">{signature.type.name}</div>
      <div>
      <div className="signature">{signature.kindString}</div>
      <div className="shortText">
        {comments.shortText}
      </div>
      <div className="subtitle">parameters</div>
      {parameters.length === 0 && <i>none</i>}
      <ul>
        {parameters.map(parameter => (
          <li>{parameter.name}:{parameter.type}</li>
        ))}
      </ul>
      </div>

    </div>
  )
}

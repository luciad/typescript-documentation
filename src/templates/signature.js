import React from "react";
import { getComments, getParameters } from "../util/util"

export default ({ data }) => {
  const signature = data
  const comments = getComments(signature)
  const parameters = getParameters(signature)

  return (
    <div className="signature">
      <h5>{signature.name}</h5>
      <i>{signature.type.name}</i>
      <div>{signature.kindString}</div>
      <div className="shortText">
        {comments.shortText}
      </div>
      <h5>parameters</h5>
      <ul>
        {parameters.map(parameter => (
          <li>{parameter.name}:{parameter.type}</li>
        ))}
      </ul>

    </div>
  )
}

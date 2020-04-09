import React from "react";
import { getComments } from "../util/util"
import Parameters from "./parameters"

export default ({ data }) => {
  const signature = data
  const comments = getComments(signature)
  
  return (
    <div className="signature">
        <div className="title">{signature.name}</div>
        <div className="sidecontainer">
          <div className="kindString">
            ({signature.type.name}) {signature.kindString}
            </div>
        </div>
      <div>
      {comments.returns.length > 0 && 
        <div className="returns"><b>returns</b> {comments.returns}</div>}
        <div className="shortText">
          {comments.shortText}
        </div>
        <Parameters data={data}/>
      </div>

    </div>
  )
}

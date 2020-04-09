import React from "react";
import { getComments } from "../../util/util"
import Parameters from "./parameters"

/**
 * One signature item
 */
export default ({ data }) => {
  const signature = data
  const comments = getComments(signature)
  
  return (
    <div className="signature">
        <div className="title">{signature.name}</div>
        <div style={{marginLeft: "0.5em"}}>

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
            {comments.text}
          </div>
          <Parameters data={data}/>
        </div>
      </div>

    </div>
  )
}

import React from "react";
import { getComments } from "../../util/util"
import Parameters from "./parameters"
import Text from "./text"

/**
 * Single signature item
 * 
 * Contains:
 * - name
 * - type name & kindString
 * - returns
 * - shortText
 * - text
 * - parameters
 */
export default ({ data }) => {
  const comments = getComments(data)
  
  return (
    <div className="signature">
      <div className="title">
        {data.name}
      </div>
      <div style={{marginLeft: "0.5em"}}>
        <div className="sidecontainer kindString">
          {data.type.name !== null &&
            <>({data.type.name}) &nbsp;</>}
              {data.kindString}
        </div>
        <div>
          {comments.returns.length > 0 && 
            <div className="returns"><b>returns</b> {comments.returns}</div>}
          <Text data={comments.shortText}/>
          <Text data={comments.text}/>
          <Parameters data={data}/>
        </div>
      </div>
    </div>
  )
}

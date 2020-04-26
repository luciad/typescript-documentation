import React from "react";
import { getComments } from "../../util/util"
import Parameters from "./parameters"
import Text from "./text"

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
            {signature.type.name !== null &&
              <>({signature.type.name}) &nbsp;</>}
               {signature.kindString}
              </div>
          </div>
        <div>
        {comments.returns.length > 0 && 
          <div className="returns"><b>returns</b> {comments.returns}</div>}
          <div className="shortText">
          <Text data={comments.shortText}/>
            <Text data={comments.text}/>
          </div>
          <Parameters data={data}/>
        </div>
      </div>

    </div>
  )
}

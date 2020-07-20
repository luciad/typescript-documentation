import React from "react";
import { getComments } from "../../../../../../util/util"
import Parameters from "../parameters"
import Text from "../../text"
import Type from "../type"
import Overwrites from "../overwrites"
import Tags from "../tags"

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
export default ({ data, path}) => {
  if(!data || !path) return null
  const comments = getComments(data)
  if(!comments) return null
  return (
    <div className="signature" key={data.id + "_signature"}>
      <div className="sidecontainer">
        <div className="title">
          {data.name}
        </div>
        <div className="kindString">
          {data.type.name !== null &&
            <>(<Type data={data}/>) &nbsp;</>}
              {data.kindString}
        </div>
      </div>
      <Tags tags={data.comment.tags}/>

      {data.overwrites && <div className="overwrites">Overwrites: <Overwrites data={data}/></div>}

      <div className="signatureBody">
        {comments.returns.length > 0 &&
          <div className="sidecontainer returns">returns&nbsp;<Text data={comments.returns} path={path}/></div>}
        <Text data={comments.shortText} path={path}/>
        <Text data={comments.text} path={path}/>
        <Parameters data={data} path={path}/>
      </div>
    </div>
  )
}

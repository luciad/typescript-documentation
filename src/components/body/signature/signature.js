import React from "react";
import { getComments } from "../../../util/util"
import Parameters from "../parameters/parameters"
import Text from "../general/text"
import Tags from "../tags"
import SignatureSummary from "./signature-summary"
import TypeParameters from "../parameters/type-parameters"

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
export default ({ data, path, simple }) => {
  if(!data || !path) return null
  const comments = getComments(data)
  if(!comments) return null
  let id = "empty_id"
  if(data.kindString === "Event" && data.name == "on"){
    try{
      const name = data.parameters[0].type.value
      id = "event_on_" + name
    } catch(e){}
  }

  return (
    <div className={"signature signature_kind_" + data.kindString.replace(/\s/g,"_")} key={"key_" + data.id + "_signature_sign"} id={id}>
      {!simple &&
        <>
          <SignatureSummary data={data}/>
          {/* {data.kindString} */}
        </>}
      <Tags tags={comments.tags}/>

      <div className="signature-body">
        <Text data={comments.shortText} path={path}/>
        <Text data={comments.text} path={path}/>
        <Parameters data={data} path={path}/>
        <TypeParameters data={data} path={path}/>
        {comments.returns.length > 0 &&
          <div className="sidecontainer returns">
            returns&nbsp;
            <Text data={comments.returns} path={path}/>
          </div>}
      </div>
    </div>
  )
}

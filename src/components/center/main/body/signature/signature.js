import React from "react";
import { getComments } from "../../../../../util/util"
import Parameters from "../parameters/parameters"
import Text from "../general/text"
import Type from "../type/type"
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
export default ({ data, path }) => {
  if(!data || !path) return null
  const comments = getComments(data)
  if(!comments) return null

  return (
    <div className="signature" key={data.id + "_signature"}>
      <SignatureSummary data={data}/>
      {data.kindString}
      <Tags tags={comments.tags}/>

      <div className="signature-body">
        {comments.returns.length > 0 &&
          <div className="sidecontainer returns">
            returns&nbsp;
            <Text data={comments.returns} path={path}/>
          </div>}
        <Text data={comments.shortText} path={path}/>
        <Text data={comments.text} path={path}/>
        <Parameters data={data} path={path}/>
        <TypeParameters data={data} path={path}/>
      </div>
    </div>
  )
}

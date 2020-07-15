import React from "react";
import { getComments } from "../../../../../util/util"
import ChildrenSummary from "./children/children-summary"
import Flags from "./flags"
import Signatures from "./signature/signatures"
import Links from "./links"
import Text from "../text"
import Tags from "./tags"
import Type from "./type"
/**
 * Summary of an object
 * Contains:
 * - returns
 * - default value
 * - extended by, implemented by etc (see links.js)
 *
 * - shortText
 * - text
 * - tags
 * - signatures (see signatures.js)
 * - flags (see flags.js)
 * - summary of its children (see children-summary.js)
 *
 */
export default ({ data }) => {
  if(!data) return null
  const comments = getComments(data)

  let children = data.children
  if(children === undefined || children === null) children = []
  let path = ""
  if (data.fields){
    path = data.fields.path;
  }

  return (
    <div>
      {comments.returns.length > 0 &&
        <div className="sidecontainer returns">returns&nbsp;<Text data={comments.returns} path={path}/></div>}
      {(data.defaultValue !== null && data.defaultValue !== undefined) &&
        <div>Default value: {data.defaultValue}</div>}
        {data.type && <div className="type">Type:&nbsp;
        <Type data={data}/>
        </div>}
      {data.overwrites && <div className="overwrites">Overwrites: {data.overwrites.name}</div>}
      <Flags data={data}/>
      <Links data={data}/>

      {!(comments.shortText.length === 0 && comments.text.length === 0 && comments.tags.length === 0) &&
        <div className="subtitle">About</div>}

      <Text data={comments.shortText} path={path}/>
      <Text data={comments.text} path={path}/>

      <Tags tags={comments.tags}/>
      <Signatures data={data} path={path}/>
      <ChildrenSummary data={data}/>
    </div>
  );
};

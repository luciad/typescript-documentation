import React from "react";
import { getComments } from "../../../../../util/util"
import ChildrenSummary from "./children/children-summary"
import Flags from "./flags"
import Signatures from "./signature/signatures"
import Links from "./links"
import Text from "../text"
import Tags from "./tags"
import Overwrites from "./overwrites"
import TypeParameters from './parameters/type-parameters'
import TypeComments from "./type-comments"
import SearchLink from "../search-link";

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
  let path = data.fields ? data.fields.path : ""

  return (
    <div className="body-summary">
      {comments.returns.length > 0 &&
        <div className="sidecontainer returns">returns&nbsp;<Text data={comments.returns} path={path}/></div>}
      {data.defaultValue &&
        <div>Default value: {data.defaultValue}</div>}
      {data.overwrites &&
        <div className="overwrites">
          <div className="subsubtitle">Overwrites</div>
          <ul><li><Overwrites data={data}/></li></ul>
        </div>}
      <Flags data={data}/>
      <Links data={data}/>

        {data.target &&
          <div className="target">
            Target: <SearchLink data={{text: "", id: data.target}}/>
          </div>}
      {!(comments.shortText.length === 0 && comments.text.length === 0 && comments.tags.length === 0) &&
        <div className="subtitle">About</div>}

      <Text data={comments.shortText} path={path}/>
      <Text data={comments.text} path={path}/>

      <TypeParameters data={data} path={path}/>
      <TypeComments data={data} path={path}/>
      <Tags tags={comments.tags}/>
      <Signatures data={data} path={path}/>
      <ChildrenSummary data={data}/>
    </div>
  )
}

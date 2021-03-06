import React from "react";
import { getComments, getSignatures } from "../../util/util"
import ChildrenSummary from "./children/children-summary"
import Flags from "./flags"
import Signatures from "./signature/signatures"
import Signature from "./signature/signature"
import References from "./references"
import Text from "./general/text"
import Tags from "./tags"
import Overwrites from "./overwrites"
import TypeParameters from './parameters/type-parameters'
import TypeComments from "./type-comments"
import SearchLink from "./general/search-link";

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
export default ({ data,  noChildrenSummary, simpleSignature}) => {
  if(!data) return null
  const comments = getComments(data)
  const path = data.fields ? data.fields.path : ""

  return (
    <div className="body-summary">
      {comments.returns.length > 0 &&
        <div className="sidecontainer returns">returns&nbsp;<Text data={comments.returns} path={path}/></div>}
      {data.overwrites &&
        <div className="overwrites">
          <div className="subsubtitle">Overwrites</div>
          <ul><li><Overwrites data={data}/></li></ul>
        </div>}
      <Flags data={data}/>
      <References data={data}/>

        {data.target &&
          <div className="target">
            Target: <SearchLink data={{text: "", id: data.target}}/>
          </div>}
      {!(comments.shortText.length === 0 && comments.text.length === 0 && comments.tags.length === 0) &&
        <><div className="subtitle">About</div></>}
      {!data.getSignature && !data.setSignature && (!data.signatures || data.signatures.length === 0) &&
      <>
        <Text data={comments.shortText} path={path}/>
        <Text data={comments.text} path={path}/>
      </>}

      <TypeParameters data={data} path={path}/>
      <TypeComments data={data} path={path}/>
      <Tags tags={comments.tags}/>
      {simpleSignature
        && <Signature data={getSignatures(data)[0]} path={path} simple={true}/>
        || <Signatures data={data} path={path}/>}
      {!noChildrenSummary &&
        <ChildrenSummary data={data}/>}
    </div>
  )
}
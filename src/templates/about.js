import React from "react";
import { getComments, getSignatures, getFlags } from "../util/util"
import Signature from "./signature"
import ChildrenSummary from "./children-summary"
import Leaf from "./leaf"
import ExportSummary from "./export-summary"

export default ({ data }) => {
  const comments = getComments(data)
  const signatures = getSignatures(data)
  let children = data.childrenSymbol
  if(children === undefined || children === null) children = []
  const flags = data.flags
  const flagList = getFlags(data)

  return (
    <div>
      {!(comments.shortText.length === 0 && comments.text.length === 0 && comments.tags.length === 0) &&
        <div className="subtitle">About</div>}
      <div className="shortText">
        {comments.shortText}
      </div>
      <p>
        {comments.text}
      </p>
        {comments.tags.length !== 0 && 
          <div className="subsubtitle">Tags</div>}
      <ul>
        {comments.tags.map(tag => (
          <li>{tag.tag}:{tag.text}</li>
        ))}
      </ul>
      {signatures.length !== 0 && 
        <div className="subsubtitle">Signatures</div>}
      <ul>
        {signatures.map(signature => (
          <li>
            <Signature data={signature}/>
          </li>
        ))}
      </ul>
      {flagList.length !== 0 && 
        <div className="subsubtitle">Flags</div>}
      <ul>
        {flagList.map(flag => (
          <li>
            {flag}
          </li>
        ))}
      </ul>
      <ChildrenSummary data={data}/>
      <ExportSummary data={data}/>

      {children.map(child => (
        <Leaf data={child}/>
      ))}

    </div>
  );
};

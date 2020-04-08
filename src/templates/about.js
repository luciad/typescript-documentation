import React from "react";
import { getComments, getSignatures } from "../util/util"
import Signature from "./signature"

export default ({ data }) => {
  const comments = getComments(data)
  const signatures = getSignatures(data)
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
    </div>
  );
};

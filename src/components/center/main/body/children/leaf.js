import React from "react";
import Body from "../body"
import SignatureSummary from "../signature/signature-summaries"
import Type from "../type/type"
import SymbolTitle from "../../general/symbol-title"

/**
 * Full description of an item
 * Contains
 * - Name with link to its own page
 * - kindString
 * - Its body (see body.js)
 */
export default ({ data }) => {
  if(!data) return null

  return (
    <div className="leaf" id={"id" + data.id} key={data.id + "_leaf"}>
      <div>
        <SymbolTitle data={data} link={true}/>
        <div className="bottom inline-block">
          <Type data={data} delimiter={" : "} noIsOptionalMarker={true}/>
        </div>
      </div>
      <div className="kind-string">{data.kindString}</div>
      <SignatureSummary data={data}/>
      <Body data={data}/>
    </div>
  );
};

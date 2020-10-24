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
    <div className="leaf" id={"id" + data.id} key={"key_" + data.id + "_leaf"}>
      <SymbolTitle data={data} link={true}/>
      <div className="bottom inline-block">
        <Type data={data} delimiter={" : "} noIsOptionalMarker={true}/>
      </div>

      <Body data={data}/>
    </div>
  );
};

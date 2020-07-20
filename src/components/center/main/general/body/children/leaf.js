import React from "react";
import Body from "../body"
import Icon from "../../../../../general/icon"
import { Link } from "gatsby"
import SignatureSummary from "../signature/signature-summary"
import Type from "../type"
/**
 * Full description of an item (in a box)
 * Contains
 * - Name with link to its own page
 * - kindString and its icon
 * - Its body (see body.js)
 */
export default ({ data }) => {
  if(!data) return null
  return (
    <div className="childbox" id={"id" + data.id} key={data.id + "_leaf"}>
      <div className="sidecontainer">
        <div className="title"><Link to={data.fields.path}>{data.name}</Link></div>
        {data.flags.isOptional && <div className="bottom optionalMark" title="isOptional">&nbsp;?&nbsp;</div>}
        <div className="bottom"><Type data={data} colon={true} noIsOptionalMarker={true}/></div>
      </div>
      <div className="sidecontainer">
        <Icon kindString={data.kindString}/>
        <div className="kindString">{data.kindString}</div>
        </div>
        <SignatureSummary data={data}/>
      <Body data={data}/>
    </div>
  );
};

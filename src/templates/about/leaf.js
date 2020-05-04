import React from "react";
import Body from "./body"
import Icon from "../icon"
import { Link } from "gatsby"

/**
 * Full description of an item (in a box)
 * Contains
 * - Name with link to its own page
 * - kindString and its icon
 * - Its body (see body.js)
 */
export default ({ data }) => {
  return (
    <div className="function" id={"id" + data.id}>
      <div className="title"><Link to={data.fields.path}>{data.name}</Link></div>
      <div className="sidecontainer">
        <Icon kindString={data.kindString}/> 
        <div className="kindString">{data.kindString}</div>
        </div>
      <Body data={data}/>
    </div>
  );
};

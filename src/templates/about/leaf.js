import React from "react";
import About from "./body"
import Icon from "../icon"
import { Link } from "gatsby"

/**
 * In depth description in a box of an item 
 */
export default ({ data }) => {
  const leaf = data
  return (
    <div className="function" id={"id" + leaf.id}>
      <div className="title"><Link to={leaf.fields.path}>{leaf.name}</Link></div>
      <div className="sidecontainer">
        <Icon kindString={leaf.kindString}/> 
        <div className="kindString">{leaf.kindString}</div>
        </div>
      <About data={leaf}/>
    </div>
  );
};

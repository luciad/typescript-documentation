import React from "react";
import scrollTo from "gatsby-plugin-smoothscroll"
import Icon from "../icon"
import { pathToExport } from "../../util/util"
import { Link } from "gatsby"

/**
 * List of children
 * Makes them a link if they're included in data.exports
 * 
 * Contains:
 * - List of all childrens icons and names
 *  - If it's in data.exports, it's a link
 * 
 */
export default ({ data }) => {
  const children = data.childrenSymbol
  if(children === undefined || children === null || children.length === 0) return (<div></div>)
  let exportIds = []
  if(data.exports){
    exportIds = data.exports.map(exp => exp.id)
  }

  return (
    <div>
      {children.size !== 0 && 
        <div className="subsubtitle">Children</div>}
      <ul>
        {children.map(child => {
          if(exportIds.includes(child.id))
            return (
              <li onClick={() => scrollTo("#id" + child.id)}>
                <div className="sidecontainer">
                <Icon kindString={child.kindString}/>
                <Link to={pathToExport(data, child)}>{child.name}</Link>
                </div>
              </li>
            )
            return (
              <li onClick={() => scrollTo("#id" + child.id)}>
              <div className="sidecontainer">
              <Icon kindString={child.kindString}/>
                {child.name}
              </div>
            </li>
            )
        })}
      </ul>
    </div>
  );
};

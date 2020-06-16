import React from "react";
import scrollTo from "gatsby-plugin-smoothscroll"
import Icon from "../../../../../general/icon"
import { pathToExport } from "../../../../../../util/util"
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
  if(!data) return null
  const children = data.childrenSymbol
  if(!children || children.length === 0) return (<></>)
  let exportIds = []
  if(data.exports){
    exportIds = data.exports.map(exp => exp.id)
  }

  return (
    <div className="childrenSummary">
      {children.size !== 0 &&
        <div className="subsubtitle">Children</div>}
      <ul>
        {children.map(child => {
          if(!child.id) return null
          if(exportIds.includes(child.id))
            return (
              <li>
                <div className="sidecontainer">
                <Icon kindString={child.kindString}/>
                <Link to={pathToExport(data, child)}>
                  {child.name}
                </Link>
                </div>
              </li>
            )
            return (
              <li>
              <div className="sidecontainer">
              <Icon kindString={child.kindString}/>
                <button className="clickabletext" onClick={() => scrollTo("#id" + child.id)} onKeyDown={() => scrollTo("#id" + child.id)}>
                  {child.name}
                </button>
              </div>
            </li>
            )
        })}
      </ul>
    </div>
  );
};

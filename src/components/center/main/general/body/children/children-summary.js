import React from "react";
import scrollTo from "gatsby-plugin-smoothscroll"
import Icon from "../../../../../general/icon"
import SearchLink from "../../search-link"

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
  const children = data.children
  if(!children || children.length === 0) return null
  let exportIds = data.exports ? data.exports.map(exp => exp.id) : []

  return (
    <div className="childrenSummary">
      {children.size !== 0 &&   // Only show "Children" title if children exist.
        <div className="subsubtitle">Children</div>}
      <ul className="itemList">
        {children.map(child => {
          if(exportIds.includes(child.id)) // if child is exported, a link to the child is included.
            return (
              <li key={child.id + "_child_summary_entry"}>
                <SearchLink data={{text: child.name, id: child.id}}/>
              </li>
            )
            return (  // if child is not exported, clicking on its name will scroll to its body on the same page
              <li key={child.id + "_child_summary_entry_noexport"}>
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

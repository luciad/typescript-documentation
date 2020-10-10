import React from "react";
import scrollTo from "gatsby-plugin-smoothscroll"
import SearchLink from "../general/search-link"

/**
 * List of children
 *
 * Contains:
 * - List of all childrens icons and names
 *  - a link to the leaf version of the child
 *
 */
export default ({ data }) => {
  if(!data) return null
  const children = data.children
  if(!children || children.length ===  0) return null

  return (
    <div className="children-summary">
        {data.groups.map(group => (                 //map functions, interfaces etc separately
          <div className="group">
            <div className="subsubtitle">
              {group.title}
            </div>
            <ul className="item-list">
              {group.children.map(childID => {    //map children within a group,  clicking on its name will scroll to its body on the same page
                const child = children.find(child => (child.id == childID))
                return (
                  <li key={child.id + "_child_summary_entry_noexport"} title={child.kindString}>
                    <button className="clickable-text" onClick={() => scrollTo("#id" + child.id)} onKeyDown={() => scrollTo("#id" + child.id)}>
                      {child.name}
                    </button>
                </li>
              )})}
            </ul>
          </div>
        ))}
    </div>
  )
}

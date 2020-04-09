import React from "react";
import scrollTo from "gatsby-plugin-smoothscroll"
import Icon from "./icon"
import { pathToExport } from "../util/util"
import { Link } from "gatsby"

export default ({ data }) => {
  const children = data.childrenSymbol
  if(children === undefined || children === null || children.length === 0) return (<div></div>)
  const exports = data.exports
  let exportIds = []
  if(exports !== undefined && exports !== null){
    for(let exprt of exports){
      console.log(exprt)
      exportIds.push(exprt.id)
    }
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

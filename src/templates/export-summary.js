import React from "react"
import Icon from "./icon"
import { Link } from "gatsby"
import { pathToExport } from "../util/util"

export default ({ data }) => {
  const exports = data.exports
  const module = data
  if(exports === undefined || exports === null) return (<div></div>)

  console.log(exports)
  return (
    <div>
      <div className="subtitle">Exports</div>
        <ul>
          {exports.map(exprt => (
            <li>
              <div className="sidecontainer">
              <Icon kindString={exprt.kindString}/> 
              <Link to={pathToExport(module, exprt)}>{exprt.name}</Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
  );
};

import React from "react"
import Wrapper from "./directory-tree-wraper"
import { Link } from "gatsby"


export default ({directories}) => {

  if(directories.next === undefined || directories.next === null || directories.next.length === 0) return (<div></div>)

  return (
      <ul className="directoryitem">
      {directories.next.map( node => {
        return (
          <li>
          {(node.next.length > 0 &&
            <div>{node.name}</div>)
              ||
            <Link to={node.path}>{node.name}</Link>}
            <Wrapper data={node}/>
          </li>
        )})}
    </ul>
  )
}
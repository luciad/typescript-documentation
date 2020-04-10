import React from "react"
import Wrapper from "./directory-tree-wraper"


export default ({directories}) => {

  if(directories.next === undefined || directories.next === null || directories.next.length === 0) return (<div></div>)

  return (
      <ul className="directoryitem">
      {directories.next.map( node => {
        return (
          <li>
          {node.name}
            <Wrapper data={node}/>
          </li>
        )})}
    </ul>
  )
}
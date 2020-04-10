import React from "react"
import { Link } from "gatsby"

/**
 * sub-tree of directories
 */
const DirectoryTree = ({directories}) => {

  if(directories.next === undefined || directories.next === null || directories.next.length === 0) return (<div></div>)

  return (
      <ul className="directoryitem">
      {directories.next.map( node => {
        return (
          <li key={node.id}>
          {(node.next.length > 0 &&
            <div>{node.name}</div>)
              ||
            <Link to={node.path}>{node.name}</Link>}
            <DirectoryTree directories={node}/>
          </li>
        )})}
    </ul>
  )
}

export default DirectoryTree
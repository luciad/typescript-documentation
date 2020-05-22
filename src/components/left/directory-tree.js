import React from "react"
import { Link } from "gatsby"

/**
 * sub-tree of directories
 */
const DirectoryTree = ({directories}) => {

  if(directories.next === undefined || directories.next === null || directories.next.length === 0) return (<div></div>)

  return (
      <div className="directoryitem">
      {directories.next.map( node => {
        return (
          <>
          {(node.next.length > 0 &&
            (
            <details open>
              <summary>{node.name}</summary>
              <p><DirectoryTree directories={node}/></p>
            </details>
            ))
              ||
            <p><Link to={node.path}>{node.name}</Link></p>}
          </>
        )})}
    </div>
  )
}

export default DirectoryTree
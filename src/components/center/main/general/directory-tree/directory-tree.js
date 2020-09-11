import React from "react"
import { Link } from "gatsby"

/**
 * sub-tree of directories
 */
const DirectoryTree = ({directories}) => {

  if(!directories || directories.next.length === 0) return null

  return (
      <div className="directory-item">
      {directories.next.map( node => {
        return (
          <div key={node.path}>
          {(node.next.length > 0 &&
            (
            <details>
              <summary>{node.name}</summary>
              <DirectoryTree directories={node}/>
            </details>
            ))
              ||
            <p><Link to={node.path}>{node.name}</Link></p>}
          </div>
        )})}
    </div>
  )
}

export default DirectoryTree
import React from "react"
import { Link } from "gatsby"
import { MODULE_PATH_PREFIX } from "../../../../../util/util"

/**
 * sub-tree of directories
 */
const DirectoryTree = ({directories, expand}) => {
  if(!directories || directories.next.length === 0) return null
if(typeof expand === "string"){
  expand = expand.replace(MODULE_PATH_PREFIX + "/", "")
  expand = expand.split("/")
}

  return (
      <div className="directory-item">
      {directories.next.map( node => {
        return (
          <div key={node.path}>
          {(node.next.length > 0 &&
            <>
              {expand && expand[0] === node.name &&
              <details open>
                <summary>{node.name}</summary>
                <DirectoryTree directories={node} expand={expand.splice(1)}/>
              </details>
              ||
              <details>
                <summary>{node.name}</summary>
                <DirectoryTree directories={node}/>
              </details>}
            </>)
              ||
            <p><Link to={node.path}>{node.name}</Link></p>}
          </div>
        )})}
    </div>
  )
}

export default DirectoryTree
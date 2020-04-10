import React from 'react'
import { StaticQuery } from "gatsby"
import { getAllDirectories } from "../util/directory"
import DirectoryTree from "./directory-tree"

/**
 * recursive list of directories
 */
export default () => {
  return (
    <div>
      <h3>Directories</h3>
      <ul className="directories">

      <StaticQuery
        query={graphql`
          query directoryQuery {
            allModule {
                  nodes {
                    name
                  }
                }
              }
        `}
        render={(
          data
        ) => (
          <DirectoryTree directories={getAllDirectories(data)}/>
        )}
      />
      </ul>
    </div>
  )
}

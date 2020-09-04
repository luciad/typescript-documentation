import React from 'react'
import { StaticQuery, graphql } from "gatsby"
import { getAllDirectories } from "../../util/directory"
import DirectoryTree from "./directory-tree"

/**
 * recursive list of directories
 */
export default () => {
  return (
    <div className="directory-list">
      <article className="directories">
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
      </article>
    </div>
  )
}

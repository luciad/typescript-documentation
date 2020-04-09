import React from 'react'
import { Link, StaticQuery } from "gatsby"
import { pathToModule } from "../util/util"

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
          <div>
            {data.allModule.nodes.map( node => {
              return (
                <li>
                <Link to={pathToModule(node)}>{node.name}</Link>
                </li>
              )})}
          </div>
        )}
      />
      </ul>
    </div>
  )
}

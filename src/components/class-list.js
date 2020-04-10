import React from 'react'
import { Link, StaticQuery } from "gatsby"
import { pathToExport } from "../util/util"

export default () => {
  return (
    <div>
      <h3>All Classes</h3>
      <ul className="classes">

      <StaticQuery
        query={graphql`
          query ClassQuery {
            allSymbol(filter: {kindString: {eq: "Class"}}, sort: {fields: name}) {
              nodes {
                kindString
                name
                parent {
                  ... on Module {
                    name
                  }
                }
              }
            }
          }
        `}
        render={(
          data
        ) => (
          <div>
            {data.allSymbol.nodes.map( node => 
            {
            return (
              <li>
              <Link to={pathToExport(node.parent, node)}>{node.name}</Link>
              </li>
            )})}
          </div>
        )}
      />
      </ul>
    </div>
  )
}

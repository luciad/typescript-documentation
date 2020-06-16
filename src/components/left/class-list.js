import React from 'react'
import { Link, StaticQuery, graphql } from "gatsby"
import { pathToExport } from "../../util/util"
import Icon from "../general/icon"
/**
 * List of all classes
 */
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
              <li key={node.name}>
              <div className="sidecontainer">
                <Icon kindString={node.kindString}/>
                <Link to={pathToExport(node.parent, node)}>{node.name}</Link>
              </div>
              </li>
            )})}
          </div>
        )}
      />
      </ul>
    </div>
  )
}

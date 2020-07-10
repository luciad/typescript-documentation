import React from 'react'
import { Link, StaticQuery, graphql } from "gatsby"
import { pathToExport } from "../../util/util"
import Icon from "../general/icon"
/**
 * List of all classes
 */
export default () => {
  let filter = {
    kindString: [
      "Class",
      "Function",
      "Interface",
    ]
  }
  return (
    <div>
      <h3>Filter</h3>
      <ul className="classes">

      <StaticQuery
        query={graphql`
          query ClassQuery {
            allSymbol(sort: {fields: name}) {
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
            if(!passesFilter(node)) return null
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

  function passesFilter(node){
    return filter.kindString.includes(node.kindString)
  }
}

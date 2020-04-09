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
          query MyQuery {
            allModule(filter: {childrenSymbol: {elemMatch: {kindString: {eq: "Class"}}}}, sort: {fields: childrenSymbol___name}) {
              nodes {
                childrenSymbol {
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
          }
        `}
        render={(
          data
        ) => (
          <div>
            {data.allModule.nodes.map( node => 
            <div>
            {
              node.childrenSymbol.map( child =>  {
            return (
              <li>
              <Link to={pathToExport(child.parent, child)}>{child.name}:{child.kindString}</Link>
              </li>

            )})}
            </div>
            )}
          </div>
        )}
      />
      </ul>
    </div>
  )
}

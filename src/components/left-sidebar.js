import React from 'react'
import logo from "../images/logo.png"
import { Link, StaticQuery } from "gatsby"

export default () => {
  return (
  <div className="leftsidenav">
    <Link to="/overview">
      <img src={logo} alt="Company Logo" class="center"/>
    </Link>

    <h3>Directories</h3>
    <ul className="directories">
      <li>directory0</li>
      <li>directory0.directory1</li>
      <li>something.example</li>
    </ul>
    
    <h3>All Classes</h3>
    <ul className="classes">

    <StaticQuery
      query={graphql`
        query MyQuery {
          allModule(filter: {childrenSymbol: {elemMatch: {kindString: {eq: "Class"}}}}) {
            nodes {
              childrenSymbol {
                kindString
                name
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
              {child.name}:{child.kindString}
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
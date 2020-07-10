import React, { Component } from 'react'
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
      <details>
        <summary>
          <h3 style={{"display": "inline"}}>Filter</h3>
        </summary>
        <ul className="filteroptions">
          <FilterItem text="Class"/>
          <FilterItem text="Function"/>
          <FilterItem text="Interface"/>
        </ul>
      </details>
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

class FilterItem extends Component {
  constructor(props){
    super(props)
    this.props = props
  }

  render(){
    return(
      <li className="sidecontainer">
        <input type="checkbox" defaultChecked={true} onChange={console.log("change!")}/> <i className="filteritem">{this.props.text}</i>
      </li>
    )
  }

  update = evt => {
    console.log(evt)
  }
}

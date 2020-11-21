import React, { Component } from "react"
import { Link } from "gatsby"
import { graphql, StaticQuery } from "gatsby"

/**
 * Search function in the top bar
 */
export default class Search extends Component {

  // included items must have one of these kindStrings:
  kindStringFilterDefaultOn = [
    "Function",
    "Class",
    "Interface",
    "Method"
  ]

  state = {
      kindStringFilter: [...this.kindStringFilterDefaultOn],
      pathFilter: ""
  }

  render() {
    return (
      <div  className="search" placeholder="search">
        <input type="text" value={this.state.pathFilter} onChange={this.search} placeholder="search" aria-label="search"/>
          {this.state.pathFilter && <StaticQuery
            query={graphql`
              query searchResultQuery {
                allSymbol(sort: {fields: name}) {
                  nodes {
                    kindString
                    name
                    id
                    fields {
                      path
                    }
                  }
                }
              }
            `}
            render={data => {
              let results = data.allSymbol.nodes.filter(a => this.passesFilter(a))
              results = results.sort((a, b) => {
                const filter = this.state.pathFilter.toLowerCase()
                const lowerA = a.name.toLowerCase()
                const lowerB = b.name.toLowerCase()
                if(lowerB.startsWith(filter) && !lowerA.startsWith(filter)) return 1
                if(lowerA.startsWith(filter) && !lowerB.startsWith(filter)) return -1
                if(lowerB.includes(filter) && !lowerA.includes(filter)) return 1
                if(lowerA.includes(filter) && !lowerB.includes(filter)) return -1
                return lowerA.localeCompare(lowerB);
              })

              return(
              <ul className="search-results">
                {results.map(node =>
                (
                  <li key={"key_" + node.id + "_filterlist_entry"}>
                    <div className="sidecontainer" title={node.kindString}>
                      <Link to={node.fields.path}>{node.name}</Link>
                    </div>
                    {node.fields.path.replace("/modules/", "")}
                  </li>
                ))}
              </ul>
              )}}
          />}
      </div>
    )
  }

  search = evt => {
    const pathFilter = evt.target.value
    this.setState({
      pathFilter
    })
  }

    passesFilter = (node) => {
      return this.state.kindStringFilter.includes(node.kindString) && node.fields.path.toLowerCase().includes(this.state.pathFilter.toLowerCase())
    }
}
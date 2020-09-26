import React, { Component } from "react"
import { Index } from "elasticlunr"
import { Link } from "gatsby"
import Icon from "../../general/icon"
import { graphql, StaticQuery } from "gatsby"

// Search component
export default class Search extends Component {

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
                if(b.name.toLowerCase().includes(filter) && !a.name.toLowerCase().includes(filter)) return 1
                if(a.name.toLowerCase().includes(filter) && !b.name.toLowerCase().includes(filter)) return -1
                return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
              })

              return(
              <ul className="search-results">
                {results.map(node =>
                (
                  <li key={node.id + "_filterlist_entry"}>
                    <div className="sidecontainer" title={node.kindString}>
                      <Icon kindString={node.kindString}/>
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
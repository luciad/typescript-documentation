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
            render={(data) => (
              <ul>
                {data.allSymbol.nodes.sort(function (a, b) {
                    return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
                  }).map(node =>
                {
                  if(!this.passesFilter(node)) return null

                    return (
                      <li key={node.id + "_filterlist_entry"}>
                      <div className="sidecontainer" title={node.kindString}>
                        <Icon kindString={node.kindString}/>
                        <Link to={node.fields.path}>{node.name}</Link>
                      </div>
                      {node.fields.path.replace("/modules/", "")}
                      </li>
                  )})}
              </ul>
            )}
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
/*
  search = evt => {
    const query = evt.target.value
    this.index = this.getOrCreateIndex()
    this.setState({
      query,
      // Query the index with search string to get an [] of IDs
      results: this.index
        .search(query, { expand: true, bool: "AND" })
        // Map over each ID and return the full document
        .map(({ ref }) => this.index.documentStore.getDoc(ref)),
    })
  }*/
}
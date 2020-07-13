import React, { Component } from "react"
import { Index } from "elasticlunr"
import { Link } from "gatsby"
import Icon from "../../general/icon"
import { MODULE_PATH_PREFIX } from "../../../util/util"

// Search component
export default class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: ``,
      results: [],
    }
  }

  render() {
    return (
      <div  className="search" placeholder="search">
        <input type="text" value={this.state.query} onChange={this.search} placeholder="search" aria-label="search"/>
        <ul>
          {this.state.results.splice(0,400).map(page => (
            <li key={page.id + "_search_entry"}>
              <div className="sidecontainer">
                <Icon kindString={page.kindString}/>
                <Link to={page.path}>{page.name}</Link>
              </div>
              <div style={{wordBreak:"break-all"}}>
                {page.path.replace(MODULE_PATH_PREFIX + "/", "")}
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
  getOrCreateIndex = () =>
    this.index
      ? this.index
      : // Create an elastic lunr index and hydrate with graphql query results
        Index.load(this.props.searchIndex)

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
  }
}
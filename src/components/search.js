import React, { Component } from "react"
import { Index } from "elasticlunr"
import { Link } from "gatsby"
import Icon from "../templates/icon"

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
        <input type="text" value={this.state.query} onChange={this.search} placeholder="search"/>
        <ul>
          {this.state.results.splice(0,100).map(page => (
            <li key={page.id}>
              <div className="sidecontainer">
                <Icon kindString={page.kindString}/>
                <Link to={"/" + page.path}>{page.name}</Link>
              </div>
               {/* {JSON.parse(page.comment) && JSON.parse(page.comment).shortText} */}
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
        .search(query, { expand: true })
        // Map over each ID and return the full document
        .map(({ ref }) => this.index.documentStore.getDoc(ref)),
    })
  }
}
import React, { Component } from "react";
import { Link, StaticQuery } from "gatsby"
import { Index } from "elasticlunr"
import Icon from "../icon"

export default ({data}) => {
  return (
    <StaticQuery
    query={graphql`
      query searchQuery {
        siteSearchIndex {
          index
        }
      }
    `}
    render={info => (          
        <Search searchIndex={info.siteSearchIndex.index} data={data}/>
    )}
  />
  )
}

// Search component
class Search extends Component {
  constructor(props) {
    super(props)
    this.data = props.data
    this.state = {
      query: ``,
      results: [],
    }
    
  const query = this.data.text
  this.index = this.getOrCreateIndex()
  this.state = {
    query,
    // Query the index with search string to get an [] of IDs
    results: this.index
      .search(query, { expand: true })
      // Map over each ID and return the full document
      .map(({ ref }) => this.index.documentStore.getDoc(ref)),
    }
  }

  render() {
    return (
      <div style={{display:"inline-block"}}>
          {this.state.results.slice(0,1).map(page => (
            <div className="sidecontainer">
              <Icon kindString={page.kindString}/>
              <Link to={"/" + page.path}>{page.name}</Link>
            </div>
          ))}
      </div>
    )
  }
  getOrCreateIndex = () =>
    this.index
      ? this.index
      : // Create an elastic lunr index and hydrate with graphql query results
        Index.load(this.props.searchIndex)
}
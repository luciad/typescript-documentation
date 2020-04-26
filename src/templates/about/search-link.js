import React, { Component } from "react";
import { Link, StaticQuery } from "gatsby"
import { Index } from "elasticlunr"

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
    console.log("ddta: ")
    console.log(this.data)
    this.state = {
      query: ``,
      results: [],
    }
    this.search()
  }

  render() {
    return (
      <div onLoadedData={this.search}>
        <input type="text" value={this.state.query} onChange={this.search} onLoad={this.search}/>
        <ul>
          {this.state.results.map(page => (
            <li key={page.id}>
              <Link to={"/" + page.path}>{page.name}</Link>
              ({page.kindString})
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

  search = () => {
    const query = this.data.text
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
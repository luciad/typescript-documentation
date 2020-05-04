import React, { Component } from "react";
import { Link, StaticQuery, graphql } from "gatsby"
import { Index } from "elasticlunr"
import Icon from "../icon"
import { getMostSimilarPage } from "../../util/directory"

/**
 * Used for getting a link from a name from
 * (eg. for a function)
 * Contains:
 * - Link to most similar page and the icon of its kindString
 */
export default ({data}) => {
  /**
   * Query to get the searchIndex
   */
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
        <Search searchIndex={info.siteSearchIndex.index} data={data} style={{display:"inline-block"}}/>
    )}
  />
  )
}

/**
 * Class to analyse data from query
 */
class Search extends Component {

  /**
   * Initializes class and executes query
   * @param {*} props: props.data; props.data.text
   */
  constructor(props) {
    super(props)
    this.data = props.data
    this.state = {
      query: ``,
      results: [],
    }
  
  //  Word to search for
  const query = this.data.text

  this.index = this.getOrCreateIndex()
  this.state = {
    query,
    results: this.index.search(query, { expand: false })
      .map(({ ref }) => this.index.documentStore.getDoc(ref)),
    }
  }

  /**
   * Rended the result
   * Contains:
   * - Link to most similar page and the icon of its kindString
   */
  render() {
    let page = getMostSimilarPage(this.state.results, "") //TODO: how to get dir?
    if(!page) return (<div></div>)
    return (
      <div style={{display:"inline-block"}}>
            <div className="sidecontainer">
              <Icon kindString={page.kindString}/>
              <Link to={"/" + page.path}>{page.name}</Link>
            </div>
      </div>
    )
  }
  
  // Create an elastic lunr index and hydrate with graphql query results
  getOrCreateIndex = () => this.index ? this.index
      : Index.load(this.props.searchIndex)
}
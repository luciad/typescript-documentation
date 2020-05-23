import React, { Component } from "react";
import { Link, StaticQuery, graphql } from "gatsby"
import { Index } from "elasticlunr"
import Icon from "../../../general/icon"
import { getMostSimilarPage } from "../../../../util/directory"

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
    this.srcPath = props.data.searchPath
    this.state = {
      query: ``,
      results: [],
    }
  
  //  Word to search for
  let query
  if(typeof this.data == "string"){
    query = this.data
  }else{
    query = this.data.text
  }

  this.text = query.substring(query.indexOf(" ") + 1)
  query = query.substring(0, query.indexOf(" ") > 0 ? query.indexOf(" ") : query.size).replace(/\./g, " ")

  this.index = this.getOrCreateIndex()
  this.state = {
    query,
    results: this.index.search(query, 
      { expand: false, 
        bool: "AND",
      //   fields: {
      //     name: {boost: 3},
      //     path: {boost: 1}
      // } 
      })
      .map(({ ref }) => this.index.documentStore.getDoc(ref)),
    }
  }

  /**
   * Rended the result
   * Contains:
   * - Link to most similar page and the icon of its kindString
   */
  render() {
    let path = ""
    if(this.srcPath){
      path = this.srcPath
    }
    console.log(this.state.results)
    let page = getMostSimilarPage(this.state.results, path, this.state.query)
    if(!page) return (<div className="searchLink">{this.text} (Link not found on {this.state.query}!)</div>)
    return (
      <div className="searchLink">
            <div className="sidecontainer">
              <Icon kindString={page.kindString}/>
              {(
                page.name === this.text &&
                <Link to={"/" + page.path}>{page.name}</Link>
              )
              ||
                <Link to={"/" + page.path}>{this.text}</Link>
              }
            </div>
      </div>
    )
  }
  
  // Create an elastic lunr index and hydrate with graphql query results
  getOrCreateIndex = () => this.index ? this.index
      : Index.load(this.props.searchIndex)
}
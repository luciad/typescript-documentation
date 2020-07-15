import React, { Component } from "react";
import { Link, StaticQuery, graphql } from "gatsby"
import { Index } from "elasticlunr"
import Icon from "../../../general/icon"
import { getMostSimilarPage } from "../../../../util/directory"
import { MODULE_PATH_PREFIX } from "../../../../util/util"

/**
 * Used for getting a link from a name or id
 * (eg. for a function)
 * Contains:
 * - Link to most similar page and the icon of its kindString
 */
export default ({data}) => {
  if(!data) return null
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
   * @param {*} props: props.data; props.data.text; props.data.id (optional)
   */
  constructor(props) {
    super(props)
    this.data = props.data
    this.srcPath = props.data.path ? props.data.path : props.data.searchPath
    this.state = {
      query: ``,
      results: [],
    }

  let text = ""
  if(typeof this.data == "string" && this.data.length > 0){
    text = this.data
  }else if(typeof this.data.text == "string" && this.data.text.length > 0){
    text = this.data.text
  }else if(typeof this.srcPath == "string"){
    text = this.srcPath.replace(MODULE_PATH_PREFIX + "/", "")
  }
  text = text.trim()
  this.text = text.substring(text.indexOf(" ") + 1)
  text = text.substring(0, text.indexOf(" ") > 0 ? text.indexOf(" ") : text.size).replace(/\./g, " ")

  const query = this.data.id ? this.data.id : text

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
    let path = this.srcPath ? this.srcPath : ""
    let page = getMostSimilarPage(this.state.results, path, this.text)
    if(!page) return (<div className="searchLink">{this.text} (Link not found on {this.state.query}!)</div>)
    return (
      <div className="searchLink">
            <div className="sidecontainer">
              <Icon kindString={page.kindString}/>
              {(
                page.name === this.text &&
                <Link to={page.path}>{page.name}</Link>
              )
              ||
                <Link to={page.path}>{this.text}</Link>
              }
            </div>
      </div>
    )
  }

  // Create an elastic lunr index and hydrate with graphql query results
  getOrCreateIndex = () => this.index ? this.index : Index.load(this.props.searchIndex)
}
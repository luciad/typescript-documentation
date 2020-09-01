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
        <Search searchIndex={info.siteSearchIndex.index} data={data} className="inline-block"/>
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
    this.srcPath = props.data.searchPath
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

  this.originalText = text

  text = text.trim()
    if(text.includes("\"")){
      const startI = text.indexOf("\"") + 1
      let endI = text.indexOf("\"", startI)
      this.srcPath = text.substring(startI, endI)
      text = text.substring(0, startI - 1) + text.substring(endI + 1)
    }

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
    // if no page is found
    if(!page) {
      // if the query was on an id
      if(typeof this.state.query === "number"){
        return <>{this.text}</>
      }
      // if the link is to a site
      if(this.state.query.startsWith("http")){
        const url = this.originalText.split(" ")[0]
        return <a href={url}>{this.text.length > 0 ? this.text : url}</a>
      }
      // if it's a primitive
      let primitives = ["Boolean", "Number", "String", "BigInt", "Symbol", "undefined", "Object", "Function", "null"]
      if(primitives.includes(this.state.query)){
        return <div className="primitive">{this.text}</div>
      }
      // else: warn
      console.warn("[l-td] Link not found on " + this.state.query + "!")
      return (<div className="search-link not-found">{this.text}</div>)
    }
    return (
      <div className="search-link">
            <div className="sidecontainer">
              <Icon kindString={page.kindString}/>
              <Link to={page.path}>{this.text.length > 0 ? this.text : page.name}</Link>
            </div>
      </div>
    )
  }

  // Create an elastic lunr index and hydrate with graphql query results
  getOrCreateIndex = () => this.index ? this.index : Index.load(this.props.searchIndex)
}
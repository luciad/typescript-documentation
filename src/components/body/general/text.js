import React from "react"
import { getLinks, parse } from "../../../util/util"
import SearchLink from "./search-link"
import Image from "./image"
import Snippet from "./snippet"

/**
 * Parses text for @link, @img, and HTML
 *
 * Contains:
 * - text
 * - searched links (see search-link.js)
 * - images
 */
export default ({ data, path }) => {
  if(!data) return null
  if(!path) path=""

  // Recursively go over parsed React elements
  let newData = recursiveMap(parse(data), child => {
    if (!React.isValidElement(child) && typeof child === "string") {
      child = (<>{child}</>)
    }
    if(child.props && child.props.children){
      let children = child.props.children.length instanceof Array ? child.props.children : [child.props.children]
      let tempChildArray = []
      for(let e of children){
        tempChildArray = tempChildArray.concat(typeof e === "string" ? getLinks(e) : {text: e}) // Parse links from inside element
      }

      let newChildren = tempChildArray.map(e => { // Create react element if necessary
      switch(e.type){
        case "img":
          return (
          <span key={"key_" + e.text + "_text_img"}>
            <Image data={e}/>
          </span>)
        case "link":
          e.searchPath = path
          return (
          <span key={"key_" + e.text + "_text_link"}>
            <SearchLink data={e}/>
          </span>)
        case "snippet":
          return (
          <span key={"key_" + e.text + "_text_snippet"}>
            <Snippet data={e}/>
          </span>)
        default:
          return e.text
      }})

    return React.cloneElement(child, {children: newChildren})
    }
    return child
  })

  return (
    <div className="textblock">
      { newData.map(e => (<span key={"key_" + e.key + e.props.toString() + "_textblock"}>{e}</span>))}
    </div>
  )
}

/**
 * Recursively map function on React elements and their children
 *
 * @param {ReactElement} children
 * @param {function} fn
 */
function recursiveMap(children, fn) {
  return React.Children.map(children, child => {
    if (!React.isValidElement(child)) {
      return fn(child);
    }
    if (child.props.children) {
      child = React.cloneElement(child, {
        children: recursiveMap(child.props.children, fn)
      });
    }
    return fn(child);
  });
}
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
          return <Image data={e}/>
        case "link":
          e.searchPath = path
          return <SearchLink data={e}/>
        case "snippet":
          return <Snippet data={e}/>
        default:
          return e.text
      }})

    return React.cloneElement(child, {children: newChildren})
    }
    return child
  })

  return (
    <div className="textblock">
      { newData.map(e => (<>{e}</>))}
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
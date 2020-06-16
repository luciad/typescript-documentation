import React from "react"
import { getLinks } from "../../../../util/util"
import SearchLink from "./search-link"
import Image from "./image"

/**
 * Parses text for @links and HTML
 *
 * Contains:
 * - text
 * - searched links (see search-link.js)
 */
export default ({ data, path }) => {
  if(!data || !path) return null
  const parsedData = getLinks(data)
  if(parsedData.length === 0){
    return null;
  }
  return (
    <div className="textblock">
      {parsedData.map(function(data){
        switch(data.type){
          case "link":
            data.searchPath = path
            return (
              <SearchLink data={data}/>
            )
          case "img":
              return (
                <Image data={data}/>
              )
          default:
            return (
              <>{data.text}</>
            )
        }
      })}
    </div>
  )
}

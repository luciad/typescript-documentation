import React from "react"
import { getLinks } from "../../util/util"
import SearchLink from "./search-link"

/**
 * Parses text for @links and HTML
 * 
 * Contains:
 * - text
 * - searched links (see search-link.js)
 */
export default ({ data, path }) => {
  const parsedData = getLinks(data)
  if(parsedData.length === 0){
    return null;
  }
  return (
    <div class="textblock">
      {parsedData.map(function(data){
        switch(data.type){
          case "link":
            data.searchPath = path
            return (
              <SearchLink data={data}/>
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

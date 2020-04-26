import React from "react"
import { getLinks } from "../../util/util"
import SearchLink from "./search-link"


export default ({ data }) => {
  const parsedData = getLinks(data)
  return (
    <div>
      {parsedData.map(function(data){
        switch(data.type){
          case "link":
            return (
              <SearchLink data={data} style={{display:"inline-block"}}/>
            )
          default:
            return (
              <>{data.text}</>
            )
        }
      })}
    </div>
  );
};

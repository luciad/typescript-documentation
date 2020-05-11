import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Search from "./search"

export default () => {
  return (
    <StaticQuery
    query={graphql`
      query SearchIndexQuery {
        siteSearchIndex {
          index
        }
      }
    `}
    render={data => (
      <>
        <div className="topbar">
          <Search searchIndex={data.siteSearchIndex.index}/>
        </div>
        <div className="topbarspace"></div>          
      </>
    )}
  />
  )
}
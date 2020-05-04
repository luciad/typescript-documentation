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
      <div className="topbar">
        <a href="/">Module</a>
        <a>|</a>
        <a href="/">Class</a>
        <a>|</a>
        <a href="/">Use</a>
        {/* <input type="text" placeholder="search"/>   */}
        <Search searchIndex={data.siteSearchIndex.index} />
      </div>
    )}
  />
  )
}
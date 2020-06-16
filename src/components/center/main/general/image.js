import React from "react"
import { StaticQuery, graphql } from "gatsby"

export default ({ data }) => {
  if(!data) return null
  return (
    <StaticQuery
      query={graphql`
       query allImages {
        allFile(filter: {extension: {ne: "json"}}) {
          edges {
            node {
              relativePath
              publicURL
            }
          }
        }
       }
      `}
      render={query => {
        let items = query.allFile.edges
        let path = "not found"
        for(let item of items){
          if(item.node.relativePath === data.text){
            path = item.node.publicURL
            break;
          }
        }
      return (
        <img className="textimg" src={path} alt={data.text}/>
      )}}
    />
  )
}

import React from "react"
import { StaticQuery } from "gatsby"

export default ({ data }) => {
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
          console.log(item.node.relativePath)
          console.log(data.text)
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

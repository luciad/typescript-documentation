import React from "react"
import { StaticQuery, graphql } from "gatsby"

export default ({ data }) => {
  if(!data) return null
  let [searchPath, language] = data.text.trim().split(" ")
  if(!language || language.length === 0) language = "none"
  return (
    <StaticQuery
      query={graphql`
       query allFiles {
        allFile(filter: {extension: {ne: "json"}}) {
          edges {
            node {
              relativePath
              fields {
                contents
              }
            }
          }
        }
       }
      `}
      render={query => {
        let items = query.allFile.edges
        let contents = "not found"
        for(let item of items){
          if(item.node.relativePath === searchPath){
            contents = item.node.fields.contents
            break;
          }
        }
      if(contents === "not found"){
        console.warn("[l/td] Snippet not found: ", data.text)
        return <div className= "snippet notfound"> ({data.text} not found) </div>
      }
      return (
        <pre>
          <code className={"language-" + language}>
            {contents}
          </code>
        </pre>
      )}}
    />
  )
}
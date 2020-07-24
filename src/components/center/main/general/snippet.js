import React from "react"
import { StaticQuery, graphql } from "gatsby"

/**
 * External snippets only
 */
export default ({ data }) => {
  if(!data) return null

  const defaultLanguage = process.env.GATSBY_DEFAULT_LAN
  let [searchPath, language] = data.text.trim().split(" ")
  if(!language || language.length === 0){
    const ext = searchPath.substring(searchPath.lastIndexOf(".") + 1)
    if(ext.length > 0 && ext.length < searchPath.length - 2){
      language = ext
    }else{
      language = defaultLanguage
    }
  }
  return (
    <StaticQuery
      query={graphql`
       query allFiles {
        allFile(filter: {extension: {ne: "json"}, name: {ne: "docu"}}) {
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
        console.warn("[l-td] Snippet not found: ", data.text)
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
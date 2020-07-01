import React from "react"
import { StaticQuery, graphql } from "gatsby"

/**
 * Expected input: data.text = "img/path.jpg imgName"
 */
export default ({ data }) => {
  if(!data) return null
  let dataArray = data.text.trim().split(";") //remove leading & trailing spaces and turn into array
  for(let i = 0; i < dataArray.length; i++){
    let data = dataArray[i].trim().split(/:(.+)/) //split on first occurence of ":"
    dataArray[i] = {
      type: data[0],
      text: data[1]
    }
  }
  let filePath = dataArray.find(item => item.type.toLowerCase() === "src")
  let fileName = dataArray.find(item => item.type.toLowerCase() === "alt")
  if(filePath){
    filePath = filePath.text
  }else{
    throw new Error("[tsdocs] Did not specify a src in an @img.")
  }
  if(fileName){
    fileName = fileName.text
  }else{
    fileName = filePath
  }

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
          if(item.node.relativePath === filePath){
            path = item.node.publicURL
            break;
          }
        }
      return (
        <img className="textimg" src={path} alt={fileName}/>
      )}}
    />
  )
}

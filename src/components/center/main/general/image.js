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
  let image = {
    src: find(dataArray, "src"),
    alt: find(dataArray, "alt"),
    style: find(dataArray, "style"),
  }

  if(!image.src){
    throw new Error("[tsdocs] Did not specify a src in an @img.")
  }
  if(!image.alt){
    image.alt = {
      text: image.src.text,
    }
  }
  let imgStyle = {}
  if(image.style){
    switch(image.style.text){
      case "fullWidth":
        imgStyle = {
          width: "100%"
        }
        break
        case "icon":
          imgStyle = {
            height: "1em"
          }
          break
        case "default":
          break;
    }
  }
  // console.log(style)
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
          if(item.node.relativePath === image.src.text){
            path = item.node.publicURL
            break;
          }
        }
      return (
        <img className="textimg" src={path} alt={image.alt.text} style={imgStyle}/>
      )}}
    />
  )
}

/**
 * Find string in array ignoring casing
 * @param {*} array
 * @param {*} string
 */
function find(array, string){
  return array.find(item => item.type.toLowerCase() === string)
}
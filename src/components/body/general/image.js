import React from "react"
import { StaticQuery, graphql } from "gatsby"

/**
 * Expected input: data.text = "src:img/path.jpg; alt:imgName; style:(style)"
 *
 * Takes the image from the media folder with the specified source path.
 * Alt is used as HTML alt tag.
 */
export default ({ data }) => {
  if(!data) return null
  //Parse string:
  let dataArray = data.text.trim().split(";") //remove leading & trailing spaces and turn into array by splitting around ;
  for(let i = 0; i < dataArray.length; i++){
    let data = dataArray[i].trim().split(/:(.+)/) //split on first occurrence of ":"
    dataArray[i] = {
      type: data[0],
      text: data[1]
    }
  }
  //Put parsed data in object:
  let image = {
    src: findType(dataArray, "src"),
    alt: findType(dataArray, "alt"),
    style: findType(dataArray, "style"),
  }
  //Check for valid input:
  if(!image.src){
    throw new Error("[l-td] Did not specify a src in an @img.")
  }
  if(!image.alt){
    image.alt = {
      text: image.src.text,
    }
  }
  let imgStyle = {}
  if(image.style){
    try {
      imgStyle = JSON.parse( '{' + image.style.text.replace(/'/g, "\"") + '}' )
    } catch (error) {
      console.warn("[l-td]: could not parse image style correctly! Ignoring style for image: " + image.src.text + ", provided styling is: " + image.style.text)
    }
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
          if(advancedEquals(item.node.relativePath, image.src.text)){
            path = item.node.publicURL
            break;
          }
        }
      return (
        <img className="text-img" src={path} alt={image.alt.text} style={imgStyle}/>
      )}}
    />
  )
}

/**
 * Find string in array ignoring casing
 * @param {Array} array array to find item in
 * @param {String} type type to look for
 */
function findType(array, type){
  return array.find(item => item.type.toLowerCase() === type)
}

/**
 * Allow wildcard "*" to be used in string comparison
 * Eg. advancedEquals("string", "str*") returns true
 *
 * @param {String} str String to compare (no *)
 * @param {String} rule String containing *
 */
function advancedEquals(str, rule) {
  let escapedStr = (str) => str.replace(/([.*+?^=!:${}()|[\]/\\])/g, "\\$1");
  return new RegExp("^" + rule.split("*").map(escapedStr).join(".*") + "$").test(str);
}
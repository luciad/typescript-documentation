import React from "react"
import { Link } from "gatsby"
import { query } from "./about/links"

export default ({symbol}) => {
  console.log(symbol)
  return (
    <Link to={symbol.fields.path}>{symbol.name}</Link>
  )
}
/*
export const query = graphql`
query getElementByName($name: String) {
  allSymbol(filter: {name: {eq: $name}}) {
    nodes {
      name
      id
      fields {
        path
      }
    }
  }
}
`
*/
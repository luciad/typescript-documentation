import React from "react"
import { Link, graphql } from "gatsby"

export default ({data}) => {
  let symbol = data.symbol
  return (
    <Link to={symbol.fields.path}>{symbol.name}</Link>
  )
}

export const query = graphql`
  query GetElementByName {
    symbol(name: {eq: "constructor"}) {
      name
      id
      fields {
        path
      }
    } 
  }
`
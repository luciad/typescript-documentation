import React from "react"
import { Link } from "gatsby"

export default ({symbol}) => {
  console.log(symbol)
  return (
    <Link to={symbol.fields.path}>{symbol.name}</Link>
  )
}
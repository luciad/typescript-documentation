import React from 'react'
import globalStyles from "../styles/global.css"
import ItemBox from "./item-box"
import Overview from "../templates/overview"
import { Link } from 'gatsby'

export default () => {
  return (
    <div>
    <Link to="/overview">Go to module overview</Link>
    </div>
  )
}
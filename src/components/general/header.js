import React from "react"
import { Helmet } from "react-helmet"

export default ( { siteTitle } ) => {
  if(!siteTitle) return null
  return (
    <Helmet>
      <title>
        {siteTitle}
      </title>
    </Helmet>
  )
}
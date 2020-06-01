import React from "react"
import { Helmet } from "react-helmet"

export default ( { siteTitle } ) => {
  return (
    <Helmet>
      <title>
        {siteTitle}
      </title>
    </Helmet>
  )
}
import React from 'react'
import Helmet from 'react-helmet'

export default () => {
  return (
    <Helmet>
     <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.0.0/styles/default.min.css"/>
      <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.0.0/highlight.min.js"></script>
      <script>hljs.initHighlightingOnLoad();</script>
    </Helmet>
  )
}
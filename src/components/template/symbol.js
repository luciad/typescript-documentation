import React from "react"
import { graphql } from "gatsby"
import Layout from "../page-layout"
import Body from "../body/body"
import Header from "./general/header"
import BreadCrumbs from "./general/bread-crumbs"

/**
 * Items inside of modules
 *
 * Contains:
 * - Link to module
 * - Link to parent
 * - Name
 * - kindString
 * - its body (see body.js)
 */
export default ({ data }) => {
  if(!data) return null
  const { symbol, module } = data;
  return (
    <div className="symbol">
      <Header siteTitle={symbol.name} />
      <Layout>
        <BreadCrumbs path={symbol.fields.path}/>
        <Body data={symbol}/>
      </Layout>
    </div>
  )
}

export const query = graphql`
  query SymbolQuery($symbolId: String, $moduleId: String) {
    symbol(id: { eq: $symbolId }) {
      ...symbolFields
    }
    module(id: { eq: $moduleId }) {
      id,
      name
    }
  }
`

import React from "react"
import { graphql } from "gatsby"
import Layout from "../page-layout"
import Body from "../body/body"
import Header from "./general/header"
import SignatureSummaries from "../body/signature/signature-summaries"
import Type from "../body/type/type"
import SymbolTitle from "../general/symbol-title"
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
        <div>
        <SymbolTitle data={symbol}/>
          <div className="bottom inline-block">
            <Type data={symbol} delimiter={" : "} noIsOptionalMarker={true}/>
          </div>
        </div>
        <div className="sidecontainer">
          <div className="kind-string">
            {symbol.kindString}
          </div>
        </div>
        <SignatureSummaries data={symbol}/>
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

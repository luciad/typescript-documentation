import React from "react"
import { graphql } from "gatsby"
import Layout from "../../../page-layout"
import Body from "../general/body/body"
import Icon from '../../../general/icon'
import Header from "../../../general/header"
import SignatureSummary from "../general/body/signature/signature-summary"
import Type from "../general/body/type/type"
import SymbolTitle from "../symbol-title"
import BreadCrumbs from "./bread-crumbs"

/**
 * Items inside of modules
 *
 * Contains:
 * - Link to module
 * - Link to parent
 * - Name
 * - kindString & its icon
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
          <Icon kindString={symbol.kindString}/>
          <div className="kind-string">
            {symbol.kindString}
          </div>
        </div>
        <SignatureSummary data={symbol}/>
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

import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/page-layout"
import { fixModuleName, pathToModule } from "../util/util"
import Body from "./about/body"
import Icon from './icon'

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
  const { symbol: exprt, module } = data;

  return (
    <Layout>
      Module: &nbsp;
      <Link to={pathToModule(module)}>{fixModuleName(module)}</Link> 
      <br/>
      Parent: &nbsp; &nbsp;
      <Link to={exprt.fields.parentPath}>{exprt.fields.parentPath.replace("/modules/","")}</Link>       
      <div className="title">{exprt.name}</div>
      <div className="sidecontainer">
        <Icon kindString={exprt.kindString}/>
        <div className="kindString">
          {exprt.kindString}
        </div>
      </div>
      <Body data={exprt}/>
    </Layout>
  );
};

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
`;


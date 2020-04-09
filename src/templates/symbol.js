import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/page-layout"
import { fixModuleName, pathToModule } from "../util/util"
import Body from "./body"
import Icon from './icon'

export default ({ data }) => {
  console.log(data)
  const { symbol: exprt, module } = data;

  return (
    <Layout>    
      <Link to={pathToModule(module)}>{fixModuleName(module)}</Link>    
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
      childrenSymbol {
        ...symbolFields
      }
    }
    module(id: { eq: $moduleId }) {
      id,
      name
    }
  }
`;


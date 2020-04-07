import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/page-layout";
import { fixModuleName, pathToModule } from "../util/util";
import Parser from "html-react-parser"

export default ({ data }) => {
  const { symbol: exprt, module } = data;
  const children = exprt.childrenSymbol;
  const properties = Object.getOwnPropertyNames(exprt).toString()

  return (
    <Layout>
      <p>
        <Link to={pathToModule(module)}>{fixModuleName(module)}</Link>
      </p>
      <h1>{exprt.name}</h1>
      {Parser(exprt.comment.shortText)}
      <h2>Properties</h2>
      <p>{properties}</p>
      <h2>About</h2>
      <p>
        {Parser(exprt.comment.text)}
      </p>
      

      <h2>Children</h2>
      <ul>
        {children.map(child => (
          <li>{child.name}</li>
        ))}
      </ul>
      {children.map(child => (
        <li>{child.name} : {child.kindString}</li>
      ))}
    </Layout>
    
  );
};

export const query = graphql`
  query SymbolQuery($symbolId: String, $moduleId: String) {
    symbol(id: { eq: $symbolId }) {
      name
      kindString
      id
      comment {
        shortText
        text
        tags {
          tag
          text
        }
      }
      childrenSymbol {
        name
        kindString
      }
    }

    module(id: { eq: $moduleId }) {
      name
    }
  }
`;

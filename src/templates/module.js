import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/page-layout";
import { fixModuleName, pathToExport } from "../util/util";
import Parser from "html-react-parser"

export default ({ data }) => {
  const module = data.module;
  const exports = data.module.childrenSymbol;

  const properties = Object.getOwnPropertyNames(module).toString()
  console.log(module)
  return (
    <Layout>
    <dir> {module.name}</dir>
      <h1>{fixModuleName(module)}</h1>
      <h4>{module.kindString}</h4>
      <h2>Properties</h2>
      <p>{properties}</p>
      <h2>About</h2>
      <h2>Exports</h2>
      <ul>
        {exports.map(exprt => (
          <li>
            <Link to={pathToExport(module, exprt)}>{exprt.name}</Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export const query = graphql`
  query ModuleQuery($moduleId: String) {
    module(id: { eq: $moduleId }) {
      name
      kindString
      id
      childrenSymbol {
        name
        kindString
        id
        comment {
          shortText
        }
      }
    }
  }
`;
/*

    <div>
    <dir> @this/is/the/package/and/module</dir>
  <dir>$filePath$</dir>
  <h1>$itemName$</h1>
  <h5>$type$</h5>
  <ul className="hierarchy">
    <li>Hierarchy 1
      <ul className="hierarchy">
        <li>Hierarchy 2
          <ul className="hierarchy">
            <li>Hierarchy 3</li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
  <p>$superRelevantItems$</p>
  <hr/>
  <p>$itemDescription$</p>
  <h2>Overview</h2>
  <div className="overview">
    <Summary title="Variables"/>
    <Summary title="Accessors"/>
    <Summary title="Methods"/>
    <Summary title="Interfaces"/>
    <Summary title="Classes"/>
    <Summary title="Enums"/>
  </div>
  <hr/>
  $allConstructorsInDepth$
  $allAccessorsInDepth$    
  $allMethodsInDepth$
  $allEnumsInDepth$
  </div>
*/
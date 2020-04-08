import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/page-layout";
import { fixModuleName, pathToExport } from "../util/util";
import About from "./about"
import Icon from "./icon"

export default ({ data }) => {
  const module = data.module;
  module.exports = data.module.childrenSymbol;

  return (
    <Layout>
    <dir> {module.name}</dir>
      <div className="title">{fixModuleName(module)}</div>
      <div className="kindString">{module.kindString}</div>
      <About data={module}/>
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

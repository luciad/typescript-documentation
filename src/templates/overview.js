import React from "react";
import { Link } from "gatsby";
import Layout from "../components/page-layout";
import { fixModuleName, pathToModule } from "../util/util";
import { graphql } from "gatsby";
import Icon from "./icon"

/**
 * List of all top-level modules
 */
export default ({ data }) => {
  const modules = data.allModule.edges.map(edge => edge.node);

  return (
    <Layout>
      <div className="title">Module list</div>
      <ul>
        {modules.map(module => (
          <li>
          <div className="sidecontainer">
            <Icon kindString={module.kindString}/>
            <Link to={pathToModule(module)}>{fixModuleName(module)}</Link>
          </div>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export const query = graphql`
  query AllModulesQuery {
    allModule {
      edges {
        node {
          name
          kindString
          id
        }
      }
    }
  }
`;

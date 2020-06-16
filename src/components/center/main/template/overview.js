import React from "react";
import { Link } from "gatsby";
import Layout from "../../../page-layout";
import { fixModuleName, pathToModule } from "../../../../util/util";
import { graphql } from "gatsby";
import Icon from "../../../general/icon"
import Header from "../../../general/header"

/**
 * List of all top-level modules
 *
 * Contains:
 * - List of links to all modules and their kindString icons
 */
export default ({ data }) => {
  if(!data) return null
  const modules = data.allModule.edges.map(edge => edge.node);

  return (
    <>
      <Header siteTitle="Module Overview" />
      <Layout>
        <div className="title">Module list</div>
        <ul>
          {modules.map(module => (
            <li key={module.id}>
              <div className="sidecontainer">
                <Icon kindString={module.kindString}/>
                <Link to={pathToModule(module)}>{fixModuleName(module)}</Link>
              </div>
            </li>
          ))}
        </ul>
      </Layout>
    </>
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

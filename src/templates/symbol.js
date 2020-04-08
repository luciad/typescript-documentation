import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/page-layout"
import { fixModuleName, pathToModule } from "../util/util"
import About from "./about"
import Icon from './icon'

export default ({ data }) => {
  console.log(data)
  const { symbol: exprt, module } = data;
  const children = exprt.childrenSymbol;

  return (
    <Layout>
      <p>
        <Link to={pathToModule(module)}>{fixModuleName(module)}</Link>
      </p>
      <div className="title">{exprt.name}</div>
      <div className="sidecontainer">
          <Icon kindString={exprt.kindString}/>
          <div className="kindString">
            {exprt.kindString}
          </div>
        </div>
      <About data={exprt}/>
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
        name,
        kindString,
        id,
        signatures {
          name,
          kindString,
          comment {
            shortText,
          },
          type {
            type,
            name
          },
          comment {
              shortText
          }
        },
        getSignature {
          name,
          kindString,
          comment {
            shortText,
          }
          type {
            type,
            name
          }
        },
        setSignature {
          name,
          kindString,
          comment {
            shortText,
          }
          type {
            type,
            name
          }
          parameters {
            name
            type {
              name
            }
          }
        },
        comment {
          shortText
          text
          tags {
            tag
            text
          }
        },
        flags {
          isExported,
          isOptional,
          isPrivate,
          isStatic
        }
      }
    }

    module(id: { eq: $moduleId }) {
      name
    }
  }
`;


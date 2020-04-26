import React from "react"
import { graphql } from "gatsby";
import SearchLink from "./search-link"

/**
 * extends, implements, ~by,...
 */
export default ({ data }) => {
  return (
    <div>
      {!(data.extendedTypes === undefined || data.extendedTypes === null) &&
        <div>
          <div className="subsubtitle">
            Extended types
          </div>
          <ul>
            {data.extendedTypes.map(function(type){
              let newData = {text: type.name}
              return(
                <li><SearchLink data={newData}/></li>
            )})}
          </ul>
        </div>
      }
      {!(data.extendedBy === undefined || data.extendedBy === null) &&
        <div>
          <div className="subsubtitle">
            Extended by
          </div>
          <ul>
            {data.extendedBy.map(function(type){
              let newData = {text: type.name}
              return(
                <li><SearchLink data={newData}/></li>
            )})}
          </ul>
        </div>
      }
      {!(data.implementedTypes === undefined || data.implementedTypes === null) &&
        <div>
          <div className="subsubtitle">
            Implemented types
          </div>
          <ul>
            {data.implementedTypes.map(function(type){
              let newData = {text: type.name}
              return(
                <li><SearchLink data={newData}/></li>
            )})}
          </ul>
        </div>
      }
      {!(data.implementedBy === undefined || data.implementedBy === null) &&
        <div>
          <div className="subsubtitle">
            Implemented By
          </div>
          <ul>
            {data.implementedBy.map(function(type){
              let newData = {text: type.name}
              return(
                <li><SearchLink data={newData}/></li>
            )})}
          </ul>
        </div>
      }
      {!(data.implementationOf === undefined || data.implementationOf === null) &&
        <div>
          <div className="subsubtitle">
            Implementation of
          </div>
          <ul>
            {data.implementationOf.name}
          </ul>
        </div>
      }
      {!(data.inheritedFrom === undefined || data.inheritedFrom === null) &&
        <div>
          <div className="subsubtitle">
            Inherited from
          </div>
          <ul>
            {data.inheritedFrom.name}
          </ul>
        </div>
      }
    </div>
  );
};


export const query = graphql`
query linkQuery {
  allModule(filter: {children: {elemMatch: {id: {eq : "2452"}}}}) {
    edges {
      node {
        name
        kindString
        
      }
    }
  }
}
`
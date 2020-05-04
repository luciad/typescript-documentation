import React from "react"
import { graphql } from "gatsby";
import SearchLink from "./search-link"

/**
 * extends, implements, ~by,...
 * Contains:
 * - List of Extended types
 * - List of Extended by
 * - List of Implemented types
 * - List of Implemented by
 * - List of Implementation of
 * - List of Inherited from
 * 
 */
export default ({ data }) => {
  return ( //TODO: clean up
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

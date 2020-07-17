import React from "react"
import SearchLink from "../search-link"

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
  if(!data) return null

  return (
    <div className="links">
      {LinkTemplate("Extended types", data.extendedTypes)}
      {LinkTemplate("Extended by", data.extendedBy)}
      {LinkTemplate("Implemented types", data.implementedTypes)}
      {LinkTemplate("Implemented by", data.implementedBy)}
      {LinkTemplate("Implementation of", data.implementationOf)}
      {LinkTemplate("Inherited from", data.inheritedFrom)}
    </div>
  );
};

function LinkTemplate(title, data) {
  if(!data) return null

  if(data.length > 0)
    return (
      <div>
        <div className="subsubtitle">
          {title}
        </div>
        <ul className="itemList">
          {data.map(type => (
              <li key={type.name + "_searchlink"}><SearchLink data={{text: type.name, id: type.id}}/></li>
          ))}
        </ul>
      </div>
    )
  return (
    <div>
      <div className="subsubtitle">
        {title}
      </div>
      <ul>
        <li className="inline-block" key={data.name + "_searchlink"}><SearchLink data={data.name}/></li>
      </ul>
    </div>
  )

}
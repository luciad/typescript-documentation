import React from "react"
import Type from "./type/type"

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

  const dataList = data.length > 0 ? data : [data]
    return (
      <div>
        <div className="subsubtitle">
          {title}
        </div>
        <ul className="itemList">
          {dataList.map(type =>
              <li key={type.name + "_searchlink"}>
                <Type data={{type: type}}/>
              </li>
          )}
        </ul>
      </div>
    )
}
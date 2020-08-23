import React, { Component } from "react"
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
      <LinkTemplate title="Extended types" data={data.extendedTypes}/>
      <LinkTemplate title="Extended by" data={data.extendedBy}/>
      <LinkTemplate title="Implemented types" data={data.implementedTypes}/>
      <LinkTemplate title="Implemented by" data={data.implementedBy}/>
      <LinkTemplate title="Implementation of" data={data.implementationOf}/>
      <LinkTemplate title="Inherited from" data={data.inheritedFrom}/>
     </div>
  );
};

class LinkTemplate extends Component {
  render() {
    let title = this.props.title
    let data = this.props.data
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
}
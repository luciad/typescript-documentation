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
    <div className="references">
      <ReferenceTemplate title="Extended types" data={data.extendedTypes}/>
      <ReferenceTemplate title="Extended by" data={data.extendedBy}/>
      <ReferenceTemplate title="Implemented types" data={data.implementedTypes}/>
      <ReferenceTemplate title="Implemented by" data={data.implementedBy}/>
      <ReferenceTemplate title="Implementation of" data={data.implementationOf}/>
      <ReferenceTemplate title="Inherited from" data={data.inheritedFrom}/>
     </div>
  );
};

class ReferenceTemplate extends Component {
  render() {
    let title = this.props.title
    let data = this.props.data
    if(!data) return null
    let dataList = data.length > 0 ? data : [data]
    dataList = dataList.sort((a, b) => {
      return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
    })

    return (
      <div>
        <div className="subsubtitle">
          {title}
        </div>
        <ul className="itemList">
          {dataList.map(type =>
              <li key={type.name + "_reference"}>
                <Type data={{type: type}}/>
              </li>
          )}
        </ul>
      </div>
    )
  }
}
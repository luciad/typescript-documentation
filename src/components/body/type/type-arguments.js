import React, { Component } from "react"
import Type from "./type"

export default class TypeArguments extends Component {
    render(){
        const data = this.props.data
        if(!data || !data.typeArguments) return null

        return (
          <>{"<"}
          {data.typeArguments.map( (ta, i) =>
              <span key={"key_" + ta.id + i + "_type_args"}>
              {i > 0 && <>, </>}
                  <Type data={{type: ta}}/>
              </span>
  )}
  {">"}</>
        )
    }
}
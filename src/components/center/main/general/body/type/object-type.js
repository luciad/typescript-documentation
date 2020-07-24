import React, { Component } from "react"
import Type from "./type"

export default class ObjectType extends Component {
    render(){
        const data = this.props.data
        if(!data || !data.objectType) return null

        return (
            <>
            {/* {"{"} */}
                <Type data={{type: data.objectType}}/>
            {/* {"}"} */}
          </>
        )
    }
}
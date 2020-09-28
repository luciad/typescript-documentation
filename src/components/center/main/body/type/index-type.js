import React, { Component } from "react"
import Type from "./type"

export default class IndexType extends Component {
    render(){
        const data = this.props.data
        if(!data || !data.indexType) return null
        
        return (
            <>
            [<Type data={{type: data.indexType}}/>]
          </>
        )
    }
}
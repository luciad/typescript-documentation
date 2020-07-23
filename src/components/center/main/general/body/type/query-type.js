import React, { Component } from "react"
import Type from "./type"

export default class QueryType extends Component {
    render(){
        const data = this.props.data
        if(!data || !data.queryType) return null

        return (
            <>
            _queryType:_
            <Type data={{type: data.queryType}}/>
          </>
        )
    }
}